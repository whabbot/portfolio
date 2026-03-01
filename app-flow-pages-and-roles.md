# Clearcraft — App Flow, Pages & Roles

> How visitors navigate the site, what they see on each page, and the content model behind it.

---

## Roles

This is a public portfolio — there is one user role.

| Role        | Description                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| **Visitor** | Anyone viewing the site: founders, engineering managers, peers. Unauthenticated; read-only. |

Content is managed separately through Sanity Studio (author role, not part of the public site).

---

## Site map

```
/                            Home (hero + personal projects + brief background)
├── /projects                Personal projects grid (all personal projects)
│   └── /projects/{slug}     Project detail (single project deep-dive)
└── (404)                    Not found page
```

No authentication walls. No gated content. Every page is reachable in ≤ 2 clicks from home.

---

## Global elements (every page)

### Navbar

- **Left**: site owner's name (links to `/`).
- **Right**: Projects | theme toggle (sun/moon icon).
- Active page has a persistent accent underline.
- Mobile: collapses to hamburger menu; same links + theme toggle.

### Footer (minimal)

- Optional: small copyright line or a single external link (e.g., GitHub profile).
- Not a navigation hub — the navbar carries all routing.

### Theme toggle

- Toggles between light and dark mode.
- Respects `prefers-color-scheme` on first visit; persists choice in `localStorage`.
- Transition is smooth; no flash on page load.

---

## Page-by-page flow

### 1. Home (`/`)

**Purpose**: orient the visitor in ~60 seconds — who I am, how I think, what to explore next.

#### Content blocks (top to bottom)

1. **Hero**
   - 2–3 line narrative philosophy statement.
   - Primary CTA: "Explore Projects →" (navigates to `/projects`).
   - Secondary CTA: "View LinkedIn →" (opens LinkedIn in a new tab).

2. **Selected projects preview**
   - Section heading: "Projects" (links to `/projects`).
   - 3–5 curated personal projects.
   - Each item links to its project detail page (`/projects/{slug}`).

3. **Background / experience (brief)**
   - 3–5 bullets.
   - Each bullet is **generalized**: employer type + job title + years + brief scope/impact.
   - No links to employer deep-dive pages (the public site does not host them).

4. **Awards (brief)**
   - Tight list format; optional omission of dates/venues if identifiability is a concern.

5. **Interests (brief)**
   - Tight list; relevant to how I work / what I like building.

6. **LinkedIn callout**
   - Explicit: “For full work history and messaging, see LinkedIn →”.

#### Visitor actions on this page

| Action                     | Target                   |
| -------------------------- | ------------------------ |
| Click primary CTA          | `/projects`              |
| Click secondary CTA        | LinkedIn (new tab)       |
| Click "Projects" heading   | `/projects`              |
| Click a project item       | `/projects/{slug}`       |
| Click LinkedIn callout     | LinkedIn (new tab)       |
| Toggle theme               | Switches light/dark mode |

#### What the visitor should take away

- This person thinks in systems and prioritises for impact.
- There is structured depth available on demand.
- The site itself signals taste and care.

---

### 2. Projects grid (`/projects`)

**Purpose**: curated showcase of personal/side projects, each framed as a product decision — not a tech demo.

#### Content blocks

A **grid of project tiles**. Each tile contains:

| Field       | Description                                   |
| ----------- | --------------------------------------------- |
| Title       | Project name                                  |
| Description | 1–2 sentence product-oriented summary         |
| Tech tags   | Pills showing key technologies                |
| GitHub link | Icon linking to repository (opens in new tab) |

- Tiles are clickable → `/projects/{slug}`.
- Hover: subtle lift, accent highlight, "See decisions →" microcopy fades in.

#### Visitor actions on this page

| Action               | Target                                  |
| -------------------- | --------------------------------------- |
| Click a project tile | `/projects/{slug}`                      |
| Click a GitHub icon  | External GitHub repo (new tab)          |
| Use navbar           | Navigate to `/` or toggle theme         |

#### What the visitor should take away

- A curated set of projects (not an exhaustive list).
- Each project has a clear "why" beyond the technology.

---

### 3. Project detail (`/projects/{slug}`)

**Purpose**: a product case study for one project — demonstrating product awareness, not just technical execution.

#### Content sections (repeatable template)

