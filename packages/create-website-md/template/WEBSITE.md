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
- `/llms.txt`: LLM context summary.
- `/sitemap.xml`: crawlable URL inventory.
- `/robots.txt`: crawler policy.

## Canonical URLs

Preserve public URLs once launched. Ask before changing slugs.

Important URLs:

- `/`

## Content Sources

Current site files:

```txt
AGENTS.md
WEBSITE.md
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

Agents may use declared flat `wmd_*` front matter layout, variant, role, and media knobs when the renderer supports them.

Keep image paths and `media:key` references resolvable. Do not add arbitrary scripts, unsafe embeds, fake media keys, or unsupported extensions.

## Source Addressability

Use `data-wmd-source` on major rendered sections when the source file is clear. Values should be repo-relative paths, optionally with fragments.

Example:

```html
<section data-wmd-source="src/index.html#hero" data-wmd-role="hero">
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

Local preview:

```txt
http://localhost:4177
```

Keep the dev-server terminal open while previewing.

## Publishing

Target: Vercel, Netlify, Cloudflare Pages, or GitHub Pages.  
Publish only after build and checks pass.

For the first deployment path, prefer Vercel. Read `HOSTING.md` and `VERCEL.md`.
