# Changelog

All notable changes to this project are recorded here. The section for each
version becomes the body of its [GitHub Release](https://github.com/moiz994/moizalam-portfolio/releases),
so write it for a reader, not for a diff.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_Nothing yet._

## [1.0.0] - 2026-08-11

First tagged release — the portfolio as it currently stands at
[moizalam.com](https://moizalam.com).

### Added

- **Portfolio site foundation** — home page with intro, work grid, and about
  sections, built on Next.js with a static export.
- **Case studies driven by a block system** — long-form case studies composed
  from reusable content blocks (`tileGrid`, `carousel`, and friends) rather than
  bespoke markup per page, so new studies are a data change instead of a build.
  Live studies: Interiors Source and Idea Bank.
- **Typography system** — a documented type scale using Satoshi, captured in
  `TYPOGRAPHY.md`.
- **Automatic deploys** — pushes to `main` build and publish to GitHub Pages on
  the custom `moizalam.com` domain.
- **Search and social metadata** — sitemap, `robots.txt`, and a social share
  card served as a static PNG, so links unfurl properly when shared.
- **Google Analytics 4** — page-view analytics via `@next/third-parties`.

### Changed

- The home grid now shows only case studies explicitly marked as published, so
  drafts can live in the repo without leaking to visitors.
- Navigation links resolve correctly from every page, not just the home page.
- `README.md` rewritten to describe what this project actually is.

### Fixed

- Satoshi webfont failing to load in local development.

### Internal

- `/blocks` reference page documenting the available content blocks, excluded
  from search indexing.

[Unreleased]: https://github.com/moiz994/moizalam-portfolio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/moiz994/moizalam-portfolio/releases/tag/v1.0.0
