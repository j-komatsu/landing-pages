// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // 火炎パーティクル背景初期化
    initFireParticles();
    
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

// 火炎パーティクルエフェクト
function initFireParticles() {
    const fireContainer = document.getElementById('fire-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'fire-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${Math.random() > 0.5 ? '#FF9800' : '#C62828'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.8 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        
        fireContainer.appendChild(particle);
        
        // パーティクルアニメーション
        gsap.to(particle, {
            duration: Math.random() * 3 + 2,
            y: `-=${Math.random() * 200 + 100}`,
            x: `+=${(Math.random() - 0.5) * 100}`,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5,
            repeat: -1,
            delay: Math.random() * 2,
            ease: 'power2.out'
        });
    }
}

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // 店名のアニメーション
    tl.from('.store-name', {
        duration: 1,
        scale: 0.5,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    // 挑戦テキストのアニメーション
    tl.from('.challenge-text', {
        duration: 0.8,
        x: -100,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.3');
    
    // 辛さレベルのアニメーション
    tl.from('.spicy-level', {
        duration: 0.8,
        x: 100,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.5');
    
    // サブタイトルのアニメーション
    tl.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.3');
    
    // ボタンのアニメーション
    tl.from('.hero-buttons .btn', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.2');
}

// スクロール時のアニメーション
function setupScrollAnimations() {
    // セクションタイトルの勢いあるスライドイン
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -100,
            opacity: 0,
            scale: 0.8,
            ease: 'power2.out'
        });
    });

    // 統計アイテムのズームエフェクト
    gsap.utils.toArray('.stat-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            scale: 0.5,
            opacity: 0,
            rotation: 180,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    // メニューカードの勢いあるスライドイン
    gsap.utils.toArray('.menu-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 100,
            opacity: 0,
            rotation: index % 2 === 0 ? -10 : 10,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });

    // 辛さの秘密セクションのアニメーション
    gsap.from('.secret-text', {
        scrollTrigger: {
            trigger: '.secret-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -80,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.secret-image', {
        scrollTrigger: {
            trigger: '.secret-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 80,
        opacity: 0,
        scale: 0.8,
        delay: 0.3,
        ease: 'power2.out'
    });

    // お客様の声カードのアニメーション
    gsap.utils.toArray('.voice-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 60,
            opacity: 0,
            scale: 0.9,
            delay: index * 0.15,
            ease: 'back.out(1.7)'
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
            duration: 0.6,
            x: -50,
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
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.info-map', {
        scrollTrigger: {
            trigger: '.info-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });
}

// カウントアップアニメーション
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
            duration: 2.5,
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
            delay: 4500,
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
                        duration: 0.8,
                        scale: 0.8,
                        opacity: 0,
                        ease: 'back.out(1.7)'
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
            delay: 5500,
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
                        duration: 0.7,
                        y: 30,
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
                
                // 開くアニメーション
                gsap.from(item.querySelector('.faq-answer p'), {
                    duration: 0.5,
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
                    duration: 0.5,
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

// ボタンホバーエフェクト強化（炎エフェクト）
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // 炎エフェクト
            if (button.classList.contains('flame-btn')) {
                gsap.to(button, {
                    duration: 0.5,
                    boxShadow: '0 0 30px rgba(198, 40, 40, 0.8), 0 0 60px rgba(255, 152, 0, 0.6)',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 0 30px rgba(198, 40, 40, 0.6)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時の爆発エフェクト
            gsap.to(button, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // 火花エフェクト
            createSparkEffect(button, event);
        });
    });
}

// 火花エフェクト
function createSparkEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const sparkCount = 8;
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${Math.random() > 0.5 ? '#FF9800' : '#C62828'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
        `;
        
        document.body.appendChild(spark);
        
        const angle = (i / sparkCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        
        gsap.to(spark, {
            duration: 0.8,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            ease: 'power2.out',
            onComplete: () => spark.remove()
        });
    }
}

// メニューカードのホバーエフェクト
function enhanceMenuEffects() {
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const spicyMeter = card.querySelector('.meter-fill');
            if (spicyMeter) {
                gsap.to(spicyMeter, {
                    duration: 0.5,
                    scaleX: 1.05,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const spicyMeter = card.querySelector('.meter-fill');
            if (spicyMeter) {
                gsap.to(spicyMeter, {
                    duration: 0.5,
                    scaleX: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// 辛さメーターのアニメーション
function animateSpicyMeters() {
    const meters = document.querySelectorAll('.meter-fill');
    
    meters.forEach(meter => {
        const targetWidth = meter.style.width;
        meter.style.width = '0%';
        
        gsap.to(meter, {
            scrollTrigger: {
                trigger: meter,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            width: targetWidth,
            ease: 'power2.out'
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
    animateSpicyMeters();
    handleResponsive();
    
    // ページ全体のローディングアニメーション完了
    gsap.to('body', {
        duration: 0.5,
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
    document.querySelectorAll('.menu-card, .voice-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// CSSアニメーション用のキーフレーム追加
const style = document.createElement('style');
style.textContent = `
    .fire-particle {
        filter: blur(1px);
        box-shadow: 0 0 6px currentColor;
    }
    
    @keyframes flicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
    
    .flame-btn:hover {
        animation: flicker 0.3s infinite;
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', optimizeAnimations);