# Publish npm Packages

## One command

From the repo root, after `npm login` once:

```bash
npm run publish:packages
```

Dry run (pack only, no publish):

```bash
npm run publish:packages:dry-run
```

Skip post-publish smoke tests:

```bash
node scripts/publish-packages.mjs --skip-smoke
```

This publishes:

- `create-website-md` — powers `npm create website-md@latest my-site`
- `website-md` — powers `npx website-md check`

## Prerequisites

```bash
npm login
```

If npm cache permissions fail locally:

```bash
npm_config_cache=/private/tmp/npm-cache npm run publish:packages
```

## Smoke test (manual)

From a clean directory:

```bash
npm create website-md@latest my-site
cd my-site
npm run check
npm run build
npm run dev
```

Portable checker:

```bash
npx website-md check
```

## Publish the standalone example repo

After `gh auth login`:

```bash
npm run publish:example
```

Optional custom repo name:

```bash
node scripts/publish-example.mjs my-consultant-example
```

Dry run:

```bash
npm run publish:example:dry-run
```

Then deploy `dist/` (Vercel recommended) and add the live URL to `src/examples/simple-consultant/index.html`.

## Publish order

1. Merge changes to `main`.
2. Bump versions in `packages/create-website-md/package.json` and `packages/website-md/package.json` when needed.
3. Run `npm run publish:packages`.
4. Deploy `websitemd.org`.

Do not launch homepage changes that depend on new package versions until publish succeeds.
