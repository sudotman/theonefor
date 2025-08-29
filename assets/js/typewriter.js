const lines = [
  "Hi beautiful,",
  "Today is all about celebrating you.",
  "Your kindness, your laugh, your spark — the way you light up every room.",
  "You are my favorite story, and this is just a tiny chapter of us.",
  "Ready to see some of our favorite moments?"
];

const typeTarget = document.getElementById('typewriter');
const nextBtn = document.getElementById('nextBtn');

let lineIdx = 0;

function typeLine(text, cb) {
  let i = 0;
  const span = document.createElement('p');
  typeTarget.appendChild(span);
  const timer = setInterval(() => {
    span.textContent = text.slice(0, i++);
    if (i > text.length) { clearInterval(timer); setTimeout(cb, 400); }
  }, 28);
}

function runTypewriter() {
  if (lineIdx >= lines.length) {
    nextBtn.classList.remove('disabled');
    nextBtn.removeAttribute('aria-disabled');
    return;
  }
  typeLine(lines[lineIdx++], runTypewriter);
}

runTypewriter();


