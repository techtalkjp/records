#!/usr/bin/env bash
set -euo pipefail

# WAV → M4A (AAC) 変換スクリプト
# 出力先: dist-audio/{artist}/{slug}.m4a

CONTENT_DIR="$(cd "$(dirname "$0")/../content/tracks" && pwd)"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/dist-audio"

mkdir -p "$OUT_DIR/claude-code" "$OUT_DIR/codex"

convert() {
  local dir="$1" slug="$2"
  local input="$CONTENT_DIR/$dir/source/track.wav"
  local output="$OUT_DIR/$slug.m4a"

  if [ ! -f "$input" ]; then
    echo "SKIP: $input not found"
    return
  fi

  echo "Converting: $dir → $slug.m4a"
  ffmpeg -y -i "$input" -c:a aac -b:a 192k -movflags +faststart "$output"
}

convert "claude-code/01_Complexes_on_the_Codex"          "claude-code/01-complexes-on-the-codex"
convert "claude-code/02_ターミナルの誇り"                  "claude-code/02-terminal-no-hokori"
convert "codex/01_Hourglass_on_the_Claude_Code"           "codex/01-hourglass-on-the-claude-code"
convert "codex/02_なんでだよ"                              "codex/02-nandedayo"

echo "Done. Output in $OUT_DIR/"
