const projects = [
  {
    number: '01',
    title: 'Designed to Wear',
    category: 'UNIFORMS & TEAMWEAR',
    detail: 'Custom uniforms and apparel design for brands and teams.',
    image: '/visuals/uniform.jpg',
    alt: 'Abound Creation custom uniforms and apparel design campaign',
    slug: 'designed-to-wear',
    type: 'uniforms',
  },
  {
    number: '02',
    title: 'More Than a Brand',
    category: 'BRAND IDENTITY',
    detail: 'A tactile identity system built from color, material and clear visual cues.',
    image: '/visuals/posting-02.jpg',
    alt: 'Printed brand identity color system and visual design',
    slug: 'more-than-a-brand',
    type: 'identity',
  },
  {
    number: '03',
    title: 'Everyday Objects',
    category: 'MERCHANDISE',
    detail: 'Bringing a brand into daily life through considered physical pieces.',
    image: '/visuals/posting-03.jpg',
    alt: 'Branded merchandise and physical brand assets',
    slug: 'everyday-objects',
    type: 'merchandise',
  },
];

const bannerSlides = [
  {
    image: '/visuals/cover.jpg',
    alt: 'Abound Creation brand campaign in signature red',
    label: 'BRANDING · VISUAL IDENTITY',
    title: 'A brand world, built to last.',
    position: 'center',
  },
  {
    image: '/visuals/uniform.jpg',
    alt: 'Custom uniform and apparel design campaign',
    label: 'UNIFORM · TEAMWEAR',
    title: 'Made to wear. Made to represent.',
    position: 'center 32%',
  },
  {
    image: '/visuals/posting-03.jpg',
    alt: 'Merchandise and physical brand assets',
    label: 'MERCHANDISE · BRAND IN EVERYDAY LIFE',
    title: 'Good ideas belong out in the world.',
    position: 'center 30%',
  },
];

const services = [
  {
    number: '01', title: 'Branding', slug: 'branding', image: '/visuals/cover.jpg', alt: 'Brand identity direction by Abound Creation',
    description: 'Strategy and visual identity that give your brand a clear, recognizable point of view.',
    headline: 'Build a brand people recognize and remember.',
    detail: 'We shape the foundations of your brand, then bring them together in a visual identity with a consistent voice. From the first idea to the details customers see every day, each decision is made to feel distinct and connected.',
    offerings: ['Brand discovery and direction', 'Logo and visual identity systems', 'Colour, typography and graphic language', 'Brand guidelines and applications'],
  },
  {
    number: '02', title: 'Uniform', slug: 'uniform', image: '/visuals/uniform.jpg', alt: 'Custom uniform and teamwear design',
    description: 'Custom apparel designed around your people, purpose and brand character.',
    headline: 'Uniforms that bring your team together.',
    detail: 'We design custom uniforms and teamwear that balance comfort, function and brand expression. From silhouette and colour to logos and finishing details, the result feels right for the people who wear it and the work they do.',
    offerings: ['Uniform and teamwear concepts', 'Custom apparel graphics and placement', 'Colour and material direction', 'Production-ready design coordination'],
  },
  {
    number: '03', title: 'Graphic', slug: 'graphic', image: '/visuals/posting-02.jpg', alt: 'Graphic design and brand collateral',
    description: 'Clear, considered graphic design for the messages and materials your brand puts into the world.',
    headline: 'Make every message feel unmistakably yours.',
    detail: 'We translate your brand into useful, well-crafted graphic pieces. A consistent visual language helps everything from a campaign to a printed piece feel like part of the same story.',
    offerings: ['Campaign and promotional graphics', 'Print and marketing collateral', 'Packaging and layout design', 'Digital graphics and branded templates'],
  },
  {
    number: '04', title: 'Merchandise', slug: 'merchandise', image: '/visuals/posting-03.jpg', alt: 'Branded merchandise and everyday objects',
    description: 'Useful, thoughtful brand goods made to become part of everyday life.',
    headline: 'Bring your brand into people’s everyday.',
    detail: 'We create merchandise that feels considered, useful and worth keeping. Each item is selected and designed to carry your identity naturally, whether it is for a team, an event or a customer community.',
    offerings: ['Merchandise concept and curation', 'Branded gifts and event items', 'Product graphics and packaging', 'Coordinated merchandise collections'],
  },
  {
    number: '05', title: 'Photo & Videography', slug: 'photo-videography', image: '/visuals/poster.jpg', alt: 'Photography and videography for brand storytelling',
    description: 'Photography and moving images that tell your brand story with intention.',
    headline: 'Show your brand as it really feels.',
    detail: 'We plan and create visual content that expresses your brand with clarity and character. From the creative direction to the final images, every frame supports the story you want people to remember.',
    offerings: ['Creative direction and shoot planning', 'Brand and product photography', 'Short-form video and campaign content', 'Image selection and visual consistency'],
  },
  {
    number: '06', title: 'Marketing Services', slug: 'marketing-services', image: '/visuals/business-card.jpg', alt: 'Marketing campaign and branded communication materials',
    description: 'Connected marketing design that helps your brand communicate clearly across channels.',
    headline: 'Turn a clear brand into a consistent presence.',
    detail: 'We help shape how your brand shows up in its marketing. Together, we can build a clear campaign direction and create the visual materials that carry it across your chosen channels, with every piece working from the same brand story.',
    offerings: ['Campaign concept and visual direction', 'Marketing communication design', 'Social and digital campaign assets', 'Launch and promotional materials'],
  },
];

