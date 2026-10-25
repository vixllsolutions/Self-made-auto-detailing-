(() => {
  'use strict';
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  const progress = document.getElementById('scrollProgress');
  const year = document.getElementById('year');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const galleryButtons = Array.from(document.querySelectorAll('[data-lightbox]'));
  let activeGalleryIndex = 0;
  let lastFocusedElement = null;

  if (year) year.textContent = String(new Date().getFullYear());

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    primaryNav.classList.remove('is-open');
  }
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      primaryNav.classList.toggle('is-open', !isOpen);
    });
    primaryNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', event => {
      if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });
  }

  let scrollTicking = false;
  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0}%`;
    scrollTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollProgress);
      scrollTicking = true;
    }
  }, { passive: true });
  updateScrollProgress();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });
    revealItems.forEach(element => observer.observe(element));
  } else {
    revealItems.forEach(element => element.classList.add('is-visible'));
  }

  function showGallery(index) {
    if (!galleryButtons.length || !lightbox || !lightboxImage) return;
    activeGalleryIndex = (index + galleryButtons.length) % galleryButtons.length;
    const button = galleryButtons[activeGalleryIndex];
    const image = button.querySelector('img');
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = image ? image.alt : 'Vehicle detailing image';
    lightboxCaption.textContent = button.dataset.caption || (image ? image.alt : 'Vehicle detailing image');
  }
  galleryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      lastFocusedElement = button;
      showGallery(index);
      if (typeof lightbox.showModal === 'function') lightbox.showModal();
      else lightbox.setAttribute('open', 'open');
      lightboxClose?.focus();
    });
  });
  function closeLightbox() {
    if (!lightbox) return;
    if (typeof lightbox.close === 'function') lightbox.close();
    else lightbox.removeAttribute('open');
    lightboxImage.src = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }
  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => showGallery(activeGalleryIndex - 1));
  lightboxNext?.addEventListener('click', () => showGallery(activeGalleryIndex + 1));
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (!lightbox?.open) return;
    if (event.key === 'Escape') closeLightbox();
    else if (event.key === 'ArrowLeft') showGallery(activeGalleryIndex - 1);
    else if (event.key === 'ArrowRight') showGallery(activeGalleryIndex + 1);
  });

  // Avoid empty navigation when a browser blocks tel/sms handling: the user still sees real links.
  document.querySelectorAll('a[href^="tel:"],a[href^="sms:"]').forEach(link => {
    link.setAttribute('rel', 'nofollow');
  });
})();
