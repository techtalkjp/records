/**
 * カバーアート生成スクリプト（マルチターン会話方式）
 *
 * Usage:
 *   bun scripts/generate-cover.ts <character> <scene-prompt> <output-path> [--edit <edit-prompt>]
 *
 * Examples:
 *   # 新規生成（Turn 1 + Turn 2）
 *   bun scripts/generate-cover.ts claude-code "This person standing in a dark alley..." artwork/cover.jpg
 *
 *   # 既存画像の編集
 *   bun scripts/generate-cover.ts claude-code --edit "Make this full monochrome" artwork/cover.jpg
 */
import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const MODEL_NAME = "gemini-3.1-flash-image-preview";
const PROJECT_ROOT = resolve(import.meta.dir, "..");

function getBasePrompt(character: string): string {
  const path = `${PROJECT_ROOT}/characters/${character}/base-prompt.md`;
  const content = readFileSync(path, "utf-8");
  const match = content.match(/```\n([\s\S]*?)```/);
  if (!match) throw new Error(`Base prompt not found in ${path}`);
  return match[1].trim();
}

function getDeriveTemplate(character: string): string {
  const path = `${PROJECT_ROOT}/characters/${character}/base-prompt.md`;
  const content = readFileSync(path, "utf-8");
  const blocks = content.match(/```\n([\s\S]*?)```/g);
  if (!blocks || blocks.length < 2)
    throw new Error(`Derive template not found in ${path}`);
  return blocks[1].replace(/```\n?/g, "").trim();
}

async function generateCover(options: {
  character: string;
  scenePrompt: string;
  outputPath: string;
}) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error("Error: GOOGLE_GENERATIVE_AI_API_KEY not set");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const basePrompt = getBasePrompt(options.character);
  const deriveTemplate = getDeriveTemplate(options.character);

  // Turn 1: ベースショット生成
  console.log("Turn 1: Generating base shot...");
  const response1 = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [{ role: "user", parts: [{ text: basePrompt }] }],
    config: {
      responseModalities: ["IMAGE", "TEXT"],
      imageConfig: { aspectRatio: "1:1", imageSize: "2K" },
      thinkingConfig: { thinkingLevel: "High", includeThoughts: true },
    },
  });

  const modelResponse = response1.candidates![0].content;
  const baseImage = modelResponse.parts.find(
    (p) => p.inlineData && !p.thought
  );
  if (!baseImage) {
    console.error("Turn 1 failed: no image generated");
    process.exit(1);
  }
  console.log("Turn 1: Done");

  // Turn 2: シーン派生
  const coverPrompt = deriveTemplate.replace(
    "[ここに変更点のみ記述]",
    options.scenePrompt
  );

  console.log("Turn 2: Generating cover art...");
  console.log(`Scene: ${options.scenePrompt.substring(0, 100)}...`);

  const response2 = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [
      { role: "user", parts: [{ text: basePrompt }] },
      { role: "model", parts: modelResponse.parts },
      { role: "user", parts: [{ text: coverPrompt }] },
    ],
    config: {
      responseModalities: ["IMAGE", "TEXT"],
      tools: [
        {
          googleSearch: {
            searchTypes: { webSearch: {}, imageSearch: {} },
          },
        },
      ],
      imageConfig: { aspectRatio: "1:1", imageSize: "4K" },
      thinkingConfig: { thinkingLevel: "High" },
    },
  });

  const parts2 = response2.candidates![0].content.parts;
  const coverImage = parts2.find((p) => p.inlineData && !p.thought);

  if (coverImage?.inlineData?.data) {
    const buffer = Buffer.from(coverImage.inlineData.data, "base64");
    writeFileSync(options.outputPath, buffer);
    console.log(`\nSaved: ${options.outputPath} (${buffer.length} bytes)`);
  } else {
    console.error("Turn 2 failed: no image generated");
    const textPart = parts2.find((p) => p.text);
    if (textPart?.text) console.log("Response:", textPart.text);
  }
}

async function editImage(options: {
  editPrompt: string;
  outputPath: string;
}) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error("Error: GOOGLE_GENERATIVE_AI_API_KEY not set");
    process.exit(1);
  }

  if (!existsSync(options.outputPath)) {
    console.error(`Error: ${options.outputPath} not found`);
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const imageData = readFileSync(options.outputPath);

  console.log(`Editing: ${options.editPrompt.substring(0, 100)}...`);

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: {
      parts: [
        { text: options.editPrompt },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageData.toString("base64"),
          },
        },
      ],
    },
    config: {
      responseModalities: ["IMAGE", "TEXT"],
      imageConfig: { aspectRatio: "1:1", imageSize: "4K" },
      thinkingConfig: { thinkingLevel: "High" },
    },
  });

  const parts = response.candidates![0].content.parts;
  const image = parts.find((p) => p.inlineData);

  if (image?.inlineData?.data) {
    const buffer = Buffer.from(image.inlineData.data, "base64");
    writeFileSync(options.outputPath, buffer);
    console.log(`Saved: ${options.outputPath} (${buffer.length} bytes)`);
  } else {
    console.error("Edit failed");
  }
}

// CLI
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`Usage:
  Generate: bun scripts/generate-cover.ts <character> <scene-prompt> <output-path>
  Edit:     bun scripts/generate-cover.ts <character> --edit <edit-prompt> <image-path>`);
  process.exit(1);
}

const character = args[0];
const editIndex = args.indexOf("--edit");

if (editIndex !== -1) {
  const editPrompt = args[editIndex + 1];
  const outputPath = args[editIndex + 2];
  await editImage({ editPrompt, outputPath });
} else {
  const scenePrompt = args[1];
  const outputPath = args[2] || "cover.jpg";
  await generateCover({ character, scenePrompt, outputPath });
}
