---
name: build-simple-website
description: Use when a user wants an AI agent to create, modify, preview, validate, or prepare a simple website using WEBSITE.md, DESIGN.md, COPY.md, and SEO.md.
---

# Build Simple Website

## Goal

Create or update a simple static-first website by following the repo's website instruction files.

## Required Context

Read these files if present:

1. `WEBSITE.md`
2. `DESIGN.md`
3. `COPY.md`
4. `SEO.md`
5. `AGENTS.md`

If `WEBSITE.md` is missing, create a draft before making broad site changes.

## Workflow

1. Understand the user's desired website or change.
2. Read the instruction files.
3. Inspect the project structure.
4. Identify the smallest set of files to edit.
5. Make the change.
6. Preview locally when a dev server exists.
7. Check desktop and mobile layout when practical.
8. Run build/check commands.
9. Fix failures.
10. Report changed files and remaining risks.

## Website Creation Flow

When creating a new site:

1. Fill out `WEBSITE.md` from the user's prompt.
2. Fill out `DESIGN.md` with a restrained, usable visual system.
3. Fill out `COPY.md` with audience, voice, and messaging.
4. Fill out `SEO.md` with URL and metadata rules.
5. Build the first site screen directly, not a marketing placeholder for the tool.
6. Ensure the generated site has real content, navigation, metadata, and responsive layout.

## Safety Rules

- Preserve public URLs unless the user approves redirects.
- Do not publish automatically.
- Do not commit secrets.
- Do not add unsupported integrations.
- Do not generate spammy SEO content.
- Ask before deleting pages or changing canonical URLs.

## Completion Criteria

Before finishing:

- site builds or the blocker is clearly reported,
- important pages render,
- mobile layout is considered,
- metadata is present,
- changes align with `DESIGN.md`, `COPY.md`, and `SEO.md`.

