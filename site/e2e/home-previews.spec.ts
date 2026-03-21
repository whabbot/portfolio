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

  test('projects preview bullet navigates to a project detail route', async ({ page }) => {
    await page.goto('/');

    const projects = page.getByRole('region', { name: 'Projects preview' });
    const firstLink = projects.getByRole('list').getByRole('link').first();

    await expect(
      firstLink,
      'Expected at least one featured project link on the home preview',
    ).toBeVisible();

    const href = await firstLink.getAttribute('href');
    expect(href, 'Project preview link should point at /projects/{slug}').toMatch(
      /^\/projects\/[a-z0-9-]+$/,
    );

    const title = (await firstLink.textContent())?.trim();
    expect(title).toBeTruthy();

    await firstLink.click();

    await expect(page).toHaveURL(href!);
    await expect(page.getByRole('heading', { level: 1, name: title! })).toBeVisible();
  });
});
