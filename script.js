/* =============================================
   GK — PREMIUM CINEMATIC INTERACTIONS
   GSAP ScrollTrigger · Custom Cursor · Loader
   ============================================= */

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════
   LOADER
════════════════════════════════════════════ */
const ldr = document.getElementById('loader');
const ldrP = document.getElementById('ldrProgress');
const ldrS = document.getElementById('ldrSub');
const msgs = ['Loading experience...', 'Preparing portfolio...', 'Almost ready...'];
let pct = 0, msgI = 0;

const ldrInt = setInterval(() => {
  pct += Math.random() * 18 + 3;
  if (pct > 100) pct = 100;
  ldrP.style.width = pct + '%';
  if (pct > 40 && msgI === 0) { ldrS.textContent = msgs[1]; msgI = 1; }
  if (pct > 75 && msgI === 1) { ldrS.textContent = msgs[2]; msgI = 2; }
  if (pct >= 100) {
    clearInterval(ldrInt);
    setTimeout(() => {
      ldr.classList.add('out');
      initAll();
    }, 350);
  }
}, 70);

/* ════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════ */
const cursorEl  = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
const cursorRing= document.getElementById('cursor-ring');
const cursorLbl = document.getElementById('cursor-label');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorEl.style.left  = mx + 'px';
  cursorEl.style.top   = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  cursorLbl.style.left  = (mx + 18) + 'px';
  cursorLbl.style.top   = (my + 18) + 'px';
  requestAnimationFrame(animRing);
})();

function setCursorHover(label) {
  document.body.classList.add('hovering');
  if (label) {
    cursorLbl.textContent = label;
    document.body.classList.add('label-show');
  }
}
function clearCursorHover() {
  document.body.classList.remove('hovering', 'label-show');
  cursorLbl.textContent = '';
}

/* ════════════════════════════════════════════
   INIT ALL (after loader)
════════════════════════════════════════════ */
function initAll() {
  initNav();
  initHero();
  initScrollReveals();
  initProjectHovers();
  initCursorHovers();
  initMobileMenu();
  initModal();
}

/* ════════════════════════════════════════════
   NAV
════════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 'top -50px',
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled')
  });

  // Hide scroll hint on first scroll
  const hint = document.getElementById('hScroll');
  ScrollTrigger.create({
    start: 'top -10px',
    onEnter: () => hint.classList.add('hidden'),
    onLeaveBack: () => hint.classList.remove('hidden')
  });
}

/* ════════════════════════════════════════════
   HERO ANIMATIONS
════════════════════════════════════════════ */
function initHero() {
  const tl = gsap.timeline({ delay: 0.15 });

  // Left side
  tl.fromTo('.hl-eyebrow',
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
  )
  .fromTo('.h-n1',
    { y: 80, opacity: 0, skewY: 3 },
    { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'power3.out' }, '-=0.4'
  )
  .fromTo('.h-n2',
    { y: 80, opacity: 0, skewY: 3 },
    { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'power3.out' }, '-=0.85'
  )
  .fromTo('.h-tagline',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5'
  )
  .fromTo('.h-actions',
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5'
  )
  // Right side
  .fromTo('.hero-stats',
    { x: 30, opacity: 0, scale: 0.97 },
    { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, '-=0.9'
  )
  .fromTo('.hero-company',
    { x: 30, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.6'
  );

  // Counter animation on stats
  document.querySelectorAll('.hs-num').forEach(el => {
    const raw = el.textContent.trim();
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    const pre = raw.match(/^[^0-9]*/)?.[0] || '';
    const suf = raw.match(/[^0-9]*$/)?.[0] || '';
    if (!isNaN(num) && num > 1) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: num, duration: 1.8, ease: 'power2.out', delay: 0.8,
        onUpdate: () => { el.textContent = pre + Math.round(obj.val) + suf; }
      });
    }
  });

  // Subtle parallax
  gsap.to('.hero-bg-blob', {
    yPercent: 25, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero-bg-dots', {
    yPercent: 10, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero-left', {
    yPercent: 6, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero-right', {
    yPercent: 4, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });
}

