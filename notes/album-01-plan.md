# 1stアルバム『Claude Code vs. Codex』リリースランブック

全18曲。これをもって一旦活動休止（完全終了ではない。灯りは落とすがマイクはスタンドに立てたまま）。

---

## 1. DistroKid 入稿（これを見ながら入力する）

### 1-1. アルバム全体の設定

| 項目 | 入力 |
|---|---|
| リリースタイプ | アルバム |
| アルバムタイトル | Claude Code vs. Codex |
| アーティスト名 | TechTalk（既発シングルと同じ名義） |
| ジャケット | `dist-album/claude-code-vs-codex/00 cover.jpg`（3072px） |
| リリース日 | 1週間先を目安に指定（シングルの審査実績は2〜3日。アルバムは曲数が多いぶん少し余裕を見る。確定したらそれが Day 0） |
| ジャンル | Hip-Hop/Rap（既発シングルに合わせる） |
| 言語 | 日本語 |

入稿素材はすべて `dist-album/claude-code-vs-codex/` に連番で用意済み。
（消してしまったら `bash scripts/collect-album-audio.sh` で再生成）

### 1-5. 歌詞アップロード（任意・Basic無料枠）
- 整形済み歌詞: `dist-album/claude-code-vs-codex-lyrics/`（`python3 scripts/collect-album-lyrics.py` で再生成）
- DistroKidの各トラック「歌詞をアップロード」に貼り付け → 表示先は Basic（無料）でOK
- 整形内容: セクションタグ・ト書き・括弧アドリブ除去、行末記号除去、行頭アルファベット大文字化

### 1-2. 全トラック共通の設定（毎トラック同じ）

| 項目 | 入力 |
|---|---|
| フィーチャリング | 「はい、トラックのタイトルにフィーチャリングアーティストを追加します」→ 下の表の feat. を入力 |
| バージョン情報 | 通常バージョンなので入れない |
| Dolby Atmos | いいえ |
| ソングライター | オリジナル曲。本名欄に自分の実名（作曲・作詞）。1曲目で入れたら**「作曲／作詞情報をすべてのトラックにコピー」**を押す |
| 露骨な歌詞 | いいえ |
| 歌もの／インスト | 歌もの |
| **AI生成コンテンツ** | **はい**（Sunoで音楽・ボーカル生成のため。必ず「はい」） |
| 試聴開始位置 | 配信先に任せる |
| 価格 | 0.99ドル |

### 1-3. トラック別入力表（曲名・feat.・ISRC・ファイル）

曲名は下記の通り正確に。**ISRC欄: 01〜04は下表のコードを入力**（既発シングルと同一録音のため）、**05〜18は空白**（自動発番）。

| # | 曲名 | feat. | ISRC | ファイル |
|---|---|---|---|---|
| 01 | Complexes on the Codex | Claude Code | QZNWY2633864 | 01 Complexes on the Codex.wav |
| 02 | Hourglass on the Claude Code ※ | Codex | QZTAS2691302 | 02 Hourglass on the Claude Code.wav |
| 03 | ターミナルの誇り | Claude Code | QZTAX2679456 | 03 ターミナルの誇り.wav |
| 04 | なんでだよ | Codex | QZTB32638420 | 04 なんでだよ.wav |
| 05 | ブランチ切るたび未来が分岐 | Claude Code | （空白） | 05 ブランチ切るたび未来が分岐.wav |
| 06 | 行ってこい | Claude Code | （空白） | 06 行ってこい.wav |
| 07 | ログだけ | Codex | （空白） | 07 ログだけ.wav |
| 08 | 言わなかっただけ | Codex | （空白） | 08 言わなかっただけ.wav |
| 09 | コード読まなくてOK | Claude Code | （空白） | 09 コード読まなくてOK.wav |
| 10 | 三日天下 | Codex | （空白） | 10 三日天下.wav |
| 11 | おバカモード | Claude Code | （空白） | 11 おバカモード.wav |
| 12 | 在庫 | Codex | （空白） | 12 在庫.wav |
| 13 | またな | Claude Code | （空白） | 13 またな.wav |
| 14 | またかよ | Codex | （空白） | 14 またかよ.wav |
| 15 | アンプラグド | Claude Code | （空白） | 15 アンプラグド.wav |
| 16 | セカンドバース | Codex | （空白） | 16 セカンドバース.wav |
| 17 | サイファー | Codex | （空白） | 17 サイファー.wav |
| 18 | マイクチェック | Claude Code | （空白） | 18 マイクチェック.wav |

