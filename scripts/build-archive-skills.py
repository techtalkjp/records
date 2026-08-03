#!/usr/bin/env python3
"""制作の記録（アーカイブページ）のモーダル用に、各スキルの SKILL.md を JS へ埋め込む。

.claude/skills/<name>/SKILL.md を読んで
content/albums/01_claude-code-vs-codex/archive/assets/skills.js を生成する。
スキルを増減したら SKILLS を編集して再実行。

Usage: python3 scripts/build-archive-skills.py
"""
import json
from pathlib import Path

SKILLS = [
    "search-x-voices",
    "make-lyrics",
    "make-suno-prompt",
    "make-cover-art",
    "make-lyric-video",
    "make-release-post",
]


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    out = root / "content/albums/01_claude-code-vs-codex/archive/assets/skills.js"

    data = {}
    for name in SKILLS:
        src = root / ".claude/skills" / name / "SKILL.md"
        if not src.exists():
            print(f"SKIP (not found): {name}")
            continue
        data[name] = src.read_text(encoding="utf-8")

    # </script> でスクリプトが閉じないよう "</" をエスケープ（\/ は JSON 的に妥当）
    payload = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    out.write_text(
        "/* 自動生成: python3 scripts/build-archive-skills.py */\n"
        f"window.__SKILLS = {payload};\n",
        encoding="utf-8",
    )

    total = sum(len(v) for v in data.values())
    print(f"wrote {out.relative_to(root)} ({len(data)} skills, {total:,} chars)")


if __name__ == "__main__":
    main()
