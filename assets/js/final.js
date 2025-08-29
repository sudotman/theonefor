const letter = `I love you.

You make the ordinary magical and the tough days softer.
With you, every moment feels like home.

Happy Birthday to the most beautiful girl in the world.
Always yours.`;

const letterEl = document.getElementById('letter');
let i = 0;
const type = () => {
  letterEl.textContent = letter.slice(0, i++);
  if (i <= letter.length) requestAnimationFrame(type);
};
type();

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


