/* ── ANIMATED WAVEFORM BACKGROUND ── */
(function () {
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const waves = [
    { color: '0,188,212',  yFrac: 0.28, amp: 55, freq: 0.0055, speed: 0.012, phase: 0,   alpha: 0.12 },
    { color: '245,166,35', yFrac: 0.72, amp: 45, freq: 0.0045, speed: 0.009, phase: 1.4, alpha: 0.10 },
    { color: '0,188,212',  yFrac: 0.50, amp: 28, freq: 0.009,  speed: 0.018, phase: 2.8, alpha: 0.07 },
    { color: '245,166,35', yFrac: 0.38, amp: 18, freq: 0.014,  speed: 0.022, phase: 0.6, alpha: 0.05 },
  ];

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waves.forEach(w => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${w.color},${w.alpha})`;
      ctx.lineWidth   = 1.5;
      const baseY = canvas.height * w.yFrac;
      for (let x = 0; x <= canvas.width; x += 2) {
        const y = baseY
          + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp
          + Math.sin(x * w.freq * 2.1 + t * w.speed * 1.5 + w.phase) * (w.amp * 0.28);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    t++;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── SCROLL REVEAL ── */
(function () {
  const items = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = Array.from(items).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 70);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach(el => io.observe(el));
})();
