# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a media asset repository for original music tracks themed around developer tools and tech culture. It is **not a software project**. Two fictional Japanese rapper characters — Claude Code and Codex — がdissやコラボを通じてAIエージェントの世界を描く。

## Structure

```
claude_code/         # Claude Code のトラック
codex/               # Codex のトラック
characters/          # キャラクター設定・画像
  claude-code/       #   Claude Code のリファレンス画像・ベースプロンプト
  codex/             #   Codex のリファレンス画像・ベースプロンプト
  claude-code.md     #   Claude Code の設定シート
  codex.md           #   Codex の設定シート
notes/               # リサーチノート
journals/            # 作業ログ
scripts/             # 画像生成スクリプト
```

### トラックのディレクトリ構造

```
source/
  lyrics.txt           # 歌詞
  styles.txt           # 音楽生成プロンプト（Suno用）
  track.wav            # Suno出力の音声
artwork/
  cover.jpg            # カバーアート 1:1（メイン）
  cover_wide.jpg       # カバーアート 16:9（YouTube用、cover.jpgから拡張）
  prompt.txt           # 使用した生成プロンプト
subtitle/
  whisper.json         # Whisperの生出力
  track.srt            # 字幕ファイル
video/
  トラック名 (1080x1080).mp4   # X用スクエア（cover.jpgから生成）
  トラック名 (1920x1080).mp4   # YouTube用16:9（cover_wide.jpgから生成）
```

## 制作フロー

### 1. 楽曲制作
歌詞を書き（`source/lyrics.txt`）、Suno用プロンプト（`source/styles.txt`）を作成、Sunoで音声生成（`source/track.wav`）。

### 2. カバーアート制作（`/make-cover-art`）
歌詞とキャラクター設定を読み、対話的にシーンを決めて画像を生成。
- `cover.jpg`（1:1）を先に作り、そこから `cover_wide.jpg`（16:9）を拡張生成
- ラッパーの世界観で見立てる（テック要素を直接見せない）
- モノクロ + アクセント1色（Claude Code: アンバー、Codex: 赤）

### 3. 字幕制作（`/make-lyric-video`）
Whisperでタイミング取得 → SRT作成 → バリデーション（問題0件まで）。

### 4. 動画生成（`/make-lyric-video`）
1曲ずつ X用 → 確認 → YouTube用 の順で生成。

## Conventions

- Track directories are numbered sequentially with a descriptive name
- Lyrics are in Japanese and follow a hip-hop structure with internal rhyme schemes
- Style descriptions are English-language production prompts targeting AI music generators
- キャラクター設定・歌詞を変更したら、関連するカバーアートと動画も更新する

## Skills

- `/make-cover-art` — カバーアート生成スキル。歌詞とキャラ設定からシーンを提案し、マルチターン会話で画像生成
- `/make-lyric-video` — 字幕付き動画生成スキル。Whisperでタイミング取得、SRTバリデーション、ffmpegで動画生成

修正して効果があった改善点は都度各スキルの SKILL.md に反映すること。

## Scripts

- `scripts/generate-image.ts` — 汎用画像生成（単発、参照画像対応）
- `scripts/generate-cover.ts` — カバーアート生成（マルチターン会話、ベースプロンプト自動読み込み）
