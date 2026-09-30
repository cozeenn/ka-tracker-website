// Shared timing matches the CSS tokens; all content remains usable without motion.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const active = new Set();
const swaps = new WeakMap();

function animate(element, frames, token = '--motion-duration', options = {}) {
  if (!element || preference.matches) return null;
  const style = getComputedStyle(document.documentElement);
  const animation = element.animate(frames, {
    duration: parseFloat(style.getPropertyValue(token)) || 280,
    easing: style.getPropertyValue('--motion-ease').trim(),
    ...options,
  });
  active.add(animation);
  const cleanup = () => active.delete(animation);
  animation.finished.then(cleanup, cleanup);
  return animation;
}

export function animateContent(...elements) {
  elements.forEach(element => {
    swaps.get(element)?.cancel();
    const animation = animate(element, [
      { opacity: 0.35, translate: '0 8px' },
      { opacity: 1, translate: '0 0' },
    ]);
    if (animation) swaps.set(element, animation);
  });
}

export function setupMotion() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // No hidden starting state: anchor navigation and no-JS fallbacks stay readable.
      animate(entry.target, [{ opacity: .55, translate: '0 14px' }, { opacity: 1, translate: '0 0' }], '--motion-reveal');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.section-head, .approach-layout, .demo-console, .about-grid, .faq-layout, .footer-top').forEach(el => observer.observe(el));

  document.addEventListener('click', event => {
    const control = event.target.closest('button, .button, .text-link');
    if (control && !control.disabled) animate(control, [{ scale: '.97' }, { scale: '1' }], '--motion-fast');
  });

  document.querySelectorAll('details').forEach(details => {
    const summary = details.querySelector('summary');
    let animation, targetOpen = details.open;
    summary.addEventListener('click', event => {
      if (preference.matches) return;
      event.preventDefault();
      targetOpen = animation ? !targetOpen : !details.open;
      const start = details.getBoundingClientRect().height;
      animation?.cancel();
      details.style.height = '';
      details.open = true;
      const end = targetOpen ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + 1;
      details.dataset.expanded = String(targetOpen);
      details.style.overflow = 'hidden';
      animation = animate(details, [{ height: `${start}px` }, { height: `${end}px` }]);
      const current = animation;
      const settle = () => {
        if (animation !== current) return;
        details.open = targetOpen;
        details.style.overflow = '';
        delete details.dataset.expanded;
        animation = null;
      };
      current?.finished.then(settle, settle);
    });
  });

  const dialog = document.querySelector('#privacy');
  let closing = false;
  document.querySelector('.privacy-open').onclick = () => {
    if (closing) return;
    dialog.showModal();
    animate(dialog, [{ opacity: 0, translate: '0 12px', scale: '.98' }, { opacity: 1, translate: '0 0', scale: '1' }]);
  };
  const closeDialog = () => {
    if (closing) return;
    closing = true;
    const animation = animate(dialog, [{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: '0 8px' }], '--motion-fast');
    const finish = () => { dialog.close(); closing = false; };
    if (animation) animation.finished.then(finish, finish);
    else finish();
  };
  document.querySelector('.dialog-close').onclick = closeDialog;
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(); });
  preference.addEventListener('change', () => {
    if (preference.matches) active.forEach(animation => animation.cancel());
  });
}
