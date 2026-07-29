# アルバムPV（10秒）生成プロンプト — Veo用

対象: Google Veo 3.1（Gemini / Flow）
形式: 16:9, 10秒（8秒制限のUIの場合は 0-8秒でカット④を6.5-8秒に圧縮）
推奨: **Image-to-Video で `artwork/cover_wide.jpg` を参照画像（first frame相当）に渡す**。
ポスターのデザイン・文字・2人の顔をテキストだけで再現させず、既存ジャケットに世界を一致させるため。

## 絵コンテ

| 秒 | カット | 内容 |
|---|---|---|
| 0-2.5 | ①路地 | 雨上がりの夜の路地をドリーイン。街灯フリッカー。壁越しのくぐもったboom-bap |
| 2.5-5 | ②ポスター | 劣化したVS興行ポスターに寄る。紙端が風で震える。ビートが鮮明に |
| 5-8 | ③剥がれ | 風で右下のめくれが開き、下の色あせた写真（並んで立つ2人）と暖色の光が現れる |
| 8-10 | ④残光 | 街灯が消え、隙間の暖光だけ残して暗転。ビート止み、電球のハム音 |

## メインプロンプト（英語・コピペ用）

```
Cinematic 10-second night scene, 16:9, photorealistic 35mm film look with heavy natural
grain, desaturated cool tones with warm amber accents. NOT animation, NOT illustration.

SETTING: A narrow Japanese back alley after rain. Wet asphalt reflects a single cold
streetlamp. On a weathered concrete wall hangs a large aged wheat-pasted boxing-style
versus poster (matching the reference image exactly): yellowed rain-streaked paper, torn
ragged edges, old tape repairs, deep creases. The poster shows two Japanese male rappers
in halftone duotone print with bold vintage lettering "CLAUDE CODE" and "CODEX" and a
big chipped "VS" emblem between them.

CHARACTERS (as printed on the poster, keep faces exactly as in the reference image):
- Left, amber duotone: Japanese man, late 20s, 3mm buzz cut, lean rectangular face,
  sharp jawline, thick straight eyebrows, intense hazel eyes, small mole below his right
  eye, faint scar on left cheekbone, black nylon bomber jacket over charcoal hoodie,
  thin silver chain. Calm staredown.
- Right, red duotone: Japanese man, mid-to-late 20s, olive-green knit beanie over sandy-
  blonde tipped hair, sharp almond eyes, high cheekbones, distressed blue denim vest over
  oversized black hoodie, layered silver chains. Calm staredown.

SHOT LIST:
0.0-2.5s — Slow dolly-in from the middle of the dark alley toward the poster on the wall.
The streetlamp flickers once. Faint muffled boom-bap beat as if playing behind the wall.
Distant dripping water.
2.5-5.0s — The camera keeps pushing in until the poster fills the frame. The paper's
edges tremble slightly in a low wind. The beat grows a little clearer.
5.0-8.0s — A gust of wind. The peeling bottom-right corner of the poster lifts and curls
open wider, paper fibers tearing softly. Beneath it, an older sun-faded photograph is
revealed: the same two men standing side by side, shoulder to shoulder, relaxed under a
warm streetlight. Warm amber light seems to spill out of the gap onto the wet wall.
Camera drifts closer to the gap.
8.0-10.0s — The cold streetlamp buzzes and dies. Only the warm glow from the torn gap
remains against the darkness, then slow fade to black. The beat stops; a faint filament
hum lingers.

CAMERA: one continuous slow push-in the whole time, no cuts, slight handheld breathing.
LIGHTING: single cold overhead streetlamp + warm amber spill from the torn gap.
AUDIO: rain-wet ambience, muffled 90 BPM boom-bap, paper rustle, lamp buzz, filament hum.
NO on-screen text overlays, no subtitles, no logos beyond what is printed on the poster.
No people walking through the scene. No camera shake beyond subtle breathing.
```

## ネガティブ指定（フィールドがあるUI用）

```
animation, anime, illustration, CGI look, oversaturated, HDR, text overlays, subtitles,
watermarks, people in the alley, fast cuts, camera shake, daylight
```

## バリエーション運用

- まず参照画像あり（cover_wide.jpg）で2-3本生成 → ポスターの一致度で選ぶ
- 剥がれの開きが足りない場合: SHOT LIST 5.0-8.0s の "lifts and curls open wider" を
  "peels back dramatically, revealing most of the hidden photograph" に強める
- 音が付かないモデルの場合: AUDIO 行を削除し、X投稿時に本編音源を別途載せる
- 8秒制限のUI: 0-2.5→0-2.0 / 2.5-5→2-4 / 5-8→4-6.5 / 8-10→6.5-8 に圧縮した版で

## 用途

- アルバム告知ツイートの添付動画（メインツイートに直貼り）
- YouTubeアルバムトレーラー（末尾にタイトルカードを編集で足す場合は ffmpeg で
  cover_wide.jpg を2秒つなぐ）
```
