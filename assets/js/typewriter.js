const lines = [
  "hi beautiful,",
  "aaj aapka special din hai.",
  "and, today we shall figure the mystery that's been plaguing society hitherto.",
  "the mystery of who is the most gosh darn pretty girl in this world*!",
  "* world here encompassing the whole universe and disregarding all potential geo-political conflicts. the borders of all sovereign nations are hereby invalid for our test. for further reading on how to disconnect ourselves from our post-colonial [and somewhat neo-colonial idea; as outlined by our pyaaru sartre] ideation of borders and ownership of lands, please refer to Aviva Chomsky's undocumented which is an incredible book that might give some perspective onto how beneath the bubbling conservatism of anti-immigration policies lies something rather disconcerting and barbaric.",
  "lets find out who is the most prettiest girl in the world!!!!!!!!!!!!!!!!!!"
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


