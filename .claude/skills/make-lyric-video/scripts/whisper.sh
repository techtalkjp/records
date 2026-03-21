#!/bin/bash
# mlx-whisperでword-level timestampsを取得する
# Usage: whisper.sh <音声ファイル> <出力ディレクトリ>
set -euo pipefail

audio_file="$1"
output_dir="$2"

if [ ! -f "$audio_file" ]; then
  echo "Error: Audio file not found: $audio_file" >&2
  exit 1
fi

mkdir -p "$output_dir"

uvx --from mlx-whisper mlx_whisper \
  "$audio_file" \
  --language ja \
  -f json \
  -o "$output_dir" \
  --model mlx-community/whisper-medium-mlx \
  --word-timestamps True
