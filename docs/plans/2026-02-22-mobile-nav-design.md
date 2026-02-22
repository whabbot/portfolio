# MobileNav (Phase 1.4) — Design

## Goal

Add a mobile navigation menu for screens below 640px that:

- Provides the same primary links as the desktop navbar (CV, Projects)
- Includes a second theme toggle inside the menu
- Uses simple client-side state (class/attribute swap), no React islands
- Meets basic accessibility requirements (ARIA + keyboard)

## UX / UI

- **Entry point**: a hamburger icon button in the navbar on mobile (`sm:hidden`).
- **Open state**: full-screen overlay with a right-side panel.
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

- `src/components/MobileNav.astro`
  - Renders the button + overlay/panel markup
  - Uses `data-*` hooks and a small client initializer (`initMobileNav`) to toggle `hidden` and ARIA state
- `src/lib/client/mobile-nav.ts`
  - Idempotent initializer that wires click handlers for toggle, close, and link clicks
- `src/components/ThemeToggle.astro`
  - Uses a `data-theme-toggle` hook so multiple instances can exist (desktop + mobile)
  - Idempotent initializer to attach click handlers once

## Testing

- **Unit** (Vitest/jsdom):
  - MobileNav: open/close toggling, `aria-expanded`, `aria-controls`, closes on link click
  - ThemeToggle: supports multiple buttons and persists preference to `localStorage`

