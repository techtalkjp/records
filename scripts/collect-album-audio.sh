#!/bin/bash
# アルバム『Claude Code vs. Codex』の音源・ジャケットを DistroKid 入稿用に1フォルダへ集める
# Usage: bash scripts/collect-album-audio.sh
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="dist-album/claude-code-vs-codex"
mkdir -p "$OUT"

copy() { # copy <num> <track-dir> <title>
  src="content/tracks/$2/source/track.wav"
  dst="$OUT/$1 $3.wav"
  [ -f "$src" ] || { echo "MISSING: $src" >&2; exit 1; }
  cp "$src" "$dst"
  echo "$dst"
}

copy 01 "claude-code/01_Complexes_on_the_Codex"      "Complexes on the Codex"
copy 02 "codex/01_Hourglass_on_the_Claude_Code"      "Hourglass on the Claude Code"
copy 03 "claude-code/02_ターミナルの誇り"             "ターミナルの誇り"
copy 04 "codex/02_なんでだよ"                         "なんでだよ"
copy 05 "claude-code/03_ブランチ切るたび未来が分岐"   "ブランチ切るたび未来が分岐"
copy 06 "claude-code/04_行ってこい"                   "行ってこい"
copy 07 "codex/03_ログだけ"                           "ログだけ"
copy 08 "codex/04_言わなかっただけ"                   "言わなかっただけ"
copy 09 "claude-code/05_コード読まなくてOK"           "コード読まなくてOK"
copy 10 "codex/05_三日天下"                           "三日天下"
copy 11 "claude-code/06_おバカモード"                 "おバカモード"
copy 12 "codex/06_在庫"                               "在庫"
copy 13 "claude-code/07_またな"                       "またな"
copy 14 "codex/07_またかよ"                           "またかよ"
copy 15 "claude-code/08_アンプラグド"                 "アンプラグド"
copy 16 "codex/08_セカンドバース"                     "セカンドバース"
copy 17 "codex/09_サイファー"                         "サイファー"
copy 18 "claude-code/09_マイクチェック"               "マイクチェック"

cp "content/albums/01_claude-code-vs-codex/artwork/cover.jpg" "$OUT/00 cover.jpg"
echo ""
echo "Done: $OUT/"
