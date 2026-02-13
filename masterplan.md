# Clearcraft — Masterplan (10,000ft)

## What this is

Clearcraft is a portfolio website designed to help **engineering managers and founders** quickly understand how I think, prioritize, and build high‑leverage software.

It’s a **curated, timeless body of work** (not a feed). The experience should feel **clean, signal‑first, warm, and gently expressive**—precise without feeling over‑engineered.

## Who it’s for

- **Founders / early leaders** evaluating whether I can navigate ambiguity, make trade-offs, and ship durable product.
- **Engineering managers** assessing judgment, prioritization, communication, and ability to deliver impact through systems.
- **Recruiters** looking for a quick, shareable overview of experience and impact (the `/cv` page).
- **Peers / collaborators** looking for how I approach architecture and product decisions (secondary audience).

## What users get out of it

Within ~60 seconds, a visitor should confidently walk away with:

- **How I think**: systems-level framing, prioritization, and decision quality.
- **What I’ve done**: impact-driven experience highlights (not responsibility lists).
- **How I build**: trade-offs, constraints, outcomes, and what I’d improve.
- **How I communicate**: structured writing, calm clarity, and product-aware framing.

## The “core identity” the site must communicate

Everything should reinforce (in order):

1. **I think in systems.**
2. **I prioritize for impact.**
3. **I care about UX and long-term durability.**
4. **I make thoughtful trade-offs.**

If a section doesn’t strengthen one of these, it’s a candidate for removal.

## Content pillars (what we’re showcasing)

- **Experience**: roles as impact summaries, with drill-down case studies.
- **Projects**: curated product case studies (problem → decisions → outcomes).
- **Decision quality**: explicit constraints, trade-offs, and “what I’d do next.”

## Primary navigation & information architecture (high-level)

- **Home (`/`)**: narrative hero + signal previews for Experience and Projects.
- **CV (`/cv`)**: the primary experience and projects overview — curated top roles with impact bullets and top projects, each linking to a deep-dive.
- **Experience detail (`/experience/{slug}`)**: case-study style breakdown of a single role.
- **Projects (`/projects`)**: curated grid; each project links to a deep-dive.
- **Project detail (`/projects/{project}`)**: product case study format.

Explicit non-feature: **No “Now” section**.

## Experience principles (how it should feel)

- **Signal over decoration**: generous whitespace, clear hierarchy, minimal chrome.
- **Warm restraint**: subtle expressiveness (small asymmetry, gentle accents), never loud.
- **Product engineer’s workspace**: calm, structured, intentional.
- **Minimal JavaScript**: interactivity only where it meaningfully improves UX.
- **Accessible by default**: semantic structure, keyboard navigation, clear focus.

## Success criteria (what “good” looks like)

- **Comprehension**: visitors can summarize the 4 identity points after skimming.
- **Trust**: founders/EMs feel I can own ambiguity and make high-value calls.
- **Depth on demand**: skim-friendly pages with optional deep dives.
- **Durability**: content model supports easy updates without redesigning pages.
- **Performance**: fast loads; no heavy animations or JS-dependent layout.

## Non-goals (what we’re intentionally not doing)

- Blog-like stream of updates, “Now” page, or chronologically exhaustive resume.
- Flashy, trend-driven visuals, parallax, or motion as the primary “wow factor.”
- Long responsibility lists or keyword-stuffed skill matrices.
- Overly complex CMS + frontend integration that increases maintenance cost.

## Key design decisions (that shape implementation)

- **Case-study formats** for experience and projects (not generic descriptions).
- **Impact bullets first**; drill-down pages provide the nuance and narrative.
- **Controlled motion**: subtle transitions (200–250ms, ease-in-out), no spectacle.
- **Color accents as hierarchy**: one accent per section; avoid “color chaos.”
- **Light & dark mode**: both themes supported; respect `prefers-color-scheme`, allow manual toggle, persist preference.
- **Mobile-first design**: follow mobile-first design.

## Technical posture (constraints + stack)

- **Astro** for pages and rendering.
- **React islands** only for interactive components.
- **Tailwind CSS** + **shadcn/ui** for consistent, composable UI primitives.
- **Sanity CMS** for content modeling and editing; studio hosted by Sanity.
- **Vercel** for deployment.
- **Vitest + React Testing Library** for logic and component behavior.
- **Playwright** for smoke-level integration coverage of key flows.

Testing philosophy: **test business logic and content-shaping; avoid trivial UI tests**.

## Risks & things to watch

- **Over-detailing** pages (losing the 60-second clarity).
- **Over-engineering** CMS models or UI component systems.
- **Visual noise** (too many accents, cards, borders, or aggressive type scale).
- **Case-study consistency**: deep dives must follow a repeatable structure.
