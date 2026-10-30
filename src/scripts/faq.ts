const items = Array.from(document.querySelectorAll<HTMLDetailsElement>('#preguntas details'));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const DURATION = 320;
const EASE = 'cubic-bezier(.22,1,.36,1)';
const running = new WeakMap<HTMLDetailsElement, { anim: Animation; opening: boolean }>();

// JS takes over exclusivity so the closing one can animate too.
items.forEach((d) => d.removeAttribute('name'));

function panel(d: HTMLDetailsElement) {
  return d.querySelector<HTMLElement>('.faq-answer')!;
}

function isOpenTarget(d: HTMLDetailsElement) {
  const r = running.get(d);
  return r ? r.opening : d.open;
}

function animate(d: HTMLDetailsElement, opening: boolean) {
  const el = panel(d);
  const wasOpen = d.open;
  // Start from the current on-screen height so a reversed animation does not jump.
  const from = wasOpen ? el.getBoundingClientRect().height : 0;
  running.get(d)?.anim.cancel();
  if (opening) d.open = true;
  const to = opening ? el.scrollHeight : 0;
  const keyframes = reduce.matches
    ? [{ opacity: opening ? 0 : 1 }, { opacity: opening ? 1 : 0 }]
    : [
        { height: `${from}px`, opacity: opening ? 0 : 1 },
        { height: `${to}px`, opacity: opening ? 1 : 0 },
      ];
  el.style.overflow = 'hidden';
  const anim = el.animate(keyframes, { duration: reduce.matches ? 200 : DURATION, easing: EASE });
  running.set(d, { anim, opening });
  anim.onfinish = () => {
    el.style.overflow = '';
    running.delete(d);
    if (!opening) d.open = false;
  };
  anim.oncancel = () => { el.style.overflow = ''; };
}

items.forEach((d) => {
  d.querySelector('summary')!.addEventListener('click', (e) => {
    e.preventDefault();
    const opening = !isOpenTarget(d);
    if (opening) {
      items.forEach((other) => { if (other !== d && isOpenTarget(other)) animate(other, false); });
    }
    animate(d, opening);
  });
});
