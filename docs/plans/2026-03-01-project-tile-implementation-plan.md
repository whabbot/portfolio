# ProjectTile Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `ProjectTile` Astro component that renders a fully-clickable project card with title/description/tags and a GitHub icon link.

**Architecture:** `ProjectTile.astro` composes existing UI atoms (`CardSurface`, `TagPill`) and uses an overlay link for “click anywhere” while keeping the GitHub link separate (no nested links, no JS).

**Tech Stack:** Astro components, Tailwind v4 utilities, existing global motion utilities (`transition-lift`), Playwright (later) for flow tests.

---

### Task 1: Add `ProjectTile.astro`

**Files:**
- Create: `site/src/components/projects/ProjectTile.astro`
- Uses: `site/src/components/CardSurface.astro`, `site/src/components/TagPill.astro`

**Step 1: Implement minimal component markup**

- Props: `slug`, `title`, `description`, `techTags`, `githubUrl`, optional `class`
- Render:
  - overlay link to `/projects/{slug}` with `aria-label="Open project: {title}"`
  - GitHub icon link (new tab) with `aria-label="View source on GitHub"`
  - tags rendered as `TagPill`
  - “See decisions →” microcopy with hover/focus fade-in

**Step 2: Verify formatting/lint**

Run (from `site/`):
- `npm run lint`
- `npm run format:check`

Expected: clean output, no errors.

**Step 3: Verify unit tests**

Run (from `site/`):
- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test`

Expected: all tests pass.

**Step 4: Update task status**

After verification passes, update `tasks.md` task 5.1:
- Strike checklist bullets with `~~...~~`
- Add a short `> Completed:` note

