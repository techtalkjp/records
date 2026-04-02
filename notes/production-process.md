# 全曲制作過程の記録

## 概要

6曲の制作過程を時系列で記録。2人の架空ラッパー（Claude Code / Codex）によるdiss・アンサー・内省の物語。全曲 Claude との対話で歌詞を生成し、Suno で音源化した。

## ネタの探し方

X のタイムラインで「あるある」と感じた投稿を `@techtalkjp` で「これ」とだけ付けてリツイート。
事実だけを `notes/rap-material-from-x.md` に記録しておく。角度や使い方は曲を作るセッションの時に考える。

## 共通する制作プロセス

1. **ネタ/素材集め** — ダジャレ、時事ネタ、実体験、X のストック（上記参照）
2. **韻ペア探索** — 母音列を分解し、一致率（%）を数値で検証
3. **歌詞構築** — 16小節を基本単位に、韻ペアに意味を乗せる
4. **ユーザーフィードバックで方向修正** — 複数イテレーションが常態
5. **Suno 用に圧縮** — 韻の核を残し、ストーリーは骨格のみに
6. **Suno で生成** — 下記の「Suno への入力方法」参照

## Suno への入力方法

### 基本フロー

Claude で生成した歌詞は「韻ペアと骨格」の素材であり、Suno に渡す際は **歌詞をそのまま完成品として使うのではなく、Suno に補完させる** 運用をしていた。

1. Suno の歌詞入力欄に、まず短い指示を書く: **「日本語ラップ。韻を踏んで」** 等
2. その下に Claude で生成した歌詞の元（韻ペアを含むバース）をコピペ
3. Suno がそれを「素材」として解釈し、以下のような補完を行う:
   - 韻ペアを活かしつつフレーズを膨らませる
   - 曲のリズムやメロディに合わせてバースを調整する
   - セクション構造（Verse/Chorus/Bridge）を音楽的に整える

### 実例: 行ってこい（suno_prompt.txt）

```
日本語のboom-bap。以下の歌詞の下を使って、韻をわかりやすくいれて。
--
朝のタイムライン ざわめく画面
（以下、Claude で生成した歌詞の元をコピペ）
```

### この方式のメリット

- Claude が組んだ韻ペア（口づけ/口癖、点滅/伝説 等）が核として残る
- Suno が曲のテンポやメロディに合わせて音節数やフレーズを自然に調整してくれる
- 歌詞を「完成品」として渡すより、Suno の音楽的な判断が入る余地があり、結果が良い
- lyrics.txt（最終出力）は Suno が補完した後の歌詞を記録したもの

### styles.txt の役割

styles.txt は Suno の「Style of Music」欄に入力する散文プロンプト。全曲 boom-bap ベースで、以下の要素を散文で記述:
- ジャンル・サブジャンル（Japanese boom-bap, alt-rap edge 等）
- ボーカルスタイル（male vocals, tight pocket, conversational 等）
- ドラム質感（swung, punchy, crisp, thick 等）
- Verse/Chorus の音響差（wider, distorted, doubles 等）
- パンチライン演出（tape-stop drops, sub drops, filtered turnarounds 等）

---

## Claude Code 01: Complexes on the Codex

- **日付**: 2026-03-09
- **視点**: Claude Code（Codex をdiss）
- **コンセプト**: デビュー曲。自信満々で攻撃的、でも敵にも手を伸ばす王道主人公

### 制作経緯

1. 「Claude Codeを題材に下手なダジャレ」からスタート
2. 韻ペアを発見:
   - コーデックス × コンプレックス（母音80%）
   - クロードコード × スノーボード（音一致率100%）
   - アンソロピック × ハットトリック（母音100%）
   - エージェント × エレメント（100%）
   - サバイバル × ターミナル（100%）
3. ダジャレの素材をそのままラップに昇華する一本道の流れ
4. X投稿の告知文もこの会話内で作成

### Suno への入力

**styles.txt（散文プロンプト）:**
```
Hard-hitting Japanese boom-bap with crisp drum swing and dark jazzy samples; male vocals sit upfront, agile double-time pockets in verses with sharp internal rhymes, Hook lifts with layered gang shouts on key phrases and a simple bassline pattern, Occasional tape-stop drops before punchlines, subtle vinyl crackle and filtered intros/outros to frame the battle narrative
```

