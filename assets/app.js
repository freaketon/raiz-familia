(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Cerrar' : 'Menú';
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menú';
      }
    });
  }

  const progress = document.querySelector('.reading-progress span');
  const updateProgress = () => {
    if (!progress) return;
    const root = document.documentElement;
    const distance = root.scrollHeight - root.clientHeight;
    const value = distance > 0 ? Math.min(100, (root.scrollTop / distance) * 100) : 0;
    progress.style.width = `${value}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const chapterLinks = [...document.querySelectorAll('.chapter-nav a[href^="#"]')];
  const chapters = chapterLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && chapters.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      chapterLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.toggleAttribute('aria-current', active);
      });
    }, { rootMargin: '-20% 0px -68% 0px', threshold: [0, .2, .5] });
    chapters.forEach((chapter) => observer.observe(chapter));
  }
})();
