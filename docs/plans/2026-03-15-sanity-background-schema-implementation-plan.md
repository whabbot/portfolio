# Sanity Background schema (6.2) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `background` document type to the Sanity Studio for brief experience items, with structured dates and strong validation, and update `tasks.md` accordingly.

**Architecture:** Implement a new schema type file in `sanity/schemaTypes/`, register it via `sanity/schemaTypes/index.ts`, and verify the Studio builds. Keep the content model data-oriented, with validation to prevent invalid timelines.

**Tech Stack:** Sanity Studio v5 (`defineType`, `defineField`, `defineArrayMember`), TypeScript.

---

### Task 1: Create the `background` schema type

**Files:**
- Create: `sanity/schemaTypes/background.ts`

**Step 1: Write the schema with strict helpers**
- Use `defineType`, `defineField`, `defineArrayMember`.
- Add an icon from `@sanity/icons`.
- Add preview `select`/`prepare` (title = `jobTitle`, subtitle includes employer + timeline).

**Step 2: Add validation**
- Required: `employerType`, `jobTitle`, `startDate`, `summary`, `bullets`, `sortOrder`.
- `endDate` custom validation: if set, must be >= `startDate`.
- `bullets` array validation: `min(1)` + `unique()` (+ optional max warning).

### Task 2: Register the schema type

**Files:**
- Modify: `sanity/schemaTypes/index.ts`

**Step 1: Export the schema type**
- Import `background` and include it in `schemaTypes` array.

### Task 3: Verify Sanity Studio build

**Files:**
- None

**Step 1: Run build**
- Run: `cd sanity && npm run build`
- Expected: build succeeds with exit code 0.

### Task 4: Update `tasks.md` for 6.2 and mark complete

**Files:**
- Modify: `tasks.md`

**Step 1: Update the 6.2 spec**
- Replace the `timeline` string spec with `startDate` + `endDate` (+ optional `timelineLabel`) to match the implemented schema.

**Step 2: Mark 6.2 complete**
- Strike the 6.2 checklist item(s) and add a `> Completed:` note mentioning the schema file, registration, and successful Studio build.

