const images = [
  { src: '../assets/sample/1.jpg', caption: 'That smile I adore' },
  { src: '../assets/sample/2.jpg', caption: 'Our little adventure' },
  { src: '../assets/sample/3.jpg', caption: 'Pure sunshine' },
  { src: '../assets/sample/4.jpg', caption: 'My safe place' },
  { src: '../assets/sample/5.jpg', caption: 'The world’s most beautiful girl' }
];

const grid = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

images.forEach(({ src, caption }) => {
  const img = new Image();
  img.src = src;
  img.alt = caption;
  img.loading = 'lazy';
  img.addEventListener('click', () => openLightbox(src, caption));
  grid.appendChild(img);
});

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.remove('hidden');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.setAttribute('aria-hidden', 'true');
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });


