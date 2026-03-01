import { test, expect } from '@playwright/test';

test.describe('home previews', () => {
  test('experience preview bullet navigates to correct detail route', async ({ page }) => {
    await page.goto('/');

    const experience = page.getByRole('region', { name: 'Experience preview' });
    await experience
      .getByRole('link', { name: 'Led platform migration reducing deployment time by 60%.' })
      .click();

    await expect(page).toHaveURL('/experience/lead-engineer');
    await expect(page.getByRole('heading', { level: 1, name: 'lead-engineer' })).toBeVisible();
  });

  test('projects preview bullet navigates to correct detail route', async ({ page }) => {
    await page.goto('/');

    const projects = page.getByRole('region', { name: 'Projects preview' });
    await projects.getByRole('link', { name: 'Design system migration' }).click();

    await expect(page).toHaveURL('/projects/design-system');
    await expect(page.getByRole('heading', { level: 1, name: 'design-system' })).toBeVisible();
  });
});
