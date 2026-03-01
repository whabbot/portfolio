## Home: Background + Awards + Interests (design)

### Goal
Replace the home “Experience preview” section with a privacy-first summary that provides quick professional context without employer-identifiable detail, while keeping the site projects-forward.

### Content (privacy-first)
- **Background**: 3–5 bullets, each containing generalized employer type + job title + years + brief scope/impact.
- **Awards**: tight list of short labels; avoid dates/venues if they increase identifiability.
- **Interests**: tight list of interests related to how I work / what I like building.
- **LinkedIn callout**: include the line “For full work history and messaging, see LinkedIn →”.

Placeholder copy is acceptable initially; swap to real (generalized) copy later.

### Layout & interaction
- Keep the existing home layout order: `Hero` → **Background/Awards/Interests** → `ProjectsPreview`.
- Use the same container sizing/padding as existing home sections for consistent rhythm.
- Provide a clear, keyboard-accessible external link in the LinkedIn callout (new tab, with screen-reader hint).

### Accessibility
- Semantic headings: one `h2` for the section (“Background”), and `h3` for “Awards” and “Interests”.
- Use `<section aria-label="Background">` so tests and assistive tech can locate the region reliably.

### Testing
- Update Playwright home preview coverage:
  - Remove the experience preview navigation assertion.
  - Add a smoke assertion that the Background region renders and includes the LinkedIn callout link.

