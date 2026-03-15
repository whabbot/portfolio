# Clearcraft — Implementation Plan

> Strategic phases, sequencing rationale, and key architectural decisions.
> This is **not** a task-by-task breakdown — that comes next.

---

## Guiding principles for sequencing

1. **Skeleton first, content second.** Get the routing, layout shell, and design tokens in place before populating pages with real content.
2. **Static before dynamic.** Build with hard-coded placeholder content, then wire Sanity CMS once the page structures are proven.
3. **Depth on demand.** Ship list pages (`/cv`, `/projects`) before detail pages (`/experience/{slug}`, `/projects/{slug}`).
4. **Test the seams.** Focus testing on data-shaping logic and critical navigation paths, not trivial markup.
5. **Ship incrementally.** Each phase should produce a deployable, visually coherent state — no "big bang" integration.

---

## Phase 0 — Project bootstrap

**Goal**: a running Astro project with all tooling wired and a deployable blank shell.

- Initialise Astro with React integration.
- Configure Tailwind CSS with the project's design tokens (colours, type scale, spacing) including light and dark mode colour palettes.
- Set up shadcn/ui primitives (button, card, etc.).
- Configure Vitest (with `jsdom` and `@testing-library/jest-dom` matchers).
- Configure Playwright (basic smoke harness).
- Configure oxlint + Prettier (aligned with repo rules).
- Vercel project linked; deploys on push to `main`.
- Confirm a "hello world" page renders, lints, tests pass, and deploys.

**Key decision**: Tailwind config is the single source of truth for design tokens — no separate token file. Dark mode uses Tailwind's `class` strategy so the toggle and `prefers-color-scheme` can both control it.

---

## Phase 1 — Layout shell & navigation

**Goal**: site-wide layout with navbar, footer (if any), and route stubs for every page.

- Shared `BaseLayout.astro` (head, meta, slot, inline script to apply theme class before paint to prevent flash).
- Navbar component: name (left), CV + Projects links (right), light/dark toggle.
- Active-page indicator (persistent underline).
- Route stubs: `/`, `/cv`, `/projects` (return heading + placeholder).
- Route stubs for dynamic segments: `/experience/[slug]`, `/projects/[slug]`.
- Responsive behaviour: mobile nav approach decided and stubbed.
- Playwright smoke: navbar links navigate correctly; active state renders.

**Key decision**: Navbar is an Astro component (no client JS needed). Mobile nav toggle and theme toggle are pure Astro components with inline scripts — no React islands needed for simple DOM state toggles.

---

## Phase 2 — Design system & global styles

**Goal**: all visual primitives ready for page assembly.

- Typography: font loading (Inter or equivalent humanist sans), heading/body/mono scales.
- Colour system applied for both light and dark themes: primary, warm accent, creative accent, background, text. Tokens defined as CSS custom properties toggled by `.dark` class.
- Spacing: 8pt grid helpers, max-width container (~900px).
- Shared UI atoms: accent stripe, section heading, tag/pill, card surface.
- Motion defaults: transition duration/easing utility classes.
- Accessibility pass: focus-visible styles, contrast check on token combos (both themes).
- Unit tests for any utility functions (e.g., colour contrast helpers, theme persistence logic).

**Key decision**: shadcn/ui components are restyled via Tailwind config overrides, not forked copies — keeps upgrade path clean. Theme preference stored in `localStorage` and respected on first load via a blocking inline script (no flash of wrong theme).

---

## Phase 3 — Home page (`/`)

**Goal**: the most important page — narrative hero plus preview sections.

- Hero block: philosophy statement, primary + secondary CTAs.
- Gentle expressiveness: subtle asymmetry, accent shape, generous whitespace.
- Experience preview section: heading (links to `/cv`), impact bullets (link to detail pages).
- Projects preview section: heading (links to `/projects`), curated bullets (link to detail pages).
- Hover interactions: underline slide, accent tint (200–250ms ease-in-out).
- All content hard-coded initially (placeholder or real).
- Playwright smoke: hero renders, CTAs navigate, hover states don't break layout.

---

## Phase 4 — Privacy-first restructure (remove CV/experience)

**Goal**: pivot the site to minimize PII and make personal projects the primary depth surface.

