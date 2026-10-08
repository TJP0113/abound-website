import { writeFile } from 'node:fs/promises';
import { allImageSlots, imageProfiles } from '../src/data/image-map.js';

const rows = allImageSlots().map(entry => {
  const profile = imageProfiles[entry.profile];
  return `### ${entry.page} — ${entry.section} — ${entry.filename}

- Target: \`${entry.plannedSrc}\`
- Current source: \`${entry.currentSrc}\` (still live; target is reserved)
- Purpose: ${entry.purpose}
- Recommended ratio: ${profile.ratio}
- Recommended dimensions: ${profile.dimensions}
- Fit / crop: ${profile.fit}; ${profile.crop}
- Grayscale / multiply / opacity: ${profile.treatment}
- Desktop / mobile: ${profile.notes}
`;
});

await writeFile('IMAGE-GUIDE.md', `# Abound Creation image guide

Generated from \`src/data/image-map.js\` by \`node scripts/generate-image-guide.mjs\`.
The map is the editable source of truth; regenerate this guide after changing slot metadata.
No existing images have been moved, renamed or replaced.

## Organization

\`public/images/\` contains home, about, contact, services/branding, services/uniform,
services/merchandise, services/marketing, services/graphic-design, services/photography,
and portfolio/{branding,uniforms,merchandise,graphic,photo-videography}/{project-slug}.
Portfolio entries come from src/data/portfolio-data.js, re-exported through the image map.
Earlier direct project directories are retained as empty reservations; no files were moved.
An additional shared/clients folder reserves shared brand and customer logo assets.
Directories currently contain only .gitkeep files; target image files do not exist yet.
Contact has no photograph slots: its location display is a Google Maps iframe.

## Naming and replacement workflow

1. Use lowercase hyphenated names from the slot inventory. Avoid spaces and generic camera filenames.
2. Put the approved final image at its plannedSrc location under public. Do not overwrite demo originals.
3. Use WebP for photography/mockups, transparent PNG or SVG for logos, SVG for the shared line texture.
4. For raster assets, run \`python scripts/optimize-images.py\` (requires Pillow/WebP).
   This scans both legacy originals and public/images, preserves sources and creates uncropped
   responsive WebP derivatives under public/optimized/images plus share JPGs and image-manifest.js.
5. After generation, set only that slot's currentSrc to its plannedSrc. The responsiveImage helper
   requires a registered manifest entry; simply adding a file is not enough. Direct CSS overlays,
   textures and SVG/logo replacements need no raster manifest unless rendered with responsiveImage.
   For an SVG rendered as an img, explicitly add SVG handling rather than bypassing the existing helper.
6. Update alt text in the renderer to describe the final image accurately. Adjust focal position only
   when necessary; validate desktop/tablet/mobile. Never put important text inside a cover-cropped image.
7. Run \`node scripts/generate-image-guide.mjs\`, \`npm run build\`, and \`npm run test:images\`.
8. Review the diff and commit sources, generated responsive files, manifests and guide together.

currentSrc is always the live source; plannedSrc is documentation, never an automatic fallback.
Dimensions listed here are preparation recommendations, not changes to the approved page layout.
For Home banners, supply a central safe area because mobile uses a different crop. Separate mobile
assets are not currently implemented; introduce them only when needed, with an explicit map slot.
Home Featured Work reuses the first two project cover slots; replacing them also updates the
Portfolio grid. Project detail slots are separate, even though their current source is shared.
See PORTFOLIO-GUIDE.md for project categories, route generation and multi-category filtering.

## Existing resource audit

- Six demo JPGs: business-card 3000×3500; cover 3546×1313; poster 2480×3508;
  posting-02, posting-03 and uniform each 4500×5625.
- Seven client PNGs, one Abound logo PNG (1425×525), favicon PNG and one line texture SVG.
- 61 responsive WebP derivatives and six sharing JPGs currently exist; these are necessary size
  variants, not accidental duplicates. image-manifest.js is generated; do not edit it manually.
- Demo photos are intentionally reused across slots. Uniform types currently all show uniform.jpg.
  No exact duplicate originals were found among the audited visual/client sources.
- client-01 through client-07 map respectively to Trustinsure, C.T & Co, Reka Furniture,
  Top Point Interior Design, Johindah Malim, Everwyn Realty Management and Stickjobs.
- Active renderers: render.js and service-overviews.js. The older serviceTopic helper in render.js,
  service-bilingual.js references, and untracked service-details.js/uniform-page.js drafts are not
  active image slots. They have not been moved or cleaned up in this task.
- seo.js sharing image selections, structured-data logo and index.html favicon stay unchanged.
  They reference existing originals/derived share images and are not additional visible page slots.
  Replacing a visible slot does not automatically replace social-share imagery.
- The client marquee renders a repeated decorative row; both instances share the same seven slots.
- Texture is enabled on Home statement/CTA only; photo overlay on About Hero only.
  All service backgrounds remain clean.

## Slot inventory (${rows.length} independent asset entries)

${rows.join('\n')}`, 'utf8');
console.log(`Generated IMAGE-GUIDE.md with ${rows.length} image entries.`);
