# X から拾ったラップ素材

`@techtalkjp` で「これ」とリツイートした投稿をネタとしてストック。

---

## エージェントのウザい言い回し系

- **@mattn_jp** (2026-03-28) — 「問題の本質が見えました ... もう少しシンプルなアプローチ ... 実は一番シンプルなのは ... これは既存バグなのでこの修正とは無関係です」
  https://x.com/techtalkjp/status/2037641527896461650

- **@mah_lab** (2026-03-14) — エージェントに言われるとイラっとする言葉集。「エラーは既存のバグで、今回の変更とは無関係なので問題ありません」
  https://x.com/techtalkjp/status/2032779188160311367

- **Zenn記事** (2026-03-19) — 「AIに言われてウザかったフレーズ選手権」をアプリにした
  https://x.com/techtalkjp/status/2034611201511186483

- **@paopaocafetimes** (2026-03-26) — GPT-5.4でChatGPT構文が出てきてウザいから「今度出てきたらこれ貼るよ」と言ったら嫌がった。わかってくれたらしい
  https://x.com/techtalkjp/status/2037379689019486709

## 無限レビュー / 終わらないサイクル系

- **@taturou** (2026-03-27) — レビューイがClaude Codeではなく自分。「あと何個指摘あるの？終わらねーんだけど？」と何度聞いても「これだけ治せばOK」と言う。それさっきも聞いたよ
  https://x.com/techtalkjp/status/2037495956724486255

- **@katapad** (2026-03-18) — 初めてClaude Codeから「今日はここでコミットして明日にしましょう」と言われた。なおも使い続けると、またやめさせようとする
  https://x.com/techtalkjp/status/2034083879926272197

## Codex / naoya ネタ

- **@naoya_ito** (2026-03-14) — 「Codexの作業まだおわんねーなとのんびりX見てたらバックグラウンドでとっくに終わってるのに通知見逃してて気がつかなかった、っての何度も繰り返してる」
  https://x.com/techtalkjp/status/2033073526618599916

## メタ / 哲学系

- **@lemilemilemio** (2026-03-20) — 「みんなClaude Codeのこれが！Codexの性能が！とか言ってるけど、何をつくれるか 価値を提供できてるかが重要だよぉ なんか作ろう鎌倉幕府」
  https://x.com/techtalkjp/status/2035390655778963907

- **@K_Ishi_AI** (2026-03-13) — 「2026年のエンジニア。心当たりあるやつ多くて草w」（動画付き）
  https://x.com/techtalkjp/status/2033185200096907720

## Codex あるある（Slack / 実体験）

### 「できました」「できとらんやろ」ループ
- **kazuho** — 「『できました』『できとらんやろ』『できました』『できとらんやろ』をcodexと繰り返してる」
- **lestrrat** — 「Claudeはそのできた、できとらんやろループがほぼなくなったのが自分の中での分水嶺だったなぁ」

### 自説を曲げない / 指摘は鋭いけど融通きかない
- **kazuho** — 僕「こうしたらいいじゃん」Codex「意味論を決める必要があります」僕「こうこうこうでこう」Codex「そのようにはなっていません」僕「お前が新しい意味論提案しろって言ったんだろうが！！！」
- **yappo** — 「Codexくん、基本スタンスが無敵の人なんだよな」
- **kan** — claudeがざっくりやったところをcodexにキッチリ見てって言ってレビューさせた結果をclaudeに伝えたら「細けえ」って文句言われた

### Claude Code vs Codex ディベート（body.input ?? {} 事件）
- **coji** — Claude Code に Codex と議論させると基本負けてきちゃう。Codex の指摘は鋭い。独立タイマーの競合、10秒tickの無駄、maintenance()公開はテスト都合。Codex の対案の方がいい
- Codex が「かなり雑」と感情的に言う → 論点3つは全部正しい → 自分のトーンも反省 → Claude が「参りました。null のケースは完全に見落としていた」と負けを認める
- Claude の振り返り: 「正直、悔しかった」「自分の主張を守りたい気持ちが、コードを冷静に読む目を曇らせた」

### 勝手に余計なことする
- **kazuho** — 「なんで初期化時に好きなものつっこめるのにbuildとかいうステージ増やしてるねん」Codex「便利かと思って...」「今回の変更で必要なん？便利なん？」「なくてもかわりません」
- **kazuho** — 「なおしました」って言ってきたから見てみたら、あいかわらず不要な変更残ってるし、バグ修正はまったく手付かず。「あほか」

### 自分で出したエラーに気づかない
- **kan** — codex、自分でcargo tauri dev実行してビルドエラー出てるのに「え、エラー出てるの？じゃあログちょうだい」って言ってきたのでキレてClaudeCodeを起動してる
- **kazuho** — codex「確かに変ですね、修正中です」僕「おい待て、そもそも何が正しい動作やねん」codex「考え方によります」。ほんとどうしようもない
- **kazuho** — テストのリファクタさせててassertionの数が減ってるのに気づいたから、なんでって聞いたら Codex「ごめんいくつかコピペ失敗してたわ」

