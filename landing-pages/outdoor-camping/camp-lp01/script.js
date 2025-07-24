// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダースクロール効果
    setupHeaderScroll();
    
    // ヒーローセクションのアニメーション
    initHeroAnimations();
    
    // パララックス効果設定
    setupParallaxEffects();
    
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
    
    // キャンペーンタイマー
    setupCampaignTimer();
    
    // 自然系アニメーション
    setupNatureAnimations();
});

// ヘッダースクロール効果
function setupHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // ヒーローバッジのアニメーション
    tl.from('.hero-badge', {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    // メインキャッチコピーのアニメーション
    tl.from('.main-catch', {
        duration: 1.8,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.8');
    
    // サブキャッチコピーのアニメーション
    tl.from('.sub-catch', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=1.2');
    
    // 説明文のアニメーション
    tl.from('.hero-description', {
        duration: 1.3,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.8');
    
    // ボタンのアニメーション
    tl.from('.hero-buttons .btn', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(1.7)'
    }, '-=0.5');
    
    // スクロールインジケーターのアニメーション
    tl.from('.scroll-indicator', {
        duration: 1,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.3');
}

// パララックス効果設定
function setupParallaxEffects() {
    // 特徴セクションの各アイテムにパララックス効果
    gsap.utils.toArray('.feature-item[data-parallax]').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            y: 100,
            scale: 0.9,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power3.out'
        });
        
        // ホバー時の3D効果
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.5,
                rotationY: 5,
                rotationX: 5,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.5,
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // ヒーロー背景のパララックス
    gsap.to('.hero-bg img', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: '50%',
        ease: 'none'
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
            ease: 'power3.out'
        });
    });

    // セクションサブタイトルのアニメーション
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.from(subtitle, {
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 30,
            opacity: 0,
            delay: 0.3,
            ease: 'power2.out'
        });
    });

    // ギャラリーカードのアニメーション
    gsap.utils.toArray('.gallery-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 80,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // レビューカードのアニメーション
    gsap.utils.toArray('.review-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.3,
            scale: 0.9,
            y: 60,
            opacity: 0,
            delay: index * 0.2,
            ease: 'back.out(1.7)'
        });
    });

    // キャンペーンカードのアニメーション
    gsap.utils.toArray('.campaign-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.4,
            y: 100,
            opacity: 0,
            delay: index * 0.3,
            ease: 'power3.out'
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
            x: index % 2 === 0 ? -50 : 50,
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
        duration: 1.8,
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
        duration: 1.5,
        y: 40,
        opacity: 0,
        delay: 0.4,
        ease: 'power2.out'
    });

    gsap.from('.cta-buttons .btn', {
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.3,
        y: 60,
        opacity: 0,
        stagger: 0.2,
        delay: 0.8,
        ease: 'back.out(1.7)'
    });

    gsap.from('.cta-note', {
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        y: 30,
        opacity: 0,
        delay: 1.2,
        ease: 'power2.out'
    });
}