/* ════════════════════════════════════════════
   SCROLL REVEALS
════════════════════════════════════════════ */
function initScrollReveals() {
  // Section titles
  gsap.utils.toArray('.s-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  // Section tags
  gsap.utils.toArray('.s-tag').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -15 },
      {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      }
    );
  });

  // Reveal class
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 87%' },
        delay: (i % 4) * 0.07
      }
    );
    el.classList.add('in'); // fallback
  });

  // About stats stagger
  gsap.fromTo('.as-item',
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.about-stats', start: 'top 85%' }
    }
  );

  // Counter animation on about stats
  document.querySelectorAll('.as-num').forEach(el => {
    const text = el.textContent.trim();
    const num  = parseFloat(text.replace(/[^0-9.]/g, ''));
    const pre  = text.match(/^[^0-9]*/)?.[0] || '';
    const suf  = text.match(/[^0-9.]*$/)?.[0] || '';
    if (!isNaN(num) && num > 0) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: num, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => { el.textContent = pre + Math.round(obj.val) + suf; }
      });
    }
  });

  // Achievements slide in from left
  gsap.utils.toArray('.ach-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        delay: i * 0.06
      }
    );
  });

  // Experience items
  gsap.utils.toArray('.exp-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 87%' },
        delay: i * 0.1
      }
    );
  });

  // Skills columns stagger
  gsap.fromTo('.sk-col',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.skills-cols', start: 'top 85%' }
    }
  );

  // Project items
  gsap.utils.toArray('.proj-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 87%' },
        delay: i * 0.08
      }
    );
  });

  // CTA
  gsap.fromTo('.cta-title',
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-title', start: 'top 80%' }
    }
  );
  gsap.fromTo('.cta-btn',
    { opacity: 0, y: 15 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '.cta-btn', start: 'top 85%' },
      delay: 0.2
    }
  );

  // Contact links
  gsap.fromTo('.c-link',
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-row', start: 'top 85%' }
    }
  );

  // Marquee
  gsap.fromTo('.marquee-wrap',
    { opacity: 0 },
    { opacity: 1, duration: 1, scrollTrigger: { trigger: '.marquee-wrap', start: 'top 95%' } }
  );
}

/* ════════════════════════════════════════════
   PROJECT HOVERS
════════════════════════════════════════════ */
function initProjectHovers() {
  document.querySelectorAll('.proj-item').forEach(item => {
    const label = item.getAttribute('data-hover') || 'VIEW';
    item.addEventListener('mouseenter', () => setCursorHover(label));
    item.addEventListener('mouseleave', () => clearCursorHover());

    // Open modal for GKZipPDF
    item.addEventListener('click', (e) => {
      if (item.querySelector('.pi-link') && e.target.classList.contains('pi-link')) return;
      const h = item.querySelector('h3');
      if (h && h.textContent.includes('GKZipPDF')) {
        document.getElementById('sdlcModal').classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

/* ════════════════════════════════════════════
   CURSOR HOVERS
════════════════════════════════════════════ */
function initCursorHovers() {
  document.querySelectorAll('a, button, .ach-item').forEach(el => {
    if (el.closest('.proj-item')) return;
    el.addEventListener('mouseenter', () => setCursorHover(''));
    el.addEventListener('mouseleave', () => clearCursorHover());
  });
}

/* ════════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════════ */
function initMobileMenu() {
  const burger  = document.getElementById('burger');
  const mob     = document.getElementById('mobMenu');
  const close   = document.getElementById('mobClose');

  burger.addEventListener('click', () => {
    mob.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  close.addEventListener('click', closeMenu);
  mob.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));

  function closeMenu() {
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ════════════════════════════════════════════
   MODAL
════════════════════════════════════════════ */
function initModal() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function closeModal(e) {
  if (!e || e.target === e.currentTarget || e.target.classList.contains('modal-close')) {
    document.getElementById('sdlcModal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ════════════════════════════════════════════
   SMOOTH ANCHOR SCROLL
════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

/* ════════════════════════════════════════════
   NAV SCROLL CLASS (additional)
════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
