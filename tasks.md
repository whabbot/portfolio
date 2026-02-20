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

### 0.4 Configure Vitest + React Testing Library ✅

- ~~Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.~~
- ~~Create `vitest.config.ts` (environment: `jsdom`, include `src/**/*.test.{ts,tsx}`).~~
- ~~Add a trivial passing test to confirm the harness works.~~
- ~~Add `test` script to `package.json`.~~

> Completed: Vitest 4.0.18 with jsdom environment, `@testing-library/react`, and `@testing-library/jest-dom/vitest` setup. Path alias `@/*` configured. Setup file at `src/test/setup.ts`. Trivial `cn()` utility tests passing (3 tests). Scripts: `test` (single run), `test:watch` (watch mode).

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

### 1.3 Build the ThemeToggle React island

- Create `src/components/ThemeToggle.tsx`.
- Renders a sun/moon icon button (use Lucide icons: `Sun`, `Moon`).
- On click: toggles `.dark` class on `<html>`, persists preference to `localStorage`.
- ARIA: `aria-label="Toggle theme"`.
- Write a unit test: toggling updates `document.documentElement.classList` and `localStorage`.

### 1.4 Build the MobileNav React island

- Create `src/components/MobileNav.tsx`.
- Hamburger button (hidden on desktop, visible below 640px).
- Opens an overlay or slide-in with the same links (CV, Projects) + ThemeToggle.
- Close on link click or close button.
- ARIA: `aria-expanded`, `aria-controls`, `aria-label`.
- Write a unit test: toggle open/close state, correct ARIA attributes.

### 1.5 Build the Footer component

- Create `src/components/Footer.astro`.
- Minimal: small copyright line or a single external link (e.g., GitHub profile).
- Semantic HTML: `<footer>`.

### 1.6 Wire layout + create route stubs

- Wrap BaseLayout with Navbar (top) and Footer (bottom).
- Create route stub pages (each uses BaseLayout, renders a heading + placeholder text):
  - `src/pages/index.astro` → Home
  - `src/pages/cv.astro` → CV
  - `src/pages/projects/index.astro` → Projects
  - `src/pages/projects/[slug].astro` → Project detail (placeholder, `getStaticPaths` returns one dummy entry)
  - `src/pages/experience/[slug].astro` → Experience detail (placeholder, `getStaticPaths` returns one dummy entry)
- Verify: all routes render, navbar links work, active state displays.

### 1.7 Playwright smoke tests for navigation

- Test: navbar links navigate to `/`, `/cv`, `/projects`.
- Test: active page link has the accent underline class.
- Test: theme toggle switches between light and dark (check `.dark` class on `<html>`).

---

## Phase 2 — Design system & global styles

### 2.1 Typography refinements

- Confirm font loading is performant (preload hint for Inter, `font-display: swap`).
- Apply the full type scale to utility classes / Tailwind config: H1 (2.25rem/500), H2 (1.5rem/600), H3 (1.25rem/600), body (1rem/400), small (0.875rem/400).
- Set line-height: 1.6 for body, 1.3 for headings.
- Set paragraph spacing: 1.5em between `<p>` elements.

### 2.2 Spacing & container utilities

- Define a max-width content container (`max-w-[56rem]`, `mx-auto`, horizontal padding `1.5rem` mobile / `2rem` desktop).
- Create a reusable `Container` Astro component or utility class.
- Verify spacing increments follow the 8pt grid.

### 2.3 Shared UI atoms

- **AccentStripe**: a thin vertical left-border accent bar component. Accepts a `variant` prop (`warm` | `creative`) for colour.
- **SectionHeading**: an H2 heading component with consistent styling. Optional link prop (heading becomes a link).
- **TagPill**: small rounded pill for tech tags. Muted background, small text, monospace font.
- **CardSurface**: a generic elevated surface (bg-surface, subtle border, optional hover lift).

### 2.4 Motion utility classes

- Define reusable transition classes: `transition-lift` (translateY + shadow), `transition-underline` (width 0→100%), `transition-theme` (color + background-color 200ms).
- Apply globally where specified in design guidelines.

### 2.5 Focus & accessibility styles

- Global `focus-visible` style: 2px primary-coloured outline with offset on all interactive elements.
- Verify contrast: every text/background combination in both themes meets WCAG AA (manually verify or use a contrast checker utility).

### 2.6 Unit tests for utilities

- Test theme persistence helper (reads/writes `localStorage`, falls back to `prefers-color-scheme`).
- Test any formatting or data-shaping utilities created so far.

---

## Phase 3 — Home page (`/`)

### 3.1 Build the Hero section

- Create `src/components/home/Hero.astro`.
- 2–3 line narrative philosophy statement (hard-coded placeholder).
- Primary CTA: "View CV →" button linking to `/cv`.
- Secondary CTA: "Explore Projects →" button linking to `/projects`.
- Layout: generous whitespace, subtle asymmetry (e.g., off-centre text or a faint accent shape).
- Typography: H1 for the statement, buttons styled per design guidelines.

