window.addEventListener('scroll', function() {
  const heroHeight = document.querySelector('.hero').offsetHeight;
  const nav = document.querySelector('nav');
  nav.classList.toggle('scrolled', window.scrollY > heroHeight);
});

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
});

window.addEventListener('scroll', () => {
  const heroSection = document.querySelector('.hero');
  const scrollDistance = window.scrollY / window.innerHeight;
  heroSection.style.opacity = 1 - scrollDistance * 2;
  heroSection.style.filter = `blur(${scrollDistance * 10}px)`;
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const titleElement = lightbox.querySelector('h3');
const descriptionElement = lightbox.querySelector('p');
const prevArrow = lightbox.querySelector('.prev');
const nextArrow = lightbox.querySelector('.next');
const images = Array.from(document.querySelectorAll('.grid img'));
let currentIndex = 0;

const updateLightboxContent = () => {
  const img = images[currentIndex];
  lightboxImg.src = img.src.replace('_tn.jpg', '.jpg');
  const altParts = img.alt.split(' - ');
  titleElement.textContent = altParts[0];
  descriptionElement.textContent = altParts[1] || '';
};

const closeLightbox = () => lightbox.style.display = 'none';

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    currentIndex = index;
    updateLightboxContent();
  });
});

prevArrow.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxContent();
});

nextArrow.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxContent();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxImg) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowLeft') prevArrow.click();
    else if (e.key === 'ArrowRight') nextArrow.click();
    else if (e.key === 'Escape') closeLightbox();
  }
});

const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', () => {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
});
