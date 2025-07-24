// 美容サロンLP JavaScript
// 各機能を関数分離し、初心者でも理解しやすいコードに

document.addEventListener('DOMContentLoaded', function() {
    // 初期化処理
    initializeApp();
});

/**
 * アプリケーションの初期化
 */
function initializeApp() {
    setupSmoothScroll();
    setupScrollAnimations();
    setupServiceTabs();
    setupVoiceSlider();
    setupFAQAccordion();
    setupFixedReservationButtons();
}

/**
 * スムーススクロール機能
 */
function setupSmoothScroll() {
    // ナビゲーションリンクとCTAボタンにスムーススクロールを適用
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offsetTop = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * スクロール連動フェードインアニメーション
 */
function setupScrollAnimations() {
    // IntersectionObserverを使用してスクロール時のアニメーションを制御
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    const animationTargets = document.querySelectorAll('.service-item, .price-card, .voice-card, .method-card, .faq-item');
    
    animationTargets.forEach(target => {
        target.classList.add('fade-in');
        observer.observe(target);
    });
}

/**
 * サービスタブ切り替え機能
 */
function setupServiceTabs() {
    const tabButtons = document.querySelectorAll('.service-tab');
    const tabContents = document.querySelectorAll('.service-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // すべてのタブボタンからactiveクラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // クリックされたタブボタンにactiveクラスを追加
            this.classList.add('active');
            
            // すべてのタブコンテンツを非表示
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // 対象のタブコンテンツを表示
            const targetContent = document.getElementById(targetCategory);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * お客様の声スライダー機能
 */
function setupVoiceSlider() {
    const slides = document.querySelectorAll('.voice-slide');
    const prevButton = document.querySelector('.voice-prev');
    const nextButton = document.querySelector('.voice-next');
    let currentSlide = 0;
    
    // スライド表示を更新する関数
    function updateSlideDisplay() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
    }
    
    // 前のスライドへ
    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlideDisplay();
    }
    
    // 次のスライドへ
    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideDisplay();
    }
    
    // ボタンイベントリスナーを追加
    if (prevButton) {
        prevButton.addEventListener('click', goToPrevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', goToNextSlide);
    }
    
    // 自動再生機能（5秒間隔）
    setInterval(goToNextSlide, 5000);
}

/**
 * FAQ アコーディオン機能
 */
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // すべてのFAQアイテムを閉じる
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // クリックされたアイテムが非アクティブだった場合、開く
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * 固定予約ボタンの表示制御
 */
function setupFixedReservationButtons() {
    const fixedReservation = document.querySelector('.fixed-reservation');
    const heroSection = document.querySelector('.hero');
    
    if (!fixedReservation || !heroSection) return;
    
    // スクロール位置に応じて固定ボタンの表示/非表示を制御
    function handleScroll() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > heroBottom) {
            fixedReservation.style.opacity = '1';
            fixedReservation.style.transform = 'translateY(0)';
        } else {
            fixedReservation.style.opacity = '0';
            fixedReservation.style.transform = 'translateY(20px)';
        }
    }
    
    // 初期スタイル設定
    fixedReservation.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    fixedReservation.style.opacity = '0';
    fixedReservation.style.transform = 'translateY(20px)';
    
    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', handleScroll);
    
    // 初回実行
    handleScroll();
}

/**
 * 予約ボタンクリック時の処理
 */
function handleReservationClick(type) {
    // 予約タイプに応じた処理
    if (type === 'phone') {
        // 電話予約の場合、電話番号のリンクを作成
        console.log('電話予約がクリックされました');
    } else if (type === 'line') {
        // LINE予約の場合、LINEのURLを開く
        console.log('LINE予約がクリックされました');
    }
}

/**
 * フォーム送信処理（将来的な拡張用）
 */
function handleFormSubmit(formData) {
    // フォームデータの処理
    console.log('フォームが送信されました:', formData);
}

/**
 * エラーハンドリング
 */
function handleError(error) {
    console.error('エラーが発生しました:', error);
}

/**
 * ユーティリティ関数：要素の存在確認
 */
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

/**
 * ユーティリティ関数：デバウンス
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * ユーティリティ関数：スロットル
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// パフォーマンス最適化のためのスクロールイベントをスロットル
window.addEventListener('scroll', throttle(function() {
    // スクロール関連の処理があればここに記述
}, 100));

// リサイズイベントのデバウンス処理
window.addEventListener('resize', debounce(function() {
    // リサイズ時の処理があればここに記述
}, 250));

// 開発環境でのデバッグ用
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('美容サロンLP JavaScript 初期化完了');
}