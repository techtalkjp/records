#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow"]
# ///
"""
画像から指定アスペクト比（デフォルト 1:1）の最大領域を切り出す。

カバーアート制作の「16:9 を一枚生成して 1:1 に切り出す」方式で使う。
アウトペイントや部分エディットを重ねると顔・文字・建物が劣化するため、
ワイドを一枚ちゃんと作ってからこのスクリプトで正方形を切り出すのが安定。

Usage:
  uv run scripts/crop-square.py <input> <output> [options]

Options:
  --aspect W:H     切り出すアスペクト比 (default: 1:1)
  --hpos POS       水平位置。left / center / right、または 0.0〜1.0 (default: right)
                   0.0=左寄せ, 0.5=中央, 1.0=右寄せ。被写体が右寄りの構図なら right。
  --vpos POS       垂直位置。top / center / bottom、または 0.0〜1.0 (default: center)
  --quality N      JPEG 品質 (default: 95)

例（w02.jpg から右寄りで 1:1 を切り出す。今回の 07「またかよ」で使った設定）:
  uv run scripts/crop-square.py artwork/drafts/w02.jpg artwork/cover.jpg --hpos right
"""
import sys
from PIL import Image

NAMED = {"left": 0.0, "center": 0.5, "right": 1.0, "top": 0.0, "bottom": 1.0}


def parse_pos(v: str) -> float:
    if v in NAMED:
        return NAMED[v]
    try:
        f = float(v)
    except ValueError:
        sys.exit(f"invalid position: {v!r} (use left/center/right/top/bottom or 0.0-1.0)")
    return max(0.0, min(1.0, f))


def main() -> None:
    args = sys.argv[1:]
    if len(args) < 2:
        sys.exit(__doc__)
    inp, outp = args[0], args[1]
    aspect = (1, 1)
    hpos = 1.0  # default right-anchored
    vpos = 0.5  # default vertical center
    quality = 95
    i = 2
    while i < len(args):
        a = args[i]
        if a == "--aspect":
            w, h = args[i + 1].split(":")
            aspect = (int(w), int(h))
            i += 2
        elif a == "--hpos":
            hpos = parse_pos(args[i + 1]); i += 2
        elif a == "--vpos":
            vpos = parse_pos(args[i + 1]); i += 2
        elif a == "--quality":
            quality = int(args[i + 1]); i += 2
        else:
            sys.exit(f"unknown option: {a}")

    im = Image.open(inp)
    W, H = im.size
    ar = aspect[0] / aspect[1]

    # 入力に収まる最大の (ar) 矩形を求める
    if W / H > ar:
        crop_h = H
        crop_w = round(H * ar)
    else:
        crop_w = W
        crop_h = round(W / ar)

    left = round((W - crop_w) * hpos)
    top = round((H - crop_h) * vpos)
    box = (left, top, left + crop_w, top + crop_h)
    im.crop(box).save(outp, quality=quality)
    print(f"Saved: {outp} ({crop_w}x{crop_h}) from {inp} ({W}x{H}) box={box}")


if __name__ == "__main__":
    main()
