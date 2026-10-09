import { portfolioProjects, portfolioFilters } from './src/data/portfolio-data.js';
import { imageMap, imagePath, serviceImageKeys } from './src/data/image-map.js';
import { responsiveImage } from './images.js';
import { outlineIcon } from './icons.js';
import { renderServiceOverview } from './service-overviews.js';
import { bilingualDetails as serviceDetails, serviceIntroductions } from './service-bilingual.js';

const projects = portfolioProjects.map((project, index) => ({
  ...project,
  number: String(index + 1).padStart(2, '0'),
  category: project.categoryLabel.toUpperCase(),
  detail: project.description || '',
  image: imagePath(project.cover),
  alt: project.cover.alt,
}));

const bannerSlides = [
  {
    image: imagePath(imageMap.home.heroes[0]),
    alt: 'Abound Creation brand campaign in signature red',
    label: 'BRANDING · VISUAL IDENTITY',
    title: 'A brand world, built to last.',
    position: 'center',
  },
  {
    image: imagePath(imageMap.home.heroes[1]),
    alt: 'Custom uniform and apparel design campaign',
    label: 'UNIFORM · TEAMWEAR',
    title: 'Made to wear. Made to represent.',
    position: 'center 32%',
  },
  {
    image: imagePath(imageMap.home.heroes[2]),
    alt: 'Merchandise and physical brand assets',
    label: 'MERCHANDISE · BRAND IN EVERYDAY LIFE',
    title: 'Good ideas belong out in the world.',
    position: 'center 30%',
  },
];

const services = [
  {
    number: '01', title: 'Branding', slug: 'branding', image: imagePath(imageMap.services[serviceImageKeys['branding']].hero), alt: 'Brand identity direction by Abound Creation',
    description: 'Strategy and visual identity that give your brand a clear, recognizable point of view.',
    headline: 'Build a brand people recognize and remember.',
    detail: 'We shape the foundations of your brand, then bring them together in a visual identity with a consistent voice. From the first idea to the details customers see every day, each decision is made to feel distinct and connected.',
    offerings: ['Brand discovery and direction', 'Logo and visual identity systems', 'Colour, typography and graphic language', 'Brand guidelines and applications'],
  },
  {
    number: '02', title: 'Uniform', slug: 'uniform', image: imagePath(imageMap.services[serviceImageKeys['uniform']].hero), alt: 'Custom uniform and teamwear design',
    description: 'Custom apparel designed around your people, purpose and brand character.',
    headline: 'Uniforms that bring your team together.',
    detail: 'We design custom uniforms and teamwear that balance comfort, function and brand expression. From silhouette and colour to logos and finishing details, the result feels right for the people who wear it and the work they do.',
    offerings: ['Uniform and teamwear concepts', 'Custom apparel graphics and placement', 'Colour and material direction', 'Production-ready design coordination'],
  },
  {
    number: '03', title: 'Graphic', slug: 'graphic', image: imagePath(imageMap.services[serviceImageKeys['graphic']].hero), alt: 'Graphic design and brand collateral',
    description: 'Clear, considered graphic design for the messages and materials your brand puts into the world.',
    headline: 'Make every message feel unmistakably yours.',
    detail: 'We translate your brand into useful, well-crafted graphic pieces. A consistent visual language helps everything from a campaign to a printed piece feel like part of the same story.',
    offerings: ['Campaign and promotional graphics', 'Print and marketing collateral', 'Packaging and layout design', 'Digital graphics and branded templates'],
  },
  {
    number: '04', title: 'Merchandise', slug: 'merchandise', image: imagePath(imageMap.services[serviceImageKeys['merchandise']].hero), alt: 'Branded merchandise and everyday objects',
    description: 'Useful, thoughtful brand goods made to become part of everyday life.',
    headline: 'Bring your brand into people’s everyday.',
    detail: 'We create merchandise that feels considered, useful and worth keeping. Each item is selected and designed to carry your identity naturally, whether it is for a team, an event or a customer community.',
    offerings: ['Merchandise concept and curation', 'Branded gifts and event items', 'Product graphics and packaging', 'Coordinated merchandise collections'],
  },
  {
    number: '05', title: 'Photo & Videography', slug: 'photo-videography', image: imagePath(imageMap.services[serviceImageKeys['photo-videography']].hero), alt: 'Photography and videography for brand storytelling',
    description: 'Photography and moving images that tell your brand story with intention.',
    headline: 'Show your brand as it really feels.',
    detail: 'We plan and create visual content that expresses your brand with clarity and character. From the creative direction to the final images, every frame supports the story you want people to remember.',
    offerings: ['Creative direction and shoot planning', 'Brand and product photography', 'Short-form video and campaign content', 'Image selection and visual consistency'],
  },
  {
    number: '06', title: 'Marketing Services', slug: 'marketing-services', image: imagePath(imageMap.services[serviceImageKeys['marketing-services']].hero), alt: 'Marketing campaign and branded communication materials',
    description: 'Connected marketing design that helps your brand communicate clearly across channels.',
    headline: 'Turn a clear brand into a consistent presence.',
    detail: 'We help shape how your brand shows up in its marketing. Together, we can build a clear campaign direction and create the visual materials that carry it across your chosen channels, with every piece working from the same brand story.',
    offerings: ['Campaign concept and visual direction', 'Marketing communication design', 'Social and digital campaign assets', 'Launch and promotional materials'],
  },
];

