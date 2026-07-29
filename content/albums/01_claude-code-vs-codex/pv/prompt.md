# アルバムPV（10秒）生成プロンプト — Veo用

対象: Google Veo 3.1（Gemini / Flow）
形式: 9:16 縦長, 10秒（X/Shorts/Reels向け）
コンセプト: 無人の深夜の路上、2人きりのタイマン。2.5秒×4の厳密なターン制（CC→Codex→CC→Codex）。和解は入れない（ネタバレ禁止）。観客は完全に排除（Veoの群衆クローン問題の根治策）。
推奨: Flow の ingredients（参照画像）に
`content/artists/claude-code/images/reference.jpg` と `content/artists/codex/images/reference.jpg`
を渡して顔を固定する。参照を1枚しか渡せないUIなら
`content/albums/01_claude-code-vs-codex/artwork/drafts` は削除済みのため、
`python3` で2枚を横結合した合成画像を作って渡す（カバー制作で実績あり）。

## 絵コンテ

| 秒 | カット | 内容 |
|---|---|---|
| 0-2.5 | ①CC先攻 | 無人の深夜の路上、Claude Codeが手を切りながら先攻。アンバーの街灯 |
| 2.5-5 | ②Codexアンサー | Codexが踏み込んで打ち返す。赤ネオンのサイド光 |
| 5-7.5 | ③CCカウンター | Claude Codeが半歩も引かず返す。静かな凄み |
| 7.5-10 | ④Codex言い放ち | Codexが言い放つ→無言の睨み合い→ビートに合わせハードカット暗転 |

## メインプロンプト（英語・コピペ用）

```
Cinematic 10-second street rap battle at night, VERTICAL 9:16 portrait format,
photorealistic 35mm film look with natural grain, handheld camera. NOT animation,
NOT illustration.

SETTING: A rain-wet, COMPLETELY EMPTY Japanese city street late at night. No other
people anywhere — no crowd, no spectators, no pedestrians, just the two rappers facing
each other under a single streetlamp. Wet asphalt reflections, faint steam from a vent,
shuttered storefronts, distant traffic lights blinking to no one. Breath visible in the
cold air.

VERTICAL FRAMING: tight two-shot in portrait orientation — the two rappers fill the
frame from mid-thigh up, facing each other in profile, the streetlamp glow at the top
of the frame, wet asphalt reflections at the bottom. When one rapper takes his turn,
the camera favors him in a tighter chest-up framing.

CHARACTERS (keep faces consistent with the reference images):
- RAPPER A "Claude Code": Japanese man, late 20s, 3mm buzz cut, lean rectangular face,
  sharp jawline, thick straight eyebrows, intense hazel eyes, small mole below his right
  eye, black nylon bomber jacket over a charcoal hoodie, thin silver chain. Lit warm
  amber by the streetlamp. Calm, composed, quietly dominant.
- RAPPER B "Codex": Japanese man, mid-to-late 20s, olive-green knit beanie over sandy-
  blonde tipped hair, sharp almond eyes, high cheekbones, distressed blue denim vest over
  an oversized black hoodie, layered silver chains. Lit by a red neon sign from the side.
  Hungry, sharp, leaning forward.

ACTION (strict turn-taking — exactly two exchanges, each rapper speaks twice):
0-2.5s — RAPPER A raps first, straight at Rapper B, chopping the air with his hand on
the beat, calm-aggressive. Rapper B listens, jaw tight.
2.5-5s — RAPPER B steps in and fires back, jabbing a finger, chains swinging. Rapper A
listens without flinching.
5-7.5s — RAPPER A counters, not giving an inch, a cold half-smile, precise hand
gestures. Rapper B's eyes narrow.
7.5-10s — RAPPER B spits his final line right in Rapper A's face. Then silence: the two
hold the staredown, breath clouds mixing under the streetlamp. Hard cut to black exactly
on the last beat hit.

CAMERA: handheld at shoulder height, slow orbit around the two rappers, no cuts, subtle
lean toward whoever is rapping. Keep both heads inside the vertical frame at all times —
never crop above the eyebrows.
AUDIO: hard 90 BPM boom-bap with vinyl crackle echoing off the empty street, the two
voices trading verses in turn, light rain ambience, a distant train. No crowd noise.
Everything hard-stops together with the cut to black.
NO on-screen text, no subtitles, no logos, no microphones — raw street battle.

AVOID: animation or anime or CGI look, oversaturated HDR colors, text overlays,
subtitles, watermarks, daylight, stage or concert lighting, microphone stands, fast
cuts, any spectators or crowd or pedestrians or bystanders, extra people in the
background, anyone looking at the camera, both rappers talking at the same time.
```

## バリエーション運用

- 顔が参照とズレる場合: CHARACTERS ブロックの該当特徴（mole / scar / beanie色）を先頭に移動して強調
- 10秒不可のUI（8秒）: ターンを2秒×4に圧縮（0-2 / 2-4 / 4-6 / 6-8）
- 背景に人が湧く場合: SETTING の "COMPLETELY EMPTY" 文をプロンプト先頭に移動

## 用途

- アルバム告知ツイートの添付動画
- YouTube Shorts / Reels
- 横長16:9が必要になったら FRAMING 行を戻して別生成（縦→横のクロップは不可）
```
