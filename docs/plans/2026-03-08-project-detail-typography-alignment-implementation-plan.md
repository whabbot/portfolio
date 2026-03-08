# Project Detail Typography Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make `ProjectDetail` typography and spacing feel consistent with the projects grid while preserving the detail page's clear hierarchy.

**Architecture:** Keep the existing component structure and update only the text-size, line-height, and spacing utilities inside `ProjectDetail.astro`. Use the project-grid description scale as the reference for the summary and tighten nearby layout spacing so the page reads like the same design family.

**Tech Stack:** Astro, Tailwind utilities, existing Vitest component test.

---

### Task 1: Align the ProjectDetail header copy scale

**Files:**
- Modify: `site/src/components/projects/ProjectDetail.astro`

**Step 1: Reduce summary emphasis**

- Bring the summary text closer to the grid description scale.
- Keep the title larger than the grid card title.

**Step 2: Tighten header spacing**

- Adjust spacing around the header and action row so the intro feels more compact.

### Task 2: Normalize section body copy rhythm

**Files:**
- Modify: `site/src/components/projects/ProjectDetail.astro`

**Step 1: Align body text sizing**

- Ensure section body copy sits comfortably alongside the reduced summary scale.
- Keep readable line-height while avoiding oversized section text.

### Task 3: Verify the styling pass

**Files:**
- Verify: `site/src/components/projects/ProjectDetail.astro`
- Verify: `site/src/components/projects/ProjectDetail.test.ts`

**Step 1: Run focused verification**

Run from `site/`:

- `env -u NO_COLOR npm run lint`
- `env -u NO_COLOR npm run format:check`
- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test -- src/components/projects/ProjectDetail.test.ts`

Expected: PASS.
