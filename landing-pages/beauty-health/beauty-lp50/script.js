// 美容サロンLP JavaScript（圧倒的個性・超ぶっとび構成）
// GSAP・Swiper・マウスストーカー・カウントアップ・FAQ機能を実装

document.addEventListener('DOMContentLoaded', function() {
    // 初期化処理
    initializeApp();
});

/**
 * アプリケーションの初期化
 */
function initializeApp() {
    setupMouseStalker();
    setupGSAPAnimations();
    setupSwiperSliders();
    setupCountUp();
    setupFAQAccordion();
    setupSmoothScroll();
    setupParallaxEffects();
    setupHoverEffects();
    setupFixedCTA();
    
    console.log('🎨 圧倒的個性のLP JavaScript 初期化完了！');
}

/**
 * マウスストーカー機能
 */
function setupMouseStalker() {
    const stalker = document.querySelector('.mouse-stalker');
    const stalkerInner = document.querySelector('.stalker-inner');
    
    if (!stalker) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let stalkerX = 0;
    let stalkerY = 0;
    
    // マウス位置の取得
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // スムーズな追従アニメーション
    function updateStalker() {
        const diffX = mouseX - stalkerX;
        const diffY = mouseY - stalkerY;
        
        stalkerX += diffX * 0.25;
        stalkerY += diffY * 0.25;
        
        stalker.style.transform = `translate(${stalkerX - 20}px, ${stalkerY - 20}px)`;
        
        requestAnimationFrame(updateStalker);
    }
    
    updateStalker();
    
    // ホバー時のエフェクト
    const hoverTargets = document.querySelectorAll('a, button, .menu-item, .voice-card');
    
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', function() {
            stalker.style.transform += ' scale(1.5)';
            stalkerInner.textContent = '💖';
        });
        
        target.addEventListener('mouseleave', function() {
            stalker.style.transform = stalker.style.transform.replace(' scale(1.5)', '');
            stalkerInner.textContent = '✨';
        });
    });
}

/**
 * GSAP スクロールアニメーション
 */
function setupGSAPAnimations() {
    // GSAPの登録
    gsap.registerPlugin(ScrollTrigger);
    
    // ヒーローセクションのアニメーション
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-title .title-line', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-buttons .btn-hero', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.3');
    
    // セクションタイトルのアニメーション
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            y: 50,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // 統計カウンターのアニメーション
    gsap.utils.toArray('.stat-item').forEach(item => {
        gsap.fromTo(item, {
            y: 100,
            opacity: 0,
            scale: 0.5
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // メニューカードのアニメーション
    gsap.utils.toArray('.menu-item').forEach((item, index) => {
        gsap.fromTo(item, {
            y: 100,
            opacity: 0,
            rotation: -10
        }, {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // フィーチャーアイテムのアニメーション
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
        gsap.fromTo(item, {
            x: -100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // パララックス効果
    gsap.utils.toArray('.hero-shapes .shape').forEach((shape, index) => {
        gsap.to(shape, {
            y: -200,
            rotation: 360,
            duration: 10 + index * 2,
            repeat: -1,
            ease: 'none',
            yoyo: true
        });
    });
}

/**
 * Swiper スライダーの設定
 */
function setupSwiperSliders() {
    // ギャラリースライダー
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.gallery-swiper .swiper-pagination',
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        }
    });
    
    // お客様の声スライダー
    const voiceSwiper = new Swiper('.voice-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.voice-swiper .swiper-pagination',
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 50
            }
        },
        effect: 'cards',
        cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: true
        }
    });
    
    console.log('🎠 Swiperスライダーが初期化されました');
}

/**
 * カウントアップ機能
 */
function setupCountUp() {
    const countElements = document.querySelectorAll('.stat-number');
    
    countElements.forEach(element => {
        const targetNumber = parseInt(element.dataset.count);
        let currentNumber = 0;
        const increment = Math.ceil(targetNumber / 100);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const countAnimation = () => {
                        currentNumber += increment;
                        
                        if (currentNumber >= targetNumber) {
                            element.textContent = targetNumber.toLocaleString();
                            return;
                        }
                        
                        element.textContent = currentNumber.toLocaleString();
                        requestAnimationFrame(countAnimation);
                    };
                    
                    countAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(element);
    });
    
    console.log('🔢 カウントアップ機能が初期化されました');
}

/**
 * FAQ アコーディオン機能
 */
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 全てのFAQアイテムを閉じる
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // クリックされたアイテムが非アクティブだった場合、開く
            if (!isActive) {
                item.classList.add('active');
                
                // GSAPでアニメーション
                gsap.fromTo(answer, {
                    height: 0,
                    opacity: 0
                }, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    console.log('❓ FAQ アコーディオンが初期化されました');
}

/**
 * スムーススクロール機能
 */
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offsetTop = targetElement.offsetTop - headerHeight - 20;
                
                // GSAPでスムーススクロール
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: offsetTop,
                        autoKill: true
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    console.log('🔄 スムーススクロールが初期化されました');
}

/**
 * パララックス効果
 */
function setupParallaxEffects() {
    // ヒーローセクションのパララックス
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        gsap.to(heroVideo, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // セクション背景のパララックス
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.to(header, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: header,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    console.log('🌟 パララックス効果が初期化されました');
}

/**
 * ホバーエフェクト
 */
function setupHoverEffects() {
    // メニューアイテムのホバー効果
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                rotation: 2,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                rotation: 0,
                ease: 'power2.out'
            });
        });
    });
    
    // ボタンのプルプルアニメーション
    const buttons = document.querySelectorAll('.btn-hero, .btn-neon');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.1,
                x: 2,
                repeat: 5,
                yoyo: true,
                ease: 'power2.inOut'
            });
        });
    });
    
    console.log('✨ ホバーエフェクトが初期化されました');
}

