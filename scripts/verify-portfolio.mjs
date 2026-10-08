import assert from 'node:assert/strict';
import { portfolioProjects, portfolioCategories, portfolioFilters, matchesPortfolioCategory } from '../src/data/portfolio-data.js';
import { pages, redirects } from '../seo.js';
import { renderPage } from '../render.js';
import { imageManifest } from '../image-manifest.js';

assert.deepEqual(portfolioCategories.map(category => category.key), ['branding', 'uniforms', 'merchandise', 'graphic', 'photo-videography']);
const multi = { categories: ['branding', 'graphic', 'photo-videography'] };
for (const key of ['all', ...multi.categories]) assert(matchesPortfolioCategory(multi, key));
for (const key of ['uniforms', 'merchandise', 'identity']) assert(!matchesPortfolioCategory(multi, key));
const listing = renderPage('/portfolio');
for (const filter of portfolioFilters) assert(listing.includes(`data-filter="${filter.key}"`));
assert(!listing.includes('data-filter="identity"'));
for (const project of portfolioProjects) {
  const path = `/portfolio/${project.slug}`;
  assert(pages.some(page => page.path === path), `${path} registered`);
  assert.equal(redirects[`/work/${project.slug}`], path);
  assert(listing.includes(`data-categories="${project.categories.join(' ')}"`));
  const detail = renderPage(path);
  assert.equal((detail.match(/class="case-image"/g) || []).length, project.images.length);
  for (const entry of [project.cover, ...project.images]) assert(imageManifest[entry.currentSrc], entry.currentSrc);
}
console.log(`PASS: six filters, multi-category matching and ${portfolioProjects.length} data-driven project routes/image sequences.`);
