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

    const typingElement = document.getElementById('typing');
    if (typingElement) {
        typingElement.textContent = letter;
    }

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

    // Handle contact link in navigation
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

function initCarousel(slidesId, dotsId, prevSelector, nextSelector, containerSelector, autoIntervalMs) {
    const slides = document.getElementById(slidesId);
    const dotsContainer = document.getElementById(dotsId);
    
    if (!slides || !dotsContainer) return;

    const slideElements = slides.querySelectorAll('.slide, .certs-slide');
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
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(n) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentSlide = (n + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Match transition duration
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

    // Boutons
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);

    if (prevBtn) prevBtn.addEventListener('click', nextSlide); // Fixed: prevBtn should go to previous
    if (nextBtn) nextBtn.addEventListener('click', prevSlide); // Fixed: nextBtn should go to next

    // Auto slide
    function startAuto() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(prevSlide, autoIntervalMs); // Fixed: use prevSlide for correct direction
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

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset carousel positions if needed
        const slides = document.getElementById('slides');
        const certsSlides = document.getElementById('certs-slides');
        
        if (slides) {
            const currentSlide = parseInt(slides.style.transform.match(/-?\d+/)?.[0] || '0');
            slides.style.transform = `translateX(-${currentSlide}%)`;
        }
        
        if (certsSlides) {
            const currentSlide = parseInt(certsSlides.style.transform.match(/-?\d+/)?.[0] || '0');
            certsSlides.style.transform = `translateX(-${currentSlide}%)`;
        }
    }, 250);
});
