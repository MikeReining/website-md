# Publish npm Packages

## Command Goal

This command:

```bash
npm create website-md@latest my-site
```

works only after the npm package `create-website-md` is published.

`npm create website-md@latest` resolves to:

```txt
create-website-md@latest
```

The GitHub repo can host the source, but npm is what makes the command executable for users.

## Package

Current create package:

```txt
packages/create-website-md
```

Package name:

```txt
create-website-md
```

Later CLI package:

```txt
packages/website-md
```

Package name:

```txt
website-md
```

That second package is what will make this work:

```bash
npx website-md lint
```

## Publish Order

1. Create the GitHub organization or repo.
2. Create or choose the npm publisher account.
3. Confirm the npm package name is available.
4. Publish `create-website-md`.
5. Smoke test from a clean directory.
6. Deploy `websitemd.org`.

Do not launch the homepage publicly until the npm create command works.

## Publish Commands

From `packages/create-website-md`:

```bash
npm login
npm publish --access public
```

If npm cache permissions fail locally, use a temp cache:

```bash
npm_config_cache=/private/tmp/npm-cache npm publish --access public
```

## Smoke Test

From a clean directory:

```bash
npm create website-md@latest my-site
cd my-site
npm run check
npm run build
npm run dev
```

Open:

```txt
http://localhost:4177
```

## Local Package Test

Before publishing:

```bash
cd packages/create-website-md
npm_config_cache=/private/tmp/npm-cache npm pack --pack-destination /private/tmp
```

Then from a clean temp directory:

```bash
npm_config_cache=/private/tmp/npm-cache npm exec --package /private/tmp/create-website-md-0.1.0.tgz -- create-website-md my-site
cd my-site
npm run check
npm run build
```

Note: `npm create` does not accept a local tarball path as an initializer. Use `npm exec --package` for local tarball testing.
