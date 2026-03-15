## Sanity: Background schema (6.2) — design

### Goal
Add a Sanity document type for “brief background” experience items (no deep-dive pages), so the portfolio can render a privacy-first experience summary from CMS data.

### Key decisions
- **Timeline as structured dates**: Use `startDate` + optional `endDate` for sorting/querying, with an optional `timelineLabel` string override for fuzzy ranges (e.g., “Summer 2021”).
- **Data > presentation**: Field names reflect what the content is, not how it renders.
- **Manual ordering**: Keep `sortOrder` as the primary ordering control.

### Schema shape
Document type: `background` (“Background Item”)

Fields:
- `employerType` (string, required): generalized employer label (e.g., “Series A B2B SaaS”)
- `jobTitle` (string, required)
- `startDate` (date, required)
- `endDate` (date, optional; must be >= `startDate` when set)
- `timelineLabel` (string, optional): display override for the timeline
- `summary` (text, required): short 1–2 sentence overview (with a max-length warning)
- `bullets` (array of strings, required): 1+ bullets, unique, with a max-length warning
- `sortOrder` (number, required): used to order items

### Studio UX
- Provide an icon from `@sanity/icons` for quick scanning.
- Preview title: `jobTitle`
- Preview subtitle: `employerType` + computed timeline (use `timelineLabel` if present; else derive from dates).
- Provide an ordering option by `sortOrder` ascending.

### Validation rules
- Required: `employerType`, `jobTitle`, `startDate`, `summary`, `bullets`, `sortOrder`
- `endDate` custom validation ensures it is not before `startDate`
- `bullets` uses `min(1)` + `unique()`

### Verification
- Studio compiles: `cd sanity && npm run build`

