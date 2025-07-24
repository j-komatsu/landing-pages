// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // 桜の花びら初期化
    initSakuraPetals();
    
    // ヒーローセクションのアニメーション
    initHeroAnimations();
    
    // スクロール時のアニメーション設定
    setupScrollAnimations();
    
    // カウントアップアニメーション
    setupCounterAnimation();
    
    // Swiperスライダー初期化
    initializeSwiper();
    
    // FAQ機能
    setupFAQ();
    
    // スムーススクロール
    setupSmoothScroll();
    
    // 固定CTAの表示制御
    setupFixedCTA();
});

// 桜の花びらエフェクトを削除
function initSakuraPetals() {
    // 花びらアニメーションを削除
}

// ヒーローセクションのアニメーション（和風・ゆったり）
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // 伝統的なフレームのアニメーション
    tl.from('.traditional-frame', {
        duration: 1.5,
        scale: 0.9,
        opacity: 0,
        y: 50,
        ease: 'power2.out'
    });
    
    // 季節バッジのアニメーション
    tl.from('.seasonal-badge', {
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=1');
    
    // 店名のアニメーション（和風ゆったり）
    tl.from('.restaurant-name', {
        duration: 1.2,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.8');
    
    // メインメッセージのアニメーション
    tl.from('.main-message', {
        duration: 1.2,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.6');
    
    // サブタイトルのアニメーション
    tl.from('.hero-subtitle', {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4');
    
    // ボタンのアニメーション
    tl.from('.hero-buttons .btn', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.2');
}

// スクロール時のアニメーション（和風・ゆったり）
function setupScrollAnimations() {
    // セクションタイトルの優雅なフェードイン
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // 統計アイテムの和風スライドイン
    gsap.utils.toArray('.stat-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 50,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });

    // メニューカードのエレガントなズームイン
    gsap.utils.toArray('.menu-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            scale: 0.9,
            y: 60,
            opacity: 0,
            delay: index * 0.3,
            ease: 'power2.out'
        });
    });

    // 特徴アイテムの優雅なフェードイン
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 40,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });

    // 内装セクションのパララックス風アニメーション
    gsap.from('.interior-text', {
        scrollTrigger: {
            trigger: '.interior-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        x: -60,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.interior-image', {
        scrollTrigger: {
            trigger: '.interior-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        x: 60,
        opacity: 0,
        scale: 0.95,
        delay: 0.3,
        ease: 'power2.out'
    });

    // ポイントアイテムの順次アニメーション
    gsap.utils.toArray('.point-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 20,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // お客様の声カードのアニメーション
    gsap.utils.toArray('.voice-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 40,
            opacity: 0,
            scale: 0.95,
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
            y: 20,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // 店舗情報セクションのアニメーション
    gsap.from('.info-text', {
        scrollTrigger: {
            trigger: '.info-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        y: 40,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.info-map', {
        scrollTrigger: {
            trigger: '.info-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        y: 40,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });
}

// カウントアップアニメーション（和風・ゆったり）
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 2.5, // ゆったりとしたカウントアップ
            innerHTML: target,
            snap: isDecimal ? 0.1 : 1,
            ease: 'power2.out',
            onUpdate: function() {
                const value = parseFloat(this.targets()[0].innerHTML);
                if (isDecimal) {
                    counter.innerHTML = value.toFixed(1);
                } else {
                    counter.innerHTML = Math.floor(value).toLocaleString();
                }
            }
        });
    });
}

// Swiperスライダー初期化
function initializeSwiper() {
    // メニュースライダー
    const menuSwiper = new Swiper('.menu-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 6000, // ゆったりとした間隔
            disableOnInteraction: false,
        },
        pagination: {
            el: '.menu-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.menu-swiper .swiper-button-next',
            prevEl: '.menu-swiper .swiper-button-prev',
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
                    gsap.from(activeSlide.querySelector('.menu-card'), {
                        duration: 1,
                        scale: 0.95,
                        opacity: 0,
                        ease: 'power2.out'
                    });
                }
            }
        }
    });

    // お客様の声スライダー
    const voiceSwiper = new Swiper('.voice-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.voice-swiper .swiper-pagination',
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
                    gsap.from(activeSlide.querySelector('.voice-card'), {
                        duration: 1,
                        y: 20,
                        opacity: 0,
                        ease: 'power2.out'
                    });
                }
            }
        }
    });
}

// FAQ機能
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
                
                // 開くアニメーション（和風・ゆったり）
                gsap.from(item.querySelector('.faq-answer p'), {
                    duration: 0.8,
                    y: -15,
                    opacity: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// スムーススクロール（ゆったり）
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 2, // ゆったりとしたスクロール
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

// ボタンホバーエフェクト強化（和風エフェクト）
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.5,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // 和風エフェクト
            if (button.classList.contains('washoku-btn')) {
                gsap.to(button, {
                    duration: 0.8,
                    boxShadow: '0 12px 35px rgba(38, 77, 50, 0.4)',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.5,
                scale: 1,
                boxShadow: '0 8px 32px rgba(38, 77, 50, 0.15)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時の和風エフェクト
            gsap.to(button, {
                duration: 0.1,
                scale: 0.98,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // 和風のきらめきエフェクト
            createWashokuSparkles(button, event);
        });
    });
}

// 和風のきらめきエフェクト
function createWashokuSparkles(button, event) {
    const rect = button.getBoundingClientRect();
    const sparkleCount = 6;
    const sparkleSymbols = ['✨', '🌸', '🍃', '⭐'];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
        sparkle.style.cssText = `
            position: fixed;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            color: #C49E42;
        `;
        
        document.body.appendChild(sparkle);
        
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 40 + Math.random() * 20;
        
        gsap.to(sparkle, {
            duration: 1.5,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            rotation: 180 + Math.random() * 180,
            ease: 'power2.out',
            onComplete: () => sparkle.remove()
        });
    }
}

// メニューカードのホバーエフェクト
function enhanceMenuEffects() {
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.traditional-overlay');
            if (overlay) {
                gsap.to(overlay, {
                    duration: 0.8,
                    opacity: 1,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.traditional-overlay');
            if (overlay) {
                gsap.to(overlay, {
                    duration: 0.8,
                    opacity: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// 季節バッジのアニメーション
function animateSeasonalBadges() {
    const seasonTags = document.querySelectorAll('.season-tag');
    
    seasonTags.forEach(tag => {
        gsap.to(tag, {
            duration: 3,
            scale: 1.05,
            yoyo: true,
            repeat: -1,
            ease: 'power2.inOut'
        });
    });
}

// パララックス効果
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-bg img, .interior-image img');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -30,
            ease: 'none'
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
    enhanceMenuEffects();
    animateSeasonalBadges();
    setupParallaxEffects();
    handleResponsive();
    
    // ページ全体のローディングアニメーション完了
    gsap.to('body', {
        duration: 0.8,
        opacity: 1,
        ease: 'power2.out'
    });
});

// パフォーマンス最適化: Intersection Observer使用
function optimizeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    document.querySelectorAll('.menu-card, .voice-card, .stat-item, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

// 和風エフェクトのためのCSSアニメーション追加
const style = document.createElement('style');
style.textContent = `
    .traditional-glow {
        animation: traditionalGlow 4s ease-in-out infinite alternate;
    }
    
    @keyframes traditionalGlow {
        0% { box-shadow: 0 8px 32px rgba(38, 77, 50, 0.15); }
        100% { box-shadow: 0 8px 32px rgba(196, 158, 66, 0.3); }
    }
    
    .gentle-float:hover {
        animation: gentleFloat 2s ease-in-out infinite;
    }
    
    @keyframes gentleFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
    }
    
    .washoku-shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .washoku-shimmer::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(196, 158, 66, 0.2), transparent);
        animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    optimizeAnimations();
    
    // 和風エフェクトを追加
    const traditionalElements = document.querySelectorAll('.traditional-frame, .washoku-frame');
    traditionalElements.forEach(el => {
        el.classList.add('traditional-glow', 'gentle-float');
    });
    
    const seasonalElements = document.querySelectorAll('.seasonal-badge, .season-tag');
    seasonalElements.forEach(el => {
        el.classList.add('washoku-shimmer');
    });
});