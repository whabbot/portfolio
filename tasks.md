# Clearcraft — Tasks

> Ordered, actionable steps for an LLM agent to build the project.
> Each task is small enough to complete in one pass.
> Phases follow the implementation plan; tasks within a phase are sequential unless noted.

---

## Phase 0 — Project bootstrap

### 0.1 Scaffold Astro project ✅

- ~~Run `npm create astro@latest` in the repo root (use the "empty" template, strict TypeScript).~~
- ~~Add the React integration: `npx astro add react`.~~
- ~~Add Tailwind CSS v4 integration: `npx astro add tailwind`.~~
- ~~Verify the dev server starts (`npm run dev`) and a blank page renders.~~

> Completed: Astro 5.17, React 19, Tailwind CSS v4.1 scaffolded in `site/` subdirectory. Dev server and production build verified.

### 0.2 Configure design tokens in Tailwind / CSS ✅

- ~~Create a global CSS file (e.g. `src/styles/global.css`) imported in the base layout.~~
- ~~Define CSS custom properties on `:root` (light) and `.dark` (dark) for every colour token from the design guidelines (`--color-bg`, `--color-bg-surface`, `--color-text`, `--color-text-muted`, `--color-primary`, `--color-accent-warm`, `--color-accent-creative`, `--color-border`).~~
- ~~Extend the Tailwind theme to map these tokens to utility classes (e.g. `bg-surface`, `text-primary`, `text-muted`, `border-default`, `accent-warm`, `accent-creative`).~~
- ~~Configure dark mode to use the `class` strategy (`.dark` on `<html>`).~~
- ~~Set up the typography scale: Inter (via Google Fonts or `@fontsource/inter`) for body, JetBrains Mono for code. Define the font-size / weight scale from the design guidelines (H1 through small/caption).~~
- ~~Set base spacing to the 8pt grid (`0.5rem` increments).~~
- ~~Verify: both themes render correct colours via a temporary test page.~~

> Completed: Tokens in `site/src/styles/global.css` with `@theme inline` for Tailwind v4. Inter Variable + JetBrains Mono Variable via `@fontsource-variable`. Dark mode via `@custom-variant dark`. Theme test page at `/theme-test`.

### 0.3 Set up shadcn/ui ✅

- ~~Initialise shadcn/ui for Astro + React + Tailwind (`npx shadcn@latest init`).~~
- ~~Add initial primitives: `button`, `card`.~~
- ~~Confirm components render correctly with the custom theme tokens.~~

> Completed: shadcn/ui (new-york style, Tailwind v4) initialised with `button` and `card` primitives. shadcn CSS variables mapped to existing design tokens in `global.css`. Theme test page updated with shadcn component demos. `text-muted` → `text-muted-foreground` convention adopted (shadcn standard). Path aliases (`@/*`) added to `tsconfig.json`.

### 0.4 Configure Vitest ✅

- ~~Install `vitest`, `@testing-library/jest-dom`, `jsdom`.~~
- ~~Create `vitest.config.ts` (environment: `jsdom`, include `src/**/*.test.{ts,tsx}`).~~
- ~~Add a trivial passing test to confirm the harness works.~~
- ~~Add `test` script to `package.json`.~~

> Completed: Vitest 4.0.18 with jsdom environment and `@testing-library/jest-dom/vitest` matchers. Path alias `@/*` configured. Setup file at `src/test/setup.ts`. Trivial `cn()` utility tests passing (3 tests). Scripts: `test` (single run), `test:watch` (watch mode).
>
> **Update**: Removed `@testing-library/react` and `@testing-library/user-event`. No components in this project require React rendering in tests — all interactive behavior (theme toggle, mobile nav) is implemented as pure Astro components with inline scripts, tested via plain DOM APIs in jsdom. React remains a build-time dependency for shadcn/ui but ships zero client JS.

### 0.5 Configure Playwright ✅

- ~~Install Playwright: `npm init playwright@latest`.~~
- ~~Create a minimal config (`playwright.config.ts`) pointing at the local dev server.~~
- ~~Add a smoke test that loads `/` and asserts a 200 status.~~
- ~~Add `test:e2e` script to `package.json`.~~

