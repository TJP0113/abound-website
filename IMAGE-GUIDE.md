# Abound Creation image guide

Generated from `src/data/image-map.js` by `node scripts/generate-image-guide.mjs`.
The map is the editable source of truth; regenerate this guide after changing slot metadata.
No existing images have been moved, renamed or replaced.

## Organization

`public/images/` contains home, about, contact, services/branding, services/uniform,
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
4. For raster assets, run `python scripts/optimize-images.py` (requires Pillow/WebP).
   This scans both legacy originals and public/images, preserves sources and creates uncropped
   responsive WebP derivatives under public/optimized/images plus share JPGs and image-manifest.js.
5. After generation, set only that slot's currentSrc to its plannedSrc. The responsiveImage helper
   requires a registered manifest entry; simply adding a file is not enough. Direct CSS overlays,
   textures and SVG/logo replacements need no raster manifest unless rendered with responsiveImage.
   For an SVG rendered as an img, explicitly add SVG handling rather than bypassing the existing helper.
6. Update alt text in the renderer to describe the final image accurately. Adjust focal position only
   when necessary; validate desktop/tablet/mobile. Never put important text inside a cover-cropped image.
7. Run `node scripts/generate-image-guide.mjs`, `npm run build`, and `npm run test:images`.
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

## Slot inventory (44 independent asset entries)

### home — Hero slide 01 — home-hero-01.webp

- Target: `/images/home/home-hero-01.webp`
- Current source: `/visuals/cover.jpg` (still live; target is reserved)
- Purpose: Brand identity banner
- Recommended ratio: 2:1 recommended; current desktop container 2.35:1, mobile 4:5
- Recommended dimensions: 2400 × 1200
- Fit / crop: Desktop cover; mobile first slide contain, others cover; Desktop positions: slide 01 center, 02 center 32%, 03 center 30%; ≤700px center top. Keep focal content central.
- Grayscale / multiply / opacity: Existing dark shade; full colour
- Desktop / mobile: Full-width slideshow; first slide eager/high priority, others lazy. First mobile slide allows letterboxing.

### home — Hero slide 02 — home-hero-02.webp

- Target: `/images/home/home-hero-02.webp`
- Current source: `/visuals/uniform.jpg` (still live; target is reserved)
- Purpose: Uniform banner
- Recommended ratio: 2:1 recommended; current desktop container 2.35:1, mobile 4:5
- Recommended dimensions: 2400 × 1200
- Fit / crop: Desktop cover; mobile first slide contain, others cover; Desktop positions: slide 01 center, 02 center 32%, 03 center 30%; ≤700px center top. Keep focal content central.
- Grayscale / multiply / opacity: Existing dark shade; full colour
- Desktop / mobile: Full-width slideshow; first slide eager/high priority, others lazy. First mobile slide allows letterboxing.

### home — Hero slide 03 — home-hero-03.webp

