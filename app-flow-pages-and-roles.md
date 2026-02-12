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
/                            Home (narrative hero + previews)
├── /cv                      CV (curated roles + projects, links to deep dives)
├── /experience/{slug}       Experience detail (role deep-dive, linked from /cv and /)
├── /projects                Projects grid (all projects)
│   └── /projects/{slug}     Project detail (single project deep-dive)
└── (404)                    Not found page
```

No authentication walls. No gated content. Every page is reachable in ≤ 2 clicks from home.

---

## Global elements (every page)

### Navbar

- **Left**: site owner's name (links to `/`).
- **Right**: CV | Projects | theme toggle (sun/moon icon).
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
   - Primary CTA: "View CV →" (navigates to `/cv`).
   - Secondary CTA: "Explore Projects →" (navigates to `/projects`).

2. **Experience preview**
   - Section heading: "Experience" (links to `/cv`).
   - 3–5 curated impact bullets drawn from top roles.
   - Each bullet links to its role's detail page (`/experience/{slug}`).

3. **Projects preview**
   - Section heading: "Projects" (links to `/projects`).
   - 3–5 curated project bullets.
   - Each bullet links to its project detail page (`/projects/{slug}`).

#### Visitor actions on this page

| Action                     | Target                   |
| -------------------------- | ------------------------ |
| Click primary CTA          | `/cv`                    |
| Click secondary CTA        | `/projects`              |
| Click "Experience" heading | `/cv`                    |
| Click an experience bullet | `/experience/{slug}`     |
| Click "Projects" heading   | `/projects`              |
| Click a project bullet     | `/projects/{slug}`       |
| Toggle theme               | Switches light/dark mode |

#### What the visitor should take away

- This person thinks in systems and prioritises for impact.
- There is structured depth available on demand.
- The site itself signals taste and care.

---

### 2. CV (`/cv`)

**Purpose**: the **primary entry point for experience and projects** — a recruiter-friendly, single-page overview. This is the link you send when someone asks "what have you done?" Substantive enough to stand alone; each role and project links to a deep-dive for readers who want more.

#### Content blocks (top to bottom)

1. **Brief intro**
   - Name, current title/focus, 1–2 sentence positioning statement.

2. **Experience (curated)**
   - Only the most relevant/high-impact roles. If a role isn't worth featuring, it doesn't appear.
   - Each role shows: **role title, company, timeline, and 4–5 impact bullets**.
   - Each role card links to its detail page (`/experience/{slug}`) for the full case study.

3. **Projects (curated)**
   - Top-pick projects only.
   - Each project shows: **title, short description, tech tags**.
   - Each project links to its detail page (`/projects/{slug}`).

4. **Skills / technologies (optional)**
   - Compact tag cloud or grouped list of key technologies.
   - Kept brief — the projects and roles already demonstrate skill.

#### Visitor actions on this page

| Action                      | Target                   |
| --------------------------- | ------------------------ |
| Click a role card           | `/experience/{slug}`     |
| Click a project card        | `/projects/{slug}`       |
| Click "View all projects →" | `/projects`              |
| Toggle theme                | Switches light/dark mode |

#### What the visitor should take away

- A **substantive, self-contained picture** of career trajectory, impact, and project work.
- Enough detail to evaluate fit without needing to click through to deeper pages.
- Clear path to drill deeper if they want the full case studies.

---

### 3. Experience detail (`/experience/{slug}`)

**Purpose**: a product-style case study of one role — demonstrating judgment, prioritisation, and systems thinking.

#### Content sections (repeatable template)

| Section                       | What it covers                                                   |
| ----------------------------- | ---------------------------------------------------------------- |
| **Role overview**             | Company context, team size, scope of responsibility              |
| **High-leverage initiatives** | 2–4 key initiatives I led or shaped; framed as problems solved   |
| **STAR case studies**         | 1–2 structured narratives (Situation, Task, Action, Result)      |
| **Product decisions**         | Decisions about what to build (and what not to) and why          |
| **Technical trade-offs**      | Architecture or implementation decisions with explicit reasoning |
| **What I learned**            | Honest retrospective; what I'd do differently                    |

#### Optional elements

- Minimal diagrams (architecture, system context).
- Clean code snippets where they illustrate a decision.

#### Visitor actions on this page

| Action                  | Target                     |
| ----------------------- | -------------------------- |
| Scroll through sections | Linear reading within page |
| Navigate via navbar     | `/`, `/cv`, `/projects`    |

#### What the visitor should take away

- This person makes thoughtful trade-offs.
- They can frame decisions in terms of business impact.
- They reflect honestly on outcomes.

---

### 4. Projects grid (`/projects`)

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
| Use navbar           | Navigate to `/`, `/cv`, or toggle theme |

#### What the visitor should take away

- A curated set of projects (not an exhaustive list).
- Each project has a clear "why" beyond the technology.

---

### 5. Project detail (`/projects/{slug}`)

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
| Navigate via navbar     | `/`, `/cv`, `/projects`    |

#### What the visitor should take away

- This person thinks about products, not just code.
- They make explicit trade-offs and can articulate why.
- They improve iteratively.

---

### 6. Not found (`404`)

**Purpose**: gracefully handle broken/mistyped URLs.

- Clean, on-brand layout (same navbar + theme).
- Brief message: "This page doesn't exist."
- Single CTA: "Back to home →" (links to `/`).
- No clutter, no jokes — consistent with the site's calm tone.

---

## Content model (Sanity schemas)

These are the core document types that power the pages above.

### Experience

| Field                | Type                   | Notes                                               |
| -------------------- | ---------------------- | --------------------------------------------------- |
| `title`              | string                 | Role title                                          |
| `company`            | string                 | Company name                                        |
| `slug`               | slug                   | URL segment, derived from company + title           |
| `timeline`           | string                 | e.g., "2022 – 2024"                                 |
| `sortOrder`          | number                 | For manual ordering (reverse-chronological default) |
| `impactBullets`      | array of strings       | 4–6 bullets for cv and home preview                 |
| `overview`           | block content          | Role overview (rich text)                           |
| `initiatives`        | array of block content | High-leverage initiatives                           |
| `caseStudies`        | array of objects       | STAR narratives (situation, task, action, result)   |
| `productDecisions`   | block content          | What to build / not build                           |
| `technicalTradeoffs` | block content          | Architecture reasoning                              |
| `learned`            | block content          | Retrospective                                       |
| `featured`           | boolean                | Show on `/cv` and in home page preview              |

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
| `featured`              | boolean          | Show on `/cv` and in home page preview |

---

## Key navigation paths

These are the primary journeys a visitor is likely to take.

### Path A — Experience-first (most common for hiring managers)

```
/  →  click "View CV" CTA
   →  /cv  →  scan role cards
   →  /experience/{slug}  →  read case study
   →  (navbar) /projects  →  browse grid  →  /projects/{slug}
