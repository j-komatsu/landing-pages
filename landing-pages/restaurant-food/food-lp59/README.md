# 二郎系ラーメン店 LP (food-lp59)

## 概要
二郎系ラーメン店向けの爆盛りインパクト型ランディングページです。圧倒的ボリューム感とワイルドなデザインで食欲を刺激し、LINE予約や来店促進を目的としています。

## 特徴
- **ターゲット**: 食べ盛りの若者・男性層中心（10代〜40代）、SNS投稿好き層
- **デザイン**: 黒ベース + 黄色(#FFEB3B) + 赤(#FF3D00)のインパクト重視配色
- **コンセプト**: 「見たら食べたくなる」圧倒的ボリューム感演出

## 技術仕様
- **レスポンシブ対応**: スマホファースト + PC対応
- **アニメーション**: GSAP + ScrollTrigger
- **スライダー**: Swiper.js
- **フォント**: Noto Sans JP（極太フォント使用）

## 主要機能
1. **ヒーローセクション**: 爆盛りラーメンの迫力写真 + インパクトキャッチコピー
2. **カウンターアニメーション**: 総食数・完食チャレンジ成功数・1杯のボリューム表示
3. **メニュースライダー**: 爆盛りメニューの魅力的な表示
4. **常連の声**: お客様の声をスライダー形式で表示
5. **FAQ**: 二郎系初心者向けの注文方法説明
6. **固定CTA**: LINE予約・Googleマップボタンの常時表示

## ファイル構成
```
food-lp59/
├── index.html          # メインHTMLファイル
├── style.css           # スタイルシート（黄色・赤ベース、インパクト重視）
├── script.js           # JavaScript（GSAP・Swiper・FAQ・カウントアップ）
├── README.md           # このファイル
└── images/             # 画像フォルダ
    ├── hero-jiro.jpg           # ヒーロー画像（爆盛りラーメン）
    ├── menu-pork-mountain.jpg  # メニュー画像（豚山ラーメン）
    ├── menu-vege-tower.jpg     # メニュー画像（野菜タワー）
    ├── customer-voice.jpg      # お客様の声用画像
    └── faq-icon.svg           # FAQ用アイコン
```

## カスタマイズポイント
### 店舗情報の編集
1. **店舗名**: HTML内の「ここに店舗名」を実際の店舗名に変更
2. **キャッチコピー**: 「フルパワー爆盛り！喰らえ！」を店舗に合わせて調整
3. **住所・営業時間**: 店舗情報セクションの内容を更新
4. **リンク設定**: LINE予約・Googleマップのリンクを実際のURLに変更

### 画像の差し替え
- `images/`フォルダ内の画像を実際の店舗・メニュー写真に差し替え
- 画像サイズ推奨: ヒーロー画像(1200x800px)、メニュー画像(600x400px)

### 色の調整
CSS変数で簡単に色変更可能:
```css
:root {
    --primary-color: #FFEB3B;   /* メイン黄色 */
    --secondary-color: #FF3D00; /* アクセント赤 */
    --background-dark: #000000; /* 背景黒 */
}
```

## SEO対策
- メタタグ・OGP完備
- 適切なhタグ構造
- 画像にalt属性設定
- 高速表示対応（LazyLoad実装）

## 動作要件
- モダンブラウザ対応
- JavaScript有効環境
- インターネット接続（CDNライブラリ使用）

## 使用ライブラリ
- GSAP 3.12.2（アニメーション）
- Swiper 11（スライダー）
- Google Fonts（Noto Sans JP）

## 注意事項
- 画像は実際の店舗写真に差し替えてください
- リンクは仮設定のため、実際のLINE予約・地図URLに変更が必要
- カウンター数値は店舗実績に合わせて調整してください