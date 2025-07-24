// MetaCity 2049 - Virtual Reality LP JavaScript
// Three.js + GSAP + 3D Effects + Holographic Interface

// グローバル変数
let scene, camera, renderer, particles;
let isLoaded = false;

// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 初期化処理
    initializeMetaCity();
    
    // ナビゲーション機能
    initNavigation();
    
    // Three.js 3Dパーティクル初期化
    initParticleSystem();
    
    // GSAP ScrollTrigger初期化
    initScrollAnimations();
    
    // インタラクティブ要素
    initInteractiveElements();
    
    // カウントダウン機能（超未来設定）
    initCountdown();
    
    // FAQ機能
    initFAQ();
    
    // 統計カウンター
    initStatsCounter();
    
    // カスタムカーソル
    initCustomCursor();
    
    // ガラスモーフィズムエフェクト
    initGlassMorphism();
    
    // 量子ボタンエフェクト
    initQuantumButtons();
});

// MetaCity初期化
function initializeMetaCity() {
    // GSAPプラグイン登録
    gsap.registerPlugin(ScrollTrigger);
    
    // 初期ローディングアニメーション
    const tl = gsap.timeline();
    
    tl.from('.glass-nav', {
        duration: 1.2,
        y: -100,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.portal-content', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=0.8')
    .from('.dimension-scroll', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.5');
    
    // ホログラムスキャンライン開始
    startHologramScan();
}

// ナビゲーション機能
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // モバイルメニュートグル
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // アニメーション
        if (navMenu.classList.contains('active')) {
            gsap.from('.nav-link', {
                duration: 0.5,
                x: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    });
    
    // スムーススクロール
    navLinks.forEach(link => {
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
                
                // モバイルメニューを閉じる
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // ナビゲーションスクロール効果
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('mainNav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Three.js 3Dパーティクルシステム
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    // シーン作成
    scene = new THREE.Scene();
    
    // カメラ設定
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // レンダラー設定
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // パーティクル作成
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorPalette = [
        new THREE.Color(0x00ffff), // ホログラム青
        new THREE.Color(0x8a2be2), // サイバー紫
        new THREE.Color(0x00ff41), // 量子緑
        new THREE.Color(0xff1493)  // ネオンピンク
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // 位置をランダム設定
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        // 色をランダム設定
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // サイズ設定
        sizes[i] = Math.random() * 5 + 1;
    }
    
    // ジオメトリ作成
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // マテリアル作成
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 }
        },
        vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                
                // 時間に基づく動的効果
                mvPosition.y += sin(time + position.x * 0.1) * 0.5;
                mvPosition.x += cos(time + position.y * 0.1) * 0.3;
                
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                float distance = length(gl_PointCoord - vec2(0.5));
                if (distance > 0.5) discard;
                
                float alpha = 1.0 - (distance * 2.0);
                gl_FragColor = vec4(vColor, alpha);
            }
        `,
        transparent: true,
        vertexColors: true
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // アニメーションループ開始
    animateParticles();
}

// パーティクルアニメーション
function animateParticles() {
    const time = Date.now() * 0.001;
    
    if (particles && particles.material.uniforms) {
        particles.material.uniforms.time.value = time;
        particles.rotation.y = time * 0.1;
        particles.rotation.x = time * 0.05;
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
}

// スクロールアニメーション
function initScrollAnimations() {
    // セクションタイトルアニメーション
    gsap.utils.toArray('.dimensional-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            rotationY: 45,
            ease: 'back.out(1.7)'
        });
    });
    
    // 体験カードのスタッガーアニメーション
    gsap.utils.toArray('.floating-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            y: 100,
            opacity: 0,
            rotationX: 45,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });
    
    // 住民証言カードアニメーション
    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            ease: 'power2.out'
        });
    });
    
    // 都市ノードアニメーション
    gsap.utils.toArray('.district-node').forEach((node, index) => {
        gsap.from(node, {
            scrollTrigger: {
                trigger: node,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            scale: 0,
            opacity: 0,
            delay: index * 0.3,
            ease: 'back.out(2)'
        });
    });
}

// インタラクティブ要素
function initInteractiveElements() {
    // ポータルボタン
    const enterBtn = document.getElementById('enterMetacity');
    const watchBtn = document.getElementById('watchIntro');
    
    enterBtn?.addEventListener('click', () => {
        createQuantumEffect(enterBtn);
        // ここに仮想都市探索ロジック
        showPortalMessage('仮想都市へのアクセスを準備中...');
    });
    
    watchBtn?.addEventListener('click', () => {
        createQuantumEffect(watchBtn);
        // 動画再生処理
        playIntroVideo();
    });
    
    // 体験開始ボタン
    const startBtn = document.getElementById('startExperience');
    startBtn?.addEventListener('click', () => {
        createQuantumEffect(startBtn);
        showPortalMessage('72時間無料体験を開始します...');
    });
    
    // 固定ポータルボタン
    const fixedPortal = document.getElementById('fixedPortal');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            fixedPortal.classList.add('visible');
        } else {
            fixedPortal.classList.remove('visible');
        }
    });
}

// カウントダウン機能（超未来設定）
function initCountdown() {
    // 2099年12月31日 23:59:00に設定
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
            
            // 数字変更時のエフェクト
            animateTimeChange();
        }
    }
    
    // 1秒ごとに更新
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ機能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 全てのFAQを閉じる
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // クリックしたFAQが閉じていた場合は開く
            if (!isActive) {
                item.classList.add('active');
                
                // 量子エフェクト付きアニメーション
                gsap.from(item.querySelector('.faq-answer'), {
                    duration: 0.8,
                    height: 0,
                    opacity: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// 統計カウンター
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        // スクロール時に開始
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: updateCounter
        });
    });
}

// カスタムカーソル
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const cursorInner = cursor?.querySelector('.cursor-inner');
    const cursorOuter = cursor?.querySelector('.cursor-outer');
    
    if (!cursor) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        if (cursor) {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // ホバー効果
    const interactiveElements = document.querySelectorAll('button, a, .quantum-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ガラスモーフィズムエフェクト
function initGlassMorphism() {
    const glassElements = document.querySelectorAll('.glass-card, .glass-nav');
    
    glassElements.forEach(element => {
        // マウス追従効果
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(element, {
                duration: 0.3,
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                duration: 0.5,
                rotationX: 0,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    });
}

// 量子ボタンエフェクト
function initQuantumButtons() {
    const quantumBtns = document.querySelectorAll('.quantum-btn');
    
    quantumBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            createQuantumEffect(btn, e);
        });
        
        // ホバーエフェクト
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(0, 255, 255, 0.5)',
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 5px 15px rgba(0, 255, 255, 0.3)',
                ease: 'power2.out'
            });
        });
    });
}

// 量子エフェクト作成
function createQuantumEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const x = event ? event.clientX : rect.left + rect.width / 2;
    const y = event ? event.clientY : rect.top + rect.height / 2;
    
    // エネルギー波作成
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #00ffff, #8a2be2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 10px #00ffff;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        
        gsap.to(particle, {
            duration: 1,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

// ホログラムスキャン開始
function startHologramScan() {
    const scanline = document.querySelector('.hologram-scanline');
    if (scanline) {
        gsap.to(scanline, {
            duration: 3,
            y: '100vh',
            repeat: -1,
            ease: 'none'
        });
    }
}

// 時間変更アニメーション
function animateTimeChange() {
    const timeValues = document.querySelectorAll('.time-value');
    timeValues.forEach(value => {
        gsap.from(value, {
            duration: 0.3,
            scale: 1.2,
            color: '#00ffff',
            ease: 'back.out(1.7)'
        });
    });
}

// ポータルメッセージ表示
function showPortalMessage(message) {
    // 一時的なメッセージ表示
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #00ffff;
        padding: 20px 40px;
        border-radius: 10px;
        border: 1px solid #00ffff;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        text-align: center;
        backdrop-filter: blur(10px);
    `;
    messageEl.textContent = message;
    document.body.appendChild(messageEl);
    
    gsap.from(messageEl, {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    setTimeout(() => {
        gsap.to(messageEl, {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: 'back.in(1.7)',
            onComplete: () => messageEl.remove()
        });
    }, 3000);
}

// 体験動画再生
function playIntroVideo() {
    // YouTube動画エリアにスクロール
    const videoSection = document.querySelector('.virtual-tour');
    if (videoSection) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: videoSection,
                offsetY: 80
            },
            ease: 'power2.inOut'
        });
    }
}

// リサイズ対応
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    ScrollTrigger.refresh();
});

// パフォーマンス最適化
window.addEventListener('beforeunload', () => {
    if (renderer) {
        renderer.dispose();
    }
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('MetaCity Error:', e.error);
});

// 初期化完了
console.log('MetaCity 2049 Initialized - Welcome to the Future');