# Suno V5.5 ベストプラクティス

usedhonda/sunomanual からの要点まとめ。詳細は `opensrc/repos/github.com/usedhonda/sunomanual/` を参照。

## Style フィールド（最重要の変更点）

- **短いカンマ区切りタグ**が正解。散文より安定
- **120文字以内**、**4-7 descriptors** が sweet spot
- 重要語を前方に: ジャンル → BPM → キー → ムード → ボーカル → 楽器 → ミックス
- 多すぎると "prompt fatigue"（ジェネリック化、ロボ声）
- Voices 使用時は 3-5 タグに抑える

### 現状との差異

現在の styles.txt は散文形式で100文字超。V5.5 最適化例:

**Before:**
```
Dusty Japanese boom-bap, swung drums and warm jazz Rhodes, vinyl crackle tucked low, Male vocals in a tight pocket, laid‑back but cutting delivery, Hooks ride on call-and-response ad-libs; subtle bass and filtered piano loop build in chorus, bridge strips down to kick-snare and vocal for a late-night cypher feel
```

**After (V5.5 タグ形式):**
```
Japanese boom bap, 90 BPM, dusty, male rap, warm Rhodes, vinyl crackle, laid-back delivery, punchy mix
```

## 歌詞のアノテーションタグ（V5.5 新機能）

セクションタグ内に制作ヒントを追記できる。歌われず、生成の方向性ガイドとして機能:

```
[Verse 1 - intimate, close vocal, conversational]
[Chorus - explosive, full band, powerful, gang shouts]
[Bridge - stripped, kick-snare only, late-night cypher]
```

## スライダー設定の目安

| セクション | Weirdness | Style Influence | 目的 |
|---|---|---|---|
| Chorus | 35-45% | 70-85% | フック安定 |
| Verse | 40-55% | 55-70% | 変化と安定のバランス |
| Bridge | 55-70% | 45-60% | 実験的テクスチャ |

- 両方高くすると歌詞タグへの追従性が上がる
- **赤域（0-14, 86-100）は回避**。安全範囲: 15-85

## 制作ワークフロー（V5.5 推奨）

1. **短く生成**（2分程度）— コアセクション（Chorus/Hook）に集中
2. **Extend** で前後にセクション追加してフル尺に
3. **Replace Section** で特定パートのみ差し替え・修正

一発で長尺を狙うよりこのサイクルが安定。

## アンカーリング戦略

重要なスタイルワードを Style の**最初と最後に繰り返す**とドリフト防止。

## Exclude のベストプラクティス

- 2-5 項目に絞る
- "no X" を Style に書くと逆にXが強調される → Exclude フィールドに集約
- うまくいかない時は Exclude を**全部空にする**と改善するケースもある

## 日本語歌詞の必須ルール

- **漢字 → ひらがな変換**: Suno の音声合成はひらがなベース
- **数字 → ひらがな**: 3 → さん, 100 → ひゃく
- **カタカナ**: そのまま
- **英語**: そのまま
- 6-12 音節/行 が歌唱安定性のスイートスポット

## コマンドテキスト注意

歌詞フィールドのタグ外テキストは**全て歌われる**。指示文は必ずアノテーションタグ内に:
- BAD: `ここでテンポを上げる`（歌われてしまう）
- GOOD: `[Bridge - tempo increase, building energy]`

## 著作権安全

- Style にアーティスト名・曲名・アルバム名を入れない
- 音の特徴を言語化して記述する