### Home (`/`) content updates

- Replace the “View CV” CTA with a **LinkedIn** CTA (new tab) as the destination for full work history + messaging.
- Replace “Experience preview” with a brief **Background** section (generalized employer type + title + years + short scope/impact).
- Add **Awards** and **Interests** as tight lists.
- Add a LinkedIn callout line: “For full work history and messaging, see LinkedIn →”.

### Routes and navigation cleanup

- Remove `/cv` and `/experience/{slug}` routes from public navigation and code.
- Update Playwright coverage to remove `/cv` and `/experience` path assertions.

---

## Phase 5 — Projects pages

**Goal**: personal projects grid + detail template.

### `/projects`

- Grid layout: title, short description, GitHub link, tech tags.
- Hover: subtle lift, accent highlight, "See decisions →" microcopy.
- Each tile links to `/projects/{project}`.

### `/projects/{project}` (detail template)

- Sections: Problem, Why It Mattered, Constraints, Architecture Decisions, Trade-offs, Outcomes, What I'd Improve.
- Repeatable structure enforced by a shared Astro component/layout.
- Optional slots for diagrams and code snippets.
- Hard-coded content for at least one project to validate the template.

---

## Phase 6 — Sanity CMS integration (optional, later)

**Goal**: site content sourced from Sanity; studio ready for editing.

- Define Sanity schemas for:
  - Personal projects (deep-dive content)
  - Background items (brief role summaries; generalized employer type; no deep-dive pages)
  - Optional: awards and interests (either as simple documents or fields on a singleton “site settings” doc)
- Set up Sanity client in Astro (build-time fetching).
- Data-shaping TS helpers with unit tests (transform raw Sanity responses → page props).
- Migrate hard-coded content into Sanity.
- Sanity Studio hosted on Sanity (no self-hosted studio route).
- Verify pages render identically from CMS content.

---

## Phase 7 — Polish, accessibility & performance

**Goal**: production-ready quality bar.

- Full accessibility audit: semantic headings, landmark roles, ARIA labels, keyboard navigation through grids and cards.
- WCAG AA contrast verification on every token combination in both light and dark themes.
- Lighthouse performance pass: image optimisation, font subsetting, minimal JS bundle.
- Responsive QA: mobile, tablet, desktop breakpoints.
- Motion: confirm all transitions feel "intelligent and restrained."
- Content review: ensure no unnecessary PII; trim any section that doesn't reinforce the 4 core-identity signals.
- Playwright integration tests for key user journeys (home → project detail, home → LinkedIn).

**Key decision**: fetch at build time (SSG) by default. Only add ISR/on-demand revalidation if content update latency becomes a real pain point.

---

## Phase 8 — Launch

**Goal**: live, verified, and ready for sharing.

- Final Vercel production deploy.
- Enable **Vercel Web Analytics** and **Vercel Speed Insights**; verify data is flowing in the Vercel dashboard after deploy.
- OG / social meta tags and preview images.
- 404 page (clean, on-brand).
- Sitemap and basic SEO meta.
- Manual smoke test across browsers (Chrome, Safari, Firefox).
- Remove any remaining placeholder content or TODOs.

---

## Cross-cutting concerns (every phase)

- **Testing**: logic and data-shaping helpers get unit tests; navigation and key flows get Playwright smoke tests. No trivial UI tests.
- **Linting**: oxlint + Prettier pass on every commit.
- **Docs**: update planning docs when a decision changes scope or direction.
- **Deploys**: every merged PR should produce a working preview deploy.

---

## Dependency graph (simplified)

```
Phase 0  →  Phase 1  →  Phase 2  →  Phase 3  →  Phase 4  →  Phase 5  →  Phase 6  →  Phase 7  →  Phase 8
```

---

## Risks & mitigations

| Risk                                                         | Mitigation                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------- |
| Over-engineering CMS schemas before page structure is stable | Hard-code content first (Phases 3–5); CMS is Phase 6                |
| Design drift across pages                                    | Lock tokens in Phase 2; reuse shared components                     |
| Scope creep on detail pages                                  | Enforce repeatable section templates; defer "nice to have" sections |
| Slow builds from large Sanity dataset                        | Unlikely at portfolio scale; monitor and add ISR only if needed     |