> Completed: Playwright 1.58.2 with Chromium. Config in `playwright.config.ts` points at Astro dev server (localhost:4321) with `webServer` auto-start. Smoke test in `e2e/smoke.spec.ts` asserts 200 status and heading. Script: `test:e2e`.

### 0.6 Configure oxlint + Prettier ✅

- ~~Install `oxlint` and `prettier`.~~
- ~~Create `.prettierrc` (consistent with repo conventions — e.g., single quotes, trailing commas, 2-space indent).~~
- ~~Create `oxlint` config (or use default sensible rules).~~
- ~~Add `lint` and `format` scripts to `package.json`.~~
- ~~Run lint + format on all existing files; fix any issues.~~

> Completed: oxlint + Prettier + prettier-plugin-astro installed. `.prettierrc` configured (single quotes, trailing commas, 2-space indent, Astro parser). `.oxlintrc.json` with `correctness` (error), `suspicious` + `perf` (warn), plus `react` and `jsx-a11y` plugins. Scripts: `lint`, `format`, `format:check`. One lint fix applied (constant binary expression in test). All files formatted and passing.

### 0.7 Validate bootstrap ✅

- ~~Run `npm run build`, `npm run test`, `npm run lint` — all must pass.~~
- ~~Confirm the project deploys to Vercel (or at least builds successfully for deployment).~~

> Completed: All three commands pass with zero errors. Tuned `.oxlintrc.json` to disable overly pedantic rules (`sort-keys`, `sort-imports`, `no-ternary`, `no-magic-numbers`, `no-implicit-coercion`, `func-style`, `react/jsx-props-no-spreading`). Prettier format check clean. Playwright e2e tests pass. Static build output in `dist/` is Vercel-ready.

---

## Phase 1 — Layout shell & navigation

### 1.1 Create BaseLayout.astro ✅

- ~~Create `src/layouts/BaseLayout.astro`.~~
- ~~Include `<html>`, `<head>` (with charset, viewport, font links, global CSS import), and `<body>` with a `<slot />`.~~
- ~~Add a blocking inline `<script>` in `<head>` that reads `localStorage` for the theme preference (or falls back to `prefers-color-scheme`) and applies/removes the `.dark` class on `<html>` before first paint.~~
- ~~Add smooth theme-transition CSS (`transition: color 200ms, background-color 200ms` on `*`).~~

> Completed: Layout at `src/layouts/BaseLayout.astro` with `title` prop (default "Clearcraft"), blocking `is:inline` theme script, and `no-transitions` class to suppress FODT on initial load (removed via `requestAnimationFrame` after theme applies). Theme-transition CSS was already in `global.css`. Refactored `index.astro` and `theme-test.astro` to use the shared layout.

### 1.2 Build the Navbar component ✅

- ~~Create `src/components/Navbar.astro`.~~
- ~~**Left**: site owner name, links to `/`.~~
- ~~**Right**: "CV" link (`/cv`), "Projects" link (`/projects`), theme toggle placeholder.~~
- ~~Active page detection: use `Astro.url.pathname` to apply a persistent accent underline on the current page's link.~~
- ~~Style: sticky top, subtle bottom border. Typography per design guidelines (name 18px/500, links 14px/500).~~
- ~~Hover: underline slides in (200ms ease-in-out).~~
- ~~Keyboard: all links focusable with visible 2px accent outline.~~
- ~~Semantic HTML: `<header>`, `<nav>`, `aria-current="page"` on active link.~~

> Completed: `src/components/Navbar.astro` with sticky header, backdrop blur, active page detection via `Astro.url.pathname`, pseudo-element underline slide animation, and placeholder slots for ThemeToggle (1.3) and MobileNav (1.4). Wired into `BaseLayout.astro`.

### 1.3 Build the ThemeToggle component ✅

- ~~Create `src/components/ThemeToggle.astro` (Astro component, not React — no state needed).~~
- ~~Renders sun/moon icon button (inline Lucide SVGs, CSS `dark:hidden`/`hidden dark:block` for zero-flash swap).~~
- ~~On click: toggles `.dark` class on `<html>`, persists preference to `localStorage` via inline `<script>`.~~
- ~~ARIA: `aria-label="Toggle theme"`.~~
- ~~Write a unit test: toggling updates `document.documentElement.classList` and `localStorage`.~~

