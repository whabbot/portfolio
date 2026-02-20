# Clearcraft — Design Guidelines

> How the site looks, feels, and behaves.
> This is the reference for every visual and interaction decision.

---

## Design philosophy

The site should feel like a **product engineer's workspace** — calm, structured, intentional, and quietly expressive.

- **Signal over decoration.** Every visual element earns its place by clarifying hierarchy or guiding attention.
- **Warm restraint.** Subtle expressiveness (slight asymmetry, gentle accents) but never loud or trendy.
- **Precision without rigidity.** Clean grids with occasional rhythm variation; never chaotic.
- **Mobile-first design.**

If it doesn't help the visitor understand judgment, impact, or decision quality within 60 seconds, reconsider it.

---

## Typography

### Font stack

- **Primary**: humanist sans-serif (Inter or equivalent). Warm, readable, professional.
- **Monospace**: used only where semantically meaningful (code snippets, tech tags). JetBrains Mono or similar.

### Scale & weights

| Role            | Size            | Weight         | Notes                                 |
| --------------- | --------------- | -------------- | ------------------------------------- |
| H1              | 2.25rem (36px)  | Medium (500)   | Spacious tracking; used once per page |
| H2              | 1.5rem (24px)   | Semibold (600) | Section anchors; clear hierarchy step |
| H3              | 1.25rem (20px)  | Semibold (600) | Sub-sections within detail pages      |
| Body            | 1rem (16px)     | Regular (400)  | Primary reading text                  |
| Small / caption | 0.875rem (14px) | Regular (400)  | Meta info, tags, timestamps           |
| Nav links       | 0.875rem (14px) | Medium (500)   | Uppercase tracking optional           |
| Name (navbar)   | 1.125rem (18px) | Medium (500)   | Slightly larger than nav links        |

### Rhythm

- Line-height: **1.6** minimum for body text; **1.3** for headings.
- Paragraph spacing: **1.5em** between paragraphs.
- No oversized dramatic type. Headings feel calm and anchoring.

---

## Colour system

Colours are defined as CSS custom properties on `:root` (light) and `.dark` (dark), consumed via Tailwind's `theme()` or utility classes.

### Light theme

| Token                     | Value     | Usage                                 |
| ------------------------- | --------- | ------------------------------------- |
| `--color-bg`              | `#FAFAF9` | Page background                       |
| `--color-bg-surface`      | `#FFFFFF` | Cards, elevated surfaces              |
| `--color-text`            | `#1F2937` | Primary text                          |
| `--color-text-muted`      | `#6B7280` | Secondary/caption text                |
| `--color-primary`         | `#4F46E5` | Links, primary CTA, active indicators |
| `--color-accent-warm`     | `#F59E0B` | Warm accent (experience sections)     |
| `--color-accent-creative` | `#14B8A6` | Creative accent (project sections)    |
| `--color-border`          | `#E5E7EB` | Subtle dividers and card borders      |

### Dark theme

| Token                     | Value     | Usage                                            |
| ------------------------- | --------- | ------------------------------------------------ |
| `--color-bg`              | `#111111` | Page background                                  |
| `--color-bg-surface`      | `#1A1A1A` | Cards, elevated surfaces                         |
| `--color-text`            | `#E5E7EB` | Primary text                                     |
| `--color-text-muted`      | `#9CA3AF` | Secondary/caption text                           |
| `--color-primary`         | `#818CF8` | Links, primary CTA (lighter indigo for contrast) |
| `--color-accent-warm`     | `#FBBF24` | Warm accent (slightly boosted for dark bg)       |
| `--color-accent-creative` | `#2DD4BF` | Creative accent (boosted)                        |
| `--color-border`          | `#2A2A2A` | Subtle dividers and card borders                 |

### Rules

- **One accent per section.** Experience sections use warm; project sections use creative. Primary for navigation and CTAs.
- **WCAG AA minimum** on every text/background combination in both themes.
- **No stacked colour chaos.** Accents guide hierarchy; they never compete.
- Transitions between themes should be smooth (`transition: color 200ms, background-color 200ms`).

### Theme switching

- Respect `prefers-color-scheme` on first visit.
- Manual toggle in navbar; preference persisted in `localStorage`.
- Blocking inline `<script>` in `<head>` applies the `.dark` class before first paint (no flash).

---

## Layout & spacing

### Grid

- **8pt base grid.** All spacing values are multiples of 8px (0.5rem).
- Common spacing values: `8 | 16 | 24 | 32 | 48 | 64 | 96`.

### Container

- Max-width: **56rem (~896px)** for content.
- Horizontal padding: `1.5rem` (mobile) / `2rem` (desktop).
- Centred with `mx-auto`.

### Vertical rhythm

- Generous vertical spacing between sections (min `4rem`).
- Slight rhythm variation in hero and preview sections for gentle expressiveness.
- Detail pages use consistent section spacing for scanability.

### Responsive breakpoints

| Breakpoint | Width      | Notes                                              |
| ---------- | ---------- | -------------------------------------------------- |
| Mobile     | < 640px    | Single column; stacked nav                         |
| Tablet     | 640–1024px | Content container; may use 2-col grid for projects |
| Desktop    | > 1024px   | Full layout; max-width container centred           |

---

## Component inventory

### Navbar

