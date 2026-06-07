# WEBSITE.md

## Site Identity

Name: New Website.md Site  
Primary domain: TBD  
Owner: TBD  
Site type: simple business website  
Audience: prospective customers  
Primary job: explain the offer clearly and help visitors take the next step.

## Primary User Goals

- Understand what this business does.
- Decide whether it is relevant.
- Contact the owner or take the primary action.

## Site Structure

- `/`: home page.
- `/contact`: contact page, optional.
- `/blog`: articles, optional.

## Canonical URLs

Preserve public URLs once launched. Ask before changing slugs.

## Content Sources

Pages: `content/pages/`  
Images: `public/` or `content/assets/`  
Metadata: page front matter or site config.

## Source Addressability

Use `data-wmd-source` on major rendered sections when the source file is clear. Values should be repo-relative paths, optionally with fragments.

Example:

```html
<section data-wmd-source="content/pages/home.md#hero" data-wmd-role="hero">
```

## Editing Rules

AI may:

- Update copy.
- Add sections.
- Improve layout.
- Add pages.
- Improve metadata.
- Add or improve `data-wmd-*` source mappings.

AI must ask before:

- Deleting pages.
- Changing URLs.
- Adding third-party services.
- Publishing.

## Preview And Validation

```bash
npm install
npm run dev
npm run build
npm run check
```

## Publishing

Target: Vercel, Netlify, Cloudflare Pages, or GitHub Pages.  
Publish only after build and checks pass.
