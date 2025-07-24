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
    
    // パーティクル効果
    initParticleEffects();
});

// ヘッダースクロール効果
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

// ヒーローセクションのアニメーション（サイバー風・ダイナミック）
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // ヒーローコンテンツの登場アニメーション
    tl.from('.title-main', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        scale: 0.8,
        ease: 'power3.out'
    });
    
    tl.from('.title-sub', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=1');
    
    tl.from('.hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.5');
    
    tl.from('.hero-buttons .btn', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.3');
    
    // パーティクルのアニメーション
    gsap.to('.particle', {
        duration: 'random(4, 8)',
        y: 'random(-50, 50)',
        x: 'random(-30, 30)',
        rotation: 'random(0, 360)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
            each: 0.5,
            repeat: -1
        }
    });
}

// スクロール時のアニメーション（エフェクト強化）
function setupScrollAnimations() {
    // セクションタイトルのダイナミックアニメーション
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
            scale: 0.8,
            ease: 'power3.out'
        });
    });

    // 特徴アイテムのスタッガーアニメーション
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 80,
            opacity: 0,
            scale: 0.9,
            rotation: 5,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // イベントアイテムのスライドインアニメーション
    gsap.utils.toArray('.event-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // チームメンバーカードのズームインアニメーション
    gsap.utils.toArray('.member-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            scale: 0.8,
            y: 100,
            opacity: 0,
            rotation: 10,
            delay: index * 0.3,
            ease: 'back.out(1.7)'
        });
    });

    // お客様の声カードのフェードインアニメーション
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
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // 最終CTAセクションのスペシャルアニメーション
    gsap.from('.cta-title', {
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 2,
        scale: 0.5,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    gsap.from('.cta-subtitle', {
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power2.out'
    });

    gsap.from('.cta-buttons .btn', {
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        y: 80,
        opacity: 0,
        stagger: 0.3,
        delay: 1,
        ease: 'back.out(1.7)'
    });
}

// Swiperスライダー初期化
function initializeSwiper() {
    // デバイススライダー
    const deviceSwiper = new Swiper('.devices-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.devices-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.devices-swiper .swiper-button-next',
            prevEl: '.devices-swiper .swiper-button-prev',
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
                    gsap.from(activeSlide.querySelector('.device-card'), {
                        duration: 1,
                        scale: 0.9,
                        opacity: 0,
                        y: 30,
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
                
                // 開くアニメーション（サイバー風）
                gsap.from(item.querySelector('.faq-answer p'), {
                    duration: 0.8,
                    y: -20,
                    opacity: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// スムーススクロール（エフェクト付き）
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

// パーティクル効果強化
function initParticleEffects() {
    // 追加のパーティクル効果
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: #00f5ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            box-shadow: 0 0 10px #00f5ff;
        `;
        
        document.body.appendChild(particle);
        
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10
        });
        
        gsap.to(particle, {
            duration: Math.random() * 3 + 2,
            y: -10,
            x: `+=${Math.random() * 200 - 100}`,
            opacity: 0,
            ease: 'none',
            onComplete: () => particle.remove()
        });
    };
    
    // 定期的にパーティクルを生成
    setInterval(createParticle, 2000);
}

// ボタンホバーエフェクト強化（サイバー・ネオンエフェクト）
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // ネオンエフェクト
            if (button.classList.contains('glow-btn')) {
                gsap.to(button, {
                    duration: 0.5,
                    boxShadow: '0 0 30px #00f5ff, 0 0 60px #00f5ff',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
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
            
            // サイバーエフェクト
            createCyberEffect(button, event);
        });
    });
}

// サイバーエフェクト
function createCyberEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const effectCount = 8;
    const colors = ['#00f5ff', '#bf00ff', '#39ff14', '#ff073a'];
    
    for (let i = 0; i < effectCount; i++) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            box-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(effect);
        
        const angle = (i / effectCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        
        gsap.to(effect, {
            duration: 1,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            ease: 'power2.out',
            onComplete: () => effect.remove()
        });
    }
}

// デバイスカードのホバーエフェクト
function enhanceDeviceEffects() {
    const deviceCards = document.querySelectorAll('.device-card');
    
    deviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.5,
                y: -10,
                ease: 'power2.out'
            });
            
            const badge = card.querySelector('.device-badge');
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
            gsap.to(card, {
                duration: 0.5,
                y: 0,
                ease: 'power2.out'
            });
            
            const badge = card.querySelector('.device-badge');
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
    enhanceDeviceEffects();
    handleResponsive();
    
    // ページ全体のローディングアニメーション完了
    gsap.to('body', {
        duration: 1,
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
    document.querySelectorAll('.device-card, .voice-card, .member-card, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

// サイバーエフェクトのためのCSSアニメーション追加
const style = document.createElement('style');
style.textContent = `
    .cyber-glow {
        animation: cyberGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes cyberGlow {
        0% { box-shadow: 0 0 20px rgba(0, 245, 255, 0.5); }
        100% { box-shadow: 0 0 40px rgba(191, 0, 255, 0.8); }
    }
    
    .neon-flicker {
        animation: neonFlicker 3s ease-in-out infinite;
    }
    
    @keyframes neonFlicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
        75% { opacity: 0.9; }
    }
    
    .electric-line {
        background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 245, 255, 0.8), 
            rgba(191, 0, 255, 0.8), 
            transparent
        );
        animation: electricFlow 2s linear infinite;
    }
    
    @keyframes electricFlow {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(300%); }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--primary-dark);
        padding: 20px;
        box-shadow: var(--shadow-dark);
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
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    optimizeAnimations();
    
    // サイバーエフェクトを追加
    const cyberElements = document.querySelectorAll('.feature-item, .member-card, .device-card');
    cyberElements.forEach(el => {
        el.classList.add('cyber-glow');
    });
    
    const neonElements = document.querySelectorAll('.section-title, .logo-text');
    neonElements.forEach(el => {
        el.classList.add('neon-flicker');
    });
});