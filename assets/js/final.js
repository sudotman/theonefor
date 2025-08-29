const letter = `i love you.

you make the ordinary magical and the tough days softer.
with you, every moment feels like home.

happy birthday to the most beautiful girl in the world.
always yours.

satyamu`;

const mysteryEl = document.getElementById('mystery');
const nameEl = document.getElementById('nameReveal');
const letterEl = document.getElementById('letter');

function revealSequence() {
  // 1) Fade in the mysterious line
  mysteryEl.classList.add('show');
  // 2) After a beat, reveal the name
  setTimeout(() => {
    nameEl.classList.remove('hidden');
    nameEl.textContent = 'shreya mishra';
    startLetter();
  }, 1600);
}

function startLetter() {
  let i = 0;
  const step = () => {
    letterEl.textContent = letter.slice(0, i++);
    if (i <= letter.length) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  // Fade-in controls a few seconds after typing finishes
  const restartBtn = document.querySelector('.actions .button');
  const popupBtn = document.getElementById('momentsPopup');
  const delay = Math.max(4500, letter.length * 18);
  setTimeout(() => {
    restartBtn.style.transition = 'opacity 600ms ease, transform 600ms ease';
    popupBtn.style.transition = 'opacity 600ms ease, transform 600ms ease';
    restartBtn.style.opacity = '1';
    popupBtn.style.opacity = '1';
    restartBtn.style.transform = 'none';
    popupBtn.style.transform = 'none';
  }, delay);
}

// Tiny confetti
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let w, h, particles;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function init() {
  particles = Array.from({ length: 180 }, () => ({
    x: Math.random() * w,
    y: -20 - Math.random() * h,
    r: 2 + Math.random() * 4,
    c: [ '#ff92c2', '#ffd2e5', '#c0ffee', '#fff3b0' ][Math.floor(Math.random()*4)],
    s: 1 + Math.random() * 2,
    a: Math.random() * Math.PI,
  }));
}

function draw() {
  ctx.clearRect(0,0,w,h);
  particles.forEach(p => {
    p.y += p.s;
    p.x += Math.sin(p.a += 0.03);
    if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}

init();
draw();

// Collage popup setup
const popupBtn = document.getElementById('momentsPopup');
const overlay = document.getElementById('collageOverlay');
const closeBtn = document.getElementById('collageClose');
const grid = document.getElementById('collageGrid');

const collageItems = [
  { src: '../assets/sample/1.jpg', note: 'that smile i adore' },
  { src: '../assets/sample/2.jpg', note: 'our little adventure' },
  { src: '../assets/sample/3.jpg', note: 'pure sunshine' },
  { src: '../assets/sample/4.jpg', note: 'my safe place' },
  { src: '../assets/sample/5.jpg', note: 'us, always' }
];

function buildCollage() {
  grid.innerHTML = '';
  collageItems.forEach(({ src, note }) => {
    const item = document.createElement('div');
    item.className = 'collage-item';
    const img = new Image();
    img.src = src; img.alt = note; img.loading = 'lazy';
    const ann = document.createElement('div');
    ann.className = 'collage-annotation';
    ann.textContent = note;
    item.appendChild(img);
    item.appendChild(ann);
    grid.appendChild(item);
  });
}

popupBtn.addEventListener('click', () => {
  buildCollage();
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  popupBtn.setAttribute('aria-expanded', 'true');
});
closeBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  popupBtn.setAttribute('aria-expanded', 'false');
});
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeBtn.click(); });

// Kick off the mysterious reveal once the page is ready
// Hide controls initially
window.addEventListener('load', () => {
  const restartBtn = document.querySelector('.actions .button');
  restartBtn.style.opacity = '0';
  restartBtn.style.transform = 'translateY(6px)';
  popupBtn.style.opacity = '0';
  popupBtn.style.transform = 'translateY(6px)';
  revealSequence();
});


