import { portfolioProjects } from './src/data/portfolio-data.js';
import { socialImage } from './images.js';

export const SITE_URL = 'https://www.aboundcreation.com';

// These routes are the only indexable pages. Keep aliases out of the sitemap.
export const pages = [
  ['/', 'Brand Design Studio in Johor Bahru | Abound Creation', 'Abound Creation is a Johor Bahru design studio for branding, custom uniforms, graphic design, merchandise, photography and marketing.', 'cover'],
  ['/about', 'About Our Design Studio | Abound Creation', 'Meet Abound Creation, a design studio in Johor Bahru connecting brand identity, custom uniforms and merchandise through one thoughtful design process.', 'poster'],
  ['/portfolio', 'Branding, Uniform & Merchandise Portfolio | Abound Creation', 'Explore Abound Creation’s selected brand identity, uniform and merchandise projects, designed as connected expressions of each brand.', 'posting-02'],
  ['/contact', 'Contact Our Johor Bahru Studio | Abound Creation', 'Contact Abound Creation in Johor Jaya, Johor Bahru to discuss branding, uniforms, merchandise, photography and marketing for your next project.', 'business-card'],
  ['/services/branding', 'Branding & Logo Design in Johor Bahru | Abound Creation', 'Build a recognizable brand with Abound Creation in Johor Bahru. Explore brand direction, logo design, visual identity, applications and guidelines.', 'cover'],
  ['/services/uniform', 'Custom Uniform Design in Johor Bahru | Abound Creation', 'Explore custom uniforms and teamwear with Abound Creation in Johor Bahru, including garment design, fabric, fit, printing, embroidery and patches.', 'uniform'],
  ['/services/graphic', 'Graphic Design in Johor Bahru | Abound Creation', 'Abound Creation designs marketing graphics, corporate materials, print, packaging, event visuals and signage for consistent brand communication.', 'posting-02'],
  ['/services/merchandise', 'Custom Branded Merchandise | Abound Creation', 'Create branded apparel, office goods, drinkware, event merchandise and packaging with Abound Creation, a design studio based in Johor Bahru.', 'posting-03'],
  ['/services/photo-videography', 'Brand Photography & Video in Johor Bahru | Abound Creation', 'Explore product, corporate, brand, food and event photography, plus social media video content, with Abound Creation in Johor Bahru.', 'poster'],
  ['/services/marketing-services', 'Marketing & Content Services | Abound Creation', 'Plan your brand communication, social media content and campaign visuals with Abound Creation’s marketing and content services in Johor Bahru.', 'business-card'],
].map(([path, title, description, visual]) => ({ path, title, description, image: socialImage(`/visuals/${visual}.jpg`) })).concat(portfolioProjects.map(project => ({
  path: `/portfolio/${project.slug}`,
  title: project.seo?.title || `${project.title} | Abound Creation`,
  description: project.seo?.description || project.description || `Explore ${project.title}, an Abound Creation project.`,
  image: socialImage(project.cover.currentSrc),
})));

export const redirects = {
  ...Object.fromEntries(portfolioProjects.map(project => [`/work/${project.slug}`, `/portfolio/${project.slug}`])),
  '/services': '/services/branding',
  '/work': '/portfolio',
};

export function redirectFor(path) {
  const clean = path.replace(/\/$/, '') || '/';
  if (redirects[clean]) return redirects[clean];
  if (path !== clean && pages.some(page => page.path === clean)) return clean;
  if (path === '/index.html') return '/';
  if (path.endsWith('/index.html')) {
    const route = path.slice(0, -11);
    if (pages.some(page => page.path === route)) return route;
  }
  return null;
}

export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export function businessSchema() {
  // Facts already displayed in the site's footer/contact page. No invented
  // reviews, coordinates, price ranges, awards or business categories.
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    '@id': `${SITE_URL}/#business`,
    name: 'Abound Creation',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/abound-logo.png`,
    email: 'aboundcreation@gmail.com',
    telephone: '+60 19-660 9102',
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+60 19-660 9102' },
      { '@type': 'ContactPoint', telephone: '+60 13-776 6128' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4, Jalan Seroja 41, Taman Johor Jaya',
      postalCode: '81100',
      addressLocality: 'Johor Bahru',
      addressRegion: 'Johor',
      addressCountry: 'MY',
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00', closes: '18:00',
    }],
    sameAs: [
      'https://www.instagram.com/aboundcreation',
      'https://www.facebook.com/p/Abound-Creation-61576845867548/',
    ],
  };
}

export function seoHead(page) {
  if (!page) return '<title>Page Not Found | Abound Creation</title>\n<meta name="robots" content="noindex, follow" />';
  const url = SITE_URL + page.path;
  const title = escapeHtml(page.title), description = escapeHtml(page.description);
  const image = SITE_URL + page.image;
  const schema = JSON.stringify(businessSchema()).replace(/</g, '\\u003c');
  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Abound Creation" />
    <meta property="og:locale" content="en_MY" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${escapeHtml('Abound Creation — ' + page.title.split(' | ')[0])}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escapeHtml('Abound Creation — ' + page.title.split(' | ')[0])}" />
    <script type="application/ld+json">${schema}</script>`;
}

export function sitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${SITE_URL}${page.path}</loc></url>`).join('\n')}\n</urlset>\n`;
}

export function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

export function pageHtml(template, pathname, body) {
  const page = pages.find(item => item.path === pathname);
  return template.replace('<!-- seo-head -->', seoHead(page))
    .replace('<div id="app"></div>', `<div id="app" data-prerendered="true">${body}</div>`);
}
