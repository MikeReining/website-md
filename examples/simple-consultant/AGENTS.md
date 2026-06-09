# Agent Instructions

AGENTS.md tells agents how to work in your repo. WEBSITE.md tells agents how to operate your website.

Site instructions: see WEBSITE.md.

This is a Website.md starter site. Read `WEBSITE.md` first. Use optional companion files when present:

- `DESIGN.md`
- `COPY.md`
- `SEO.md`
- `HOSTING.md`

## First Run

When an agent creates this project from:

```bash
npm create website-md@latest my-site
```

the agent should immediately:

1. Enter the created project folder.
2. Read the instruction files.
3. Run the dev server.
4. Give the user the local preview URL.
5. Offer to customize the site.

Commands:

```bash
cd my-site
npm run dev
```

Local preview:

```txt
http://localhost:4177
```

Keep the dev server running while the user previews the site.

## Before Finishing

Keep edits practical and focused. Run checks before finishing:

```bash
npm run build
npm run check
```

If the user wants to deploy, read `VERCEL.md`.
