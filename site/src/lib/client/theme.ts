export function toggleTheme(): boolean {
  const isDark = document.documentElement.classList.toggle('dark');
  window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
  return isDark;
}

export function initThemeToggles(root: ParentNode = document): void {
  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  for (const button of buttons) {
    if (button.dataset.themeToggleInit !== 'true') {
      button.dataset.themeToggleInit = 'true';
      button.addEventListener('click', toggleTheme);
    }
  }
}
