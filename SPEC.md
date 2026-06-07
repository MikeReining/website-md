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
- Content Capabilities
- Block Front Matter
- Media References
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
- `data-wmd-node`: stable node id when the renderer can provide one.
- `data-wmd-range`: source line or line/column range, such as `L12-L16` or `L12:C1-L16:C20`.

Rules:

- Prefer repo-relative paths, never absolute local paths.
- Prefer stable node ids or source ranges over parser-specific AST paths in rendered HTML.
- Parser-specific AST paths may be tool-internal, but should not be the public convention.
- Do not expose secrets, private prompts, or user-only data in attributes.
- Keep mappings stable enough that preview tooling can use them.
- Treat addressability as a progressive enhancement; a valid `WEBSITE.md` site does not need to be block-based.

Sub-source mapping example:

```html
<li
  data-wmd-source="content/pages/home.md#features"
  data-wmd-role="feature"
  data-wmd-node="feature-2"
  data-wmd-range="L18-L20"
>
```

## Content Capabilities

A Website.md-compatible site may declare the content primitives and declarative extensions its renderer supports.

Baseline primitives:

- `paragraph`
- `heading`
- `link`
- `ordered_list`
- `unordered_list`
- `table`
- `blockquote`
- `code_block`
- `inline_code`
- `image`

Optional declared extensions may include:

- `callout`
- `gallery`
- `embed`
- `cta`
- `form`
- `download`

Rules:

- Baseline primitives should be Markdown-native.
- Extensions must be declarative, schema-checkable, and safe.
- Extensions must not require user-editable JavaScript.
- Agents should consult the site's capabilities before adding content.
- If a site does not declare support for an extension, the agent should ask or use a baseline primitive fallback.

Example:

```md
## Content Capabilities

Supported primitives:
- paragraph
- heading
- link
- ordered_list
- unordered_list
- table
- blockquote
- code_block
- inline_code
- image

Supported extensions:
- callout
- gallery

Media references:
- repo-relative paths
- `media:key` references when `media.json` exists
```

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
wmd_id: comparison
wmd_role: comparison
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

## Block Front Matter

Markdown page and block files may use optional front matter to expose safe layout and rendering knobs without requiring agents to edit HTML or CSS.

Portable Website.md front matter should use flat `wmd_*` keys. Flat keys are easier for agents to edit safely across Markdown processors than nested YAML objects.

Recommended shape:

```md
---
wmd_id: comparison
wmd_role: comparison
wmd_layout: grid
wmd_variant: compact
wmd_columns: 3
---

## Compare options

| Need | Website.md | Hosted builder |
| --- | --- | --- |
| Exportable files | Yes | Usually no |
```

Rules:

- `wmd_id` should be stable within the file when present.
- `wmd_role` describes semantic purpose, such as `hero`, `pricing`, `comparison`, `gallery`, `contact`, or `footer`.
- `wmd_layout`, `wmd_variant`, `wmd_columns`, `wmd_media`, and similar keys are renderer inputs, not raw CSS.
- Values should be simple scalars when possible. Use arrays or objects only when the site declares support for them.
- Unknown `wmd_*` keys should be ignored or rejected according to the site's declared capabilities.
- Nested `wmd:` objects may be accepted as compatibility input, but agents should write the flat `wmd_*` form.
- Front matter must stay parseable.
- Agents should preserve unrelated front matter keys and avoid reformatting the whole block when making a small change.
- Agents should change layout through declared front matter options, not by injecting HTML or CSS.

## Media References

Sites may use an optional `media.json` manifest when they need stable media keys in addition to repo-relative file paths.

Example `media.json`:

```json
{
  "hero": {
    "src": "public/images/hero.jpg",
    "alt": "Founder working at a laptop",
    "caption": "",
    "credit": ""
  }
}
```

Markdown may reference media with normal repo-relative paths:

```md
![Founder working](public/images/hero.jpg)
```

or manifest keys:

```md
![Founder working](media:hero)
```

Rules:

- `media:key` must resolve to `media.json` when used.
- `alt` should be present before publish.
- Agents must not invent media keys or fake remote URLs.
- Tools may pass available media to agents, but the portable source of truth is the manifest or repo files.

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
- Declared content capabilities are valid when present.
- Markdown content is parseable when present.
- Front matter is parseable when present.
- Optional `wmd_*` metadata uses valid declared keys.
- Tables have valid structure.
- Repo-relative images resolve.
- `media:key` references resolve when present.
- Links do not use unsafe `javascript:` URLs.
- Raw HTML, scripts, styles, event attributes, and embeds are safe for user-editable content.
- Source mappings and optional source ranges are valid when present.

Future validator can parse structured front matter and verify any `data-wmd-source` references found in rendered HTML.

## Design Principle

Markdown first. Human-readable. Agent-readable. Strict enough to be useful, loose enough to be adopted.