const clientLogos = [
  ['client-01.png', 'Trustinsure'],
  ['client-02.png', 'C.T & Co Chartered Accountants'],
  ['client-03.png', 'Reka Furniture'],
  ['client-04.png', 'Top Point Interior Design'],
  ['client-05.png', 'Johindah Malim'],
  ['client-06.png', 'Everwyn Realty Management'],
  ['client-07.png', 'Stickjobs'],
];

const link = (label, href, extra = '') => `<a href="${href}" ${extra}>${label}</a>`;
const arrowIcon = '<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const arrow = '<span class="link-arrow" aria-hidden="true">' + arrowIcon + '</span>';
const path = window.location.pathname.replace(/\/$/, '') || '/';
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
    link(label, href, `class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}`),
  ).join('');
  return `
    <header class="site-header">
      <a class="wordmark" href="/" aria-label="Abound Creation home">
        <img src="/abound-logo.png" alt="Abound Creation" />
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span>Menu</span><i aria-hidden="true"></i>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Main navigation">
        ${links}
        <a class="nav-whatsapp motion-cta" href="https://wa.me/60196609102" target="_blank" rel="noreferrer">Start a project ${arrow}</a>
      </nav>
      <a class="header-cta motion-cta" href="https://wa.me/60196609102" target="_blank" rel="noreferrer" aria-label="Start a project on WhatsApp">Start a project ${arrow}</a>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="footer-mark" href="/" aria-label="Abound Creation home"><img src="/abound-logo.png" alt="Abound Creation" /></a>
        </div>
        <section class="footer-contact" aria-labelledby="footer-contact-title">
          <h2 id="footer-contact-title">Contact</h2>
          <a href="mailto:aboundcreation@gmail.com"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg><span>aboundcreation@gmail.com</span></a>
          <a href="tel:+60196609102"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a15 15 0 0 1-7-7l3-2-2-5Z"/></svg><span>+60 19-660 9102</span></a>
          <a href="tel:+60137766128"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a15 15 0 0 1-7-7l3-2-2-5Z"/></svg><span>+60 13-776 6128</span></a>
          <a class="footer-address" href="https://maps.google.com/?q=4+Jalan+Seroja+41+Taman+Johor+Jaya+Johor+Bahru" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/></svg><span>4, Jalan Seroja 41,<br />Taman Johor Jaya,<br />81100 Johor Bahru,<br />Johor, Malaysia</span></a>
        </section>
        <nav class="footer-nav" aria-label="Footer navigation">
          <h2>Navigation</h2>
          ${link('Home', '/')}
          ${link('About', '/about')}
          ${link('Services', '/services')}
          ${link('Portfolio', '/portfolio')}
          ${link('Contact', '/contact')}
        </nav>
        <div class="footer-socials">
          <h2>Socials</h2>
          <a href="https://www.instagram.com/aboundcreation?igsi=M2VwbXg1ZDQwcXB2" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="icon-fill" cx="17.5" cy="6.8" r="1"/></svg><span>Instagram ${arrow}</span></a>
          <a href="https://www.facebook.com/p/Abound-Creation-61576845867548/" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.1 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8v3.1h2.7v8h3.4Z"/></svg><span>Facebook ${arrow}</span></a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Abound Creation. All rights reserved.</span>
        <span>Johor, Malaysia</span>
        <a href="#top">Back to top <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5m-7 7 7-7 7 7"/></svg></a>
      </div>
    </footer>`;
}

