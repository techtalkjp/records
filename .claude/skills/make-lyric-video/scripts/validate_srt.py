#!/usr/bin/env python3
"""SRTファイルを検証し問題を検出する。
Usage: validate_srt.py <srt_file> [whisper.json]

whisper.jsonが指定された場合、タイミングの突き合わせも行う。
"""
import re
import json
import sys
from pathlib import Path


def parse_srt(path: str) -> list[dict]:
    """SRTファイルをパースしてエントリのリストを返す"""
    entries = []
    with open(path) as f:
        content = f.read()

    blocks = re.split(r"\n\n+", content.strip())
    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) < 3:
            continue

        try:
            index = int(lines[0])
        except ValueError:
            continue

        ts_match = re.match(
            r"(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})",
            lines[1],
        )
        if not ts_match:
            continue

        g = ts_match.groups()
        start = int(g[0]) * 3600 + int(g[1]) * 60 + int(g[2]) + int(g[3]) / 1000
        end = int(g[4]) * 3600 + int(g[5]) * 60 + int(g[6]) + int(g[7]) / 1000

        text_lines = lines[2:]
        entries.append(
            {
                "index": index,
                "start": start,
                "end": end,
                "lines": text_lines,
                "text": "\n".join(text_lines),
            }
        )

    return entries


def load_whisper_segments(path: str) -> list[dict]:
    """WhisperのJSONからセグメントを読み込み、word timestampsを含むリストを返す"""
    with open(path) as f:
        data = json.load(f)

    segments = []
    for seg in data["segments"]:
        words = seg.get("words", [])
        if not words:
            continue
        segments.append(
            {
                "start": words[0]["start"],
                "end": words[-1]["end"],
                "text": seg["text"].strip(),
                "words": words,
            }
        )
    return segments


def find_nearest_vocal_start(whisper_segments: list[dict], srt_start: float) -> tuple[float, float]:
    """SRTの開始時間に最も近いWhisperのword開始時間を見つけ、(vocal_start, diff)を返す"""
    best_diff = float("inf")
    best_start = None

    for seg in whisper_segments:
        for w in seg["words"]:
            diff = abs(w["start"] - srt_start)
            if diff < best_diff:
                best_diff = diff
                best_start = w["start"]
            # SRTの開始より十分後のwordに達したら打ち切り
            if w["start"] > srt_start + 5:
                break

    if best_start is None:
        return srt_start, 0.0

    return best_start, srt_start - best_start


def find_nearest_vocal_end(whisper_segments: list[dict], srt_end: float) -> tuple[float, float]:
    """SRTの終了時間に最も近いWhisperのword終了時間を見つけ、(vocal_end, diff)を返す"""
    best_diff = float("inf")
    best_end = None

    for seg in whisper_segments:
        for w in seg["words"]:
            diff = abs(w["end"] - srt_end)
            if diff < best_diff:
                best_diff = diff
                best_end = w["end"]

    if best_end is None:
        return srt_end, 0.0

    return best_end, srt_end - best_end


def display_width(s: str) -> int:
    """文字列の表示幅を計算（全角=2, 半角=1）"""
    return sum(2 if ord(c) > 127 else 1 for c in s)


def format_time(seconds: float) -> str:
    m, s = divmod(seconds, 60)
    return f"{int(m):02d}:{s:05.2f}"


def main():
    if len(sys.argv) < 2:
        print("Usage: validate_srt.py <srt_file> [whisper.json]", file=sys.stderr)
        sys.exit(1)

    srt_path = sys.argv[1]
    whisper_path = sys.argv[2] if len(sys.argv) > 2 else None

    entries = parse_srt(srt_path)
    whisper_segments = load_whisper_segments(whisper_path) if whisper_path else None

    issues = []
    timing_report = []

    for i, entry in enumerate(entries):
        prefix = f"#{entry['index']:2d} ({format_time(entry['start'])})"
        text_preview = entry["lines"][0][:20]

        # 表示時間チェック
        duration = entry["end"] - entry["start"]
        if duration < 1.5:
            issues.append(f"{prefix}: 表示時間が短い ({duration:.1f}秒) [{text_preview}]")

        # 終了<開始チェック
        if entry["end"] <= entry["start"]:
            issues.append(f"{prefix}: 終了時間が開始時間以前 [{text_preview}]")

        # 前エントリとの逆転チェック
        if i > 0:
            prev = entries[i - 1]
            if entry["start"] < prev["start"]:
                issues.append(
                    f"{prefix}: 前のエントリ(#{prev['index']})より開始が早い [{text_preview}]"
                )

        # 行の表示幅チェック
        for line in entry["lines"]:
            w = display_width(line)
            if w > 30:
                issues.append(f"{prefix}: 行が長い (幅{w}): {line}")

        # Whisperとのタイミング突き合わせ
        if whisper_segments:
            vocal_start, start_diff = find_nearest_vocal_start(whisper_segments, entry["start"])
            vocal_end, end_diff = find_nearest_vocal_end(whisper_segments, entry["end"])

            # 開始タイミング: 0.2〜0.6秒前が理想、0.15秒以内の遅れは許容
            start_ok = -0.6 <= start_diff <= -0.2
            if start_diff > 0.15:
                start_status = "⚠️  遅い"  # 歌い出し後に字幕表示（明らかに遅い）
                issues.append(
                    f"{prefix}: 字幕が歌い出しより{start_diff:.2f}秒遅い (vocal={format_time(vocal_start)}) [{text_preview}]"
                )
            elif start_diff < -1.0:
                start_status = "⚠️  早すぎ"  # 1秒以上前に表示
                issues.append(
                    f"{prefix}: 字幕が歌い出しより{-start_diff:.2f}秒早い (vocal={format_time(vocal_start)}) [{text_preview}]"
                )
            elif start_ok:
                start_status = "✓"
            elif start_diff > 0:
                start_status = "△ 微遅"  # 遅いが許容範囲
            else:
                start_status = "△"  # 早いが許容範囲

            # 終了タイミング: 歌い終わり以降であること
            if end_diff < -0.5:
                end_status = "⚠️  早切れ"
                issues.append(
                    f"{prefix}: 字幕が歌い終わりの{-end_diff:.2f}秒前に消える (vocal_end={format_time(vocal_end)}) [{text_preview}]"
                )
            else:
                end_status = "✓"

            timing_report.append(
                f"{prefix} {start_status:8s} start_diff={start_diff:+.2f}s  "
                f"{end_status:8s} end_diff={end_diff:+.2f}s  "
                f"{text_preview}"
            )

    # レポート出力
    if whisper_segments:
        print("=== タイミング突き合わせ ===")
        for line in timing_report:
            print(f"  {line}")
        print()

    if issues:
        print(f"問題 {len(issues)}件:")
        for issue in issues:
            print(f"  - {issue}")
    else:
        print("OK")


if __name__ == "__main__":
    main()
