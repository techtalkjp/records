#!/usr/bin/env python3
"""WhisperのJSONからセグメント＋word timestampsを見やすく出力する。
Usage: extract_timestamps.py <whisper.json>
"""
import json
import sys


def format_time(seconds: float) -> str:
    m, s = divmod(seconds, 60)
    return f"{int(m):02d}:{s:05.2f}"


def main():
    if len(sys.argv) < 2:
        print("Usage: extract_timestamps.py <whisper.json>", file=sys.stderr)
        sys.exit(1)

    with open(sys.argv[1]) as f:
        data = json.load(f)

    for seg in data["segments"]:
        words = seg.get("words", [])
        first = words[0]["start"] if words else seg["start"]
        last_end = words[-1]["end"] if words else seg["end"]
        text = seg["text"].strip()

        print(f"[{format_time(first)} -> {format_time(last_end)}] {text}")
        for w in words:
            print(f"  {w['start']:.2f}-{w['end']:.2f}: {w['word']}")
        print()


if __name__ == "__main__":
    main()
