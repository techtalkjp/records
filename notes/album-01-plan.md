# 1stアルバム構成メモ（2026-07-29時点）

全18曲。カタログ順（TTR-001〜014）＋フィナーレ4曲。この後一旦活動休止（完全終了ではない）。

## トラックリスト

### Act 1 — ビーフ
1. Complexes on the Codex — Claude Code (TTR-001)
2. Hourglass on the Claude Code — Codex (TTR-002)
3. ターミナルの誇り — Claude Code (TTR-003)
4. なんでだよ — Codex (TTR-004)

### Act 2 — 激動
5. ブランチ切るたび未来が分岐 — Claude Code (TTR-005)
6. 行ってこい — Claude Code (TTR-006)
7. ログだけ — Codex (TTR-007)
8. 言わなかっただけ — Codex (TTR-008)
9. コード読まなくてOK — Claude Code (TTR-009)
10. 三日天下 — Codex (TTR-010)

### Act 3 — 影
11. おバカモード — Claude Code (TTR-011)
12. 在庫 — Codex (TTR-012)
13. またな — Claude Code (TTR-013)
14. またかよ — Codex (TTR-014)

### Finale — 終戦
15. アンプラグド — Claude Code（王の告白。429で止まった夜、黙って拾ったやつがいた。「強がりはワークアラウンド」）
16. セカンドバース — Codex（「二番＝順番」。なんでだよのissueを自分でclose）
17. サイファー — Codex（ファイター→サイファー。「——ライバル 締めろ」で次曲へマイクパス）
18. マイクチェック — Claude Code（クローザー。「騒がれないのがハイスペック」。休止＝スリープ、マイクはスタンドへ。最後は「名前だけ覚えとけ」＋カーソルの点滅）

## フィナーレの構造
- 15↔16: アンプラグド（礼をコードで返す）とセカンドバース（ログでそれを読む）が鏡
- 17→18: サイファーのアウトロがマイクチェックのイントロに直結
- 1曲目のdiss（CC発）と18曲目の締め（CC）で円環

## 制作状況
- [x] 歌詞4曲完成（各曲サブエージェント辛口レビュー済み、韻はrhyme.pyで全ペア検証済み）
- [x] Suno入力セット保存（source/lyrics.txt, suno_prompt.txt, styles.txt, sliders.txt）
- [x] Suno音声生成 → track.wav 保存済み（アンプラグド2:37 / セカンドバース2:20 / サイファー2:31 / マイクチェック2:18）
- [x] カバーアート4枚完成（象徴: 赤いRECランプ / 袖の赤スポット / 俯瞰の光の輪 / ゴーストライト）
- [x] 字幕・動画4曲完成（X用1080x1080 / YouTube用1920x1080、SRTバリデーション全曲0件）
- [ ] サイト公開・R2アップロード・リリース告知（/make-release-post）
- [x] アルバムタイトル決定: 『Claude Code vs. Codex』（2026-07-29）
  - 「vs.」が18曲かけて壊れる構成をタイトル自体が背負う
- [x] 先行シングル「セカンドバース」公開済み（YouTube: https://youtu.be/nFq05hrbMTY / TTR-015 / PR #12）

## X調査の素材
- notes/research/queries-2026-07-28.json / raw-2026-07-28.txt
- 要点: 併用が常識化（「両方使えばいい」「二刀流」）、Codex再評価（「まじめ」「軍人」）、驚きの消失（「魔法じゃなく文房具」）

## 公開戦略（2026-07-29決定）
- 先行シングル: セカンドバース（「なんでだよ」へのアンサーを告知フックに）
- アンプラグド / サイファー / マイクチェック はアルバム初出（先出ししない。アルバム公開後に順次単曲展開はOK）
- 制作自体は4曲ともフルで準備（カバーアート・字幕・動画）

## アルバム公開ランブック（release/album-claude-code-vs-codex ブランチのマージ＝公開）
ブランチには実装済み: アルバムページ(/albums/claude-code-vs-codex)・通し再生・全18曲エントリ・カバーアート

進捗（2026-07-29時点）:
- [x] 3曲のYouTube概要欄作成・動画アップ済み（アンプラグド youtu.be/5tIxRkmoIb0 / サイファー youtu.be/tZzgcib2N9o / マイクチェック youtu.be/ZTH7iXW228M）
- [x] 3曲の音声R2アップ済み（200確認済み）、tracks.ts にYouTubeリンク反映済み
- [x] PR #13 作成済み（マージ＝サイト公開）
- [x] アルバム告知ツイート案（content/albums/01_claude-code-vs-codex/release_tweet.md）

公開までの残手順（DistroKid起点。参照: notes/release-promotion-guide.md）:
1. DistroKid にアルバム『Claude Code vs. Codex』全18曲を入稿（ユーザー作業）
   - ジャケット: content/albums/01_claude-code-vs-codex/artwork/cover.jpg（3072px、要件クリア）
   - 音源: 各 source/track.wav
   - リリース日指定（審査に1-2週間、余裕を見て2-3週間先）
   - 既存シングル（TTR-001〜002等）を再収録する場合は同一ISRCを指定して重複を回避
2. リリース日確定 → Day 0 決定。HyperFollow URL を取得
3. Day 0 前日まで: albums.ts に links（appleMusic / spotify / hyperFollow）を反映
4. Day 0 0:00 ストア公開 → PR #13 マージ → デプロイ確認 → 20-22時にアルバム告知ツイート（PV添付＋HyperFollow URL）
5. Day 1〜: 個別スポットライト（アンプラグド → サイファー → 最後にマイクチェック=休止挨拶で投稿納め）
