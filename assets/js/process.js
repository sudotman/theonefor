const container = document.getElementById('process');

function getStoredAnswers() {
  try { return JSON.parse(sessionStorage.getItem('quizAnswers') || '{}'); } catch (_) { return {}; }
}

function normalize(str) {
  return (str || '').toString().trim().toLowerCase();
}

function isMatch(userValue, acceptableList) {
  const u = normalize(userValue);
  return (acceptableList || []).some(a => normalize(a) === u);
}

function buildResultItem(index, qKey, userValue, config) {
  const wrap = document.createElement('div');
  wrap.className = 'result-item';

  const header = document.createElement('div');
  header.className = 'result-head';
  header.innerHTML = `<span class="result-index">Q${index}</span><span class="result-question">${config.question}</span>`;

  const match = isMatch(userValue, config.acceptable);
  const badge = document.createElement('span');
  badge.className = `badge ${match ? 'ok' : 'no'}`;
  badge.textContent = match ? 'Correct' : 'Close enough';

  const userLine = document.createElement('div');
  userLine.className = 'answer-line user';
  userLine.innerHTML = `<span class="label">Your answer</span><span class="value">${userValue || '—'}</span>`;

  const correctLine = document.createElement('div');
  correctLine.className = 'answer-line correct';
  correctLine.innerHTML = `<span class="label">Intended</span><span class="value">${config.acceptable[0]}</span>`;

  header.appendChild(badge);
  wrap.appendChild(header);
  wrap.appendChild(userLine);
  wrap.appendChild(correctLine);
  // Toggle for all acceptable answers
  const more = document.createElement('div');
  more.className = 'answers-more';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'answers-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'show all options';
  const all = document.createElement('div');
  all.className = 'answers-all hidden';
  (config.acceptable || []).forEach((opt) => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = opt;
    all.appendChild(pill);
  });
  toggle.addEventListener('click', () => {
    const isHidden = all.classList.contains('hidden');
    all.classList.toggle('hidden');
    toggle.textContent = isHidden ? 'hide options' : 'show all options';
    toggle.setAttribute('aria-expanded', String(isHidden));
  });
  more.appendChild(toggle);
  more.appendChild(all);
  wrap.appendChild(more);
  return { wrap, match };
}

function revealResults() {
  const stored = getStoredAnswers();
  if (!stored.q1 || !stored.q2 || !stored.q3) {
    window.location.href = 'quiz.html';
    return;
  }

  const answers = window.QUIZ_ANSWERS || {};

  const title = document.createElement('h2');
  title.className = 'title';
  title.textContent = 'Your answers';

  const list = document.createElement('div');
  list.className = 'results';

  container.innerHTML = '';
  container.appendChild(title);
  container.appendChild(list);

  const items = [
    buildResultItem(1, 'q1', stored.q1, answers.q1 || { question: 'Q1', acceptable: [''] }),
    buildResultItem(2, 'q2', stored.q2, answers.q2 || { question: 'Q2', acceptable: [''] }),
    buildResultItem(3, 'q3', stored.q3, answers.q3 || { question: 'Q3', acceptable: [''] })
  ];

  let i = 0;
  function step() {
    if (i < items.length) {
      const { wrap } = items[i++];
      wrap.style.opacity = '0';
      wrap.style.transform = 'translateY(10px)';
      list.appendChild(wrap);
      requestAnimationFrame(() => {
        wrap.style.transition = 'opacity 600ms ease, transform 600ms ease';
        wrap.style.opacity = '1';
        wrap.style.transform = 'none';
      });
      setTimeout(step, 600);
    } else {
      const cta = document.createElement('a');
      cta.className = 'button primary reveal-cta';
      cta.href = 'answer.html';
      cta.textContent = 'who is the most beautiful girl? \u2192';
      const ctaWrap = document.createElement('div');
      ctaWrap.style.textAlign = 'center';
      ctaWrap.style.marginTop = '20px';
      ctaWrap.appendChild(cta);
      container.appendChild(ctaWrap);
      requestAnimationFrame(() => {
        cta.style.opacity = '0';
        cta.style.transform = 'translateY(6px)';
        setTimeout(() => {
          cta.style.transition = 'opacity 500ms ease, transform 500ms ease, box-shadow 200ms ease';
          cta.style.opacity = '1';
          cta.style.transform = 'none';
        }, 80);
      });
    }
  }

  step();
}

revealResults();


