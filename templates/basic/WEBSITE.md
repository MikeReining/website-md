# WEBSITE.md

## Site Identity

Name: New Website.md Site  
Primary domain: example.com (replace before first deploy)  
Owner: site owner name (replace before first deploy)  
Site type: simple business website  
Audience: prospective customers  
Primary job: explain the offer clearly and help visitors take the next step.

## Primary User Goals

- Understand what this business does.
- Decide whether it is relevant.
- Contact the owner or take the primary action.

## Site Structure

Public routes agents should know:

- `/`: home page.
- `/llms.txt`: LLM context summary when published.
- `/sitemap.xml`: crawlable URL inventory when published.
- `/robots.txt`: crawler policy when published.

Optional pages such as `/contact` or `/blog` should be listed here before publishing.

## Canonical URLs

Preserve public URLs once launched. Ask before changing slugs.

## Content Sources

Pages: `content/pages/`  
Images: `public/` or `content/assets/`  
Metadata: page front matter or site config.

## Content Capabilities

Agents may add supported Markdown primitives: paragraphs, headings, links, ordered and unordered lists, tables, blockquotes, code blocks, inline code, and images.

Agents may use declared flat `wmd_*` front matter layout, variant, role, and media knobs when the renderer supports them.

Keep image paths and `media:key` references resolvable. Do not add arbitrary scripts, unsafe embeds, fake media keys, or unsupported extensions.

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
