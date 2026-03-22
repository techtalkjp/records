# Gemini 3.1 Flash Image Preview 画像生成ガイド

## モデル情報

- **Model ID**: `gemini-3.1-flash-image-preview`
- **別名**: Nano Banana 2
- **特徴**: 高速・高効率な画像生成。速度と大量処理に最適化
- **出力解像度**: 0.5K, 1K（デフォルト）, 2K, 4K
- **アスペクト比**: 1:1, 1:4, 1:8, 2:3, 3:2, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 16:9, 21:9
- **入力**: テキスト + 画像/PDF
- **トークン制限**: 入力131,072 / 出力32,768
- **生成画像にはSynthIDウォーターマークが付く**

## 他のモデルとの比較

| モデル | 強み | 用途 |
|-------|------|------|
| Gemini 3.1 Flash (Nano Banana 2) | 速度、0.5K-4K、画像検索 | 高ボリューム、高速 |
| Gemini 3 Pro (Nano Banana Pro) | プロ品質、高度な推論 | 複雑なワークフロー、プレミアム |
| Gemini 2.5 Flash (Nano Banana) | 速度と品質のバランス | 汎用 |

## プロンプトのベストプラクティス

### 核心原則
**「シーンを描写せよ、キーワードを並べるな」**

説明的な文章で書く方が、単語の羅列より一貫性のある画像が生まれる。モデルは言語理解に優れている。

### フォトリアリスティックなシーン

テンプレート:
```
A photorealistic [ショットタイプ] of [被写体], [アクション/表情], set in [環境].
Illuminated by [ライティング], creating [ムード] atmosphere.
Captured with [カメラ/レンズ詳細], emphasizing [テクスチャ/ディテール].
Aspect ratio: [フォーマット].
```

テクニック:
- 写真用語を使う（ショットタイプ、レンズタイプ、カメラアングル）
- ライティング条件を明示
- 細かいテクスチャやディテールに言及
- ムード/雰囲気を名指し
- カメラ機材の詳細で精密なコントロール

### スタイル転写
異なるアート手法を1枚に組み合わせ可能。

### テキスト描画
画像内に読みやすいテキストを生成可能。フォント、配置、階層を指定。

### 高忠実度ディテール保持
参考画像でロゴや製品を統合。
テクニック: 「Put this [object] on a [context]. The [object] is perfectly integrated into [setting].」

## 参考画像の使い方

### 容量
- Gemini 3.1 Flash: 最大10オブジェクト（高忠実度）+ 4キャラクター画像（計14枚）
- Gemini 3 Pro: 最大6オブジェクト + 5キャラクター画像（計14枚）

### 生成 vs 編集
- **生成**: テキストプロンプトだけで画像をゼロから作成
- **編集**: 既存画像 + テキストプロンプトで修正・変換

### マルチターン会話編集
チャット機能で反復的な画像生成・編集が可能。会話コンテキストを維持。

## 設定パラメータ

### imageConfig
- `aspect_ratio`: アスペクト比
- `image_size`: 解像度（"512", "1K", "2K", "4K"）

### responseModalities
- `["TEXT"]` — テキストのみ
- `["IMAGE"]` — 画像のみ
- `["TEXT", "IMAGE"]` — 両方

### thinkingConfig
- `thinking_level`: "minimal"（デフォルト、低レイテンシ）or "high"（高品質推論）
- `include_thoughts`: 推論過程を返すか（課金はされる）

## Thinking モード

複雑なプロンプトで推論プロセスを活用。中間の「思考画像」を生成（バックエンドのみ、課金なし）してから最終出力。

- `minimal`: 最低レイテンシ
- `high`: 推論強化、高品質

## 検索グラウンディング

### Web Search
リアルタイム情報（天気、株価、最近のイベント）に基づく画像生成。

### Image Search（3.1 Flash のみ）
Google画像検索で取得したWeb画像を視覚的コンテキストとして使用。

## コード例（JavaScript/TypeScript）

### テキストから画像
```javascript
const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: "プロンプト",
});

for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync("output.png", buffer);
    }
}
```

### 画像編集（参考画像付き）
contentsの配列にテキストと画像データを含める。

### 高解像度出力
```javascript
config: {
    responseModalities: ['TEXT', 'IMAGE'],
    imageConfig: {
        aspectRatio: "1:1",
        imageSize: "4K"
    },
}
```

## 制約事項

- 他者の権利を侵害するコンテンツ（欺瞞・嫌がらせ・危害）は生成不可
- アップロード画像には必要な権利を持つこと
- SynthIDウォーターマークが全画像に付与される

## このプロジェクトでの活用メモ

- キャラクター画像は参考画像を使う場合、プロンプトは簡潔に。参考画像が語る
- 解像度は2Kで十分（カバーアート用）
- thinkingを"high"にすると品質上がるがレイテンシも上がる
- 同じキャラを維持するには、前に生成した画像を参考画像として渡す
- **「シーンを描写せよ、キーワードを並べるな」** を常に意識
- **背景に地名を書かない** — 「Roppongi」と書くとAIが看板に「六本木」と貼り付けるだけで不自然。代わりに視覚的特徴を描写する（狭い路地、配管、室外機、小さなバーのドアから漏れる光）
- **Google Image Search グラウンディングが背景に効く** — `tools: [{ googleSearch: { searchTypes: { webSearch: {}, imageSearch: {} } } }]` で実際のWeb画像を参照させるとリアルな東京の路地裏が出る

## 参考
- [Gemini 3.1 Flash Image Preview](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image-preview)
- [Image generation documentation](https://ai.google.dev/gemini-api/docs/image-generation)
