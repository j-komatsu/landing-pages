/**
 * Restaurant LP JavaScript
 * スマホファースト・軽量・高速表示を重視した実装
 */

// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 各機能の初期化
    initializeMenuTabs();
    initializeVoiceSlider();
    initializeFAQ();
    initializeScrollAnimation();
    initializeSmoothScroll();
    
    console.log('🍽️ Restaurant LP loaded successfully');
});

/**
 * メニュータブ切り替え機能
 * カテゴリ別に料理メニューを切り替える
 */
function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length === 0) return;
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const categoryId = this.dataset.category;
            
            // 全てのタブから active クラスを削除
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // 全てのカテゴリを非表示
            menuCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // クリックされたタブをアクティブに
            this.classList.add('active');
            
            // 対応するカテゴリを表示
            const targetCategory = document.getElementById(categoryId);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });
}

/**
 * お客様の声スライダー機能
 * 数秒間隔で自動切り替え
 */
function initializeVoiceSlider() {
    const voiceSlides = document.querySelectorAll('.voice-slide');
    
    if (voiceSlides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒間隔
    
    function showSlide(index) {
        // 全てのスライドを非表示
        voiceSlides.forEach(slide => slide.classList.remove('active'));
        
        // 指定されたスライドを表示
        voiceSlides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % voiceSlides.length;
        showSlide(currentSlide);
    }
    
    // 自動スライド開始
    setInterval(nextSlide, slideInterval);
    
    // 初期表示
    showSlide(0);
}

/**
 * FAQアコーディオン機能
 * タップで開閉できるQ&A
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // 他のFAQを閉じる
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // クリックされたFAQの開閉を切り替え
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * スクロール連動フェードイン機能
 * IntersectionObserverを使用した軽量実装
 */
function initializeScrollAnimation() {
    // IntersectionObserverがサポートされているかチェック
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported');
        return;
    }
    
    const animationElements = document.querySelectorAll(
        '.menu-item, .feature, .voice-card, .method-card, .info-item'
    );
    
    if (animationElements.length === 0) return;
    
    // 各要素にfade-inクラスを追加
    animationElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // IntersectionObserver の設定
    const observerOptions = {
        threshold: 0.1, // 10%表示されたらトリガー
        rootMargin: '0px 0px -50px 0px' // 50px手前でトリガー
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を停止（パフォーマンス向上）
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 各要素を監視対象に追加
    animationElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * スムーススクロール機能
 * ページ内リンクをなめらかに遷移
 */
function initializeSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    if (smoothScrollLinks.length === 0) return;
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // ヘッダーの高さを考慮したオフセット
                const headerHeight = document.querySelector('.header').offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 電話番号クリック追跡
 * 電話予約のクリック数を追跡（アナリティクス用）
 */
function trackPhoneCall() {
    // Google Analytics などのイベント追跡を追加
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_call', {
            event_category: 'reservation',
            event_label: 'phone_button_click'
        });
    }
    
    console.log('📞 Phone call tracked');
}

/**
 * LINE予約クリック追跡
 * LINE予約のクリック数を追跡（アナリティクス用）
 */
function trackLineReservation() {
    // Google Analytics などのイベント追跡を追加
    if (typeof gtag !== 'undefined') {
        gtag('event', 'line_reservation', {
            event_category: 'reservation',
            event_label: 'line_button_click'
        });
    }
    
    console.log('💬 LINE reservation tracked');
}

/**
 * 画像遅延読み込み
 * パフォーマンス向上のための画像最適化
 */
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (lazyImages.length === 0) return;
    
    // Intersection Observer での遅延読み込み
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // 画像にロード完了イベントを追加
                    img.addEventListener('load', function() {
                        img.classList.add('loaded');
                    });
                    
                    // 実際の画像URLを設定
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * エラーハンドリング
 * JavaScript エラーをキャッチして適切に処理
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // エラーレポートの送信（本番環境では適切なエラー報告サービスに送信）
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false,
            page_location: window.location.href
        });
    }
});

/**
 * パフォーマンス監視
 * ページの読み込み速度を測定
 */
window.addEventListener('load', function() {
    // ページロード時間の測定
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        console.log('📊 Page load time:', loadTime + 'ms');
        
        // パフォーマンスデータの送信
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: Math.round(loadTime)
            });
        }
    }
});

/**
 * 固定予約ボタンのクリックイベント
 * 下部固定ボタンの動作を設定
 */
document.addEventListener('DOMContentLoaded', function() {
    const phoneBtn = document.querySelector('.fixed-btn.phone-btn');
    const lineBtn = document.querySelector('.fixed-btn.line-btn');
    
    if (phoneBtn) {
        phoneBtn.addEventListener('click', trackPhoneCall);
    }
    
    if (lineBtn) {
        lineBtn.addEventListener('click', trackLineReservation);
    }
});

/**
 * レスポンシブ対応
 * 画面サイズに応じた動的調整
 */
function handleResize() {
    const windowWidth = window.innerWidth;
    
    // スマートフォンサイズでの調整
    if (windowWidth <= 768) {
        // モバイル専用の処理
        console.log('📱 Mobile view activated');
    } else {
        // デスクトップ専用の処理
        console.log('💻 Desktop view activated');
    }
}

// リサイズイベントの監視（パフォーマンス考慮でデバウンス処理）
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
});

// 初期実行
handleResize();

/**
 * スクロール位置の監視
 * ヘッダーの表示/非表示制御
 */
let lastScrollY = window.scrollY;
let ticking = false;

function updateScrollPosition() {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    if (header) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // 下スクロール時：ヘッダーを隠す
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上スクロール時：ヘッダーを表示
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
}

// スクロールイベントの監視
window.addEventListener('scroll', requestScrollUpdate);

/**
 * 外部リンクの処理
 * 外部サイトへのリンクに適切な属性を追加
 */
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        // 外部リンクに必要な属性を追加
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

/**
 * フォーム送信の処理
 * お問い合わせフォームがある場合の処理
 */
function handleFormSubmission(form) {
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(form);
        
        // 簡易バリデーション
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // 送信処理（実際の処理を実装）
            console.log('✅ Form submitted successfully');
            
            // 送信完了メッセージの表示
            showSuccessMessage('お問い合わせありがとうございました。');
        } else {
            showErrorMessage('必須項目を入力してください。');
        }
    });
}

/**
 * 成功メッセージの表示
 */
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

/**
 * エラーメッセージの表示
 */
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}