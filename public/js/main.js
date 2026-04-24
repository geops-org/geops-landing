/* ============================================================
   GeoPS Landing Page — main.js
   IntersectionObserver · Carousel · Tabs · Accordion
   Marquee · Hamburger menu
   ============================================================ */

/* ── HEADER SCROLL SHADOW ────────────────────────────────── */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
}

/* ── HAMBURGER MENU ──────────────────────────────────────── */
function initHamburger() {
  const btn  = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.querySelector('.msr').textContent = open ? 'close' : 'menu';
  });

  // Close on link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('.msr').textContent = 'menu';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('.msr').textContent = 'menu';
    }
  });
}

/* ── ACTIVE NAV LINK (scroll spy) ───────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ── INTERSECTION OBSERVER (scroll reveals) ─────────────── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── HERO CAROUSEL ───────────────────────────────────────── */
function initCarousel() {
  const track  = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  const dots   = Array.from(document.querySelectorAll('.carousel-dot'));
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  let current  = 0;
  let timer    = null;
  let paused   = false;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!paused) goTo(current + 1);
    }, 4500);
  }

  // Pause on hover
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => { paused = true; });
    carousel.addEventListener('mouseleave', () => { paused = false; });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  // Keyboard support
  if (carousel) {
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); startTimer(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); startTimer(); }
    });
  }

  // Init first slide
  slides[0]?.classList.add('active');
  dots[0]?.classList.add('active');
  startTimer();
}

/* ── TABS ────────────────────────────────────────────────── */
function initTabs() {
  const tabBtns   = document.querySelectorAll('.tab-btn[role="tab"]');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.classList.add('active');
    });

    btn.addEventListener('keydown', e => {
      const idx  = [...tabBtns].indexOf(btn);
      const next = e.key === 'ArrowRight'
        ? (idx + 1) % tabBtns.length
        : e.key === 'ArrowLeft'
          ? (idx - 1 + tabBtns.length) % tabBtns.length
          : null;
      if (next !== null) { tabBtns[next].click(); tabBtns[next].focus(); }
    });
  });
}

/* ── ACCORDION ───────────────────────────────────────────── */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── MARQUEE PAUSE ───────────────────────────────────────── */
function initMarquee() {
  const wrap  = document.querySelector('.marquee-wrap');
  const track = document.querySelector('.marquee-track');
  if (!wrap || !track) return;
  // CSS handles pause on hover via animation-play-state
  // No JS needed beyond what CSS already does
}

/* ── BOOT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadLang('en');
  initHeaderScroll();
  initLangToggle();
  initHamburger();
  initCarousel();
  initTabs();
  initAccordion();
  initReveal();
  initScrollSpy();
  initMarquee();
});
