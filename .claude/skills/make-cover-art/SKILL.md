---
name: make-cover-art
description: トラックのカバーアート（ジャケット画像）を生成する。歌詞とキャラクター設定を読み込み、対話的にシーンを決めて、Gemini 3.1 Flash Image Previewで画像を生成する。カバーアート、ジャケット、アートワーク、サムネイル画像の生成に使う。
argument-hint: [トラックディレクトリのパス]
allowed-tools: Bash(bun *)
---

# カバーアート生成

トラック `$ARGUMENTS` のカバーアートを生成する。

## 前提

### ディレクトリ構造
```
<トラック>/source/lyrics.txt     — 歌詞
<トラック>/artwork/              — 生成した画像を保存
characters/<キャラ>/reference.jpg — キャラクター参照画像
characters/<キャラ>/base-prompt.md — キャラクターのベースプロンプト
characters/<キャラ>/graffiti_symbol.jpg — グラフィティシンボル
```

### キャラクター判別
- `claude_code/` 配下のトラック → `characters/claude-code/`
- `codex/` 配下のトラック → `characters/codex/`

## 手順

### 1. 素材を読み込む

- `source/lyrics.txt` を読む
- 該当キャラクターの `base-prompt.md` を読む
- 該当キャラクターの `characters/*.md`（設定シート）を読む

### 2. シーンを対話的に決める

歌詞のテーマ、ムード、キーフレーズを分析し、カバーアートのシーン案を**3つ**提案する。

各案には以下を含める：
- シーンの描写（どんな場面か）
- 歌詞との接点（どのフレーズがビジュアルに反映されるか）
- 構図のイメージ（正面、横、引き、寄り etc）

ユーザーが案を選ぶか、方向性をフィードバックしたら、それに基づいてプロンプトを作成する。

### 3. プロンプトを作成する

#### 核心原則
- **「シーンを描写せよ、キーワードを並べるな」** — 説明的な文章（ナラティブ）で書く。キーワードの羅列より一貫性のある画像になる
- **地名を直接書かない** — 「Roppongi」と書くと看板に「六本木」と貼られるだけ。実際の路地裏の視覚的特徴を描写する（配管、室外機、小さなバーのドア、etc）
- **プロンプトはシンプルに** — 複雑にするほど不安定になる。過剰な指示は逆効果
- **キャラの身体的特徴はプロンプトに含めない** — 参照画像が担う。シーンと行動だけを指示する

#### プロンプトテンプレート（参考）
```
A photorealistic [ショットタイプ] of this person, [アクション/表情],
set in [環境の視覚的描写]. Illuminated by [ライティング],
creating [ムード] atmosphere. [カメラ/レンズの指定].
No text, no watermarks.
```

写真用語を使うと精密にコントロールできる：
- ショットタイプ: close-up, medium shot, wide establishing shot
- レンズ: 85mm portrait lens, 35mm wide angle
- ライティング: single amber streetlight, neon glow, backlit silhouette

#### ラッパーの世界観で見立てる（重要）
テック要素（ターミナル、コード、モニター）を直接見せない。ラッパーの世界観に翻訳する：
- ターミナル → **レコーディングスタジオ、路地裏**（一人で向き合う場所）
- コードを書く → **リリックを書く、マイクの前に立つ**
- 深夜のコーディング → **深夜のストリート、スタジオ**
- テック要素を直接見せるとラッパーとしてのリアリティが崩れる

#### boom-bap の美学
- モノクロベース + アクセント1色（Claude Code: アンバー/オレンジ、Codex: 赤）
- ストリートの質感（コンクリート、グラフィティ、濡れた路面）
- 夜・暗所のライティング
- スプリットライティング（顔の半分だけ照らす）が強いインパクトを出す

#### 歌詞からのシンボル埋め込み
歌詞に出てくる場所やオブジェクトをさりげなく配置する。直接的でなく、わかる人にはわかるレベルで。

#### サムネイル映え
SpotifyやXでは小さく表示される。シンプルな構図、コントラストの強い配色を意識する。

### 4. 画像を生成する

**中間ファイルはすべて `artwork/drafts/` に保存する。** 最終ディレクトリを散らかさないため。

```bash
mkdir -p <トラック>/artwork/drafts
```

`scripts/generate-cover.ts` を使う。マルチターン会話、thought_signature、グラウンディングを自動処理する。

#### 新規生成（Turn 1 ベースショット + Turn 2 シーン派生）
```bash
bun scripts/generate-cover.ts <character> "<シーンプロンプト>" <出力パス>
```

例:
```bash
bun scripts/generate-cover.ts claude-code \
  "This person standing in a dark narrow alley at night, body facing forward. Hard split lighting, half face lit, half in shadow. Monochrome. Graffiti on wall." \
  claude_code/02_ターミナルの誇り/artwork/drafts/01.jpg
```

