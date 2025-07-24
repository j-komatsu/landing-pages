
// レビュータブ切替機能
function initializeReviewTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const reviewItems = document.querySelectorAll('.review-item');

    if (tabButtons.length === 0 || reviewItems.length === 0) {
        console.warn('Tab buttons or review items not found');
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            const targetElement = document.getElementById(targetTab);

            if (!targetElement) {
                console.error(`Target element with id '${targetTab}' not found`);
                return;
            }

            // すべてのタブボタンからactiveクラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // クリックされたタブボタンにactiveクラスを追加
            this.classList.add('active');

            // すべてのレビュー項目を非表示
            reviewItems.forEach(item => item.classList.remove('active'));
            // 対象のレビュー項目を表示
            targetElement.classList.add('active');
        });
    });
}

// FAQ アコーディオン機能
function initializeFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length === 0) {
        console.warn('FAQ questions not found');
        return;
    }

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            if (!answer) {
                console.error('FAQ answer element not found');
                return;
            }

            // すべてのFAQを閉じる
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                const qAnswer = q.nextElementSibling;
                if (qAnswer) {
                    qAnswer.classList.remove('active');
                }
            });

            // クリックされた項目が閉じていた場合は開く
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

// CTA ボタンのクリック追跡
function initializeCtaButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button, .final-cta-button');

    if (ctaButtons.length === 0) {
        console.warn('CTA buttons not found');
        return;
    }

    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // ここにアフィリエイトリンクまたは商品ページのURLを設定
            const affiliateUrl = 'https://example.com/affiliate-link'; // 【ここにアフィリエイトリンクを入力】

            // Google Analytics等のトラッキングコードがある場合はここに追加
            try {
                // gtag('event', 'click', {
                //     event_category: 'CTA',
                //     event_action: 'click',
                //     event_label: 'affiliate_link'
                // });
                
                // アフィリエイトリンクに遷移
                // window.open(affiliateUrl, '_blank');
                
                // デバッグ用メッセージ
                console.log('CTA button clicked - implement affiliate link navigation');
            } catch (error) {
                console.error('Error handling CTA button click:', error);
            }
        });
    });
}

// 初期化処理
document.addEventListener('DOMContentLoaded', function () {
    initializeReviewTabs();
    initializeFaqAccordion();
    initializeCtaButtons();
});
