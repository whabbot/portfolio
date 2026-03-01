import { test, expect } from '@playwright/test';

test.describe('home hero', () => {
  test('renders philosophy statement and CTAs', async ({ page }) => {
    await page.goto('/');

    const hero = page.getByRole('region', { name: 'Hero' });

    await expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'Frontend leaning fullstack engineer building user-centric products.',
      }),
    ).toBeVisible();

    await expect(hero.getByRole('link', { name: 'Explore Projects →' })).toBeVisible();
    await expect(hero.getByRole('link', { name: /LinkedIn →/ })).toBeVisible();
  });

  test('"Explore Projects →" navigates to /projects', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('region', { name: 'Hero' })
      .getByRole('link', { name: 'Explore Projects →' })
      .click();
    await expect(page).toHaveURL('/projects');
  });

  test('"LinkedIn →" opens in a new tab', async ({ page }) => {
    await page.goto('/');

    const hero = page.getByRole('region', { name: 'Hero' });

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      hero.getByRole('link', { name: /LinkedIn →/ }).click(),
    ]);

    await expect(popup).toHaveURL(/^https:\/\/(www\.)?linkedin\.com/);
  });
});