function projectCard(project, index = 0) {
  const href = `/portfolio/${project.slug}`;
  return `
    <a class="project-card project-card-${index + 1}" href="${href}" data-category="${project.type}">
      <div class="project-image"><img src="${project.image}" alt="${project.alt}" ${index > 1 ? 'loading="lazy"' : 'fetchpriority="high"'} /></div>
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
      ${clientLogos.map(([src, name]) => `<div class="client-logo"><img src="/client-logos/${src}" alt="${duplicate ? '' : name}" loading="lazy" /></div>`).join('')}
    </div>`;
}

function cta() {
  return `
    <section class="closing-cta">
      <span class="eyebrow">HAVE A PROJECT IN MIND?</span>
      <div class="closing-content">
        <h2>Let’s make your<br /><em>brand add up.</em></h2>
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
              <a class="banner-slide ${index === 0 ? 'is-active' : ''}" href="${index === 1 ? '/portfolio/designed-to-wear' : '/portfolio'}" aria-label="${slide.label}: ${slide.title}" aria-hidden="${index !== 0}" data-banner-slide>
                <img src="${slide.image}" alt="${slide.alt}" style="object-position:${slide.position}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
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

      <section class="intro-statement reveal">
        <div class="section-index"><span>01</span><span>ABOUT US</span></div>
        <div><h2>Your one-stop<br /><em>brand design studio.</em></h2><p>We are a creative design studio based in Johor Bahru, Malaysia, specializing in brand identity, custom uniforms, and merchandise. We help businesses build clear, consistent, and recognizable brands through logo design, visual identity systems, and a wide range of brand applications.</p><a class="button button-dark intro-about-link" href="/about">About Us ${arrow}</a></div>
      </section>

      <section class="selected-work section-pad reveal">
        <div class="section-heading">
          <div><span class="eyebrow">SELECTED WORK</span><h2>One idea.<br /><em>Many expressions.</em></h2></div>
          <a class="text-link" href="/portfolio">View all projects ${arrow}</a>
        </div>
        <div class="project-grid project-grid-featured">${projects.slice(0, 2).map(projectCard).join('')}</div>
      </section>

      <section class="services-preview reveal">
        <div class="services-heading scroll-rise">
          <div><span class="eyebrow">WHAT WE DO</span><h2>Everything your<br />brand needs to <em>show up.</em></h2></div>
          <p>One considered design approach, carried through every detail and touchpoint.</p>
        </div>
        <div class="service-list">${serviceRows(true)}</div>
        <a class="text-link motion-cta" href="/services">Explore our services ${arrow}</a>
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
          <div><span class="eyebrow">Q&A</span><h2 id="qa-title">A few things<br />you might <em>wonder.</em></h2></div>
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

      <section class="approach reveal">
        <div class="approach-top"><span class="eyebrow">HOW WE WORK</span><a class="text-link" href="/about">Our approach ${arrow}</a></div>
        <div class="approach-steps">
          <article class="approach-step"><span class="approach-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7 9.5h26v17H20l-8 6v-6H7z"/><path d="M13 16h14M13 21h9"/></svg></span><span class="approach-number">01</span><h3>Listen closely.</h3><p>We start with your goals, your people and what makes your brand distinct.</p></article>
          <article class="approach-step"><span class="approach-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 5v9M20 26v9M5 20h9M26 20h9M9.4 9.4l6.3 6.3m8.6 8.6 6.3 6.3m0-21.2-6.3 6.3m-8.6 8.6-6.3 6.3"/><circle cx="20" cy="20" r="4"/></svg></span><span class="approach-number">02</span><h3>Find the idea.</h3><p>We uncover the central thought that gives every design decision direction.</p></article>
          <article class="approach-step"><span class="approach-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><rect x="7" y="7" width="11" height="11"/><rect x="22" y="7" width="11" height="11"/><rect x="7" y="22" width="11" height="11"/><rect x="22" y="22" width="11" height="11"/></svg></span><span class="approach-number">03</span><h3>Design the system.</h3><p>We build a consistent visual language across identity, uniforms and more.</p></article>
          <article class="approach-step"><span class="approach-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="18" cy="22" r="11"/><path d="M18 16v7l5 3M23 9h10v10M33 9 23 19"/></svg></span><span class="approach-number">04</span><h3>Carry it through.</h3><p>We bring the design to life across the touchpoints your audience meets.</p></article>
        </div>
      </section>
      ${cta()}
    </main>
    ${footer()}`;
}

