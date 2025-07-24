// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // 森のパーティクル背景初期化
    initForestParticles();
    
    // 浮遊する葉っぱ初期化
    initFloatingLeaves();
    
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

// 森のパーティクルエフェクト
function initForestParticles() {
    const particleContainer = document.getElementById('forest-particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'forest-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 3}px;
            height: ${Math.random() * 6 + 3}px;
            background: ${Math.random() > 0.5 ? '#A8D5BA' : '#91C8E4'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.3};
            left: ${Math.random() * 100}%;\n            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        
        particleContainer.appendChild(particle);
        
        // パーティクルアニメーション（ゆったりとした動き）
        gsap.to(particle, {
            duration: Math.random() * 4 + 3,
            y: `-=${Math.random() * 100 + 50}`,
            x: `+=${(Math.random() - 0.5) * 60}`,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5,
            repeat: -1,
            delay: Math.random() * 3,
            ease: 'power1.out'
        });
    }
}

// 浮遊する葉っぱエフェクト
function initFloatingLeaves() {
    const leavesContainer = document.getElementById('floating-leaves');
    const leafEmojis = ['🍃', '🌸', '🦋', '✨'];
    const leafCount = 8;
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf-particle';
        leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        leaf.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 0.8 + 0.8}rem;
            left: ${Math.random() * 100}%;
            top: -50px;
            pointer-events: none;
            opacity: ${Math.random() * 0.8 + 0.4};
        `;
        
        leavesContainer.appendChild(leaf);
        
        // 葉っぱの落下アニメーション
        gsap.set(leaf, { y: -100 });
        gsap.to(leaf, {
            duration: Math.random() * 6 + 8,
            y: window.innerHeight + 100,
            x: `+=${(Math.random() - 0.5) * 200}`,
            rotation: Math.random() * 360,
            repeat: -1,
            delay: Math.random() * 5,
            ease: 'none'
        });
    }
}

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // 魔法のフレームのアニメーション
    tl.from('.magical-frame', {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        y: 50,
        ease: 'back.out(1.7)'
    });
    
    // サロン名のアニメーション
    tl.from('.salon-name', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.8');
    
    // 魔法のテキストアニメーション
    tl.from('.magical-text', {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.6');
    
    // サブタイトルのアニメーション
    tl.from('.hero-subtitle', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4');
    
    // ボタンのアニメーション
    tl.from('.hero-buttons .btn', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.2');
}

// スクロール時のアニメーション
function setupScrollAnimations() {
    // セクションタイトルの優しいフェードイン
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // 統計アイテムの優しいスライドイン
    gsap.utils.toArray('.stat-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            delay: index * 0.15,
            ease: 'power2.out'
        });
    });

    // メニューカードのふんわりスライドイン
    gsap.utils.toArray('.menu-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 60,
            opacity: 0,
            scale: 0.9,
            delay: index * 0.2,
            ease: 'back.out(1.7)'
        });
    });

    // 空間紹介セクションのアニメーション
    gsap.from('.space-text', {
        scrollTrigger: {
            trigger: '.space-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        x: -60,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.space-image', {
        scrollTrigger: {
            trigger: '.space-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        x: 60,
        opacity: 0,
        scale: 0.9,
        delay: 0.3,
        ease: 'power2.out'
    });

    // 特徴アイテムのアニメーション
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
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
            duration: 1,
            y: 40,
            opacity: 0,
            scale: 0.95,
            delay: index * 0.15,
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

    // 店舗情報セクションのアニメーション
    gsap.from('.info-text', {
        scrollTrigger: {
            trigger: '.info-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
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
        duration: 1,
        y: 40,
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
            delay: 5000,
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
            delay: 6000,
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
                        duration: 0.8,
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
                
                // 開くアニメーション
                gsap.from(item.querySelector('.faq-answer p'), {
                    duration: 0.6,
                    y: -15,
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
                    duration: 0.6,
                    opacity: 1,
                    y: 0,
                    ease: 'back.out(1.7)'
                });
            } else {
                gsap.to(fixedCTA, {
                    duration: 0.4,
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

// ボタンホバーエフェクト強化（魔法のエフェクト）
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.4,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // 魔法エフェクト
            if (button.classList.contains('magical-btn')) {
                gsap.to(button, {
                    duration: 0.6,
                    boxShadow: '0 0 25px rgba(168, 213, 186, 0.6), 0 0 50px rgba(145, 200, 228, 0.4)',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.4,
                scale: 1,
                boxShadow: '0 8px 32px rgba(168, 213, 186, 0.3)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時の優しいエフェクト
            gsap.to(button, {
                duration: 0.1,
                scale: 0.98,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // 魔法の光エフェクト
            createMagicalSparkles(button, event);
        });
    });
}

// 魔法の光エフェクト
function createMagicalSparkles(button, event) {
    const rect = button.getBoundingClientRect();
    const sparkleCount = 6;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: fixed;
            font-size: 1rem;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            color: #A8D5BA;
        `;
        
        document.body.appendChild(sparkle);
        
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 40 + Math.random() * 20;
        
        gsap.to(sparkle, {
            duration: 1.2,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            rotation: 180,
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
            const magicalGlow = card.querySelector('.magical-glow');
            if (magicalGlow) {
                gsap.to(magicalGlow, {
                    duration: 0.6,
                    opacity: 1,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const magicalGlow = card.querySelector('.magical-glow');
            if (magicalGlow) {
                gsap.to(magicalGlow, {
                    duration: 0.6,
                    opacity: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// パララックス効果
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.space-image, .hero-bg img');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
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
    setupParallaxEffects();
    handleResponsive();
    
    // ページ全体のローディングアニメーション完了
    gsap.to('body', {
        duration: 0.6,
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

// 自然音エフェクト（オプション）
function addNatureSounds() {
    // 実際の実装では音声ファイルを使用
    // ここではプレースホルダーとしてコメントのみ
    console.log('🎵 自然音エフェクト準備完了（実装時に音声ファイルを追加）');
}

// CSSアニメーション用のキーフレーム追加
const style = document.createElement('style');
style.textContent = `
    .magical-glow-effect {
        animation: magicalGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes magicalGlow {
        0% { box-shadow: 0 0 10px rgba(168, 213, 186, 0.3); }
        100% { box-shadow: 0 0 20px rgba(168, 213, 186, 0.6), 0 0 30px rgba(145, 200, 228, 0.4); }
    }
    
    .gentle-bounce:hover {
        animation: gentleBounce 0.6s ease;
    }
    
    @keyframes gentleBounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        60% { transform: translateY(-3px); }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    optimizeAnimations();
    addNatureSounds();
});