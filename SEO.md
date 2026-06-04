# SEO.md

## Purpose

This file tells AI agents how to optimize the website for search engines and AI discovery without turning the site into spam.

## Principles

- Preserve existing public URLs.
- Write for humans first.
- Use clear titles and descriptions.
- Add internal links intentionally.
- Make important pages crawlable.
- Add structured data where it is genuinely appropriate.
- Keep claims accurate and specific.
- Avoid doorway pages, keyword stuffing, and low-value generated content.

## URL Policy

Do not change existing public URLs without explicit approval.

If a URL must change:

1. Create a redirect.
2. Update internal links.
3. Update sitemap.
4. Verify both old and new paths.

## Metadata

Every public page should have:

- title,
- meta description,
- canonical URL,
- Open Graph title,
- Open Graph description,
- Open Graph image where practical.

## Internal Linking

When adding a page:

- link from at least one relevant existing page,
- link back to a relevant core page,
- avoid orphan pages unless the page is intentionally unlisted.

## Structured Data

Use JSON-LD only when it matches the page:

- `WebSite` for the home page.
- `Organization` for the project or company.
- `Article` for articles.
- `FAQPage` for real FAQ content.
- `Product` only for real products.
- `LocalBusiness` only for real local businesses.

## AI Discovery

Generate or maintain:

- `llms.txt`,
- sitemap,
- robots.txt,
- markdown mirrors where useful,
- JSON-LD structured data.

Do not claim `llms.txt` guarantees AI visibility. Treat it as a low-cost context aid.

## Content Quality

Content should be:

- original,
- useful,
- specific,
- easy to scan,
- internally linked,
- aligned with `COPY.md`.

AI-generated content should be reviewed before publishing when it represents a business, regulated topic, or important public claim.

## Checks

Before publishing, verify:

- no broken internal links,
- required metadata exists,
- sitemap includes indexable pages,
- redirects are valid,
- no accidental noindex on important pages,
- images have useful alt text where appropriate.

