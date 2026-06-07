# WEBSITE.md Draft Specification

Status: draft 0.1  
Audience: AI coding agents, developers, and site owners  

## Purpose

`WEBSITE.md` is a root-level Markdown file that gives AI agents durable instructions for operating a website.

It answers:

- What is this website?
- Who is it for?
- What pages exist?
- What URLs must be preserved?
- Where is content stored?
- How should the agent preview, validate, and publish changes?
- What can the agent change freely?
- What requires user approval?

## Relationship To Adjacent Files

`WEBSITE.md` should compose with other instruction files:

- `AGENTS.md`: repository-wide agent behavior and commands.
- `DESIGN.md`: visual identity and design tokens.
- `COPY.md`: voice and writing rules.
- `SEO.md`: search, URL, metadata, and AI discovery rules.
- `llms.txt`: published website summary for external LLMs.

`WEBSITE.md` should not duplicate every detail from these files. It should link to them and explain how they apply to the website.

## File Location

Place `WEBSITE.md` at the project root.

```txt
my-site/
  WEBSITE.md
  AGENTS.md
  DESIGN.md
  COPY.md
  SEO.md
```

## Required Sections

### Site Identity

Defines the website's name, owner, domain, category, audience, and core job.

### Primary User Goals

Defines the actions visitors should be able to complete.

### Site Structure

Lists the major sections, page groups, and content types.

### Canonical URLs

Lists important public URLs and the rule for preserving or redirecting them.

### Content Sources

Explains where content, images, files, and metadata live.

### Editing Rules

Defines what the AI may change freely, what requires confirmation, and what must not be changed.

### Preview And Validation

Lists commands for previewing and checking the site.

### Publishing

Explains how deployment works and what must happen before publish.

## Optional Sections

- Source Addressability
- Migration Notes
- Redirect Policy
- Forms And Integrations
- Analytics
- Accessibility
- Performance Budget
- Content Workflows
- Maintenance Schedule
- Rollback Procedure
- Agent Recipes

## Source Addressability

Source addressability is the optional convention that lets an agent connect a rendered element back to the file or fragment that produced it.

Use `data-wmd-*` attributes in rendered HTML when a site can expose useful source mappings:

```html
<section data-wmd-source="content/pages/home.md#hero" data-wmd-role="hero">
  <h1 data-wmd-field="headline">A clear headline</h1>
  <p data-wmd-field="subhead">A concise supporting line.</p>
</section>
```

Recommended attributes:

- `data-wmd-source`: repo-relative source path, optionally with a fragment.
- `data-wmd-role`: semantic role such as `hero`, `nav`, `testimonial`, `pricing`, or `footer`.
- `data-wmd-field`: editable field within the source, such as `headline`, `body`, `image`, or `cta`.

Rules:

- Prefer repo-relative paths, never absolute local paths.
- Do not expose secrets, private prompts, or user-only data in attributes.
- Keep mappings stable enough that preview tooling can use them.
- Treat addressability as a progressive enhancement; a valid `WEBSITE.md` site does not need to be block-based.

## Addressable Content Primitives

Rich content extensibility should live in portable content first, not in a proprietary editor model.

CommonMark + GFM Markdown should be the default content layer. The portable baseline includes:

- Paragraphs.
- Headings.
- Links.
- Ordered and unordered lists.
- Tables.
- Blockquotes.
- Code blocks.
- Inline code.
- Images.

Rules:

- Images should use repo-relative paths or declared media references.
- Rendered primitives may expose `data-wmd-source`, `data-wmd-role`, and `data-wmd-field`.
- Agents should add tables, lists, and images by editing Markdown or content files, not by inventing renderer code.
- Raw HTML is allowed only as a constrained compatibility escape hatch, never the primary extensibility model.
- User-editable content must not include arbitrary scripts.
- Validators should check parseable Markdown, resolvable image and media references, safe links, and source mappings when present.

Example source:

```md
---
id: comparison
role: comparison
---

## Compare options

- Portable source
- Agent-editable content
- Static output

| Need | Website.md | Hosted builder |
| --- | --- | --- |
| Exportable files | Yes | Usually no |

![Workspace preview](public/images/workspace.jpg)
```

Rendered source mapping can stay lightweight:

```html
<section data-wmd-source="content/pages/home.md#comparison" data-wmd-role="comparison">
  <table data-wmd-field="table">
```

## Recommended Skeleton

````md
# WEBSITE.md

## Site Identity

Name:
Primary domain:
Owner:
Site type:
Audience:
Primary job:

## Primary User Goals

- Goal 1
- Goal 2
- Goal 3

## Site Structure

- Home: `/`
- About: `/about`
- Contact: `/contact`
- Blog: `/blog`

## Canonical URLs

Preserve existing public URLs unless the user explicitly approves a redirect.

Important URLs:

- `/`
- `/contact`

## Content Sources

Pages:
Posts:
Images:
Metadata:

## Source Addressability

Use `data-wmd-source` on major rendered sections when the source file is clear.

Example:

```html
<section data-wmd-source="content/pages/home.md#hero" data-wmd-role="hero">
```

## Editing Rules

AI may:

- Edit page copy.
- Add new pages.
- Improve metadata.
- Fix layout bugs.

AI must ask before:

- Deleting pages.
- Changing canonical URLs.
- Changing analytics or forms.
- Changing brand positioning.

AI must not:

- Commit secrets.
- Remove redirects without approval.
- Publish unverified builds.

## Preview And Validation

Install:

```bash
npm install
```

Preview:

```bash
npm run dev
```

Validate:

```bash
npm run build
npm run check
```

## Publishing

Deployment target:
Production branch:
Publish rule:

Before publishing:

- Build passes.
- Important URLs work.
- Mobile view is checked.
- Metadata exists.

## Agent Recipes

### Add A Page

1. Create content.
2. Add metadata.
3. Add navigation only if appropriate.
4. Run checks.

### Publish A Blog Post

1. Create draft.
2. Match `COPY.md`.
3. Follow `SEO.md`.
4. Add internal links.
5. Run checks.
````

## Lint Rules

MVP validator should check:

- `WEBSITE.md` exists.
- Required sections exist.
- Preview command is present.
- Validation command is present.
- URL policy is present.
- Publishing policy is present.
- Adjacent files are referenced if they exist.
- Markdown content is parseable when present.
- Image and media references resolve when present.
- Links and user-editable embeds avoid unsafe script execution.

Future validator can parse structured front matter and verify any `data-wmd-source` references found in rendered HTML.

## Design Principle

Markdown first. Human-readable. Agent-readable. Strict enough to be useful, loose enough to be adopted.
