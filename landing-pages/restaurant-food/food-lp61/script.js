// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
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
    
    // 固定情報バーの表示制御
    setupFixedInfo();
});

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    // ヒーローコンテンツのふんわりフェードイン
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.store-info > *', {
        duration: 1.2,
        y: 20,
        opacity: 0,
        stagger: 0.3,
        ease: 'power2.out',
        delay: 0.5
    });
    
    gsap.from('.contact-info > *', {
        duration: 1,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 1.2
    });
}

// スクロール時のアニメーション
function setupScrollAnimations() {
    // セクションタイトルの静かなスライドイン
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    });

    // メニューアイテムのふんわりフェードイン
    gsap.utils.toArray('.menu-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 40,
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
            duration: 0.8,
            y: 30,
            opacity: 0,
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
            duration: 0.6,
            y: 20,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // アクセス情報のアニメーション
    gsap.from('.access-info', {
        scrollTrigger: {
            trigger: '.access-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -30,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.access-map', {
        scrollTrigger: {
            trigger: '.access-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });

    // お知らせセクションのアニメーション
    gsap.from('.notice-content > *', {
        scrollTrigger: {
            trigger: '.notice-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
}

// Swiperスライダー初期化
function initializeSwiper() {
    // 店内風景スライダー
    const interiorSwiper = new Swiper('.interior-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.interior-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.interior-swiper .swiper-button-next',
            prevEl: '.interior-swiper .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            }
        },
        // スライド変更時の控えめなアニメーション
        on: {
            slideChange: function() {
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    gsap.from(activeSlide.querySelector('img'), {
                        duration: 0.8,
                        scale: 1.05,
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
                        duration: 0.6,
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
                
                // 開くアニメーション（控えめ）
                gsap.from(item.querySelector('.faq-answer p'), {
                    duration: 0.5,
                    y: -10,
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
                // 固定情報バーの高さを考慮してオフセットを設定
                const offset = window.innerWidth <= 768 ? 150 : 80;
                
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: targetElement,
                        offsetY: offset
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

// 固定情報バーの表示制御
function setupFixedInfo() {
    const fixedInfo = document.querySelector('.fixed-info');
    const hero = document.querySelector('.hero');
    
    // ヒーロー通過後に固定バーを表示
    ScrollTrigger.create({
        trigger: hero,
        start: 'bottom bottom',
        end: 'bottom bottom',
        onToggle: self => {
            if (self.isActive) {
                gsap.to(fixedInfo, {
                    duration: 0.5,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(fixedInfo, {
                    duration: 0.3,
                    y: 100,
                    opacity: 0,
                    ease: 'power2.in'
                });
            }
        }
    });
    
    // 初期状態では非表示
    gsap.set(fixedInfo, {
        y: 100,
        opacity: 0
    });
}

// ボタンホバーエフェクト（控えめ）
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.02,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

// メニューアイテムのホバーエフェクト
function enhanceMenuEffects() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('img'), {
                duration: 0.4,
                scale: 1.02,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('img'), {
                duration: 0.4,
                scale: 1,
                ease: 'power2.out'
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

// 営業時間の表示更新
function updateBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0: 日曜, 2: 火曜
    
    const fixedHours = document.querySelector('.fixed-hours span');
    
    if (day === 2) { // 火曜日（定休日）
        fixedHours.textContent = '本日は定休日です';
        fixedHours.style.color = '#B71C1C';
    } else {
        const isLunchTime = hour >= 11 && hour < 15;
        const isDinnerTime = hour >= 17 && hour < 21;
        
        if (isLunchTime || isDinnerTime) {
            fixedHours.textContent = '営業中：11:00-15:00, 17:00-21:00';
            fixedHours.style.color = '#FFFFFF';
        } else {
            fixedHours.textContent = '営業時間：11:00-15:00, 17:00-21:00';
            fixedHours.style.color = '#FFF8DC';
        }
    }
}

// 初期化完了後の追加設定
window.addEventListener('load', () => {
    enhanceButtonEffects();
    enhanceMenuEffects();
    handleResponsive();
    updateBusinessHours();
    
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
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    document.querySelectorAll('.menu-item, .voice-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', optimizeAnimations);