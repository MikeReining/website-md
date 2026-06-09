# WEBSITE.md

## Site Identity

Name: Rivera Consulting  
Primary domain: rivera-consulting.example (replace before deploy)  
Owner: Alex Rivera  
Site type: simple consultant website  
Audience: small business owners evaluating operations help  
Primary job: explain the offer, show proof, and drive contact requests.

## Primary User Goals

- Understand what Rivera Consulting does.
- See relevant proof and services.
- Contact Alex for a discovery call.

## Site Structure

Public routes agents should know:

- `/`: home page (`src/index.html`).
- `/llms.txt`: LLM context summary (`src/llms.txt`).
- `/sitemap.xml`: crawlable URL inventory (`src/sitemap.xml`).
- `/robots.txt`: crawler policy (`src/robots.txt`).

## Canonical URLs

Preserve public URLs once launched. Ask before changing slugs.

Important URLs:

- `/`

## Content Sources

Current site files:

```txt
WEBSITE.md
AGENTS.md
DESIGN.md
COPY.md
SEO.md
HOSTING.md
VERCEL.md
src/
  index.html
  styles.css
  llms.txt
  robots.txt
  sitemap.xml
scripts/
  dev.mjs
  build.mjs
  check.mjs
```

## Content Capabilities

Agents may add supported Markdown primitives: paragraphs, headings, links, ordered and unordered lists, tables, blockquotes, code blocks, inline code, and images.

Keep image paths resolvable. Do not add arbitrary scripts or unsafe embeds.

## Source Addressability

Use `data-wmd-source` on major rendered sections when the source file is clear.

Example:

```html
<section data-wmd-source="src/index.html#hero" data-wmd-role="hero">
```

## Editing Rules

AI may:

- Update copy.
- Add sections.
- Improve layout.
- Improve metadata.
- Add or improve `data-wmd-*` source mappings.

AI must ask before:

- Deleting pages.
- Changing URLs.
- Adding third-party services.
- Publishing.

AI must not:

- Commit secrets.
- Add fake testimonials.
- Publish without checks.

## Preview And Validation

```bash
npm run dev
npm run build
npm run check
```

Also run the portable checker from any machine:

```bash
npx website-md check
```

Local preview:

```txt
http://localhost:4177
```

## Publishing

Target: Vercel, Netlify, Cloudflare Pages, or GitHub Pages.  
Publish only after build and checks pass.

For the first deployment path, prefer Vercel. Read `HOSTING.md` and `VERCEL.md`.