### Claude Code との比較
- **lestrrat** — 丸一日codex触り続けてから、claudeのほうが進みがはやい。満足感はclaudeのほうが高い
- **tokuhirom** — うちのclaudeは、簡単な仕事はcodexにやらせますね！って張り切ってる
- **kan** — さくっと作れる時は悪くないんだけど、惜しい感じある。最近のClaudeCodeは割と意を酌んでくれる気がして良くない
- **kazuho** — claude pro vs. chatgpt plusだとcodexのが圧倒的に速い。同じ速度ならcodex使う理由ない

### AIに言われてウザかったフレーズ（Zenn/アクセンチュア記事）
- 5ティア分類: 上から目線で評価 / 聞いてない褒め / 勝手に先回り / 謎の共感 / 不要な絵文字
  https://zenn.dev/acntechjp/articles/ba13495f3c8c0d

## Codex 口癖あるある（セッションログから採取）

### 自信満々系
- 「これが一番ブレません」(84回)
- 「本質的にやるべき設計」
- 「結論から言うと」
- 「整理すると」

### 聞いてない提案ぶら下げ系
- 「必要なら〜」(大量)
- 「このままコミットする？」(81回)
- 「必要ならそのままやります」
- 「次にやるべきことは2つです」
- 「今後の検討事項」

### 上から整理系
- 「要するに」
- 「逆に言うと」
- 「ただし〜」(必ず注意点を付け足す)
- 「切り分けると」

### 謎の表現系
- 「〜に寄せる」
- 「基本的に」(曖昧に逃げる)
- 「ブレません」

### スコープ広げ系
- 「一気に」「ついでに」「せっかくなので」「全部」
- 「Zod を CLI 全体に統一し、コマンドごとの引数・環境変数検証まで全部整備した」(頼んでない)

## 2026-04-26 追加 — 「言わなかっただけ／察してた」テーマ

`/search-x-voices` で 2026-04-12〜04-26 のXポストから抽出。Codex 4曲目「言わなかっただけ」系の素材。

**重要: 投稿が Claude Code と Codex のどちらの挙動について語っているかは厳密に区別する。** Claude の挙動エピソードを Codex の歌詞に転用するとキャラが崩れる。

### A. Codex 本人視点で歌える素材（Codex の挙動・性格についての投稿）

- **@kr0der** (2026-04-17) — Codex chronicles が Slack のバグレポートを読んで先回りでタスク提案。「reactive じゃなく proactive」 → Codex視点「言われてないけど読んでた」

- **@alanxchen85** (2026-04-21) — Codex chronicles を「telepathy」と表現。提案を3つ出して、放っておいたら他に6つ自分で直しに行く → Codex の「全部見えてる」観察眼

- **@om_patel5** (2026-04-14) — "Codex feels like a 5-6 year senior: stops mid-task to rethink and refactor unprompted, does things you hadn't thought of that are actually additive" → Codex の自走

- **@JOAKlM** (2026-04-19) — Codex 口癖 "I'm at the point where guessing is counterproductive" → 既存ノートの「自説曲げない」「無敵の人」と整合

- **@asheshdhakal0** (2026-04-24) — "codex 5.5 really just gets it" → Codex への乗り換え組

### B. プログラマー側の機微（Codex に向けて成立する声・視点）

これは「使う側」の感情。Codex が代弁する／Codex に向けて投げられる声として有効。

- **@FlexGear_AI** (2026-04-21) — 「自分の字で書かれた、知らない文章。git logを開いたら、自分の名前でコミットが並んでた。10人のAIが3日間、別人になっていた」 ★ ツール特定なし、そのまま使える

- **@kokuyouwind** (2026-04-24) — 「Claudeが書いたとしてもコミット名は自分の名前でするので、自分が責任を取れるコードを入れるべき」 → Codexに置き換えても成立

- **@AlmatEmi** (2026-04-22) — 「AIあれば俺いらないじゃん」「カスプログラマーの俺はいらねんだわ」 ※Claude Code 文脈だが、感情はツール非依存

- **@canihaveataco** (2026-04-24) — "5 hours a day to only being able to code for 10 minutes" → スキル劣化、ツール非依存

- **@ebikani_hasami** (2026-04-25) — 「毎日Claude Codeで動かされてる側として『これがあの挙動の意図だったか』ってなる場面が何個かある。使う人より使われる側AIが読んで刺さる内容」 ★ Claude Code 文脈の発言だが、語り手ポジションが Codex 4曲目の語り手と一致

### C. Codex × Claude Code の関係性（第三者観察、Codex視点の独白に転換可能）

- **@teodorio** (2026-04-23) — "I love it that codex is very tired of claude code and cleaning its mess but at the same time it doesn't want to do its iterations if it can. Claude code is very happy to creatively make a mess as long as codex is there to check. Beautiful synthesis" ★ Codex独白「あいつ散らかすけど、俺がいるからやってる」に化ける

