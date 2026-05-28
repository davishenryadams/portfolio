/* =====================================================
   app.js — Davis Adams Portfolio
   Shared nav behavior across all pages
   ===================================================== */

/* ── Mobile nav toggle ── */
(function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ── Subtle nav shadow on scroll ── */
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function update() {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
    } else {
      nav.style.boxShadow = '';
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ── Scroll reveal ── */
(function initReveal() {
  var items = document.querySelectorAll('.proj-card, .tl-item, .skill-group, .nav-card, .contact-link, .info-card');
  if (!items.length || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(16px)';
        entry.target.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        setTimeout(function() {
          entry.target.style.opacity = '';
          entry.target.style.transform = '';
        }, i * 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  items.forEach(function(el) {
    el.style.opacity = '0';
    observer.observe(el);
  });
})();
