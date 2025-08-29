(function initFloatingHearts(){
  const root = document.getElementById('floating-hearts');
  if (!root) return;
  const makeHeart = () => {
    const el = document.createElement('div');
    el.className = 'heart';
    const size = 8 + Math.random() * 14;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${9 + Math.random() * 9}s`;
    el.style.animationDelay = `${Math.random() * 3}s`;
    const drift = () => (Math.random() * 30 - 15).toFixed(1) + 'px';
    el.style.setProperty('--x0', drift());
    el.style.setProperty('--x1', drift());
    el.style.setProperty('--x2', drift());
    el.style.setProperty('--x3', drift());
    el.style.setProperty('--x4', drift());
    el.style.setProperty('--scale', (0.85 + Math.random() * 0.5).toFixed(2));
    root.appendChild(el);
    const life = parseFloat(el.style.animationDuration) * 1000 + 2000;
    setTimeout(() => el.remove(), life);
  };
  for (let i = 0; i < 14; i++) makeHeart();
  setInterval(makeHeart, 1400);
})();


