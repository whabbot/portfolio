import { test, expect } from '@playwright/test';

const projects = [
  {
    slug: 'design-system',
    title: 'Design system migration',
    githubUrl: 'https://github.com/clearcraft/design-system-migration',
  },
  {
    slug: 'checkout-flow',
    title: 'Checkout flow optimisation',
    githubUrl: 'https://github.com/clearcraft/checkout-flow-optimisation',
  },
  {
    slug: 'api-gateway',
    title: 'API gateway redesign',
    githubUrl: 'https://github.com/clearcraft/api-gateway-redesign',
  },
  {
    slug: 'analytics-dashboard',
    title: 'Analytics dashboard v2',
    githubUrl: 'https://github.com/clearcraft/analytics-dashboard-v2',
  },
] as const;

test.describe('projects flow', () => {
  test('/projects renders a grid of project tiles', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();

    const main = page.getByRole('main');
    await expect(main.getByRole('link', { name: /^Open project:/ })).toHaveCount(projects.length);

    for (const project of projects) {
      // oxlint-disable-next-line no-await-in-loop
      await expect(main.getByRole('heading', { level: 3, name: project.title })).toBeVisible();
    }
  });

  test('clicking a tile navigates to /projects/{slug}', async ({ page }) => {
    const project = projects[0];

    await page.goto('/projects');
    await page.getByRole('link', { name: `Open project: ${project.title}` }).click();

    await expect(page).toHaveURL(`/projects/${project.slug}`);
    await expect(page.getByRole('heading', { level: 1, name: project.title })).toBeVisible();
  });

  test('project detail page renders all expected sections', async ({ page }) => {
    await page.goto(`/projects/${projects[0].slug}`);

    for (const section of [
      'Problem',
      'Why It Mattered',
      'Constraints',
      'Architecture Decisions',
      'Trade-offs',
      'Outcomes',
      "What I'd Improve",
    ] as const) {
      // oxlint-disable-next-line no-await-in-loop
      await expect(page.getByRole('heading', { level: 2, name: section })).toBeVisible();
    }
  });

  test('GitHub icon link opens in new tab', async ({ page }) => {
    const project = projects[0];

    await page.goto('/projects');

    const tile = page.locator('article').filter({
      has: page.getByRole('heading', { level: 3, name: project.title }),
    });
    const githubLink = tile.getByRole('link', { name: 'View source on GitHub' });

    await expect(githubLink).toHaveAttribute('target', '_blank');

    const [popup] = await Promise.all([page.waitForEvent('popup'), githubLink.click()]);
    await expect(popup).toHaveURL(project.githubUrl);
  });
});