> Completed: Pure Astro component with inline SVGs and `is:inline` script. No React island — CSS handles icon swap based on `.dark` class set by BaseLayout's blocking script, so no pop-in on load. Vitest DOM-level tests (4 tests) cover toggle logic. Eliminated the ThemeToggle JS island from the client bundle entirely.

### 1.4 Build the MobileNav component ✅

- ~~Create `src/components/MobileNav.astro` (Astro component, not React — toggle state is a simple class/attribute swap).~~
- ~~Hamburger button (hidden on desktop, visible below 640px).~~
- ~~Opens an overlay or slide-in with the same links (CV, Projects) + a second theme toggle button.~~
- ~~Close on link click or close button.~~
- ~~ARIA: `aria-expanded`, `aria-controls`, `aria-label`.~~
- ~~Inline `<script>` for toggle logic.~~
- ~~Write a unit test: toggle open/close state, correct ARIA attributes.~~

> Completed: `src/components/MobileNav.astro` wired into `Navbar.astro` (replacing the placeholder slot). Uses a small client initializer (`src/lib/client/mobile-nav.ts`) to toggle `hidden` + `aria-expanded`, closes on link click and on close/backdrop click. Added Vitest unit tests. Refactored `ThemeToggle.astro` to support multiple instances via `data-theme-toggle` + initializer (`src/lib/client/theme.ts`), with updated tests.
>
> Update: Switched MobileNav to a shadcn/Radix-style React `Sheet` for better UX/accessibility (focus handling, ESC/outside click, scroll lock) and less custom logic. Implemented `site/src/components/MobileNav.tsx` + `site/src/components/ui/sheet.tsx` (Radix Dialog wrapper) + `site/src/components/ThemeToggleButton.tsx`, and hydrated only on mobile via `client:media="(max-width: 639px)"`. Removed the Astro/vanilla MobileNav implementation and replaced its unit test with `MobileNav.test.tsx`.

### 1.5 Build the Footer component ✅

- ~~Create `src/components/Footer.astro`.~~
- ~~Minimal: small copyright line or a single external link (e.g., GitHub profile).~~
- ~~Semantic HTML: `<footer>`.~~

> Completed: `src/components/Footer.astro` with GitHub, Medium, and LinkedIn links (right-aligned on desktop, left-aligned on mobile). Wired into `BaseLayout.astro` with flex layout so footer stays at bottom. Added semantic `<main>` wrapper for slot content.

### 1.6 Wire layout + create route stubs ✅

- ~~Wrap BaseLayout with Navbar (top) and Footer (bottom).~~
- ~~Create route stub pages (each uses BaseLayout, renders a heading + placeholder text):~~
  - ~~`src/pages/index.astro` → Home~~
  - ~~`src/pages/cv.astro` → CV~~
  - ~~`src/pages/projects/index.astro` → Projects~~
  - ~~`src/pages/projects/[slug].astro` → Project detail (placeholder, `getStaticPaths` returns one dummy entry)~~
  - ~~`src/pages/experience/[slug].astro` → Experience detail (placeholder, `getStaticPaths` returns one dummy entry)~~
- ~~Verify: all routes render, navbar links work, active state displays.~~

> Completed: Layout already wired in BaseLayout.astro. Created cv.astro, projects/index.astro, projects/[slug].astro, experience/[slug].astro. Fixed index.astro nested `<main>` → `<div>`. Build generates all 6 pages; lint passes.

### 1.7 Build the 404 page ✅

- ~~Create `src/pages/404.astro`.~~
- ~~Uses BaseLayout (same navbar + theme).~~
- ~~Brief message: "This page doesn't exist."~~
- ~~Single CTA: "Back to home →" linking to `/`.~~
- ~~Clean, on-brand, no clutter.~~

> Completed: `src/pages/404.astro` with BaseLayout, H1 "Page not found", message, and primary-styled CTA link. Focus-visible styles for accessibility. Build outputs `/404.html`.

