// DOMの読み込み完了を待つ
document.addEventListener('DOMContentLoaded', function() {
    // FAQのアコーディオン機能
    initFAQ();
    
    // スムーススクロール
    initSmoothScroll();
    
    // フェードインアニメーション
    initFadeInAnimation();
    
    // 固定CTAボタンの表示制御
    initFixedCTA();
});

// FAQのアコーディオン機能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 他のアイテムを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // クリックされたアイテムの開閉を切り替え
            item.classList.toggle('active');
        });
    });
}

// スムーススクロール機能
function initSmoothScroll() {
    // アンカーリンクを取得
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// フェードインアニメーション
function initFadeInAnimation() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);
    
    // フェードイン対象の要素を監視
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// 固定CTAボタンの表示制御
function initFixedCTA() {
    const fixedCTA = document.getElementById('fixedCta');
    const heroSection = document.querySelector('.hero');
    const ctaSection = document.querySelector('.cta-section');
    
    if (!fixedCTA || !heroSection || !ctaSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === heroSection) {
                // ヒーローセクションが画面から出たら固定CTAを表示
                if (!entry.isIntersecting) {
                    fixedCTA.classList.add('show');
                } else {
                    fixedCTA.classList.remove('show');
                }
            } else if (entry.target === ctaSection) {
                // CTAセクションが表示されたら固定CTAを非表示
                if (entry.isIntersecting) {
                    fixedCTA.classList.remove('show');
                } else if (!heroSection.getBoundingClientRect().bottom > 0) {
                    fixedCTA.classList.add('show');
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(heroSection);
    observer.observe(ctaSection);
}

// ページトップへのスクロール機能（必要に応じて使用）
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 電話番号のフォーマット（必要に応じて使用）
function formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/(\d{2,3})(\d{4})(\d{4})/, '$1-$2-$3');
}

// ローディングアニメーション（必要に応じて使用）
function showLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingElement);
}

function hideLoading() {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
}

// フォームバリデーション（お問い合わせフォームがある場合）
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    // メールアドレスの形式チェック
    const emailFields = formElement.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value && !emailPattern.test(field.value)) {
            field.classList.add('error');
            isValid = false;
        }
    });
    
    return isValid;
}

// モーダルウィンドウの制御（必要に応じて使用）
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// スクロール位置の保存・復元（必要に応じて使用）
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
}

function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
}

// デバイス判定（必要に応じて使用）
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// パフォーマンス最適化のためのthrottle関数
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

// パフォーマンス最適化のためのdebounce関数
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

// リサイズイベントの処理（必要に応じて使用）
window.addEventListener('resize', throttle(() => {
    // リサイズ時の処理をここに記述
    console.log('Window resized');
}, 250));

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// 未処理のPromise拒否をキャッチ
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});