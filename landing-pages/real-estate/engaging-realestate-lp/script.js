// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 初期化
    initializeApp();
    
    // AOS初期化
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // GSAP初期化
    gsap.registerPlugin(ScrollTrigger);
    
    // 各機能の初期化
    initHeader();
    initCounterAnimation();
    initDiagnosis();
    initVirtualTour();
    initQuiz();
    initLoanSimulator();
    initVideoPlayer();
    initScrollAnimations();
});

// アプリケーション初期化
function initializeApp() {
    console.log('Real Estate LP initialized');
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ヘッダー制御
function initHeader() {
    const header = document.getElementById('header');
    const fixedCtaNav = document.getElementById('fixedCtaNav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // ヘッダーの背景変更
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 固定CTAナビの表示制御
        if (currentScrollY > 500 && currentScrollY < lastScrollY) {
            fixedCtaNav.classList.add('show');
        } else {
            fixedCtaNav.classList.remove('show');
        }
        
        lastScrollY = currentScrollY;
    });
}

// カウンターアニメーション
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// 物件診断機能
function initDiagnosis() {
    let currentStep = 1;
    let totalSteps = 3;
    let diagnosisData = {
        budget: 0,
        location: 0,
        layout: 0
    };
    
    const stepElements = document.querySelectorAll('.diagnosis-step');
    const progressFill = document.getElementById('progressFill');
    const currentStepDisplay = document.getElementById('currentStep');
    
    // 診断オプションのクリック処理
    document.querySelectorAll('.diagnosis-option').forEach(option => {
        option.addEventListener('click', function() {
            const step = this.closest('.diagnosis-step');
            const stepOptions = step.querySelectorAll('.diagnosis-option');
            
            // 選択状態をリセット
            stepOptions.forEach(opt => opt.classList.remove('selected'));
            
            // 現在のオプションを選択
            this.classList.add('selected');
            
            // データを保存
            const stepId = step.id;
            const points = parseInt(this.getAttribute('data-points'));
            
            if (stepId === 'step1') {
                diagnosisData.budget = points;
            } else if (stepId === 'step2') {
                diagnosisData.location = points;
            } else if (stepId === 'step3') {
                diagnosisData.layout = points;
            }
            
            // 次のステップに進む
            setTimeout(() => {
                nextDiagnosisStep();
            }, 500);
        });
    });
    
    function nextDiagnosisStep() {
        if (currentStep < totalSteps) {
            // 現在のステップを非表示
            document.getElementById(`step${currentStep}`).classList.add('hidden');
            
            currentStep++;
            
            // 次のステップを表示
            document.getElementById(`step${currentStep}`).classList.remove('hidden');
            
            // プログレスバー更新
            const progress = (currentStep / totalSteps) * 100;
            progressFill.style.width = `${progress}%`;
            currentStepDisplay.textContent = currentStep;
            
        } else {
            // 診断完了 - 結果を表示
            showDiagnosisResult();
        }
    }
    
    function showDiagnosisResult() {
        // 最後のステップを非表示
        document.getElementById('step3').classList.add('hidden');
        
        // 結果を計算
        const totalPoints = diagnosisData.budget + diagnosisData.location + diagnosisData.layout;
        let recommendedProperty;
        
        if (totalPoints <= 4) {
            recommendedProperty = {
                name: 'コンパクトシティライフ物件',
                description: 'お手頃価格で都心部へのアクセス良好な1LDK物件です。',
                image: 'images/property1.jpg',
                price: '¥18万/月',
                features: ['駅徒歩5分', '1LDK', 'オートロック']
            };
        } else if (totalPoints <= 7) {
            recommendedProperty = {
                name: 'バランス重視のファミリー物件',
                description: '住みやすさと利便性を兼ね備えた2LDK物件です。',
                image: 'images/property2.jpg',
                price: '¥28万/月',
                features: ['2LDK', 'ペット可', '築浅']
            };
        } else {
            recommendedProperty = {
                name: 'プレミアムラグジュアリー物件',
                description: '最高級の設備とサービスを備えた3LDK物件です。',
                image: 'images/property3.jpg',
                price: '¥45万/月',
                features: ['3LDK', '高層階', 'コンシェルジュ']
            };
        }
        
        // 結果を表示
        const resultProperty = document.querySelector('.result-property');
        resultProperty.innerHTML = `
            <div class="property-result">
                <img src="${recommendedProperty.image}" alt="${recommendedProperty.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="font-size: 1.5rem; font-weight: 600; color: var(--primary-dark); margin-bottom: 10px;">${recommendedProperty.name}</h4>
                <p style="color: var(--text-light); margin-bottom: 15px;">${recommendedProperty.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div style="font-size: 1.3rem; font-weight: 700; color: var(--gold-primary);">${recommendedProperty.price}</div>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${recommendedProperty.features.map(feature => `<span style="background: var(--gold-light); color: var(--gold-dark); padding: 4px 12px; border-radius: 15px; font-size: 0.8rem; font-weight: 500;">${feature}</span>`).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('diagnosisResult').classList.remove('hidden');
        
        // プログレスバーを100%に
        progressFill.style.width = '100%';
        currentStepDisplay.textContent = '完了';
    }
    
    // 診断をリスタート
    window.restartDiagnosis = function() {
        currentStep = 1;
        diagnosisData = { budget: 0, location: 0, layout: 0 };
        
        // すべてのステップをリセット
        stepElements.forEach((step, index) => {
            if (index === 0) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
            
            // 選択状態をリセット
            step.querySelectorAll('.diagnosis-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        });
        
        // 結果を非表示
        document.getElementById('diagnosisResult').classList.add('hidden');
        
        // プログレスバーをリセット
        progressFill.style.width = '33.33%';
        currentStepDisplay.textContent = '1';
    };
}

// バーチャル見学機能
function initVirtualTour() {
    const rooms = {
        living: {
            name: 'リビング・ダイニング',
            description: '20畳の広々としたLDK。南向きの大きな窓から自然光がたっぷり入ります。',
            image: 'images/room360.jpg'
        },
        bedroom: {
            name: '寝室',
            description: '静かで落ち着いた寝室。クローゼットも充実しており、収納力抜群です。',
            image: 'images/room360-bedroom.jpg'
        },
        kitchen: {
            name: 'キッチン',
            description: 'IHコンロとカウンターを備えた機能的なキッチン。料理が楽しくなります。',
            image: 'images/room360-kitchen.jpg'
        },
        bathroom: {
            name: 'バスルーム',
            description: '広々とした浴室で一日の疲れをリフレッシュ。洗面台も使いやすい設計です。',
            image: 'images/room360-bathroom.jpg'
        }
    };
    
    window.switchRoom = function(roomKey) {
        const room = rooms[roomKey];
        if (!room) return;
        
        // ボタンの状態を更新
        document.querySelectorAll('.room-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-room="${roomKey}"]`).classList.add('active');
        
        // 部屋情報を更新
        const roomInfo = document.getElementById('currentRoomInfo');
        roomInfo.querySelector('h4').textContent = room.name;
        roomInfo.querySelector('p').textContent = room.description;
        
        // 画像を更新（実際の実装では3D表示）
        const tourImage = document.getElementById('tourImage');
        tourImage.src = room.image;
        tourImage.alt = `${room.name}の360度ビュー`;
    };
    
    window.start360Tour = function() {
        alert('360°バーチャル見学機能の詳細実装はThree.jsを使用してください。現在はデモ表示中です。');
        // 実際の実装では Three.js を使用して3D空間を表示
    };
}

