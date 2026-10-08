import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, redirectFor } from '../seo.js';

const types = { '.html': 'text/html; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
export function createPreviewServer() {
  const root = fileURLToPath(new URL('../dist/', import.meta.url));
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch { pathname = '/invalid-url'; }
      const redirect = redirectFor(pathname);
      if (redirect) {
        response.writeHead(308, { Location: redirect + url.search });
        response.end(); return;
      }
      let file = pages.some(page => page.path === pathname)
        ? resolve(root, '.' + pathname, 'index.html') : resolve(root, '.' + pathname);
      let status = 200;
      const safe = file.startsWith(root.endsWith(sep) ? root : root + sep);
      const exists = safe && await stat(file).then(info => info.isFile()).catch(() => false);
      if (!exists || pathname === '/404.html') { file = resolve(root, '404.html'); status = 404; }
      response.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
      const body = await readFile(file);
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Preview error: build the site before previewing.');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const portIndex = process.argv.indexOf('--port');
  const hostIndex = process.argv.indexOf('--host');
  const port = portIndex > -1 ? Number(process.argv[portIndex + 1]) : 4173;
  const host = hostIndex > -1 ? process.argv[hostIndex + 1] || '127.0.0.1' : '127.0.0.1';
  createPreviewServer().listen(port, host, () => console.log(`Static preview: http://${host}:${port}`));
}
