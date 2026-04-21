#!/usr/bin/env npx tsx
/**
 * Grok API (X Search) を使って Codex に関する X ポストを収集する
 * Usage: npx tsx scripts/search-x-codex.ts
 */

const API_KEY = process.env.XAI_API_KEY;
if (!API_KEY) {
  throw new Error("XAI_API_KEY is not set. Add it to .env");
}

interface XSearchResponse {
  id: string;
  output: Array<{
    type: string;
    content?: Array<{ type: string; text?: string }>;
    [key: string]: unknown;
  }>;
}

async function searchX(query: string): Promise<string> {
  const res = await fetch("https://api.x.ai/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "grok-4.20-0309-non-reasoning",
      input: [
        {
          role: "user",
          content: query,
        },
      ],
      tools: [
        {
          type: "x_search",
          from_date: "2026-03-20",
          to_date: "2026-04-03",
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as XSearchResponse;

  // output から text を抽出
  for (const item of data.output) {
    if (item.type === "message" && item.content) {
      for (const block of item.content) {
        if (block.type === "output_text" && block.text) {
          return block.text;
        }
      }
    }
  }
  return JSON.stringify(data.output, null, 2);
}

const queries = [
  `X上で直近2週間の投稿を検索して、OpenAI Codex（コーディングエージェント）に対するプログラマーの感想・評判をまとめてください。「便利」「助かった」「すごい」「神」「最高」「使いやすい」などポジティブな反応を中心に、日本語・英語両方のポストを20件以上集めてください。各ポストは @ユーザー名、投稿日、本文を含めてください。`,

  `Search recent X posts (last 2 weeks) about the OpenAI official "codex-plugin-cc" plugin for Claude Code. Find programmer reactions - how they feel about using Codex from within Claude Code, any funny or emotional comments. Include @username, date, and full post text for each.`,

  `X上で直近2週間、OpenAI Codex と Claude Code を比較しているプログラマーの投稿を探してください。特に「Codexのレビューが優秀」「Codexの方が良い点」「Codexを評価する声」を中心に。@ユーザー名、日付、本文を含めて15件以上。`,

  `Search recent X posts about OpenAI Codex token usage bug or Claude Code token consumption issues in the last 2 weeks. Find programmer complaints or discussions about unexpected token usage, billing surprises, or rate limits. Include @username, date, and post text.`,
];

async function main() {
  console.log("=== X Search: Codex Reactions (via Grok 4.2) ===\n");

  for (let i = 0; i < queries.length; i++) {
    console.log(`\n${"=".repeat(70)}`);
    console.log(`[Query ${i + 1}/${queries.length}]`);
    console.log("=".repeat(70));

    try {
      const result = await searchX(queries[i]);
      console.log(result);
    } catch (e) {
      console.error(`Error: ${e}`);
    }

    // Rate limit
    if (i < queries.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

main();
