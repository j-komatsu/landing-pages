// スクロールアニメーション
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.scroll-animation');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// スクロールイベントリスナー
window.addEventListener('scroll', handleScrollAnimation);

// 初期表示時の処理
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimation();
    handleHeaderTransparency();
});

// スムーススクロール
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error('Target element not found for smooth scrolling');
        }
    });
});

// ヘッダーの透明度制御
function handleHeaderTransparency() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
    }
}

window.addEventListener('scroll', handleHeaderTransparency);

// ボタンクリック時のダイアログ表示
function initializeButtons() {
    const buttons = [
        { id: 'freeRequestButton', message: '資料請求機能は現在実装されていません。申し訳ございません。' },
        { id: 'demoButton', message: 'デモ機能は現在実装されていません。申し訳ございません。' },
        { id: 'freeRequestButton2', message: '資料請求機能は現在実装されていません。申し訳ございません。' },
        { id: 'onlineDemoButton', message: 'オンラインデモ機能は現在実装されていません。申し訳ございません。' }
    ];

    buttons.forEach(({ id, message }) => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                alert(message);
            });
        } else {
            console.warn(`Button with id '${id}' not found`);
        }
    });
}

// 初期化処理
document.addEventListener('DOMContentLoaded', initializeButtons);