/**
 * 固定CTAの制御
 */
function setupFixedCTA() {
    const fixedCTA = document.querySelector('.fixed-cta');
    const heroSection = document.querySelector('.hero');
    
    if (!fixedCTA || !heroSection) return;
    
    // 初期状態で非表示
    gsap.set(fixedCTA, {
        y: 100,
        opacity: 0
    });
    
    // スクロール位置に応じて表示制御
    ScrollTrigger.create({
        trigger: heroSection,
        start: 'bottom center',
        end: 'bottom top',
        onEnter: () => {
            gsap.to(fixedCTA, {
                duration: 0.5,
                y: 0,
                opacity: 1,
                ease: 'back.out(1.7)'
            });
        },
        onLeaveBack: () => {
            gsap.to(fixedCTA, {
                duration: 0.3,
                y: 100,
                opacity: 0,
                ease: 'power2.in'
            });
        }
    });
    
    // CTAボタンのアニメーション
    const ctaButtons = fixedCTA.querySelectorAll('.fixed-btn');
    
    ctaButtons.forEach((button, index) => {
        // 常時アニメーション
        gsap.to(button, {
            duration: 2 + index * 0.5,
            y: -5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
        
        // ホバー時の強化アニメーション
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.1,
                rotation: 5,
                ease: 'back.out(1.7)'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                rotation: 0,
                ease: 'power2.out'
            });
        });
    });
    
    console.log('📞 固定CTAが初期化されました');
}

/**
 * 背景パーティクル効果（追加演出）
 */
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    // パーティクルを生成
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #ff1493, #00bfff);
            border-radius: 50%;
            box-shadow: 0 0 10px currentColor;
        `;
        
        // ランダムな位置とアニメーション
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
        });
        
        gsap.to(particle, {
            duration: Math.random() * 10 + 10,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: 360,
            repeat: -1,
            ease: 'none'
        });
        
        particleContainer.appendChild(particle);
    }
    
    console.log('🎉 パーティクル効果が生成されました');
}

/**
 * 特別なイベントハンドラー
 */
function setupSpecialEffects() {
    // コナミコマンド風の隠し機能
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length) {
            if (konamiCode.every((code, index) => code === konamiSequence[index])) {
                activateSpecialMode();
                konamiCode = [];
            }
        }
    });
    
    function activateSpecialMode() {
        // 特別モードの演出
        const body = document.body;
        body.style.filter = 'hue-rotate(180deg)';
        
        // 3秒後に元に戻す
        setTimeout(() => {
            body.style.filter = 'none';
        }, 3000);
        
        console.log('🎊 特別モードが発動しました！');
    }
}

/**
 * エラーハンドリング
 */
function handleError(error) {
    console.error('🚨 エラーが発生しました:', error);
}

/**
 * パフォーマンス監視
 */
function monitorPerformance() {
    // パフォーマンス測定
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.entryType === 'navigation') {
                console.log(`📊 ページ読み込み時間: ${entry.loadEventEnd - entry.loadEventStart}ms`);
            }
        });
    });
    
    observer.observe({ entryTypes: ['navigation'] });
}

// 初期化後の追加処理
window.addEventListener('load', function() {
    createParticles();
    setupSpecialEffects();
    monitorPerformance();
    
    console.log('🎨 全ての特別効果が初期化されました！');
});

// デバッグ用（開発環境のみ）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 デバッグモードで動作中');
    
    // パフォーマンス統計の表示
    setInterval(() => {
        const memory = performance.memory;
        if (memory) {
            console.log(`メモリ使用量: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
        }
    }, 10000);
}