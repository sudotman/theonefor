const form = document.getElementById('quizForm');
const msg = document.getElementById('quizMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const ok = ['q1','q2','q3'].every((k) => (data.get(k) || '').toString().trim().length > 0);
  msg.classList.remove('hidden');
  if (!ok) { msg.textContent = 'Oops, try filling them in ❤️'; return; }

  // Fade to black then navigate to dedicated processing page
  document.body.style.transition = 'background 800ms ease, opacity 800ms ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = 'process.html'; }, 800);
});


