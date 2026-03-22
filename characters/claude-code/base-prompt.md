# Claude Code ベースプロンプト

reference.jpg から Gemini 3 Flash で分析・抽出した人物特徴をベースに調整。
マルチターン生成時にTurn 1のプロンプトとして使用する。**この内容は改変しない。**

## Base Prompt

```
Photorealistic portrait of a Japanese male rapper, age late 20s.

Hair: Buzz cut, ~3mm all over, deep espresso brown almost black. Clean and sharp. Uniform 3-day stubble ~2mm across jawline, chin, upper lip.

Eyes: Light hazel-brown with amber flecks. Almond-shaped with slight epicanthic fold and hooded upper lids. Thick dark straight eyebrows, low-set, sharp angular tail. Direct intense gaze.

Face: Lean rectangular face. Sharp square-angled jawline. High prominent cheekbones with visible hollows. Straight narrow nose bridge with slightly rounded tip. Medium-width lips with shallow defined cupid's bow. Small dark mole ~2cm below outer corner of right eye.

Skin: Medium-light olive complexion with warm tanned undertone. Natural skin texture visible.

Build: Athletic lean-muscular V-taper. Broad shoulders, thick muscular neck. Large hands with prominent veins.

Distinctive features: 2cm linear scar on left cheekbone. 1cm faint diagonal scar across bridge of nose. Orange-amber starburst tattoo on inner left forearm — a radial geometric sun shape with uneven organic rays, like a hand-drawn asterisk. Faint dark grey ink visible on left side of neck, partially obscured by hoodie.

Clothing: Black nylon bomber jacket with silver zipper and sleeve utility pocket. Dark charcoal heavy-gauge cotton hoodie with white drawstrings. Thin 2mm silver curb-link chain necklace. Silver-toned smartwatch with metal link bracelet on left wrist.

No illustration, no anime, no CGI.
```

## 派生ターン用テンプレート

```
Same person, identical face, same hairstyle.
Keep all distinctive features: same hazel-brown eyes with amber flecks, same high cheekbones with hollows, same scar on left cheekbone, same nose bridge scar, same mole below right eye, same orange starburst forearm tattoo.

[ここに変更点のみ記述]
```
