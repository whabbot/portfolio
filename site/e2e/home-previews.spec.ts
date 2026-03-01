import { test, expect } from '@playwright/test';

test.describe('home previews', () => {
  test('background renders and includes LinkedIn callout', async ({ page }) => {
    await page.goto('/');

    const background = page.getByRole('region', { name: 'Background' });
    await expect(background).toBeVisible();

    await expect(
      background.getByRole('link', { name: /LinkedIn/ }),
      'Expected LinkedIn callout link in Background section',
    ).toHaveAttribute('target', '_blank');
  });

  test('projects preview bullet navigates to correct detail route', async ({ page }) => {
    await page.goto('/');

    const projects = page.getByRole('region', { name: 'Projects preview' });
    await projects.getByRole('link', { name: 'Design system migration' }).click();

    await expect(page).toHaveURL('/projects/design-system');
    await expect(page.getByRole('heading', { level: 1, name: 'design-system' })).toBeVisible();
  });
});
