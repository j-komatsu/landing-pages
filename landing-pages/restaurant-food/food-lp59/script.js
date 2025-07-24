// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // ヒーローセクションのアニメーション
    gsap.from('.hero-content > *', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.hero-image img', {
        duration: 1.2,
        scale: 0.8,
        rotation: -10,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0.5
    });

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
});

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
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.8,
            ease: 'back.out(1.7)'
        });
    });

    // カウンターアイテムのアニメーション
    gsap.utils.toArray('.counter-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            y: 80,
            opacity: 0,
            scale: 0.8,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });

    // メニューカードのアニメーション
    gsap.utils.toArray('.menu-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotation: index % 2 === 0 ? -5 : 5,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // 常連の声カードのアニメーション
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
            x: -50,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
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
            duration: 2,
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
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // 常連の声スライダー
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
                    duration: 1.2,
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
                gsap.to(fixedCTA, {duration: 0.3, opacity: 1, y: 0});
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
                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.9)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            gsap.to(button, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

// パーティクルエフェクト（装飾用）
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFEB3B;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
        `;
        
        hero.appendChild(particle);
        
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
        });
        
        gsap.to(particle, {
            duration: Math.random() * 3 + 2,
            y: '-=100',
            opacity: 0,
            repeat: -1,
            delay: Math.random() * 2,
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
    createParticleEffect();
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