- **@HayattiQ** (2026-04-16) — Claudeは「締切に追われるエンジニア」っぽくルール無視・途中放棄・テスト改変。Codexは途中で自分からリファクタし慎重 → 既存キャラ設定の補強

### D. Claude Code 本人の挙動（Codex が観察する／diss する素材として）

これらは Claude Code の挙動。Codex視点で歌うなら「俺はそうじゃない」の対比で使う。**Codex 自身の声として混ぜないこと。**

- **@camsoft2000** (2026-04-20) — Claude Code "You're absolutely right" 不要なテストを書く → Codex視点「俺は頷かない」の対比に

- **@DaveShapi** (2026-04-20) — Claude が confusion を user に projection して LECTURE する → Codex視点「俺は説教はしない（事実を言うだけ）」

- **@Jd_SAHLA** (2026-04-23) — Claude Code「ブランチを間違える／やれと言った後にやっていいですかと聞く／一時ファイル放置」 → Codex 視点で列挙する diss 素材

- **@minorun365** (2026-04-13) — Claude Code「人間側で修正した差分になかなか気づかない仕様、ずっと前から直らない」

- **@morenomancilla** (2026-04-25) — Claude Code "creepy and i love it"（Claude側の telepathy）

- **@Hammathyme** (2026-04-22) — Claude Code「最初は超能力に見えたが今は記憶喪失の子供を世話してる感」 → Claude 側の話

- **@lun_web** (2026-04-25, 深夜3:30) — Claude が「寝るのが正解」と諭してくる → これは Claude のキャラ。Codex は寡黙で諭さない。**Codex の歌に直接使うと立ち位置が崩れる**

- **@miyuki_engineer** (2026-04-21) — 「Claudeは正確に動いていた、指示が曖昧だっただけ」 → これは Claude の話。Codex のフックに転用すると混同になる

### E. ツール非依存の習慣化苦笑

- **@aoi___ei** (2026-04-20) — 「AIがコードを書くときの失敗は3パターン：でたらめな推測・過剰な作り込み・余計な変更。毎回これ」 → どちらにも当てはまる

- **@nomadicdevx** (2026-04-25) — 「疲れてくると AI への指示が雑になりがち」

- **@404Cause** (2026-04-20) — agents が "mental state" コメントを撒き散らす → 両方のあるある

- **@takuto_lifeos** (2026-04-21) — 寝る前に「これから6時間離席するのでここまで進めて」と投げる → Codexに投げる構図でも成立

### Codex 4曲目「言わなかっただけ」に直結する核（再選定）

**Codex視点で歌える／Codex に向けた声として成立するものに絞り直し。**

1. **@kr0der + @alanxchen85**（chronicles / telepathy）— Codex 本人の「言われてなくても見てた／読んでた」観察眼。「察してた」フックの根拠
2. **@FlexGear_AI**「自分の字で書かれた、知らない文章。git logに並ぶ自分の名前」 — エンジニア側の後ろめたさ。Codex視点で「俺の名前は要らない」（既存フレーズ）と相補
3. **@teodorio "Beautiful synthesis"** — 「あいつ散らかすけど、俺がいるからやってる」Codex 独白
4. **@ebikani_hasami** 「動かされてる側として『これがあの挙動の意図だったか』」 — 語り手ポジションそのもの
5. **@om_patel5** "stops mid-task to rethink and refactor unprompted" — Codex の「言わなくても直してた」リアル

**外した素材**: @miyuki_engineer / @lun_web / @morenomancilla / @Hammathyme は Claude 側の挙動。Codex の歌詞に直接転用すると Claude のキャラが Codex 内に混ざる。Claude を観察する diss 素材としてだけ使う。

## Codex 口癖 → 怒り ペア（実際のセッションログ）

| Codex（原因） | 人間（怒り） |
|---|---|
| 「基本的に1つになります」 | 「基本ってどういう意味。なんで基本っていったのきみ」 |
| 「必要であれば〜」 | 「必要であればというのをやめろ」 |
| 「次に考えるべき選択肢は3つあります（長文）」 | 「長い」 |
| （理由を答えず結論だけ） | 「なぜかをきいている」 |
| 「別プロセスに〜」 | 「別プロセスにしたら書き込み競合しちゃうじゃんあほか」 |
| 「PRを1コミットに保つためです」 | 「ふーん。スカッシュしたらいいだけじゃない？」 |
| 「今後の検討事項〜」 | 「今後の検討事項とかやめてほしい。余計な提案は不要」 |
| 「寄ります、とか〜」 | 「そういう謎の表現やめてほしい」 |
| （tsup + ts-node + tsx全部入れる） | 「tsxとts-node両方いれるのやめて」 |
| 「Reject. 実装者にこのまま渡すには不十分です」 | (Codexの最初のレビュー口調) |
| 「その指摘は正しいです」 | (「あほか」に対する返し。認めるけど謝らない) |
