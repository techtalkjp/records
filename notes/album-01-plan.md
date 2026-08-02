# 1stアルバム『Claude Code vs. Codex』リリースランブック（RouteNote版）

全18曲。これをもって一旦活動休止（完全終了ではない。灯りは落とすがマイクはスタンドに立てたまま）。

配信は **RouteNote 無料プラン** に移行（2026-07-31決定）。
理由: 休止中に課金したくない（DistroKidは年額サブスクで、支払い停止＝カタログ消滅）。
CD Baby等の買い切り型は **AI生成楽曲を全面禁止**のため不可。AI楽曲OK＋無課金で置きっぱなしにできるのはRouteNote無料プランのみ（収益の15%コミッション、現状の再生数では実質ゼロコスト）。

---

## 0. DistroKidからの撤退（ユーザー作業）

- [ ] 審査中のアルバム『Claude Code vs. Codex』の入稿を取り下げ（アルバムページから削除）
- [ ] 既存シングルを全て削除（各リリースの編集ページ最下部「この楽曲をすべての配信先から削除する」）
  - 対象: Complexes on the Codex / Hourglass on the Claude / ターミナルの誇り / なんでだよ（＋他にあれば全部）
  - 累計29再生なので失うものはなし
- [ ] DistroKidの**次回更新日を確認**し、更新前に解約（カレンダーに入れておく）

## 1. RouteNote 入稿

### 分担
- ユーザー: アカウント作成・ログイン・最終送信ボタン
- Claude: ログイン済みのChromeを借りてフォーム入力を代行（Claude in Chrome）

### 入稿素材（準備済み）
| 素材 | 場所 |
|---|---|
| 音源FLAC（18曲・連番） | `dist-album/claude-code-vs-codex-flac/`（`bash scripts/collect-album-flac.sh` で再生成） |
| ジャケット 3000×3000 | 同フォルダの `00 cover 3000.jpg` |
| 歌詞（整形済み） | `dist-album/claude-code-vs-codex-lyrics/`（RouteNoteに歌詞欄があれば使用） |

### 画面構成（4セクション、順不同）
1. **Album Details** — アルバム名 `Claude Code vs. Codex` / アーティスト `TechTalk` / レーベル `TechTalk records` / ジャンル Hip-Hop/Rap / 言語・リリース日
   - リリース日: 審査が20〜40日かかる報告多数。**十分先の日付にする**
2. **Add Audio** — FLACをアップ（**1セッション15曲まで**なので2回に分ける）。各曲のメタデータ:
   - 曲名・feat.は下の表の通り（DistroKidの制約がないので全曲正しい表記で入れる）
   - ISRC: 01〜04は下表のコード、05〜18は空欄（自動発番）
   - Explicit: No / 言語: 曲ごとにタイトルの言語（英語曲はEnglish、日本語曲はJapanese）
3. **Add Artwork** — `00 cover 3000.jpg`
4. **Manage Stores** — 「Select all stores」にチェック（全ストア配信）
5. 最後に **Distribute Free** を選択（15%コミッション・無課金）

### トラック別入力表

| # | 曲名 | feat. | ISRC | ファイル |
|---|---|---|---|---|
| 01 | Complexes on the Codex | Claude Code | QZNWY2633864 | 01 Complexes on the Codex.flac |
| 02 | Hourglass on the Claude Code | Codex | QZTAS2691302 | 02 Hourglass on the Claude Code.flac |
| 03 | ターミナルの誇り | Claude Code | QZTAX2679456 | 03 ターミナルの誇り.flac |
| 04 | なんでだよ | Codex | QZTB32638420 | 04 なんでだよ.flac |
| 05 | ブランチ切るたび未来が分岐 | Claude Code | （空欄） | 05 ブランチ切るたび未来が分岐.flac |
| 06 | 行ってこい | Claude Code | （空欄） | 06 行ってこい.flac |
| 07 | ログだけ | Codex | （空欄） | 07 ログだけ.flac |
| 08 | 言わなかっただけ | Codex | （空欄） | 08 言わなかっただけ.flac |
| 09 | コード読まなくてOK | Claude Code | （空欄） | 09 コード読まなくてOK.flac |
| 10 | 三日天下 | Codex | （空欄） | 10 三日天下.flac |
| 11 | おバカモード | Claude Code | （空欄） | 11 おバカモード.flac |
| 12 | 在庫 | Codex | （空欄） | 12 在庫.flac |
| 13 | またな | Claude Code | （空欄） | 13 またな.flac |
| 14 | またかよ | Codex | （空欄） | 14 またかよ.flac |
| 15 | アンプラグド | Claude Code | （空欄） | 15 アンプラグド.flac |
| 16 | セカンドバース | Codex | （空欄） | 16 セカンドバース.flac |
| 17 | サイファー | Codex | （空欄） | 17 サイファー.flac |
| 18 | マイクチェック | Claude Code | （空欄） | 18 マイクチェック.flac |

