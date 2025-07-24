// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // ヒーローセクションのアニメーション
    initHeroAnimations();
    
    // スクロール時のアニメーション設定
    setupScrollAnimations();
    
    // カウンターアニメーション
    setupCounterAnimation();
    
    // Swiperスライダー初期化
    initializeSwiper();
    
    // FAQ機能
    setupFAQ();
    
    // スムーススクロール
    setupSmoothScroll();
    
    // 背景パララックス効果
    setupParallax();
});

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // ヒーローコンテンツのふわっと表示
    tl.from('.hero-content > *', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    // 装飾要素のアニメーション
    gsap.from('.hibiscus, .pineapple, .palm', {
        duration: 1.5,
        scale: 0,
        rotation: 180,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        delay: 0.8
    });
    
    // 波のアニメーション開始
    gsap.to('.wave-animation', {
        duration: 0,
        opacity: 1
    });
}

// スクロール時のアニメーション
function setupScrollAnimations() {
    // セクションタイトルの波型スライドイン
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
            ease: 'power2.out'
        });
    });

    // カウンターアイテムのふわっとフェードイン
    gsap.utils.toArray('.counter-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 60,
            opacity: 0,
            scale: 0.9,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });

    // メニューカードのスライドイン
    gsap.utils.toArray('.menu-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            x: index % 2 === 0 ? -80 : 80,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // 店内風景セクションのアニメーション
    gsap.from('.interior-text', {
        scrollTrigger: {
            trigger: '.interior-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -80,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.interior-image', {
        scrollTrigger: {
            trigger: '.interior-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 80,
        opacity: 0,
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
            y: 50,
            opacity: 0,
            scale: 0.95,
            delay: index * 0.2,
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
            x: -40,
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

// カウンターアニメーション
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter-number');
    
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
                // アクティブスライドのアニメーション
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    gsap.from(activeSlide.querySelector('.menu-card'), {
                        duration: 0.6,
                        scale: 0.9,
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

// 背景パララックス効果
function setupParallax() {
    // ヒーロー背景のパララックス
    gsap.to('.hero-bg img', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: '50%',
        ease: 'none'
    });

    // 装飾要素のパララックス
    gsap.to('.hibiscus, .pineapple, .palm', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: '30%',
        ease: 'none'
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
                gsap.to(fixedCTA, {duration: 0.5, opacity: 1, y: 0, ease: 'back.out(1.7)'});
            } else {
                gsap.to(fixedCTA, {duration: 0.3, opacity: 0, y: 20});
            }
        }
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
                boxShadow: '0 20px 50px rgba(26, 188, 156, 0.3)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 10px 30px rgba(26, 188, 156, 0.15)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時のリップル効果
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: 50%;
                top: 50%;
                margin-left: -25px;
                margin-top: -25px;
                width: 50px;
                height: 50px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// トロピカルパーティクルエフェクト
function createTropicalParticles() {
    const hero = document.querySelector('.hero');
    const particles = ['🌺', '🌴', '🍍', '🥥', '🌊'];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            pointer-events: none;
            opacity: 0.7;
            z-index: 2;
        `;
        
        hero.appendChild(particle);
        
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
        });
        
        gsap.to(particle, {
            duration: Math.random() * 8 + 5,
            y: -100,
            x: '+=50',
            rotation: 360,
            opacity: 0,
            repeat: -1,
            delay: Math.random() * 3,
            ease: 'none'
        });
    }
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
    setupFixedCTA();
    enhanceButtonEffects();
    createTropicalParticles();
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
    document.querySelectorAll('.menu-card, .voice-card, .counter-item').forEach(el => {
        observer.observe(el);
    });
}

// CSSアニメーション用のキーフレーム追加
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes tropicalFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(style);