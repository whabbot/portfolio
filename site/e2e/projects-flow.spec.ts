import { test, expect } from '@playwright/test';

const CASE_STUDY_SECTIONS = [
  'Problem',
  'Why It Mattered',
  'Constraints',
  'Architecture Decisions',
  'Trade-offs',
  'Outcomes',
  "What I'd Improve",
] as const;

test.describe('projects flow', () => {
  test('/projects renders a grid of project tiles', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();

    const main = page.getByRole('main');
    const projectOverlayLinks = main.getByRole('link', { name: /^Open project:/ });
    const count = await projectOverlayLinks.count();

    expect(count, 'Expected at least one project tile on /projects').toBeGreaterThan(0);

    const titles = await Promise.all(
      [...Array.from({ length: count }, (element, tileIndex) => tileIndex)].map(
        async (tileIndex) => {
          const label = await projectOverlayLinks.nth(tileIndex).getAttribute('aria-label');
          return label?.replace(/^Open project:\s*/, '').trim();
        },
      ),
    );

    await Promise.all(
      titles.map((title) => {
        expect(title).toBeTruthy();
        return expect(main.getByRole('heading', { level: 3, name: title! })).toBeVisible();
      }),
    );
  });

  test('clicking a tile navigates to /projects/{slug}', async ({ page }) => {
    await page.goto('/projects');

    const overlay = page.getByRole('link', { name: /^Open project:/ }).first();
    const href = await overlay.getAttribute('href');
    expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/);

    await overlay.click();

    await expect(page).toHaveURL(href!);
    await expect(page.locator('main h1')).toBeVisible();
  });

  test('project detail page renders all expected sections', async ({ page }) => {
    await page.goto('/projects');

    const href = await page
      .getByRole('link', { name: /^Open project:/ })
      .first()
      .getAttribute('href');
    expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/);

    await page.goto(href!);

    await Promise.all(
      CASE_STUDY_SECTIONS.map((section) =>
        expect(page.getByRole('heading', { level: 2, name: section })).toBeVisible(),
      ),
    );
  });

  test('GitHub icon link opens in new tab', async ({ page }) => {
    await page.goto('/projects');

    const githubLink = page.getByRole('link', { name: 'View source on GitHub' }).first();

    await expect(githubLink, 'Expected at least one project tile with a GitHub link').toBeVisible();

    await expect(githubLink).toHaveAttribute('target', '_blank');

    const expectedUrl = await githubLink.getAttribute('href');
    expect(expectedUrl).toMatch(/^https:\/\//);

    const [popup] = await Promise.all([page.waitForEvent('popup'), githubLink.click()]);
    await expect(popup).toHaveURL(expectedUrl!);
  });
});
