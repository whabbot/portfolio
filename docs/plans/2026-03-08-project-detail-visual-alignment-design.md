# Project Detail Visual Alignment Design

## Goal

Align the `ProjectDetail` page styling with the lighter page framing already used on `/` and `/projects`.

## Approved direction

Remove the heavy outer article shell from `ProjectDetail` and reduce the visual weight of the inner case-study sections.

- Keep the route-level page container in `src/pages/projects/[slug].astro` as the only page wrapper.
- Let the header content read like normal page content instead of a bordered card.
- Keep narrative sections visually grouped, but soften them into lighter surfaces instead of fully boxed cards.
- Preserve the creative accent section, but make the accent edge feel straighter and less rounded on the left side.
- Keep optional rich-content areas grouped, but reduce their chrome so they do not overpower the page.

## Notes

- This is a styling/layout-only adjustment.
- No new behavior or data changes are required.
