declare global {
  interface Window {
    __vendetoReveal?: boolean;
  }
}

window.__vendetoReveal = true;

const root = document.documentElement;

if (root.classList.contains('motion')) {
  const sections = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }
}
