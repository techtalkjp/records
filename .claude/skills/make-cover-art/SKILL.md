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
content/artists/<キャラ>/images/reference.jpg — キャラクター参照画像
content/artists/<キャラ>/images/base-prompt.md — キャラクターのベースプロンプト
content/artists/<キャラ>/images/graffiti_symbol.jpg — グラフィティシンボル
```

### キャラクター判別
- `claude-code/` 配下のトラック → `content/artists/claude-code/`
- `codex/` 配下のトラック → `content/artists/codex/`

## 手順

### 1. 素材を読み込む

- `source/lyrics.txt` を読む
- 該当キャラクターの `content/artists/<キャラ>/images/base-prompt.md` を読む
- 該当キャラクターの `content/artists/<キャラ>/profile.md`（設定シート）を読む

### 2. シーンを対話的に決める

**まず [composition-reference.md](composition-reference.md) を読み、構図テクニックとアンチパターンを把握すること。**

歌詞のテーマ、ムード、キーフレーズを分析し、カバーアートのシーン案を**3つ**提案する。

各案には以下を含める：
- シーンの描写（どんな場面か）
- 使用する構図テクニック（composition-reference.md から選択。名前と理由）
- 歌詞との接点（どのフレーズがビジュアルに反映されるか）

**既存のカバーアートとの差別化を必ず確認する。** 他トラックのカバーアートを読み込み、構図・色味・ロケーションが被らないようにする。

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

#### ビジュアルのデフォルト
以下はシリーズの基本トーンだが、曲の方向性に合わせて大胆に変えてよい。ユーザーに確認して決める。

- **デフォルト**: モノクロベース + アクセント1色（Claude Code: アンバー/オレンジ、Codex: 赤）
- **デフォルト**: ストリートの質感（コンクリート、グラフィティ、濡れた路面）、夜・暗所のライティング
- スプリットライティング（顔の半分だけ照らす）が強いインパクトを出す
- **例外**: チルな曲なら暖色のゴールデンアワー、自然光、河川敷などストリートから離れた舞台もあり（03「ログだけ」参照）

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
- グラフィティシンボル生成時は `content/artists/<キャラ>/images/drafts/` を使う

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
- **「シーンを広げる」ではなく「既存の要素の隣に同種の要素を足す」と指示する** — 「extend the alley」のような抽象的な指示だと新しい構造物（道、交差点等）が生成されて不自然になる。「add more [具体的な要素] adjacent to the existing ones」のように、今ある物の延長を具体的に指示する

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

画像を生成したら、**ユーザーに見せる前に自分で客観的に評価する。** 以下のチェックリストを使い、問題点を正直に伝えること。良い点だけ挙げて問題を隠さない。

#### 生成後セルフレビュー（必須）

画像を Read ツールで表示し、以下を確認してからユーザーに所見を伝える：

1. **物理的整合性** — 反射、影、光源の方向、人体のプロポーションが物理的に正しいか
2. **意図との一致** — プロンプトで指示した構図・ポーズ・表情が実現されているか
3. **ロケーションの正確性** — 特定の場所を指定した場合、実際のその場所に見えるか（見えないなら正直に「○○には見えない」と言う）
4. **キャラクター設定の一致** — 服装、タトゥーの位置（左前腕内側のみ）、ヒゲ（2mmの均一なスタブル）、首のタトゥーなど
5. **既存カバーアートとの差別化** — 構図・色味・ロケーションが他トラックと被っていないか
6. **カバーアートとしての強さ** — サムネイルで小さく表示されたとき目を引くか。ただの写真になっていないか
7. **テキスト・看板** — 読める日本語テキストが生成されていないか（野暮になる）

**評価テンプレート:**
```
[良い点] ○○が効いている
[問題点] ○○が意図と違う / ○○が物理的におかしい / ○○に見えない
[判定] このまま進める / 修正が必要 / 作り直し
```

問題があるなら「いい感じ」とは言わない。問題を先に伝えてからユーザーに判断を仰ぐ。

#### 改善サイクル

- `open` コマンドで画像を自動的に開く
- フィードバックを受けて修正。一度に一つだけ変える
- editは画質劣化するので最大2回まで。それ以上必要なら新規生成し直す
- 確定したら `artwork/drafts/` から `artwork/cover.jpg` にコピー
- ワイド版も確定したら `artwork/cover_wide.jpg` にコピー
- 使用したプロンプトを `artwork/prompt.txt` に保存
- **確定後、`artwork/drafts/` ディレクトリを削除してクリーンアップする**

### 6. 既存のカバーアートがある場合

既存の `artwork/cover.*` がある場合、ユーザーにバックアップが必要か確認する。必要なら `artwork/cover_backup.*` として保存してから差し替える。