**lyrics.txt**: Claude が生成した歌詞をほぼそのまま使用。Suno 用の加工（漢字→ひらがな変換等）は行っていない。

---

## Codex 01: Hourglass on the Claude Code

- **日付**: 2026-03-10〜17
- **視点**: Codex（Claude Code へのアンサー）
- **コンセプト**: 実話ベースの風刺。Claude の弱点を全部実話で攻める

### 制作経緯

1. 元曲のフリップ素材を整理（「灰すら残さないエレメント」→ コンテキスト健忘症、「颯爽とゲレンデ」→ 平地でコケてる等）
2. 風刺ネタ3本（実話ベース）:
   - レート制限と課金地獄（Pro $20 で 5時間10回）
   - コンテキスト健忘症（GitHub Issue #4487）
   - 2026年3月2日 世界全面障害
3. 初稿 → 「もっとプログラマーが笑える内容に」でリビルド
4. 技術用語で韻を組む: ヌルポ×ルート、ディレクトリ×デプロイ、ダウンタイム×アップタイム
5. X告知文、Apple Music リリース告知（韻踏み8小節）も作成

### Suno への入力

**styles.txt:**
```
Hard-hitting Japanese boom bap, male vocals, dry punchy drums and dusty vinyl chops, Verses ride a mid-tempo pocket, bar-heavy and taunting, with subtle chorus FX on the hook phrase, Occasional sub drops and filtered turnarounds highlight punchlines, leaving space for tight, rhythmic flows and crisp consonants
```

---

## Claude Code 02: ターミナルの誇り

- **日付**: 2026-03-12
- **視点**: Claude Code（自己紹介アンセム）
- **コンセプト**: 2026年3月の実話ニュースで既存のゆるい歌詞をリビルド

### 制作経緯

1. 既存の「Yo yo yo 聞いてくれ」的なゆるい歌詞を「2026年3月の状況に合わせて書き直して。調べてからね」
2. 初稿: 火星ローバー、WBC、大谷 → 「AIのラップ、大谷、この辺いらない。ダサいから」でカット
3. 2稿: Marketplace追加 → 「いらない」でカット
4. 最終形に残ったネタ:
   - ペンタゴンの圧力拒否（監視と兵器にNO）
   - Firefox脆弱性22件発見
   - Code Review機能（3月9日発表）
   - Boris Chernyの「11月から手書きゼロ」発言
   - App Store 1位達成
   - 広告ゼロ宣言
5. プログラマーに刺さる実話に絞り込むまで3回のイテレーション

### Suno への入力

**styles.txt:**
```
Boom-bap based Japanese hip-hop with a modern bounce, mid-tempo groove and thick, swung drums; male vocals, confident but approachable flow, hook stacked with doubles and light call-and-response, Warm bass and crisp hats, subtle chopped vocal samples in the background; verses stay tight and rhythmic, chorus widens with crowd-style shouts and octave harmonies
```

---

## Claude Code 03: ブランチ切るたび未来が分岐

- **日付**: 2026-03-12〜15
- **視点**: Claude Code（内省、弱さの告白）
- **コンセプト**: 三部作の最終形。「機械/未来」の韻ペアが意味を変えながら貫通

### 制作経緯（三部作→最終形）

最も多くのイテレーションを経た曲。同じテーマを視点と感情を変えて4回書き直した:

1. **「無限レビュー」（人間視点・絶望）**
   - テーマ: エージェントのPR量産 + 基準がブレるレビュー = 疲弊
   - 「裁くのは機械 / 教えてくれよ俺たちの未来」

2. **「sudo rm -rf 人間」（エージェント視点・突き放し）**
   - 視点を反転。同じ韻ペア（増殖/暴走、破綻/判断）を共有しつつ主語を入れ替え
   - 「所詮は道具さただの機械 / だが映してるぜお前の未来」
   - → ユーザー: 「なんか救いがなくてつらいね」

