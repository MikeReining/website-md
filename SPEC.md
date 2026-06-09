# WEBSITE.md Draft Specification

Status: draft 0.2  
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

Read the core sections first (~5 minutes). Advanced capabilities are public, optional, and marked below.

## Required File

The only required root instruction file is `WEBSITE.md`.

Small sites can keep design, copy, SEO, and publishing rules inside `WEBSITE.md`. Larger sites can split those concerns into optional companion files referenced from `WEBSITE.md`.

```txt
my-site/
  WEBSITE.md          # required
  AGENTS.md           # optional — repo workflow
  DESIGN.md           # optional — visual system
  COPY.md             # optional — voice and messaging
  SEO.md              # optional — discovery rules
  media.json          # optional — stable media keys
```

## AGENTS.md positioning

AGENTS.md tells agents how to work in your repo. WEBSITE.md tells agents how to operate your website.

`AGENTS.md` is an adjacent repo-level convention, not a Website.md-owned required file. Template repos may include it for convenience.

## Conformance Levels

Progressive adoption:

```txt
Level 0 — Declared
A root WEBSITE.md exists.

Level 1 — Checked
The portable Website.md checker passes.

Level 2 — Addressable
Rendered output exposes source mappings using data-wmd-* attributes.

Level 3 — Operable
The project declares deterministic edit operations, media references, block front matter, and validation contracts.

Level 4 — Optimizable
The project declares analytics and experiment contracts that agents can operate safely.
```

Check level:

```bash
npx website-md check
```

---

## Core WEBSITE.md

Place `WEBSITE.md` at the project root.

### Required sections

#### Site Identity

Defines the website's name, owner, domain, category, audience, and core job.

#### Primary User Goals

Defines the actions visitors should be able to complete.

#### Site Structure

Lists public routes agents should know. Include concrete paths such as `/`, `/llms.txt`, `/sitemap.xml`, and `/robots.txt` when they exist.

#### Canonical URLs

Lists important public URLs and the rule for preserving or redirecting them.

#### Content Sources

Explains where content, images, files, and metadata live.

#### Editing Rules

Defines what the AI may change freely, what requires confirmation, and what must not be changed.

#### Preview And Validation

Lists commands for previewing and checking the site.

#### Publishing

Explains how deployment works and what must happen before publish.

### Recommended skeleton

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

## Site Structure

- `/`: home page
- `/llms.txt`: LLM context summary
- `/sitemap.xml`: crawlable URL inventory
- `/robots.txt`: crawler policy

## Canonical URLs

Preserve existing public URLs unless the user explicitly approves a redirect.

Important URLs:

- `/`

## Content Sources

Pages:
Images:
Metadata:

## Editing Rules

AI may:
- Edit page copy.
- Add new pages.
- Improve metadata.

AI must ask before:
- Deleting pages.
- Changing canonical URLs.
- Publishing.

AI must not:
- Commit secrets.
- Publish unverified builds.

## Preview And Validation

```bash
npm run dev
npm run build
npm run check
```

## Publishing

Deployment target:
Publish rule: build and checks pass first.
````

---

## Optional Companion Files

Reference companion files from `WEBSITE.md` when they exist:

| File | Role |
| --- | --- |
| `AGENTS.md` | Repo workflow, commands, and guardrails |
| `DESIGN.md` | Visual identity, tokens, components |
| `COPY.md` | Voice, writing rules, messaging |
| `SEO.md` | URLs, metadata, structured data, discovery |
| `media.json` | Stable media keys for `media:key` references |
| `llms.txt` | Published summary for external LLMs |

Validators should check that referenced companion files exist. Unreferenced companion files are allowed.

---

## Source Addressability

*Optional — Level 2+*

Source addressability lets an agent connect a rendered element back to the file or fragment that produced it.

```html
<section data-wmd-source="content/pages/home.md#hero" data-wmd-role="hero">
  <h1 data-wmd-field="headline">A clear headline</h1>
  <p data-wmd-field="subhead">A concise supporting line.</p>
</section>
```

Recommended attributes:

- `data-wmd-source`: repo-relative source path, optionally with a fragment.
- `data-wmd-role`: semantic role such as `hero`, `nav`, `testimonial`, `pricing`, or `footer`.
- `data-wmd-field`: editable field within the source.
- `data-wmd-node`: stable node id when the renderer can provide one.
- `data-wmd-range`: source line or line/column range, such as `L12-L16`.

Rules:

- Prefer repo-relative paths, never absolute local paths.
- Do not expose secrets or private prompts in attributes.
- Treat addressability as progressive enhancement; a valid site does not need to be block-based.

---

## Content Capabilities

*Optional — Level 3+*

A site may declare the content primitives and declarative extensions its renderer supports.

Baseline primitives:

- `paragraph`, `heading`, `link`
- `ordered_list`, `unordered_list`
- `table`, `blockquote`
- `code_block`, `inline_code`, `image`

Rules:

- Baseline primitives should be Markdown-native.
- Extensions must be declarative, schema-checkable, and safe.
- Extensions must not require user-editable JavaScript.
- If a site does not declare support for an extension, the agent should ask or use a baseline fallback.

---

## Block Front Matter

*Optional — Level 3+*

Markdown files may use optional flat `wmd_*` front matter for safe layout and rendering knobs.

```md
---
wmd_id: comparison
wmd_role: comparison
wmd_layout: grid
wmd_variant: compact
wmd_columns: 3
---

## Compare options
```

Rules:

- `wmd_id` should be stable within the file when present.
- `wmd_role` describes semantic purpose.
- Layout keys are renderer inputs, not raw CSS.
- Agents should preserve unrelated front matter keys.

---

## Media References

*Optional — Level 3+*

Sites may use an optional `media.json` manifest for stable media keys.

```json
{
  "hero": {
    "src": "public/images/hero.jpg",
    "alt": "Founder working at a laptop"
  }
}
```

Markdown may reference `![Alt](public/images/hero.jpg)` or `![Alt](media:hero)`.

Rules:

- `media:key` must resolve to `media.json` when used.
- Agents must not invent media keys or fake remote URLs.

---

## Validation

*Level 1+*

Portable checker:

```bash
npx website-md check
```

MVP checks:

- `WEBSITE.md` exists.
- Required sections exist.
- Referenced local files exist.
- Optional companion files exist when referenced.
- Declared `npm run` scripts exist in `package.json` when applicable.
- Conformance level is reported.
- `--json` output and exit codes `0` / `1`.

Site-specific validators may add HTML metadata, link, and safety checks on top.

---

## Analytics

*Optional — Level 4+*

Sites may declare analytics contracts in `WEBSITE.md`:

- Allowed measurement tools.
- Events agents may add or rename.
- Events that require user approval.
- PII and consent rules.

Agents must not add tracking pixels or change consent behavior without approval.

---

## A/B Testing and Experiments

*Optional — Level 4+ — future-facing*

Website.md is compatible with future experiment tooling. No runtime system is required yet.

Intended experiment shape:

- `experiment_id`: stable identifier.
- `target`: page or block target.
- `variants`: variant source paths.
- `allocation`: traffic split policy.
- `analytics_events`: events tied to the experiment.
- `success_metric`: declared metric (must exist before start).
- `status`: draft, running, stopped, winner_applied.
- `safety_rules`: URL preservation, claim limits, rollback.
- `winner_application`: how the winning variant returns to source.

Rules:

- Agents must not invent success metrics.
- Agents must not alter canonical URLs casually for experiments.
- Experiments require explicit user approval to start or stop.

---

## Agent Operations

*Optional — Level 3+*

`WEBSITE.md` may include agent recipes for repeatable tasks:

- Add a page.
- Publish a blog post.
- Update navigation.
- Run pre-deploy checks.

Recipes should reference validation commands and approval gates.

---

## Import and Export

*Optional — tooling*

Future helpers may:

- `export-llms`: generate `llms.txt` from site metadata.
- `extract <url>`: draft instruction files from a public site (review required).

Import/export tooling must not imply verified migration without human review.

---

## Design Principle

Markdown first. Human-readable. Agent-readable. Simple at the door, deep by design.

The public standard has room for advanced Studio/Ikiro-style editing, analytics, and future A/B testing—without forcing beginners to understand those capabilities before adopting `WEBSITE.md`.
