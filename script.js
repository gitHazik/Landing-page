/* ─── KaemKaar ──────────────────────────────────────────────── */

/* ─── Navbar Scroll ──────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  backToTop?.classList.toggle('visible', window.scrollY > 220);
}, { passive: true });

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Mobile Nav ─────────────────────────────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const navOverlay = document.querySelector('.nav-overlay');

function openMobileNav() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('open');
  navOverlay.style.display = 'block';
  requestAnimationFrame(() => navOverlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { navOverlay.style.display = ''; }, 300);
}

hamburger?.addEventListener('click', () =>
  hamburger.classList.contains('open') ? closeMobileNav() : openMobileNav()
);
navOverlay?.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', closeMobileNav));

/* ─── Smooth Anchor Scroll ───────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 16 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ─── Scroll Reveal ──────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── Overlay ─────────────────────────────────────────────────────────── */
const overlay = document.getElementById('waitlist-overlay');
const skipBtn = document.getElementById('skip-btn');
const submitBtn = document.getElementById('submit-btn');
const msgEl = document.getElementById('msg');
const join = document.getElementById('join-btn');
const joinMobile = document.getElementById('join-mobile-btn');

function hideOverlay() {
  overlay.classList.add('hiding');
  setTimeout(() => { overlay.style.display = 'none'; }, 550);
}

function showOverlay() {
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.remove('hiding'));
}

if (skipBtn) {
  skipBtn.addEventListener('click', hideOverlay);
}

if (join) {
  join.addEventListener('click', showOverlay);
}

if (joinMobile) {
  joinMobile.addEventListener('click', () => {
    closeMobileNav();
    showOverlay();
  });
}