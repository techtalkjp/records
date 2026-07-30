#!/usr/bin/env python3
"""DistroKid歌詞アップロード用に lyrics.txt を整形して1フォルダに集める。

ルール（DistroKidの歌詞ガイドライン準拠）:
- [Verse] 等のセクションタグ行を除去
- ト書き行（（カツ、カツ……）等、全文が括弧の行）と括弧内アドリブ ((hey!) 等) を除去
- 行末の句読点・記号を除去
- 行頭がアルファベットなら大文字化
- 冒頭のタイトル行（曲名と同一）を除去
- 空行は連続させない（節間の1行のみ）
"""
import re, sys, unicodedata
from pathlib import Path

TRACKS = [
    ("01", "claude-code/01_Complexes_on_the_Codex", "Complexes on the Codex"),
    ("02", "codex/01_Hourglass_on_the_Claude_Code", "Hourglass on the Claude Code"),
    ("03", "claude-code/02_ターミナルの誇り", "ターミナルの誇り"),
    ("04", "codex/02_なんでだよ", "なんでだよ"),
    ("05", "claude-code/03_ブランチ切るたび未来が分岐", "ブランチ切るたび未来が分岐"),
    ("06", "claude-code/04_行ってこい", "行ってこい"),
    ("07", "codex/03_ログだけ", "ログだけ"),
    ("08", "codex/04_言わなかっただけ", "言わなかっただけ"),
    ("09", "claude-code/05_コード読まなくてOK", "コード読まなくてOK"),
    ("10", "codex/05_三日天下", "三日天下"),
    ("11", "claude-code/06_おバカモード", "おバカモード"),
    ("12", "codex/06_在庫", "在庫"),
    ("13", "claude-code/07_またな", "またな"),
    ("14", "codex/07_またかよ", "またかよ"),
    ("15", "claude-code/08_アンプラグド", "アンプラグド"),
    ("16", "codex/08_セカンドバース", "セカンドバース"),
    ("17", "codex/09_サイファー", "サイファー"),
    ("18", "claude-code/09_マイクチェック", "マイクチェック"),
]

TRAIL = "。、．，！？!?…‥・～〜 　\t——―-"

def clean(raw: str, title: str) -> str:
    out = []
    for i, line in enumerate(raw.splitlines()):
        line = line.strip()
        if i == 0 and line == title:
            continue
        if re.fullmatch(r"\[.*\]", line):          # セクションタグ
            continue
        if re.fullmatch(r"[（(].*[）)]", line):     # ト書き・掛け声のみの行
            continue
        line = re.sub(r"[（(][^（）()]*[）)]", "", line)  # 行中のアドリブ括弧
        line = line.strip().rstrip(TRAIL)
        line = line.lstrip("…‥—―")
        line = line.strip()
        if line and line[0].isascii() and line[0].isalpha():
            line = line[0].upper() + line[1:]
        out.append(line)
    # 空行を節間の1行に正規化し、前後の空行を除去
    text, prev_blank = [], True
    for l in out:
        if l == "":
            if not prev_blank:
                text.append("")
            prev_blank = True
        else:
            text.append(l)
            prev_blank = False
    while text and text[-1] == "":
        text.pop()
    return "\n".join(text) + "\n"

def main():
    root = Path(__file__).resolve().parent.parent
    outdir = root / "dist-album" / "claude-code-vs-codex-lyrics"
    outdir.mkdir(parents=True, exist_ok=True)
    for num, d, title in TRACKS:
        src = root / "content" / "tracks" / d / "source" / "lyrics.txt"
        dst = outdir / f"{num} {title}.txt"
        dst.write_text(clean(src.read_text(), title))
        print(dst.relative_to(root))

if __name__ == "__main__":
    main()
