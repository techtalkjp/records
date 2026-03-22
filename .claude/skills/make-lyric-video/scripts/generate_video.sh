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

# 画像検出: youtubeモードではcover_wide.*を優先
if [ "$format" = "youtube" ]; then
  img_file=$(find "$track_dir/artwork" -maxdepth 1 -name "cover_wide.*" \( -name "*.jpeg" -o -name "*.jpg" -o -name "*.png" \) | head -1)
fi
# cover_wideがなければ通常のcover.*を使用
if [ -z "${img_file:-}" ]; then
  img_file=$(find "$track_dir/artwork" -maxdepth 1 -name "cover.*" \( -name "*.jpeg" -o -name "*.jpg" -o -name "*.png" \) | head -1)
fi

if [ ! -f "$wav_file" ] || [ ! -f "$srt_file" ] || [ -z "$img_file" ]; then
  echo "Error: Required files not found in $track_dir" >&2
  echo "  wav: $wav_file $([ -f "$wav_file" ] && echo OK || echo NOT FOUND)" >&2
  echo "  srt: $srt_file $([ -f "$srt_file" ] && echo OK || echo NOT FOUND)" >&2
  echo "  img: ${img_file:-NOT FOUND}" >&2
  exit 1
fi

echo "Using image: $img_file"

# 出力ディレクトリ
mkdir -p "$track_dir/video"

# 作業ディレクトリ
work_dir=$(mktemp -d)
ln -sf "$(realpath "$srt_file")" "$work_dir/sub.srt"
ln -sf "$(realpath "$wav_file")" "$work_dir/audio.wav"

cleanup() {
  rm -rf "$work_dir"
}
trap cleanup EXIT

cd "$work_dir"

if [ "$format" = "square" ]; then
  # 画像を先に1080x1080にリサイズ（高速化）
  "$FFMPEG" -y -i "$(realpath "$img_file")" -vf "scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2:black" -q:v 1 -update 1 bg_img.jpg 2>/dev/null

  output="$track_dir/video/$track_name (1080x1080).mp4"

  "$FFMPEG" -y \
    -loop 1 -i bg_img.jpg \
    -i audio.wav \
    -vf "subtitles=sub.srt:force_style='$FONT_STYLE'" \
    -c:v libx264 -tune stillimage \
    -c:a aac -b:a 192k \
    -pix_fmt yuv420p -shortest \
    "$output"

elif [ "$format" = "youtube" ]; then
  # cover_wide.jpgがある場合はそのまま1920x1080にリサイズ
  # ない場合はcover.jpgからぼかし背景で生成
  img_info=$("$FFMPEG" -i "$(realpath "$img_file")" 2>&1 || true)
  img_dims=$(echo "$img_info" | grep -oE '[0-9]{3,4}x[0-9]{3,4}' | head -1)
  img_w=$(echo "$img_dims" | cut -d'x' -f1)
  img_h=$(echo "$img_dims" | cut -d'x' -f2)

  # アスペクト比判定（16:9に近いかどうか）
  ratio=$(echo "$img_w $img_h" | awk '{printf "%.2f", $1/$2}')
  is_wide=$(echo "$ratio" | awk '{print ($1 > 1.5) ? "yes" : "no"}')

  if [ "$is_wide" = "yes" ]; then
    # ワイド画像 → そのまま1920x1080にリサイズ
    "$FFMPEG" -y -i "$(realpath "$img_file")" -vf "scale=1920:1080" -q:v 1 -update 1 bg_img.jpg 2>/dev/null
    vf="subtitles=sub.srt:force_style='$FONT_STYLE'"
  else
    # スクエア画像 → ぼかし背景で16:9に
    "$FFMPEG" -y -i "$(realpath "$img_file")" -vf "scale=1920:1080:force_original_aspect_ratio=decrease" -q:v 1 -update 1 fg_img.jpg 2>/dev/null
    "$FFMPEG" -y -i "$(realpath "$img_file")" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=20:5" -q:v 1 -update 1 bg_blur.jpg 2>/dev/null
    # 合成
    "$FFMPEG" -y -i bg_blur.jpg -i fg_img.jpg -filter_complex "overlay=(W-w)/2:(H-h)/2" -q:v 1 -update 1 bg_img.jpg 2>/dev/null
    vf="subtitles=sub.srt:force_style='$FONT_STYLE'"
  fi

  output="$track_dir/video/$track_name (1920x1080).mp4"

  "$FFMPEG" -y \
    -loop 1 -i bg_img.jpg \
    -i audio.wav \
    -vf "$vf" \
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
