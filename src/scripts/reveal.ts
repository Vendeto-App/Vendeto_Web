declare global {
  interface Window { __vendetoReveal?: boolean }
}
window.__vendetoReveal = true;

const root = document.documentElement;
if (root.classList.contains('motion')) {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal] [data-anim], [data-reveal] .section-title, [data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: '0px 0px -8% 0px' }
  );
  targets.forEach((el) => observer.observe(el));

  // Safety net: reaching the bottom must never leave anything hidden.
  let ticking = false;

  const revealAll = () => {
    root.classList.add('reveal-all');
    window.removeEventListener('scroll', onScroll);
  };

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        revealAll();
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}
