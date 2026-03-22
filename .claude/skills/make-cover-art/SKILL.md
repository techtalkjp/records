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

`scripts/generate-cover.ts` を使う。マルチターン会話、thought_signature、グラウンディングを自動処理する。

#### 新規生成（Turn 1 ベースショット + Turn 2 シーン派生）
```bash
bun scripts/generate-cover.ts <character> "<シーンプロンプト>" <出力パス>
```

例:
```bash
bun scripts/generate-cover.ts claude-code \
  "This person standing in a dark narrow alley at night, body facing forward. Hard split lighting, half face lit, half in shadow. Monochrome. Graffiti on wall." \
  claude_code/02_ターミナルの誇り/artwork/cover_new.jpg
```

#### 既存画像の編集
```bash
bun scripts/generate-cover.ts <character> --edit "<編集指示>" <画像パス>
```

例:
```bash
bun scripts/generate-cover.ts claude-code \
  --edit "Apply extreme split lighting. Only left half of face lit." \
  claude_code/02_ターミナルの誇り/artwork/cover_new.jpg
```

#### 設定（スクリプトに組み込み済み）
- **アスペクト比**: 1:1（スクエア）
- **解像度**: 4K
- **Thinking**: High（品質重視）
- **グラウンディング**: Turn 2で自動有効化
- **5ターンの壁**: 5ターン超えると顔が崩れる。長くなったらスクリプトを再実行してTurn 1からやり直す

#### 注意点
- AIに「モノクロにして」と編集を重ねるとカラーに戻ることがある。最初からプロンプトに「full black and white monochrome」と入れる方が確実
- 編集はJPEG再圧縮で画質劣化する。できるだけ少ない編集回数で仕上げる

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

- 生成した画像をユーザーに見せる（Read ツールで表示）
- フィードバックを受けて修正。一度に一つだけ変える
- 確定したら `artwork/cover.jpg` (or .png) として保存
- 使用したプロンプトを `artwork/prompt.txt` に保存

### 6. 既存のカバーアートがある場合

既存の `artwork/cover.*` がある場合は、上書きせず `artwork/cover_new.*` として保存し、ユーザーに確認してから差し替える。
