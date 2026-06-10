#!/usr/bin/env bash
set -euo pipefail

# M4A ファイルを R2 バケットにアップロード
# 前提: wrangler がログイン済み、techtalk-audio バケットが作成済み
#
# 使い方:
#   bash scripts/upload-audio.sh
#       dist-audio 内の全 m4a をアップロード
#   bash scripts/upload-audio.sh claude-code/05-code-yomanakute-ok
#       指定トラックのみ（artist/slug 形式、.m4a は省略可）
#   bash scripts/upload-audio.sh claude-code/05-code-yomanakute-ok codex/04-iwanakatta-dake
#       複数指定も可

BUCKET="techtalk-audio"
ACCOUNT_ID="91ff95bcb91fbfa1b1c5c356262b1fe4"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT/dist-audio"

if [ ! -d "$DIST_DIR" ]; then
  echo "Error: $DIST_DIR not found. Run convert-audio.sh first."
  exit 1
fi

upload() {
  local file="$1"
  if [ ! -f "$file" ]; then
    echo "SKIP (not found): $file"
    return 0
  fi
  # dist-audio/claude-code/05-....m4a → tracks/claude-code/05-....m4a
  local key="tracks/${file#"$DIST_DIR/"}"
  echo "Uploading: $key"
  CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID" pnpm --dir "$ROOT/site" exec wrangler r2 object put \
    "$BUCKET/$key" --file="$file" --content-type="audio/mp4" --remote
}

if [ "$#" -eq 0 ]; then
  # 引数なし: 全 m4a をアップロード
  shopt -s globstar nullglob
  for file in "$DIST_DIR"/**/*.m4a; do
    upload "$file"
  done
else
  # 引数あり: 指定トラックのみ（artist/slug 形式、.m4a 省略可）
  for arg in "$@"; do
    upload "$DIST_DIR/${arg%.m4a}.m4a"
  done
fi

echo "Done. Bucket: $BUCKET"
