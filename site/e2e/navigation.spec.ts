import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test('navbar links navigate to / and /projects', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    // Home link (Clearcraft)
    await nav.getByRole('link', { name: 'Clearcraft' }).click();
    await expect(page).toHaveURL('/');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Frontend leaning fullstack engineer building user-centric products.',
      }),
    ).toBeVisible();

    // Projects link
    await nav.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL('/projects');
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
  });

  test('active page link has accent underline (aria-current)', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    await expect(nav.getByRole('link', { name: 'Projects' })).not.toHaveAttribute(
      'aria-current',
      'page',
    );

    await page.goto('/projects');
    await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('theme toggle switches between light and dark', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggle = page.getByRole('button', { name: 'Toggle theme' });

    // Ensure we start in a known state (clear localStorage)
    await page.evaluate(() => {
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('dark');
    });

    // First click: should add .dark
    await toggle.click();
    await expect(html).toHaveClass(/dark/);

    // Second click: should remove .dark
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);

    // Third click: dark again
    await toggle.click();
    await expect(html).toHaveClass(/dark/);
  });

  test('navigating to non-existent page shows 404', async ({ page }) => {
    const response = await page.goto('/this-page-definitely-does-not-exist-xyz');

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.getByText("This page doesn't exist.")).toBeVisible();
  });
});
