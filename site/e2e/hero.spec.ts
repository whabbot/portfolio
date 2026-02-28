import { test, expect } from '@playwright/test';

test.describe('home hero', () => {
  test('renders philosophy statement and CTAs', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Frontend leaning fullstack engineer building user-centric products.',
      }),
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'View CV →' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore Projects →' })).toBeVisible();
  });

  test('"View CV →" navigates to /cv', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View CV →' }).click();
    await expect(page).toHaveURL('/cv');
  });

  test('"Explore Projects →" navigates to /projects', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Explore Projects →' }).click();
    await expect(page).toHaveURL('/projects');
  });
});
