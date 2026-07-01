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
  lyrics.txt           # 歌詞（漢字表記・表示用）
  suno_prompt.txt      # Suno歌詞欄に貼る内容（ひらがな＋アノテーション）
  styles.txt           # Suno Style欄に入力するタグ
  sliders.txt          # Suno Exclude＋スライダー設定
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

### 0. ネタ収集（`/search-x-voices`、必要なら）
歌詞の方向性が固まりきってない時、X でリアルなプログラマーの声を Grok API 経由で収集。`notes/rap-material-from-x.md` に追記して以降のフローに渡す。

### 1. 歌詞を作る（`/make-lyrics`）
テーマ・キャラクター・ネタ素材から、韻ペアと構成を対話的に作成し、この段階で歌詞を完成させる。japanese-rap スキルで韻を検証しながらイテレーション。**Suno はほぼそのまま歌う**ため、「素材」ではなく最終稿のつもりで詰め切る。

### 2. Suno 入力を準備（`/make-suno-prompt`）
完成した歌詞を Suno V5.5 用フォーマットに変換（内容・言葉選びはここでは変えない）。漢字→ひらがな、アノテーションタグ付与、V5.5 タグ形式の styles.txt 生成。sliders.txt に Exclude とスライダー設定を記録。

### 3. Suno で音声生成（手動）
suno_prompt.txt を Suno に貼って生成（歌詞通りに歌われる想定）。出力を `source/track.wav` に保存、確定済みの歌詞を `source/lyrics.txt` に漢字表記で記録。

### 4. カバーアート制作（`/make-cover-art`）
歌詞とキャラクター設定を読み、対話的にシーンを決めて画像を生成。
- `cover.jpg`（1:1）を先に作り、そこから `cover_wide.jpg`（16:9）を拡張生成
- ラッパーの世界観で見立てる（テック要素を直接見せない）
- モノクロ + アクセント1色（Claude Code: アンバー、Codex: 赤）

### 5. 字幕制作（`/make-lyric-video`）
Whisperでタイミング取得 → SRT作成 → バリデーション（問題0件まで）。

### 6. 動画生成（`/make-lyric-video`）
1曲ずつ X用 → 確認 → YouTube用 の順で生成。

## Conventions

- Track directories are numbered sequentially with a descriptive name
- Lyrics are in Japanese and follow a hip-hop structure with internal rhyme schemes
- Style descriptions are English-language production prompts targeting AI music generators
- キャラクター設定・歌詞を変更したら、関連するカバーアートと動画も更新する

## Skills

- `/search-x-voices` — X（旧Twitter）でプログラマーのリアルな声を収集。Grok API の x_search 経由。歌詞のネタ・あるある素材集め用
- `/make-lyrics` — 歌詞を作成。テーマ・キャラ・ネタ素材から韻ペアと構成を対話的に作り、完成形まで仕上げる（Sunoはほぼそのまま歌うため、ここで決め切る）
- `/make-suno-prompt` — 完成した歌詞を Suno V5.5 用入力セットに変換。漢字→ひらがな変換、アノテーションタグ、タグ形式 styles.txt（歌詞の内容自体は変えない）
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
- `scripts/search-x.ts` — X 検索（Grok API の x_search 経由）。引数に渡した JSON のクエリと期間で実行。`/search-x-voices` スキルから呼ばれる

## サイト公開フロー

`site/` は Cloudflare Workers にホスト（records.techtalk.jp）。**デプロイは main への PR マージで自動実行**されるため、ローカルから `npm run deploy` / `wrangler deploy` を叩かないこと。

新曲公開時の手順:
1. `site/public/images/<artist>/<slug>.webp` と `-wide.webp` を配置
2. `site/app/data/tracks.ts` にエントリ追加（`released: true`、`links.youtube` 等）
3. `site/react-router.config.ts` の `prerender` 配列に `/tracks/<artist>/<slug>` を追加
4. PR を作ってマージ → デプロイ完了

音声ファイルは R2（`audio.records.techtalk.jp`）に `scripts/convert-audio.sh` で `wrangler r2 object put` する別フロー。