- Target: `/images/home/home-hero-03.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Merchandise banner
- Recommended ratio: 2:1 recommended; current desktop container 2.35:1, mobile 4:5
- Recommended dimensions: 2400 × 1200
- Fit / crop: Desktop cover; mobile first slide contain, others cover; Desktop positions: slide 01 center, 02 center 32%, 03 center 30%; ≤700px center top. Keep focal content central.
- Grayscale / multiply / opacity: Existing dark shade; full colour
- Desktop / mobile: Full-width slideshow; first slide eager/high priority, others lazy. First mobile slide allows letterboxing.

### home — About Us statement + Closing CTA — home-atmosphere-lines.svg

- Target: `/images/home/home-atmosphere-lines.svg`
- Current source: `/visuals/atmosphere-lines.svg` (still live; target is reserved)
- Purpose: Shared light geometric texture
- Recommended ratio: 1:1 vector tile
- Recommended dimensions: 640 × 640 SVG viewBox
- Fit / crop: background-size: 640px; 480px tablet; 360px mobile; Edge-faded, non-repeating abstract linework.
- Grayscale / multiply / opacity: Opacity 5.5% desktop / 3.5% tablet / 2.5% mobile
- Desktop / mobile: Home introduction left and Home CTA right only; shared decorative asset.

### about — Hero background — about-hero-overlay-01.webp

- Target: `/images/about/about-hero-overlay-01.webp`
- Current source: `/optimized/visuals/business-card-768.webp` (still live; target is reserved)
- Purpose: Temporary grayscale brand photograph
- Recommended ratio: 3:4 recommended
- Recommended dimensions: 1200 × 1600
- Fit / crop: background-size: cover; Centered, right-side region fades toward text.
- Grayscale / multiply / opacity: grayscale(1), multiply, opacity 8% desktop / 6% tablet / 4% mobile
- Desktop / mobile: Decorative pseudo-element; no alt text; currently uses an existing 768px optimized WebP.

### about — Our Belief — about-belief-01.webp

- Target: `/images/about/about-belief-01.webp`
- Current source: `/visuals/poster.jpg` (still live; target is reserved)
- Purpose: Supporting brand visual
- Recommended ratio: Natural image ratio; 4:5 recommended
- Recommended dimensions: 1600 × 2000
- Fit / crop: cover; Top aligned; image/container max-height 780px, mobile 560px.
- Grayscale / multiply / opacity: Full colour
- Desktop / mobile: Split on desktop, stacked ≤900px; selected mouse parallax max 6px, disabled for touch/reduced motion.

### services/branding — Intro — branding-hero-01.webp

- Target: `/images/services/branding/branding-hero-01.webp`
- Current source: `/visuals/cover.jpg` (still live; target is reserved)
- Purpose: Service introduction
- Recommended ratio: 4:3 recommended; desktop container is height-led
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; cream letterboxing allowed.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop 70vh, max 720px; ≤900px stacked 4:3, max-height 560px.

### services/branding — Brand Identity & Applications — branding-identity-01.webp

- Target: `/images/services/branding/branding-identity-01.webp`
- Current source: `/visuals/poster.jpg` (still live; target is reserved)
- Purpose: Logo, colour and typography
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/branding — Brand Identity & Applications — branding-application-print-01.webp

- Target: `/images/services/branding/branding-application-print-01.webp`
- Current source: `/visuals/business-card.jpg` (still live; target is reserved)
- Purpose: Packaging and printed materials
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/branding — Brand Identity & Applications — branding-application-uniform-digital-01.webp

- Target: `/images/services/branding/branding-application-uniform-digital-01.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Uniforms and digital touchpoints
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/uniform — Intro — uniform-hero-01.webp

- Target: `/images/services/uniform/uniform-hero-01.webp`
- Current source: `/visuals/uniform.jpg` (still live; target is reserved)
- Purpose: Service introduction
- Recommended ratio: 4:3 recommended; desktop container is height-led
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; cream letterboxing allowed.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop 70vh, max 720px; ≤900px stacked 4:3, max-height 560px.

### services/uniform — Uniform Types — uniform-type-corporate-01.webp

- Target: `/images/services/uniform/uniform-type-corporate-01.webp`
- Current source: `/visuals/uniform.jpg` (still live; target is reserved)
- Purpose: Corporate and workwear
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/uniform — Uniform Types — uniform-type-everyday-event-01.webp

- Target: `/images/services/uniform/uniform-type-everyday-event-01.webp`
- Current source: `/visuals/uniform.jpg` (still live; target is reserved)
- Purpose: Everyday and events
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/uniform — Uniform Types — uniform-type-sport-01.webp

- Target: `/images/services/uniform/uniform-type-sport-01.webp`
- Current source: `/visuals/uniform.jpg` (still live; target is reserved)
- Purpose: Sport and teamwear
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/merchandise — Intro — merchandise-hero-01.webp

- Target: `/images/services/merchandise/merchandise-hero-01.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Service introduction
- Recommended ratio: 4:3 recommended; desktop container is height-led
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; cream letterboxing allowed.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop 70vh, max 720px; ≤900px stacked 4:3, max-height 560px.

### services/merchandise — Product Categories — merchandise-category-apparel-bags-01.webp

- Target: `/images/services/merchandise/merchandise-category-apparel-bags-01.webp`
- Current source: `/visuals/poster.jpg` (still live; target is reserved)
- Purpose: Apparel and bags
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/merchandise — Product Categories — merchandise-category-drinkware-01.webp

- Target: `/images/services/merchandise/merchandise-category-drinkware-01.webp`
- Current source: `/visuals/business-card.jpg` (still live; target is reserved)
- Purpose: Drinkware and lifestyle
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/merchandise — Product Categories — merchandise-category-office-event-01.webp

- Target: `/images/services/merchandise/merchandise-category-office-event-01.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Office and event essentials
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/merchandise — Customization Options — merchandise-customization-01.webp