### 3.2 Build the ExperiencePreview section

- Create `src/components/home/ExperiencePreview.astro`.
- Section heading: "Experience" — links to `/cv`.
- 3–5 impact bullet items (hard-coded placeholder data).
- Each bullet links to `/experience/{slug}`.
- Uses warm accent for any accent indicators.

### 3.3 Build the ProjectsPreview section

- Create `src/components/home/ProjectsPreview.astro`.
- Section heading: "Projects" — links to `/projects`.
- 3–5 project bullet items (hard-coded placeholder data).
- Each bullet links to `/projects/{slug}`.
- Uses creative accent for any accent indicators.

### 3.4 Assemble the Home page

- In `src/pages/index.astro`, replace placeholder with Hero → ExperiencePreview → ProjectsPreview.
- Verify vertical rhythm: generous spacing between sections (min 4rem).
- Hover interactions: underline slide on links, accent tint on bullets (200–250ms ease-in-out).

### 3.5 Playwright smoke tests for home page

- Test: hero renders with philosophy statement and both CTAs.
- Test: "View CV →" navigates to `/cv`.
- Test: "Explore Projects →" navigates to `/projects`.
- Test: experience and project bullet links navigate to correct detail routes.

---

## Phase 4 — CV page & Experience detail

> Can be run in parallel with Phase 5 once Phase 3 is complete: independent page sets, no shared file conflicts.

### 4.1 Build the RoleCard component

- Create `src/components/cv/RoleCard.astro`.
- Displays: role title, company, timeline, 4–6 impact bullets.
- Soft left accent stripe (warm accent).
- Entire card is clickable → `/experience/{slug}`.
- Hover: subtle accent tint.

### 4.2 Build the CV page

- Create content in `src/pages/cv.astro`.
- **Brief intro**: name, title, 1–2 sentence positioning (hard-coded).
- **Experience section**: 2–3 RoleCard instances (hard-coded placeholder data).
- **Projects section**: 2–3 project tiles (reuse the ProjectTile component from Phase 5, or build a shared version now). Each shows title, description, tech tags. Links to `/projects/{slug}`.
- "View all projects →" link at the bottom of the projects section.
- Optional skills/tech section: grouped TagPill components.
- No hero block — straight to substance.

### 4.3 Build the ExperienceDetail layout

- Create `src/components/experience/ExperienceDetail.astro` (or a layout).
- Repeatable section template with slots for: Role Overview, High-Leverage Initiatives, STAR Case Studies, Product Decisions, Technical Trade-offs, What I Learned.
- Each section uses SectionHeading + body content.
- Left accent stripe (warm) on key sections.
- Optional slots for diagrams and code snippets (monospace, lightly shaded background).

### 4.4 Build a sample experience detail page

- In `src/pages/experience/[slug].astro`, implement `getStaticPaths` returning at least one hard-coded role.
- Populate with realistic placeholder content to validate the template.
- Verify all sections render correctly in both themes.

### 4.5 Playwright tests for CV & experience flow

- Test: `/cv` renders intro, role cards, and project tiles.
- Test: clicking a role card navigates to `/experience/{slug}`.
- Test: experience detail page renders all expected sections.

---

## Phase 5 — Projects pages

> Can be run in parallel with Phase 4 once Phase 3 is complete: independent page sets, no shared file conflicts.

### 5.1 Build the ProjectTile component

- Create `src/components/projects/ProjectTile.astro`.
- Displays: title, short description, tech tags (TagPill), GitHub icon link.
- Entire tile clickable → `/projects/{slug}`.
- Hover: subtle lift (`translateY(-2px)`), soft accent highlight (creative), "See decisions →" microcopy fades in.
- GitHub icon: opens in new tab, `aria-label="View source on GitHub"`.

### 5.2 Build the Projects grid page

- In `src/pages/projects/index.astro`, create a responsive grid of ProjectTile components.
- Grid layout: single column on mobile, 2 columns on tablet+.
- Hard-coded placeholder data for 3–4 projects.

### 5.3 Build the ProjectDetail layout

- Create `src/components/projects/ProjectDetail.astro`.
- Repeatable section template: Problem, Why It Mattered, Constraints, Architecture Decisions, Trade-offs, Outcomes, What I'd Improve.
- Each section uses SectionHeading + body content.
- Left accent stripe (creative) on key sections.
- Optional slots for diagrams, code snippets, live demo link, GitHub link.

### 5.4 Build a sample project detail page

- In `src/pages/projects/[slug].astro`, implement `getStaticPaths` returning at least one hard-coded project.
- Populate with realistic placeholder content.
- Verify all sections render in both themes.

### 5.5 Refactor shared ProjectTile for CV page reuse

- If the ProjectTile from 5.1 isn't already reused on `/cv`, wire it up now.
- Ensure the same component renders identically on both `/cv` and `/projects`.

