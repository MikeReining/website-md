# HOSTING.md

## Purpose

This file tells AI agents how to help a user publish this website without turning deployment into a research project.

## Default Host

Prefer Vercel for the first deploy.

Why:

- It imports GitHub repos quickly.
- It supports static output from `dist/`.
- It gives preview and production URLs.
- It can attach a custom domain later.

## Agent Workflow

When the user asks to deploy:

1. Run checks.
2. Build the site.
3. Confirm the output folder is `dist/`.
4. Ask whether the user wants GitHub + Vercel.
5. Give the shortest exact steps.

Commands:

```bash
npm run check
npm run build
```

## Required Vercel Settings

```txt
Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Root Directory: /
```

## Domain

If the user has a domain, add it in Vercel after the first successful deploy.

Common DNS records:

```txt
A      @      216.198.79.1
CNAME  www    cname.vercel-dns.com
```

Use the exact values Vercel shows for the project.

## Do Not

- Do not ask the user to buy hosting before the site builds.
- Do not publish without `npm run check` and `npm run build`.
- Do not change DNS records without showing the user the exact values.
- Do not claim DNS is done until the production domain loads.
