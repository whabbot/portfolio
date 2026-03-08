# Sample Project Detail Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the placeholder `/projects/[slug]` stub with a real sample case-study page backed by shared slug-aligned data and a reusable detail-content module.

**Architecture:** Keep `src/data/projects.ts` as the lightweight source for project tiles and static slugs, and introduce a separate detail-content module for richer case-study data. Render a fully authored detail page for one sample project while preserving valid routes for the other placeholder project slugs through a minimal fallback experience.

**Tech Stack:** Astro, Tailwind utilities, existing `ProjectDetail.astro`, Vitest with Astro container/render helpers.

---

### Task 1: Add the failing dynamic page test

**Files:**
- Create: `site/src/pages/projects/[slug].test.ts`
- Read: `site/src/pages/projects/[slug].astro`
- Read: `site/src/components/projects/ProjectDetail.astro`
- Read: `site/src/data/projects.ts`

**Step 1: Write the failing test**

- Render the dynamic project page for one real slug from the shared projects list.
- Assert the page title and sample project summary render.
- Assert all required case-study section headings render: Problem, Why It Mattered, Constraints, Architecture Decisions, Trade-offs, Outcomes, What I'd Improve.
- Assert the GitHub action link is present.

**Step 2: Run the test to verify RED**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test -- src/pages/projects/[slug].test.ts`

Expected: FAIL because the page still renders placeholder slug text instead of the `ProjectDetail` layout.

### Task 2: Add shared detail-content data

**Files:**
- Create: `site/src/data/projectDetails.ts`
- Read: `site/src/data/projects.ts`

**Step 1: Add a typed detail-content model**

- Export a typed detail record keyed by slug.
- Add one fully authored sample detail entry for `design-system`.
- Include `title`, `summary`, `sections`, and `githubUrl`.
- Keep the section IDs aligned with the existing `ProjectDetail` interface.

**Step 2: Add a minimal fallback strategy**

- Export a helper or fallback object that can derive a lightweight “coming soon” detail page from the base project tile data for slugs that do not yet have rich detail content.
- Keep fallback copy short and obviously temporary without breaking the route.

### Task 3: Implement the dynamic project detail page

**Files:**
- Modify: `site/src/pages/projects/[slug].astro`
- Read: `site/src/data/projects.ts`
- Read: `site/src/data/projectDetails.ts`
- Read: `site/src/components/projects/ProjectDetail.astro`

**Step 1: Replace hard-coded static paths**

- Import the shared `projects` array.
- Generate `getStaticPaths()` from project slugs instead of maintaining a separate slug list.

**Step 2: Render the detail layout**

- Look up the requested slug in the shared project data.
- Use rich sample content when a detail entry exists.
- Use the minimal fallback content for other valid slugs.
- Pass the resolved title, summary, sections, and `githubUrl` into `ProjectDetail`.
- Update the page `<title>` to use the resolved project title.

**Step 3: Re-run the focused test to verify GREEN**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test -- src/pages/projects/[slug].test.ts`

Expected: PASS.

### Task 4: Verify formatting, lint, and affected tests

**Files:**
- Verify: `site/src/pages/projects/[slug].astro`
- Verify: `site/src/pages/projects/[slug].test.ts`
- Verify: `site/src/data/projectDetails.ts`

**Step 1: Run format and lint**

Run from `site/`:

- `env -u NO_COLOR npm run lint`
- `env -u NO_COLOR npm run format:check`

Expected: clean output, no errors.

**Step 2: Run the unit suite**

Run from `site/`:

- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test`

Expected: PASS.

### Task 5: Update task tracking

**Files:**
- Modify: `tasks.md`

**Step 1: Mark task \`5.4\` complete only after verification passes**

- Strike through the checklist bullets under `5.4`.
- Add a short `> Completed:` note summarizing the sample detail page, shared detail content, and verification.

**Step 2: Leave the task incomplete if verification fails**

- If any required check does not pass, do not mark `5.4` complete.
- Add a brief note only if needed to explain what remains blocked.