function pageIntro(kicker, title, description = '') {
  return `<section class="page-intro"><span class="eyebrow">${kicker}</span><h1>${title}</h1>${description ? `<p>${description}</p>` : ''}</section>`;
}

function about() {
  return `
    ${nav()}<main id="top" class="inner-page">
      ${pageIntro('ABOUT ABOUND CREATION', 'We see the<br /><em>whole picture.</em>', 'A design studio creating connected brand experiences — from the way a business looks to the way it shows up every day.')}
      <section class="about-feature section-pad reveal">
        <div class="about-feature-image"><img src="/visuals/poster.jpg" alt="Abound Creation brand design and merchandise direction" loading="lazy" /></div>
        <div><span class="eyebrow">ONE CREATIVE PARTNER</span><h2>Consistency makes<br />a brand <em>feel complete.</em></h2><p>Every detail plays a part in how people experience a brand. We bring identity, custom uniforms and merchandise into one thoughtful design process, so each piece feels like it belongs.</p></div>
      </section>
      <section class="principles section-pad reveal"><span class="eyebrow">OUR POINT OF VIEW</span><div class="principle-list"><article><span>01</span><h3>Start with meaning.</h3><p>We look for the idea at the heart of your brand before we make it visible.</p></article><article><span>02</span><h3>Design the connections.</h3><p>Identity, apparel and physical pieces should speak the same visual language.</p></article><article><span>03</span><h3>Make it work in life.</h3><p>Good design holds up in the places people actually see, use and wear it.</p></article></div></section>
      ${cta()}
    </main>${footer()}`;
}

function servicesPage() {
  return `
    ${nav()}<main id="top" class="inner-page">
      ${pageIntro('OUR SERVICES', 'A brand, made<br /><em>whole.</em>', 'From the first spark to the things people see, wear and take with them.')}
      <section class="services-catalog section-pad reveal" aria-label="Explore our services">
        ${services.map((service, index) => `
          <article class="service-feature service-feature-${index + 1} scroll-rise">
            <a class="service-feature-image" href="/services/${service.slug}" aria-label="Explore ${service.title}"><img src="${service.image}" alt="${service.alt}" loading="lazy" /></a>
            <div class="service-feature-copy"><span class="eyebrow">${service.number} / SERVICE</span><h2><a href="/services/${service.slug}">${service.title}</a></h2><p>${service.description}</p><a class="text-link" href="/services/${service.slug}">Explore ${service.title} ${arrow}</a></div>
          </article>`).join('')}
      </section>
      <section class="service-note reveal"><span class="eyebrow">BUILT TO WORK TOGETHER</span><h2>One connected<br /><em>design language.</em></h2><p>Start with one service or bring us in for the full picture. We’ll help create a coherent brand experience across every touchpoint.</p><a class="text-link" href="/contact">Talk through your project ${arrow}</a></section>
      ${cta()}
    </main>${footer()}`;
}

function serviceDetailPage(service) {
  const related = services.filter(item => item.slug !== service.slug).slice(0, 2);
  return `
    ${nav()}<main id="top" class="inner-page service-detail-page">
      ${pageIntro(`SERVICE ${service.number} · ABOUND CREATION`, service.title, service.description)}
      <figure class="service-detail-image"><img src="${service.image}" alt="${service.alt}" /><figcaption>ABOUND CREATION · ${service.title.toUpperCase()}</figcaption></figure>
      <section class="service-detail-copy section-pad reveal">
        <div><span class="eyebrow">HOW WE CAN HELP</span><h2>${service.headline}</h2></div>
        <div><p>${service.detail}</p><h3>What we can create</h3><ul>${service.offerings.map(item => `<li>${item}</li>`).join('')}</ul><a class="button button-dark motion-cta" href="/contact">Discuss your ${service.title} project ${arrow}</a></div>
      </section>
      <section class="service-related section-pad"><span class="eyebrow">EXPLORE MORE SERVICES</span><div>${related.map(item => `<a href="/services/${item.slug}"><span>${item.number}</span><strong>${item.title}</strong><i aria-hidden="true">${arrowIcon}</i></a>`).join('')}</div></section>
      ${cta()}
    </main>${footer()}`;
}

