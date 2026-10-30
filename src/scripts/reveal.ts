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
}