```

### Path B — Projects-first (common for technical peers)

```
/  →  click "Explore Projects" CTA
   →  /projects  →  browse tiles
   →  /projects/{slug}  →  read case study
   →  (navbar) /cv  →  scan roles  →  /experience/{slug}
```

### Path C — Recruiter link (most common for recruiters)

```
/cv  (shared link, direct entry)
   →  scan roles + projects on one page
   →  optionally click a role card  →  /experience/{slug}
   →  close tab (has enough signal)
```

### Path D — Quick scan (time-constrained founder)

```
/  →  read hero + previews  →  click 1 experience bullet
   →  /experience/{slug}  →  skim high-leverage initiatives
   →  close tab (has enough signal)
```

Every path reaches meaningful content within 1–2 clicks. No dead ends.

---

## Interaction summary

| Interaction        | Behaviour                                         |
| ------------------ | ------------------------------------------------- |
| Nav link hover     | Underline slides in (200ms ease-in-out)           |
| Nav active state   | Persistent accent underline                       |
| Role card hover    | Subtle accent tint                                |
| Role card click    | Navigate to `/experience/{slug}`                  |
| Project tile hover | Lift + accent highlight + "See decisions →"       |
| Project tile click | Navigate to `/projects/{slug}`                    |
| GitHub icon click  | Opens external repo in new tab                    |
| CTA button hover   | Background darkens (primary) or fills (secondary) |
| Theme toggle click | Switches light ↔ dark; persists preference        |
| Focus (keyboard)   | 2px accent outline on all interactive elements    |
