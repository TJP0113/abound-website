// Lightweight enhancement: the first review is readable without JavaScript.
export function initReviewCarousel(root, motionPreference) {
  const slides = [...root.querySelectorAll('[data-review-slide]')];
  if (!slides.length) return;
  const area = root.closest('.home-reviews') || root;
  const controls = root.querySelector('[data-review-controls]');
  const counter = root.querySelector('[data-review-counter]');
  const status = root.querySelector('[data-review-status]');
  let index = 0;
  let timer;
  let hovered = false;
  let focused = false;

  root.querySelectorAll('.home-review-avatar img').forEach(img => {
    const update = () => {
      const loaded = img.complete && img.naturalWidth > 0;
      img.hidden = !loaded;
      img.parentElement.classList.toggle('is-loaded', loaded);
    };
    img.addEventListener('load', update);
    img.addEventListener('error', update);
    if (img.complete) update();
  });

  // Only enable overlapping, height-stable slides when more than one exists.
  if (slides.length < 2) return;
  controls.hidden = false;
  root.classList.add('review-carousel-ready');
  const schedule = () => {
    window.clearTimeout(timer);
    if (!hovered && !focused && !document.hidden && !motionPreference.matches) {
      timer = window.setTimeout(() => show(index + 1), 4000);
    }
  };
  const show = (next, manual = false) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
      slide.hidden = false;
    });
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (manual) status.textContent = `Review ${index + 1} of ${slides.length}`;
    schedule();
  };
  root.querySelector('[data-review-previous]').addEventListener('click', () => show(index - 1, true));
  root.querySelector('[data-review-next]').addEventListener('click', () => show(index + 1, true));
  root.addEventListener('keydown', event => {
    if (!controls.contains(event.target)) return;
    if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    show(index + (event.key === 'ArrowLeft' ? -1 : 1), true);
  });
  area.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  area.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  area.addEventListener('focusin', event => { focused = event.target.matches(':focus-visible'); schedule(); });
  area.addEventListener('focusout', event => { focused = area.contains(event.relatedTarget); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motionPreference.addEventListener('change', schedule);
  show(0);
}