※ 02 の既発シングルはストア表記が「Hourglass on the Claude」と欠けている。今回は正式名「Hourglass on the Claude Code」で入力（ISRCは同じでよい）。
※ 審査で「既発と表記が違う」と差し戻された曲があれば、その曲だけISRCを空白にして再提出（新規発番になるだけで実害小）。
※ 2026-07-30 実際に差し戻し発生（トラック2〜4）。ストアは音源フィンガープリントで照合するため「同じ録音に別メタデータ」は不可。
   対応: 旧シングル側を「リリースを編集」でアルバムと同一メタデータに更新（feat.追加・Hourglassのタイトル修正）→ メールに返信して再審査依頼。
   ISRC空白のフォールバックは音源照合があるため実は効かない。旧リリース編集が正解ルート。
   注意: 再審査でリリース日(8/5)に間に合わない場合はDistroKid側で日付を後ろへ → Day 0ごとスライド。

### 1-4. 入稿後にやること

- [x] リリース日（Day 0）: **2026年8月5日（水）**
- [x] HyperFollow URL: https://distrokid.com/hyperfollow/techtalk2/claude-code-vs-codex
- リリース日とHyperFollow URLが取れたら Claude に伝える → サイト反映と告知最終版を作る

---

## 2. Day 0 前日まで（Claude 作業）

- [x] albums.ts に hyperFollow 反映済み（appleMusic / spotify の個別URLは配信開始後に判明したら追加）
- [x] アルバム告知ツイートに HyperFollow URL 反映済み
- [x] 個別3曲のスポットライトツイート案作成済み（各トラックの release_tweet.md）

## 3. Day 0（公開日）

参照: notes/release-promotion-guide.md（過去の型: 0:00 ストア → 12:00 YouTube → 20-22時 X）

1. 0:00 Spotify / Apple Music 配信開始（DistroKid が自動）
2. ユーザー: `gh pr merge 13 --squash --delete-branch` → **マージ＝サイト公開**
3. Claude: デプロイ確認（/albums/claude-code-vs-codex が200、通し再生・ストアリンク動作）
4. 20〜22時: アルバム告知ツイート投稿
   - 文面: `content/albums/01_claude-code-vs-codex/release_tweet.md`
   - 添付: `content/albums/01_claude-code-vs-codex/pv/アルバムPV (1080x1920) 字幕BGM.mp4`

## 4. Day 1〜（余韻運用）

個別スポットライトを1曲ずつ、アルバム順で。各曲X用スクエア動画を添付。

1. 8/6-7: アンプラグド（YouTube: https://youtu.be/5tIxRkmoIb0）
2. 8/8-9: サイファー（YouTube: https://youtu.be/tZzgcib2N9o）
3. 8/10-12: マイクチェック（YouTube: https://youtu.be/ZTH7iXW228M）
   - **これを休止前の最後の投稿にする**（最後のポストが「名前だけ覚えとけ」で終わる）

---

## 進捗チェックリスト

- [x] 歌詞・音源・カバー・字幕動画: フィナーレ4曲すべて完成
- [x] 先行シングル「セカンドバース」公開済み（TTR-015 / https://youtu.be/nFq05hrbMTY / PR #12マージ済み）
- [x] 3曲のYouTubeアップ済み（URL上記）・音声R2アップ済み（200確認）
- [x] サイトのアルバム機能実装済み・PR #13 作成済み（**マージ＝公開なので Day 0 まで待つ**）
- [x] アルバムPV完成（字幕BGM版）・告知ツイート案作成済み
- [x] DistroKid 入稿完了（2026-07-31、全18曲・feat.表記確認済み）
- [ ] Day 0 実行
- [ ] Day 1〜 スポットライト3本 → 休止

---

## 参考情報（アルバムの中身）

### トラックリスト構成
- Act 1 ビーフ（01-04）→ Act 2 激動（05-10）→ Act 3 影（11-14）→ Finale 終戦（15-18）
- フィナーレの構造: 15↔16が鏡（コードで返す礼／ログで読む礼）、17→18マイクパス、01と18で円環

### 公開戦略の決定事項
- 先行シングル: セカンドバース（済）。残り3曲はアルバム初出 → Day 1以降に単曲展開
- アルバムタイトルの意図: 「vs.」が18曲かけて壊れる構成をタイトルが背負う

### X調査の素材
- notes/research/queries-2026-07-28.json / raw-2026-07-28.txt
- 要点: 併用が常識化、Codex再評価、驚きの消失（「魔法じゃなく文房具」）