- **Left**: name (medium weight, slightly larger than links).
- **Right**: CV, Projects links + theme toggle icon.
- **Active page**: persistent accent underline.
- **Hover**: soft underline slide animation (200ms ease-in-out).
- **Mobile**: collapsible menu (Astro component with inline script for toggle).
- Sticky top; subtle border-bottom or shadow on scroll.

### Hero (home page)

- 2–3 line narrative philosophy statement.
- Primary CTA ("View CV") + secondary CTA ("Explore Projects").
- Slight layout asymmetry (e.g., off-centre text, accent shape behind a line).
- No oversized dramatic typography.
- Generous whitespace above and below.

### Section preview (home page)

- Section heading links to the relevant overview page.
- 3–5 impact-driven bullets; each links to a detail page.
- Subtle staggered rhythm (slight offset or varied spacing) — expressive but controlled.

### CV page (`/cv`)

- Brief intro block: name, title, 1–2 sentence positioning. Clean and compact.
- Reuses **role card** component for curated experience entries.
- Reuses **project tile** component for curated project entries (same visual language as `/projects`).
- "View all projects →" link at projects section bottom.
- Optional compact skills section: grouped tag pills, muted styling.
- Page should feel **self-contained** — a recruiter should get a full picture without clicking further.
- No hero block or narrative statement (that's the home page's job). Straight to substance.

### Role card (`/cv`)

- Role title, company, timeline.
- 4–6 impact bullets.
- Soft left accent stripe (warm accent).
- No heavy card borders; relies on spacing and the accent stripe.
- Entire card clickable to detail page.

### Project tile (`/projects`)

- Title, short product-oriented description.
- GitHub link (icon), tech tags (pills).
- Click → detail page.
- Hover: subtle lift (`translateY(-2px)`), soft accent highlight, "See decisions →" microcopy fades in.

### Detail page sections (experience + project)

- Repeatable structure: heading + body content per section.
- Optional slots for diagrams and code snippets (monospace, lightly shaded background).
- Clear section dividers (whitespace or thin rule, not heavy borders).
- Accent stripe on left of key sections (varies by context: warm for experience, creative for projects).

### Tag / pill

- Small, rounded, muted background.
- Used for tech tags on project tiles and detail pages.
- No bold colours; legible but not attention-grabbing.

### Buttons / CTAs

- Primary: filled with `--color-primary`; white text; subtle hover darkening.
- Secondary: outlined or ghost; primary-coloured text; subtle hover fill.
- Border-radius: `0.375rem` (6px) — slightly rounded, never pill-shaped.
- Padding follows 8pt grid.

---

## Motion & interaction

### Principles

- Motion is **intelligent and restrained**. It confirms actions and guides attention; it never entertains.
- No parallax, no scroll-jacking, no heavy entrance animations.

### Defaults

| Property         | Value                                 |
| ---------------- | ------------------------------------- |
| Duration         | 200–250ms                             |
| Easing           | `ease-in-out`                         |
| Hover lift       | `translateY(-2px)` + subtle shadow    |
| Underline expand | Width animates from 0 to 100%         |
| Theme transition | `color 200ms, background-color 200ms` |

### Hover states

- **Links**: soft underline slide-in + subtle accent tint on text.
- **Cards / tiles**: gentle lift + faint shadow increase.
- **Buttons**: background darkens (primary) or fills (secondary).

### Focus states

- Visible `outline` (2px, offset, primary colour) on all interactive elements.
- Never removed; styled to feel intentional, not browser-default.

---

## Iconography

- Minimal icon use. Icons supplement text; they never replace it.
- Source: Lucide (pairs naturally with shadcn/ui).
- Style: outlined, 20px default, stroke 1.5px.
- Icons for: GitHub link, external link, theme toggle (sun/moon), mobile menu (hamburger/close).

---

## Voice & microcopy

### Tone

Calm, product-aware, direct. No hype, no buzzwords, no ego.

### Vocabulary

Use:

- "High-leverage initiatives"
- "Design decisions"
- "Trade-offs"
- "Impact"
- "What I'd improve"
- "See decisions →"

Avoid:

- "Passionate about…"
- "Full-stack ninja"
- "Cutting-edge"
- Exclamation marks in UI copy

### Link text

Always descriptive. Never "click here." Prefer verbs:

- "View experience →"
- "Explore projects →"
- "See decisions →"

---

## Accessibility

### Structure

- Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Headings in order (no skipped levels).
- Landmark roles for screen readers.

### Keyboard

- All interactive elements reachable via Tab.
- Grids and card lists navigable with arrow keys where appropriate.
- Focus states always visible (see Motion & interaction).

### Colour

- WCAG AA contrast minimum on all text/background pairs in both themes.
- Accent colours never used as the sole indicator of meaning (always paired with text or shape).

### ARIA

- Labels on icon-only buttons (theme toggle, mobile menu, GitHub links).
- `aria-current="page"` on active nav link.
- Live regions for dynamic content only if/when added.

### Images

- All meaningful images have descriptive `alt` text.
- Decorative elements use `alt=""` or `aria-hidden="true"`.

---

## Design integrity checklist

Before shipping any page, verify:

- [ ] Does this communicate judgment quickly?
- [ ] Is signal prioritised over decoration?
- [ ] Are expressive elements subtle, not distracting?
- [ ] Does the page feel calm and structured in both light and dark modes?
- [ ] Would a founder trust this person with ambiguity after reading it?
- [ ] Does every accent colour earn its place?
- [ ] Are focus states visible and intentional?
- [ ] Does the page pass WCAG AA in both themes?
