# Rivera Consulting Example

A real, inspectable Website.md example: a one-page consultant site generated from the starter and customized by an AI agent.

## Inspect

- [`WEBSITE.md`](./WEBSITE.md) — site operating instructions
- [`EDIT-SUMMARY.md`](./EDIT-SUMMARY.md) — prompt and changes
- [`src/index.html`](./src/index.html) — rendered page

## Run locally

```bash
npm run dev
npm run build
npm run check
```

Portable checker:

```bash
npx website-md check
```

## Deploy

Read `HOSTING.md` and `VERCEL.md`. Build output is `dist/`.

## Publish as standalone repo

This folder is self-contained. Push it to a public GitHub repo, deploy `dist/`, then add the live URL to the case study on websitemd.org.
