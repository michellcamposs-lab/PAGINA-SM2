/* ============================================================
   MICHELL CAMPOS – ARCHITECTURE PORTFOLIO
   JavaScript Principal — main.js
   ============================================================ */

'use strict';

// ── 1. Custom Cursor ──────────────────────────────────────────
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    raf = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const interactiveSelector =
    'a, button, .project-card, .ach-card, .skill-card, .cert-item, .social-link, .filter-btn, .timeline-card';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });
})();

// ── 2. Navbar scroll behaviour ────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── 3. Hamburger / Mobile menu ────────────────────────────────
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

// ── 4. Scroll Animations (Intersection Observer) ──────────────
(function initScrollAnimations() {
  const fadeEls  = document.querySelectorAll('.fade-in');
  const revealEls = document.querySelectorAll('.reveal');

  const options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  fadeEls.forEach(el => observer.observe(el));
  revealEls.forEach(el => observer.observe(el));
})();

// ── 5. Skill bar animation ────────────────────────────────────
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width') || '70';
        // Small delay so the CSS transition is visible
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 120);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

// ── 6. Project filtering ──────────────────────────────────────
(function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          // Reset animation
          card.classList.remove('visible');
          requestAnimationFrame(() => card.classList.add('visible'));
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// ── 7. Project Modal ──────────────────────────────────────────
const projectData = {
  vivienda: {
    title:  'Vivienda Multifamiliar',
    cat:    'Vivienda',
    year:   '2024',
    img:    'assets/project_vivienda.jpg',
    desc:   'Diseño de conjunto habitacional sostenible con énfasis en espacios comunitarios, ventilación natural y eficiencia energética en contexto urbano limeño. El proyecto propone una tipología de bloque lineal con patios internos que favorecen la convivencia y reducen la demanda energética mediante estrategias bioclimáticas pasivas.',
    tags:   ['AutoCAD', 'Revit', 'SketchUp', 'Twinmotion', 'Sostenibilidad', 'BIM']
  },
  urbano: {
    title:  'Proyecto Urbano',
    cat:    'Urbano',
    year:   '2023',
    img:    'assets/project_urbano.jpg',
    desc:   'Intervención urbana integral en espacio público con recuperación de áreas verdes, mobiliario contemporáneo y conectividad peatonal estratégica. Se propone una plaza articuladora que integra usos recreativos, culturales y de movilidad en un tejido consolidado.',
    tags:   ['AutoCAD', 'QGIS', 'Illustrator', 'InDesign', 'Urbanismo']
  },
  mercado: {
    title:  'Mercado Metropolitano',
    cat:    'Equipamiento',
    year:   '2023',
    img:    'assets/project_mercado.jpg',
    desc:   'Reinterpretación contemporánea del mercado tradicional limeño como nodo cultural, comercial y social con estructura metálica y cubierta vegetal. El proyecto integra zonas de venta, área gastronómica, patio central y galería de artesanía local bajo una envolvente permeable que regula el clima interior.',
    tags:   ['ArchiCAD', 'SketchUp', 'D5 Render', 'Photoshop', 'Equipamiento']
  },
  equipamiento: {
    title:  'Equipamiento Arquitectónico',
    cat:    'Equipamiento',
    year:   '2022',
    img:    'assets/project_equipamiento.jpg',
    desc:   'Centro cultural comunitario con programa mixto: biblioteca, talleres, auditorio y espacios de coworking integrados en un volumen paramétrico. La fachada perforada filtra la luz natural y genera una identidad urbana reconocible en el skyline del barrio.',
    tags:   ['Rhinoceros', 'Revit', 'Twinmotion', 'Photoshop', 'Paramétrico']
  },
  investigacion: {
    title:  'Investigación Urbana',
    cat:    'Investigación',
    year:   '2024',
    img:    'assets/project_investigacion.jpg',
    desc:   'Análisis territorial y cartografía urbana de densidad, movilidad y espacio público en distritos periféricos de Lima Metropolitana con herramientas SIG. El estudio identifica vacíos urbanos y propone estrategias de regeneración para áreas con déficit de equipamiento.',
    tags:   ['QGIS', 'AutoCAD', 'InDesign', 'Illustrator', 'Análisis Urbano']
  },
  renders: {
    title:  'Renderizados Arquitectónicos',
    cat:    'Visualización',
    year:   '2025',
    img:    'assets/project_renders.jpg',
    desc:   'Colección de visualizaciones fotorrealistas desarrolladas en Twinmotion y D5 Render, interiores y exteriores con iluminación HDR y materiales PBR. Cada imagen es resultado de un proceso detallado de modelado, iluminación y postproducción en Photoshop.',
    tags:   ['Twinmotion', 'D5 Render', 'Photoshop', 'SketchUp', 'Visualización']
  }
};

function openModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  const overlay = document.getElementById('modalOverlay');
  document.getElementById('modalImg').src     = data.img;
  document.getElementById('modalImg').alt     = data.title;
  document.getElementById('modalCat').textContent  = data.cat;
  document.getElementById('modalYear').textContent = data.year;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modalDesc').textContent   = data.desc;

  const tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = '';
  data.tags.forEach(t => {
    const span = document.createElement('span');
    span.className = 'modal-tag';
    span.textContent = t;
    tagsEl.appendChild(span);
  });

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  overlay.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  overlay.setAttribute('aria-hidden', 'true');
  // Clear img after transition
  setTimeout(() => {
    document.getElementById('modalImg').src = '';
  }, 350);
}

(function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  if (!overlay) return;

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();

// ── 8. Back to top ────────────────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
})();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── 9. Contact form ───────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('contact-submit');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Simple validation
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-msg').value.trim();

    if (!name || !email || !message) return;

    // Simulate send
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      success.classList.add('visible');
      submitBtn.innerHTML = 'Enviar Mensaje <i class="ph ph-paper-plane-tilt"></i>';
      submitBtn.disabled = false;
      setTimeout(() => success.classList.remove('visible'), 5000);
    }, 1200);
  });
})();

// ── 10. Typed effect on hero quote ───────────────────────────
(function initHeroTyped() {
  const quote = document.querySelector('.hero-quote');
  if (!quote) return;

  const text = quote.textContent;
  quote.textContent = '';
  quote.style.opacity = '1';

  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      quote.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 28);
})();

// ── 11. Parallax on hero grid ─────────────────────────────────
(function initParallax() {
  const grid = document.querySelector('.hero-bg-grid');
  if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        grid.style.transform = `translateY(${scrolled * 0.25}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── 12. Active nav link on scroll ────────────────────────────
(function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
})();

// ── 13. Stagger project cards on load ─────────────────────────
(function initProjectStagger() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
  });
})();
