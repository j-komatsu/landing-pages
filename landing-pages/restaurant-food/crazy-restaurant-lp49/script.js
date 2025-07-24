// クレイジーレストランLP JavaScript
// GSAP・Swiper・タブ切替・FAQ・面白アニメ機能を実装

document.addEventListener('DOMContentLoaded', function() {
    // 初期化処理
    initializeApp();
});

/**
 * アプリケーション全体の初期化
 */
function initializeApp() {
    setupGSAPAnimations();
    setupSwiperSliders();
    setupMenuTabs();
    setupFAQAccordion();
    setupCountdown();
    setupInteractiveElements();
    setupScrollAnimations();
    setupSpecialEffects();
    
    console.log('🎉 クレイジーレストランLP JavaScript 初期化完了！');
}

/**
 * GSAP アニメーション設定
 */
function setupGSAPAnimations() {
    // GSAPプラグイン登録
    gsap.registerPlugin(ScrollTrigger);
    
    // ヒーローセクションのエントランスアニメーション
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-logo', {
            duration: 1,
            scale: 0,
            rotation: 180,
            ease: 'back.out(1.7)'
        })
        .from('.hero-title .title-line', {
            duration: 0.8,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-title .title-sub', {
            duration: 0.6,
            x: -50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.hero-description', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.2')
        .from('.hero-cta .cta-btn', {
            duration: 0.5,
            scale: 0,
            rotation: 45,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .from('.scroll-indicator', {
            duration: 0.5,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.2');
    
    // セクションタイトルのアニメーション
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            y: 100,
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
    
    // メニューアイテムのスクロールアニメーション
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
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // ギャラリーアイテムのアニメーション
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.fromTo(item, {
            scale: 0,
            rotation: 45,
            opacity: 0
        }, {
            scale: 1,
            rotation: -2,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // 店舗情報カードのアニメーション
    gsap.utils.toArray('.info-card').forEach((card, index) => {
        gsap.fromTo(card, {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotation: index % 2 === 0 ? -5 : 5
        }, {
            x: 0,
            opacity: 1,
            rotation: 0,
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
    
    console.log('🎨 GSAP アニメーション初期化完了');
}

/**
 * Swiper スライダー設定
 */
function setupSwiperSliders() {
    // ギャラリースライダー
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.gallery-swiper .swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                centeredSlides: false
            },
            1024: {
                slidesPerView: 3,
                centeredSlides: false
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
    
    // レビュースライダー
    const voiceSwiper = new Swiper('.voice-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.voice-swiper .swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.voice-swiper .swiper-button-next',
            prevEl: '.voice-swiper .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                centeredSlides: false
            },
            1024: {
                slidesPerView: 3,
                centeredSlides: false
            }
        }
    });
    
    console.log('🎠 Swiper スライダー初期化完了');
}

/**
 * メニュータブ切替機能
 */
function setupMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.menu-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // アクティブタブボタンの切り替え
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // タブコンテンツの切り替え
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tab === targetTab) {
                    content.classList.add('active');
                    
                    // タブ切り替え時のアニメーション
                    gsap.fromTo(content, {
                        opacity: 0,
                        y: 30
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            });
            
            // ボタンクリック時のクレイジーエフェクト
            gsap.to(this, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 3,
                ease: 'power2.inOut'
            });
            
            console.log(`🍽️ タブ切り替え: ${targetTab}`);
        });
    });
    
    console.log('📑 メニュータブ機能初期化完了');
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
                const faqAnswer = faq.querySelector('.faq-answer');
                gsap.to(faqAnswer, {
                    maxHeight: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            // クリックされたアイテムが非アクティブだった場合、開く
            if (!isActive) {
                item.classList.add('active');
                
                // アニメーション付きで開く
                gsap.set(answer, { maxHeight: 'none' });
                const height = answer.offsetHeight;
                gsap.set(answer, { maxHeight: 0 });
                
                gsap.to(answer, {
                    maxHeight: height,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                // 質問項目をちょっと揺らす
                gsap.to(question, {
                    duration: 0.1,
                    rotation: 2,
                    yoyo: true,
                    repeat: 5,
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    console.log('❓ FAQ アコーディオン初期化完了');
}

/**
 * カウントダウン機能（超未来日時設定）
 */
function setupCountdown() {
    // 超未来の日時を設定（2099年12月31日 23:59:59）
    const targetDate = new Date('2099-12-31T23:59:59').getTime();
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.warn('⚠️ カウントダウン要素が見つかりません');
        return;
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // カウントダウン終了時の処理
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // アニメーション付きで数値を更新
        animateNumberUpdate(daysElement, days.toString().padStart(2, '0'));
        animateNumberUpdate(hoursElement, hours.toString().padStart(2, '0'));
        animateNumberUpdate(minutesElement, minutes.toString().padStart(2, '0'));
        animateNumberUpdate(secondsElement, seconds.toString().padStart(2, '0'));
    }
    
    function animateNumberUpdate(element, newValue) {
        if (element.textContent !== newValue) {
            gsap.to(element, {
                duration: 0.3,
                scale: 1.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    element.textContent = newValue;
                }
            });
        }
    }
    
    // 初回実行
    updateCountdown();
    
    // 1秒ごとに更新
    setInterval(updateCountdown, 1000);
    
    console.log('⏰ カウントダウン機能初期化完了（超未来設定）');
}

/**
 * インタラクティブ要素の設定
 */
function setupInteractiveElements() {
    // CTAボタンのクリックエフェクト
    const ctaButtons = document.querySelectorAll('.cta-btn, .contact-btn, .fixed-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // クリック位置にリップルエフェクト
            createRippleEffect(e, this);
            
            // ボタンのクレイジーアニメーション
            gsap.to(this, {
                duration: 0.1,
                scale: 0.9,
                rotation: Math.random() * 10 - 5,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            console.log('🔥 ボタンクリック:', this.textContent.trim());
        });
        
        // ホバー時のエフェクト
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                rotation: Math.random() * 4 - 2,
                ease: 'power2.out'
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
    
    // メニューアイテムのホバーエフェクト
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                rotation: Math.random() * 4 - 2,
                ease: 'power2.out'
            });
            
            // 価格バッジのアニメーション
            const priceBadge = this.querySelector('.price-badge');
            if (priceBadge) {
                gsap.to(priceBadge, {
                    duration: 0.3,
                    scale: 1.1,
                    rotation: 5,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                rotation: 0,
                ease: 'power2.out'
            });
            
            const priceBadge = this.querySelector('.price-badge');
            if (priceBadge) {
                gsap.to(priceBadge, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    console.log('🎮 インタラクティブ要素初期化完了');
}

/**
 * リップルエフェクト作成
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    gsap.fromTo(ripple, {
        scale: 0,
        opacity: 1
    }, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
            ripple.remove();
        }
    });
}

/**
 * スクロールアニメーション
 */
function setupScrollAnimations() {
    // スクロール時に表示される要素
    const fadeInElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // エントリー時のクレイジーエフェクト
                if (entry.target.classList.contains('crazy-entrance')) {
                    gsap.fromTo(entry.target, {
                        scale: 0,
                        rotation: 180,
                        opacity: 0
                    }, {
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)'
                    });
                }
            }
        });
    }, observerOptions);
    
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log('📜 スクロールアニメーション初期化完了');
}

/**
 * 特別エフェクト
 */
function setupSpecialEffects() {
    // ランダムに要素を揺らす
    function addRandomWobble() {
        const wobbleElements = document.querySelectorAll('.info-icon, .tab-emoji, .dancing-emoji');
        
        wobbleElements.forEach(element => {
            if (Math.random() < 0.3) { // 30%の確率で実行
                element.classList.add('wobble');
                setTimeout(() => {
                    element.classList.remove('wobble');
                }, 1000);
            }
        });
    }
    
    // 5秒ごとにランダム揺れ
    setInterval(addRandomWobble, 5000);
    
    // スクロール時のパララックス効果
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.dancing-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // コナミコマンド風の隠し機能
    let konamiSequence = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiSequence.push(e.code);
        
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence.shift();
        }
        
        if (konamiSequence.length === konamiCode.length && 
            konamiSequence.every((code, index) => code === konamiCode[index])) {
            activateCrazyMode();
            konamiSequence = [];
        }
    });
    
    function activateCrazyMode() {
        document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
        
        // 全ての要素を一瞬回転させる
        gsap.to('*', {
            duration: 2,
            rotation: 360,
            ease: 'power2.inOut'
        });
        
        // 3秒後に元に戻す
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        console.log('🎊 クレイジーモード発動！');
    }
    
    console.log('✨ 特別エフェクト初期化完了');
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
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`📊 ページ読み込み時間: ${loadTime}ms`);
        });
    }
}

// パフォーマンス監視開始
monitorPerformance();

// デバッグ用（開発環境のみ）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 デバッグモードで動作中');
    
    // メモリ使用量監視
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            console.log(`💾 メモリ使用量: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
        }, 10000);
    }
}

// ページ完全読み込み後の追加処理
window.addEventListener('load', () => {
    // すべての画像が読み込まれた後のエフェクト
    gsap.to('.hero', {
        duration: 1,
        filter: 'brightness(1)',
        ease: 'power2.out'
    });
    
    console.log('🎨 ページ読み込み完了 - 全エフェクト有効化');
});