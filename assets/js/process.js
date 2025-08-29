const container = document.getElementById('process');
const lines = [
  'Fading reality... 🌌',
  'Calculating your answers... ⏳',
  'Determining accuracy of answers... 🔎',
  'Simulating the matrix... 🧪',
  'Whispering to the universe... ✨'
];

function showLine(text) {
  const p = document.createElement('p');
  p.className = 'process-line';
  p.textContent = text;
  container.appendChild(p);
  requestAnimationFrame(() => p.classList.add('show'));
}

let idx = 0;
function next() {
  if (idx < lines.length) {
    showLine(lines[idx++]);
    setTimeout(next, 1500 + Math.random() * 1500);
  } else {
    setTimeout(() => { window.location.href = 'answer.html'; }, 1500);
  }
}

next();