- Target: `/images/services/merchandise/merchandise-customization-01.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Branding and packaging possibilities
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/marketing — Intro — marketing-hero-01.webp

- Target: `/images/services/marketing/marketing-hero-01.webp`
- Current source: `/visuals/business-card.jpg` (still live; target is reserved)
- Purpose: Service introduction
- Recommended ratio: 4:3 recommended; desktop container is height-led
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; cream letterboxing allowed.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop 70vh, max 720px; ≤900px stacked 4:3, max-height 560px.

### services/graphic-design — Intro — graphic-design-hero-01.webp

- Target: `/images/services/graphic-design/graphic-design-hero-01.webp`
- Current source: `/visuals/posting-02.jpg` (still live; target is reserved)
- Purpose: Service introduction
- Recommended ratio: 4:3 recommended; desktop container is height-led
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; cream letterboxing allowed.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop 70vh, max 720px; ≤900px stacked 4:3, max-height 560px.

### services/graphic-design — Selected Applications — graphic-design-application-social-01.webp

- Target: `/images/services/graphic-design/graphic-design-application-social-01.webp`
- Current source: `/visuals/poster.jpg` (still live; target is reserved)
- Purpose: Posters and social content
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/graphic-design — Selected Applications — graphic-design-application-corporate-packaging-01.webp

- Target: `/images/services/graphic-design/graphic-design-application-corporate-packaging-01.webp`
- Current source: `/visuals/business-card.jpg` (still live; target is reserved)
- Purpose: Business materials and packaging
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/graphic-design — Selected Applications — graphic-design-application-event-01.webp

- Target: `/images/services/graphic-design/graphic-design-application-event-01.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Signage and event graphics
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/photography — Intro — photography-hero-01.webp

- Target: `/images/services/photography/photography-hero-01.webp`
- Current source: `/visuals/poster.jpg` (still live; target is reserved)
- Purpose: Service introduction
- Recommended ratio: 4:3 recommended; desktop container is height-led
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; cream letterboxing allowed.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop 70vh, max 720px; ≤900px stacked 4:3, max-height 560px.

### services/photography — Photography Types — photography-types-01.webp

- Target: `/images/services/photography/photography-types-01.webp`
- Current source: `/visuals/cover.jpg` (still live; target is reserved)
- Purpose: Brand, product, people and event photography
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/photography — Visual Gallery — photography-gallery-01.webp

- Target: `/images/services/photography/photography-gallery-01.webp`
- Current source: `/visuals/poster.jpg` (still live; target is reserved)
- Purpose: Gallery visual 1
- Recommended ratio: Desktop 2:1; mobile 4:3
- Recommended dimensions: 2400 × 1200
- Fit / crop: contain; No intentional crop; differing mobile ratio may add letterboxing.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Photography gallery first visual spans all desktop columns; ≤680px 4:3.

### services/photography — Visual Gallery — photography-gallery-02.webp

- Target: `/images/services/photography/photography-gallery-02.webp`
- Current source: `/visuals/business-card.jpg` (still live; target is reserved)
- Purpose: Gallery visual 2
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### services/photography — Visual Gallery — photography-gallery-03.webp

