# moizalam.com

Personal portfolio of **Moiz Alam** — Product Manager. Live at [moizalam.com](https://moizalam.com).

A single-page landing (hero, about, career journey, featured work) plus full case-study pages, built as a fully static site.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) with `output: 'export'` — builds to plain static files, no server
- TypeScript + Tailwind CSS, with most component styling inline
- Fonts: [Satoshi](https://www.fontshare.com/fonts/satoshi) (display/headings, via Fontshare CDN) and Oxygen (body, self-hosted via `next/font`)

## Running locally

```bash
npm install
npm run dev
```

`npm run build` produces the static site in `out/`.

## How content works

Everything shown on the site is driven by **`data/projects.ts`** — the single source of truth for the featured work grid and the case-study pages.

- Each project has card fields (title, description, tags, thumbnail) and a detail page built from **content blocks** — reusable sections like `section`, `metrics`, `timeline`, `beforeAfter`, `carousel`, `tileGrid`, etc.
- **`published: true`** makes a project visible. Unpublished projects stay off the home grid and don't get a page built, so drafts can live in the data file safely.
- **[/blocks](https://moizalam.com/blocks)** is an internal reference page (not linked anywhere) that renders every block type with placeholder content — useful when writing a new case study.

To add a case study: add images to `public/work/`, write the project entry in `data/projects.ts` using blocks, set `published: true`, and push.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the site and deploys it to **GitHub Pages** under the custom domain `moizalam.com` (set by `public/CNAME`). No manual steps.

## Project layout

```
app/                  # routes: landing page, /work/[slug], /blocks
components/           # landing page sections + navbar
components/work/      # case-study building blocks (WorkBody renders them)
data/projects.ts      # all portfolio content lives here
public/work/          # case-study images
public/logos/         # company/brand logos
```

## Gotchas

- The Fontshare stylesheet link needs `referrerPolicy="no-referrer"` — Fontshare rejects requests with a `localhost` referer, which silently breaks headings in local dev.
- Case-study routes are prerendered from `generateStaticParams`, so a project won't have a page until it's `published` and rebuilt.
