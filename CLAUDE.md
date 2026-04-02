# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a media asset repository for original music tracks themed around developer tools and tech culture. It is **not a software project**. Two fictional Japanese rapper characters — Claude Code and Codex — がdissやコラボを通じてAIエージェントの世界を描く。

## Structure

```
content/
  artists/
    claude-code/
      profile.md       # キャラクター設定シート
      images/          # リファレンス画像・ベースプロンプト
    codex/
      profile.md
      images/
  tracks/
    claude-code/       # Claude Code のトラック
    codex/             # Codex のトラック
site/                  # 公式サイト (records.techtalk.jp)
  app/               #   React Router v7 アプリ
  public/            #   静的アセット（カバーアート等）
scripts/               # 画像生成スクリプト
notes/                 # リサーチノート
journals/              # 作業ログ
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

### 1. 歌詞の元を生成（`/make-lyrics`）
テーマ・キャラクター・ネタ素材から、韻ペアと骨格を対話的に作成。japanese-rap スキルで韻を検証しながらイテレーション。

### 2. Suno 入力を準備（`/make-suno-prompt`）
歌詞の元を Suno V5.5 用フォーマットに変換。漢字→ひらがな、アノテーションタグ付与、V5.5 タグ形式の styles.txt 生成。

### 3. Suno で音声生成（手動）
suno_prompt.txt を Suno に貼って生成。出力を `source/track.wav` に保存、最終歌詞を `source/lyrics.txt` に記録。

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

- `/make-lyrics` — 歌詞の元を生成。テーマ・キャラ・ネタ素材から韻ペアと骨格を対話的に作成
- `/make-suno-prompt` — Suno V5.5 用入力セット生成。漢字→ひらがな変換、アノテーションタグ、タグ形式 styles.txt
- `/make-cover-art` — カバーアート生成スキル。歌詞とキャラ設定からシーンを提案し、マルチターン会話で画像生成
- `/make-lyric-video` — 字幕付き動画生成スキル。Whisperでタイミング取得、SRTバリデーション、ffmpegで動画生成
- `/make-release-post` — リリース告知文作成スキル。X投稿やYouTube概要欄を対話的に作成。韻パート生成にjapanese-rapスキルを使用

修正して効果があった改善点は都度各スキルの SKILL.md に反映すること。

## 画像生成時のファイル管理

- 中間ファイルは保存先ディレクトリ内の `drafts/` に連番で保存（`01.jpg`, `02.jpg`, ...）
- ワイド版は `01_wide.jpg`, `02_wide.jpg`, ...
- 確定したら最終ファイル（`cover.jpg` 等）にコピーし、`drafts/` を削除してクリーンアップ
- 生成した画像は Read ツールで表示し、`open` コマンドで自動的に開く

## Scripts

- `scripts/generate-image.ts` — 汎用画像生成（単発、参照画像対応）
- `scripts/generate-cover.ts` — カバーアート生成（マルチターン会話、ベースプロンプト自動読み込み）