### 1.8 Playwright smoke tests for navigation ✅

- ~~Test: navbar links navigate to `/`, `/cv`, `/projects`.~~
- ~~Test: active page link has the accent underline class.~~
- ~~Test: theme toggle switches between light and dark (check `.dark` class on `<html>`).~~
- ~~Test: navigating to non-existent page shows 404.~~

> Completed: `e2e/navigation.spec.ts` with 4 tests. Active-state test covers CV and Projects only (home link is branding, not nav). All 15 e2e tests pass across chromium, firefox, webkit.

---

## Phase 2 — Design system & global styles ✅

### 2.1 Shared UI atoms ✅

- ~~**AccentStripe**: a thin vertical left-border accent bar component. Accepts a `variant` prop (`warm` | `creative`) for colour.~~
- ~~**SectionHeading**: an H2 heading component with consistent styling. Optional link prop (heading becomes a link).~~
- ~~**TagPill**: small rounded pill for tech tags. Muted background, small text, monospace font.~~
- ~~**CardSurface**: a generic elevated surface (bg-surface, subtle border, optional hover lift).~~

> Completed: `AccentStripe.astro`, `SectionHeading.astro`, `TagPill.astro`, `CardSurface.astro` in `site/src/components/`. Theme-test page updated with demos.

### 2.2 Motion utility classes ✅

- ~~Define reusable transition classes: `transition-lift` (translateY + shadow), `transition-underline` (width 0→100%), `transition-theme` (color + background-color 200ms).~~
- ~~Apply globally where specified in design guidelines.~~

> Completed: `@utility` directives in `global.css` for `transition-lift`, `transition-underline`, `transition-theme`. Theme transition already on `*` in base layer.

### 2.3 Focus & accessibility styles ✅

- ~~Global `focus-visible` style: 2px primary-coloured outline with offset on all interactive elements.~~

> Completed: Added to `@layer base` in `global.css` for `a`, `button`, `input`, `select`, `textarea`, and `[tabindex]` elements.

---

## Phase 3 — Home page (`/`)

### 3.1 Build the Hero section ✅

- ~~Create `src/components/home/Hero.astro`.~~
- ~~2–3 line narrative philosophy statement (hard-coded placeholder).~~
- ~~Primary CTA: "View CV →" button linking to `/cv`.~~
- ~~Secondary CTA: "Explore Projects →" button linking to `/projects`.~~
- ~~Layout: generous whitespace, subtle asymmetry (e.g., off-centre text or a faint accent shape).~~
- ~~Typography: H1 for the statement, buttons styled per design guidelines.~~

> Completed: `Hero.astro` in `site/src/components/home/`. Philosophy statement, primary/secondary CTAs using shadcn Button, subtle asymmetry (off-centre text + faint accent blob). Playwright hero specs in `e2e/hero.spec.ts`.

### 3.2 Build the ExperiencePreview section ✅

- ~~Create `src/components/home/ExperiencePreview.astro`.~~
- ~~Section heading: "Experience" — links to `/cv`.~~
- ~~3–5 impact bullet items (hard-coded placeholder data).~~
- ~~Each bullet links to `/experience/{slug}`.~~
- ~~Uses warm accent for any accent indicators.~~

> Completed: `ExperiencePreview.astro` with 4 impact bullets, warm accent stripe and underline, SectionHeading link to `/cv`. Experience slugs added to `experience/[slug].astro`.

### 3.3 Build the ProjectsPreview section ✅

- ~~Create `src/components/home/ProjectsPreview.astro`.~~
- ~~Section heading: "Projects" — links to `/projects`.~~
- ~~3–5 project bullet items (hard-coded placeholder data).~~
- ~~Each bullet links to `/projects/{slug}`.~~
- ~~Uses creative accent for any accent indicators.~~

> Completed: `ProjectsPreview.astro` with 5 project bullets, creative accent underline, SectionHeading link to `/projects`. Project slugs added to `projects/[slug].astro`.

### 3.4 Assemble the Home page ✅

- ~~In `src/pages/index.astro`, replace placeholder with Hero → ExperiencePreview → ProjectsPreview.~~
- ~~Verify vertical rhythm: generous spacing between sections.~~
- ~~Hover interactions: underline slide on links (200–250ms ease-in-out).~~

