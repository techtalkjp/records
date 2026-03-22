/**
 * キャラクター画像生成スクリプト
 * Usage: bun scripts/generate-image.ts <prompt> [output_path] [--aspect-ratio 1:1] [--count 1] [--input image.png]
 */
import { GoogleGenAI } from "@google/genai";
import { writeFile, readFile, mkdir, realpath } from "fs/promises";
import { dirname, extname, resolve } from "path";

const MODEL_NAME = "gemini-3.1-flash-image-preview";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

async function generateImage(options: {
  prompt: string;
  outputPath: string;
  aspectRatio: string;
  count: number;
  inputImage?: string;
}) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error("Error: GOOGLE_GENERATIVE_AI_API_KEY not set in .env");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log(`Model: ${MODEL_NAME}`);
  console.log(`Prompt: ${options.prompt}`);
  if (options.inputImage) console.log(`Input: ${options.inputImage}`);
  console.log(`Aspect ratio: ${options.aspectRatio}`);
  console.log(`Count: ${options.count}`);
  console.log("Generating...");

  // 入力画像の読み込み
  let imageParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
    { text: options.prompt },
  ];

  if (options.inputImage) {
    const imageData = await readFile(options.inputImage);
    const ext = extname(options.inputImage).toLowerCase();
    const mimeType = MIME_TYPES[ext] || "image/png";
    imageParts.push({
      inlineData: {
        mimeType,
        data: imageData.toString("base64"),
      },
    });
  }

  for (let i = 0; i < options.count; i++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: { parts: imageParts },
        config: {
          responseModalities: ["IMAGE", "TEXT"],
          imageConfig: {
            aspectRatio: options.aspectRatio as
              | "1:1"
              | "16:9"
              | "9:16"
              | "3:4"
              | "4:3",
          },
        },
      });

      const candidates = response.candidates;
      if (!candidates?.length) {
        console.error(`  [${i + 1}] No candidates returned`);
        continue;
      }

      const parts = candidates[0]?.content?.parts;
      const resultImagePart = parts?.find((p) => p.inlineData);

      if (!resultImagePart?.inlineData?.data) {
        const textPart = parts?.find((p) => p.text);
        if (textPart?.text) {
          console.error(`  [${i + 1}] Text response: ${textPart.text}`);
        } else {
          console.error(`  [${i + 1}] No image in response`);
        }
        continue;
      }

      const ext =
        resultImagePart.inlineData.mimeType === "image/jpeg" ? "jpg" : "png";
      const suffix = options.count > 1 ? `_${i + 1}` : "";

      // 出力パスを組み立て
      let finalPath: string;
      if (options.outputPath.match(/\.(png|jpg|jpeg)$/)) {
        finalPath = options.outputPath.replace(
          /\.(png|jpg|jpeg)$/,
          `${suffix}.${ext}`
        );
      } else {
        finalPath = `${options.outputPath}${suffix}.${ext}`;
      }

      // 入力画像と同じパスへの上書きを防止
      if (options.inputImage && resolve(options.inputImage) === resolve(finalPath)) {
        console.error(
          `  [${i + 1}] Error: output would overwrite input image. Skipping.`
        );
        continue;
      }

      await mkdir(dirname(finalPath), { recursive: true });
      const buffer = Buffer.from(resultImagePart.inlineData.data, "base64");
      await writeFile(finalPath, buffer);
      console.log(
        `  [${i + 1}] Saved: ${finalPath} (${buffer.length} bytes)`
      );
    } catch (error) {
      console.error(`  [${i + 1}] Error:`, error);
    }
  }
}

// CLI
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(
    "Usage: bun scripts/generate-image.ts <prompt> [output_path] [--aspect-ratio 1:1] [--count 1] [--input image.png]"
  );
  process.exit(1);
}

let prompt = "";
let outputPath = "output.png";
let aspectRatio = "1:1";
let count = 1;
let inputImage: string | undefined;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--aspect-ratio" && args[i + 1]) {
    aspectRatio = args[++i];
  } else if (args[i] === "--count" && args[i + 1]) {
    count = parseInt(args[++i]);
  } else if (args[i] === "--input" && args[i + 1]) {
    inputImage = args[++i];
  } else if (!prompt) {
    prompt = args[i];
  } else if (outputPath === "output.png") {
    outputPath = args[i];
  }
}

generateImage({ prompt, outputPath, aspectRatio, count, inputImage });