### 5.6 Playwright tests for projects flow

- Test: `/projects` renders a grid of project tiles.
- Test: clicking a tile navigates to `/projects/{slug}`.
- Test: project detail page renders all expected sections.
- Test: GitHub icon link opens in new tab.

---

## Phase 6 — Sanity CMS integration

### 6.1 Set up Sanity project

NOTE: IMPORTANT: confirm with user before progressing! We want to use a referral here.

- Create a new Sanity project (`npm create sanity@latest` or via `sanity init`) in a `studio/` subdirectory (or a separate repo — decide and document).
- Configure the Sanity Studio with the project ID and dataset.
- Studio is hosted by Sanity (no self-hosted route in the Astro app).

### 6.2 Define Experience schema

- Create a Sanity document type for `experience` with all fields from the content model:
  - `title` (string), `company` (string), `slug` (slug), `timeline` (string), `sortOrder` (number), `impactBullets` (array of strings), `overview` (block content), `initiatives` (array of block content), `caseStudies` (array of objects with situation/task/action/result), `productDecisions` (block content), `technicalTradeoffs` (block content), `learned` (block content), `featured` (boolean).

### 6.3 Define Project schema

- Create a Sanity document type for `project` with all fields:
  - `title` (string), `slug` (slug), `description` (string), `techTags` (array of strings), `githubUrl` (url), `demoUrl` (url), `sortOrder` (number), `problem` (block content), `whyItMattered` (block content), `constraints` (block content), `architectureDecisions` (block content), `tradeoffs` (block content), `outcomes` (block content), `improve` (block content), `featured` (boolean).

### 6.4 Set up Sanity client in Astro

- Install `@sanity/client` and `@portabletext/react` (for rendering block content).
- Create a Sanity client helper (`src/lib/sanity.ts`) configured with project ID, dataset, API version, and `useCdn: true`.
- Create GROQ query helpers for:
  - All featured experiences (sorted by `sortOrder`).
  - All featured projects (sorted by `sortOrder`).
  - Single experience by slug.
  - Single project by slug.
  - All experiences (for `getStaticPaths`).
  - All projects (for `getStaticPaths`).

### 6.5 Data-shaping helpers + unit tests

- Create TypeScript helpers (`src/lib/mappers.ts` or similar) that transform raw Sanity responses into strongly-typed page props.
- Write unit tests (Vitest) for each mapper:
  - Featured items filtered and sorted correctly.
  - Missing optional fields handled gracefully.
  - Slug generation is correct.

### 6.6 Wire pages to Sanity data

- Replace hard-coded content on every page with Sanity-fetched data:
  - Home: experience preview bullets + project preview bullets from featured items.
  - CV: featured experiences + featured projects.
  - `/experience/[slug]`: single experience document.
  - `/projects` grid: all projects.
  - `/projects/[slug]`: single project document.
- Update `getStaticPaths` on dynamic routes to query Sanity for all slugs.

### 6.7 Migrate placeholder content to Sanity

- Enter the hard-coded placeholder content (or real content) into Sanity Studio.
- Verify all pages render identically from CMS data as they did with hard-coded data.

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
- Ensure minimal JS bundle (only React islands: ThemeToggle, MobileNav).
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

- Path A: `/` → "View CV" → `/cv` → click role card → `/experience/{slug}` → navbar → `/projects` → click tile → `/projects/{slug}`.
- Path B: `/` → "Explore Projects" → `/projects` → click tile → `/projects/{slug}` → navbar → `/cv`.
- Path C: direct entry to `/cv` → scan → click role card → `/experience/{slug}`.
- Verify theme toggle persists across navigation.

---

## Phase 8 — Launch

### 8.1 Build the 404 page

- Create `src/pages/404.astro`.
- Uses BaseLayout (same navbar + theme).
- Brief message: "This page doesn't exist."
- Single CTA: "Back to home →" linking to `/`.
- Clean, on-brand, no clutter.

### 8.2 SEO & social meta

- Add OG meta tags to BaseLayout (title, description, image, url).
- Add Twitter card meta tags.
- Create or source an OG preview image.
- Add `<title>` and `<meta name="description">` per page (passed as props to BaseLayout).

### 8.3 Sitemap

- Add `@astrojs/sitemap` integration.
- Configure `site` in `astro.config.mjs`.
- Verify sitemap generates correctly at `/sitemap-index.xml`.

### 8.4 Final cleanup

- Remove any remaining placeholder content or TODO comments.
- Run full lint + format pass (`npm run lint && npm run format`).
- Run full test suite (`npm run test && npm run test:e2e`).
- Verify build succeeds (`npm run build`).

### 8.5 Production deploy

- Push to `main`; verify Vercel deployment succeeds.
- Manual smoke test in production across Chrome, Safari, Firefox.
- Verify: all pages load, navigation works, theme toggle works, no console errors.
- Confirm OG previews render correctly (use a social media debugger tool).
