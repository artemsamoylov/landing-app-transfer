/* ============================================
   Landing Page — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('header');

  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ---- Mobile burger menu ---- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const ctaBtn = document.querySelector('.header__cta');
  let overlay = null;

  function createOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMenu);
    return overlay;
  }

  function openMenu() {
    burger.classList.add('active');
    nav.classList.add('mobile-open');
    if (ctaBtn) ctaBtn.classList.add('mobile-show');
    createOverlay();
    requestAnimationFrame(() => overlay.classList.add('active'));
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('mobile-open');
    if (ctaBtn) ctaBtn.classList.remove('mobile-show');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu on nav link click
  nav.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });


  /* ---- FAQ accordion ---- */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
      question.setAttribute('aria-expanded', String(!isActive));
    });
  });


  /* ---- Hero typewriter ---- */
  const typewriterEl = document.querySelector('.hero__typewriter-text');
  if (typewriterEl) {
    const lines = ['с iOS на Android', 'с Android на iOS'];
    const typeDelay = 90;
    const deleteDelay = 50;
    const pauseAfterType = 1800;
    const pauseAfterDelete = 600;

    let lineIndex = 0;
    let isTyping = true;
    let charIndex = 0;

    function typeChar() {
      const line = lines[lineIndex];
      if (isTyping) {
        charIndex++;
        typewriterEl.textContent = line.slice(0, charIndex);
        if (charIndex >= line.length) {
          isTyping = false;
          setTimeout(loop, pauseAfterType);
          return;
        }
        setTimeout(typeChar, typeDelay);
      }
    }

    function deleteChar() {
      if (charIndex <= 0) {
        lineIndex = (lineIndex + 1) % lines.length;
        isTyping = true;
        setTimeout(loop, pauseAfterDelete);
        return;
      }
      charIndex--;
      typewriterEl.textContent = lines[lineIndex].slice(0, charIndex);
      setTimeout(deleteChar, deleteDelay);
    }

    function loop() {
      if (isTyping) {
        typeChar();
      } else {
        deleteChar();
      }
    }

    setTimeout(loop, 800);
  }


  /* ---- Scroll reveal animation ---- */
  const revealElements = document.querySelectorAll(
    '.about__inner, .process__card, .faq__item, .process__cta-banner'
  );

  if ('IntersectionObserver' in window) {
    // Add initial hidden state via CSS class
    revealElements.forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger delay for cards in the same grid
      if (el.classList.contains('process__card')) {
        el.style.transitionDelay = `${(i % 3) * 0.1}s`;
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

});
