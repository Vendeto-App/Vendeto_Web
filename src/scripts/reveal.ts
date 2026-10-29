declare global {
  interface Window {
    __vendetoReveal?: boolean;
  }
}

window.__vendetoReveal = true;

const root = document.documentElement;

if (root.classList.contains('motion')) {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  if (sections.length > 0) {
    const visibleRoot = window.innerHeight * 0.9;
    const observers = new Map<number, IntersectionObserver>();

    const observerFor = (threshold: number) => {
      const existing = observers.get(threshold);
      if (existing) return existing;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          });
        },
        { threshold, rootMargin: '0px 0px -10% 0px' }
      );

      observers.set(threshold, observer);
      return observer;
    };

    sections.forEach((section) => {
      const reachableRatio = visibleRoot / section.offsetHeight;
      observerFor(Math.min(0.3, Math.max(0.05, reachableRatio - 0.05))).observe(section);
    });
  }
}
