// LINE登録LP JavaScript（遊び心＋動きのあるモダン型）
// GSAP・Swiperアニメーション・タブ切替・FAQアコーディオン機能を実装

document.addEventListener('DOMContentLoaded', function() {
    // 初期化処理
    initializeApp();
});

/**
 * アプリケーションの初期化
 */
function initializeApp() {
    setupGSAPAnimations();
    setupSwiperSliders();
    setupTabSwitching();
    setupFAQAccordion();
    setupSmoothScroll();
    setupScrollAnimations();
    setupHoverEffects();
    setupFixedCTA();
    setupParallaxEffects();
    
    console.log('🎉 LINE登録LP JavaScript 初期化完了！');
}

/**
 * GSAP アニメーション設定
 */
function setupGSAPAnimations() {
    // GSAPの登録
    gsap.registerPlugin(ScrollTrigger);
    
    // ヘッダーの表示アニメーション
    gsap.from('.header', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: 'power3.out'
    });
    
    // ヒーローセクションのアニメーション
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-title .title-line', {
            duration: 1,
            x: -100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .from('.hero-title .title-emphasis', {
            duration: 0.8,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.feature-item', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.2')
        .from('.btn-line-main', {
            duration: 0.8,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.2');
    
    // ヒーロー画像のアニメーション
    gsap.from('.hero-img', {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // デコレーションアイテムのアニメーション
    gsap.utils.toArray('.decoration-item').forEach((item, index) => {
        gsap.fromTo(item, {
            y: 100,
            opacity: 0,
            scale: 0
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 1 + index * 0.2,
            ease: 'bounce.out'
        });
    });
    
    // セクションタイトルのアニメーション
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
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
    
    // カードアイテムのスタッガーアニメーション
    gsap.utils.toArray('.benefit-card, .voice-card, .step-item').forEach((card, index) => {
        gsap.fromTo(card, {
            y: 100,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // 最終CTAセクションのアニメーション
    gsap.fromTo('.final-cta-content', {
        scale: 0.8,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.final-cta-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    console.log('✨ GSAP アニメーションが初期化されました');
}

/**
 * Swiper スライダーの設定
 */
function setupSwiperSliders() {
    // 特典スライダー
    const benefitsSwiper = new Swiper('.benefits-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.benefits-swiper .swiper-pagination',
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
        effect: 'slide',
        speed: 800
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
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        speed: 1000
    });
    
    console.log('🎠 Swiperスライダーが初期化されました');
}

/**
 * タブ切り替え機能
 */
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // アクティブクラスの切り替え
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // タブコンテンツの切り替え
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetTab}-tab`) {
                    content.classList.add('active');
                    
                    // タブ切り替え時のアニメーション
                    gsap.fromTo(content, {
                        opacity: 0,
                        y: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            });
            
            // ボタンクリック時のアニメーション
            gsap.to(this, {
                duration: 0.2,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
    
    console.log('🔄 タブ切り替え機能が初期化されました');
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
            
            // 他のFAQアイテムを閉じる
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                    const otherAnswer = faq.querySelector('.faq-answer');
                    if (otherAnswer) {
                        gsap.to(otherAnswer, {
                            duration: 0.3,
                            height: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            ease: 'power2.inOut'
                        });
                    }
                }
            });
            
            // クリックされたアイテムの開閉
            if (!isActive) {
                item.classList.add('active');
                
                // 開くアニメーション
                gsap.fromTo(answer, {
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0
                }, {
                    height: 'auto',
                    paddingTop: '0px',
                    paddingBottom: '1.5rem',
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                // 内容のフェードイン
                gsap.fromTo(answer.querySelector('p'), {
                    opacity: 0,
                    y: 10
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    delay: 0.2,
                    ease: 'power2.out'
                });
            } else {
                item.classList.remove('active');
                
                // 閉じるアニメーション
                gsap.to(answer, {
                    duration: 0.3,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    ease: 'power2.inOut'
                });
            }
            
            // 質問ボタンのアニメーション
            gsap.to(question, {
                duration: 0.2,
                scale: 0.98,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
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
                
                // クリック時のボタンアニメーション
                gsap.to(this, {
                    duration: 0.2,
                    scale: 0.95,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    console.log('🔄 スムーススクロールが初期化されました');
}

/**
 * スクロール連動アニメーション
 */
function setupScrollAnimations() {
    // ヘッダーの背景変化
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: '.header'
        }
    });
    
    // 背景の泡アニメーション
    gsap.utils.toArray('.bubble').forEach((bubble, index) => {
        gsap.to(bubble, {
            y: -200,
            rotation: 360,
            duration: 8 + index * 2,
            repeat: -1,
            ease: 'none',
            yoyo: true
        });
    });
    
    // パーティクルアニメーション
    gsap.utils.toArray('.particle').forEach((particle, index) => {
        gsap.to(particle, {
            y: -window.innerHeight - 100,
            duration: 8,
            repeat: -1,
            delay: index * 2,
            ease: 'none'
        });
    });
    
    console.log('🌟 スクロールアニメーションが初期化されました');
}

/**
 * ホバーエフェクト
 */
function setupHoverEffects() {
    // カードホバーエフェクト
    const cards = document.querySelectorAll('.benefit-card, .voice-card, .step-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // ボタンホバーエフェクト
    const buttons = document.querySelectorAll('.btn-line-main, .btn-line-section, .btn-line-final');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // アイコンアニメーション
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.5,
                    rotation: 360,
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // フィーチャーアイテムのアニメーション
    const features = document.querySelectorAll('.feature-item');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            gsap.to(icon, {
                duration: 0.5,
                scale: 1.2,
                rotation: 15,
                ease: 'power2.out'
            });
        });
        
        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            gsap.to(icon, {
                duration: 0.5,
                scale: 1,
                rotation: 0,
                ease: 'power2.out'
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
    
    // 初期状態
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
    
    // 固定CTAボタンの常時アニメーション
    gsap.to(fixedCTA, {
        duration: 2,
        y: -5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });
    
    console.log('📱 固定CTAが初期化されました');
}

/**
 * パララックス効果
 */
function setupParallaxEffects() {
    // ヒーロー画像のパララックス
    const heroImage = document.querySelector('.hero-img');
    
    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // デコレーションアイテムのパララックス
    gsap.utils.toArray('.decoration-item').forEach((item, index) => {
        gsap.to(item, {
            yPercent: -50 - (index * 20),
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    console.log('🌊 パララックス効果が初期化されました');
}

/**
 * 特別なイベントハンドラー
 */
function setupSpecialEffects() {
    // LINEボタンクリック時の特別エフェクト
    const lineButtons = document.querySelectorAll('[href*="line"], .btn-line-main, .btn-line-section, .btn-line-final');
    
    lineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 紙吹雪エフェクト
            createConfetti(this);
            
            // ボタンアニメーション
            gsap.to(this, {
                duration: 0.2,
                scale: 0.9,
                yoyo: true,
                repeat: 3,
                ease: 'power2.inOut'
            });
        });
    });
    
    function createConfetti(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${['#00C300', '#FFEB3B', '#42A5F5'][Math.floor(Math.random() * 3)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(confetti);
            
            gsap.to(confetti, {
                duration: 1,
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                rotation: Math.random() * 360,
                scale: 0,
                ease: 'power2.out',
                onComplete: () => {
                    confetti.remove();
                }
            });
        }
    }
}

/**
 * パフォーマンス監視
 */
function monitorPerformance() {
    // FPS監視
    let fps = 0;
    let lastTime = performance.now();
    
    function calculateFPS() {
        const currentTime = performance.now();
        fps = Math.round(1000 / (currentTime - lastTime));
        lastTime = currentTime;
        
        requestAnimationFrame(calculateFPS);
    }
    
    calculateFPS();
    
    // 5秒ごとにパフォーマンス情報をログ出力
    setInterval(() => {
        console.log(`📊 FPS: ${fps}, メモリ使用量: ${(performance.memory?.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
    }, 5000);
}

/**
 * エラーハンドリング
 */
function handleError(error) {
    console.error('🚨 エラーが発生しました:', error);
}

/**
 * ユーティリティ関数：要素の存在確認
 */
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

/**
 * ユーティリティ関数：デバウンス
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 初期化後の追加処理
window.addEventListener('load', function() {
    setupSpecialEffects();
    setupScrollAnimations();
    
    // 開発環境でのパフォーマンス監視
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        monitorPerformance();
        console.log('🔧 デバッグモードで動作中');
    }
    
    console.log('🎊 全ての機能が初期化されました！');
});

// リサイズイベントのデバウンス処理
window.addEventListener('resize', debounce(function() {
    ScrollTrigger.refresh();
    console.log('📱 画面サイズが変更されました');
}, 250));

// エラーイベントの監視
window.addEventListener('error', handleError);
window.addEventListener('unhandledrejection', handleError);