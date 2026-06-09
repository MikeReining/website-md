# Agent Edit Summary

This example was generated from the Website.md starter, then customized by an AI agent using only `WEBSITE.md` as the operating layer.

## Prompt used

```txt
Turn this starter into a one-page consultant site for Alex Rivera at Rivera Consulting.
Follow WEBSITE.md, DESIGN.md, COPY.md, and SEO.md.
Update the hero, services, proof, and contact CTA.
Run npm run check and npm run build before finishing.
```

## Changes made

- Renamed the site to Rivera Consulting in `WEBSITE.md`, `src/index.html`, and `src/llms.txt`.
- Rewrote hero, services, and proof sections for an operations consultant.
- Kept canonical URL at `/` and preserved starter routes (`/llms.txt`, `/sitemap.xml`, `/robots.txt`).
- Left design tokens in `DESIGN.md` and voice rules in `COPY.md` unchanged except where copy required it.

## Validation

```bash
npm run check
npx website-md check
```

Both should pass from the example directory.
