// Add projects here. Array order controls the grid, numbering and featured work.
export const portfolioCategories = [
  { key: 'branding', label: 'Branding' },
  { key: 'uniforms', label: 'Uniforms' },
  { key: 'merchandise', label: 'Merchandise' },
  { key: 'graphic', label: 'Graphic' },
  { key: 'photo-videography', label: 'Photo & Videography' },
];
export const portfolioFilters = [{ key: 'all', label: 'All Work' }, ...portfolioCategories];
export const matchesPortfolioCategory = (project, category) => category === 'all' || project.categories.includes(category);

const asset = (folder, slug, purpose, currentSrc, alt) => {
  const filename = `${slug}-${purpose}.webp`;
  return {
    page: `portfolio/${folder}/${slug}`,
    section: purpose === 'cover' ? 'Portfolio grid / Home Featured Work' : 'Project detail',
    filename, currentSrc, plannedSrc: `/images/portfolio/${folder}/${slug}/${filename}`,
    purpose: purpose === 'cover' ? 'Project preview' : 'Project feature visual',
    profile: purpose === 'cover' ? 'thumbnail' : 'projectHero',
    alt,
  };
};

export const portfolioProjects = [
  {
    slug: 'professional-auto-detailing-shop', title: 'Professional Auto Detailing Shop', year: 2026,
    aliases: ['designed-to-wear'],
    categories: ['uniforms'], categoryLabel: 'Uniforms',
    cover: asset('uniforms', 'professional-auto-detailing-shop', 'cover', '/images/portfolio/uniforms/professional-auto-detailing-shop/professional-auto-detailing-shop-cover.webp', 'STICKJOBS black polo uniforms with yellow branding, shown from the front and back'),
    images: [asset('uniforms', 'professional-auto-detailing-shop', 'detail-01', '/images/portfolio/uniforms/professional-auto-detailing-shop/professional-auto-detailing-shop-cover.webp', 'STICKJOBS black polo uniforms with yellow branding, shown from the front and back')],
    services: ['/services/uniform'], client: 'STICKJOBS', location: 'Johor Bahru',
    description: 'Custom uniforms and apparel design for brands and teams.',
    // Existing metadata preserved; optional for new projects, which get generated defaults.
    seo: {
      title: 'STICKJOBS Uniform Design | Abound Creation',
      description: 'Explore custom uniforms for STICKJOBS, a professional auto detailing shop in Johor Bahru. A 2026 uniform and apparel design project by Abound Creation.',
    },
  },
  {
    slug: 'more-than-a-brand', title: 'More Than a Brand', year: null,
    categories: ['branding'], categoryLabel: 'Branding',
    cover: asset('branding', 'more-than-a-brand', 'cover', '/visuals/posting-02.jpg', 'Printed brand identity color system and visual design'),
    images: [asset('branding', 'more-than-a-brand', 'detail-01', '/visuals/posting-02.jpg', 'Printed brand identity color system and visual design')],
    services: ['/services/branding'], client: null, location: null,
    description: 'A tactile identity system built from color, material and clear visual cues.',
    seo: {
      title: 'More Than a Brand: Visual Identity | Abound Creation',
      description: 'Explore More Than a Brand, an Abound Creation identity project bringing colour, materials and clear visual cues into a connected design system.',
    },
  },
  {
    slug: 'everyday-objects', title: 'Everyday Objects', year: null,
    categories: ['merchandise'], categoryLabel: 'Merchandise',
    cover: asset('merchandise', 'everyday-objects', 'cover', '/visuals/posting-03.jpg', 'Branded merchandise and physical brand assets'),
    images: [asset('merchandise', 'everyday-objects', 'detail-01', '/visuals/posting-03.jpg', 'Branded merchandise and physical brand assets')],
    services: ['/services/merchandise'], client: null, location: null,
    description: 'Bringing a brand into daily life through considered physical pieces.',
    seo: {
      title: 'Everyday Objects: Branded Merchandise | Abound Creation',
      description: 'Discover Everyday Objects, an Abound Creation merchandise project bringing brand identity into useful, considered physical pieces.',
    },
  },
];

// Catch invalid taxonomy and broken project identifiers before rendering/building.
const slugs = new Set();
const categoryKeys = new Set(portfolioCategories.map(category => category.key));
for (const project of portfolioProjects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug)) throw new Error(`Invalid or duplicate project slug: ${project.slug}`);
  if (!project.categories.length || project.categories.some(key => !categoryKeys.has(key))) throw new Error(`Invalid categories: ${project.slug}`);
  if (!project.cover?.currentSrc || !Array.isArray(project.images)) throw new Error(`Missing project image data: ${project.slug}`);
  slugs.add(project.slug);
}