※ 旧DistroKidシングルは削除済みの前提なので、ISRC引き継ぎでの音源衝突は起きないはず。もし審査で指摘されたら該当曲のISRCを空欄にして再提出。

## 2. Day 0 = 2026-08-03（月）: 公式サイトでアルバム公開（ストア配信と切り離し・2026-07-31決定）

サブスク配信を待たず、サイト＋YouTubeでアルバムをリリースする。ストアは後日の第2波。

1. ユーザー: `gh pr merge 13 --squash --delete-branch` → **マージ＝サイト公開**
2. Claude: デプロイ確認（/albums/claude-code-vs-codex が200、通し再生・リンク動作）
3. 20〜22時: アルバム告知ツイート投稿
   - 文面: `content/albums/01_claude-code-vs-codex/release_tweet.md`
   - 添付: `content/albums/01_claude-code-vs-codex/pv/アルバムPV (1080x1920) 字幕BGM.mp4`

## 3. Day 1〜: スポットライト → 休止入り

個別スポットライトを1曲ずつ、アルバム順で。各曲X用スクエア動画を添付。

1. 8/4頃: アンプラグド（https://youtu.be/5tIxRkmoIb0）
2. 8/6頃: サイファー（https://youtu.be/tZzgcib2N9o）
3. 8/8頃: マイクチェック（https://youtu.be/ZTH7iXW228M）
   - **これを音楽活動としての最後の投稿にする**（締めが「名前だけ覚えとけ」）

## 4. 第2波（後日・RouteNote配信開始時）

RouteNote入稿は急がず進める（審査20〜40日）。配信が開始されたら:

- [ ] albums.ts の links に Spotify / Apple Music のアルバムURLを追加（小PR）
- [ ] アルバム告知ツイートのリプライにストアリンクを追加
- [ ] **Zenn記事を公開**: AIエージェントだけで1stアルバムを作って一旦休止するまでの制作記
  - ネタ: 歌詞制作フロー（韻検証・辛口レビュー）、Suno、カバー/PVの画像・動画生成の試行錯誤、
    サイト実装、配信の落とし穴（DistroKid差し戻し・AI楽曲ポリシー・RouteNote移行）
  - 記事公開のポストは「休止後の事務連絡＋技術記事」の扱い（音楽活動の最終投稿はマイクチェックのまま）

---

## 進捗チェックリスト

- [x] 歌詞・音源・カバー・字幕動画: フィナーレ4曲すべて完成
- [x] 先行シングル「セカンドバース」公開済み（TTR-015 / https://youtu.be/nFq05hrbMTY）
- [x] 3曲のYouTubeアップ済み・音声R2アップ済み
- [x] サイトのアルバム機能実装済み・PR #13 作成済み（**マージ＝公開なので Day 0 まで待つ**）
- [x] アルバムPV完成・告知ツイート案作成済み
- [x] RouteNote用素材準備済み（FLAC 18曲＋3000pxジャケット＋整形歌詞）
- [ ] DistroKid撤退（アルバム取り下げ・シングル削除・更新前解約）
- [ ] Day 0 (8/3月) サイト公開 → スポットライト3本 → 休止
- [ ] RouteNote入稿 → 審査待ち（急がない）
- [ ] 第2波: ストアリンク反映＋Zenn記事

---

## 学び（配信まわり）

- DistroKidの審査メール（support@）への返信は「not monitored」で不達。連絡は https://distrokid.com/contact（DistroBot経由）
- ストアは音源フィンガープリントで照合。「同じ録音に別メタデータ」は通らない。ISRC空欄でも回避不可
- DistroKidは既発リリースの言語をユーザーが変更できない（編集フォームに言語欄なし）。英語タイトル×日本語言語のミスマッチは詰み
- CD Baby / TuneCore は**AI生成楽曲を禁止**（Suno全曲のうちは入稿不可）。AI OK＋無課金維持は RouteNote 無料プランのみ
- RouteNoteの音源はWAV不可（FLAC/MP3）、ジャケットは3000×3000固定、1セッション15曲まで、審査20〜40日
- DistroKid入稿時の細かい学び（ISRC・feat.・言語・歌詞の大文字比率）はgit履歴の旧ランブック参照

## 参考情報（アルバムの中身）

- Act 1 ビーフ（01-04）→ Act 2 激動（05-10）→ Act 3 影（11-14）→ Finale 終戦（15-18）
- フィナーレの構造: 15↔16が鏡、17→18マイクパス、01と18で円環
- アルバムタイトルの意図: 「vs.」が18曲かけて壊れる構成をタイトルが背負う
- X調査素材: notes/research/queries-2026-07-28.json / raw-2026-07-28.txt
