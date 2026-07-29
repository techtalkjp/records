# アルバムPV（10秒）生成プロンプト — Veo用

対象: Google Veo 3.1（Gemini / Flow）
形式: 9:16 縦長, 10秒（X/Shorts/Reels向け）
コンセプト: アルバム0曲目。1曲目（Complexes on the Codex）が始まる直前の言い合い。ラップではなく会話（Veoの日本語はラップだと崩壊、会話なら安定）。最後にビートが鳴った瞬間暗転＝そこからアルバムが始まる。
推奨: Flow の ingredients（参照画像）に
`content/artists/claude-code/images/reference.jpg` と `content/artists/codex/images/reference.jpg`
を渡して顔を固定する。参照を1枚しか渡せないUIなら
`content/albums/01_claude-code-vs-codex/artwork/drafts` は削除済みのため、
`python3` で2枚を横結合した合成画像を作って渡す（カバー制作で実績あり）。

## 絵コンテ

| 順 | カット | 内容 |
|---|---|---|
| 1 | ①Codexが絡む | 「おい。聞いたぜ 随分デカい口叩いてるらしいな」 |
| 2 | ②CCが受け流す | 「事実を言ってるだけだ」 |
| 3 | ③Codexが挑発 | 「なら証明しろよ。今 ここで」 |
| 4 | ④CCが受けて立つ | 「……いいぜ。ビート持ってこい」→ ビートが一発鳴る→暗転 |

## メインプロンプト（英語・コピペ用）

```
Cinematic 10-second night scene, VERTICAL 9:16 portrait format, photorealistic 35mm
film look with natural grain. ONE SINGLE CONTINUOUS UNBROKEN HANDHELD TAKE from the
first frame to the final cut to black — absolutely no editing cuts, no camera jumps,
no angle changes, one camera the whole time. NOT animation, NOT illustration.

SETTING: A rain-wet, COMPLETELY EMPTY Japanese city street late at night. No other
people anywhere — no crowd, no pedestrians, just two men squaring up under a single
streetlamp. Wet asphalt reflections, faint steam from a vent, shuttered storefronts.
Breath visible in the cold air. Tense, quiet — the moment right before a rap battle
starts.

VERTICAL FRAMING: tight two-shot in portrait orientation — the two men fill the frame
from mid-thigh up, facing each other in profile, the streetlamp glow at the top of the
frame, wet asphalt reflections at the bottom.

CHARACTERS (keep faces consistent with the reference images):
- MAN A "Claude Code": Japanese man, late 20s, 3mm buzz cut, lean rectangular face,
  sharp jawline, thick straight eyebrows, intense hazel eyes, small mole below his right
  eye, black nylon bomber jacket over a charcoal hoodie, thin silver chain. Lit warm
  amber by the streetlamp. Calm, composed, unbothered.
- MAN B "Codex": Japanese man, mid-to-late 20s, olive-green knit beanie over sandy-
  blonde tipped hair, sharp almond eyes, high cheekbones, distressed blue denim vest
  over an oversized black hoodie, layered silver chains. Lit by a red neon sign from
  the side. Hungry, provocative, leaning in.

ACTION (spoken Japanese conversation, low and tense, NOT rapping — all in one
continuous shot, no cut between lines):
First, MAN B walks up close and provokes, chin raised:
"おい。聞いたぜ、随分デカい口叩いてるらしいな" (Oi. Kiita ze, zuibun dekai kuchi
tataiteru rashii na.)
Then, without any cut, MAN A answers flat and calm, barely moving:
"事実を言ってるだけだ" (Jijitsu wo itteru dake da.)
Then, still the same take, MAN B steps even closer, jabbing a finger:
"なら証明しろよ。今、ここで" (Nara shoumei shiro yo. Ima, koko de.)
Finally — the camera never cutting away — MAN A lets a cold half-smile show and says:
"……いいぜ。ビート持ってこい" (...Ii ze. Biito mottekoi.)
The instant he finishes, a hard boom-bap beat SLAMS in — one hit — and the picture
hard-cuts to black on that hit (this final cut to black is the ONLY cut in the video).

DIALOGUE RULES: all four lines are spoken in natural native JAPANESE, low conversational
voices, street-tough tone, NOT sung, NOT rapped. Say each line exactly as written,
nothing more — no extra ad-libs, no English.

CAMERA: one unbroken handheld take at shoulder height, slowly drifting closer as the
tension rises — the escalation is carried by this camera drift alone, never by a cut.
Keep both heads inside the vertical frame at all times — never crop above the eyebrows.
AUDIO: no music until the very end — only light rain ambience, a distant train, their
two voices low and tense. Then the single boom-bap beat hit slams in on the last word
and everything cuts to black together.
NO on-screen text, no subtitles, no logos, no microphones.

AVOID: animation or anime or CGI look, oversaturated HDR colors, text overlays,
subtitles, watermarks, daylight, stage or concert lighting, fast cuts, editing cuts,
shot changes, camera angle jumps, montage, any spectators or crowd or pedestrians or
bystanders, extra people in the background, anyone looking at the camera, rapping,
singing, background music before the final beat hit.
```

## バリエーション運用

- 顔が参照とズレる場合: CHARACTERS ブロックの該当特徴（mole / scar / beanie色）を先頭に移動して強調
- 秒数指定はカット誘発の原因になったため廃止（2026-07-29の生成でACTIONの「7.5-10s」境界にカットが入った）。ターンは First/Then/Finally の接続詞で流す
- セリフ未指定だと「ラップ風のなんちゃって英語マムブル」が生成される（2026-07-29確認）
- 日本語の「ラップ」は発音崩壊する（「差は明白」→「さわめいわき」）。会話セリフなら安定するため、PVは0曲目の言い合いに変更（2026-07-29）
- それでも発音が崩れる行は、より口語の短い言い回しに差し替えて再生成
- 背景に人が湧く場合: SETTING の "COMPLETELY EMPTY" 文をプロンプト先頭に移動

## 用途

- アルバム告知ツイートの添付動画
- YouTube Shorts / Reels
- 横長16:9が必要になったら FRAMING 行を戻して別生成（縦→横のクロップは不可）
```
