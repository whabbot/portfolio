# Projects Grid Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the placeholder `/projects` page with a responsive grid of reusable `ProjectTile` cards backed by a shared hard-coded placeholder data set.

**Architecture:** Introduce a small local project data module that exports 3-4 placeholder project objects matching `ProjectTile` props. Render that data in `src/pages/projects/index.astro` as a semantic list/grid so the projects page, home preview, and future detail pages can share the same content direction.

**Tech Stack:** Astro, Tailwind utilities, existing `ProjectTile` component, Vitest with Astro container/render helpers.

---

### Task 1: Add shared placeholder project data

**Files:**
- Create: `site/src/data/projects.ts`
- Uses: `site/src/components/projects/ProjectTile.astro`

**Step 1: Write the minimal data shape**

- Export an array with 3-4 projects.
- Each object includes `slug`, `title`, `description`, `techTags`, and `githubUrl`.
- Keep slugs aligned with the current home preview direction where practical.

**Step 2: Keep the scope tight**

- Do not add CMS hooks or extra metadata yet.
- Only include fields needed by `ProjectTile` and upcoming placeholder detail pages.

### Task 2: Write the failing projects page test

**Files:**
- Create: `site/src/pages/projects/index.test.ts`
- Read: `site/src/pages/projects/index.astro`
- Read: `site/src/data/projects.ts`

**Step 1: Write the failing test**

- Render the projects page.
- Assert the expected number of project tiles appears.
- Assert at least one project detail link exists with `/projects/{slug}`.
- Assert at least one GitHub source link exists.

**Step 2: Run the test to verify RED**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test -- src/pages/projects/index.test.ts`

Expected: FAIL because the page still shows placeholder copy instead of the grid.

### Task 3: Implement the projects grid page

**Files:**
- Modify: `site/src/pages/projects/index.astro`
- Read: `site/src/components/projects/ProjectTile.astro`
- Read: `site/src/layouts/BaseLayout.astro`
- Read: `site/src/data/projects.ts`

**Step 1: Replace placeholder markup**

- Import the shared project data and `ProjectTile`.
- Keep `BaseLayout`.
- Add a short page intro.

**Step 2: Render the responsive grid**

- Use a semantic list wrapper.
- Default to one column.
- Switch to two columns on tablet and up.
- Pass each data item directly into `ProjectTile`.

**Step 3: Re-run the focused test to verify GREEN**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test -- src/pages/projects/index.test.ts`

Expected: PASS.

### Task 4: Verify formatting, lint, and affected tests

**Files:**
- Verify: `site/src/pages/projects/index.astro`
- Verify: `site/src/pages/projects/index.test.ts`
- Verify: `site/src/data/projects.ts`

**Step 1: Run format/lint**

Run from `site/`:

- `env -u NO_COLOR npm run lint`
- `env -u NO_COLOR npm run format:check`

Expected: clean output, no errors.

**Step 2: Run unit tests**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test`

Expected: PASS.

### Task 5: Update task tracking

**Files:**
- Modify: `tasks.md`

**Step 1: Mark task `5.2` complete only after verification passes**

- Strike through the checklist bullets under `5.2`.
- Add a short `> Completed:` note summarizing the grid page, placeholder data, and verification.

**Step 2: Leave the task incomplete if verification fails**

- If any required check does not pass, do not mark `5.2` complete.
- Add a brief note only if needed to explain what remains blocked.
