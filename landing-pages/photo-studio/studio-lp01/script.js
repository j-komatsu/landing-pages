// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダースクロール効果
    setupHeaderScroll();
    
    // ヒーローセクションのアニメーション
    initHeroAnimations();
    
    // タイプライター効果
    setupTypewriterEffects();
    
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
    
    // ギャラリーインタラクション
    setupGalleryInteractions();
    
    // IntersectionObserver（AOS代替）
    setupIntersectionObserver();
    
    // SNS風エフェクト
    setupSNSEffects();
});

// ヘッダースクロール効果
function setupHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(150, 47, 191, 0.2)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(150, 47, 191, 0.15)';
        }
    });
}

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // 背景のグラデーション開始
    tl.set('.gradient-bg', { opacity: 0 });
    tl.to('.gradient-bg', { duration: 1.5, opacity: 0.9, ease: 'power2.out' });
    
    // フローティングシェイプのアニメーション
    tl.from('.floating-shapes .shape', {
        duration: 2,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=1');
    
    // ヒーローバッジのアニメーション
    tl.from('.hero-badge', {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=0.5');
    
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
}

// タイプライター効果設定
function setupTypewriterEffects() {
    const impactTexts = [
        { id: 'impact-text-1', text: 'SNSで1000いいね突破者続出！' },
        { id: 'impact-text-2', text: '最新プラン20%オフ開催中' },
        { id: 'impact-text-3', text: '撮影当日に映える投稿完成' }
    ];
    
    impactTexts.forEach((item, index) => {
        const element = document.getElementById(item.id);
        if (element) {
            // 初期状態で空にする
            element.textContent = '';
            
            // ScrollTriggerでタイプライター開始
            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => {
                    typeWriter(element, item.text, 50, index * 500);
                }
            });
        }
    });
    
    // バズタイトルのタイプライター
    const buzzTitle = document.getElementById('buzz-title');
    if (buzzTitle) {
        ScrollTrigger.create({
            trigger: buzzTitle,
            start: 'top 80%',
            onEnter: () => {
                buzzTitle.textContent = '';
                typeWriter(buzzTitle, 'あなたもバズる写真を手に入れよう', 80);
            }
        });
    }
}

// タイプライター関数
function typeWriter(element, text, speed = 50, delay = 0) {
    setTimeout(() => {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }, delay);
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

    // インパクトアイテムのアニメーション
    gsap.utils.toArray('.impact-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 80,
            opacity: 0,
            delay: index * 0.2,
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
            duration: 1.3,
            scale: 0.9,
            y: 60,
            opacity: 0,
            delay: index * 0.2,
            ease: 'back.out(1.7)'
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
            rotationY: 10,
            scale: 0.9,
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
    // プランスライダー
    const plansSwiper = new Swiper('.plans-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.plans-swiper .swiper-pagination',
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
                // スライド変更時のSNS風アニメーション
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    gsap.from(activeSlide.querySelector('.plan-card'), {
                        duration: 1,
                        scale: 0.95,
                        rotationY: 5,
                        opacity: 0.8,
                        ease: 'back.out(1.7)'
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
                // スライド変更時のSNS風アニメーション
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
    // 7日後の時刻を設定
    const endTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // 初回実行と1秒ごとの更新
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ギャラリーインタラクション
function setupGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const likeBtn = item.querySelector('.like-btn');
        const shareBtn = item.querySelector('.share-btn');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // いいねエフェクト
                createLikeEffect(likeBtn);
                
                // ハートアニメーション
                gsap.to(likeBtn, {
                    duration: 0.3,
                    scale: 1.3,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // シェアエフェクト
                createShareEffect(shareBtn);
                
                // シェアアニメーション
                gsap.to(shareBtn, {
                    duration: 0.5,
                    rotation: 360,
                    scale: 1.2,
                    ease: 'back.out(1.7)'
                });
            });
        }
    });
}

// いいねエフェクト
function createLikeEffect(button) {
    const rect = button.getBoundingClientRect();
    const heartCount = 8;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
        `;
        
        document.body.appendChild(heart);
        
        const angle = (i / heartCount) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        
        gsap.to(heart, {
            duration: 2,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance - 30,
            opacity: 0,
            scale: 0,
            rotation: Math.random() * 360,
            ease: 'power2.out',
            onComplete: () => heart.remove()
        });
    }
}

// シェアエフェクト
function createShareEffect(button) {
    const rect = button.getBoundingClientRect();
    const sparkleCount = 6;
    const symbols = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        sparkle.style.cssText = `
            position: fixed;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
        `;
        
        document.body.appendChild(sparkle);
        
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        
        gsap.to(sparkle, {
            duration: 1.5,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance - 20,
            opacity: 0,
            scale: 0,
            rotation: Math.random() * 360,
            ease: 'power2.out',
            onComplete: () => sparkle.remove()
        });
    }
}

// IntersectionObserver（AOS代替）
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // AOS要素を監視
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// SNS風エフェクト
function setupSNSEffects() {
    // ボタンホバーエフェクト強化
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.4,
                scale: 1.05,
                ease: 'power2.out'
            });
            
            // SNSエフェクト
            if (button.classList.contains('pulse-btn')) {
                gsap.to(button, {
                    duration: 0.6,
                    boxShadow: '0 15px 50px rgba(214, 41, 118, 0.6)',
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.4,
                scale: 1,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('click', () => {
            // クリック時のSNSエフェクト
            gsap.to(button, {
                duration: 0.15,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // SNSパーティクルエフェクト
            createSNSEffect(button, event);
        });
    });
}

// SNSエフェクト
function createSNSEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const effectCount = 8;
    const symbols = ['📸', '❤️', '✨', '🔥', '💕', '🌟', '💫', '⭐'];
    
    for (let i = 0; i < effectCount; i++) {
        const effect = document.createElement('div');
        effect.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        effect.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
        `;
        
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

// プランカードホバーエフェクト
function enhancePlanCardEffects() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const tag = card.querySelector('.plan-tag');
            const stats = card.querySelectorAll('.plan-stats span');
            
            if (tag) {
                gsap.to(tag, {
                    duration: 0.5,
                    scale: 1.1,
                    ease: 'back.out(1.7)'
                });
            }
            
            stats.forEach((stat, index) => {
                gsap.to(stat, {
                    duration: 0.6,
                    scale: 1.1,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                });
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const tag = card.querySelector('.plan-tag');
            const stats = card.querySelectorAll('.plan-stats span');
            
            if (tag) {
                gsap.to(tag, {
                    duration: 0.5,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
            
            stats.forEach(stat => {
                gsap.to(stat, {
                    duration: 0.6,
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
    enhancePlanCardEffects();
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
    
    // SNS要素の浮遊アニメーション
    gsap.utils.toArray('.impact-icon').forEach((icon, index) => {
        gsap.to(icon, {
            duration: 3 + index * 0.5,
            y: -15,
            rotation: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3
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

// SNS風エフェクト用CSS追加
const style = document.createElement('style');
style.textContent = `
    .sns-glow {
        animation: sns-glow 4s ease-in-out infinite alternate;
    }
    
    @keyframes sns-glow {
        0% { box-shadow: 0 8px 32px rgba(214, 41, 118, 0.2); }
        100% { box-shadow: 0 15px 50px rgba(150, 47, 191, 0.4); }
    }
    
    .sns-float {
        animation: sns-float 6s ease-in-out infinite;
    }
    
    @keyframes sns-float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(1deg); }
        50% { transform: translateY(-5px) rotate(-1deg); }
        75% { transform: translateY(-8px) rotate(0.5deg); }
    }
    
    .sns-shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .sns-shimmer::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: sns-shimmer 3s ease-in-out infinite;
    }
    
    @keyframes sns-shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    
    // SNS要素を追加
    const snsElements = document.querySelectorAll('.plan-card, .gallery-item, .review-card');
    snsElements.forEach(el => {
        el.classList.add('sns-glow');
    });
    
    // プランカードにシマーエフェクトを追加
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.classList.add('sns-shimmer');
    });
    
    // アイコンに浮遊効果を追加
    const icons = document.querySelectorAll('.impact-icon, .plan-tag');
    icons.forEach(icon => {
        icon.classList.add('sns-float');
    });
});