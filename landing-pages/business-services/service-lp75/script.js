// GSAPアニメーション設定
gsap.registerPlugin(ScrollTrigger);

// カウントダウン設定（ここを変更してください）
const ANNOUNCEMENT_DATE = new Date('2030-12-24T12:00:00+09:00'); // 2030年12月24日12:00（日本時間）

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // パーティクル背景初期化
    initParticles();
    
    // ヒーローセクションのアニメーション
    initHeroAnimations();
    
    // カウントダウンタイマー開始
    startCountdown();
    
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

// パーティクル背景エフェクト
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    // キャンバスサイズ設定
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // パーティクル配列
    const particles = [];
    const particleCount = 100;
    
    // パーティクル生成
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            color: Math.random() > 0.5 ? '#00C9FF' : '#FF1744'
        });
    }
    
    // アニメーション関数
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // パーティクル移動
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // 境界チェック
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // パーティクル描画
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            
            // グロー効果
            ctx.shadowBlur = 20;
            ctx.shadowColor = particle.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // 接続線を描画
        drawConnections();
        
        requestAnimationFrame(animateParticles);
    }
    
    // パーティクル接続線
    function drawConnections() {
        particles.forEach((particle, index) => {
            for (let i = index + 1; i < particles.length; i++) {
                const otherParticle = particles[i];
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) + 
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    const opacity = 1 - (distance / 100);
                    ctx.strokeStyle = `rgba(0, 201, 255, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            }
        });
    }
    
    animateParticles();
}

// ヒーローセクションのアニメーション
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // サービス名のアニメーション
    tl.from('.service-name', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power2.out'
    });
    
    // タイトルのアニメーション
    tl.from('.hero-title', {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=0.5');
    
    // カウントダウンのアニメーション
    tl.from('.countdown-container', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.3');
    
    // ボタンのアニメーション
    tl.from('.hero-buttons .btn', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.2');
}

// カウントダウンタイマー
function startCountdown() {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = ANNOUNCEMENT_DATE.getTime() - now;
        
        if (distance < 0) {
            // カウントダウン終了
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // ミニカウントダウンも更新
            document.getElementById('mini-days').textContent = '00';
            document.getElementById('mini-hours').textContent = '00';
            document.getElementById('mini-minutes').textContent = '00';
            document.getElementById('mini-seconds').textContent = '00';
            
            return;
        }
        
        // 時間計算
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // メインカウントダウン更新
        updateTimeValue('days', days);
        updateTimeValue('hours', hours);
        updateTimeValue('minutes', minutes);
        updateTimeValue('seconds', seconds);
        
        // ミニカウントダウン更新
        document.getElementById('mini-days').textContent = String(days).padStart(2, '0');
        document.getElementById('mini-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('mini-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('mini-seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    function updateTimeValue(id, value) {
        const element = document.getElementById(id);
        const newValue = String(value).padStart(2, '0');
        
        if (element.textContent !== newValue) {
            // 数値変更時のアニメーション
            gsap.to(element, {
                duration: 0.3,
                scale: 1.2,
                ease: 'power2.out',
                onComplete: () => {
                    element.textContent = newValue;
                    gsap.to(element, {
                        duration: 0.3,
                        scale: 1,
                        ease: 'power2.out'
                    });
                }
            });
        }
    }
    
    // 1秒ごとに更新
    updateCountdown();
    setInterval(updateCountdown, 1000);
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
            duration: 1.2,
            y: 50,
            opacity: 0,
            scale: 0.8,
            ease: 'back.out(1.7)'
        });
    });

    // 統計アイテムのアニメーション
    gsap.utils.toArray('.stat-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 80,
            opacity: 0,
            scale: 0.8,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });

    // フィーチャーカードのアニメーション
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotation: index % 2 === 0 ? -5 : 5,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // 顧客ロゴのアニメーション
    gsap.utils.toArray('.customer-logo').forEach((logo, index) => {
        gsap.from(logo, {
            scrollTrigger: {
                trigger: logo,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // 登録特典のアニメーション
    gsap.utils.toArray('.benefit-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            x: -50,
            opacity: 0,
            delay: index * 0.2,
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
            y: 30,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
}

// カウンターアニメーション
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
            duration: 2.5,
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
    // フィーチャースライダー
    const featuresSwiper = new Swiper('.features-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.features-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.features-swiper .swiper-button-next',
            prevEl: '.features-swiper .swiper-button-prev',
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
                    gsap.from(activeSlide.querySelector('.feature-card'), {
                        duration: 0.8,
                        scale: 0.9,
                        opacity: 0,
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
                    duration: 0.5,
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
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    ease: 'back.out(1.7)'
                });
            } else {
                gsap.to(fixedCTA, {
                    duration: 0.3,
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

// ボタンホバーエフェクト強化
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .fixed-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
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
        
        button.addEventListener('click', () => {
            // クリック時のエフェクト
            gsap.to(button, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // リップル効果
            createRippleEffect(button, event);
        });
    });
}

// リップルエフェクト
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
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
    document.querySelectorAll('.feature-card, .stat-item, .benefit-item').forEach(el => {
        observer.observe(el);
    });
}

// CSSアニメーション用のキーフレーム追加
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', optimizeAnimations);