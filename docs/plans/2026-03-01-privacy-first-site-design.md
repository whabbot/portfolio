## Privacy-first portfolio site — design (2026-03-01)

### Goals
- **Minimize personally identifiable information (PII)** exposed on the public site.
- Make the site **projects-first**, with deep writeups focused on **implementation details and decision-making**.
- Provide a clear path for people who want more work history details to go to **LinkedIn** (which offers messaging + some privacy controls).

### Non-goals
- No public **CV** page.
- No detailed public **experience** case studies per employer.
- No expectation the site replaces LinkedIn for full work history, contact, or networking.

### Privacy boundary (content rules)
- **Employers**: reference in generalized form (e.g. “Fintech scale-up”, “Public sector”, “Consumer SaaS”), not exact company names by default.
- **Employer work**: only brief outlines (company type + job title + years + short scope/impact). Avoid client names, internal system names, sensitive metrics, and identifiable anecdotes.
- **Personal projects**: can include deeper technical detail. Still avoid secrets (keys, internal endpoints, private repos, etc.).
- **Contact**: primary contact surface is **LinkedIn** (link out). Avoid publishing personal email/phone/address.

### Information architecture (recommended)
**Pages**
- `/` (Home)
- `/projects` (Personal projects index)
- `/projects/<slug>` (Personal project detail)
- (No `/cv`, no `/experience/...`)

**Global navigation**
- Primary link: **Projects**
- Optional: no additional nav items for now (Background/Awards/Interests live on Home).

**Footer**
- External links: LinkedIn (primary), GitHub (optional), writing/blog (optional).

### Home page design (`/`)
Order is **projects-forward** while still including brief professional context.

1) **Positioning (2 lines max)**
- A short statement about the kind of engineer you are and what you build.
- Avoid name/location/employer names.

2) **Selected personal projects (preview)**
- 3–5 items linking to `/projects/<slug>`.
- Each item: project name + 6–10 word “why/what” teaser.

3) **Background / Experience (brief)**
- 3–5 bullets; each bullet:
  - Company type (generalized)
  - Job title
  - Years (e.g. “2021–2024”)
  - 1–2 lines about scope and the kind of outcomes (avoid overly specific metrics if sensitive)
- This section does **not** link to dedicated employer-project pages.

4) **Awards (brief)**
- List format; short labels only.
- Optionally omit dates/venues if they increase identifiability.

5) **Interests (brief)**
- Short list of interests relevant to how you work / what you like building.

6) **LinkedIn callout**
- Clear CTA: “For full work history and messaging, see LinkedIn →”

### Projects section (personal projects only)
**Projects index (`/projects`)**
- Grid/list of personal projects.
- Each tile: title, 1–2 sentence summary, tech tags, optional GitHub/demo links.

**Project detail template (`/projects/<slug>`)**
- Problem
- Constraints
- Architecture / Key decisions (the “why”)
- Trade-offs (what you rejected and why)
- Implementation notes (high signal, no secrets)
- Outcomes (careful with sensitive numbers; prefer qualitative outcomes if needed)
- What I’d improve next

### Implications for the current codebase
- Remove or repurpose:
  - `/cv` route and navigation link
  - `/experience/[slug]` route and any home-page “Experience preview” section
- Update Playwright tests that currently assert `/cv` and experience navigation.
- Home page should preview **personal projects** and include **background bullets** directly on `/`.

### Open questions (deferred)
- Whether to keep any non-LinkedIn contact method (e.g. a simple email alias) — deferred.
- Whether to add an `/about` page — deferred (decision: keep background on home for now).

