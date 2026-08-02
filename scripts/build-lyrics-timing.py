#!/usr/bin/env python3
"""subtitle/track.srt をサイト用のタイミング付き歌詞JSONに変換して site/public/lyrics/ に出力する。
新トラック追加時はTRACKSに1行足して再実行。
Usage: python3 scripts/build-lyrics-timing.py
"""
import json
import re
from pathlib import Path

TRACKS = [
    ("claude-code/01_Complexes_on_the_Codex", "claude-code", "01-complexes-on-the-codex"),
    ("codex/01_Hourglass_on_the_Claude_Code", "codex", "01-hourglass-on-the-claude-code"),
    ("claude-code/02_ターミナルの誇り", "claude-code", "02-terminal-no-hokori"),
    ("codex/02_なんでだよ", "codex", "02-nandedayo"),
    ("claude-code/03_ブランチ切るたび未来が分岐", "claude-code", "03-branch-kirutabi"),
    ("claude-code/04_行ってこい", "claude-code", "04-ittekoi"),
    ("codex/03_ログだけ", "codex", "03-log-dake"),
    ("codex/04_言わなかっただけ", "codex", "04-iwanakatta-dake"),
    ("claude-code/05_コード読まなくてOK", "claude-code", "05-code-yomanakute-ok"),
    ("codex/05_三日天下", "codex", "05-mikka-tenka"),
    ("claude-code/06_おバカモード", "claude-code", "06-obaka-mode"),
    ("codex/06_在庫", "codex", "06-zaiko"),
    ("claude-code/07_またな", "claude-code", "07-matana"),
    ("codex/07_またかよ", "codex", "07-matakayo"),
    ("claude-code/08_アンプラグド", "claude-code", "08-unplugged"),
    ("codex/08_セカンドバース", "codex", "08-second-verse"),
    ("codex/09_サイファー", "codex", "09-cypher"),
    ("claude-code/09_マイクチェック", "claude-code", "09-mic-check"),
]

TS = re.compile(r"(\d{2}):(\d{2}):(\d{2})[,.](\d{3})")

def ts(s: str) -> float:
    m = TS.match(s)
    h, mi, se, ms = map(int, m.groups())
    return h * 3600 + mi * 60 + se + ms / 1000

def parse_srt(text: str):
    lines = []
    for block in re.split(r"\n\s*\n", text.strip()):
        rows = block.strip().splitlines()
        if len(rows) < 2:
            continue
        # 1行目=連番(省略可), タイムコード行を探す
        ti = 0 if "-->" in rows[0] else 1
        if ti >= len(rows) or "-->" not in rows[ti]:
            continue
        start_s, end_s = [p.strip() for p in rows[ti].split("-->")]
        body = "\n".join(rows[ti + 1:]).strip()
        if body:
            lines.append({"start": round(ts(start_s), 2), "end": round(ts(end_s), 2), "text": body})
    return lines

def main():
    root = Path(__file__).resolve().parent.parent
    outroot = root / "site" / "public" / "lyrics"
    for d, artist, slug in TRACKS:
        srt = root / "content" / "tracks" / d / "subtitle" / "track.srt"
        if not srt.exists():
            print(f"SKIP (no srt): {d}")
            continue
        lines = parse_srt(srt.read_text())
        out = outroot / artist / f"{slug}.json"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps({"lines": lines}, ensure_ascii=False))
        print(f"{out.relative_to(root)}: {len(lines)} lines")

if __name__ == "__main__":
    main()
