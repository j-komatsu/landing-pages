// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ページローディング処理
    initLoading();
    
    // ナビゲーション処理
    initNavigation();
    
    // Hero セクション処理
    initHero();
    
    // スクロールアニメーション
    initScrollAnimations();
    
    // TikTok風縦スライダー
    initVerticalSlider();
    
    // ギャラリー処理
    initGallery();
    
    // SNSシェア機能
    initSNSShare();
    
    // 参加者の声スライダー
    initVoicesSlider();
    
    // カウントダウン機能
    initCountdown();
    
    // 固定CTAボタン
    initStickyCTA();
    
    // パーティクルエフェクト
    initParticles();
    
    // スムーススクロール
    initSmoothScroll();
});

// ページローディング処理
function initLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // 3秒後にローディング画面をフェードアウト
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // フェードアウト完了後に要素を削除
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // Hero アニメーション開始
            startHeroAnimation();
        }, 600);
    }, 3000);
}

// ナビゲーション処理
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // スクロール時のヘッダー背景変更
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // モバイルメニュートグル
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // ナビリンククリック時にメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Hero セクション処理
function initHero() {
    // 背景動画の自動再生エラー対策
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.play().catch(e => {
            console.log('Video autoplay failed:', e);
        });
    }
}

// Hero アニメーション開始
function startHeroAnimation() {
    const tl = gsap.timeline();
    
    // タイトルアニメーション
    tl.from('.title-line', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-cta .cta-btn', {
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .from('.scroll-down', {
        duration: 0.5,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.2');
}

// スクロールアニメーション
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // セクションタイトルのアニメーション
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // ギャラリーアイテムのアニメーション
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // 参加者の声カードのアニメーション
    gsap.utils.toArray('.voice-card').forEach((card, index) => {
        gsap.from(card, {
            duration: 0.6,
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// TikTok風縦スライダー
function initVerticalSlider() {
    const verticalSwiper = new Swiper('.vertical-swiper', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 20,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        effect: 'slide',
        speed: 800,
        on: {
            slideChange: function() {
                // スライド変更時に動画を再生
                const videos = document.querySelectorAll('.highlight-video');
                videos.forEach((video, index) => {
                    if (index === this.activeIndex) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            init: function() {
                // 初期化時に最初の動画を再生
                const firstVideo = document.querySelector('.swiper-slide-active .highlight-video');
                if (firstVideo) {
                    firstVideo.play();
                }
            }
        }
    });
}

// ギャラリー処理
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // フィルターボタンのクリック処理
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // アクティブクラスの切り替え
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // ギャラリーアイテムのフィルタリング
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    gsap.to(item, {
                        duration: 0.5,
                        scale: 1,
                        opacity: 1,
                        display: 'block',
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(item, {
                        duration: 0.3,
                        scale: 0.8,
                        opacity: 0,
                        ease: 'power2.in',
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // ギャラリーアイテムのホバーエフェクト
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(img, {
                duration: 0.3,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(img, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

// SNSシェア機能
function initSNSShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const snsRewards = document.getElementById('snsRewards');
    const shareBtn = document.getElementById('shareBtn');
    
    // シェアボタンのクリック処理
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('限界のその先へ！モータースポーツ・カスタムカー祭り2025 #カスタム祭り #モータースポーツ #限界突破');
            
            let shareUrl = '';
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                    break;
                case 'instagram':
                    // Instagram は直接シェアできないため、アプリを開く
                    alert('Instagramアプリで #カスタム祭り をつけて投稿してください！');
                    return;
                case 'tiktok':
                    alert('TikTokアプリで #カスタム祭り をつけて動画投稿してください！');
                    return;
                case 'youtube':
                    alert('YouTubeで #カスタム祭り をつけて動画投稿してください！');
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=550,height=420');
            }
            
            // 特典表示
            showRewards();
        });
    });
    
    // Heroセクションのシェアボタン
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('限界のその先へ！モータースポーツ・カスタムカー祭り2025 #カスタム祭り #モータースポーツ #限界突破');
            const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            
            window.open(shareUrl, '_blank', 'width=550,height=420');
            showRewards();
        });
    }
    
    function showRewards() {
        if (snsRewards) {
            snsRewards.classList.add('show');
            
            // アニメーション効果
            gsap.from(snsRewards, {
                duration: 0.6,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            });
        }
    }
}

// 参加者の声スライダー
function initVoicesSlider() {
    const voicesSwiper = new Swiper('.voices-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
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
        speed: 600,
        effect: 'slide'
    });
}

// カウントダウン機能
function initCountdown() {
    const targetDate = new Date('2099-12-31T23:59:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        } else {
            // イベント開始後
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }
    
    // 初回実行と1秒ごとの更新
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 固定CTAボタン
function initStickyCTA() {
    const stickyCta = document.getElementById('stickyCta');
    
    // スクロール位置に応じて表示/非表示
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            stickyCta.classList.add('show');
        } else {
            stickyCta.classList.remove('show');
        }
    });
}

// パーティクルエフェクト
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${['#FFEB3B', '#00FFAB', '#00FFFF', '#FF0080'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.7;
        `;
        
        particlesContainer.appendChild(particle);
        
        // GSAP でパーティクルアニメーション
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
        });
        
        gsap.to(particle, {
            duration: Math.random() * 10 + 5,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 360,
            repeat: -1,
            yoyo: true,
            ease: 'none'
        });
        
        // フェードイン・アウト効果
        gsap.to(particle, {
            duration: Math.random() * 3 + 2,
            opacity: Math.random() * 0.5 + 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
}

// スムーススクロール
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: targetPosition, autoKill: false },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

// Intersection Observer for lazy loading and animations
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            
            // 遅延読み込み画像
            if (target.tagName === 'IMG' && target.hasAttribute('loading')) {
                target.src = target.dataset.src || target.src;
                target.removeAttribute('loading');
            }
            
            // 動画の自動再生
            if (target.tagName === 'VIDEO') {
                target.play().catch(e => console.log('Video play failed:', e));
            }
            
            // アニメーション トリガー
            if (target.classList.contains('animate-on-scroll')) {
                target.classList.add('animated');
            }
            
            observer.unobserve(target);
        }
    });
}, observerOptions);

// 監視対象要素の登録
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('img[loading], video, .animate-on-scroll');
    targets.forEach(target => observer.observe(target));
});

// ページビジビリティAPI - タブが非アクティブになったら動画を停止
document.addEventListener('visibilitychange', () => {
    const videos = document.querySelectorAll('video');
    
    if (document.hidden) {
        videos.forEach(video => video.pause());
    } else {
        // アクティブなスライドの動画のみ再生
        const activeVideo = document.querySelector('.swiper-slide-active video, .hero-video');
        if (activeVideo) {
            activeVideo.play().catch(e => console.log('Video play failed:', e));
        }
    }
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// パフォーマンス監視
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // 必要に応じてアナリティクスに送信
    // analytics.track('page_load_time', { time: loadTime });
});

// リサイズ処理
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // パーティクル位置の再計算
        const particles = document.querySelectorAll('#particles > div');
        particles.forEach(particle => {
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            });
        });
    }, 250);
});