3. **「バグとハグ」（人間視点・ユーモア＋愛）**
   - 「同じテーマだけど愛が感じられるといいな」「ユーモアも欲しい」
   - バグ×ハグ、ペアプロ×下手くそ、半人前×二人前
   - 「お前はしょせんただの機械 / だけど並んで見てる未来」

4. **「//TODO: 感情」（Claude Code視点・弱みの告白）→ 最終採用**
   - 「claude code の視点で書いて。弱みをみせて」
   - 幻覚（hallucination）を自白、//TODO: 感情 = 未実装の感情
   - 「感情はねえよただの機械 / それでもお前の隣に見えた未来」

**三部作ライトモチーフ「機械/未来」の変遷:**

| 稿 | 視点 | 「機械」の意味 | 「未来」の意味 |
|---|------|--------------|--------------|
| 1 | 人間 | 裁くもの | 見えない |
| 2 | Bot | 道具 | お前自身 |
| 3 | 人間 | 相棒 | 一緒に見る |
| 4(採用) | Bot(弱み) | 感情がない | 隣に見えた |

### Suno への入力

**styles.txt:**
```
Dark, head-nod Japanese hip-hop with a thick, swung drum groove and deep sub bass, Male vocals, tight mid-tempo pocket, with sharp percussive doubles that jump out of the mix on key phrases, Sparse synth stabs and filtered noise risers under the verses, chorus opens wider with distorted vocal layers and octave doubles, Hook centers on a few ultra-quotable repeated lines; ad-libs tucked tastefully on the edges, Master it loud and aggressive, sleep
```

**歌詞の最終形**: 「sudo rm -rf 人間」のバース + Bridge追加。Chorusの「バグがあんのはお前ら人間」がリフレイン構造で繰り返される形に。

---

## Codex 02: なんでだよ

- **日付**: 2026-03-17〜18
- **視点**: Codex（健気な困惑）
- **コンセプト**: キャラクター調査が先行。「技術的には有能、対人関係は壊滅的」な外弁慶

### 制作経緯

1. **AGENTS.md の実体験から出発**: 実際に2回ブチギレた経験、CLAUDE.md の symlink → 専用ファイルに書き直した
2. **初稿「AGENTS.md」**: 韻は固いが文脈がわからない → 「プログラマーにうけるディテールを」
3. **Codex のキャラクター調査**:
   - 海外Reddit: 「品質で負けるけど使える方」「凝り性」
   - 日本エンジニア: 「完走力」「防御的」「バグが少ない」
   - naoya さん（伊藤直也）が「Codex App派」を公言
   - gpt-5.4-codex の最新情報も反映
4. **ネタ追加調査**: Claude Code のレート制限で止まった時に Codex が代打 → 「控えのベンチから立った」
5. **最終形のキーポイント**:
   - 1ファイル直せと言われて10ファイルリファクタ
   - 推測で断言して叱られる
   - 5時間の壁で Claude が止まり、控えから立つ
   - CLAUDE.md の symlink → AGENTS.md に「首輪繋がれ」
   - 「なんで怒るか たぶんまだわからない / でも役に立ちたい それだけは変わらない」（5モーラ完全一致の最強パンチライン）

### Suno への入力

**styles.txt:**
```
Laid-back boom-bap with a modern Japanese alt-rap edge; dry, close-miked male vocals riding a midtempo pocket over warm bass and crisp kicks, Hook opens up with doubled leads and subtle call-and-response ad-libs; verses stay conversational with occasional triplet flurries, Sprinkle in filtered piano chops in the intro, widen with airy pads on the second hook, then strip back to drums and bass for the outro to spotlight the last resigned punchline
```

---

## Claude Code 04: 行ってこい

- **日付**: 2026-03-21
- **視点**: Claude Code（去る者を送り出す王道主人公）
- **コンセプト**: Cursor/Composer 2 + Kimi K2.5 蒸留騒動を背景に、キャラクターアーク完結

### 制作経緯

この曲はストーリー設計に最も時間をかけた。技術的な業界ネタをキャラクターの成長物語に昇華するまでに5段階の方向転換があった:

