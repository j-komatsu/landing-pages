// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダースクロール効果
    setupHeaderScroll();
    
    // ヒーローセクションのアニメーション
    initHeroAnimations();
    
    // スクロール時のアニメーション設定
    setupScrollAnimations();
    
    // Swiperスライダー初期化
    initializeSwiper();
    
    // FAQ機能
    setupFAQ();
    
    // スムーススクロール
    setupSmoothScroll();
    
    // 固定CTAの表示制御
    setupFixedCTA();
    
    // ハンバーガーメニュー
    setupMobileMenu();
    
    // Intersection Observer
    setupIntersectionObserver();
});

// ヘッダースクロール効果（透明 → ホワイト背景）
function setupHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ヒーローセクションのアニメーション（遅延フェードイン）
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // キャンペーンバッジのアニメーション
    tl.from('.campaign-badge', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    // メインキャッチコピーのアニメーション
    tl.from('.main-catch', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.5');
    
    // サブキャッチコピーのアニメーション
    tl.from('.sub-catch', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=1');
    
    // 説明文のアニメーション
    tl.from('.hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.5');
    
    // ボタンのアニメーション
    tl.from('.hero-buttons .btn', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.3');
}

// スクロール時のアニメーション
function setupScrollAnimations() {
    // セクションタイトルのアニメーション
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // ツアーカードのズームイン＋フェードイン
    gsap.utils.toArray('.tour-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            scale: 0.9,
            y: 80,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // キャンペーン特典のスライドイン
    gsap.utils.toArray('.campaign-item').forEach((item, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            x: direction,
            opacity: 0,
            delay: index * 0.3,
            ease: 'power2.out'
        });
    });

    // お客様の声カードのアニメーション
    gsap.utils.toArray('.review-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 60,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });

    // FAQアイテムのアニメーション
    gsap.utils.toArray('.faq-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // 最終CTAセクションのアニメーション
    gsap.from('.cta-title', {
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    gsap.from('.cta-subtitle', {
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        y: 40,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });

    gsap.from('.cta-buttons .btn', {
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        y: 60,
        opacity: 0,
        stagger: 0.2,
        delay: 0.6,
        ease: 'back.out(1.7)'
    });
}

// Swiperスライダー初期化
function initializeSwiper() {
    // フォトギャラリースライダー（オートスライダー）
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.gallery-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.gallery-swiper .swiper-button-next',
            prevEl: '.gallery-swiper .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        },
        // スライド変更時のアニメーション
        on: {
            slideChange: function() {
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    gsap.from(activeSlide.querySelector('.gallery-caption'), {
                        duration: 1,
                        y: 30,
                        opacity: 0,
                        ease: 'power2.out'
                    });
                }
            }
        }
    });

    // お客様の声スライダー
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.reviews-swiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        },
        // スライド変更時のアニメーション
        on: {
            slideChange: function() {
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    gsap.from(activeSlide.querySelector('.review-card'), {
                        duration: 1,
                        scale: 0.95,
                        opacity: 0,
                        ease: 'power2.out'
                    });
                }
            }
        }
    });
}

// FAQ機能（アコーディオン）
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 全てのFAQを閉じる
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // クリックしたFAQが閉じていた場合は開く
            if (!isActive) {
                item.classList.add('active');
                
                // 開くアニメーション
                gsap.from(item.querySelector('.faq-answer p'), {
                    duration: 0.6,
                    y: -20,
                    opacity: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// スムーススクロール
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

// 固定CTAボタンの表示/非表示制御
function setupFixedCTA() {
    const fixedCTA = document.querySelector('.fixed-cta');
    const hero = document.querySelector('.hero');
    
    ScrollTrigger.create({
        trigger: hero,
        start: 'bottom top',
        end: 'bottom top',
        onToggle: self => {
            if (self.isActive) {
                gsap.to(fixedCTA, {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: 'back.out(1.7)'
                });
            } else {
                gsap.to(fixedCTA, {
                    duration: 0.6,
                    opacity: 0,
                    y: 100
                });
            }
        }
    });
    
    // 初期状態では非表示
    gsap.set(fixedCTA, {
        y: 100,
        opacity: 0
    });
}

// ハンバーガーメニュー
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Intersection Observer（遅延表示）
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // LazyLoad画像
                const img = entry.target.querySelector('img[data-src]');
                if (img) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            }
        });
    }, observerOptions);
    
    // 監視対象要素
    document.querySelectorAll('.tour-card, .campaign-item, .review-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// ボタンホバーエフェクト強化
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // 高級感のあるグロー効果
            if (button.classList.contains('pulse-btn')) {
                gsap.to(button, {
                    duration: 0.5,
                    boxShadow: '0 8px 30px rgba(25, 118, 210, 0.4)',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時のエフェクト
            gsap.to(button, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // 高級感エフェクト
            createLuxuryEffect(button, event);
        });
    });
}

// 高級感エフェクト
function createLuxuryEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const effectCount = 6;
    const colors = ['#1976D2', '#FFA000', '#FFD700'];
    
    for (let i = 0; i < effectCount; i++) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            box-shadow: 0 0 15px currentColor;
        `;
        
        document.body.appendChild(effect);
        
        const angle = (i / effectCount) * Math.PI * 2;
        const distance = 40 + Math.random() * 20;
        
        gsap.to(effect, {
            duration: 1.5,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            ease: 'power2.out',
            onComplete: () => effect.remove()
        });
    }
}

// ツアーカードのホバーエフェクト
function enhanceTourCardEffects() {
    const tourCards = document.querySelectorAll('.tour-card');
    
    tourCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const badge = card.querySelector('.tour-badge');
            if (badge) {
                gsap.to(badge, {
                    duration: 0.5,
                    scale: 1.1,
                    rotation: 5,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const badge = card.querySelector('.tour-badge');
            if (badge) {
                gsap.to(badge, {
                    duration: 0.5,
                    scale: 1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// キャンペーンアイテムのホバーエフェクト
function enhanceCampaignEffects() {
    const campaignItems = document.querySelectorAll('.campaign-item');
    
    campaignItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.campaign-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.8,
                    rotation: 360,
                    scale: 1.2,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.campaign-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.8,
                    rotation: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// レスポンシブ対応の調整
function handleResponsive() {
    const handleResize = () => {
        ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
}

// 初期化完了後の追加設定
window.addEventListener('load', () => {
    enhanceButtonEffects();
    enhanceTourCardEffects();
    enhanceCampaignEffects();
    handleResponsive();
    
    // ページ全体のローディングアニメーション完了
    gsap.to('body', {
        duration: 0.8,
        opacity: 1,
        ease: 'power2.out'
    });
    
    // ヘッダーの初期アニメーション
    gsap.from('.header', {
        duration: 1,
        y: -100,
        ease: 'power2.out'
    });
});

// パフォーマンス最適化
function optimizePerformance() {
    // 画像の遅延読み込み
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// 高級感のためのCSSアニメーション追加
const style = document.createElement('style');
style.textContent = `
    .luxury-shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .luxury-shimmer::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 160, 0, 0.3), transparent);
        animation: luxuryShimmer 3s infinite;
    }
    
    @keyframes luxuryShimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--white);
        padding: 20px;
        box-shadow: var(--shadow-card);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .premium-hover:hover {
        animation: premiumFloat 0.6s ease-in-out;
    }
    
    @keyframes premiumFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    
    // 高級感エフェクトを追加
    const luxuryElements = document.querySelectorAll('.tour-card, .campaign-item');
    luxuryElements.forEach(el => {
        el.classList.add('luxury-shimmer', 'premium-hover');
    });
});