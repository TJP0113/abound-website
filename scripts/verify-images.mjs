import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { pages } from '../seo.js';
import { imageManifest } from '../image-manifest.js';
import { createPreviewServer } from './serve.mjs';

const details = JSON.parse(await readFile('image-sizes.json', 'utf8'));
const variants = new Map();
for (const [src, image] of Object.entries(details)) {
  const original = await readFile('public' + src);
  assert.equal(createHash('sha256').update(original).digest('hex'), image.originalSha256, src + ' original preserved');
  assert.equal(original.length, image.originalBytes);
  assert.equal(imageManifest[src].width, image.width);
  assert.equal(imageManifest[src].height, image.height);
  for (const variant of image.variants) {
    assert.ok(variant.width <= image.width, 'No upscaling');
    assert.ok(Math.abs(variant.height - image.height * variant.width / image.width) <= 0.5, 'Aspect ratio preserved');
    assert.equal((await stat('public' + variant.src)).size, variant.bytes);
    assert.equal((await stat('dist' + variant.src)).size, variant.bytes);
    variants.set(variant.src, image);
  }
  if (image.share) assert.ok((await stat('public' + image.share)).size < original.length);
}
for (const page of pages) {
  const html = await readFile('dist' + (page.path === '/' ? '' : page.path) + '/index.html', 'utf8');
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
  assert.ok(images.length > 0);
  let highPriority = 0;
  for (const tag of images) {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
    const source = variants.get(attrs.src);
    assert.ok(source, page.path + ': optimized source exists');
    assert.equal(Number(attrs.width), source.width); assert.equal(Number(attrs.height), source.height);
    assert.ok(attrs.sizes && attrs.srcset && 'alt' in attrs);
    assert.equal(attrs.decoding, 'async');
    for (const candidate of attrs.srcset.split(', ')) {
      const [src, width] = candidate.split(' ');
      const variant = source.variants.find(item => item.src === src);
      assert.ok(variant); assert.equal(width, variant.width + 'w');
    }
    if (attrs.fetchpriority === 'high') {
      highPriority++; assert.equal(attrs.loading, 'eager', page.path + ': LCP image must never be lazy');
    }
  }
  assert.equal(highPriority, page.path === '/contact' ? 0 : 1, page.path + ': only primary content image receives high priority');
  for (const match of html.matchAll(/class="(?:project-image|service-topic-image scroll-rise)">(<img\b[^>]*>)/g)) {
    if (page.path !== '/portfolio') assert.ok(match[1].includes('loading="lazy"'), page.path + ': below-fold image is lazy');
  }
}

const server = createPreviewServer(); server.listen(0, '127.0.0.1'); await once(server, 'listening');
try {
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const src of variants.keys()) {
    const response = await fetch(origin + src, { method: 'HEAD' });
    assert.equal(response.status, 200, src); assert.equal(response.headers.get('content-type'), 'image/webp');
  }
} finally { await new Promise(resolve => server.close(resolve)); }
console.log(`PASS: ${Object.keys(details).length} originals preserved, ${variants.size} responsive WebP files, all 13 pages have dimensions/srcset/sizes and correct LCP/lazy loading; WebP HTTP types verified.`);
