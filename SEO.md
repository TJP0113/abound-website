# Phase 1 SEO

Production origin: `https://www.aboundcreation.com` (confirmed by the owner).

The website stays on Vite and plain JavaScript. `render.js` contains the original
page templates; `app.js` attaches the original interactions without replacing
prerendered markup. No framework or runtime dependency was added.

`seo.js` defines the 13 public routes, route-specific metadata, canonical URLs,
social image choices and business facts already displayed on the website.
Business schema deliberately excludes unverified coordinates, reviews, prices
and category claims. Existing English and Chinese page copy is preserved.

## Build and check

```sh
npm run build
npm run test:seo
npm run preview
```

Build creates `dist/index.html`, twelve nested route `index.html` files,
`dist/404.html`, `dist/sitemap.xml` and `dist/robots.txt`. Initial HTML includes
the full page content, SEO tags and JSON-LD, even without JavaScript.

`npm run preview` uses a strict static server rather than an SPA fallback so
unknown paths return HTTP 404. It accepts `--port` and `--host` arguments.
Development also serves route-specific HTML through `vite.config.js`.

Vercel uses explicit page mappings, permanent redirects for known aliases and
trailing slashes, existing static assets, then an HTTP 404 fallback. Uploading
the output to another host requires equivalent redirects and 404 behavior;
an SPA catch-all to the homepage would undo the routing fix.

## Verification limits

The checks inspect every generated route and exercise real HTTP responses on
the local static preview. After a deployment, check the same paths on the live
domain to confirm the host applied `vercel.json`. No deployment is part of this
change.

Social cards currently use existing route-relevant images. Resizing oversized
images and generating dedicated social crops remain a later performance task.
No measured Core Web Vitals improvement is claimed by this phase.

When adding a page, update `seo.js`, the renderer and the explicit mappings in
`vercel.json`; `test:seo` checks their consistency.

## Files changed in this implementation

Source files changed or added:

- `app.js`
- `index.html`
- `package.json`
- `style.css`
- `vercel.json`
- `render.js`
- `seo.js`
- `vite.config.js`
- `scripts/prerender.mjs`
- `scripts/serve.mjs`
- `scripts/verify-seo.mjs`
- `SEO.md`

Generated build files created or replaced:

- `dist/404.html`
- `dist/about/index.html`
- `dist/assets/index-15eb0b83.css`
- `dist/assets/index-c6c7e7eb.js`
- `dist/contact/index.html`
- `dist/index.html`
- `dist/portfolio/designed-to-wear/index.html`
- `dist/portfolio/everyday-objects/index.html`
- `dist/portfolio/index.html`
- `dist/portfolio/more-than-a-brand/index.html`
- `dist/robots.txt`
- `dist/services/branding/index.html`
- `dist/services/graphic/index.html`
- `dist/services/marketing-services/index.html`
- `dist/services/merchandise/index.html`
- `dist/services/photo-videography/index.html`
- `dist/services/uniform/index.html`
- `dist/sitemap.xml`

The old hashed JavaScript and CSS bundles were replaced by the build. Public
image assets are copied unchanged. The previously untracked `service-details.js`
was backed up and remains untouched.

Verification completed: production build; all 13 generated HTML pages; unique
titles/descriptions, canonical and sharing tags; JSON-LD facts; headings and
internal links; sitemap/robots content and HTTP MIME types; alias redirects;
invalid page/service/project/asset HTTP 404s. Browser checks passed for slideshow
pause/next, FAQ expansion, mobile menu and portfolio filtering with no console
errors. All existing page templates match the pre-change version except the
intended semantic headings.

A verified ZIP backup was made before edits. The requested commit could not be
created because automatic permission review timed out on both attempts.
