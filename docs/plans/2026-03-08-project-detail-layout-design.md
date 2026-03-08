# Project detail layout design

## Goal

Build a reusable `ProjectDetail` layout component that turns each project page into a readable case study with consistent sections, optional rich content areas, and enough flexibility to support different project stories without creating one-off page structures.

## Recommended approach (approved)

Create `src/components/projects/ProjectDetail.astro` as a hybrid layout.

- Keep the default reading flow single-column and mobile-first.
- Add a lightweight summary and actions area that can sit beside the intro on larger screens.
- Render the repeatable narrative sections as a stacked case-study flow.
- Use accent-striped styling on selected sections rather than a permanent heavy sidebar.
- Expose optional slots for rich content so future detail pages can add diagrams, code snippets, and external links without changing the component contract.

## Why this approach

- Preserves readability on small screens where most of the page will be consumed as long-form content.
- Avoids overcommitting to a sticky metadata rail before the project pages have stable metadata needs.
- Gives desktop layouts more structure and visual rhythm than a plain prose stack.
- Keeps task `5.4` focused on content population rather than additional layout invention.

## Component structure

`ProjectDetail.astro` should provide:

- An intro area for project title, short summary, and optional call-to-action links.
- A repeatable section renderer for:
  - Problem
  - Why It Mattered
  - Constraints
  - Architecture Decisions
  - Trade-offs
  - Outcomes
  - What I'd Improve
- Shared section framing using `SectionHeading` plus body copy/content slots.
- A lightweight desktop enhancement where the intro summary/actions can align in a second column when space allows.

## Content API

The component should accept explicit props for:

- `title`
- `summary`
- `sections` as an ordered array of section objects
- optional `liveDemoUrl`
- optional `githubUrl`

Each section object should include:

- `id`
- `title`
- `body`
- optional `accent`

The component should also expose named slots so detail pages can inject richer content only when needed:

- `diagram`
- `code`
- `links`

If no rich content is provided, the layout should still read as a complete narrative without empty containers.

## Visual design

- Use the existing surface, spacing, and typography direction from the site.
- Keep the section stack calm and readable with generous vertical spacing.
- Apply the left accent stripe only to key sections such as Architecture Decisions, Trade-offs, and Outcomes unless a page opts into a different highlighted set through section data.
- Ensure links and interactive controls have visible focus styles in both themes.
- Keep the layout mobile-first, then introduce desktop split behavior at medium or large breakpoints only where it improves scanning.

## Accessibility and semantics

- Use semantic article/section structure.
- Keep headings in order and use `SectionHeading` for section titles.
- Label icon-only or compact action links clearly if introduced later.
- Avoid relying on color alone to communicate accented sections.

## Testing and verification

- Add a focused component test for `ProjectDetail.astro` that verifies the required sections, action links, and optional rich-content slots render correctly.
- Run lint and format checks from `site/`.
- Run the focused test first for RED, then again for GREEN, then run the full unit test suite.
- Update `tasks.md` only after the component and tests pass.

## Notes

- This design intentionally stops at the reusable layout layer; task `5.4` will supply actual placeholder case-study content in `src/pages/projects/[slug].astro`.
- I am not creating a git commit for this design doc because committing requires an explicit user request in this workspace.
