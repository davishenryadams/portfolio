(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const ACCENT = { r: 179, g: 27, b: 27 };
  const DIM    = { r: 34,  g: 34,  b: 38  };
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x = rand(0, W); this.y = rand(0, H);
    this.vx = rand(-0.15, 0.15); this.vy = rand(-0.15, 0.15);
    this.r = rand(1, 2.2);
    const useAccent = Math.random() < 0.12;
    this.color = useAccent ? ACCENT : DIM;
    this.alpha = rand(0.25, 0.8);
  };
  Particle.prototype.update = function () {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.alpha + ')';
    ctx.fill();
  };
  const COUNT = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 8000), 120);
  function init() { resize(); particles = Array.from({ length: COUNT }, () => new Particle()); }
  function drawLines() {
    const DIST = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i], p2 = particles[j];
        const dx = p1.x - p2.x, dy = p1.y - p2.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          const alpha = (1 - d / DIST) * 0.1;
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(34,34,38,' + alpha + ')';
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
  }
  function loop() { ctx.clearRect(0, 0, W, H); drawLines(); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(loop); }
  window.addEventListener('resize', resize);
  init(); loop();
})();

(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();

(function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open'); links.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
})();

(function initReveal() {
  const items = document.querySelectorAll('.reveal, .reveal-child');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.classList.contains('reveal-child')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80 : 0;
        setTimeout(() => { entry.target.classList.add('in-view'); }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => observer.observe(el));
})();

(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__links a');
  if (!sections.length || !links.length) return;
  function setActive() {
    const scrollY = window.scrollY;
    let current = '';
    sections.forEach(sec => { if (scrollY >= sec.offsetTop - 100) current = sec.id; });
    links.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? 'var(--color-text)' : ''; });
  }
  window.addEventListener('scroll', setActive, { passive: true }); setActive();
})();
