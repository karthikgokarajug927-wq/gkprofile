// =============================================
//  GK PORTFOLIO — INTERACTIONS
// =============================================

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.project-card, .skill-group, .about-card, .contact-card, .phase, .tl-content'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ---- NAV ACTIVE LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--cream)' : '';
  });
});

// ---- GKZIPPDF MODAL ----
function openZipModal() {
  document.getElementById('zipModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeZipModal(event) {
  if (!event || event.target === event.currentTarget || event.target.classList.contains('modal-close')) {
    document.getElementById('zipModal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ---- SWIGGY MODAL ----
function openSwiggyModal() {
  document.getElementById('swiggyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  switchTab('overview');
}
function closeSwiggyModal(event) {
  if (!event || event.target === event.currentTarget || event.target.classList.contains('modal-close')) {
    document.getElementById('swiggyModal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ---- TAB SWITCHER ----
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.getAttribute('onclick') === `switchTab('${tabId}')`) btn.classList.add('active');
  });
}

// ---- CLOSE MODALS ON ESC ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeZipModal();
    closeSwiggyModal();
  }
});