> Completed: Home page now renders `Hero` → `ExperiencePreview` → `ProjectsPreview`. Preview hover underline + accent styles are shared via the preview-section pattern CSS.

### 3.5 Playwright smoke tests for home page

- ~~Test: hero renders with philosophy statement and both CTAs.~~
- ~~Test: "View CV →" navigates to `/cv`.~~
- ~~Test: "Explore Projects →" navigates to `/projects`.~~
- ~~Test: experience and project bullet links navigate to correct detail routes.~~

> Completed: Extended Playwright home hero tests to include Experience/Projects preview bullet navigation to `/experience/{slug}` and `/projects/{slug}`.

---

## Phase 4 — Privacy-first restructure (remove CV/experience)

> **Update (privacy-first direction)**: earlier phases created `/cv` and `/experience/...` stubs and tests. This phase replaces that plan: we remove those routes and instead keep a brief, generalized background section on `/`, with LinkedIn as the destination for full work history and messaging.

### 4.1 Update home hero CTAs (Projects-first + LinkedIn)

- ~~Update `Hero` so the **primary CTA** goes to `/projects`.~~
- ~~Replace the CV CTA with a **LinkedIn** CTA (external, opens in new tab, labelled for accessibility).~~
- ~~Update Playwright hero tests accordingly.~~

> Completed: Hero primary CTA is now Projects, secondary CTA is LinkedIn (new tab + a11y label). Updated Playwright hero + smoke tests.

### 4.2 Replace Experience preview with Background / Awards / Interests (home)

- ~~Remove the home `ExperiencePreview` section.~~
- ~~Add a **Background** section with 3–5 bullets:~~
  - generalized employer type + job title + years + brief scope/impact (privacy-first).
- ~~Add **Awards** and **Interests** brief lists (tight format, minimal identifiability).~~
- ~~Add a LinkedIn callout line: “For full work history and messaging, see LinkedIn →”.~~

> Completed: Replaced home experience preview with a privacy-first Background section plus Awards/Interests and a LinkedIn callout. Updated Playwright coverage accordingly.

### 4.3 Remove `/cv` and `/experience/[slug]` routes

- ~~Remove the navbar “CV” link and mobile nav entry.~~
- ~~Remove (or redirect) `src/pages/cv.astro`.~~
- ~~Remove `src/pages/experience/[slug].astro`.~~
- ~~Update navigation Playwright tests to stop asserting `/cv` and `/experience` behaviour.~~

> Completed: Removed CV from desktop + mobile nav, deleted the `/cv` and `/experience/[slug]` pages, and updated Playwright navigation coverage. Verified via format/lint, unit tests, and e2e suite.

---

## Phase 5 — Projects pages

### 5.1 Build the ProjectTile component

- ~~Create `src/components/projects/ProjectTile.astro`.~~
- ~~Displays: title, short description, tech tags (TagPill), GitHub icon link.~~
- ~~Entire tile clickable → `/projects/{slug}`.~~
- ~~Hover: subtle lift (`translateY(-2px)`), soft accent highlight (creative), "See decisions →" microcopy fades in.~~
- ~~GitHub icon: opens in new tab, `aria-label="View source on GitHub"`.~~

> Completed: Added `ProjectTile.astro` using an overlay link for whole-card clicks, plus a separate GitHub icon link with correct a11y and hover/focus motion. Added a small Vitest render test using AstroContainer (`ProjectTile.test.ts`) to lock in the key link/ARIA attributes. Verified via lint/format + unit tests.

### 5.2 Build the Projects grid page

- ~~In `src/pages/projects/index.astro`, create a responsive grid of ProjectTile components.~~
- ~~Grid layout: single column on mobile, 2 columns on tablet+.~~
- ~~Hard-coded placeholder data for 3–4 projects.~~

> Completed: Added a shared placeholder projects data module and replaced the `/projects` placeholder copy with a semantic `ProjectTile` grid that is one column on mobile and two columns from `md` up. Verified with lint, format check, and the Vitest suite including a new page-level projects grid test.

