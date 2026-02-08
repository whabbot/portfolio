# Design — Portfolio

## Information architecture

- Nav: Home, Projects, Experience, Contact
- CV: `/cv` (curated, recruiter-friendly) linked prominently from Home
- Footer: social links, small copyright line

## Visual direction

- Tone: clean, modern, developer-forward
- Layout: generous whitespace, strong typography, readable line length
- Motion: minimal; respect reduced motion

## Tailwind tokens (initial)

- Colors: neutral base + 1 accent (used for links/CTAs)
- Typography: 1–2 font families max
- Spacing: consistent vertical rhythm (stack-based layout)

## Components (v1)

- `Container`
- `Header/Nav`
- `Footer`
- `Button` / `Link`
- `ProjectCard`
- `TechTag`
- `TimelineItem`
- `ExperienceDetail` sections (STAR-style blocks)
- `PortableText` renderer wrapper

## Responsive + a11y

- Mobile-first; avoid hover-only interactions
- Visible focus states; keyboard navigable nav
- Headings in order; sufficient contrast

## SEO + performance

- Astro-first rendering; keep client JS minimal (React islands only when needed).
- Always size images (Sanity CDN URLs with explicit dimensions) to avoid CLS.
- Provide per-page metadata (title/description/OG) and generate a sitemap.
- Respect reduced motion; keep transitions subtle and non-essential.

## Content presentation rules

- Projects: emphasize impact (what/why), then implementation (how), then links.
- Experience: 3–5 highlights max per role; tech as tags.

## Page-specific intent

- `/cv`: curated, fastest scan. Each listed role/project must link to its detail page (`/experience/:slug`, `/projects/:slug`). Include a clear link to “See full experience” \u2192 `/experience`.
- `/experience`: complete ordered list. Keep scannable; optionally show 1–2 bullets by default with expand/collapse for the rest. Always link roles to `/experience/:slug`.

## Decisions (ADR-lite)

### Stack

- **Decision**: Use **Astro** for the site, **Tailwind CSS** for styling, and **Sanity** as the CMS for Projects + Experience.
  - **Rationale**: Astro keeps the site fast and content-first; Tailwind speeds consistent UI work; Sanity provides structured content + media and supports future expansion.
  - **Implications**: Keep React usage minimal (islands only). Prefer build-time content fetch for static pages.

### Hosting

- **Decision**: Deploy the Astro site to **Vercel**; host Sanity Studio using **Sanity-hosted Studio**.
  - **Rationale**: Lowest operational overhead and most common happy-path for both tools.
  - **Implications**: Set up a Sanity publish webhook to trigger Vercel redeploys.

### Tooling

- **Decision**: Keep testing/linting conventions in Cursor rules (not duplicated here).
  - **Rationale**: Maintain a single source of truth and keep docs context-light.
  - **Implications**: Follow `.cursor/rules/ts-testing-linting.mdc` for guidance.

### Information architecture

- **Decision**: Provide both **focused** (`/cv`) and **complete** (`/experience`) experience views, with STAR deep dives at `/experience/:slug`.
  - **Rationale**: `/cv` optimizes recruiter scanning; `/experience` is a complete reference; deep dives prove depth without cluttering lists.
  - **Implications**: Experience entries need `slug` + STAR-like fields; all summary views must link to canonical detail pages.
