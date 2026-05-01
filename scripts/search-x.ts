#!/usr/bin/env bun
/**
 * Grok API (X Search) で X ポストを収集する汎用スクリプト
 *
 * Usage:
 *   bun scripts/search-x.ts <queries.json>
 *
 * queries.json の形式:
 *   {
 *     "from_date": "2026-04-12",
 *     "to_date": "2026-04-26",
 *     "queries": [
 *       "クエリ本文1",
 *       "クエリ本文2"
 *     ]
 *   }
 *
 * 出力: 標準出力。各クエリの結果を区切り付きで出す。
 */

import { readFileSync } from "node:fs";

const API_KEY = process.env.XAI_API_KEY;
if (!API_KEY) {
  throw new Error("XAI_API_KEY is not set. Add it to .env");
}

interface QueriesFile {
  from_date: string;
  to_date: string;
  queries: string[];
}

interface XSearchResponse {
  id: string;
  output: Array<{
    type: string;
    content?: Array<{ type: string; text?: string }>;
    [key: string]: unknown;
  }>;
}

async function searchX(
  query: string,
  fromDate: string,
  toDate: string,
): Promise<string> {
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
          from_date: fromDate,
          to_date: toDate,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as XSearchResponse;

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

async function main() {
  const queriesPath = process.argv[2];
  if (!queriesPath) {
    console.error("Usage: npx tsx scripts/search-x.ts <queries.json>");
    process.exit(1);
  }

  const config = JSON.parse(readFileSync(queriesPath, "utf-8")) as QueriesFile;
  const { from_date, to_date, queries } = config;

  console.log(`=== X Search (via Grok 4.2) ===`);
  console.log(`Period: ${from_date} 〜 ${to_date}`);
  console.log(`Queries: ${queries.length}\n`);

  for (let i = 0; i < queries.length; i++) {
    console.log(`\n${"=".repeat(70)}`);
    console.log(`[Query ${i + 1}/${queries.length}]`);
    console.log("=".repeat(70));
    console.log(queries[i]);
    console.log("-".repeat(70));

    try {
      const result = await searchX(queries[i], from_date, to_date);
      console.log(result);
    } catch (e) {
      console.error(`Error: ${e}`);
    }

    if (i < queries.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

main();
