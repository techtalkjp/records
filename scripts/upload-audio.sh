#!/usr/bin/env bash
set -euo pipefail

# M4A ファイルを R2 バケットにアップロード
# 前提: wrangler がログイン済み、techtalk-audio バケットが作成済み

BUCKET="techtalk-audio"
DIST_DIR="$(cd "$(dirname "$0")/.." && pwd)/dist-audio"

if [ ! -d "$DIST_DIR" ]; then
  echo "Error: $DIST_DIR not found. Run convert-audio.sh first."
  exit 1
fi

for file in "$DIST_DIR"/**/*.m4a; do
  # dist-audio/claude-code/01-complexes-on-the-codex.m4a → tracks/claude-code/01-complexes-on-the-codex.m4a
  key="tracks/${file#"$DIST_DIR/"}"
  echo "Uploading: $key"
  CLOUDFLARE_ACCOUNT_ID=91ff95bcb91fbfa1b1c5c356262b1fe4 pnpm --dir site exec wrangler r2 object put "$BUCKET/$key" --file="$file" --content-type="audio/mp4" --remote
done

echo "Done. All tracks uploaded to R2 bucket: $BUCKET"
