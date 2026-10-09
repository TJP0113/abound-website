import { renderPage } from './render.js';
import { matchesPortfolioCategory } from './src/data/portfolio-data.js';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import GradientText from './src/components/GradientText.jsx';
import ClickSpark from './src/components/ClickSpark.jsx';
import Particles from './src/components/Particles.jsx';

// Keep the prerendered DOM intact; only render in development or on fallback pages.
const app = document.querySelector('#app');
if (!app.dataset.prerendered) app.innerHTML = renderPage(window.location.pathname);



const servicesDropdown = document.querySelector('.services-dropdown');
const desktopServices = window.matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)');
const reducedServicesMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let servicesCloseTimer;
let servicesAnimation;
let servicesHovered = false;
const servicesPanel = servicesDropdown.querySelector('.services-dropdown-panel');
const cancelServicesClose = () => {
  window.clearTimeout(servicesCloseTimer);
  servicesAnimation?.cancel();
  servicesAnimation = null;
};
const openServices = () => {
  cancelServicesClose();
  if (servicesDropdown.open) return;
  servicesDropdown.open = true;
  if (desktopServices.matches && !reducedServicesMotion.matches) {
    servicesAnimation = servicesPanel.animate([
      { opacity: 0, transform: 'translateY(-4px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 160, easing: 'ease-out' });
  }
};
const closeServices = (animate = false) => {
  cancelServicesClose();
  if (!servicesDropdown.open) return;
  if (animate && desktopServices.matches && !reducedServicesMotion.matches) {
    servicesAnimation = servicesPanel.animate([
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ], { duration: 140, easing: 'ease-in' });
    servicesAnimation.onfinish = () => {
      servicesDropdown.open = false;
      servicesAnimation = null;
    };
  } else servicesDropdown.open = false;
};
const scheduleServicesClose = () => {
  window.clearTimeout(servicesCloseTimer);
  servicesCloseTimer = window.setTimeout(() => {
    if (!servicesHovered && !servicesDropdown.contains(document.activeElement)) closeServices(true);
  }, 150);
};
servicesDropdown.addEventListener('pointerenter', event => {
  if (!desktopServices.matches || event.pointerType === 'touch') return;
  servicesHovered = true;
  openServices();
});
servicesDropdown.addEventListener('pointerleave', () => {
  servicesHovered = false;
  if (desktopServices.matches) scheduleServicesClose();
});
servicesDropdown.addEventListener('focusin', () => {
  if (desktopServices.matches) openServices();
});
servicesDropdown.addEventListener('focusout', () => {
  if (desktopServices.matches) scheduleServicesClose();
});
servicesDropdown.querySelector('summary').addEventListener('click', event => {
  // Hover already opened it; retain native keyboard and touch activation.
  if (desktopServices.matches && event.detail > 0 && event.pointerType !== 'touch') {
    event.preventDefault();
    openServices();
  }
});
desktopServices.addEventListener('change', () => {
  servicesHovered = false;
  closeServices();
});
document.addEventListener('click', event => {
  if (!servicesDropdown.contains(event.target)) closeServices();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && servicesDropdown.open) {
    servicesDropdown.querySelector('summary').focus();
    closeServices();
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

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.specular-cta').forEach(button => {
    button.addEventListener('pointermove', event => {
      const bounds = button.getBoundingClientRect();
      button.style.setProperty('--specular-x', `${event.clientX - bounds.left}px`);
      button.style.setProperty('--specular-y', `${event.clientY - bounds.top}px`);
    }, { passive: true });
  });
}

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
      card.hidden = !matchesPortfolioCategory({ categories: card.dataset.categories.split(' ') }, filter);
      if (!card.hidden) card.classList.add('is-visible');
    });
    const empty = document.querySelector('.portfolio-empty');
    if (empty) empty.hidden = !!document.querySelector('.portfolio-page .project-card:not([hidden])');
  });
});

// Preserve inline emphasis and explicit line breaks while revealing each title line.
const editorialHeadings = '.intro-statement h1, .about-hero h1, .service-intro h1, .closing-cta h2'
  + (document.querySelector('.portfolio-page') ? ', .page-intro h1' : '');
document.querySelectorAll(editorialHeadings).forEach(heading => {
  heading.classList.add('title-reveal');
  heading.innerHTML = heading.innerHTML.split(/<br\s*\/?\s*>/i).map((line, index) =>
    `<span class="title-line"><span style="--line-delay:${index * 100}ms">${line}</span></span>`
  ).join('');
});
document.querySelectorAll('.project-grid').forEach(grid => {
  grid.querySelectorAll('.project-card').forEach((card, index) => {
    card.classList.add('card-reveal');
    card.style.setProperty('--card-delay', `${(index % 3) * 100}ms`);
  });
});

