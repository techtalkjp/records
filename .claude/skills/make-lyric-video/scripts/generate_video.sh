#!/bin/bash
# トラックディレクトリから字幕付き動画を生成する
# Usage: generate_video.sh <トラックディレクトリ> <square|youtube>
set -euo pipefail

FFMPEG="/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg"
FONT_STYLE="FontName=Hiragino Sans,FontSize=18,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2,Shadow=1,Alignment=2,MarginV=40"

track_dir="$1"
format="${2:-square}"
track_name=$(basename "$track_dir" | sed 's/^[0-9]*_//' | tr '_' ' ')

# ファイル検出（新ディレクトリ構造）
wav_file="$track_dir/source/track.wav"
srt_file="$track_dir/subtitle/track.srt"
img_file=$(find "$track_dir/artwork" -maxdepth 1 \( -name "*.jpeg" -o -name "*.jpg" -o -name "*.png" \) | head -1)

if [ ! -f "$wav_file" ] || [ ! -f "$srt_file" ] || [ -z "$img_file" ]; then
  echo "Error: Required files not found in $track_dir" >&2
  echo "  wav: $wav_file $([ -f "$wav_file" ] && echo OK || echo NOT FOUND)" >&2
  echo "  srt: $srt_file $([ -f "$srt_file" ] && echo OK || echo NOT FOUND)" >&2
  echo "  img: ${img_file:-NOT FOUND}" >&2
  exit 1
fi

# 出力ディレクトリ
mkdir -p "$track_dir/video"

# 作業ディレクトリ（シンボリックリンク用）
work_dir=$(mktemp -d)
ln -sf "$(realpath "$srt_file")" "$work_dir/sub.srt"
ln -sf "$(realpath "$img_file")" "$work_dir/bg_img"
ln -sf "$(realpath "$wav_file")" "$work_dir/audio.wav"

cleanup() {
  rm -rf "$work_dir"
}
trap cleanup EXIT

cd "$work_dir"

# 画像サイズ取得
img_info=$("$FFMPEG" -i bg_img 2>&1 || true)
img_info=$(echo "$img_info" | grep -oE '[0-9]{3,4}x[0-9]{3,4}' | head -1)
img_w=$(echo "$img_info" | cut -d'x' -f1)
img_h=$(echo "$img_info" | cut -d'x' -f2)

if [ "$format" = "square" ]; then
  if [ "$img_w" -eq "$img_h" ]; then
    vf="scale=1080:1080,subtitles=sub.srt:force_style='$FONT_STYLE'"
  else
    crop_size=$(( img_w < img_h ? img_w : img_h ))
    vf="crop=${crop_size}:${crop_size}:(iw-${crop_size})/2:(ih-${crop_size})/2,scale=1080:1080,subtitles=sub.srt:force_style='$FONT_STYLE'"
  fi

  output="$track_dir/video/$track_name (1080x1080).mp4"

  "$FFMPEG" -y \
    -loop 1 -i bg_img \
    -i audio.wav \
    -vf "$vf" \
    -c:v libx264 -tune stillimage \
    -c:a aac -b:a 192k \
    -pix_fmt yuv420p -shortest \
    "$output"

elif [ "$format" = "youtube" ]; then
  output="$track_dir/video/$track_name (1920x1080).mp4"

  "$FFMPEG" -y \
    -loop 1 -i bg_img \
    -i audio.wav \
    -filter_complex "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=20:5[bg];[0:v]scale=-1:1080[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,subtitles=sub.srt:force_style='$FONT_STYLE'" \
    -c:v libx264 -tune stillimage \
    -c:a aac -b:a 192k \
    -pix_fmt yuv420p -shortest \
    "$output"

else
  echo "Error: Unknown format '$format'. Use 'square' or 'youtube'." >&2
  exit 1
fi

echo ""
echo "=== Generated: $output ==="
ls -lh "$output"
