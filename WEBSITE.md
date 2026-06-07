# WEBSITE.md

## Site Identity

Name: Website.md  
Primary domain: `websitemd.org`  
Owner: TBD  
Site type: open-source project website  
Audience: founders, developers, agencies, and AI-agent users  
Primary job: explain and demonstrate `WEBSITE.md` as the open instruction layer that lets AI agents operate websites.

## Positioning

`websitemd.org` is the home of an open convention, not a hosted website builder.

The homepage should make one idea obvious:

> The website editor is disappearing. `WEBSITE.md` tells your AI agent how to build, edit, preview, validate, and publish your website.

Use the WordPress `.org` mental model when helpful: open standard first, ecosystem later. Do not lead with monetization.

## Primary User Goals

- Understand the concept in under 30 seconds.
- Install the starter in one command.
- Copy the spec into an existing site.
- Watch or understand the 60-second demo.
- See how `WEBSITE.md` composes with `AGENTS.md`, `DESIGN.md`, `COPY.md`, and `SEO.md`.
- Use an AI agent to create or update a simple website.

## Site Structure

- `/`: landing page and quick start.
- `/spec`: readable `WEBSITE.md` specification.
- `/examples`: example websites and instruction files.
- `/examples/bitsboard`: live Bitsboard case study.
- `/examples/kansobooks`: live KansoBooks case study.
- `/guides/replace-squarespace`: guide for replacing a hosted website builder with an AI-operated site.
- `/guides/create-site`: guide for creating a new site with an AI agent.
- `/docs/cli`: command reference.
- `/llms.txt`: LLM context summary.
- `/sitemap.xml`: crawlable URL inventory.
- `/robots.txt`: crawler policy.

## Homepage Requirements

The first viewport should include:

- headline: `The website editor is disappearing.`
- subhead: `WEBSITE.md tells your AI agent how to build, edit, preview, validate, and publish your website.`
- quick start command: `npm create website-md@latest my-site`
- primary CTA: `Create a site`
- secondary CTAs: `Read the spec`, `View on GitHub`
- visible file model:

```txt
README.md    = explain the project to humans
AGENTS.md    = explain the repo to AI agents
DESIGN.md    = explain the visual system to AI agents
COPY.md      = explain the voice to AI agents
SEO.md       = explain discovery rules to AI agents
WEBSITE.md   = explain the website to AI agents
```

The page should show, not merely claim, that this website is operated by its own `WEBSITE.md`.

Recommended homepage sections:

- Hero and quick start.
- What changed: AI agents make the traditional editor optional for many sites.
- How it works: instruction files, source files, preview, checks, deploy.
- Addressable content primitives: Markdown-native tables, lists, images, quotes, and code as portable content.
- Content contracts: capabilities, block front matter, media references, and source ranges.
- File model.
- 60-second demo.
- Starter and validator.
- Spec and examples.
- Open `.org` project note.

## Canonical URLs

Preserve public URLs once launched. Do not rename published routes without redirects.

Initial canonical URLs:

- `/`
- `/spec`
- `/examples`
- `/examples/bitsboard`
- `/examples/kansobooks`
- `/guides/replace-squarespace`
- `/guides/create-site`
- `/docs/cli`
- `/llms.txt`
- `/sitemap.xml`
- `/robots.txt`

## Content Sources

Current site files:

```txt
src/
  index.html
  spec/index.html
  examples/index.html
  guides/
  docs/
  styles.css
  llms.txt
  robots.txt
  sitemap.xml
scripts/
  dev.mjs
  build.mjs
  check.mjs
```

Future implementation may move page content into Markdown or MDX, but the first dogfood site should stay static, inspectable, and easy to copy.

## Content Contracts

The public site and spec should explain that rich content extensibility starts with Markdown-native primitives: paragraphs, headings, links, lists, tables, blockquotes, code, and images.

Future agents should also explain:

- Content capabilities: the primitives and safe declarative extensions a renderer supports.
- Block front matter: optional flat `wmd_*` layout, variant, role, and media knobs.
- Sub-source addressability: optional node ids and source ranges for cells, list items, images, and fields.
- Media references: repo-relative paths and optional `media:key` entries backed by `media.json`.

Keep this standard-focused. Tables, lists, images, quotes, and similar content should be ordinary portable content with optional source addressability, not proprietary editor features.

## Source Addressability

Use the optional `data-wmd-*` convention on major rendered sections when it helps an agent connect preview elements to source files.

Recommended attributes:

- `data-wmd-source`: repo-relative source file, optionally with a fragment.
- `data-wmd-role`: semantic section role.
- `data-wmd-field`: editable field inside the source.

For this static site, source mappings should usually point to `src/index.html`, `src/spec/index.html`, or another route file. Do not use absolute local paths.

## Editing Rules

AI may:

- Improve copy for clarity.
- Add examples.
- Improve layout.
- Add docs pages.
- Add validation checks.
- Add or improve `data-wmd-*` source mappings.
- Update quick start commands.
- Add practical migration guidance from Squarespace, Wix, Webflow, Carrd, or static sites.

AI must ask before:

- Changing the core positioning.
- Removing the open-source framing.
- Adding pricing.
- Adding hosted-service claims.
- Changing the canonical domain.
- Changing the meaning of the spec.

AI must not:

- Present Website.md as a hosted website builder.
- Claim it replaces all CMS or complex web apps.
- Add unsupported install commands.
- Add fake adoption numbers, fake logos, or fake testimonials.
- Publish without running the configured checks.

## Preview And Validation

The final repo should expose:

```bash
npm install
npm run dev
npm run build
npm run check
```

If the site uses Vercel, prefer a project-specific high local port rather than defaulting to common ports when embedded in another repo.

Local preview URL:

```txt
http://localhost:4177
```

The dev server must stay running while previewing. If a browser shows `ERR_CONNECTION_REFUSED`, first check that `npm run dev` is still running and that the browser is using the printed port.

## Publishing

Deployment target: Vercel.  
Production branch: `main`.  
Production domain: `websitemd.org`.  
Publish rule: publish only after build and content checks pass.

Do not publicly launch the homepage until `npm create website-md@latest my-site` works from a clean directory. That command requires the npm package `create-website-md` to be published.

Before publishing:

- Build passes.
- Important routes render.
- Quick start command is accurate.
- Mobile view is checked.
- No unsupported claims are made.

Vercel project settings:

```txt
Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Production Branch: main
```

## Agent Recipes

### Build The Landing Page

1. Read `WEBSITE.md`, `DESIGN.md`, `COPY.md`, and `SEO.md`.
2. Create a landing page that explains the disappearing website editor.
3. Add a quick start command block.
4. Link to the spec, examples, and GitHub repo.
5. Show the file model.
6. Explain that `websitemd.org` is itself operated by `WEBSITE.md`.
7. Run build and checks.

### Record The 60-Second Demo

1. Create a fresh starter site.
2. Ask an AI agent to build a simple business website using `WEBSITE.md`, `DESIGN.md`, `COPY.md`, and `SEO.md`.
3. Show the agent editing files.
4. Show local preview.
5. Show the agent fixing one visible issue.
6. Show checks passing.
7. End on the deploy-ready folder.

### Add An Example

1. Create a folder under `examples/`.
2. Include the example's `WEBSITE.md`, `DESIGN.md`, `COPY.md`, and `SEO.md`.
3. Add a short README.
4. Link it from `/examples`.
5. Run checks.
