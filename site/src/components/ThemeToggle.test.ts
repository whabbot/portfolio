import { beforeEach, describe, expect, it } from 'vitest';
import { initThemeToggles } from '../lib/client/theme';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    window.localStorage.clear();
    document.body.innerHTML = '';
  });

  it('adds .dark class to <html> when clicked in light mode', () => {
    document.body.innerHTML = `<button data-theme-toggle>Toggle</button>`;
    initThemeToggles(document);
    const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;

    button.click();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes .dark class from <html> when clicked in dark mode', () => {
    document.documentElement.classList.add('dark');
    document.body.innerHTML = `<button data-theme-toggle>Toggle</button>`;
    initThemeToggles(document);
    const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;

    button.click();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists "dark" to localStorage when toggling to dark', () => {
    document.body.innerHTML = `<button data-theme-toggle>Toggle</button>`;
    initThemeToggles(document);
    const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;

    button.click();

    expect(window.localStorage.getItem('theme')).toBe('dark');
  });

  it('persists "light" to localStorage when toggling to light', () => {
    document.documentElement.classList.add('dark');
    document.body.innerHTML = `<button data-theme-toggle>Toggle</button>`;
    initThemeToggles(document);
    const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;

    button.click();

    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  it('supports multiple toggle buttons on the same page', () => {
    document.body.innerHTML = `
      <button data-theme-toggle>Toggle 1</button>
      <button data-theme-toggle>Toggle 2</button>
    `;
    initThemeToggles(document);

    const [first, second] = Array.from(
      document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]'),
    );

    first.click();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('theme')).toBe('dark');

    second.click();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem('theme')).toBe('light');
  });
});
