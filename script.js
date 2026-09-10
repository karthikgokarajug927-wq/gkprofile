/* =============================================
   G KARTHIK — PREMIUM INTERACTIONS
   GSAP + Three.js + Micro-interactions
   ============================================= */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   LOADER
   ============================================================ */
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');

let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add('hidden');
      initAnimations();
    }, 400);
  }
  loaderFill.style.width = progress + '%';
}, 80);

/* ============================================================
   THREE.JS — 3D PARTICLE HERO
   ============================================================ */
function initThreeJS() {
  const canvas = document.getElementById('heroCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 5;

  // Particles
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    // Navy to accent blue colors
    const t = Math.random();
    colors[i * 3]     = 0.35 + t * 0.2;  // R
    colors[i * 3 + 1] = 0.6  + t * 0.2;  // G
    colors[i * 3 + 2] = 0.83 + t * 0.17; // B
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Mouse movement
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  // Resize
  window.addEventListener('resize', () => {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
  });

  // Animate
  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    particles.rotation.y = t * 0.04 + mouseX * 0.5;
    particles.rotation.x = t * 0.02 + mouseY * 0.3;
    renderer.render(scene, camera);
  })();
}

try { initThreeJS(); } catch(e) { console.log('Three.js init skipped'); }

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (cursor && follower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  // Hover effects
  document.querySelectorAll('a, button, .ach-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      cursor.style.background = 'transparent';
      cursor.style.border = '1.5px solid var(--accent)';
      follower.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'var(--accent)';
      cursor.style.border = 'none';
      follower.style.opacity = '0.5';
    });
  });
}

/* ============================================================
   MAIN ANIMATIONS (after loader)
   ============================================================ */
function initAnimations() {

  // Hero name lines stagger
  gsap.fromTo('.name-line',
    { y: 80, opacity: 0, skewY: 3 },
    { y: 0, opacity: 1, skewY: 0, duration: 1.1, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
  );

  gsap.fromTo('.hero-eyebrow-wrap',
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
  );

  gsap.fromTo('.hero-tagline',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
  );

  gsap.fromTo('.hero-badges',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.65 }
  );

  gsap.fromTo('.hero-actions',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.8 }
  );

  gsap.fromTo('#statCard',
    { opacity: 0, x: 40, scale: 0.96 },
    { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
  );

  gsap.fromTo('#heroCompany',
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.65 }
  );

  // Counter animation
  animateCounters();

  // NAV on scroll
  ScrollTrigger.create({
    start: 'top -60px',
    onEnter: () => document.getElementById('navbar').style.boxShadow = '0 2px 32px rgba(27,41,88,0.12)',
    onLeaveBack: () => document.getElementById('navbar').style.boxShadow = 'none'
  });

  // Scroll reveals with GSAP
  gsap.utils.toArray('.gsap-reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 35 },
      {
        opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
        scrollTrigger: {
          trigger: el, start: 'top 88%', toggleActions: 'play none none none'
        },
        delay: (i % 3) * 0.1
      }
    );
  });

  // Parallax on achievements section
  gsap.to('#achievements', {
    backgroundPositionY: '30%',
    ease: 'none',
    scrollTrigger: { trigger: '#achievements', start: 'top bottom', end: 'bottom top', scrub: true }
  });
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2, ease: 'power2.out', delay: 0.8,
      onUpdate: () => { el.textContent = Math.round(obj.val); }
    });
  });
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
  });
});

/* ============================================================
   HORIZONTAL SCROLL HINT ANIMATION
   ============================================================ */
gsap.to('.scroll-line', {
  scaleY: 0.5, opacity: 0.2, duration: 1, repeat: -1, yoyo: true, ease: 'power1.inOut'
});

/* ============================================================
   NAV HAMBURGER
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ============================================================
   SKILL CARDS — stagger on hover
   ============================================================ */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.fromTo(card.querySelectorAll('.skill-pills span'),
      { y: 4, opacity: 0.7 },
      { y: 0, opacity: 1, stagger: 0.03, duration: 0.25, ease: 'power2.out' }
    );
  });
});

/* ============================================================
   ACHIEVEMENT CARDS — tilt on mousemove
   ============================================================ */
document.querySelectorAll('.ach-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(card, { rotateY: x * 8, rotateX: -y * 8, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
  });
});

/* ============================================================
   SDLC FLOW — animate steps on project section enter
   ============================================================ */
ScrollTrigger.create({
  trigger: '#projects',
  start: 'top 70%',
  onEnter: () => {
    gsap.fromTo('.sf-step',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.15, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }
});

/* ============================================================
   TIMELINE — reveal with stagger
   ============================================================ */
gsap.utils.toArray('.tl-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 85%' },
      delay: i * 0.1
    }
  );
});

/* ============================================================
   MODAL
   ============================================================ */
function openZipModal() {
  document.getElementById('zipModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  gsap.fromTo('.phase', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.2 });
}
function closeZipModal(e) {
  if (!e || e.target === e.currentTarget || e.target.classList.contains('modal-close')) {
    document.getElementById('zipModal').classList.remove('open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeZipModal(); });

/* ============================================================
   SECTION TITLES — word reveal
   ============================================================ */
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.fromTo(title,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: title, start: 'top 88%' }
    }
  );
});

/* ============================================================
   CONTACT SECTION — cinematic reveal
   ============================================================ */
gsap.fromTo('.contact-title',
  { opacity: 0, y: 40, scale: 0.96 },
  {
    opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#contact', start: 'top 75%' }
  }
);