// Swiperスライダー初期化
function initializeSwiper() {
    // ギャラリースライダー
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.gallery-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.gallery-swiper .swiper-button-next',
            prevEl: '.gallery-swiper .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        },
        on: {
            slideChange: function() {
                // スライド変更時のアニメーション
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    gsap.from(activeSlide.querySelector('.gallery-card'), {
                        duration: 1,
                        scale: 0.95,
                        opacity: 0.8,
                        ease: 'power2.out'
                    });
                }
            }
        }
    });

    // レビュースライダー
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.reviews-swiper .swiper-pagination',
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
        on: {
            slideChange: function() {
                // スライド変更時のアニメーション
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    gsap.from(activeSlide.querySelector('.review-card'), {
                        duration: 1.2,
                        rotationY: 10,
                        scale: 0.95,
                        opacity: 0.8,
                        ease: 'back.out(1.7)'
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
                    duration: 0.8,
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
            
            // メニュー開閉アニメーション
            if (navMenu.classList.contains('active')) {
                gsap.from('.nav-menu.active .nav-link', {
                    duration: 0.8,
                    y: -20,
                    opacity: 0,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        });
    }
}

// キャンペーンタイマー
function setupCampaignTimer() {
    const timerElement = document.getElementById('campaign-timer');
    if (!timerElement) return;
    
    // 24時間後の時刻を設定
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            timerElement.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            timerElement.textContent = '00:00:00';
        }
    }
    
    // 初回実行と1秒ごとの更新
    updateTimer();
    setInterval(updateTimer, 1000);
}

// 自然系アニメーション
function setupNatureAnimations() {
    // ボタンホバーエフェクト強化
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.4,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // 自然エフェクト
            if (button.classList.contains('pulse-btn')) {
                gsap.to(button, {
                    duration: 0.6,
                    boxShadow: '0 15px 45px rgba(255, 152, 0, 0.6)',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.4,
                scale: 1,
                boxShadow: '0 12px 40px rgba(255, 152, 0, 0.3)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時の自然エフェクト
            gsap.to(button, {
                duration: 0.15,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // 自然パーティクルエフェクト
            createNatureEffect(button, event);
        });
    });
}

// 自然エフェクト
function createNatureEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const effectCount = 6;
    const colors = ['#2E7D32', '#FF9800', '#81C784'];
    const symbols = ['🌿', '🍃', '🌲', '✨'];
    
    for (let i = 0; i < effectCount; i++) {
        const effect = document.createElement('div');
        const isSymbol = Math.random() > 0.4;
        
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
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${event.clientX}px;
                top: ${event.clientY}px;
                box-shadow: 0 0 12px currentColor;
            `;
        }
        
        document.body.appendChild(effect);
        
        const angle = (i / effectCount) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        
        gsap.to(effect, {
            duration: 2,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance - 20,
            opacity: 0,
            scale: 0,
            rotation: Math.random() * 360,
            ease: 'power2.out',
            onComplete: () => effect.remove()
        });
    }
}

// 特徴カードホバーエフェクト
function enhanceFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-item');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.6,
                    scale: 1.2,
                    rotation: 5,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                gsap.to(icon, {
                    duration: 0.6,
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
    enhanceFeatureCardEffects();
    handleResponsive();
    
    // ページ全体のローディングアニメーション完了
    gsap.to('body', {
        duration: 0.8,
        opacity: 1,
        ease: 'power2.out'
    });
    
    // ヘッダーの初期アニメーション
    gsap.from('.header', {
        duration: 1.2,
        y: -100,
        ease: 'power3.out'
    });
    
    // 自然要素の浮遊アニメーション
    gsap.utils.toArray('.feature-icon').forEach((icon, index) => {
        gsap.to(icon, {
            duration: 3 + index * 0.5,
            y: -10,
            rotation: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
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

// 自然エフェクト用CSS追加
const style = document.createElement('style');
style.textContent = `
    .nature-glow {
        animation: nature-glow 4s ease-in-out infinite alternate;
    }
    
    @keyframes nature-glow {
        0% { box-shadow: 0 8px 32px rgba(46, 125, 50, 0.2); }
        100% { box-shadow: 0 12px 40px rgba(255, 152, 0, 0.4); }
    }
    
    .leaf-float {
        animation: leaf-float 8s ease-in-out infinite;
    }
    
    @keyframes leaf-float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-15px) rotate(2deg); }
        50% { transform: translateY(-5px) rotate(-1deg); }
        75% { transform: translateY(-10px) rotate(1deg); }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    
    // 自然要素を追加
    const natureElements = document.querySelectorAll('.feature-item, .gallery-card, .review-card');
    natureElements.forEach(el => {
        el.classList.add('nature-glow');
    });
    
    // 特徴アイコンに浮遊効果を追加
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.classList.add('leaf-float');
    });
});