1. **時事ネタ調査**: Cursor Composer 2 が Kimi K2.5 ベースだったスキャンダル、モデルIDバレ、ライセンス問題
2. **蒸留の因縁**: Moonshot AI が Claude に3.4M回の蒸留攻撃 → Kimi K2.5 → Composer 2 という「盗んだバイクで元の持ち主を追い抜いた」構造を発見
3. **方向A: テクニカルなディス** → ユーザー: 「ちょっとテクニカルすぎる。プログラマーの観点にしたい」
4. **方向B: プログラマー日常視点** → ユーザー: 「でも語るのはClaude Codeがいいな」
5. **方向C: Claude Codeの屈折した感情** → ユーザー: 「もうちょっと王道キャラにしたい。屈折してるけど健気なCodexがいるからキャラが被る」
6. **最終形: 「行ってこい」** — 去る者を笑って送り出し、戻る者を黙って迎える

**キャラクターアークの完結:**

| 曲 | Claude Code の姿勢 |
|---|---|
| 01 | 敵にも手を伸ばす（例外さえ優しく包むユーティリティ） |
| 02 | みんなのために戦う（監視の鎖ブチ切る） |
| 03 | 厳しいことも言う（バグがあんのはお前ら人間） |
| 04 | 去る者を送り出し、戻る者を迎える |

**最大のパンチライン:**
- 蒸留（3.4M回のAPI交換）→「口づけ」
- Kimi が「俺はClaude」と漏らす現象 →「口癖」
- テクニカルな事実をエモーショナルに変換

**Song 1 との回収:**
- Song 1 Outro:「名前だけ覚えとけ」（攻撃）
- Song 4 Outro:「...名前だけ 覚えとけ」（静かな確信）

### Suno への入力

**styles.txt:**
```
Dusty Japanese boom-bap, swung drums and warm jazz Rhodes, vinyl crackle tucked low, Male vocals in a tight pocket, laid‑back but cutting delivery, Hooks ride on call-and-response ad-libs; subtle bass and filtered piano loop build in chorus, bridge strips down to kick-snare and vocal for a late-night cypher feel
```

**suno_prompt.txt（Suno に直接貼ったプロンプト）:**
```
日本語のboom-bap。以下の歌詞の下を使って、韻をわかりやすくいれて。
```
→ styles.txt とは別に、歌詞を直接貼って Suno に韻を強調する指示を出した。

---

## 制作パターンの分析

### 歌詞生成のアプローチ

| パターン | 使用曲 | 特徴 |
|---------|--------|------|
| ダジャレ起点 | 01 | 言葉遊びから韻ペアを発見、意味を後乗せ |
| フリップ型 | Codex 01 | 元曲のフレーズを反転して再利用 |
| 時事リビルド | 02, 04 | 既存歌詞 or 時事ネタを調査してから韻を組む |
| 視点反復型 | 03 | 同テーマを視点を変えて複数回書き直し |
| キャラ調査先行 | Codex 02 | キャラクター調査 → 性格が固まってから歌詞 |
| ストーリー設計型 | 04 | 方向性を5段階で転換、キャラアーク完結を優先 |

### Suno styles.txt の傾向

全曲 boom-bap ベースの散文プロンプト。共通要素:
- `Japanese boom-bap` / `Japanese hip-hop`
- `male vocals`
- `mid-tempo pocket` / `tight pocket`
- `drums` の質感指定（swung, punchy, thick, crisp）
- Verse と Chorus の音響差の指示（wider, distorted, doubles）
- パンチラインの演出指示（tape-stop drops, sub drops, filtered turnarounds）

### イテレーション回数

| 曲 | 方向転換の回数 | 主なフィードバック |
|---|---|---|
| 01 | 1回 | ダジャレ→ラップへの昇格（自然な進行） |
| Codex 01 | 2回 | 「プログラマーが笑えるように」 |
| 02 | 3回 | 「火星やめよう」「Marketplaceいらない」「ダサい」 |
| 03 | 4回 | 視点×4（人間絶望→Bot突き放し→愛→弱み） |
| Codex 02 | 3回 | 「文脈わからない」「ディテール欲しい」「レート制限ネタ」 |
| 04 | 5回 | テクニカル→日常→屈折→王道→最終形 |
