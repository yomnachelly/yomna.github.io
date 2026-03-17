// Typing effect
const texts = [
    "Passionnée par le développement web",
    "Certifiée Microsoft & Cisco",
    "Créatrice d'applications modernes"
];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('typing').textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1800);
    } else {
        setTimeout(type, 70);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 800);

    // ──────────────── Projects Carousel ────────────────
    initCarousel('slides', 'dots', '.prev-btn', '.next-btn', '.carousel-container', 3000);

    // ──────────────── Certifications Carousel ────────────────
    initCarousel('certs-slides', 'certs-dots', '.certs-prev-btn', '.certs-next-btn', '.certs-carousel-container', 4000);
});

function initCarousel(slidesId, dotsId, prevSelector, nextSelector, containerSelector, autoIntervalMs) {
    const slides = document.getElementById(slidesId);
    const dotsContainer = document.getElementById(dotsId);
    if (!slides || !dotsContainer) return;

    const slideElements = slides.querySelectorAll('.slide, .certs-slide');
    const totalSlides = slideElements.length;
    let currentSlide = 0;
    let autoInterval;

    // Créer les dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Boutons
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto slide
    function startAuto() {
        autoInterval = setInterval(nextSlide, autoIntervalMs);
    }
    function stopAuto() {
        clearInterval(autoInterval);
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
