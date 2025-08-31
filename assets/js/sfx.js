(function(){
  class SoundManager {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      try { this.enabled = JSON.parse(localStorage.getItem('sfxEnabled') || 'true'); } catch (_) {}
      this.unlocked = false;
      this.masterGain = null;
      this.buffers = {};
      this._bindUnlock();
    }

    _bindUnlock() {
      const unlock = () => {
        if (this.unlocked) return;
        try {
          this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
          const buffer = this.ctx.createBuffer(1, 1, 22050);
          const source = this.ctx.createBufferSource();
          source.buffer = buffer;
          this.masterGain = this.masterGain || this.ctx.createGain();
          this.masterGain.gain.value = this.enabled ? 1 : 0;
          this.masterGain.connect(this.ctx.destination);
          source.connect(this.masterGain);
          if (source.start) source.start(0);
          this.unlocked = true;
          window.removeEventListener('touchstart', unlock);
          window.removeEventListener('pointerdown', unlock);
          window.removeEventListener('keydown', unlock);
        } catch (_) {}
      };
      window.addEventListener('touchstart', unlock, { once: true });
      window.addEventListener('pointerdown', unlock, { once: true });
      window.addEventListener('keydown', unlock, { once: true });
    }

    setEnabled(v) {
      this.enabled = Boolean(v);
      try { localStorage.setItem('sfxEnabled', JSON.stringify(this.enabled)); } catch (_) {}
      if (this.masterGain) this.masterGain.gain.value = this.enabled ? 1 : 0;
    }

    toggle() { this.setEnabled(!this.enabled); }

    async _ensureContext() {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      if (!this.masterGain) {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.enabled ? 1 : 0;
        this.masterGain.connect(this.ctx.destination);
      }
    }

    async play(name, when = 0) {
      if (!this.enabled) return;
      await this._ensureContext();
      const fn = this[`_${name}`];
      if (typeof fn === 'function') fn.call(this, when);
    }

    _click(when = 0) {
      const now = this.ctx.currentTime + when;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain).connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.1);
    }

    _soft(when = 0) {
      const now = this.ctx.currentTime + when;
      const o1 = this.ctx.createOscillator();
      const o2 = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o1.type = 'sine'; o2.type = 'sine';
      o1.frequency.setValueAtTime(660, now);
      o2.frequency.setValueAtTime(990, now);
      g.gain.setValueAtTime(0.12, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      o1.connect(g); o2.connect(g); g.connect(this.masterGain);
      o1.start(now); o2.start(now);
      o1.stop(now + 0.55); o2.stop(now + 0.5);
    }

    _confetti(when = 0) {
      const now = this.ctx.currentTime + when;
      for (let i = 0; i < 6; i++) {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        const t = now + i * 0.03;
        o.type = 'triangle';
        o.frequency.setValueAtTime(400 + Math.random() * 800, t);
        g.gain.setValueAtTime(0.08, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
        o.connect(g).connect(this.masterGain);
        o.start(t);
        o.stop(t + 0.26);
      }
    }

    _type(when = 0) {
      const now = this.ctx.currentTime + when;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'square';
      const base = 2400 + Math.random() * 300;
      osc.frequency.setValueAtTime(base, now);
      g.gain.setValueAtTime(0.045, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.connect(g).connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.035);
    }
  }

  function injectToggle() {
    const btn = document.createElement('button');
    btn.id = 'sfxToggle';
    btn.className = 'sfx-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = '🔊';
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(6px)';
    document.body.appendChild(btn);
    requestAnimationFrame(() => {
      btn.style.transition = 'opacity 400ms ease, transform 400ms ease';
      btn.style.opacity = '1';
      btn.style.transform = 'none';
    });
    btn.addEventListener('click', async () => {
      window.SFX.toggle();
      const on = window.SFX.enabled;
      btn.textContent = on ? '🔊' : '🔈';
      btn.setAttribute('aria-pressed', String(on));
      await window.SFX.play('click');
    });
    const on = window.SFX.enabled;
    btn.textContent = on ? '🔊' : '🔈';
    btn.setAttribute('aria-pressed', String(on));
  }

  window.SFX = new SoundManager();
  window.addEventListener('DOMContentLoaded', injectToggle);
})();
