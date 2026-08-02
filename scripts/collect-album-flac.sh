#!/bin/bash
# RouteNote入稿用: アルバム音源をFLAC変換して1フォルダへ（RouteNoteはWAV不可）
set -euo pipefail
cd "$(dirname "$0")/.."
SRC="dist-album/claude-code-vs-codex"
OUT="dist-album/claude-code-vs-codex-flac"
mkdir -p "$OUT"
[ -d "$SRC" ] || bash scripts/collect-album-audio.sh
for f in "$SRC"/*.wav; do
  base="$(basename "$f" .wav)"
  ffmpeg -y -i "$f" -c:a flac -compression_level 8 "$OUT/$base.flac" -loglevel error
  echo "$OUT/$base.flac"
done
# ジャケット 3000x3000
sips -z 3000 3000 "content/albums/01_claude-code-vs-codex/artwork/cover.jpg" --out "$OUT/00 cover 3000.jpg" > /dev/null
echo "Done: $OUT/"
