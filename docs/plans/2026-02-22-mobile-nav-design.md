# MobileNav (Phase 1.4) — Design

## Goal

Add a mobile navigation menu for screens below 640px that:

- Provides the same primary links as the desktop navbar (CV, Projects)
- Includes a second theme toggle inside the menu
- Uses a shadcn/Radix-style “Sheet” (React) for robust dialog behavior (focus, ESC, outside click)
- Meets basic accessibility requirements (ARIA + keyboard)

## UX / UI

- **Entry point**: a hamburger icon button in the navbar on mobile (`sm:hidden`).
- **Open state**: full-screen overlay with a left-side sheet panel.
- **Content**:
  - Links list (CV, Projects), with active link using `aria-current="page"`.
  - Theme row with the existing `ThemeToggle` button.
- **Dismissal**:
  - Close button in the panel header
  - Clicking a nav link closes the menu (navigation continues normally)
  - Clicking the overlay backdrop closes the menu

## Accessibility

- **Hamburger button**:
  - `aria-expanded` reflects open/closed state
  - `aria-controls` points at the menu panel container
  - `aria-label` describes the action (“Open menu”)
- **Close controls**:
  - Close button(s) have `aria-label="Close menu"`

## Implementation approach

- `site/src/components/MobileNav.tsx`
  - React component implemented using a shadcn-style sheet wrapper
  - Hydrated only on mobile via `client:media="(max-width: 639px)"`
- `site/src/components/ui/sheet.tsx`
  - Wrapper around `@radix-ui/react-dialog` (overlay + content + header/title/description)
- `site/src/components/ThemeToggleButton.tsx`
  - React theme toggle button (mobile drawer) that uses shared theme logic
- `site/src/components/ThemeToggle.astro`
  - Desktop theme toggle (Astro); shares the same `.dark` + `localStorage` logic

## Testing

- **Unit** (Vitest/jsdom):
  - MobileNav (React): opens/closes via trigger, closes on backdrop click, closes on link click
  - ThemeToggle: supports multiple buttons and persists preference to `localStorage`

