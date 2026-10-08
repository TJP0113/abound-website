import { renderPage } from './render.js';

// Keep the prerendered DOM intact; only render in development or on fallback pages.
const app = document.querySelector('#app');
if (!app.dataset.prerendered) app.innerHTML = renderPage(window.location.pathname);



const servicesDropdown = document.querySelector('.services-dropdown');
document.addEventListener('click', event => {
  if (!servicesDropdown.contains(event.target)) servicesDropdown.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && servicesDropdown.open) {
    servicesDropdown.open = false;
    servicesDropdown.querySelector('summary').focus();
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
let headerFrame = false;
const updateHeader = () => {
  header.classList.toggle('is-compressed', window.scrollY > 64);
  headerFrame = false;
};
window.addEventListener('scroll', () => {
  if (!headerFrame) { headerFrame = true; requestAnimationFrame(updateHeader); }
}, { passive: true });
updateHeader();
menuToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
});

const bannerElements = [...document.querySelectorAll('[data-banner-slide]')];
const bannerDots = [...document.querySelectorAll('[data-banner-dot]')];
const bannerCurrent = document.querySelector('[data-banner-current]');
const bannerPause = document.querySelector('[data-banner-pause]');
const bannerNext = document.querySelector('[data-banner-next]');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (bannerElements.length > 1) {
  let activeBanner = 0;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let bannerTimer;
  if (paused && bannerPause) {
    bannerPause.textContent = 'PLAY';
    bannerPause.setAttribute('aria-label', 'Resume slideshow');
    bannerPause.setAttribute('aria-pressed', 'true');
  }

  const showBanner = index => {
    activeBanner = (index + bannerElements.length) % bannerElements.length;
    bannerElements.forEach((slide, slideIndex) => {
      const active = slideIndex === activeBanner;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    bannerDots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeBanner;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    if (bannerCurrent) bannerCurrent.textContent = String(activeBanner + 1).padStart(2, '0');
  };

  const startBannerTimer = () => {
    window.clearInterval(bannerTimer);
    if (!paused && !document.hidden) bannerTimer = window.setInterval(() => showBanner(activeBanner + 1), 5000);
  };

  bannerDots.forEach(dot => dot.addEventListener('click', () => {
    showBanner(Number(dot.dataset.bannerDot));
    startBannerTimer();
  }));
  bannerNext?.addEventListener('click', () => {
    showBanner(activeBanner + 1);
    startBannerTimer();
  });
  bannerPause?.addEventListener('click', () => {
    paused = !paused;
    bannerPause.setAttribute('aria-pressed', String(paused));
    bannerPause.setAttribute('aria-label', paused ? 'Resume slideshow' : 'Pause slideshow');
    bannerPause.textContent = paused ? 'PLAY' : 'PAUSE';
    startBannerTimer();
  });
  document.addEventListener('visibilitychange', startBannerTimer);
  motionPreference.addEventListener('change', event => {
    paused = event.matches;
    bannerPause.setAttribute('aria-pressed', String(paused));
    bannerPause.setAttribute('aria-label', paused ? 'Resume slideshow' : 'Pause slideshow');
    bannerPause.textContent = paused ? 'PLAY' : 'PAUSE';
    startBannerTimer();
  });
  bannerElements[0].inert = false;
  startBannerTimer();
}

document.querySelector('.contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const subject = encodeURIComponent(`Project enquiry — ${values.get('name')}`);
  const message = encodeURIComponent([
    `Name: ${values.get('name')}`,
    `Company: ${values.get('company') || 'Not provided'}`,
    `Email: ${values.get('email')}`,
    `Service: ${values.get('service') || 'Not specified'}`,
    '',
    values.get('details') || '',
  ].join('\n'));
  form.querySelector('.form-message').textContent = 'Your email app is opening with the enquiry details.';
  window.location.href = `mailto:aboundcreation@gmail.com?subject=${subject}&body=${message}`;
});

document.querySelectorAll('.portfolio-filter button').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.portfolio-filter button').forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('.portfolio-page .project-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

// Preserve inline emphasis and explicit line breaks while revealing each title line.
document.querySelectorAll('main h1, main h2:not(.section-label):not(.visually-hidden)').forEach(heading => {
  heading.classList.add('title-reveal');
  heading.innerHTML = heading.innerHTML.split(/<br\s*\/?\s*>/i).map((line, index) =>
    `<span class="title-line"><span style="--line-delay:${index * 90}ms">${line}</span></span>`
  ).join('');
});
document.querySelectorAll('.project-grid').forEach(grid => {
  grid.querySelectorAll('.project-card').forEach((card, index) => {
    card.classList.add('card-reveal');
    card.style.setProperty('--card-delay', `${(index % 3) * 90}ms`);
  });
});

// Keep native details semantics; animate measured answer height in both directions.
document.querySelectorAll('.qa-list details').forEach(details => {
  const summary = details.querySelector('summary');
  const answer = details.querySelector('p');
  const panel = document.createElement('div');
  panel.className = 'qa-answer';
  answer.before(panel);
  panel.append(answer);
  let animation;
  let expanded = details.open;
  summary.addEventListener('click', event => {
    event.preventDefault();
    expanded = !expanded;
    const from = panel.getBoundingClientRect().height;
    animation?.cancel();
    details.open = true;
    details.classList.toggle('is-closing', !expanded);
    if (motionPreference.matches || !panel.animate) {
      details.open = expanded;
      details.classList.remove('is-closing');
      return;
    }
    animation = panel.animate([
      { height: `${from}px`, opacity: from ? 1 : 0 },
      { height: `${expanded ? panel.scrollHeight : 0}px`, opacity: expanded ? 1 : 0 }
    ], { duration: 280, easing: 'cubic-bezier(.2,.7,.2,1)' });
    animation.onfinish = () => {
      details.open = expanded;
      details.classList.remove('is-closing');
      animation = null;
    };
  });
});

const revealSelector = '.reveal, .scroll-rise, .title-reveal, .card-reveal';
motionPreference.addEventListener('change', event => {
  if (event.matches) document.querySelectorAll(revealSelector).forEach(element => element.classList.add('is-visible'));
});
if ('IntersectionObserver' in window && !motionPreference.matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(revealSelector).forEach(element => observer.observe(element));
} else {
  document.querySelectorAll(revealSelector).forEach(element => element.classList.add('is-visible'));
}
