import { describe, expect, it, beforeEach } from 'vitest';

function setupToggle() {
  document.body.innerHTML = `<button id="theme-toggle">Toggle</button>`;
  const button = document.getElementById('theme-toggle')!;
  button.addEventListener('click', function handleThemeToggle() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  return button;
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('adds .dark class to <html> when clicked in light mode', () => {
    const button = setupToggle();

    button.click();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes .dark class from <html> when clicked in dark mode', () => {
    document.documentElement.classList.add('dark');
    const button = setupToggle();

    button.click();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists "dark" to localStorage when toggling to dark', () => {
    const button = setupToggle();

    button.click();

    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('persists "light" to localStorage when toggling to light', () => {
    document.documentElement.classList.add('dark');
    const button = setupToggle();

    button.click();

    expect(localStorage.getItem('theme')).toBe('light');
  });
});