- Target: `/images/services/photography/photography-gallery-03.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Gallery visual 3
- Recommended ratio: 4:3
- Recommended dimensions: 1600 × 1200
- Fit / crop: contain; No intentional crop; preserve complete artwork.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Desktop modular columns; mobile single column; lazy loading.

### portfolio/uniforms/designed-to-wear — Portfolio grid / Home Featured Work — designed-to-wear-cover.webp

- Target: `/images/portfolio/uniforms/designed-to-wear/designed-to-wear-cover.webp`
- Current source: `/visuals/uniform.jpg` (still live; target is reserved)
- Purpose: Project preview
- Recommended ratio: 3:2
- Recommended dimensions: 1800 × 1200
- Fit / crop: cover; Centered crop; keep important subject within central safe area.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Shared by Portfolio grid and Home Featured Work where selected; hover scale 1.03.

### portfolio/uniforms/designed-to-wear — Project detail — designed-to-wear-detail-01.webp

- Target: `/images/portfolio/uniforms/designed-to-wear/designed-to-wear-detail-01.webp`
- Current source: `/visuals/uniform.jpg` (still live; target is reserved)
- Purpose: Project feature visual
- Recommended ratio: Natural image ratio; 3:2 recommended for future photography
- Recommended dimensions: 2400 × 1600
- Fit / crop: cover; Top aligned; natural height capped at 900px. Tall assets can be clipped.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Full content-width visual; eager/high priority. Separate from thumbnail for future replacement.

### portfolio/branding/more-than-a-brand — Portfolio grid / Home Featured Work — more-than-a-brand-cover.webp

- Target: `/images/portfolio/branding/more-than-a-brand/more-than-a-brand-cover.webp`
- Current source: `/visuals/posting-02.jpg` (still live; target is reserved)
- Purpose: Project preview
- Recommended ratio: 3:2
- Recommended dimensions: 1800 × 1200
- Fit / crop: cover; Centered crop; keep important subject within central safe area.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Shared by Portfolio grid and Home Featured Work where selected; hover scale 1.03.

### portfolio/branding/more-than-a-brand — Project detail — more-than-a-brand-detail-01.webp

- Target: `/images/portfolio/branding/more-than-a-brand/more-than-a-brand-detail-01.webp`
- Current source: `/visuals/posting-02.jpg` (still live; target is reserved)
- Purpose: Project feature visual
- Recommended ratio: Natural image ratio; 3:2 recommended for future photography
- Recommended dimensions: 2400 × 1600
- Fit / crop: cover; Top aligned; natural height capped at 900px. Tall assets can be clipped.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Full content-width visual; eager/high priority. Separate from thumbnail for future replacement.

### portfolio/merchandise/everyday-objects — Portfolio grid / Home Featured Work — everyday-objects-cover.webp

- Target: `/images/portfolio/merchandise/everyday-objects/everyday-objects-cover.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Project preview
- Recommended ratio: 3:2
- Recommended dimensions: 1800 × 1200
- Fit / crop: cover; Centered crop; keep important subject within central safe area.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Shared by Portfolio grid and Home Featured Work where selected; hover scale 1.03.

### portfolio/merchandise/everyday-objects — Project detail — everyday-objects-detail-01.webp

- Target: `/images/portfolio/merchandise/everyday-objects/everyday-objects-detail-01.webp`
- Current source: `/visuals/posting-03.jpg` (still live; target is reserved)
- Purpose: Project feature visual
- Recommended ratio: Natural image ratio; 3:2 recommended for future photography
- Recommended dimensions: 2400 × 1600
- Fit / crop: cover; Top aligned; natural height capped at 900px. Tall assets can be clipped.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Full content-width visual; eager/high priority. Separate from thumbnail for future replacement.

### shared — Header + Footer — abound-logo.png

- Target: `/images/shared/abound-logo.png`
- Current source: `/abound-logo.png` (still live; target is reserved)
- Purpose: Abound Creation logo
- Recommended ratio: Preserve native logo ratio
- Recommended dimensions: At least 960px wide; transparent PNG or SVG
- Fit / crop: contain; Do not crop logo.
- Grayscale / multiply / opacity: Header original colour; footer white via CSS filter
- Desktop / mobile: Same asset in header/footer; existing responsive logo variants retained.

### shared — Browser tab — abound-favicon.png

- Target: `/images/shared/abound-favicon.png`
- Current source: `/favicon.png` (still live; target is reserved)
- Purpose: Browser favicon
- Recommended ratio: 1:1
- Recommended dimensions: 32 × 32 or 48 × 48 PNG
- Fit / crop: Browser icon; No CSS crop.
- Grayscale / multiply / opacity: None
- Desktop / mobile: Keep existing /favicon.png and SEO/metadata paths intact.

### shared/clients — Home / Our Clients — client-trustinsure-logo.png

- Target: `/images/shared/clients/client-trustinsure-logo.png`
- Current source: `/client-logos/client-01.png` (still live; target is reserved)
- Purpose: trustinsure client logo
- Recommended ratio: Preserve native logo ratio
- Recommended dimensions: 540px wide minimum; transparent PNG or SVG
- Fit / crop: contain; No crop; retain clear space.
- Grayscale / multiply / opacity: None; original logo colours, no grayscale/multiply/opacity layer
- Desktop / mobile: Desktop container 120–175px wide / 60–82px high; mobile 112×56px. Home marquee repeats a second accessible-hidden row; one slot per client, not duplicate files.

