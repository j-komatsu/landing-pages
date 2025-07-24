// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
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

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // クイックバッジのアニメーション
    tl.from('.quick-badge', {
        duration: 0.8,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    // 店名のアニメーション
    tl.from('.store-name', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4');
    
    // メインコピーのアニメーション
    tl.from('.main-copy', {
        duration: 0.8,
        x: -50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4');
    
    // サブコピーのアニメーション
    tl.from('.sub-copy', {
        duration: 0.8,
        x: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.6');
    
    // 価格ハイライトのアニメーション
    tl.from('.price-item', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.2');
    
    // サブタイトルのアニメーション
    tl.from('.hero-subtitle', {
        duration: 0.6,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.2');
    
    // ボタンのアニメーション
    tl.from('.hero-buttons .btn', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.2');
}

// スクロール時のアニメーション（スピーディー）
function setupScrollAnimations() {
    // セクションタイトルのスピーディーなスライドイン
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // 統計アイテムのクイックズームイン
    gsap.utils.toArray('.stat-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            scale: 0.8,
            opacity: 0,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    // メニューカードのスピーディースライドイン
    gsap.utils.toArray('.menu-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.15,
            ease: 'power2.out'
        });
    });

    // 特徴アイテムのスピーディーフェードイン
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.7,
            y: 40,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // 内装セクションのアニメーション
    gsap.from('.interior-text', {
        scrollTrigger: {
            trigger: '.interior-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: -50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.interior-image', {
        scrollTrigger: {
            trigger: '.interior-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: 50,
        opacity: 0,
        scale: 0.9,
        delay: 0.2,
        ease: 'power2.out'
    });

    // ポイントアイテムのアニメーション
    gsap.utils.toArray('.point-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.5,
            y: 20,
            opacity: 0,
            delay: index * 0.05,
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
            duration: 0.7,
            y: 30,
            opacity: 0,
            scale: 0.95,
            delay: index * 0.1,
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
            duration: 0.5,
            y: 20,
            opacity: 0,
            delay: index * 0.05,
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
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.info-map', {
        scrollTrigger: {
            trigger: '.info-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 0.2,
        ease: 'power2.out'
    });
}

// カウントアップアニメーション（スピーディー）
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
            duration: 1.5, // スピーディーに短縮
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
            delay: 4000, // スピーディーに短縮
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
                        duration: 0.6,
                        scale: 0.9,
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
            delay: 5000,
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
                        duration: 0.6,
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
                
                // 開くアニメーション（スピーディー）
                gsap.from(item.querySelector('.faq-answer p'), {
                    duration: 0.4,
                    y: -10,
                    opacity: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// スムーススクロール（スピーディー）
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1, // スピーディーに短縮
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
                    duration: 0.4, // スピーディーに短縮
                    opacity: 1,
                    y: 0,
                    ease: 'back.out(1.7)'
                });
            } else {
                gsap.to(fixedCTA, {
                    duration: 0.3,
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

// ボタンホバーエフェクト強化（スピードエフェクト）
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.2, // 高速化
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // スピードエフェクト
            if (button.classList.contains('speed-btn')) {
                gsap.to(button, {
                    duration: 0.3,
                    boxShadow: '0 8px 25px rgba(255, 61, 0, 0.4)',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.2,
                scale: 1,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時のスピーディーエフェクト
            gsap.to(button, {
                duration: 0.1,
                scale: 0.98,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // スピードラインエフェクト
            createSpeedLines(button, event);
        });
    });
}

// スピードラインエフェクト
function createSpeedLines(button, event) {
    const rect = button.getBoundingClientRect();
    const lineCount = 5;
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
            position: fixed;
            width: 3px;
            height: 20px;
            background: ${Math.random() > 0.5 ? '#FF3D00' : '#0288D1'};
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            border-radius: 2px;
        `;
        
        document.body.appendChild(line);
        
        const angle = (i / lineCount) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        
        gsap.to(line, {
            duration: 0.6,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            rotation: angle * 180 / Math.PI,
            ease: 'power2.out',
            onComplete: () => line.remove()
        });
    }
}

// メニューカードのホバーエフェクト
function enhanceMenuEffects() {
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.2,
                y: -5,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.2,
                y: 0,
                ease: 'power2.out'
            });
        });
    });
}

// 価格ハイライトのアニメーション
function animatePriceHighlight() {
    const priceItems = document.querySelectorAll('.price-item');
    
    priceItems.forEach((item, index) => {
        // 価格の拍動アニメーション
        gsap.to(item.querySelector('.price-value'), {
            duration: 1.5,
            scale: 1.05,
            yoyo: true,
            repeat: -1,
            delay: index * 0.3,
            ease: 'power2.inOut'
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
    animatePriceHighlight();
    handleResponsive();
    
    // ページ全体のローディングアニメーション完了
    gsap.to('body', {
        duration: 0.4, // スピーディーに短縮
        opacity: 1,
        ease: 'power2.out'
    });
});

// パフォーマンス最適化: Intersection Observer使用
function optimizeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px' // より早めに発火
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

// スピード感演出のためのCSSアニメーション追加
const style = document.createElement('style');
style.textContent = `
    .speed-effect {
        animation: speedBoost 0.3s ease;
    }
    
    @keyframes speedBoost {
        0% { transform: translateX(0); }
        50% { transform: translateX(5px); }
        100% { transform: translateX(0); }
    }
    
    .quick-highlight:hover {
        animation: quickPulse 0.5s ease;
    }
    
    @keyframes quickPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    .flash-red {
        animation: flashRed 0.5s ease;
    }
    
    @keyframes flashRed {
        0% { background-color: transparent; }
        50% { background-color: rgba(255, 61, 0, 0.1); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    optimizeAnimations();
    
    // スピード感を演出するための追加エフェクト
    const speedElements = document.querySelectorAll('.quick-badge, .price-value, .stat-number');
    speedElements.forEach(el => {
        el.classList.add('quick-highlight');
    });
});