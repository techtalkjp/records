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
convert "claude-code/03_ブランチ切るたび未来が分岐"        "claude-code/03-branch-kirutabi"
convert "claude-code/04_行ってこい"                        "claude-code/04-ittekoi"
convert "claude-code/05_コード読まなくてOK"                "claude-code/05-code-yomanakute-ok"
convert "claude-code/06_おバカモード"                      "claude-code/06-obaka-mode"
convert "claude-code/07_またな"                            "claude-code/07-matana"
convert "codex/01_Hourglass_on_the_Claude_Code"           "codex/01-hourglass-on-the-claude-code"
convert "codex/02_なんでだよ"                              "codex/02-nandedayo"
convert "codex/03_ログだけ"                                "codex/03-log-dake"
convert "codex/04_言わなかっただけ"                        "codex/04-iwanakatta-dake"
convert "codex/05_三日天下"                                "codex/05-mikka-tenka"
convert "codex/06_在庫"                                    "codex/06-zaiko"
convert "codex/07_またかよ"                                "codex/07-matakayo"
convert "codex/08_セカンドバース"                          "codex/08-second-verse"

echo "Done. Output in $OUT_DIR/"
