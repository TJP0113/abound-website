import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { once } from 'node:events';
import { pages, SITE_URL, redirects, escapeHtml, businessSchema, sitemapXml, robotsTxt } from '../seo.js';
import { renderPage } from '../render.js';
import { createPreviewServer } from './serve.mjs';

const titles = new Set(), descriptions = new Set();
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const invalid = ['/missing', '/services/not-a-service', '/portfolio/not-a-project', '/work/not-a-project', '/portfolio/extra/designed-to-wear', '/services/extra/branding', '/missing.xml', '/assets/missing.js'];
for (const page of pages) {
  const html = await readFile(join('dist', page.path.slice(1), 'index.html'), 'utf8');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  assert.equal((html.match(/<title>/g) || []).length, 1, page.path);
  assert.equal((main.match(/<h1\b/g) || []).length, 1, page.path + ' H1');
  assert.ok(html.includes(`<title>${escapeHtml(page.title)}</title>`), page.path);
  assert.ok(html.includes(`name="description" content="${escapeHtml(page.description)}"`), page.path);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${page.path}"`));
  assert.ok(!html.includes('seo-head') && !html.includes('noindex'));
  for (const attribute of ['og:title', 'og:description', 'og:url', 'og:type', 'og:site_name', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) assert.ok(html.includes(`"${attribute}"`), `${page.path} ${attribute}`);
  assert.ok(html.includes(`property="og:url" content="${SITE_URL}${page.path}"`));
  assert.ok(html.includes(`property="og:image" content="${SITE_URL}${page.image}"`));
  await access('public' + page.image);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(schema, businessSchema());
  assert.ok(html.includes(`<div id="app" data-prerendered="true">${renderPage(page.path)}</div>`), `${page.path} static body`);
  const levels = [...main.matchAll(/<h([1-6])\b/g)].map(match => Number(match[1]));
  for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1, `${page.path} heading hierarchy`);
  for (const match of html.matchAll(/<a\b[^>]*href="(\/(?!\/)[^"#?]*)"/g)) assert.ok(pages.some(item => item.path === match[1]), `${page.path} internal link ${match[1]}`);
  const route = config.routes.find(rule => rule.src && new RegExp(rule.src).test(page.path));
  assert.equal(route.dest, page.path === '/' ? '/index.html' : page.path + '/index.html');
  titles.add(page.title); descriptions.add(page.description);
}
assert.equal(titles.size, pages.length); assert.equal(descriptions.size, pages.length);
assert.equal(await readFile('dist/sitemap.xml', 'utf8'), sitemapXml());
assert.equal(await readFile('dist/robots.txt', 'utf8'), robotsTxt());
assert.equal((sitemapXml().match(/<loc>/g) || []).length, pages.length);
const notFound = await readFile('dist/404.html', 'utf8');
assert.ok(notFound.includes('Page not found.') && notFound.includes('noindex, follow'));
assert.ok(!notFound.includes('rel="canonical"') && !notFound.includes('application/ld+json'));
assert.equal(config.routes.at(-1).status, 404);
assert.equal(config.routes.at(-1).dest, '/404.html');
for (const path of invalid) {
  assert.ok(renderPage(path).includes('Page not found.'), path);
  const explicit = config.routes.slice(0, -1).find(rule => rule.src && new RegExp(rule.src).test(path));
  assert.equal(explicit, undefined, path + ' should reach filesystem/404 fallback');
}

// Test actual HTTP statuses rather than just the page's visible text.
const server = createPreviewServer();
server.listen(0, '127.0.0.1'); await once(server, 'listening');
const origin = `http://127.0.0.1:${server.address().port}`;
try {
  for (const page of pages) {
    const response = await fetch(origin + page.path);
    assert.equal(response.status, 200, page.path);
    assert.ok((await response.text()).includes(`<title>${escapeHtml(page.title)}</title>`));
  }
  for (const path of [...invalid, '/404.html']) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 404, path);
    assert.ok((await response.text()).includes('Page not found.'));
  }
  for (const [from, to] of Object.entries(redirects)) {
    for (const path of [from, from + '/']) {
      const response = await fetch(origin + path + '?ref=test', { redirect: 'manual' });
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('location'), to + '?ref=test');
    }
  }
  for (const page of pages.filter(page => page.path !== '/')) {
    for (const suffix of ['/', '/index.html']) {
      const response = await fetch(origin + page.path + suffix, { redirect: 'manual' });
      assert.equal(response.status, 308); assert.equal(response.headers.get('location'), page.path);
    }
  }
  for (const [path, type, expected] of [['/sitemap.xml', 'application/xml', sitemapXml()], ['/robots.txt', 'text/plain', robotsTxt()]]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200); assert.ok(response.headers.get('content-type').startsWith(type));
    assert.equal(await response.text(), expected);
  }
  const home = await (await fetch(origin)).text();
  for (const match of home.matchAll(/(?:src|href)="(\/assets\/[^" ]+)"/g)) assert.equal((await fetch(origin + match[1])).status, 200);
} finally { await new Promise(resolve => server.close(resolve)); }
console.log(`PASS: ${pages.length} static routes; unique metadata, canonicals, OG/Twitter, JSON-LD, H1/hierarchy, links, sitemap/robots, assets, redirects and genuine HTTP 404s.`);
