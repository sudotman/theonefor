(function initFloatingHearts(){
  const root = document.getElementById('floating-hearts');
  if (!root) return;
  const makeHeart = () => {
    const el = document.createElement('div');
    el.className = 'heart';
    const size = 6 + Math.random() * 12;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${10 + Math.random() * 10}s`;
    el.style.animationDelay = `${Math.random() * 3}s`;
    root.appendChild(el);
    setTimeout(() => el.remove(), 18000);
  };
  for (let i = 0; i < 10; i++) makeHeart();
  setInterval(makeHeart, 1800);
})();


