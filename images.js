import { imageManifest } from './image-manifest.js';

const escapeAttribute = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export function responsiveImage(src, alt, { sizes = '100vw', loading = 'lazy', priority = 'auto', style = '' } = {}) {
  const image = imageManifest[src];
  if (!image) throw new Error(`Missing responsive image: ${src}`);
  const srcset = image.variants.map(variant => `${variant.src} ${variant.width}w`).join(', ');
  return `<img src="${image.default}" srcset="${srcset}" sizes="${escapeAttribute(sizes)}" width="${image.width}" height="${image.height}" alt="${escapeAttribute(alt)}" loading="${loading}" decoding="async" fetchpriority="${priority}"${style ? ` style="${escapeAttribute(style)}"` : ''} />`;
}

export function socialImage(src) {
  return imageManifest[src]?.share || src;
}
