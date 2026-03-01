# ProjectTile design

## Goal

Create a reusable `ProjectTile` component for the Projects grid that:

- Shows project title, short description, tech tags, and a GitHub source link.
- Makes the **entire tile** clickable to `/projects/{slug}`.
- Adds small delightful motion: subtle lift, soft creative accent highlight, and “See decisions →” microcopy that fades in.
- Meets accessibility expectations (semantic HTML, focus-visible, ARIA label on icon-only link).

## Recommended interaction pattern (approved)

Use a **whole-card overlay link** (no JS) layered under a separate GitHub icon link:

- The card contains an empty `<a>` positioned `absolute inset-0` that links to `/projects/{slug}`.
- The GitHub icon is its own `<a>` with higher `z-index`, opening in a new tab, with `aria-label="View source on GitHub"`.
- This avoids invalid nested links while still enabling true “click anywhere”.

## Visual / motion details

- Base surface: reuse existing `CardSurface` styles.
- Hover/focus: `transition-lift` (translateY(-2px) + shadow), plus a soft creative highlight (subtle ring/border shift).
- Microcopy: “See decisions →” fades in on hover and focus-within.

