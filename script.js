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
    if (count === texts.length) {
        count = 0;
    }
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

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, 800);
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementById('slides');
    const dotsContainer = document.getElementById('dots');
    const totalSlides = document.querySelectorAll('.slide').length;
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
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

    // Add event listeners to buttons
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto slide
    startAutoSlide();

    // Pause on hover
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide(); // Swipe left
        } else if (touchEndX - touchStartX > 50) {
            prevSlide(); // Swipe right
        }
        startAutoSlide();
    });
});

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