// 間取りクイズ機能
function initQuiz() {
    const quizData = [
        {
            question: "この間取りの部屋数は？",
            image: "images/floorplan-quiz1.jpg",
            options: ["1LDK", "2LDK", "3LDK", "4LDK"],
            correct: 1,
            explanation: "この間取りは2LDKです。リビング・ダイニング・キッチンに加えて、寝室が2部屋あります。"
        },
        {
            question: "この物件のバルコニーはどこにある？",
            image: "images/floorplan-quiz2.jpg",
            options: ["北側", "南側", "東側", "西側"],
            correct: 1,
            explanation: "バルコニーは南側にあります。日当たりが良く、洗濯物を干すのに最適です。"
        },
        {
            question: "この間取りの特徴は？",
            image: "images/floorplan-quiz3.jpg",
            options: ["ウォークインクローゼット", "カウンターキッチン", "和室あり", "すべて"],
            correct: 3,
            explanation: "この物件にはウォークインクローゼット、カウンターキッチン、和室のすべてが備わっています。"
        },
        {
            question: "この物件の玄関の位置は？",
            image: "images/floorplan-quiz4.jpg",
            options: ["右下", "左下", "右上", "左上"],
            correct: 0,
            explanation: "玄関は右下に位置しています。廊下がしっかりと確保されており、プライバシーに配慮された設計です。"
        },
        {
            question: "この間取りの総面積は約何㎡？",
            image: "images/floorplan-quiz5.jpg",
            options: ["45㎡", "65㎡", "85㎡", "105㎡"],
            correct: 2,
            explanation: "この間取りは約85㎡です。3LDKとしては標準的な広さで、ファミリーでも快適に住めます。"
        }
    ];
    
    let currentQuiz = 0;
    let score = 0;
    let answered = false;
    
    function showQuiz(index) {
        const quiz = quizData[index];
        
        document.getElementById('quizTitle').textContent = quiz.question;
        document.getElementById('quizImage').src = quiz.image;
        document.getElementById('quizImage').alt = `間取り図クイズ${index + 1}`;
        document.getElementById('quizCurrent').textContent = index + 1;
        document.getElementById('quizTotal').textContent = quizData.length;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        quiz.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.setAttribute('data-answer', optionIndex);
            button.addEventListener('click', () => answerQuiz(optionIndex, quiz.correct));
            optionsContainer.appendChild(button);
        });
        
        // 結果を非表示
        document.getElementById('quizResult').classList.add('hidden');
        answered = false;
    }
    
    function answerQuiz(selectedAnswer, correctAnswer) {
        if (answered) return;
        answered = true;
        
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            if (index === correctAnswer) {
                option.classList.add('correct');
            } else if (index === selectedAnswer && index !== correctAnswer) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
        // 結果を表示
        const resultIcon = document.getElementById('resultIcon');
        const resultMessage = document.getElementById('resultMessage');
        const quizExplanation = document.getElementById('quizExplanation');
        const nextBtn = document.getElementById('quizNextBtn');
        
        if (selectedAnswer === correctAnswer) {
            score++;
            resultIcon.textContent = '🎉';
            resultMessage.textContent = '正解です！';
        } else {
            resultIcon.textContent = '😅';
            resultMessage.textContent = '不正解です';
        }
        
        quizExplanation.textContent = quizData[currentQuiz].explanation;
        
        if (currentQuiz < quizData.length - 1) {
            nextBtn.textContent = '次の問題';
        } else {
            nextBtn.textContent = '結果を見る';
        }
        
        document.getElementById('quizResult').classList.remove('hidden');
    }
    
    window.nextQuiz = function() {
        if (currentQuiz < quizData.length - 1) {
            currentQuiz++;
            showQuiz(currentQuiz);
        } else {
            showFinalResult();
        }
    };
    
    function showFinalResult() {
        document.getElementById('quizResult').classList.add('hidden');
        
        const finalScore = document.getElementById('finalScore');
        const scoreMessage = document.getElementById('scoreMessage');
        
        finalScore.textContent = score;
        
        if (score === quizData.length) {
            scoreMessage.textContent = 'パーフェクト！間取りマスターですね！';
        } else if (score >= quizData.length * 0.8) {
            scoreMessage.textContent = '素晴らしい結果です！';
        } else if (score >= quizData.length * 0.6) {
            scoreMessage.textContent = 'よくできました！';
        } else {
            scoreMessage.textContent = 'もう少し勉強しましょう！';
        }
        
        document.getElementById('quizFinalResult').classList.remove('hidden');
    }
    
    window.restartQuiz = function() {
        currentQuiz = 0;
        score = 0;
        answered = false;
        
        document.getElementById('quizFinalResult').classList.add('hidden');
        showQuiz(0);
    };
    
    // 初期化
    showQuiz(0);
}