function portfolio() {
  return `
    ${nav()}<main id="top" class="inner-page">
      ${pageIntro('SELECTED WORK · 2024—2026', 'Ideas, carried<br /><em>all the way through.</em>', 'A look at brand identity, uniforms and merchandise — each designed to work as part of a bigger picture.')}
      <section class="portfolio-page section-pad"><div class="portfolio-filter" aria-label="Filter projects">
        <button type="button" class="is-selected" data-filter="all" aria-pressed="true">ALL WORK</button>
        <button type="button" data-filter="identity" aria-pressed="false">IDENTITY</button>
        <button type="button" data-filter="uniforms" aria-pressed="false">UNIFORMS</button>
        <button type="button" data-filter="merchandise" aria-pressed="false">MERCHANDISE</button>
      </div><div class="project-grid">${projects.map(projectCard).join('')}</div></section>
      ${cta()}
    </main>${footer()}`;
}

function projectPage(project) {
  return `
    ${nav()}<main id="top" class="case-page">
      <section class="case-intro"><span class="eyebrow">${project.number} · ${project.category}</span><h1>${project.title}<em>.</em></h1><p>${project.detail}</p></section>
      <figure class="case-image"><img src="${project.image}" alt="${project.alt}" /><figcaption>ABOUND CREATION · ${project.category}</figcaption></figure>
      <section class="case-description section-pad"><span class="eyebrow">THE IDEA</span><div><h2>Design that carries<br />through to <em>real life.</em></h2><p>${project.detail} A considered visual direction connects the idea to the things people see, use and wear every day.</p><a class="text-link" href="/portfolio">Back to all work ${arrow}</a></div></section>
      <section class="next-project section-pad"><span class="eyebrow">EXPLORE ANOTHER PROJECT</span><div class="project-grid">${projects.filter(item => item.slug !== project.slug).slice(0, 2).map(projectCard).join('')}</div></section>
      ${cta()}
    </main>${footer()}`;
}

function contact() {
  return `
    ${nav()}<main id="top" class="inner-page contact-page">
      <section class="page-intro contact-intro">
        <div class="contact-intro-copy"><span class="eyebrow">START A PROJECT</span><h1>Let’s make<br /><em>it add up.</em></h1><p>Tell us what you’re building, what you need and where you’d like to take your brand.</p></div>
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
          <button class="button button-dark motion-cta" type="submit">Send an enquiry ${arrow}</button>
          <p class="form-message" aria-live="polite"></p>
        </form>
        <aside class="contact-aside"><span class="eyebrow">OR REACH US DIRECTLY</span><a href="mailto:aboundcreation@gmail.com">aboundcreation@gmail.com ${arrow}</a><a href="tel:+60196609102">+60 19-660 9102 ${arrow}</a><a href="https://www.instagram.com/aboundcreation?igsi=M2VwbXg1ZDQwcXB2" target="_blank" rel="noreferrer">Instagram ${arrow}</a><p>Johor Bahru<br />Johor, Malaysia</p></aside>
      </section>
    </main>${footer()}`;
}

const portfolioSlug = path.split('/').pop();
const currentProject = projects.find(project => project.slug === portfolioSlug);
const currentService = services.find(service => service.slug === portfolioSlug);
let content;
if (isAbout) content = about();
else if (isServiceDetail && currentService) content = serviceDetailPage(currentService);
else if (isServices) content = servicesPage();
else if (isContact) content = contact();
else if (isPortfolio && (path.includes('/portfolio/') || path.includes('/work/'))) content = projectPage(currentProject || projects[0]);
else if (isPortfolio) content = portfolio();
else content = home();

document.querySelector('#app').innerHTML = content;

const menuToggle = document.querySelector('.menu-toggle');
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
document.querySelectorAll('main h1, main h2').forEach(heading => {
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
