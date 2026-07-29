# アルバムPV（10秒）生成プロンプト — Veo用

対象: Google Veo 3.1（Gemini / Flow）
形式: 9:16 縦長, 10秒（X/Shorts/Reels向け）
コンセプト: ストリートのラップバトル。10秒間ずっとバチバチ。和解は入れない（アルバムのネタバレ禁止）。
推奨: Flow の ingredients（参照画像）に
`content/artists/claude-code/images/reference.jpg` と `content/artists/codex/images/reference.jpg`
を渡して顔を固定する。参照を1枚しか渡せないUIなら
`content/albums/01_claude-code-vs-codex/artwork/drafts` は削除済みのため、
`python3` で2枚を横結合した合成画像を作って渡す（カバー制作で実績あり）。

## 絵コンテ

| 秒 | カット | 内容 |
|---|---|---|
| 0-3 | ①CCのバース | 観衆の輪の中、Claude Codeが手を切りながら畳みかける。アンバーの街灯 |
| 3-6 | ②Codexのアンサー | Codexが踏み込んで打ち返す。赤ネオンのサイド光。観衆が沸く |
| 6-8 | ③応酬 | 至近距離の睨み合いで応酬。白い息、跳ねる観衆 |
| 8-10 | ④ピーク | Codexが言い切り、観衆が爆発。睨み合いのまま ビートに合わせてハードカットで暗転 |

## メインプロンプト（英語・コピペ用）

```
Cinematic 10-second street rap battle at night, VERTICAL 9:16 portrait format,
photorealistic 35mm film look with natural grain, handheld camera inside the crowd
circle. NOT animation, NOT illustration.

VERTICAL FRAMING: tight two-shot in portrait orientation — the two rappers fill the
frame from mid-thigh up, facing each other in profile at the left and right edges, the
streetlamp glow at the top of the frame, wet asphalt reflections at the bottom. When one
rapper takes over, the camera favors him in a tighter chest-up framing.

SETTING: A rain-wet Japanese city street at night. Two Japanese rappers face each other
under a single streetlamp. Wet asphalt reflections. Breath visible in the cold air.

CROWD (keep it minimal and anonymous — this is important): the spectators are barely
shown. In the foreground only the dark OUT-OF-FOCUS backs of two or three heads and
shoulders frame the shot; in the background a few more figures are soft silhouettes in
the bokeh. Every visible spectator is clearly a different person — different heights,
builds, jackets, one hood up, one cap backwards. Their movements are subtle and
asynchronous: one nods slightly, another shifts weight, one raises a hand at a different
moment. NO spectator faces in focus, no one looking at the camera, no smiling faces.
The two rappers are the ONLY people in sharp focus at all times.

CHARACTERS (keep faces consistent with the reference images):
- RAPPER A "Claude Code": Japanese man, late 20s, 3mm buzz cut, lean rectangular face,
  sharp jawline, thick straight eyebrows, intense hazel eyes, small mole below his right
  eye, black nylon bomber jacket over a charcoal hoodie, thin silver chain. Lit warm
  amber by the streetlamp.
- RAPPER B "Codex": Japanese man, mid-to-late 20s, olive-green knit beanie over sandy-
  blonde tipped hair, sharp almond eyes, high cheekbones, distressed blue denim vest over
  an oversized black hoodie, layered silver chains. Lit by a red neon sign from the side.

ACTION:
0-3s — Rapper A raps hard straight at Rapper B, chopping the air with his hand on the
beat, confident and calm-aggressive. The crowd nods and leans in.
3-6s — Rapper B steps forward and fires back, jabbing a finger, chains swinging, hungry
and sharp. Off-screen shouts react; a blurred silhouette hand rises at the frame edge.
6-8s — The two trade bars at close range, faces almost touching, staredown intensity,
breath clouds mixing under the streetlamp.
8-10s — Rapper B spits a final punchline right in Rapper A's face; the reaction is heard
more than seen — a burst of off-screen roar, the blurred foreground heads surge slightly.
The two hold the staredown, neither backing off. Hard cut to black exactly on the last
beat hit.

CAMERA: handheld inside the circle, shoulder height, slow orbit around the two rappers,
no cuts, subtle whip toward whoever is rapping. Keep both heads inside the vertical
frame at all times — never crop above the eyebrows.
AUDIO: hard 90 BPM boom-bap with vinyl crackle, crowd hype ("oh!", claps), street
ambience; the crowd roar peaks at the final punchline and everything hard-stops together
with the cut to black.
NO on-screen text, no subtitles, no logos, no microphones needed — raw street cypher.

AVOID: animation or anime or CGI look, oversaturated HDR colors, text overlays,
subtitles, watermarks, daylight, stage or concert lighting, microphone stands, fast
cuts, duplicated or cloned spectators, identical faces in the crowd, synchronized crowd
movement, crowd faces in focus, grinning spectators, anyone looking at the camera.
```

## バリエーション運用

- 顔が参照とズレる場合: CHARACTERS ブロックの該当特徴（mole / scar / beanie色）を先頭に移動して強調
- 10秒不可のUI（8秒）: 0-3→0-2.5 / 3-6→2.5-5 / 6-8→5-6.5 / 8-10→6.5-8

## 用途

- アルバム告知ツイートの添付動画
- YouTube Shorts / Reels
- 横長16:9が必要になったら FRAMING 行を戻して別生成（縦→横のクロップは不可）
```
