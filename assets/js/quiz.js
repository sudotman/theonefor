const form = document.getElementById('quizForm');
const msg = document.getElementById('quizMessage');
const nextLink = document.getElementById('nextLink');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  // You can customize the answers if you like, for now we just celebrate any input
  const ok = ['q1','q2','q3'].every((k) => (data.get(k) || '').toString().trim().length > 0);
  if (ok) {
    msg.textContent = 'Perfect! You passed 🎉';
    msg.classList.remove('hidden');
    nextLink.classList.remove('disabled');
    nextLink.removeAttribute('aria-disabled');
  } else {
    msg.textContent = 'Oops, try filling them in ❤️';
    msg.classList.remove('hidden');
  }
});


