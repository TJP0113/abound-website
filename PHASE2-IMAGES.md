# Phase 2: images and Core Web Vitals

Implemented locally on the existing Vite/plain JavaScript website. The original
images remain untouched; a pre-Phase-2 ZIP backup was made before editing.

## What changed

- 61 responsive WebP files across six JPG visuals, seven transparent client logos and the brand logo.
- Photos use WebP quality 92; transparent logos use lossless WebP, including alpha.
- All variants resize the entire image proportionally. No crop, padding or art-direction change.
- Photos offer 480, 768, 1200, 1600, 2400 and up to 3200-pixel widths, capped at the source width.
- Client logos offer 180, 360 and 540-pixel widths; the brand logo offers 144, 288, 576 and 960-pixel widths.
- Every rendered image has width/height, srcset, sizes, and asynchronous decoding.
- Primary banner, service, About and project images are eager and high priority. The first portfolio card is also prioritized; its second visible card is eager at normal priority.
- Homepage project cards, related projects, service illustrations, client logos, later slides and footer logo are lazy-loaded.
- Existing object-fit/object-position and containers are preserved. CSS retains automatic proportional height where required and prevents client-logo grid children from exceeding the existing slot.
- Six smaller JPEG sharing images preserve the original aspect ratios. Social crawlers no longer receive the oversized originals.
- The static preview and Vite development server recognize WebP assets.

## Before/after file sizes

Values below use decimal KB/MB. Photo defaults are 1200px wide; logo defaults
are 360px wide except the brand logo, which uses 288px. These are representative
delivery sizes, not a claim that every visitor downloads all images or uses
these exact widths. Responsive selection depends on viewport and pixel density.

| Original asset | Original dimensions | Before | Default WebP | Reduction | Largest variant |
|---|---:|---:|---:|---:|---:|
| `/visuals/business-card.jpg` | 3000 × 3500 | 964.39 KB | 1200px · 154.61 KB | 84.0% | 3000px · 659.77 KB |
| `/visuals/cover.jpg` | 3546 × 1313 | 854.73 KB | 1200px · 38.05 KB | 95.5% | 3200px · 149.61 KB |
| `/visuals/poster.jpg` | 2480 × 3508 | 2,929.43 KB | 1200px · 221.60 KB | 92.4% | 2480px · 563.67 KB |
| `/visuals/posting-02.jpg` | 4500 × 5625 | 16,231.54 KB | 1200px · 526.77 KB | 96.8% | 3200px · 3,577.56 KB |
| `/visuals/posting-03.jpg` | 4500 × 5625 | 10,267.35 KB | 1200px · 282.18 KB | 97.3% | 3200px · 1,222.04 KB |
| `/visuals/uniform.jpg` | 4500 × 5625 | 3,879.02 KB | 1200px · 110.73 KB | 97.1% | 3200px · 407.70 KB |
| `/client-logos/client-01.png` | 3251 × 559 | 213.06 KB | 360px · 7.59 KB | 96.4% | 540px · 11.95 KB |
| `/client-logos/client-02.png` | 2946 × 1339 | 418.53 KB | 360px · 16.43 KB | 96.1% | 540px · 27.52 KB |
| `/client-logos/client-03.png` | 3050 × 1010 | 200.45 KB | 360px · 9.46 KB | 95.3% | 540px · 13.56 KB |
| `/client-logos/client-04.png` | 2881 × 1824 | 337.24 KB | 360px · 13.65 KB | 96.0% | 540px · 20.90 KB |
| `/client-logos/client-05.png` | 3173 × 1415 | 206.37 KB | 360px · 7.92 KB | 96.2% | 540px · 11.75 KB |
| `/client-logos/client-06.png` | 3025 × 519 | 303.64 KB | 360px · 13.92 KB | 95.4% | 540px · 21.77 KB |
| `/client-logos/client-07.png` | 3567 × 571 | 383.08 KB | 360px · 10.99 KB | 97.1% | 540px · 16.98 KB |
| `/abound-logo.png` | 1425 × 525 | 19.56 KB | 288px · 5.91 KB | 69.8% | 960px · 17.53 KB |

Total original source bytes: **37.21 MB**. Total default WebP bytes: **1.42 MB**, a **96.2% reduction**. Original source files remain on disk.

## Browser-selected examples

Browser checks at desktop and mobile breakpoints selected:

| Primary image | Original | Desktop selected | Mobile selected |
|---|---:|---:|---:|
| Homepage cover | 854.73 KB | 1600px · 58.21 KB | 480px · 8.88 KB |
| Graphic service | 16,231.54 KB | 768px · 184.82 KB | 480px · 69.27 KB |
| Designed to Wear project | 3,879.02 KB | 1200px · 110.73 KB | 480px · 33.51 KB |

The inspected CSS viewport widths were 1164px and 355px in the in-app browser.
Those are examples from this browser, not fixed delivery sizes.

## Verification

- `npm run build`: all 13 public pages rebuilt successfully.
- `npm run test:images`: original SHA-256 hashes unchanged; all 61 WebP assets exist; dimensions, srcsets, sizes, loading priorities and HTTP MIME types verified on all 13 pages.
- `python scripts/verify-image-quality.py`: decoded dimensions and lossless RGBA logos verified. Default photo PSNR against the proportionally resized original ranges from 35.41 to 44.74 dB.
- `npm run test:seo`: Phase 1 metadata, canonicals, sharing tags, JSON-LD, sitemap, robots, redirects and HTTP 404 checks pass.
- Browser checks: responsive variants selected, no console errors, and desktop/mobile image boxes and object-fit/object-position match the pre-change baseline on the homepage, graphic service and Designed to Wear project. Slideshow pause still works.
- Visual inspection confirms the same full composition, colours and readable artwork in original/optimized graphic imagery.

LCP benefits come from earlier eager/high-priority primary images and smaller
responsive payloads. Explicit dimensions reserve intrinsic ratios to reduce
image-induced layout shifts; lazy loading and async decoding reduce competing
work. INP has not been measured or claimed to improve. Production LCP/CLS/INP
and field data still need measurement after deployment. No deployment was made.

## Regeneration

Generated assets are committed-ready files; normal builds require no image
processing dependency. To regenerate from originals, use Python with Pillow
and WebP support:

```sh
python scripts/optimize-images.py
python scripts/verify-image-quality.py
npm run build
npm run test:images
npm run test:seo
```

`image-sizes.json` records every variant's exact bytes, dimensions and source
hash. `image-manifest.js` contains the smaller runtime mapping.

## Phase 2 files changed

Modified: `render.js`, `seo.js`, `style.css`, `package.json`,
`scripts/serve.mjs`, `vite.config.js`.

Added: `images.js`, `image-manifest.js`, `image-sizes.json`,
`scripts/optimize-images.py`, `scripts/verify-images.mjs`,
`scripts/verify-image-quality.py`, `PHASE2-IMAGES.md`.

Generated: 61 `.webp` files and six `-share.jpg` files under
`public/optimized/`, plus their copies in `dist/optimized/`. The build also
regenerated route HTML and hashed JS/CSS bundles. No original JPG/PNG was modified.
