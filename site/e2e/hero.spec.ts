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

    await expect(page.getByRole('link', { name: 'Explore Projects →' })).toBeVisible();
    await expect(page.getByRole('link', { name: /LinkedIn →/ })).toBeVisible();
  });

  test('"Explore Projects →" navigates to /projects', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Explore Projects →' }).click();
    await expect(page).toHaveURL('/projects');
  });

  test('"LinkedIn →" opens in a new tab', async ({ page }) => {
    await page.goto('/');

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: /LinkedIn →/ }).click(),
    ]);

    await expect(popup).toHaveURL(/^https:\/\/(www\.)?linkedin\.com/);
  });
});
