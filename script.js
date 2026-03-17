// Typing effect
const texts = [
  "Passionnée par le développement web",
  "Certifiée Microsoft & Cisco",
  "Créatrice d’applications modernes"
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
setTimeout(type, 800);

// Pause carousel on hover
const carousel = document.getElementById('projectCarousel');
carousel.addEventListener('mouseenter', () => {
  carousel.style.animationPlayState = 'paused';
});
carousel.addEventListener('mouseleave', () => {
  carousel.style.animationPlayState = 'running';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') !== '#') {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