### shared/clients — Home / Our Clients — client-ct-and-co-logo.png

- Target: `/images/shared/clients/client-ct-and-co-logo.png`
- Current source: `/client-logos/client-02.png` (still live; target is reserved)
- Purpose: ct-and-co client logo
- Recommended ratio: Preserve native logo ratio
- Recommended dimensions: 540px wide minimum; transparent PNG or SVG
- Fit / crop: contain; No crop; retain clear space.
- Grayscale / multiply / opacity: None; original logo colours, no grayscale/multiply/opacity layer
- Desktop / mobile: Desktop container 120–175px wide / 60–82px high; mobile 112×56px. Home marquee repeats a second accessible-hidden row; one slot per client, not duplicate files.

### shared/clients — Home / Our Clients — client-reka-furniture-logo.png

- Target: `/images/shared/clients/client-reka-furniture-logo.png`
- Current source: `/client-logos/client-03.png` (still live; target is reserved)
- Purpose: reka-furniture client logo
- Recommended ratio: Preserve native logo ratio
- Recommended dimensions: 540px wide minimum; transparent PNG or SVG
- Fit / crop: contain; No crop; retain clear space.
- Grayscale / multiply / opacity: None; original logo colours, no grayscale/multiply/opacity layer
- Desktop / mobile: Desktop container 120–175px wide / 60–82px high; mobile 112×56px. Home marquee repeats a second accessible-hidden row; one slot per client, not duplicate files.

### shared/clients — Home / Our Clients — client-top-point-interior-design-logo.png

- Target: `/images/shared/clients/client-top-point-interior-design-logo.png`
- Current source: `/client-logos/client-04.png` (still live; target is reserved)
- Purpose: top-point-interior-design client logo
- Recommended ratio: Preserve native logo ratio
- Recommended dimensions: 540px wide minimum; transparent PNG or SVG
- Fit / crop: contain; No crop; retain clear space.
- Grayscale / multiply / opacity: None; original logo colours, no grayscale/multiply/opacity layer
- Desktop / mobile: Desktop container 120–175px wide / 60–82px high; mobile 112×56px. Home marquee repeats a second accessible-hidden row; one slot per client, not duplicate files.

### shared/clients — Home / Our Clients — client-johindah-malim-logo.png

- Target: `/images/shared/clients/client-johindah-malim-logo.png`
- Current source: `/client-logos/client-05.png` (still live; target is reserved)
- Purpose: johindah-malim client logo
- Recommended ratio: Preserve native logo ratio
- Recommended dimensions: 540px wide minimum; transparent PNG or SVG
- Fit / crop: contain; No crop; retain clear space.
- Grayscale / multiply / opacity: None; original logo colours, no grayscale/multiply/opacity layer
- Desktop / mobile: Desktop container 120–175px wide / 60–82px high; mobile 112×56px. Home marquee repeats a second accessible-hidden row; one slot per client, not duplicate files.

### shared/clients — Home / Our Clients — client-everwyn-realty-management-logo.png

- Target: `/images/shared/clients/client-everwyn-realty-management-logo.png`
- Current source: `/client-logos/client-06.png` (still live; target is reserved)
- Purpose: everwyn-realty-management client logo
- Recommended ratio: Preserve native logo ratio
- Recommended dimensions: 540px wide minimum; transparent PNG or SVG
- Fit / crop: contain; No crop; retain clear space.
- Grayscale / multiply / opacity: None; original logo colours, no grayscale/multiply/opacity layer
- Desktop / mobile: Desktop container 120–175px wide / 60–82px high; mobile 112×56px. Home marquee repeats a second accessible-hidden row; one slot per client, not duplicate files.

### shared/clients — Home / Our Clients — client-stickjobs-logo.png

- Target: `/images/shared/clients/client-stickjobs-logo.png`
- Current source: `/client-logos/client-07.png` (still live; target is reserved)
- Purpose: stickjobs client logo
- Recommended ratio: Preserve native logo ratio
- Recommended dimensions: 540px wide minimum; transparent PNG or SVG
- Fit / crop: contain; No crop; retain clear space.
- Grayscale / multiply / opacity: None; original logo colours, no grayscale/multiply/opacity layer
- Desktop / mobile: Desktop container 120–175px wide / 60–82px high; mobile 112×56px. Home marquee repeats a second accessible-hidden row; one slot per client, not duplicate files.
