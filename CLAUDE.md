# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a media asset repository for original music tracks themed around developer tools and tech culture. It is **not a software project** — there are no build, test, or lint commands.

## Structure

- `claude_code/` — Tracks about Claude Code (Japanese hip-hop/rap)
- `codex/` — Tracks about Codex (Japanese hip-hop/rap)

Each track lives in a numbered directory (e.g., `01_Complexes_on_the_Codex/`) with the following structure:

```
source/          # 制作素材（人が書いたもの + Sunoからのダウンロード）
  lyrics.txt     # 歌詞
  styles.txt     # 音楽生成プロンプト
  track.wav      # Suno出力の音声
artwork/         # カバーアート
  cover.png/jpeg # 画像（将来的にprompt.txtも配置）
subtitle/        # 字幕関連の中間成果物
  whisper.json   # Whisperの生出力
  track.srt      # 字幕ファイル
video/           # 最終成果物（トラック名付き）
  トラック名 (1080x1080).mp4   # X用スクエア
  トラック名 (1920x1080).mp4   # YouTube用16:9
```

## Conventions

- Track directories are numbered sequentially with a descriptive name
- Lyrics are in Japanese and follow a hip-hop structure with internal rhyme schemes
- Style descriptions are English-language production prompts targeting AI music generators

## Skills

- `/make-lyric-video` — 字幕付き動画生成スキル。修正して効果があった改善点は都度スキル（`.claude/skills/make-lyric-video/SKILL.md`）に反映すること
