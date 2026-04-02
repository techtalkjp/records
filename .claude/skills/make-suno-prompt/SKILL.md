---
name: make-suno-prompt
description: 歌詞の元から Suno V5.5 用の入力セット（lyrics.txt, styles.txt, suno_prompt.txt）を生成する。「Suno用」「プロンプト」「styles」「入力を準備」でトリガー。
argument-hint: [トラックディレクトリのパス]
---

# Suno V5.5 入力セットの生成

歌詞の元（`/make-lyrics` の出力）を Suno に渡すフォーマットに変換し、Style プロンプトと合わせて出力する。

## 設計思想

- 歌詞は「完成品」ではなく「素材」として Suno に渡す
- Suno が韻ペアを活かしつつ、曲のテンポやメロディに合わせて補完する前提
- V5.5 のベストプラクティスに従う（詳細: `notes/suno-v55-best-practices.md`）

## 参照

変換時に以下を参照する:

| ファイル | 目的 |
|---|---|
| `notes/suno-v55-best-practices.md` | V5.5 の Style 形式、アノテーションタグ、スライダー設定 |
| 既存曲の `source/styles.txt` | トーンの参考（全曲 boom-bap ベース） |
| `opensrc/repos/github.com/usedhonda/sunomanual/` | 詳細リファレンス（必要時） |

## 手順

### 1. suno_prompt.txt の生成

Suno の歌詞入力欄に貼る内容を生成する。

**構造:**
```
[指示行]
--
[歌詞の元]
```

**指示行**: 短い日本語の指示。例:
- 「日本語のboom-bap。韻をわかりやすくいれて」
- 「日本語ラップ。韻を踏んで」

**歌詞の元の変換ルール:**

1. **セクションタグにアノテーションを付与** (V5.5 新機能)
   - Before: `[Verse 1]`
   - After: `[Verse 1 - laid-back, conversational, close vocal]`
   - アノテーションは英語の短いフレーズ。歌われず、生成の方向性ガイドとして機能

2. **漢字 → ひらがな変換**
   - 全ての漢字をひらがなに変換する（Suno の音声合成はひらがなベース）
   - 数字もひらがなに（3 → さん, 100 → ひゃく）
   - カタカナはそのまま
   - 英語はそのまま
   - 技術用語（git, PR, API, exit 等）はそのまま

3. **タグ外にコマンドテキストを書かない**
   - 歌詞フィールドのタグ外テキストは全て歌われる
   - 指示や説明はアノテーションタグ内に収める

### 2. styles.txt の生成 (V5.5 タグ形式)

Suno の「Style of Music」欄に入力するプロンプト。

**V5.5 のルール:**
- **短いカンマ区切りの名詞句タグ**（散文ではない）
- **120文字以内**
- **4-7 descriptors** が最適
- **重要語を前方に配置**: ジャンル → BPM → キー → ムード → ボーカル → 楽器 → ミックス
- **アンカーリング**: 重要なスタイルワードを最初と最後に繰り返す

**このプロジェクトの基本パレット** (全曲 boom-bap ベース):
```
Japanese boom bap, [BPM] BPM, [ムード], male rap, [楽器/質感], [ミックス特性]
```

**ユーザーと対話で決める要素:**
- BPM（85-95 が boom-bap の標準帯）
- ムード（dusty, dark, laid-back, aggressive, warm 等）
- 楽器の質感（Rhodes, vinyl crackle, jazz piano, 808, crisp hats 等）
- ミックス特性（punchy mix, dry mix, wide stereo, tape saturation 等）

**変換例:**

Before (旧・散文形式):
```
Dusty Japanese boom-bap, swung drums and warm jazz Rhodes, vinyl crackle tucked low, Male vocals in a tight pocket, laid‑back but cutting delivery, Hooks ride on call-and-response ad-libs; subtle bass and filtered piano loop build in chorus, bridge strips down to kick-snare and vocal for a late-night cypher feel
```

After (V5.5 タグ形式):
```
Japanese boom bap, 90 BPM, dusty, male rap, warm Rhodes, vinyl crackle, laid-back, punchy mix
```

### 3. lyrics.txt について

**この段階では lyrics.txt は空のまま**。lyrics.txt は Suno が生成した最終歌詞を記録するファイル。Suno で生成後に手動で記録する。

### 4. 出力

トラックディレクトリに以下を書き出す:

```
<トラック>/source/suno_prompt.txt  — Suno の歌詞欄に貼る内容
<トラック>/source/styles.txt       — Suno の Style 欄に入力するタグ
```

書き出し前にユーザーに内容を確認してもらう。

### 5. Exclude フィールドの提案（任意）

必要に応じて Suno の Exclude 欄に入れる項目を提案する:
- 2-5 項目に絞る
- Style に "no X" と書くと逆効果になるため、否定は Exclude に集約
- うまくいかない時は全部空にすることも提案する

### 6. スライダー設定の提案

曲の構成に応じたスライダー設定を提案する:

| セクション | Weirdness | Style Influence |
|---|---|---|
| Chorus | 35-45% | 70-85% |
| Verse | 40-55% | 55-70% |
| Bridge | 55-70% | 45-60% |

- 安全範囲: 15-85（赤域を回避）
- Verse/Chorus で設定を変える場合は Replace Section ワークフローを提案
