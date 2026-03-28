---
name: make-lyric-video
description: トラックディレクトリから字幕付き動画を生成する。歌詞のタイミングをWhisperで取得し、背景画像＋音声＋字幕を合成してMP4を出力する。
argument-hint: [トラックディレクトリのパス]
allowed-tools: Bash(bash *, python *, /opt/homebrew/opt/ffmpeg-full/bin/ffmpeg *)
---

# 字幕付き歌詞動画の生成

トラックディレクトリ `$ARGUMENTS` から字幕付き動画を生成する。

## 前提

トラックディレクトリは以下の構造であること:
```
source/lyrics.txt    — 正しい歌詞テキスト
source/track.wav     — 音声ファイル
artwork/cover.png    — 背景画像（.jpeg も可）
subtitle/            — 字幕関連（whisper.json, track.srt を格納）
video/               — 最終成果物を格納
```

## 手順

### 1. Whisperでword-level timestampsを取得

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/whisper.sh "<トラックディレクトリ>/source/track.wav" "<トラックディレクトリ>/subtitle"
mv "<トラックディレクトリ>/subtitle/track.json" "<トラックディレクトリ>/subtitle/whisper.json"
```

取得したJSONからタイミングを確認:
```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/extract_timestamps.py "<トラックディレクトリ>/subtitle/whisper.json"
```

### 2. SRTファイルの作成

word-level timestampsを元に、`lyrics.txt` の正しい歌詞テキストで SRT を作成する。

#### タイミング
- **各エントリの開始時間は、実際の歌い出しより約0.4秒前倒しにする**（字幕を先に表示して読む時間を確保するため）
- **終了時間は実際の歌い終わりに合わせる** — 早く切れると歌詞が読み切れない。Whisperのword timestampsで最後の単語の終了時間を確認すること
- 歌い出し前（イントロ等）には字幕を出さない

#### テキスト
- 1エントリにつき1〜2行（韻の対や意味の区切りでまとめる）
- セクションタグ（[Verse 1] 等）は字幕に含めない
- Whisperの認識テキストは誤字が多いので必ず `lyrics.txt` の正しい歌詞に置き換える
- **固有名詞はアルファベット表記にする** — 「Claude Code」「Codex」など。カタカナ（コーデックス、クロードコード等）にしない
- **コマンド・関数名は小文字で表記する** — `diff`, `approve`, `sleep()`, `exit` など。略語（PR等）は大文字のまま
- **長い行は意味の区切りで改行する** — 1行が長すぎると自動折り返しで単語の途中（例: "Anthropi" / "c"）で切れて読みにくくなる。全角約15文字・半角約30文字を目安に、句の区切り（全角スペース `　` の位置）で改行を入れる

#### 字幕にしないもの
- **カッコ書き `()` のパート** — コーラスの掛け声・合いの手（(hey!) (yeah) (come on) (お前ら人間) 等）
- **同じフレーズの連続繰り返し** — バックコーラス（「ただの機械 ただの機械」→「ただの機械」のみ、「お前の未来 お前の未来」→1回のみ）
- **Outroやブリッジでのフック繰り返し** — 同じフレーズが何度もリピートされる部分は字幕を出さず、次のメインリリックで字幕を復活させる方がインパクトが出る

### 3. タイミング検証

動画を生成する前に、SRTをWhisperのJSONと突き合わせて検証する:
```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/validate_srt.py "<トラックディレクトリ>/subtitle/track.srt" "<トラックディレクトリ>/subtitle/whisper.json"
```

出力:
- 全エントリのタイミング突き合わせ一覧（✓=理想、△=許容、⚠️=要修正）
- 問題リスト（要修正のもののみ）

チェック内容:
- 開始時間が歌い出しの0.2〜0.6秒前か（0.15秒以内の遅れは許容）
- 終了時間が歌い終わりより前に切れていないか
- エントリ間のタイミング逆転がないか
- 表示時間が1.5秒未満のエントリがないか
- 行の表示幅（全角15文字・半角30文字超え）

**問題が0件になるまでSRTを修正すること。**

よくある問題と対処:
- **Whisperが複数行を1セグメントにまとめる** — word timestampsで行の境界を特定し、SRTを分割する
- **エントリの表示時間が短すぎる** — 最低1.5秒は表示する
- **Chorus/Bridgeの繰り返し部分でタイミングがズレる** — 各Chorusのタイミングは独立して確認する

### 4. 動画生成

**重要: 複数曲を処理する場合も1曲ずつ順番に生成→確認する。並列実行しない。**

#### X用（スクエア 1:1）
```bash
bash ${CLAUDE_SKILL_DIR}/scripts/generate_video.sh "<トラックディレクトリ>" square
```

#### YouTube用（16:9、字幕なし）
```bash
bash ${CLAUDE_SKILL_DIR}/scripts/generate_video.sh "<トラックディレクトリ>" youtube
```

YouTube用は字幕を動画に焼き込まない。SRTファイルはYouTube側で字幕として別アップする運用。

スクリプトが自動的に処理すること:
- source/track.wav, subtitle/track.srt, artwork/cover.* を検出
- 日本語ファイル名のシンボリックリンク作成→ffmpeg実行→リンク削除
- 画像を出力解像度にリサイズ（大きい画像でも動画サイズが肥大化しない）
- 画像が正方形でない場合、squareモードではcenter cropで1:1に
- youtubeモードではcover_wide.*を優先、字幕なしで生成
- ディレクトリ名からトラック名を抽出してファイル名に使用

### 5. 確認と修正

1. まずX用（スクエア）のみ生成してユーザーに確認してもらう
2. タイミングや字幕内容に問題があればSRTを修正→validate→再生成
3. OKが出たらYouTube用（16:9）も生成
4. 複数曲の場合は1曲ずつこのサイクルを回す
