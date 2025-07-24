// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダースクロール効果
    setupHeaderScroll();
    
    // ヒーローセクションのアニメーション
    initHeroAnimations();
    
    // カウントアップアニメーション
    setupCounterAnimation();
    
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
    
    // ビフォーアフターアニメーション
    setupBeforeAfterAnimations();
});

// ヘッダースクロール効果（透過 → 黒背景）
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

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // ヒーローバッジのアニメーション
    tl.from('.hero-badge', {
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
    
    // 統計データのアニメーション
    tl.from('.hero-stats .stat-item', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.5');
}

// カウントアップアニメーション
function setupCounterAnimation() {
    // ヒーロー統計のカウントアップ
    const heroCounters = document.querySelectorAll('.hero-stats .stat-number');
    heroCounters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        
        gsap.to(counter, {
            duration: 2,
            innerHTML: target,
            snap: isDecimal ? 0.1 : 1,
            ease: 'power2.out',
            delay: 2,
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
    
    // ビフォーアフター結果のカウントアップ
    const resultCounters = document.querySelectorAll('.result-number');
    resultCounters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 2,
            innerHTML: target,
            snap: 1,
            ease: 'power2.out',
            onUpdate: function() {
                const value = parseFloat(this.targets()[0].innerHTML);
                counter.innerHTML = Math.floor(value);
            }
        });
    });
    
    // 実績データのカウントアップ
    const achievementCounters = document.querySelectorAll('.achievement-number');
    achievementCounters.forEach(counter => {
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

    // 実績アイテムのアニメーション
    gsap.utils.toArray('.achievement-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 60,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // トレーナーカードのアニメーション
    gsap.utils.toArray('.trainer-card').forEach((card, index) => {
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
            delay: index * 0.3,
            ease: 'back.out(1.7)'
        });
    });

    // プランカードのアニメーション
    gsap.utils.toArray('.plan-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            y: 100,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power3.out'
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
            duration: 1,
            y: 50,
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

// ビフォーアフターアニメーション
function setupBeforeAfterAnimations() {
    gsap.utils.toArray('.ba-item').forEach((item, index) => {
        const beforeImg = item.querySelector('.ba-before');
        const afterImg = item.querySelector('.ba-after');
        
        // ビフォーアフター画像のスライドイン
        gsap.from(beforeImg, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            x: -100,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from(afterImg, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            x: 100,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        // 結果データのアニメーション
        gsap.from(item.querySelector('.ba-results'), {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 50,
            opacity: 0,
            delay: 0.8,
            ease: 'power2.out'
        });
    });
}

// Swiperスライダー初期化
function initializeSwiper() {
    // メディアロゴスライダー
    const mediaSwiper = new Swiper('.media-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 5,
            }
        }
    });

    // お客様の声スライダー
    const voicesSwiper = new Swiper('.voices-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.voices-swiper .swiper-pagination',
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
                        scale: 0.95,
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
            
            // パワフルなエフェクト
            if (button.classList.contains('pulse-btn')) {
                gsap.to(button, {
                    duration: 0.5,
                    boxShadow: '0 12px 40px rgba(229, 57, 53, 0.5)',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 12px 40px rgba(229, 57, 53, 0.3)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時のパワフルエフェクト
            gsap.to(button, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // フィットネスエフェクト
            createFitnessEffect(button, event);
        });
    });
}

// フィットネスエフェクト
function createFitnessEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const effectCount = 8;
    const colors = ['#E53935', '#0D47A1', '#FFA000'];
    const symbols = ['💪', '🔥', '⚡', '🏆'];
    
    for (let i = 0; i < effectCount; i++) {
        const effect = document.createElement('div');
        const isSymbol = Math.random() > 0.5;
        
        if (isSymbol) {
            effect.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            effect.style.cssText = `
                position: fixed;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 9999;
                left: ${event.clientX}px;
                top: ${event.clientY}px;
            `;
        } else {
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
        }
        
        document.body.appendChild(effect);
        
        const angle = (i / effectCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        
        gsap.to(effect, {
            duration: 1.5,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            rotation: Math.random() * 360,
            ease: 'power2.out',
            onComplete: () => effect.remove()
        });
    }
}

// プランカードのホバーエフェクト
function enhancePlanCardEffects() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const badge = card.querySelector('.plan-badge');
            if (badge) {
                gsap.to(badge, {
                    duration: 0.5,
                    scale: 1.1,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const badge = card.querySelector('.plan-badge');
            if (badge) {
                gsap.to(badge, {
                    duration: 0.5,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// トレーナーカードのホバーエフェクト
function enhanceTrainerCardEffects() {
    const trainerCards = document.querySelectorAll('.trainer-card');
    
    trainerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const specialties = card.querySelectorAll('.specialty-tag');
            specialties.forEach((tag, index) => {
                gsap.to(tag, {
                    duration: 0.5,
                    scale: 1.05,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                });
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const specialties = card.querySelectorAll('.specialty-tag');
            specialties.forEach(tag => {
                gsap.to(tag, {
                    duration: 0.5,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
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
    enhancePlanCardEffects();
    enhanceTrainerCardEffects();
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

// フィットネス系のためのCSSアニメーション追加
const style = document.createElement('style');
style.textContent = `
    .fitness-power {
        animation: fitnessShake 0.5s ease-in-out;
    }
    
    @keyframes fitnessShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.95);
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
    
    .power-hover:hover {
        animation: powerPulse 0.8s ease-in-out;
    }
    
    @keyframes powerPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    
    // フィットネスエフェクトを追加
    const powerElements = document.querySelectorAll('.achievement-item, .trainer-card, .plan-card');
    powerElements.forEach(el => {
        el.classList.add('power-hover');
    });
    
    // ビフォーアフターカードにフィットネスグローを追加
    const baItems = document.querySelectorAll('.ba-item');
    baItems.forEach(el => {
        el.classList.add('fitness-glow');
    });
});