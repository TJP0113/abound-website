import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pages, pageHtml, sitemapXml, robotsTxt } from '../seo.js';
import { renderPage } from '../render.js';

const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<!-- seo-head -->')) throw new Error('SEO template marker is missing');
for (const page of pages) {
  const directory = join('dist', page.path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), pageHtml(template, page.path, renderPage(page.path)));
}
await writeFile('dist/404.html', pageHtml(template, '/404', renderPage('/404')));
await writeFile('dist/sitemap.xml', sitemapXml());
await writeFile('dist/robots.txt', robotsTxt());
console.log(`Prerendered ${pages.length} public routes, a 404 page, sitemap.xml and robots.txt.`);
