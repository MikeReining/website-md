# Website.md CLI Concept

## Package Names

Candidate packages:

- `create-website-md`
- `website-md`

Preferred install flow:

```bash
npm create website-md@latest my-site
```

This works only after `create-website-md` is published to npm. `npm create website-md@latest` resolves to `create-website-md@latest`.

Alternative:

```bash
npx website-md@latest init my-site
```

## Commands

### `website-md init`

Create instruction files in an existing project.

```bash
npx website-md init
```

Writes:

```txt
WEBSITE.md
DESIGN.md
COPY.md
SEO.md
```

Optionally updates `AGENTS.md`.

### `website-md create`

Create a new static-first website.

```bash
npx website-md create my-site
```

Creates a working repo with:

- starter site,
- instruction files,
- dev/build/check commands,
- deploy guide.

### `website-md lint`

Validate instruction files.

```bash
npx website-md lint
```

Checks:

- required files exist,
- required sections exist,
- commands are present,
- URL policy exists,
- publishing policy exists,
- SEO/COPY/DESIGN references are coherent.

### `website-md check`

Run local website quality checks.

```bash
npx website-md check
```

Possible checks:

- build,
- links,
- metadata,
- sitemap,
- redirects,
- accessibility smoke test,
- mobile screenshot smoke test.

### `website-md extract <url>`

Generate starter instruction files from an existing public website.

```bash
npx website-md extract https://example.com
```

Outputs:

- discovered pages,
- inferred site identity,
- draft `WEBSITE.md`,
- draft `DESIGN.md`,
- draft `COPY.md`,
- draft `SEO.md`,
- URL inventory.

This is a helper, not a guarantee. The user or agent must review the result.

### `website-md export-llms`

Generate `llms.txt` from site metadata and key pages.

```bash
npx website-md export-llms
```

## MVP Implementation Notes

Start with:

- `create` from a template,
- `init`,
- `lint`.

The first package to publish is `packages/create-website-md`, because it powers the public create command.

Defer:

- crawling,
- screenshots,
- deploy automation,
- MCP server.