### 5.3 Build the ProjectDetail layout

- ~~Create `src/components/projects/ProjectDetail.astro`.~~
- ~~Repeatable section template: Problem, Why It Mattered, Constraints, Architecture Decisions, Trade-offs, Outcomes, What I'd Improve.~~
- ~~Each section uses SectionHeading + body content.~~
- ~~Left accent stripe (creative) on key sections.~~
- ~~Optional slots for diagrams, code snippets, live demo link, GitHub link.~~

> Completed: Added a reusable `ProjectDetail.astro` hybrid layout with repeatable case-study sections, conditional rich-content slots/actions, and accent support for key sections. Verified with lint, format check, the full Vitest suite, and a focused `ProjectDetail` component test covering both rich and minimal optional-content states.

### 5.4 Build a sample project detail page

- ~~In `src/pages/projects/[slug].astro`, implement `getStaticPaths` returning at least one hard-coded project.~~
- ~~Populate with realistic placeholder content.~~
- ~~Verify all sections render in both themes.~~

> Completed: Replaced the project-detail stub with a shared-data-driven `ProjectDetail` page, including one fully authored sample case study plus graceful fallback content for the other current project slugs. Verified with lint, format check, the full Vitest suite, a focused `[slug]` page test, and a Playwright runtime check confirming the sample page sections render in both light and dark themes.

### 5.5 Playwright tests for projects flow

- ~~Test: `/projects` renders a grid of project tiles.~~
- ~~Test: clicking a tile navigates to `/projects/{slug}`.~~
- ~~Test: project detail page renders all expected sections.~~
- ~~Test: GitHub icon link opens in new tab.~~

> Completed: Added a Playwright projects flow suite covering the `/projects` grid, tile click-through to `/projects/{slug}`, expected detail-page section headings, and verifying the GitHub icon link opens in a new tab. Verified with `npm run test:e2e`.

---

## Phase 6 — Sanity CMS integration

### 6.1 Set up Sanity project

NOTE: IMPORTANT: confirm with user before progressing! We want to use a referral here.

- ~~Create a new Sanity project (`npm create sanity@latest` or via `sanity init`) in a `studio/` subdirectory (or a separate repo — decide and document).~~
- ~~Configure the Sanity Studio with the project ID and dataset.~~
- ~~Studio is hosted by Sanity (no self-hosted route in the Astro app).~~

> Completed: Sanity Studio initialized under `sanity/` (not `studio/`) with `projectId` + `dataset` configured in `sanity.config.ts`/`sanity.cli.ts`. Verified Studio build via `cd sanity && npm run build`.

### 6.2 Define Background (brief experience) schema

- ~~Create a Sanity document type for brief background items (no deep-dive pages):~~
  - ~~`employerType` (string, generalized), `jobTitle` (string), `startDate` (date), `endDate` (date, optional), `timelineLabel` (string, optional), `summary` (text), `bullets` (array of strings), `sortOrder` (number).~~

> Completed: Added `background` schema in `sanity/schemaTypes/background.ts` with structured dates (`startDate`/`endDate`) + optional `timelineLabel`, validation, preview, and ordering. Registered in `sanity/schemaTypes/index.ts`. Verified Studio build via `cd sanity && env -u NO_COLOR npm run build`.

### 6.3 Define Project schema

- ~~Create a Sanity document type for `project` with all fields:~~
  - ~~`title` (string), `slug` (slug), `description` (string), `techTags` (array of strings), `githubUrl` (url), `demoUrl` (url), `sortOrder` (number), `problem` (block content), `whyItMattered` (block content), `constraints` (block content), `architectureDecisions` (block content), `tradeoffs` (block content), `outcomes` (block content), `improve` (block content), `featured` (boolean).~~

> Completed: Added `project` schema in `sanity/schemaTypes/project.ts` with validation, preview, and ordering. Registered in `sanity/schemaTypes/index.ts`. Verified Studio build via `cd sanity && env -u NO_COLOR npm run build`.

### 6.4 Set up Sanity client in Astro

