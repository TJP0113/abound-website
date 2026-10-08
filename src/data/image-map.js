import { portfolioProjects } from './portfolio-data.js';
// Editorial slots are independent even when they currently share a demo asset.
// plannedSrc is a naming reservation, never an automatic fallback or live URL.
const slot = (page, section, filename, currentSrc, purpose, profile = 'service') => ({
  page, section, purpose, filename, currentSrc,
  plannedSrc: `/images/${page}/${filename}`,
  profile,
});
const visual = name => `/visuals/${name}.jpg`;
const serviceSlot = (folder, section, filename, source, purpose, profile) =>
  slot(`services/${folder}`, section, filename, visual(source), purpose, profile);

export const imageProfiles = {
  banner: { ratio: '2:1 recommended; current desktop container 2.35:1, mobile 4:5', dimensions: '2400 × 1200', fit: 'Desktop cover; mobile first slide contain, others cover', crop: 'Desktop positions: slide 01 center, 02 center 32%, 03 center 30%; ≤700px center top. Keep focal content central.', treatment: 'Existing dark shade; full colour', notes: 'Full-width slideshow; first slide eager/high priority, others lazy. First mobile slide allows letterboxing.' },
  service: { ratio: '4:3 recommended; desktop container is height-led', dimensions: '1600 × 1200', fit: 'contain', crop: 'No intentional crop; cream letterboxing allowed.', treatment: 'None', notes: 'Desktop 70vh, max 720px; ≤900px stacked 4:3, max-height 560px.' },
  gallery: { ratio: '4:3', dimensions: '1600 × 1200', fit: 'contain', crop: 'No intentional crop; preserve complete artwork.', treatment: 'None', notes: 'Desktop modular columns; mobile single column; lazy loading.' },
  photoWide: { ratio: 'Desktop 2:1; mobile 4:3', dimensions: '2400 × 1200', fit: 'contain', crop: 'No intentional crop; differing mobile ratio may add letterboxing.', treatment: 'None', notes: 'Photography gallery first visual spans all desktop columns; ≤680px 4:3.' },
  thumbnail: { ratio: '3:2', dimensions: '1800 × 1200', fit: 'cover', crop: 'Centered crop; keep important subject within central safe area.', treatment: 'None', notes: 'Shared by Portfolio grid and Home Featured Work where selected; hover scale 1.03.' },
  projectHero: { ratio: 'Natural image ratio; 3:2 recommended for future photography', dimensions: '2400 × 1600', fit: 'cover', crop: 'Top aligned; natural height capped at 900px. Tall assets can be clipped.', treatment: 'None', notes: 'Full content-width visual; eager/high priority. Separate from thumbnail for future replacement.' },
  belief: { ratio: 'Natural image ratio; 4:5 recommended', dimensions: '1600 × 2000', fit: 'cover', crop: 'Top aligned; image/container max-height 780px, mobile 560px.', treatment: 'Full colour', notes: 'Split on desktop, stacked ≤900px; selected mouse parallax max 6px, disabled for touch/reduced motion.' },
  overlay: { ratio: '3:4 recommended', dimensions: '1200 × 1600', fit: 'background-size: cover', crop: 'Centered, right-side region fades toward text.', treatment: 'grayscale(1), multiply, opacity 8% desktop / 6% tablet / 4% mobile', notes: 'Decorative pseudo-element; no alt text; currently uses an existing 768px optimized WebP.' },
  logo: { ratio: 'Preserve native logo ratio', dimensions: 'At least 960px wide; transparent PNG or SVG', fit: 'contain', crop: 'Do not crop logo.', treatment: 'Header original colour; footer white via CSS filter', notes: 'Same asset in header/footer; existing responsive logo variants retained.' },
  client: { ratio: 'Preserve native logo ratio', dimensions: '540px wide minimum; transparent PNG or SVG', fit: 'contain', crop: 'No crop; retain clear space.', treatment: 'None; original logo colours, no grayscale/multiply/opacity layer', notes: 'Desktop container 120–175px wide / 60–82px high; mobile 112×56px. Home marquee repeats a second accessible-hidden row; one slot per client, not duplicate files.' },
  texture: { ratio: '1:1 vector tile', dimensions: '640 × 640 SVG viewBox', fit: 'background-size: 640px; 480px tablet; 360px mobile', crop: 'Edge-faded, non-repeating abstract linework.', treatment: 'Opacity 5.5% desktop / 3.5% tablet / 2.5% mobile', notes: 'Home introduction left and Home CTA right only; shared decorative asset.' },
  favicon: { ratio: '1:1', dimensions: '32 × 32 or 48 × 48 PNG', fit: 'Browser icon', crop: 'No CSS crop.', treatment: 'None', notes: 'Keep existing /favicon.png and SEO/metadata paths intact.' },
};

