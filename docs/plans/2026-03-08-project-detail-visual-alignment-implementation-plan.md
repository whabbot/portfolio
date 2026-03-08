# Project Detail Visual Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Simplify `ProjectDetail` so the detail page feels visually consistent with the lighter framing used on the home page and projects grid.

**Architecture:** Keep the page route unchanged and make the visual adjustment inside `ProjectDetail.astro`. Remove the outer article chrome, reduce the surface treatment on the optional sidebar and narrative sections, and sharpen the left accent treatment for accented sections without changing data flow or behavior.

**Tech Stack:** Astro, Tailwind utilities, existing Vitest component test.

---

### Task 1: Simplify the ProjectDetail shell

**Files:**
- Modify: `site/src/components/projects/ProjectDetail.astro`

**Step 1: Remove the heavy outer shell**

- Drop the bordered, rounded article-card treatment from the root wrapper.
- Keep spacing and layout structure for the heading and optional sidebar.

**Step 2: Soften inner section chrome**

- Reduce the border/background weight on the optional sidebar and narrative sections.
- Keep sections readable and grouped without making them look like standalone cards from a separate design language.

### Task 2: Preserve and sharpen the accent treatment

**Files:**
- Modify: `site/src/components/projects/ProjectDetail.astro`

**Step 1: Keep accented sections distinct**

- Retain the creative left accent on marked sections.
- Make the accent edge straighter by removing the left-side rounding on accented sections.

### Task 3: Verify styling-related expectations still hold

**Files:**
- Verify: `site/src/components/projects/ProjectDetail.astro`
- Verify: `site/src/components/projects/ProjectDetail.test.ts`

**Step 1: Run focused verification**

Run from `site/`:

- `env -u NO_COLOR npm run lint`
- `env -u NO_COLOR NODE_OPTIONS="--no-webstorage" npm run test -- src/components/projects/ProjectDetail.test.ts`

Expected: PASS.
