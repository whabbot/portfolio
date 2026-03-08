# Project Detail Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a reusable `ProjectDetail.astro` component for project case-study pages, including the repeatable narrative sections, optional action links, optional rich-content slots, and test coverage.

**Architecture:** Add a small typed content model for project detail sections directly in the component props, then render a mobile-first article layout with a lightweight desktop summary/actions enhancement. Verify the behavior with a focused Astro container test before and after implementation, then run repository lint, format, and unit-test checks from `site/`.

**Tech Stack:** Astro, TypeScript in `.astro` frontmatter, Tailwind utilities, existing `SectionHeading` component, Vitest with Astro container helpers.

---

### Task 1: Review the existing projects patterns

**Files:**
- Read: `site/src/components/projects/ProjectTile.astro`
- Read: `site/src/components/projects/ProjectTile.test.ts`
- Read: `site/src/components/SectionHeading.astro`
- Read: `site/src/data/projects.ts`

**Step 1: Confirm the current project naming and styling direction**

- Re-read the existing projects component and its test.
- Re-use the same naming tone, spacing direction, and testing approach for the detail layout.

**Step 2: Confirm the minimum API for task `5.3`**

- Keep the scope to `title`, `summary`, ordered `sections`, `liveDemoUrl`, and `githubUrl`.
- Do not add CMS hooks, dates, roles, or extra metadata yet.

### Task 2: Write the failing component test

**Files:**
- Create: `site/src/components/projects/ProjectDetail.test.ts`
- Read: `site/src/components/projects/ProjectDetail.astro`

**Step 1: Write the failing test**

- Render `ProjectDetail.astro` with:
  - a title
  - a summary
  - all seven required sections
  - a `liveDemoUrl`
  - a `githubUrl`
  - simple content in the `diagram`, `code`, and `links` slots
- Assert that:
  - the title and summary render
  - each required section heading renders
  - the live demo link renders when provided
  - the GitHub link renders when provided
  - the named-slot content renders
  - at least one accented section marker/class is present for a highlighted section

**Step 2: Run the test to verify RED**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test -- src/components/projects/ProjectDetail.test.ts`

Expected: FAIL because `ProjectDetail.astro` does not exist yet.

### Task 3: Implement `ProjectDetail.astro`

**Files:**
- Create: `site/src/components/projects/ProjectDetail.astro`
- Read: `site/src/components/SectionHeading.astro`

**Step 1: Add the minimal typed props**

- Define a `ProjectDetailSection` type in frontmatter with:
  - `id`
  - `title`
  - `body`
  - optional `accent`
- Define component props for:
  - `title`
  - `summary`
  - `sections`
  - optional `liveDemoUrl`
  - optional `githubUrl`
  - optional `class`

**Step 2: Build the mobile-first article shell**

- Render an `<article>` wrapper.
- Add an intro block with the title and summary.
- Add an optional actions row that only renders links when URLs are provided.
- Keep the default flow single-column.

**Step 3: Add the desktop hybrid enhancement**

- On medium or large screens, let the intro area shift into a simple two-column arrangement.
- Keep the narrative sections below in a readable vertical flow.
- Do not add a sticky rail.

**Step 4: Render the repeatable sections**

- Map over `sections` in order.
- Render each item as a semantic `<section>` with `id={section.id}`.
- Use `SectionHeading` for the section title.
- Render the `body` as paragraph content with readable width and spacing.
- Apply the left accent stripe only when `accent` is true.

**Step 5: Render optional rich-content slots**

- Add named slot areas for:
  - `diagram`
  - `code`
  - `links`
- Only render slot wrappers if slot content exists.
- Place them after the intro or alongside the main flow in a way that still reads well on mobile.

**Step 6: Keep the accessibility and theme behavior clean**

- Preserve heading order.
- Ensure action links have visible focus styles.
- Avoid color-only differentiation for accented sections.

### Task 4: Run the focused test to verify GREEN

**Files:**
- Verify: `site/src/components/projects/ProjectDetail.astro`
- Verify: `site/src/components/projects/ProjectDetail.test.ts`

**Step 1: Run the focused test**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test -- src/components/projects/ProjectDetail.test.ts`

Expected: PASS.

**Step 2: If it fails, fix the component and re-run**

- Only change the test if the failure proves the test expectation is wrong.
- Otherwise, change the component minimally until the test passes.

### Task 5: Verify formatting, lint, and affected tests

**Files:**
- Verify: `site/src/components/projects/ProjectDetail.astro`
- Verify: `site/src/components/projects/ProjectDetail.test.ts`

**Step 1: Run lint**

Run from `site/`:

- `env -u NO_COLOR npm run lint`

Expected: clean output, no errors.

**Step 2: Run format check**

Run from `site/`:

- `env -u NO_COLOR npm run format:check`

Expected: clean output, no errors.

**Step 3: Run unit tests**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test`

Expected: PASS.

### Task 6: Update task tracking

**Files:**
- Modify: `tasks.md`

**Step 1: Mark task `5.3` complete only after verification passes**

- Strike through the checklist bullets under `5.3`.
- Add a short `> Completed:` note summarizing the reusable layout, optional slots, and verification.

**Step 2: Leave the task incomplete if verification fails**

- If any required check does not pass, do not mark `5.3` complete.
- Add a brief note only if needed to explain what remains blocked.