// Limit reveals to meaningful visual groups, rather than every text section.
document.querySelectorAll('.qa-section, .qa-section .scroll-rise, .services-preview, .services-preview .scroll-rise, .clients-section, .approach').forEach(element => element.classList.remove('reveal', 'scroll-rise'));
document.querySelectorAll('.about-belief, .sc-gallery, .sc-feature, .sc-photo-types').forEach(element => element.classList.add('scroll-rise'));
document.querySelectorAll('.sc-cards').forEach(grid => {
  [...grid.children].forEach((element, index) => {
    element.classList.add('card-reveal');
    element.style.setProperty('--card-delay', `${(index % 3) * 100}ms`);
  });
});
document.querySelectorAll('.approach-step, .principle-list article, .sc-process li').forEach(element => {
  const number = element.querySelector('.approach-number, .sc-number, :scope > span');
  if (number) number.classList.add('number-reveal');
});
document.querySelectorAll('.service-list, .about-principles, .sc-section--process .page-container').forEach(element => element.classList.add('divider-reveal'));

// One selected visual gets a small pointer response; touch and reduced motion stay static.
const parallaxVisual = document.querySelector('.about-feature-image');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
if (parallaxVisual) {
  const image = parallaxVisual.querySelector('img');
  let visible = false;
  let frame = 0;
  let x = 0;
  let y = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    image.style.removeProperty('--pointer-x');
    image.style.removeProperty('--pointer-y');
    parallaxVisual.classList.remove('has-pointer-motion');
  };
  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) reset();
    });
    visibility.observe(parallaxVisual);
  }
  parallaxVisual.addEventListener('pointermove', event => {
    if (!visible || !finePointer.matches || motionPreference.matches || event.pointerType !== 'mouse') return;
    const bounds = parallaxVisual.getBoundingClientRect();
    x = Math.max(-6, Math.min(6, ((event.clientX - bounds.left) / bounds.width - .5) * 12));
    y = Math.max(-6, Math.min(6, ((event.clientY - bounds.top) / bounds.height - .5) * 12));
    if (!frame) frame = requestAnimationFrame(() => {
      parallaxVisual.classList.add('has-pointer-motion');
      image.style.setProperty('--pointer-x', `${x}px`);
      image.style.setProperty('--pointer-y', `${y}px`);
      frame = 0;
    });
  }, { passive: true });
  parallaxVisual.addEventListener('pointerleave', reset);
  finePointer.addEventListener('change', reset);
  motionPreference.addEventListener('change', reset);
}

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

const revealSelector = '.reveal, .scroll-rise, .title-reveal, .card-reveal, .number-reveal, .divider-reveal';
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

const aboundGradientColors = ['#650000', '#A90000', '#EB1D25', '#FF4848', '#A90000'];
document.querySelectorAll('.brand-gradient').forEach(element => {
  const headline = element.textContent;
  createRoot(element).render(createElement(GradientText, {
    className: 'headline-gradient',
    colors: aboundGradientColors,
    animationSpeed: 6,
    showBorder: false,
    direction: 'horizontal',
    pauseOnHover: false,
    yoyo: true,
  }, headline));
});

const particleSurface = document.querySelector('main');
if (particleSurface) {
  const particleMount = document.createElement('div');
  particleMount.className = 'white-particles-mount';
  particleMount.setAttribute('aria-hidden', 'true');
  particleSurface.classList.add('page-particles-surface');
  particleSurface.prepend(particleMount);
  const particlesRoot = createRoot(particleMount);
  particlesRoot.render(createElement(Particles, {
    particleColors: ['#eb1d25'],
    particleCount: 220,
    particleSpread: 6,
    speed: 0.06,
    particleBaseSize: 70,
    sizeRandomness: 0.8,
    moveParticlesOnHover: false,
    alphaParticles: true,
    disableRotation: false,
    pixelRatio: 1,
    randomSeed: 20261009,
    fillContainer: true,
  }));
}

const clickSparkMount = document.createElement('div');
clickSparkMount.className = 'click-spark-root';
clickSparkMount.setAttribute('aria-hidden', 'true');
document.body.append(clickSparkMount);
createRoot(clickSparkMount).render(createElement(ClickSpark, {
  sparkColor: '#eb1d25',
  sparkSize: 10,
  sparkRadius: 40,
  sparkCount: 10,
  duration: 400,
  easing: 'ease-out',
  extraScale: 1,
}));