const clientLogos = [
  [imagePath(imageMap.shared.clients['trustinsure']), 'Trustinsure'],
  [imagePath(imageMap.shared.clients['ct-and-co']), 'C.T & Co Chartered Accountants'],
  [imagePath(imageMap.shared.clients['reka-furniture']), 'Reka Furniture'],
  [imagePath(imageMap.shared.clients['top-point-interior-design']), 'Top Point Interior Design'],
  [imagePath(imageMap.shared.clients['johindah-malim']), 'Johindah Malim'],
  [imagePath(imageMap.shared.clients['everwyn-realty-management']), 'Everwyn Realty Management'],
  [imagePath(imageMap.shared.clients['stickjobs']), 'Stickjobs'],
];

const fullImageSizes = 'calc(100vw - clamp(22px, 5.1vw, 82px) - clamp(22px, 5.1vw, 82px))';
const cardImageSizes = `(max-width: 700px) ${fullImageSizes}, calc((100vw - clamp(22px, 5.1vw, 82px) - clamp(22px, 5.1vw, 82px) - clamp(20px, 3vw, 46px)) / 2)`;
const serviceImageSizes = `(max-width: 900px) ${fullImageSizes}, calc((100vw - clamp(22px, 5.1vw, 82px) - clamp(22px, 5.1vw, 82px) - clamp(32px, 5vw, 80px)) / 2)`;