// ローンシミュレーター
function initLoanSimulator() {
    const inputs = {
        loanAmount: document.getElementById('loanAmount'),
        downPayment: document.getElementById('downPayment'),
        loanTerm: document.getElementById('loanTerm'),
        interestRate: document.getElementById('interestRate')
    };
    
    const displays = {
        loanAmount: document.getElementById('loanAmountDisplay'),
        downPayment: document.getElementById('downPaymentDisplay'),
        loanTerm: document.getElementById('loanTermDisplay'),
        interestRate: document.getElementById('interestRateDisplay')
    };
    
    const results = {
        monthlyPayment: document.getElementById('monthlyPayment'),
        totalPayment: document.getElementById('totalPayment'),
        totalInterest: document.getElementById('totalInterest')
    };
    
    let chart;
    
    // 入力値の変更監視
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', function() {
            displays[key].textContent = this.value;
            calculateLoan();
        });
    });
    
    function calculateLoan() {
        const propertyPrice = parseInt(inputs.loanAmount.value) * 10000; // 万円を円に変換
        const downPayment = parseInt(inputs.downPayment.value) * 10000;
        const principal = propertyPrice - downPayment;
        const years = parseInt(inputs.loanTerm.value);
        const annualRate = parseFloat(inputs.interestRate.value) / 100;
        
        if (principal <= 0) {
            results.monthlyPayment.textContent = '0';
            results.totalPayment.textContent = '0万円';
            results.totalInterest.textContent = '0万円';
            return;
        }
        
        const monthlyRate = annualRate / 12;
        const numberOfPayments = years * 12;
        
        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = principal / numberOfPayments;
        } else {
            monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }
        
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;
        
        // 結果を表示
        results.monthlyPayment.textContent = Math.floor(monthlyPayment).toLocaleString();
        results.totalPayment.textContent = Math.floor((totalPayment + downPayment) / 10000).toLocaleString() + '万円';
        results.totalInterest.textContent = Math.floor(totalInterest / 10000).toLocaleString() + '万円';
        
        // チャートを更新
        updateLoanChart(principal / 10000, totalInterest / 10000);
    }
    
    function updateLoanChart(principal, interest) {
        const ctx = document.getElementById('loanChart').getContext('2d');
        
        if (chart) {
            chart.destroy();
        }
        
        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['元本', '利息'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ['#D4AF37', '#F7E7CE'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 初期計算
    calculateLoan();
}

// 動画プレーヤー
function initVideoPlayer() {
    window.loadYouTubeVideo = function() {
        const container = document.getElementById('videoContainer');
        const thumbnail = document.querySelector('.video-thumbnail');
        
        // デモ用のYouTube埋め込み（実際のVideo IDに変更してください）
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        container.appendChild(iframe);
        container.classList.remove('hidden');
        thumbnail.style.display = 'none';
    };
}

// スクロールアニメーション
function initScrollAnimations() {
    // Hero統計のカウントアップ
    gsap.from('.stat-number', {
        textContent: 0,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 },
        scrollTrigger: {
            trigger: '.hero-stats',
            start: 'top 80%'
        }
    });
    
    // セクションタイトルのアニメーション
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%'
            }
        });
    });
    
    // プロパティカードのアニメーション
    gsap.utils.toArray('.property-card').forEach((card, index) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%'
            }
        });
    });
}

// ユーティリティ関数
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// モーダル制御
function openReservationModal() {
    document.getElementById('reservationModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    document.getElementById('reservationModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// 予約フォーム送信
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // 実際の実装では、ここでサーバーにデータを送信
            console.log('予約データ:', data);
            
            // 成功メッセージを表示
            alert('予約申込を受け付けました。担当者より24時間以内にご連絡いたします。');
            
            // モーダルを閉じる
            closeReservationModal();
            
            // フォームをリセット
            form.reset();
        });
    }
});

// モバイルメニュー制御
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
});

// パフォーマンス監視
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Real Estate LP loaded in ${Math.round(loadTime)}ms`);
    
    // Intersection Observer for lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// リサイズ処理
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // レスポンシブ対応の再計算
        if (typeof chart !== 'undefined' && chart) {
            chart.resize();
        }
    }, 250);
});