export const imageMap = {
  home: {
    heroes: [
      slot('home', 'Hero slide 01', 'home-hero-01.webp', visual('cover'), 'Brand identity banner', 'banner'),
      slot('home', 'Hero slide 02', 'home-hero-02.webp', visual('uniform'), 'Uniform banner', 'banner'),
      slot('home', 'Hero slide 03', 'home-hero-03.webp', visual('posting-03'), 'Merchandise banner', 'banner'),
    ],
    texture: slot('home', 'About Us statement + Closing CTA', 'home-atmosphere-lines.svg', '/visuals/atmosphere-lines.svg', 'Shared light geometric texture', 'texture'),
  },
  about: {
    heroOverlay: slot('about', 'Hero background', 'about-hero-overlay-01.webp', '/optimized/visuals/business-card-768.webp', 'Temporary grayscale brand photograph', 'overlay'),
    belief: slot('about', 'Our Belief', 'about-belief-01.webp', visual('poster'), 'Supporting brand visual', 'belief'),
  },
  // Contact uses a live Google Maps iframe, not an image slot.
  contact: {},
  services: {
    branding: {
      hero: serviceSlot('branding', 'Intro', 'branding-hero-01.webp', 'cover', 'Service introduction'),
      gallery: [
        serviceSlot('branding', 'Brand Identity & Applications', 'branding-identity-01.webp', 'poster', 'Logo, colour and typography', 'gallery'),
        serviceSlot('branding', 'Brand Identity & Applications', 'branding-application-print-01.webp', 'business-card', 'Packaging and printed materials', 'gallery'),
        serviceSlot('branding', 'Brand Identity & Applications', 'branding-application-uniform-digital-01.webp', 'posting-03', 'Uniforms and digital touchpoints', 'gallery'),
      ],
    },
    uniform: {
      hero: serviceSlot('uniform', 'Intro', 'uniform-hero-01.webp', 'uniform', 'Service introduction'),
      categories: [
        serviceSlot('uniform', 'Uniform Types', 'uniform-type-corporate-01.webp', 'uniform', 'Corporate and workwear', 'gallery'),
        serviceSlot('uniform', 'Uniform Types', 'uniform-type-everyday-event-01.webp', 'uniform', 'Everyday and events', 'gallery'),
        serviceSlot('uniform', 'Uniform Types', 'uniform-type-sport-01.webp', 'uniform', 'Sport and teamwear', 'gallery'),
      ],
    },
    merchandise: {
      hero: serviceSlot('merchandise', 'Intro', 'merchandise-hero-01.webp', 'posting-03', 'Service introduction'),
      categories: [
        serviceSlot('merchandise', 'Product Categories', 'merchandise-category-apparel-bags-01.webp', 'poster', 'Apparel and bags', 'gallery'),
        serviceSlot('merchandise', 'Product Categories', 'merchandise-category-drinkware-01.webp', 'business-card', 'Drinkware and lifestyle', 'gallery'),
        serviceSlot('merchandise', 'Product Categories', 'merchandise-category-office-event-01.webp', 'posting-03', 'Office and event essentials', 'gallery'),
      ],
      customization: serviceSlot('merchandise', 'Customization Options', 'merchandise-customization-01.webp', 'posting-03', 'Branding and packaging possibilities', 'gallery'),
    },
    marketing: {
      hero: serviceSlot('marketing', 'Intro', 'marketing-hero-01.webp', 'business-card', 'Service introduction'),
    },
    'graphic-design': {
      hero: serviceSlot('graphic-design', 'Intro', 'graphic-design-hero-01.webp', 'posting-02', 'Service introduction'),
      gallery: [
        serviceSlot('graphic-design', 'Selected Applications', 'graphic-design-application-social-01.webp', 'poster', 'Posters and social content', 'gallery'),
        serviceSlot('graphic-design', 'Selected Applications', 'graphic-design-application-corporate-packaging-01.webp', 'business-card', 'Business materials and packaging', 'gallery'),
        serviceSlot('graphic-design', 'Selected Applications', 'graphic-design-application-event-01.webp', 'posting-03', 'Signage and event graphics', 'gallery'),
      ],
    },
    photography: {
      hero: serviceSlot('photography', 'Intro', 'photography-hero-01.webp', 'poster', 'Service introduction'),
      types: serviceSlot('photography', 'Photography Types', 'photography-types-01.webp', 'cover', 'Brand, product, people and event photography', 'gallery'),
      gallery: ['poster', 'business-card', 'posting-03'].map((source, index) =>
        serviceSlot('photography', 'Visual Gallery', `photography-gallery-0${index + 1}.webp`, source, `Gallery visual ${index + 1}`, index === 0 ? 'photoWide' : 'gallery')),
    },
  },
  portfolio: Object.fromEntries(portfolioProjects.map(project => [project.slug, {
    cover: project.cover, details: project.images,
  }])),
  // Shared branding stays separate from content-page photography.
  shared: {
    logo: slot('shared', 'Header + Footer', 'abound-logo.png', '/abound-logo.png', 'Abound Creation logo', 'logo'),
    favicon: slot('shared', 'Browser tab', 'abound-favicon.png', '/favicon.png', 'Browser favicon', 'favicon'),
    clients: Object.fromEntries([
      ['trustinsure', '01'], ['ct-and-co', '02'], ['reka-furniture', '03'], ['top-point-interior-design', '04'],
      ['johindah-malim', '05'], ['everwyn-realty-management', '06'], ['stickjobs', '07'],
    ].map(([name, number]) => [name, slot('shared/clients', 'Home / Our Clients', `client-${name}-logo.png`, `/client-logos/client-${number}.png`, `${name} client logo`, 'client')])),
  },
};

export const serviceImageKeys = { branding: 'branding', uniform: 'uniform', merchandise: 'merchandise', 'marketing-services': 'marketing', graphic: 'graphic-design', 'photo-videography': 'photography' };
export function imagePath(entry) {
  if (!entry?.currentSrc) throw new Error('Missing image slot');
  return entry.currentSrc;
}
export function allImageSlots(value = imageMap) {
  if (value?.currentSrc) return [value];
  return Object.values(value).flatMap(child => allImageSlots(child));
}
