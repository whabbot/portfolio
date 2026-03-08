# Projects grid page design

## Goal

Build the `/projects` index page so it renders a responsive grid of reusable `ProjectTile` cards using hard-coded placeholder data that stays aligned with the site's existing projects preview direction.

## Recommended approach (approved)

Create a small shared hard-coded projects data module and consume it from `src/pages/projects/index.astro`.

- Keep the page mobile-first: one column by default, two columns on tablet and above.
- Reuse `ProjectTile.astro` for each project so the grid page matches the detail-link and GitHub-link behavior already implemented.
- Keep the project set to 3-4 placeholder entries with enough detail to support upcoming `/projects/[slug]` work.

## Why this approach

- Avoids duplicating placeholder project objects in multiple page components.
- Keeps `/projects` aligned with the existing home preview intent.
- Sets up tasks `5.4` and `5.5` to reuse the same source of truth with minimal churn.

## Data shape

Each hard-coded project entry should include:

- `slug`
- `title`
- `description`
- `techTags`
- `githubUrl`

This is intentionally the same shape `ProjectTile` already expects, which keeps the page implementation simple and reduces adapter code.

## Page structure

- Continue using `BaseLayout`.
- Replace the current placeholder copy with a page intro and a project grid.
- Use a simple container width that fits two cards comfortably on medium screens and up.
- Render the grid semantically as a list so future tests can assert the number of items clearly.

## Testing and verification

- Add a focused page-level test that proves `/projects` renders the expected placeholder cards and destination links.
- Run format/lint and the relevant unit tests from `site/`.
- Update `tasks.md` only after verification passes, because task `5.2` changes rendered page behavior rather than being pure styling.

## Notes

- This design doc is written per workflow.
- I am not creating a git commit for the design doc because committing requires an explicit user request in this workspace.