- ~~Install `@sanity/client` and `@portabletext/react` (for rendering block content).~~
- ~~Create a Sanity client helper (`src/lib/sanity.ts`) configured with project ID, dataset, API version, and `useCdn: true`.~~
- ~~Create GROQ query helpers for:~~
  - ~~All background items (sorted by `sortOrder`).~~
  - ~~Featured personal projects (sorted by `sortOrder`).~~
  - ~~Single project by slug.~~
  - ~~All projects (for `getStaticPaths`).~~

> Note: Treat `src/lib/sanity.ts` as server-only (only import from `.astro`/server code). If we ever need client-side Sanity calls, split into `sanity.server.ts` + `sanity.public.ts` and use `PUBLIC_` env vars for the latter.
>
> Note: This setup targets published content via CDN. Preview/visual editing later should add a second client (`useCdn: false` + token + drafts perspective) without changing the content model.
>
> Decisions: `docs/decisions/2026-03-15-sanity-client-in-astro.md`

> Completed: Installed `@sanity/client` + `@portabletext/react`. Added `site/src/lib/sanity.ts` (env config + client getter + GROQ query helpers) and unit tests in `site/src/lib/sanity.test.ts`. Verified with `cd site && env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test && env -u NO_COLOR npm run build`.

### 6.5 Data-shaping helpers + unit tests

- Create TypeScript helpers (`src/lib/mappers.ts` or similar) that normalize Sanity responses into strongly-typed page props (defaults for optional fields, consistent null/empty handling, derived display fields).
- Prefer shaping in GROQ (projections, filtering, ordering) so mappers stay small and predictable.
- Write unit tests (Vitest) for each normalizer:
  - Missing optional fields handled gracefully (e.g. `demoUrl`, `githubUrl`, `endDate`).
  - Slugs are present/handled correctly (consume `slug.current`; do not “generate” slugs in the frontend).
  - Derived display fields (if any) are stable.

### 6.6 Wire pages to Sanity data

- ~~Replace hard-coded content on every page with Sanity-fetched data:~~
  - ~~Home: background section + selected/featured personal projects (and optional awards/interests).~~
  - ~~`/projects` grid: all projects.~~
  - ~~`/projects/[slug]`: single project document.~~
- ~~Update `getStaticPaths` on dynamic routes to query Sanity for all slugs.~~

> Completed: Home (`index.astro`) loads background + featured projects via `fetchBackgroundItems` / `fetchFeaturedProjects` and mappers; `HomeBackground` / `ProjectsPreview` take props (awards/interests stay default props until a CMS shape exists). `/projects` uses `fetchAllProjects` + `normalizeProjectCards`. `/projects/[slug]` uses async `getStaticPaths` from `fetchAllProjectSlugs`, `fetchProjectBySlug`, and `normalizeProjectDetailPage` with GROQ `pt::text(...)` for case-study bodies. Added `fetchAllProjects`, moved page-level Vitest files out of `src/pages/` to `src/test/pages/` (Astro treats `.ts` under `pages/` as routes). Removed unused `src/data/projects.ts` and `src/data/projectDetails.ts` (seed in git history for task 6.7). Verified: `cd site && env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test && env -u NO_COLOR npm run lint && env -u NO_COLOR npm run build`.

### 6.7 Migrate placeholder content to Sanity

- ~~Enter the hard-coded placeholder content (or real content) into Sanity Studio.~~
- ~~Verify all pages render identically from CMS data as they did with hard-coded data.~~

> Completed: Placeholder (or production) content entered in Sanity Studio; pages match the prior hard-coded baseline (parity check complete).

### 6.8 Portable Text renderer

- Create a shared `PortableText` component that renders Sanity block content with appropriate styling (headings, paragraphs, lists, code blocks, links).
- Ensure the renderer respects the design guidelines typography and spacing.

---

## Phase 7 — Polish, accessibility & performance

### 7.1 Accessibility audit

- Verify semantic HTML on every page: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Confirm heading levels are in order (no skipped levels).
- Add landmark roles for screen readers.
- ARIA labels on all icon-only buttons (theme toggle, mobile menu, GitHub links).
- `aria-current="page"` on active nav link (should already be done — verify).

### 7.2 Keyboard navigation pass

