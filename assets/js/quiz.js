const form = document.getElementById('quizForm');
const msg = document.getElementById('quizMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const answers = {
    q1: (data.get('q1') || '').toString().trim(),
    q2: (data.get('q2') || '').toString().trim(),
    q3: (data.get('q3') || '').toString().trim(),
  };
  const ok = Object.values(answers).every((v) => v.length > 0);
  msg.classList.remove('hidden');
  if (!ok) { msg.textContent = 'Oops, try filling them in ❤️'; return; }

  try {
    sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
  } catch (_) {}

  document.body.style.transition = 'background 800ms ease, opacity 800ms ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = 'process.html'; }, 800);
});


