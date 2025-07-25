# パーソナルジム・フィットネスLP（gym-lp01）

パーソナルジム・フィットネス向けの高級感と信頼感のあるランディングページです。モダン＋躍動感・ビフォーアフター活用で体験申込・予約導線を強化します。

## 概要
- **テーマ**: パーソナルジム、フィットネス、体験申込、実績訴求
- **ターゲット**: 20代〜50代のダイエット・ボディメイク希望者、運動不足解消したい方
- **目的**: 「躍動感」「高級感」「信頼感」を表現し、無料体験・LINE相談・予約促進を図る

## 使用技術
- HTML5（セマンティックマークアップ）
- CSS3（モバイルファースト、高級感ネイビー＋CTAレッド）
- JavaScript（GSAP、ScrollTrigger、Swiper.js、カウントアップアニメーション）
- フォント: Noto Sans JP（大きめフォント・余白たっぷり）
- レスポンシブデザイン対応

## 特徴
### デザイン
- 高級感ネイビー（#0D47A1）＋CTAレッド（#E53935）＋アクセントゴールド（#FFA000）
- 躍動感を重視した洗練されたUI
- スクロール時にナビゲーション透過 → 黒背景切り替わり演出
- フォント大きめ・余白たっぷりで高級感を演出
- CTAは常に目立つデザイン・ホバー時アニメーション

### 機能
- フルスクリーン背景ジム風景・トレーニング風景
- ビフォーアフター2カラム画像＋スライドイン＆フェードイン
- 受講者成果データのカウントアップ表示
- 実績数値カウントアップアニメーション
- メディア掲載ロゴスライダー
- トレーナー紹介（3名・カード型・資格表示）
- 料金プラン比較（3プラン・人気バッジ付き）
- 受講者の声（Swiperスライダー）
- FAQ アコーディオン開閉
- 固定CTA（無料体験・LINE相談）

## セクション構成
1. **Hero**: フルスクリーン背景＋強いキャッチコピー＋統計データ
2. **Before/After**: ビフォーアフター比較＋成果データカウントアップ
3. **Achievements**: 実績・信頼獲得（数値カウントアップ＋メディア掲載）
4. **Trainers**: トレーナー紹介（3名・資格・経歴・専門分野）
5. **Plans**: 料金プラン比較（3プラン・特徴比較表）
6. **Voices**: 受講者の声（スライダー形式）
7. **FAQ**: よくある質問（アコーディオン）
8. **Final CTA**: 最終体験予約誘導

## カスタマイズポイント
```html
<!-- ジム名の変更 -->
<span class="logo-text"><!-- ここにジム名 -->Elite Fitness</span>

<!-- キャッチコピーの変更 -->
<span class="main-catch"><!-- ここにキャッチコピー -->人生が変わる、60日間の挑戦</span>

<!-- 実績データの変更 -->
<div class="achievement-number" data-count="1200">0</div>
<!-- ここに実績データ -->

<!-- Before/After写真の変更 -->
<img src="images/before1.jpg" alt="<!-- ここにBefore写真 -->ビフォー写真1" loading="lazy">
<img src="images/after1.jpg" alt="<!-- ここにAfter写真 -->アフター写真1" loading="lazy">

<!-- 成果データの変更 -->
<p class="result-comment">
    <!-- ここに実績データ -->
    「60日間で-12kg達成！体脂肪率も-8%で理想の体型に...」
</p>
```

## CSS変数
```css
:root {
    --primary-navy: #0D47A1; /* 高級感ネイビー */
    --cta-red: #E53935; /* CTAレッド */
    --accent-gold: #FFA000; /* アクセントゴールド */
    --white: #FFFFFF;
    --bg-light: #FAFAFA;
}
```

## ビフォーアフター実績
1. **田中さん（30代男性）**: -12kg減量、-8%体脂肪率減
2. **佐藤さん（40代女性）**: -9kg減量、-6%体脂肪率減

## トレーナー紹介
1. **山田 健太郎**: NSCA-CPT / 管理栄養士（減量指導・筋力向上・食事指導）
2. **鈴木 美咲**: JATI-ATI / ヨガインストラクター（女性指導・ボディメイク・ヨガ）
3. **佐藤 雄大**: NSCA-CSCS / 理学療法士（機能改善・怪我予防・リハビリ）

## 料金プラン
1. **ベーシックプラン**: ¥29,800/月（月8回・食事指導・体組成測定・LINEサポート）
2. **プレミアムプラン**: ¥49,800/月（月12回・パーソナル食事指導・24時間サポート・サプリ提供）※人気No.1
3. **VIPプラン**: ¥79,800/月（月16回・オーダーメイド指導・専属トレーナー・アフターフォロー1年）

## アニメーション仕様
- **Hero**: 遅延フェードイン（バッジ→キャッチ→説明→ボタン→統計）
- **Before/After**: スライドイン＆フェードイン（左右から登場）
- **カウントアップ**: 数値カウントアップアニメーション（統計・実績・結果データ）
- **各セクション**: フェードイン＆ズームイン（ScrollTrigger使用）
- **スライダー**: Swiper.js（メディアロゴ・受講者の声）

## 最適化
- LazyLoad画像対応
- SEO対策（hタグ階層・OGP・metaタグ完備）
- 表示速度対策（GSAP・Swiperのみ使用）
- IntersectionObserver or GSAP ScrollTrigger使用
- モバイルファースト設計

## パーソナルジムの特徴
- **科学的根拠**: 科学的根拠に基づいたトレーニングと食事指導
- **個別対応**: お一人お一人のレベルに合わせたプログラム作成
- **確実な結果**: 多くの方が2ヶ月程度で体型の変化を実感
- **トータルサポート**: トレーニング・食事指導・メンタルサポート

## 更新方法
1. **ジム情報**: `index.html` のジム名・ロゴを編集
2. **実績データ**: 統計数値の`data-count`属性を変更
3. **ビフォーアフター**: 写真と成果データを更新
4. **トレーナー情報**: 写真・名前・資格・専門分野を変更
5. **料金プラン**: 価格・特徴・サービス内容を更新
6. **受講者の声**: 写真・コメント・評価を更新
7. **FAQ**: よくある質問と回答を更新
8. **リンク**: CTA ボタンのリンク先を実際のURLに更新
9. **配色**: CSS変数で全体の色合いを一括変更

## HTMLコメント例
- `<!-- ここにジム名 -->`
- `<!-- ここにキャッチコピー -->`
- `<!-- ここに実績データ -->`
- `<!-- ここにBefore/After写真 -->`
- `<!-- ここにジム風景 -->`

## SEO・表示速度対策
- OGP/meta記述完備
- LazyLoad対応
- 外部ライブラリ：GSAP、Swiperのみ使用（軽量化）
- 画像最適化対応
- モバイルファースト設計

## 固定CTA
- **無料体験**: 体験申込への直接誘導
- **LINE相談**: 気軽な相談窓口

## レスポンシブ対応
- モバイル：ビフォーアフター1列表示、プランカード1列
- タブレット：適度な余白とバランス調整
- デスクトップ：大きなビジュアルと豊富な情報表示

## 実績カウントアップ
- **累計会員数**: 1,200名
- **平均減量**: 8.5kg
- **満足度**: 95%
- **トレーナー歴**: 15年

ノンコーダーでも容易に更新できるよう、HTMLコメントを多用し、CSS変数を活用しています。躍動感と高級感を両立したパーソナルジムらしいデザインで、ビフォーアフター活用により説得力のある訴求を実現する構成となっています。