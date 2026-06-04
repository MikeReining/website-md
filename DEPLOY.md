# Deploy websitemd.org

## Target

Host `websitemd.org` on Vercel.

This is a static site. Vercel should build from `src/` into `dist/` using the repo scripts.

## Vercel Settings

These are also captured in `vercel.json`.

```txt
Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Production Branch: main
Domain: websitemd.org
```

## First Deploy

```bash
npm run check
npm run build
vercel
vercel --prod
```

If using Git integration, import the repo in Vercel, attach `websitemd.org`, and let pushes to `main` create production deployments.

## Domain

Add both domains in Vercel:

```txt
websitemd.org
www.websitemd.org
```

Prefer `websitemd.org` as canonical. Redirect `www.websitemd.org` to `websitemd.org`.

## Before Production

- `npm run check` passes.
- `npm run build` passes.
- `npm create website-md@latest my-site` works from a clean directory.
- `/`, `/spec/`, `/examples/`, `/guides/create-site/`, `/guides/replace-squarespace/`, and `/docs/cli/` render.
- `https://websitemd.org/llms.txt` is reachable.
- `https://websitemd.org/sitemap.xml` is reachable.
- Canonical URLs use `https://websitemd.org`.
