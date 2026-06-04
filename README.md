# Website.md Concept

Working name: Website.md  
Canonical domain: `websitemd.org`  
Status: concept handoff  

## One Sentence

`WEBSITE.md` is a plain-text instruction file that tells AI agents how to build, edit, preview, validate, and publish a website without a traditional website editor.

## Core Claim

The website editor is disappearing.

For a large class of sites, the new editing interface is an AI agent with repo access. The missing piece is a durable website runbook the agent can trust.

```txt
README.md    = explain the project to humans
AGENTS.md    = explain the repo to AI agents
DESIGN.md    = explain the visual system to AI agents
COPY.md      = explain the voice to AI agents
SEO.md       = explain discovery rules to AI agents
WEBSITE.md   = explain the website to AI agents
```

## Core Insight

The website builder layer is collapsing.

For many simple websites, the editor, template picker, CMS dashboard, and publishing tool can be replaced by:

- website code and content,
- an AI coding agent,
- a small set of Markdown instruction files,
- a cheap host such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

The user does not need to learn a website builder. The user talks to Codex, Antigravity, Cursor, Claude Code, OpenClaw, or another agent. The agent reads the website instructions, edits files, previews locally, checks the site, and prepares a deploy.

## Why This Exists

Squarespace, Wix, Carrd, Webflow, and similar tools made publishing easier by wrapping websites in hosted editors. AI agents change the tradeoff. For many sites, the best editor is now a local AI agent that can see the repo, run commands, inspect screenshots, fix mistakes, and publish changes.

The missing artifact is a standard instruction layer for websites.

## Why `.org`

`websitemd.org` should feel like an open convention, not another SaaS landing page.

The WordPress mental model is useful:

- `wordpress.org`: open project, ecosystem, plugins, themes.
- `wordpress.com`: hosted commercial product.

Website.md should start as the open artifact. If commercial products appear later, they can live around the standard:

- validators and audit reports,
- migration services,
- compatible templates,
- agency certification,
- managed publishing,
- premium examples and workflows,
- books, courses, workshops, and consulting.

The standard itself should stay free.

## File Model

Minimal root files:

```txt
AGENTS.md
WEBSITE.md
DESIGN.md
COPY.md
SEO.md
```

Roles:

- `AGENTS.md`: how the AI should behave in this repo.
- `WEBSITE.md`: what the website is, how it is structured, and how to change/publish it.
- `DESIGN.md`: visual identity, tokens, components, and taste. Compatible in spirit with Google's `DESIGN.md` format.
- `COPY.md`: voice, writing rules, messaging, conversion style.
- `SEO.md`: URL policy, metadata, structured data, internal linking, search and AI discovery.

Optional generated/public files:

- `llms.txt`: how external LLMs should understand the published site.
- `sitemap.xml`: search engine URL inventory.
- `robots.txt`: crawler policy.
- `public/_redirects` or host-specific redirect config.

## What This Is Not

This is not a hosted website builder.

This is not another AI app builder.

This is not a design template marketplace.

This is not a CMS dashboard.

This is not a replacement for every complex website.

It is a convention and starter toolchain for making simple websites agent-operable.

## Desired User Experience

Install:

```bash
npm create website-md@latest my-site
```

This requires the npm package `create-website-md` to be published. `npm create website-md@latest` resolves to `create-website-md@latest`.

Open the folder in an AI coding agent and say:

```txt
Use WEBSITE.md, DESIGN.md, COPY.md, and SEO.md to build me a simple website for my business. Preview it locally, fix layout issues, and prepare it for Vercel.
```

Within minutes, the user has:

- a local preview,
- clean source files,
- a deploy-ready site,
- a repeatable agent workflow for future changes.

The site should make this feel obvious:

> All you need to launch a simple website is a folder, `WEBSITE.md`, and an AI agent that can edit, preview, validate, and publish.

## 60-Second Demo

The first demo should prove the editor disappears.

```bash
npm create website-md@latest demo-site
cd demo-site
npm run dev
```

Prompt:

```txt
Create a one-page website for a mobile app developer named Kanso Studio. Make it polished, clear, and deploy-ready. Follow WEBSITE.md, DESIGN.md, COPY.md, and SEO.md. Run the checks before you finish.
```

Expected result:

- agent edits content and site files,
- agent previews locally,
- agent fixes obvious layout issues,
- agent runs checks,
- agent reports deploy steps.

## MVP Scope

Build only enough to make the convention feel real:

1. Public repo.
2. `websitemd.org` landing page built with its own `WEBSITE.md`.
3. Draft `WEBSITE.md` spec.
4. Starter generator.
5. One clean static website template.
6. Agent skill/instructions.
7. Basic validator.
8. Vercel deploy guide.

Avoid:

- accounts,
- hosting,
- billing,
- marketplace,
- dashboard,
- broad plugin ecosystem.

## Command Surface

Target commands:

```bash
website-md init
website-md lint
website-md check
website-md doctor
website-md export-llms
website-md extract <url>
website-md demo
```

MVP commands:

```bash
npm create website-md@latest my-site
```

Second package:

```bash
npx website-md lint
```

## Why A Website Too

The repo is canonical. The website is the front door.

`websitemd.org` should be built by Website.md itself. That makes the idea self-demonstrating:

> This website has no traditional editor. It is operated by AI using `WEBSITE.md`.

That claim must be true on day one. `websitemd.org` should use the same file model it recommends to others.

## Possible Taglines

- The website editor is disappearing.
- Website instructions for AI agents.
- All your AI agent needs to operate a website.
- Give your AI a website runbook.
- Stop renting a website editor.
- Your website is a repo. Your AI is the editor.

## Handoff Notes

The concept files in this folder can seed a new repo. The current folder also includes a tiny static `websitemd.org` dogfood site:

```bash
npm run dev
npm run build
npm run check
```

Local preview:

```bash
npm run dev
```

Then open:

```txt
http://localhost:4177
```

Keep the dev-server terminal open while previewing. If the browser says the connection was refused, the server is not running or the port changed.

Deployment target:

```txt
Vercel
Domain: websitemd.org
Build Command: npm run build
Output Directory: dist
```

Suggested expanded structure:

```txt
websitemd/
  README.md
  SPEC.md
  WEBSITE.md
  DESIGN.md
  COPY.md
  SEO.md
  AGENTS.md
  templates/
  skills/
  packages/
    create-website-md/
    website-md/
  examples/
    simple-business/
    websitemd-org/
```