#### `generate-image.ts` で直接生成する場合（キャラなし等）
```bash
bun scripts/generate-image.ts "<プロンプト>" <トラック>/artwork/drafts/01.jpg --aspect-ratio 1:1
```

#### 既存画像の編集
```bash
bun scripts/generate-cover.ts <character> --edit "<編集指示>" <画像パス>
```

例:
```bash
bun scripts/generate-cover.ts claude-code \
  --edit "Apply extreme split lighting. Only left half of face lit." \
  claude_code/02_ターミナルの誇り/artwork/drafts/01.jpg
```

#### ファイル命名規則（drafts内）
- 連番で `01.jpg`, `02.jpg`, ... と名前をつける
- ワイド版は `01_wide.jpg`, `02_wide.jpg`, ...
- グラフィティシンボル生成時は `characters/<キャラ>/drafts/` を使う

#### ワイド版（16:9）の生成

**まず outpaint を試し、顔が歪んだらマルチターンで再生成する。**

##### 方法1: outpaint（推奨・まず試す）

`generate-image.ts --input` でスクエア版を入力し、左右を拡張する。同じ画像をベースにするため構図の一貫性が高い。

```bash
bun scripts/generate-image.ts \
  "Outpaint this image to 16:9 widescreen by adding more environment on the left and right sides only. Do not stretch, resize, or modify the original image content in any way. The person's face and body proportions must remain exactly as they are. [環境の描写]. Match the existing lighting and atmosphere." \
  <トラック>/artwork/drafts/01_wide.jpg \
  --aspect-ratio 16:9 \
  --input <トラック>/artwork/cover.jpg
```

- 明るい画像（昼間・自然光）は歪みが目立ちにくく成功しやすい
- 暗い画像（夜・ハードライト）は顔のプロポーションが崩れやすい
- 生成後、必ず顔が縦長/横長に歪んでいないか確認する

##### 方法2: マルチターン再生成（outpaintで顔が歪んだ場合のフォールバック）

スクエア版と同じプロンプトをベースに、最初から16:9で生成する。顔の一貫性は高いが、構図が変わる。

```bash
bun scripts/generate-cover.ts <character> "<シーンプロンプト>" <出力パス> --aspect-ratio 16:9
```

- プロンプトに「A wide 16:9 cinematic composition」等のワイド構図指示を追加する
- マルチターンなので毎回異なる画像になる点に注意

##### 使ってはいけない方法

- `generate-cover.ts --edit` でのアスペクト比変更 — editモードはアスペクト比がハードコードされており変更できない

#### 設定（スクリプトに組み込み済み）
- **アスペクト比**: 1:1（スクエア）、`--aspect-ratio 16:9` でワイド指定可能
- **解像度**: 4K
- **Thinking**: High（品質重視）
- **グラウンディング**: Turn 2で自動有効化
- **5ターンの壁**: 5ターン超えると顔が崩れる。長くなったらスクリプトを再実行してTurn 1からやり直す

#### 注意点
- AIに「モノクロにして」と編集を重ねるとカラーに戻ることがある。最初からプロンプトに「full black and white monochrome」と入れる方が確実
- 編集はJPEG再圧縮で画質劣化する。できるだけ少ない編集回数で仕上げる
- outpaintは明るい画像では成功しやすいが、暗い画像では顔が歪みやすい。歪んだらマルチターンで再生成する

#### 顔一貫性のポイント（マルチターン方式）

- ベースプロンプトは一切改変しない
- Turn 2の派生プロンプトには3要素を必ず含める：
  1. 同一人物の明示（Same person, identical face）
  2. 固有特徴のリマインド（base-prompt.mdの派生ターン用テンプレートを使う）
  3. 変更点のみ記述
- 一度に大きく変えない。背景だけ、ポーズだけ、と段階的に
- 「CRITICAL: MAINTAIN EXACT SAME FACE」のような強調指示は逆効果
- 顔が大きく映る構図を優先。全身ショットは一貫性が落ちる

### 5. 確認と改善

- 生成した画像をユーザーに見せる（Read ツールで表示し、`open` コマンドで自動的に開く）
- フィードバックを受けて修正。一度に一つだけ変える
- 確定したら `artwork/drafts/` から `artwork/cover.jpg` にコピー
- ワイド版も確定したら `artwork/cover_wide.jpg` にコピー
- 使用したプロンプトを `artwork/prompt.txt` に保存
- **確定後、`artwork/drafts/` ディレクトリを削除してクリーンアップする**

### 6. 既存のカバーアートがある場合

既存の `artwork/cover.*` がある場合、ユーザーにバックアップが必要か確認する。必要なら `artwork/cover_backup.*` として保存してから差し替える。
