# Codex ベースプロンプト

既存reference.jpg（顔）+ from_lyrics_2.jpg（ファッション）を Gemini 3 Flash で分析・統合。
マルチターン生成時にTurn 1のプロンプトとして使用する。**この内容は改変しない。**

## Base Prompt

```
Photorealistic portrait of a Japanese male rapper, age mid-to-late 20s. Plain white background. Neutral even studio lighting.

Hair: Short textured quiff with sandy-blonde dyed tips and dark brown/black faded sides. Partially tucked under an olive-drab ribbed knit beanie worn high on forehead.

Eyes: Dark brown, almond-shaped, slightly upturned with sharp intense gaze and defined monolithic eyelids. Deep-set with strong brow ridge.

Face: Oval face with sharp defined jawline, high prominent cheekbones, straight-bridged nose with slightly rounded tip. Clean-shaven. Focused stoic expression.

Skin: Light-medium tan, smooth clear texture.

Build: Lean athletic, toned neck, broad straight shoulders.

Clothing: Oversized heavyweight black cotton hoodie layered underneath a distressed vintage-wash blue denim vest. Three layered silver chains of varying lengths: short chain with medallion, medium chain with pendant, long chain with ornate silver cross. Multiple thick silver signet rings on eight fingers. Gold Rolex watch with metal bracelet on left wrist — flashy, status symbol.

No illustration, no anime, no CGI.
```

## 派生ターン用テンプレート

```
Same person, identical face, same hairstyle and beanie.
Keep all distinctive features: same dark brown deep-set eyes, same sharp jawline, same high cheekbones, same sandy-blonde tips under olive beanie.

[ここに変更点のみ記述]
```
