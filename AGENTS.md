# Agent Instructions

This folder is a concept handoff for Website.md. Keep edits focused, practical, and easy for another developer to copy into a new repo.

## Project Intent

Website.md is a proposed open convention for AI-operable websites.

The core claim:

> The website editor is disappearing. `WEBSITE.md` tells an AI agent how to operate a website.

## Editing Rules

- Prefer concise Markdown.
- Keep claims grounded.
- Do not turn this into a SaaS pitch.
- Do not add pricing unless explicitly requested.
- Treat `WEBSITE.md`, `DESIGN.md`, `COPY.md`, and `SEO.md` as separate instruction layers.
- Keep the first implementation small: spec, starter, validator, demo.

## Build Direction

If implementing the repo:

- Use a simple static-first stack.
- Favor Markdown content.
- Make `npm create website-md@latest my-site` the ideal install experience.
- Add `npx website-md lint` for validation.
- Dogfood the convention on `websitemd.org`.

## Verification

For docs-only edits, review the rendered Markdown mentally and check links/commands for plausibility.

For code edits, add and run focused checks.