| Section                    | What it covers                                                       |
| -------------------------- | -------------------------------------------------------------------- |
| **Problem**                | What problem does this solve? For whom?                              |
| **Why it mattered**        | Why was this worth building? What was the opportunity or pain?       |
| **Constraints**            | Time, scope, technology, or design constraints that shaped decisions |
| **Architecture decisions** | How the system was designed and why                                  |
| **Trade-offs**             | What was traded away and the reasoning                               |
| **Outcomes**               | Results, metrics, or qualitative impact                              |
| **What I'd improve**       | Honest reflection on what could be better                            |

#### Optional elements

- Architecture diagrams.
- Code snippets illustrating key decisions.
- Link to live demo (if applicable).
- GitHub repository link.

#### Visitor actions on this page

| Action                  | Target                     |
| ----------------------- | -------------------------- |
| Scroll through sections | Linear reading within page |
| Click GitHub link       | External repo (new tab)    |
| Navigate via navbar     | `/`, `/projects`           |

#### What the visitor should take away

- This person thinks about products, not just code.
- They make explicit trade-offs and can articulate why.
- They improve iteratively.

---

### 4. Not found (`404`)

**Purpose**: gracefully handle broken/mistyped URLs.

- Clean, on-brand layout (same navbar + theme).
- Brief message: "This page doesn't exist."
- Single CTA: "Back to home →" (links to `/`).
- No clutter, no jokes — consistent with the site's calm tone.

---

## Content model (Sanity schemas)

These are the core document types that power the pages above.

### Background item (brief experience)

| Field           | Type             | Notes                                                                 |
| --------------- | ---------------- | --------------------------------------------------------------------- |
| `employerType`  | string           | Generalized (e.g. “Fintech scale-up”, “Public sector”, “B2B SaaS”)    |
| `jobTitle`      | string           | Role title                                                            |
| `timeline`      | string           | e.g., "2022 – 2024"                                                   |
| `summary`       | string           | 1–2 lines (privacy-first; avoid identifiable details)                 |
| `bullets`       | array of strings | 2–4 bullets (privacy-first; avoid client names/internal system names) |
| `sortOrder`     | number           | For manual ordering                                                   |

### Project

| Field                   | Type             | Notes                                  |
| ----------------------- | ---------------- | -------------------------------------- |
| `title`                 | string           | Project name                           |
| `slug`                  | slug             | URL segment                            |
| `description`           | string           | 1–2 sentence product summary           |
| `techTags`              | array of strings | Technology pills                       |
| `githubUrl`             | url              | Repository link                        |
| `demoUrl`               | url              | Optional live demo                     |
| `sortOrder`             | number           | For manual ordering                    |
| `problem`               | block content    | Problem statement                      |
| `whyItMattered`         | block content    | Motivation                             |
| `constraints`           | block content    | Constraints                            |
| `architectureDecisions` | block content    | System design                          |
| `tradeoffs`             | block content    | Trade-off reasoning                    |
| `outcomes`              | block content    | Results                                |
| `improve`               | block content    | Retrospective                          |
| `featured`              | boolean          | Show on home page preview              |

---

## Key navigation paths

These are the primary journeys a visitor is likely to take.

### Path A — Projects-first (most common)

```
/  →  scan hero + selected projects
   →  /projects  →  browse grid  →  /projects/{slug}
```

### Path B — LinkedIn for work history

```
/  →  click “View LinkedIn →”
   →  LinkedIn (new tab)  →  messaging / full work history
```

### Path C — Recruiter quick scan

```
/  (shared link, direct entry)
   →  read background bullets + awards + 1–2 project summaries
   →  click LinkedIn for full details if needed
```

### Path D — Deep-dive (time-constrained founder)

```
/  →  click 1 selected project
   →  /projects/{slug}  →  skim decisions + trade-offs
   →  close tab
```

Every path reaches meaningful content within 1–2 clicks. No dead ends.

---

## Interaction summary

| Interaction        | Behaviour                                         |
| ------------------ | ------------------------------------------------- |
| Nav link hover     | Underline slides in (200ms ease-in-out)           |
| Nav active state   | Persistent accent underline                       |
| Project tile hover | Lift + accent highlight + "See decisions →"       |
| Project tile click | Navigate to `/projects/{slug}`                    |
| GitHub icon click  | Opens external repo in new tab                    |
| CTA button hover   | Background darkens (primary) or fills (secondary) |
| Theme toggle click | Switches light ↔ dark; persists preference        |
| Focus (keyboard)   | 2px accent outline on all interactive elements    |
