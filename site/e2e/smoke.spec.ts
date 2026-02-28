import { test, expect } from '@playwright/test';

test('home page returns 200 and renders hero', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Frontend leaning fullstack engineer building user-centric products.',
    }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'View CV →' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore Projects →' })).toBeVisible();
});
