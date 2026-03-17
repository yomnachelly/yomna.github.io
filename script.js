// Typing effect
const texts = ["Passionnée par le développement web", "Certifiée Microsoft & Cisco", "Créatrice d’applications modernes"];
let count = 0, index = 0, currentText = '', letter = '';
function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.getElementById('typing').textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1800);
  } else setTimeout(type, 70);
}
setTimeout(type, 800);

// === CARROUSEL NORMAL (change toutes les 2 secondes) ===
let currentSlide = 0;
const slides = document.getElementById('slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dotsContainer = document.getElementById('dots');

// Créer les points
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

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

// Boutons
document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide);

// Auto-slide toutes les 2 secondes
let autoSlide = setInterval(nextSlide, 2000);

// Pause au survol
const carousel = document.querySelector('.carousel-container');
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 2000));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
