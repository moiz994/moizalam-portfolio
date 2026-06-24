# Typography System

Two typefaces, one clear split:

- **Satoshi** — *display & accent*: headings, eyebrows, labels, card titles, branding. Loaded weights: **400 / 500 / 700 / 900** (via the fontshare `<link>` in `app/layout.tsx`).
- **Oxygen** — *body & UI*: paragraphs, nav, buttons, tags, footer links, stats, meta values. The document default. Loaded weights: **300 / 400 / 700** (via `next/font/google` in `app/layout.tsx`).

CSS variables (in `app/globals.css` `@theme`):
- `--font-display` → Satoshi
- `--font-sans` → Oxygen (also the `body` font)

## The weight rule (important)

**Oxygen has no 500 or 700… er — no 500 (medium) or 600 (semibold).** It ships only 300 / 400 / 700. So on any Oxygen (body/UI) text:

- **Regular = 400** (the default)
- **Emphasis = 700** → use Tailwind `font-bold`
- **Never** use `font-medium` or `font-semibold` on body/UI text — they have no matching cut and render unpredictably.

Satoshi keeps its full range, so display/accent tokens use 500 / 700 / 900 freely.

## Tokens

Defined as utility classes in `app/globals.css` (`@layer components`). Each token sets **family + size + weight + line-height + tracking + case** only. **Color is applied inline** on the element, because it changes between light and dark sections (e.g. `#0f172a` on light, `#ffffff` on dark, `#0ea5e9`/`#7dd3fc` accents).

### Display / headings — Satoshi (900)

| Token | Size | Line-height / tracking | Used for |
|---|---|---|---|
| `.t-display-xl` | `clamp(4rem,10vw,8.5rem)` | .88 / -0.02em | Landing hero H1 |
| `.t-display-lg` | `clamp(2.5rem,7vw,5.5rem)` | .92 / -0.02em | Case-study hero H1 |
| `.t-h2` | `clamp(2.2rem,5vw,3.5rem)` | 1.05 | Section headings (About, Philosophy, Career, Featured Work) |
| `.t-h3` | `clamp(1.4rem,3vw,2.2rem)` | 1.12 | Work TL;DR statement, work body section headings, callouts |
| `.t-title` | `clamp(1.05rem,2vw,1.4rem)` | 1.2 | Card titles, accordion job titles |
| `.t-brand` | `clamp(1.4rem,2.5vw,1.8rem)` | -0.01em | Footer brand, navbar logo (logo overrides size to `text-xl`) |

### Eyebrows / labels — Satoshi

| Token | Font/size/weight | Tracking / case | Used for |
|---|---|---|---|
| `.t-eyebrow` | Satoshi 700, `0.875rem` | wide / uppercase | Section eyebrows ("FEATURED WORK"), Footer "Contact" |
| `.t-eyebrow-sm` | Satoshi 500, `0.75rem` | widest / uppercase | Marquee heading, "Image coming soon" placeholders |
| `.t-lead` | Satoshi 700, `clamp(0.95rem,1.5vw,1.15rem)` | wide | Hero "Hey, I'm Moiz,", case-study hero year |
| `.t-label` | Satoshi 700, `0.8rem` | 0.05em | Numbered competency labels (`#01`), hero meta labels (`# Company`) |

### Body & UI — Oxygen (400; emphasis via `font-bold` = 700)

| Token | Size / weight | Used for |
|---|---|---|
| `.t-body-lg` | `1.125rem` / 400, lh 1.6 | Intro & section paragraphs, descriptions, TL;DR paragraph |
| `.t-body` | `1rem` / 400, lh 1.6 | Hero tagline, role descriptions, hero meta values |
| `.t-body-sm` | `0.875rem` / 400, lh 1.6 | Card descriptions, bullets, footer copy, captions, durations, fine print |
| `.t-nav` | `0.875rem` / 400 | Navbar links |
| `.t-button` | `0.875rem` / 700 | Buttons ("Get in touch") |
| `.t-tag` | `0.75rem` / 400 | Pills / tags |
| `.t-link` | `1rem` / 400 | Footer links (add `font-bold` for the work-page "Back to all work") |
| `.t-stat` | `1.875rem` / 700 | Stat numbers |

## Conventions

- **Add a heading?** Use the matching `.t-*` display token + an inline `color`. Headings also default to Satoshi via the global `h1,h2,h3` rule as a safety net.
- **Add body text?** Use `.t-body-lg` / `.t-body` / `.t-body-sm`. For bold, add `font-bold`. Don't reach for `font-medium`/`font-semibold`.
- **One-off accent** (e.g. the hero quote) may stay inline `fontFamily: var(--font-display)` if no token fits — keep these rare.
- Layout utilities (`mb-*`, `flex`, `tracking-*` overrides) can sit alongside a token class.
