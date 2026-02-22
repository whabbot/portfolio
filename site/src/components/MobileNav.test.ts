import { beforeEach, describe, expect, it } from 'vitest';
import { initMobileNav } from '../lib/client/mobile-nav';

function setupDom() {
  document.body.innerHTML = `
    <div data-mobile-nav-root>
      <button
        type="button"
        data-mobile-nav-toggle
        aria-controls="mobile-nav-panel"
        aria-expanded="false"
        aria-label="Open menu"
      >
        Menu
      </button>

      <div id="mobile-nav-panel" data-mobile-nav-panel hidden>
        <button type="button" data-mobile-nav-close aria-label="Close menu">Close</button>
        <a href="/cv" data-mobile-nav-link>CV</a>
      </div>
    </div>
  `;
}

function getElements() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-mobile-nav-toggle]')!;
  const panel = document.querySelector<HTMLElement>('[data-mobile-nav-panel]')!;
  const close = document.querySelector<HTMLButtonElement>('[data-mobile-nav-close]')!;
  const link = document.querySelector<HTMLAnchorElement>('[data-mobile-nav-link]')!;
  return { toggle, panel, close, link };
}

function setupMobileNav() {
  setupDom();
  initMobileNav(document);
  return getElements();
}

function expectClosed(toggle: HTMLButtonElement, panel: HTMLElement) {
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(panel).toHaveProperty('hidden', true);
}

function expectOpen(toggle: HTMLButtonElement, panel: HTMLElement) {
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(panel).toHaveProperty('hidden', false);
}

describe('MobileNav', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('toggles open/close state and keeps ARIA attributes in sync', () => {
    const { toggle, panel, close } = setupMobileNav();

    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav-panel');
    expectClosed(toggle, panel);

    toggle.click();
    expectOpen(toggle, panel);

    close.click();
    expectClosed(toggle, panel);
  });

  it('closes when a link inside the panel is clicked', () => {
    const { toggle, panel, link } = setupMobileNav();

    toggle.click();
    expectOpen(toggle, panel);

    link.addEventListener('click', (event) => event.preventDefault());
    link.click();
    expectClosed(toggle, panel);
  });
});
