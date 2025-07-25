# Z世代向けペットトレンドLP

## 概要
Z世代に人気のペットトリミング・ホテルサービス向けのランディングページです。TikTokトレンドカットから癒しのホテル体験まで、推しペットをさらにカワイくすることを目的としたデザインです。

## 特徴
- **メインキャッチ**: 「#推しペットがさらにカワイイ！」でZ世代の心を掴む
- **動的背景**: パステルグラデーションが8秒周期で変化するアニメーション
- **TikTok風ギャラリー**: 縦スライダーでショート動画風のコンテンツ表示
- **SNS風レビュー**: 実際のSNS投稿を模したデザインでリアリティを演出
- **インタラクティブ要素**: スワイプ可能なビフォーアフター比較機能
- **リアルタイムカウントダウン**: 限定キャンペーンで緊急性を演出

## デザインコンセプト
### カラーパレット
- **プライマリ**: パステルピンク系グラデーション (#FFDEE9 → #B5FFFC)
- **セカンダリ**: パステルブルー系グラデーション (#FFE2E2 → #F093FB)
- **アクセント**: パステルイエロー系グラデーション (#FFF2CC → #C1E7FF)

### タイポグラフィ
- **英字**: Quicksand (モダンで親しみやすい)
- **日本語**: Noto Sans JP (読みやすさを重視)

## 技術仕様
### 使用ライブラリ
- **GSAP**: 高品質なアニメーション（フェードイン、スライドイン、パララックス）
- **Swiper.js**: タッチスワイプ対応のスライダー
- **IntersectionObserver**: スクロール連動アニメーション
- **VanillaJS**: 軽量で高速なJavaScript実装

### レスポンシブ対応
- **モバイルファースト設計**
- **タブレット対応**: 768px以上
- **デスクトップ対応**: 1024px以上

## 主要セクション

### 1. ヒーローセクション
- フルスクリーン動的グラデーション背景
- キャッチコピー「#推しペットがさらにカワイイ！」
- トレンドタグ表示（#トレンド、#癒し、#推し活）
- CTA: LINE予約、Instagram連携

### 2. TikTok風ギャラリー
- 縦型スライダーでモバイル最適化
- 動画サムネイル＋プレイボタン
- ユーザー名＋キャプション表示
- ハッシュタグ機能

### 3. 推しメニュー紹介
- **TikTokトレンドカット**: ¥8,800~ (人気No.1バッジ)
- **プレミアム癒しホテル**: ¥12,000~ (初回限定割引バッジ)
- **推しカラーネイル**: ¥3,300~
- スライドインアニメーション付きカードデザイン

### 4. SNS風お客様の声
- Twitter/Instagram風デザイン
- プロフィール画像＋ユーザー名＋投稿時間
- いいね・コメント・リツイート数表示
- 横スクロールスライダー

### 5. ビフォーアフター
- スワイプ可能な比較スライダー
- ドラッグ＆タッチ対応
- ハンドル付きインタラクティブUI

### 6. 限定キャンペーン
- リアルタイムカウントダウンタイマー
- 初回利用30%OFF訴求
- 緊急性を演出するデザイン

### 7. FAQ
- アコーディオン形式で省スペース
- よくある質問3項目
- スムーズな開閉アニメーション

## パフォーマンス最適化
- **画像遅延読み込み**: LazyLoad実装
- **軽量ライブラリ選択**: 必要最小限のJavaScript
- **CSSアニメーション**: GPU加速対応
- **モバイル最適化**: タッチイベント最適化

## SEO対策
- セマンティックHTML5構造
- Open Graph / Twitter Card対応
- 構造化データ実装準備
- アクセシビリティ配慮

## カスタマイズポイント
1. **店舗情報**: 店舗名、住所、営業時間の変更
2. **メニュー価格**: サービス内容と価格の調整
3. **カラーテーマ**: CSS変数で簡単にブランドカラー変更可能
4. **画像素材**: images/フォルダ内のダミー画像を実際の写真に差し替え
5. **SNS連携**: 実際のアカウントリンクに変更

## 注意事項
- ダミー画像は実際のペット写真に差し替える必要があります
- カウントダウンタイマーは実際のキャンペーン日程に合わせて調整してください
- LINE・Instagram等のソーシャルリンクは実際のアカウントURLに変更してください

## ブラウザ対応
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

## ファイル構成
```
pet-ztrend-lp/
├── index.html          # メインHTMLファイル
├── style.css          # スタイルシート
├── script.js          # JavaScript機能
├── README.md          # このドキュメント
└── images/            # 画像素材フォルダ（要差し替え）
    ├── hero.jpg       # ヒーロー背景画像
    ├── menu1.jpg      # トレンドカット画像
    ├── menu2.jpg      # ホテル画像
    ├── menu3.jpg      # ネイル画像
    ├── tiktok1.jpg    # TikTok風サムネイル1
    ├── tiktok2.jpg    # TikTok風サムネイル2
    ├── tiktok3.jpg    # TikTok風サムネイル3
    ├── review1.png    # レビュアーアバター1
    ├── review2.png    # レビュアーアバター2
    ├── review3.png    # レビュアーアバター3
    ├── before.jpg     # ビフォー画像
    └── after.jpg      # アフター画像
```