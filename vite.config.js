import { defineConfig } from 'vite';
import { readFile } from 'node:fs/promises';
import { pages, pageHtml, redirectFor, sitemapXml, robotsTxt } from './seo.js';
import { renderPage } from './render.js';

// Development uses the same route allowlist and SEO HTML as the static build.
export default defineConfig({
  appType: 'mpa',
  resolve: { preserveSymlinks: true },
  plugins: [{
    name: 'abound-static-pages',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url, 'http://localhost');
        const pathname = url.pathname;
        if (pathname.startsWith('/@') || pathname.startsWith('/node_modules/') || /\.(js|css|jpg|png|svg|webp)$/.test(pathname)) return next();
        const redirect = redirectFor(pathname);
        if (redirect) { response.writeHead(308, { Location: redirect + url.search }); response.end(); return; }
        if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
          response.setHeader('Content-Type', pathname.endsWith('.xml') ? 'application/xml' : 'text/plain');
          response.end(pathname.endsWith('.xml') ? sitemapXml() : robotsTxt()); return;
        }
        try {
          const template = await readFile(new URL('./index.html', import.meta.url), 'utf8');
          const html = pageHtml(template, pathname, renderPage(pathname));
          response.statusCode = pages.some(page => page.path === pathname) ? 200 : 404;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(await server.transformIndexHtml(pathname, html));
        } catch (error) { next(error); }
      });
    },
  }],
});
