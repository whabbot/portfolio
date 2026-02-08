# PRD — Portfolio (Astro + Sanity)

## Goals

- Communicate who I am and what I build.
- Showcase projects with clear outcomes and links.
- Provide a lightweight way to contact me.

## Non-goals

- Full blog / newsletter (v1).
- Account system or gated content.
- Complex animations or heavy client-side app behavior.

## Pages (v1)

- **Home**: hero, short intro, links to Projects + CV, featured projects, contact CTA.
- **CV**: curated highlights (experience + selected projects) with links to detail pages.
- **Projects**: list + project detail pages.
- **Experience**: full ordered list of experience with links to experience detail pages.
- **Experience detail**: STAR-like deep dive per role.
- **Contact**: social links + mailto (form optional later).

## Content model (Sanity)

### Project

- `title`, `slug`, `featured`
- `excerpt`, `body` (Portable Text)
- `coverImage`, `gallery` (optional)
- `tech[]`
- `links`: `liveUrl?`, `repoUrl?`
- `order?`, `startDate?`, `endDate?`

### Experience

- `company`, `role`, `slug`
- `startDate`, `endDate?`
- `highlights` (Portable Text or string list)
- STAR-like deep dive fields (Portable Text): `situation`, `task`, `actions`, `results`, `learnings`
- `tech[]`
- `order?`

## Acceptance criteria

- **Home** loads without CMS content and has sensible empty states.
- **CV** is curated and scannable, and every listed item links to its canonical detail page:
  - projects \u2192 `/projects/:slug`
  - roles \u2192 `/experience/:slug`
- **Projects list** displays projects sorted predictably; featured projects are visually distinguished.
- **Project detail** renders Portable Text and media, and the route exists for every slug.
- **Experience list** shows all roles in a consistent order (by date/order); each role links to its deep dive.
- **Experience detail** exists for every experience slug and renders STAR-like content when present.
- **Contact** provides at least one working contact method and social links.