const link = (label, href, extra = '') => `<a href="${href}" ${extra}>${label}</a>`;
const arrowIcon = '<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const arrow = '<span class="link-arrow" aria-hidden="true">' + arrowIcon + '</span>';
export function renderPage(pathname) {
const path = pathname.replace(/\/$/, '') || '/';
const isHome = path === '/';
const isAbout = path === '/about';
const isServices = path === '/services';
const isServiceDetail = path.startsWith('/services/');
const isPortfolio = path === '/portfolio' || path === '/work' || path.startsWith('/portfolio/') || path.startsWith('/work/');
const isContact = path === '/contact';

function nav() {
  const items = [
    ['Home', '/', isHome],
    ['About', '/about', isAbout],
    ['Services', '/services', isServices || isServiceDetail],
    ['Portfolio', '/portfolio', isPortfolio],
    ['Contact', '/contact', isContact],
  ];
  const links = items.map(([label, href, active]) =>
    label === 'Services' ? `<details class="services-dropdown"><summary class="${active ? 'active' : ''}">Services <svg class="dropdown-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></summary><div class="services-dropdown-panel">${services.map(service => link(service.title, `/services/${service.slug}`, path === `/services/${service.slug}` ? 'class="active" aria-current="page"' : '')).join('')}</div></details>` : link(label, href, `class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}`),
  ).join('');
  return `
    <header class="site-header">
      <a class="wordmark" href="/" aria-label="Abound Creation home">
        ${responsiveImage(imagePath(imageMap.shared.logo), 'Abound Creation', { sizes: '142px', loading: 'eager' })}
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span>Menu</span><i aria-hidden="true"></i>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Main navigation">
        ${links}
        <a class="nav-whatsapp motion-cta specular-cta" href="https://wa.me/60196609102" target="_blank" rel="noreferrer"><span class="specular-label">Start a project</span> ${arrow}</a>
      </nav>
      <a class="header-cta motion-cta specular-cta" href="https://wa.me/60196609102" target="_blank" rel="noreferrer" aria-label="Start a project on WhatsApp"><span class="specular-label">Start a project</span> ${arrow}</a>
    </header>`;
}

function workingHours() {
  return `<section class="working-hours" aria-label="Working hours"><h2>Working Hours</h2><dl><div><dt>MON–FRI</dt><dd>9:00 AM–6:00 PM</dd></div><div><dt>SAT–SUN</dt><dd>OFF</dd></div></dl></section>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="footer-mark" href="/" aria-label="Abound Creation home">${responsiveImage(imagePath(imageMap.shared.logo), 'Abound Creation', { sizes: '(max-width: 700px) 105px, 118px' })}</a>
        </div>

        <nav class="footer-nav" aria-label="Footer navigation">
          <h2>Navigation</h2>
          ${link('Home', '/')}
          ${link('About', '/about')}
          ${link('Portfolio', '/portfolio')}
          ${link('Contact', '/contact')}
        </nav>
        <nav class="footer-nav footer-services" aria-label="Footer services">
          <h2>Services</h2>
          ${services.map(service => link(service.title, `/services/${service.slug}`)).join('')}
        </nav>
        <div class="footer-reach">
        <section class="footer-contact" aria-labelledby="footer-contact-title">
          <h2 id="footer-contact-title">Contact</h2>
          <a href="mailto:aboundcreation@gmail.com" aria-label="Email Abound Creation at aboundcreation@gmail.com"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg><span>aboundcreation@gmail.com</span></a>
          <a href="https://wa.me/60196609102" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp with +60 19-660 9102 (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a15 15 0 0 1-7-7l3-2-2-5Z"/></svg><span>+60 19-660 9102</span></a>
          <a href="https://wa.me/60137766128" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp with +60 13-776 6128 (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a15 15 0 0 1-7-7l3-2-2-5Z"/></svg><span>+60 13-776 6128</span></a>
          <a class="footer-address" href="https://maps.google.com/?q=4+Jalan+Seroja+41+Taman+Johor+Jaya+Johor+Bahru" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/></svg><span><span class="address-line">4, Jalan Seroja 41, Taman Johor Jaya,</span><span class="address-line">81100 Johor Bahru, Johor, Malaysia</span></span></a>
        </section>
        <div class="footer-socials">
          <h2>Socials</h2>
          <a href="https://www.instagram.com/aboundcreation?igsi=M2VwbXg1ZDQwcXB2" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="icon-fill" cx="17.5" cy="6.8" r="1"/></svg><span>Instagram ${arrow}</span></a>
          <a href="https://www.facebook.com/p/Abound-Creation-61576845867548/" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.1 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8v3.1h2.7v8h3.4Z"/></svg><span>Facebook ${arrow}</span></a>
          ${workingHours()}
        </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Abound Creation. All rights reserved.</span>
        <span>Johor, Malaysia</span>
        <a href="#top">Back to top <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5m-7 7 7-7 7 7"/></svg></a>
      </div>
    </footer>`;
}

function projectCard(project, index = 0, aboveFold = false) {
  const href = `/portfolio/${project.slug}`;
  return `
    <a class="project-card project-card-${index + 1}" href="${href}" data-categories="${project.categories.join(' ')}">
      <div class="project-image">${responsiveImage(project.image, project.alt, { sizes: cardImageSizes, loading: aboveFold && index < 2 ? 'eager' : 'lazy', priority: aboveFold && index === 0 ? 'high' : 'auto' })}</div>
      <div class="project-caption">
        <span class="project-number">${project.number}</span>
        <div><h3>${project.title}</h3><p>${project.category}</p></div>
        <span class="project-arrow" aria-label="View project">${arrow}</span>
      </div>
    </a>`;
}

function serviceRows(scrollReveal = false) {
  return services.map(service => `
    <a class="service-row${scrollReveal ? ' scroll-rise' : ''}" href="/services/${service.slug}">
      <span class="service-number">${service.number}</span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <span class="service-arrow" aria-hidden="true">${arrowIcon}</span>
    </a>`).join('');
}

function clientLogoRow(duplicate = false) {
  return `
    <div class="client-logo-group" ${duplicate ? 'aria-hidden="true"' : ''}>
      ${clientLogos.map(([src, name], index) => `<div class="client-logo client-logo--${index + 1}">${responsiveImage(src, duplicate ? '' : name, { sizes: '(max-width: 680px) 136px, 170px' })}</div>`).join('')}
    </div>`;
}

function cta() {
  return `
    <section class="closing-cta">
      <span class="eyebrow">HAVE A PROJECT IN MIND?</span>
      <div class="closing-content">
        <h2>Let’s make your<br /><em class="brand-gradient">brand add up.</em></h2>
        <div><p>Tell us what you’re building. We’ll help bring every part of it together.</p><a class="text-link motion-cta" href="/contact">Start a conversation ${arrow}</a></div>
      </div>
    </section>`;
}

function home() {
  return `
    ${nav()}
    <main id="top">
      <section class="hero hero-banner-only">
        <section class="hero-slideshow" aria-label="Featured Abound Creation work">
          <div class="banner-track">
            ${bannerSlides.map((slide, index) => `
              <a class="banner-slide ${index === 0 ? 'is-active' : ''}" href="${index === 1 ? '/portfolio/' + projects[0].slug : '/portfolio'}" aria-label="${slide.label}: ${slide.title}" aria-hidden="${index !== 0}" data-banner-slide>
                ${responsiveImage(slide.image, slide.alt, { sizes: '100vw', style: `object-position:${slide.position}`, loading: index === 0 ? 'eager' : 'lazy', priority: index === 0 ? 'high' : 'auto' })}
                <span class="banner-shade"></span>
                <span class="banner-copy"><small>${slide.label}</small><strong>${slide.title}</strong></span>
              </a>`).join('')}
          </div>
          <div class="banner-controls">
            <span class="banner-count"><span data-banner-current>01</span> <i>/</i> 0${bannerSlides.length}</span>
            <div class="banner-dots" role="group" aria-label="Choose a banner">
              ${bannerSlides.map((_, index) => `<button type="button" aria-label="Show banner ${index + 1}" aria-pressed="${index === 0}" class="${index === 0 ? 'is-active' : ''}" data-banner-dot="${index}"></button>`).join('')}
            </div>
            <button class="banner-pause" type="button" aria-label="Pause slideshow" aria-pressed="false" data-banner-pause>PAUSE</button>
            <button class="banner-next" type="button" aria-label="Show next banner" data-banner-next>${arrowIcon}</button>
          </div>
        </section>
      </section>

      <section class="intro-statement reveal has-texture texture-left" style="--atmosphere-texture:url('${imagePath(imageMap.home.texture)}')">
        <div class="section-index"><span>01</span><span>ABOUT US</span></div>
        <div><h1>Your one-stop<br /><em class="brand-gradient">brand design studio.</em></h1><p>We are a creative design studio based in Johor Bahru, Malaysia, specializing in brand identity, custom uniforms, and merchandise. We help businesses build clear, consistent, and recognizable brands through logo design, visual identity systems, and a wide range of brand applications.</p><a class="button button-dark intro-about-link" href="/about">About Us ${arrow}</a></div>
      </section>

      <section class="selected-work section-pad reveal">
        <div class="section-heading">
          <div><span class="eyebrow">SELECTED WORK</span><h2>One idea.<br /><em class="brand-gradient">Many expressions.</em></h2></div>
          <a class="text-link" href="/portfolio">View all projects ${arrow}</a>
        </div>
        <div class="project-grid project-grid-featured">${projects.slice(0, 2).map((project, index) => projectCard(project, index)).join('')}</div>
      </section>

      <section class="services-preview reveal">
        <div class="services-heading scroll-rise">
          <div><span class="eyebrow">WHAT WE DO</span><h2>Everything your<br />brand needs to <em class="brand-gradient">show up.</em></h2></div>
          <p>One considered design approach, carried through every detail and touchpoint.</p>
        </div>
        <div class="service-list">${serviceRows(true)}</div>
        <a class="text-link motion-cta" href="/services/branding">Explore branding ${arrow}</a>
      </section>

      <section class="clients-section" aria-labelledby="clients-title">
        <div class="clients-heading">
          <span class="eyebrow">TRUSTED BY</span>
          <h2 id="clients-title">Our clients.</h2>
          <p>We’re proud to work alongside people building something meaningful.</p>
        </div>
        <div class="clients-marquee" role="group" aria-label="Client logos moving from right to left">
          <div class="clients-track">${clientLogoRow()}${clientLogoRow(true)}</div>
        </div>
      </section>

      <section class="qa-section section-pad reveal" aria-labelledby="qa-title">
        <div class="qa-heading scroll-rise">
          <div><span class="eyebrow">Q&A</span><h2 id="qa-title">A few things<br />you might <em class="brand-gradient">wonder.</em></h2></div>
          <p>Some quick answers about working with Abound Creation.</p>
        </div>
        <div class="qa-list">
          <details class="scroll-rise" open>
            <summary><span>What does one-stop brand design include?</span><i aria-hidden="true"></i></summary>
            <p>We can bring together branding, uniforms, graphic design, merchandise, photography, videography and marketing services as one connected brand experience.</p>
          </details>
          <details class="scroll-rise">
            <summary><span>Can I request just one service?</span><i aria-hidden="true"></i></summary>
            <p>Yes. You can engage us for a single service or combine several areas. We’ll shape the scope around your project.</p>
          </details>
          <details class="scroll-rise">
            <summary><span>How do we get started?</span><i aria-hidden="true"></i></summary>
            <p>Send us a message on WhatsApp or through the contact page. We’ll learn about your goals and recommend a useful next step.</p>
          </details>
          <details class="scroll-rise">
            <summary><span>Do you work with businesses outside Johor?</span><i aria-hidden="true"></i></summary>
            <p>Yes. We’re based in Johor, Malaysia and can work with clients in other locations.</p>
          </details>
        </div>
      </section>

      <div class="approach-cta-particle-wrap" data-shared-particles>
        <section class="approach reveal">
          <div class="approach-top"><h2 class="eyebrow section-label">HOW WE WORK</h2><a class="text-link" href="/about">Our approach ${arrow}</a></div>
          <div class="approach-steps">
            <article class="approach-step"><span class="approach-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7 9.5h26v17H20l-8 6v-6H7z"/><path d="M13 16h14M13 21h9"/></svg></span><span class="approach-number">01</span><h3>Listen closely.</h3><p>We start with your goals, your people and what makes your brand distinct.</p></article>
            <article class="approach-step"><span class="approach-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 5v9M20 26v9M5 20h9M26 20h9M9.4 9.4l6.3 6.3m8.6 8.6 6.3 6.3m0-21.2-6.3 6.3m-8.6 8.6-6.3 6.3"/><circle cx="20" cy="20" r="4"/></svg></span><span class="approach-number">02</span><h3>Find the idea.</h3><p>We uncover the central thought that gives every design decision direction.</p></article>
            <article class="approach-step"><span class="approach-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><rect x="7" y="7" width="11" height="11"/><rect x="22" y="7" width="11" height="11"/><rect x="7" y="22" width="11" height="11"/><rect x="22" y="22" width="11" height="11"/></svg></span><span class="approach-number">03</span><h3>Design the system.</h3><p>We build a consistent visual language across identity, uniforms and more.</p></article>
            <article class="approach-step"><span class="approach-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="18" cy="22" r="11"/><path d="M18 16v7l5 3M23 9h10v10M33 9 23 19"/></svg></span><span class="approach-number">04</span><h3>Carry it through.</h3><p>We bring the design to life across the touchpoints your audience meets.</p></article>
          </div>
        </section>
        ${cta().replace('class="closing-cta"', `class="closing-cta has-texture texture-right" style="--atmosphere-texture:url('${imagePath(imageMap.home.texture)}')"`)}
      </div>
    </main>
    ${footer()}`;
}

function pageIntro(kicker, title, description = '') {
  return `<section class="page-intro"><span class="eyebrow">${kicker}</span><h1>${title}</h1>${description ? `<p>${description}</p>` : ''}</section>`;
}

function about() {
  const connections = [
    ['Identity', '品牌识别', 'How the brand looks and communicates.', '品牌如何呈现与沟通。', 'identity'],
    ['Apparel', '服装', 'How the team wears the brand.', '团队如何穿出品牌形象。', 'garment'],
    ['Physical', '实体应用', 'How the brand exists through merchandise and print.', '品牌如何通过周边与印刷物料融入现实。', 'cube'],
    ['Content', '内容', 'How the brand shows up consistently over time.', '品牌如何通过持续内容保持一致。', 'content'],
  ];
  const principles = [
    ['01', 'Start with meaning.', 'We look for the idea, purpose and context before deciding how something should look.', 'target'],
    ['02', 'Design the connections.', 'Identity, apparel, graphics and content should feel like parts of the same brand.', 'nodes'],
    ['03', 'Make it work in life.', 'Good design should hold up beyond the screen — in production, daily use and real environments.', 'check'],
  ];
  const closing = cta().replace('<section class="closing-cta">', '<section class="closing-cta"><div class="page-container"><p class="about-closing-line">One idea. Many expressions. One connected brand.</p>').replace('</section>', '</div></section>');
  return `
    ${nav()}<main id="top" class="inner-page about-page">
      <section class="about-hero has-photo-overlay photo-overlay-right photo-overlay-brand" style="--atmosphere-photo:url('${imagePath(imageMap.about.heroOverlay)}')"><div class="page-container"><span class="eyebrow">ABOUT ABOUND CREATION</span><h1>We see the<br /><em class="brand-gradient">whole picture.</em></h1><p>Abound Creation is a creative studio based in Johor Bahru, building connected brand experiences across identity, apparel, content and physical touchpoints.</p><p class="about-zh" lang="zh-Hans">Abound Creation 是一家位于新山的创意工作室，从品牌识别、服装、内容到实体应用，打造连贯而完整的品牌体验。</p></div></section>
      <section class="about-belief"><div class="page-container about-belief-grid"><div class="about-feature-image">${responsiveImage(imagePath(imageMap.about.belief), 'Abound Creation brand design and merchandise direction', { sizes: '(max-width: 900px) 90vw, 45vw', loading: 'eager', priority: 'high' })}</div><div><span class="eyebrow">OUR BELIEF</span><h2>Consistency makes<br />a brand <em class="brand-gradient">feel complete.</em></h2><p>A brand is experienced through more than a logo.<br />It appears in what people see, wear, hold and interact with.</p><p>We bring these touchpoints together so every part of the brand feels connected.</p><p class="about-zh" lang="zh-Hans">品牌不只存在于 Logo。<br />它存在于人们看见的、穿着的、拿在手上的，以及每一次与品牌接触的体验里。</p><p class="about-zh" lang="zh-Hans">我们将这些触点连接起来，让品牌从不同媒介到现实应用都保持一致。</p></div></div></section>
      <section class="about-connect"><div class="page-container"><h2 class="eyebrow">WHAT WE CONNECT</h2><div class="about-connect-grid">${connections.map(([title,zh,en,cn,icon])=>`<article>${outlineIcon(icon)}<h3>${title}</h3><span class="about-zh" lang="zh-Hans">${zh}</span><p>${en}</p><p class="about-zh" lang="zh-Hans">${cn}</p></article>`).join('')}</div></div></section>
      <section class="about-principles"><div class="page-container about-principles-grid"><h2 class="eyebrow">OUR POINT OF VIEW</h2><div class="principle-list">${principles.map(([n,title,copy,icon])=>`<article><span>${n}</span><h3>${outlineIcon(icon)}<span>${title}</span></h3><p>${copy}</p></article>`).join('')}</div></div></section>
      ${closing}
    </main>${footer()}`;
}

const serviceLayouts = {
  branding: ['modules', 'split', 'gallery', 'feature', 'checklist'],
  uniform: ['gallery', 'modules', 'split', 'checklist', 'split', 'feature', 'modules'],
  merchandise: ['gallery', 'split', 'modules', 'feature', 'checklist'],
  graphic: ['feature', 'modules', 'checklist', 'gallery', 'split', 'modules'],
  'photo-videography': ['gallery', 'split', 'feature', 'modules', 'gallery', 'split', 'checklist'],
  'marketing-services': ['modules', 'checklist', 'gallery', 'split', 'feature', 'modules'],
};

function serviceTopic(service, topic, index) {
  let [title, subtitle, description, points, visual, chineseDescription, chinesePoints] = topic;
  let audience = '';
  if (service.slug === 'branding' && index === 4) {
    audience = `<p lang="en">For ${points.join(', ').toLowerCase()}.</p><p class="bilingual-chinese" lang="zh-Hans">适合${chinesePoints.join('、')}。</p>`;
    title = 'What You Receive';
    subtitle = '最终你会得到';
    points = ['Brand Direction & Concept', 'Logo Design & Variations', 'Brand Colour Palette', 'Typography & Graphic System', 'Brand Applications', 'Brand Guidelines'];
    chinesePoints = ['品牌方向与概念', '标识设计与变化版本', '品牌标准色', '字体与图形系统', '品牌应用', '品牌使用规范'];
  }
  const layout = serviceLayouts[service.slug][index] || 'split';
  const intro = `<div class="topic-intro"><span class="eyebrow">${service.title} / ${String(index + 1).padStart(2, '0')}</span><h2 id="topic-${index}">${title}</h2><p class="service-topic-subtitle" lang="zh-Hans">${subtitle}</p><p lang="en">${description}</p><p class="bilingual-chinese" lang="zh-Hans">${chineseDescription}</p></div>`;
  const list = `<ul class="topic-deliverables">${points.map((point, pointIndex) => `<li><span class="deliverable-number" aria-hidden="true">${layout === 'checklist' ? '✓' : String(pointIndex + 1).padStart(2, '0')}</span><div><span lang="en">${point}</span><span class="bilingual-point" lang="zh-Hans">${chinesePoints[pointIndex]}</span></div></li>`).join('')}</ul>`;
  const image = `<figure class="service-topic-image">${responsiveImage(`/visuals/${visual}.jpg`, `Abound Creation ${service.title} visual placeholder`, { sizes: layout === 'feature' ? '90vw' : serviceImageSizes })}</figure>`;
  let body;
  if (layout === 'modules' || layout === 'checklist') body = `${intro.replace('</div>', `${audience}</div>`)}${list}`;
  else if (layout === 'gallery') {
    const visuals = [visual, ...(serviceDetails[service.slug].filter(row => row[4] !== visual).map(row => row[4]))].slice(0, 3);
    while (visuals.length < 3) visuals.push(visual);
    body = `${intro}<div class="topic-gallery">${visuals.map((asset, visualIndex) => `<figure>${responsiveImage(`/visuals/${asset}.jpg`, `${service.title} visual placeholder ${visualIndex + 1}`, { sizes: '(max-width: 680px) 80vw, 30vw' })}</figure>`).join('')}</div>${list}`;
  } else if (layout === 'feature') body = `${intro}${image}${list}`;
  else body = `<div class="service-topic-copy">${intro}${list}</div>${image}`;
  return `<section class="service-topic topic-${layout} section-pad" aria-labelledby="topic-${index}">${body}</section>`;
}

function serviceDetailPage(service) {
  return renderServiceOverview(service, { nav, footer, cta, responsiveImage, arrow });
}

function portfolio() {
  return `
    ${nav()}<main id="top" class="inner-page">
      ${pageIntro('SELECTED WORK · 2024—2026', 'Ideas, carried<br /><em class="brand-gradient">all the way through.</em>', 'A look at brand identity, uniforms and merchandise — each designed to work as part of a bigger picture.')}
      <section class="portfolio-page section-pad"><h2 class="visually-hidden">Selected projects</h2><div class="portfolio-filter" aria-label="Filter projects">
        ${portfolioFilters.map(({ key, label }) => `<button type="button" class="${key === 'all' ? 'is-selected' : ''}" data-filter="${key}" aria-pressed="${key === 'all'}">${label}</button>`).join('')}
      </div><div class="project-grid">${projects.map((project, index) => projectCard(project, index, true)).join('')}</div><p class="portfolio-empty" role="status" hidden>No projects in this category yet.</p></section>
      ${cta()}
    </main>${footer()}`;
}

function projectPage(project) {
  return `
    ${nav()}<main id="top" class="case-page">
      <section class="case-intro"><span class="eyebrow">${[project.number, project.category, project.client, project.year, project.location].filter(Boolean).join(' · ')}</span><h1>${project.title}<em>.</em></h1><p>${project.detail}</p></section>
      ${project.images.map((entry, index) => `<figure class="case-image">${responsiveImage(imagePath(entry), entry.alt || project.alt, { sizes: fullImageSizes, loading: index === 0 ? 'eager' : 'lazy', priority: index === 0 ? 'high' : 'auto' })}<figcaption>ABOUND CREATION · ${project.category}</figcaption></figure>`).join('')}
      <section class="case-description section-pad"><span class="eyebrow">THE IDEA</span><div><h2>Design that carries<br />through to <em class="brand-gradient">real life.</em></h2><p>${project.detail} A considered visual direction connects the idea to the things people see, use and wear every day.</p><a class="text-link" href="/portfolio">Back to all work ${arrow}</a></div></section>
      <section class="next-project section-pad"><span class="eyebrow">EXPLORE ANOTHER PROJECT</span><div class="project-grid">${projects.filter(item => item.slug !== project.slug).slice(0, 2).map((project, index) => projectCard(project, index)).join('')}</div></section>
      ${cta()}
    </main>${footer()}`;
}

function contact() {
  return `
    ${nav()}<main id="top" class="inner-page contact-page">
      <section class="page-intro contact-intro">
        <div class="contact-intro-copy"><span class="eyebrow">START A PROJECT</span><h1>Let’s make<br /><em class="brand-gradient">it add up.</em></h1><p>Tell us what you’re building, what you need and where you’d like to take your brand.</p></div>
        <div class="contact-location">
          <iframe title="Abound Creation location — 4, Jalan Seroja 41, Johor Bahru" src="https://maps.google.com/maps?q=4%2C%20Jalan%20Seroja%2041%2C%20Taman%20Johor%20Jaya%2C%2081100%20Johor%20Bahru%2C%20Johor%2C%20Malaysia&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
          <div class="contact-location-caption"><p>4, Jalan Seroja 41,<br />Taman Johor Jaya, 81100 Johor Bahru,<br />Johor, Malaysia</p><a class="text-link" href="https://maps.google.com/?q=4+Jalan+Seroja+41+Taman+Johor+Jaya+Johor+Bahru" target="_blank" rel="noreferrer">Open in Google Maps ${arrow}</a></div>
        </div>
      </section>
      <section class="contact-layout section-pad">
        <form class="contact-form">
          <label>Your name<input name="name" autocomplete="name" placeholder="Name" required /></label>
          <label>Company<input name="company" autocomplete="organization" placeholder="Company name" /></label>
          <label>Email<input name="email" type="email" autocomplete="email" placeholder="you@company.com" required /></label>
          <label>What do you need?<select name="service"><option value="">Choose a service</option>${services.map(service => `<option>${service.title}</option>`).join('')}<option>Not sure yet</option></select></label>
          <label class="form-wide">Tell us a little about it<textarea name="details" rows="4" placeholder="A few details about your project"></textarea></label>
          <button class="button button-dark motion-cta specular-cta" type="submit"><span class="specular-label">Send an enquiry</span> ${arrow}</button>
          <p class="form-message" aria-live="polite"></p>
        </form>
        <aside class="contact-aside"><span class="eyebrow">OR REACH US DIRECTLY</span><a href="mailto:aboundcreation@gmail.com">aboundcreation@gmail.com ${arrow}</a><a href="tel:+60196609102">+60 19-660 9102 ${arrow}</a><a href="https://www.instagram.com/aboundcreation?igsi=M2VwbXg1ZDQwcXB2" target="_blank" rel="noreferrer">Instagram ${arrow}</a><p>Johor Bahru<br />Johor, Malaysia</p>${workingHours()}</aside>
      </section>
    </main>${footer()}`;
}

function notFound() {
  return `${nav()}<main id="top" class="inner-page">${pageIntro('404 · PAGE NOT FOUND', 'Page not found.', 'The page you are looking for does not exist.')}<section class="section-pad"><a class="button button-dark" href="/">Back to home ${arrow}</a></section></main>${footer()}`;
}
const currentProject = projects.find(project => path === `/portfolio/${project.slug}` || path === `/work/${project.slug}`);
const currentService = services.find(service => path === `/services/${service.slug}`);
let content;
if (isAbout) content = about();
else if (isServiceDetail && currentService) content = serviceDetailPage(currentService);
else if (isServices) content = serviceDetailPage(services[0]);
else if (isContact) content = contact();
else if (isPortfolio && (path.includes('/portfolio/') || path.includes('/work/'))) content = currentProject ? projectPage(currentProject) : notFound();
else if (path === '/portfolio' || path === '/work') content = portfolio();
else if (isHome) content = home();
else content = notFound();

return content;
}
