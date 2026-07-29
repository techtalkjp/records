# アルバムPV（10秒）生成プロンプト — Veo用

対象: Google Veo 3.1（Gemini / Flow）
形式: 16:9, 10秒
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
Cinematic 10-second street rap battle at night, 16:9, photorealistic 35mm film look with
natural grain, handheld camera inside the crowd circle. NOT animation, NOT illustration.

SETTING: A rain-wet Japanese city street at night. A tight circle of young spectators in
streetwear surrounds two Japanese rappers facing each other under a single streetlamp.
Wet asphalt reflections. Breath visible in the cold air.

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
and sharp. The crowd reacts, hands up, someone shouts.
6-8s — The two trade bars at close range, faces almost touching, staredown intensity,
breath clouds mixing under the streetlamp. The crowd bounces.
8-10s — Rapper B spits a final punchline right in Rapper A's face; the crowd explodes,
jumping, hands everywhere. The two hold the staredown, neither backing off. Hard cut to
black exactly on the last beat hit.

CAMERA: handheld inside the circle, shoulder height, slow orbit around the two rappers,
no cuts, subtle whip toward whoever is rapping.
AUDIO: hard 90 BPM boom-bap with vinyl crackle, crowd hype ("oh!", claps), street
ambience; the beat stops dead at 8s, leaving only crowd noise for the fist bump, then
a roar.
NO on-screen text, no subtitles, no logos, no microphones needed — raw street cypher.
```

## ネガティブ指定（フィールドがあるUI用）

```
animation, anime, illustration, CGI look, oversaturated, HDR, text overlays, subtitles,
watermarks, daylight, stage, concert lighting, microphone stands, fast cuts
```

## バリエーション運用

- 顔が参照とズレる場合: CHARACTERS ブロックの該当特徴（mole / scar / beanie色）を先頭に移動して強調
- 10秒不可のUI（8秒）: 0-3→0-2.5 / 3-6→2.5-5 / 6-8→5-6.5 / 8-10→6.5-8

## 用途

- アルバム告知ツイートの添付動画
- YouTubeトレーラー（編集で末尾に cover_wide.jpg のタイトルカード2秒を足すと締まる）
```
