# Home Background/Awards/Interests Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the home “Experience preview” section with a privacy-first Background/Awards/Interests section and a LinkedIn callout line.

**Architecture:** Add a dedicated Astro component to keep `index.astro` clean, reuse existing home section container rhythm, and update Playwright home preview coverage accordingly.

**Tech Stack:** Astro, Tailwind CSS, Playwright.

---

### Task 1: Add `HomeBackground` component

**Files:**
- Create: `site/src/components/home/HomeBackground.astro`

**Steps:**
- Add placeholder arrays for Background bullets, Awards, and Interests (privacy-safe).
- Render a `<section aria-label="Background">` with:
  - `h2` “Background”
  - a bulleted list (3–5 items)
  - “Awards” and “Interests” `h3` subsections with tight lists
  - a LinkedIn callout line containing: “For full work history and messaging, see LinkedIn →”
- Ensure the LinkedIn link opens in a new tab and includes an SR-only “opens in a new tab” hint.

### Task 2: Replace `ExperiencePreview` on Home

**Files:**
- Modify: `site/src/pages/index.astro`

**Steps:**
- Remove the `ExperiencePreview` import and usage.
- Import and render `HomeBackground` between `Hero` and `ProjectsPreview`.

### Task 3: Update Playwright home preview tests

**Files:**
- Modify: `site/e2e/home-previews.spec.ts`

**Steps:**
- Remove the “experience preview bullet navigates…” test.
- Add a smoke test that:
  - asserts the Background region is visible
  - asserts the LinkedIn callout link exists and is `target="_blank"`

### Task 4: Verification + task completion bookkeeping

**Files:**
- Modify: `tasks.md`

**Steps:**
- Run formatting, lint, unit tests, and e2e:
  - `npm run format`
  - `npm run lint`
  - `npm run test` (with `NODE_OPTIONS="--no-webstorage"`)
  - `npm run test:e2e` (with `PLAYWRIGHT_BROWSERS_PATH` set)
- Perform visual review (light/dark, mobile/desktop, keyboard focus).
- Mark task 4.2 as complete in `tasks.md` with a short completion note.

