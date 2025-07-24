// Initialize GSAP and animations
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSwiper();
    initializeBeforeAfter();
    initializeFAQ();
    initializeCountdown();
    initializeIntersectionObserver();
});

// GSAP Animations
function initializeAnimations() {
    // Hero animations
    gsap.timeline()
        .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power2.out' })
        .from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.8')
        .from('.hero-tags .tag', { duration: 0.8, y: 20, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '-=0.6')
        .from('.hero-cta .btn', { duration: 0.8, y: 20, opacity: 0, stagger: 0.2, ease: 'power2.out' }, '-=0.4');

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 100) {
            document.querySelector('.header').style.transform = 'translateY(0)';
            document.querySelector('.header').style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            document.querySelector('.header').style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        if (currentScroll > lastScrollTop && currentScroll > 200) {
            // Scrolling down
            document.querySelector('.header').style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            document.querySelector('.header').style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// Swiper initialization
function initializeSwiper() {
    // Video gallery swiper
    const videoSwiper = new Swiper('.video-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
                centeredSlides: false,
            },
        },
        on: {
            slideChange: function() {
                // Add slide change animation
                gsap.from('.swiper-slide-active .video-card', {
                    duration: 0.6,
                    scale: 0.9,
                    opacity: 0.7,
                    ease: 'power2.out'
                });
            }
        }
    });

    // Reviews swiper
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2.5,
                centeredSlides: false,
            },
        },
        on: {
            slideChange: function() {
                // Fade in animation for active slide
                gsap.from('.swiper-slide-active .review-card', {
                    duration: 0.8,
                    y: 20,
                    opacity: 0,
                    ease: 'power2.out'
                });
            }
        }
    });

    // Video thumbnail click events
    document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulate video play animation
            gsap.to(this.querySelector('.play-button'), {
                duration: 0.3,
                scale: 1.3,
                opacity: 0,
                ease: 'power2.out',
                onComplete: function() {
                    gsap.set(this.targets()[0], { scale: 1, opacity: 1 });
                }
            });
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Before/After slider
function initializeBeforeAfter() {
    const slider = document.querySelector('.before-after-slider');
    const handle = document.querySelector('.slider-handle');
    const afterImage = document.querySelector('.after-image');
    
    if (!slider || !handle || !afterImage) return;
    
    let isDragging = false;
    
    function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        
        handle.style.left = percentage + '%';
        afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
    }
    
    // Mouse events
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateSlider(e.clientX);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Touch events for mobile
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches[0]) {
            updateSlider(e.touches[0].clientX);
        }
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Click anywhere on slider to move handle
    slider.addEventListener('click', (e) => {
        if (!isDragging) {
            updateSlider(e.clientX);
        }
    });
}

// FAQ accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    gsap.to(otherItem.querySelector('.faq-answer'), {
                        duration: 0.3,
                        maxHeight: 0,
                        padding: '0 1.5rem',
                        ease: 'power2.inOut'
                    });
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                gsap.to(answer, {
                    duration: 0.3,
                    maxHeight: 0,
                    padding: '0 1.5rem',
                    ease: 'power2.inOut'
                });
            } else {
                item.classList.add('active');
                gsap.set(answer, { maxHeight: 'auto' });
                const height = answer.scrollHeight;
                gsap.fromTo(answer, 
                    { maxHeight: 0, padding: '0 1.5rem' },
                    { 
                        duration: 0.3,
                        maxHeight: height,
                        padding: '1.5rem',
                        ease: 'power2.inOut'
                    }
                );
            }
        });
    });
}

// Countdown timer
function initializeCountdown() {
    // Set countdown target date (7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const target = targetDate.getTime();
        const difference = target - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // Add animation to changing numbers
            const elements = ['days', 'hours', 'minutes', 'seconds'];
            elements.forEach(id => {
                const element = document.getElementById(id);
                const currentValue = element.textContent;
                const previousValue = element.getAttribute('data-previous') || '00';
                
                if (currentValue !== previousValue) {
                    gsap.fromTo(element, 
                        { scale: 1.2, color: '#FFE066' },
                        { duration: 0.3, scale: 1, color: 'inherit', ease: 'power2.out' }
                    );
                    element.setAttribute('data-previous', currentValue);
                }
            });
        } else {
            // Timer expired
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Service cards animation
                if (target.classList.contains('service-card')) {
                    if (target.classList.contains('slide-in-left')) {
                        gsap.to(target, {
                            duration: 0.8,
                            x: 0,
                            opacity: 1,
                            ease: 'power2.out'
                        });
                    } else if (target.classList.contains('slide-in-right')) {
                        gsap.to(target, {
                            duration: 0.8,
                            x: 0,
                            opacity: 1,
                            ease: 'power2.out',
                            delay: 0.2
                        });
                    }
                }
                
                // Section titles animation
                if (target.classList.contains('section-title')) {
                    gsap.from(target, {
                        duration: 1,
                        y: 30,
                        opacity: 0,
                        ease: 'power2.out'
                    });
                }
                
                // Campaign section animation
                if (target.classList.contains('campaign-content')) {
                    gsap.from(target.children, {
                        duration: 0.8,
                        y: 30,
                        opacity: 0,
                        stagger: 0.2,
                        ease: 'power2.out'
                    });
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card, .section-title, .campaign-content').forEach(el => {
        observer.observe(el);
    });
}

// Button animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to all buttons
    document.querySelectorAll('.btn, .btn-fixed').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            gsap.to(ripple, {
                duration: 0.6,
                scale: 2,
                opacity: 0,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
            
            // Button press animation
            gsap.to(this, {
                duration: 0.1,
                scale: 0.95,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 100
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
});

// Add some extra interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Hover effects for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -8,
                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });
        });
    });
    
    // Floating animation for hero elements
    gsap.to('.hero-title', {
        duration: 3,
        y: -10,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
    
    gsap.to('.hero-tags .tag', {
        duration: 2,
        y: -5,
        stagger: 0.3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg-gradient');
        
        if (heroBackground && scrolled < window.innerHeight) {
            gsap.to(heroBackground, {
                duration: 0.3,
                y: scrolled * 0.5,
                ease: 'none'
            });
        }
    });
});

// Add CSS animation keyframes programmatically
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