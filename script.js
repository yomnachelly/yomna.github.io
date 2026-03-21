// Typing effect
const texts = [
    "Développeuse Web Full-Stack",
    "IA & Cloud Enthusiast",
    "Créative & Rigoureuse"
];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    const typingElement = document.getElementById('typing');
    if (typingElement) {
        typingElement.textContent = letter;
    }

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 800);

    // Initialize carousels
    initCarousel('slides', 'dots', '.prev-btn', '.next-btn', '.carousel-container', 3000);
    initCarousel('certs-slides', 'certs-dots', '.certs-prev-btn', '.certs-next-btn', '.certs-carousel-container', 4000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

function initCarousel(slidesId, dotsId, prevSelector, nextSelector, containerSelector, autoIntervalMs) {
    const slidesContainer = document.getElementById(slidesId);
    const dotsContainer = document.getElementById(dotsId);
    
    if (!slidesContainer || !dotsContainer) return;

    const slideElements = slidesContainer.querySelectorAll('.slide, .certs-slide');
    const totalSlides = slideElements.length;
    
    if (totalSlides === 0) return;
    
    let currentSlide = 0;
    let autoInterval;
    let isTransitioning = false;

    // Créer les dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (!isTransitioning) {
                stopAuto();
                goToSlide(i);
                startAuto();
            }
        });
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(n) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentSlide = (n + totalSlides) % totalSlides;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        if (!isTransitioning) {
            goToSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (!isTransitioning) {
            goToSlide(currentSlide - 1);
        }
    }

    // Boutons - correction: prevBtn doit aller à la slide précédente, nextBtn à la suivante
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);

    if (prevBtn) {
        prevBtn.removeEventListener('click', prevSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
        nextBtn.removeEventListener('click', nextSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Auto slide
    function startAuto() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(nextSlide, autoIntervalMs);
    }
    
    function stopAuto() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }

    startAuto();

    // Pause on hover
    const container = document.querySelector(containerSelector);
    if (container) {
        container.addEventListener('mouseenter', stopAuto);
        container.addEventListener('mouseleave', startAuto);
    }

    // Touch swipe (mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    if (container) {
        container.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAuto();
        });

        container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchEndX - touchStartX > 50) prevSlide();
            startAuto();
        });
    }
}