- Tab through every page: all interactive elements reachable.
- Focus states visible (2px accent outline) on every interactive element.
- Card grids navigable with arrow keys where appropriate.

### 7.3 WCAG AA contrast verification

- Check every text/background combination in both themes.
- Fix any failing pairs (adjust token values if needed, update design-guidelines.md with the change).

### 7.4 Responsive QA

- Test all pages at mobile (< 640px), tablet (640–1024px), and desktop (> 1024px).
- Verify: single-column mobile layout, collapsible nav, 2-col project grid on tablet, full layout on desktop.
- Fix any layout breaks or overflow issues.

### 7.5 Performance pass

- Run Lighthouse audit.
- Optimise font loading: subset Inter, preload critical font files.
- Ensure minimal JS bundle (no React islands — ThemeToggle and MobileNav are pure Astro with inline scripts).
- Verify no layout shift (CLS): reserve space for dynamic content.
- Image optimisation (if any images are added): use Astro's `<Image>` component.

### 7.6 Motion review

- Verify all transitions: 200–250ms, ease-in-out.
- Hover lift on cards/tiles: `translateY(-2px)` + subtle shadow.
- Underline expand on nav links.
- Theme transition is smooth (no flash, no jarring repaints).
- No parallax, no scroll-jacking, no heavy entrance animations.

### 7.7 Content review

- Trim any placeholder text that was not replaced.
- Ensure every section reinforces one of the 4 core-identity signals.
- Remove any unused code, dead files, or untracked TODOs.

### 7.8 Playwright integration tests for key journeys

- Path A: `/` → "Explore Projects" → `/projects` → click tile → `/projects/{slug}`.
- Path B: `/` → click LinkedIn CTA → verify it opens LinkedIn in new tab.
- Verify theme toggle persists across navigation.

---

## Phase 8 — Launch

### 8.1 SEO & social meta

- Add OG meta tags to BaseLayout (title, description, image, url).
- Add Twitter card meta tags.
- Create or source an OG preview image.
- Add `<title>` and `<meta name="description">` per page (passed as props to BaseLayout).

### 8.2 Sitemap

- Add `@astrojs/sitemap` integration.
- Configure `site` in `astro.config.mjs`.
- Verify sitemap generates correctly at `/sitemap-index.xml`.

### 8.3 Add Vercel Web Analytics

- Enable **Web Analytics** for the project in the Vercel dashboard (adds routes under `/_vercel/insights/*` after the next deploy).
- Install the package in `site/`: `npm i @vercel/analytics`.
- Add the `Analytics` component to the base layout head:
  - In `site/src/layouts/BaseLayout.astro`, add:
    - `import Analytics from '@vercel/analytics/astro';`
    - `<Analytics />` inside `<head>` (per Vercel docs).
- Deploy and verify:
  - Confirm the tracking script is present and requests are being made (Network tab / `/_vercel/insights/*`).
  - Confirm data appears in Vercel → Analytics after some traffic.

### 8.4 Add Vercel Speed Insights

- Enable **Speed Insights** for the project in the Vercel dashboard (adds routes under `/_vercel/speed-insights/*` after the next deploy).
- Install the package in `site/`: `npm i @vercel/speed-insights`.
- Add the `SpeedInsights` component to the base layout head:
  - In `site/src/layouts/BaseLayout.astro`, add:
    - `import SpeedInsights from '@vercel/speed-insights/astro';`
    - `<SpeedInsights />` near the bottom of `<head>` (per Vercel docs).
- Deploy and verify:
  - Confirm the script is present in `<head>` and requests hit `/_vercel/speed-insights/*`.
  - Confirm metrics appear in Vercel → Speed Insights after some traffic.

### 8.5 Final cleanup

- Remove any remaining placeholder content or TODO comments.
- Run full lint + format pass (`npm run lint && npm run format`).
- Run full test suite (`npm run test && npm run test:e2e`).
- Verify build succeeds (`npm run build`).

### 8.6 Production deploy

- Push to `main`; verify Vercel deployment succeeds.
- Manual smoke test in production across Chrome, Safari, Firefox.
- Verify: all pages load, navigation works, theme toggle works, no console errors.
- Confirm OG previews render correctly (use a social media debugger tool).
