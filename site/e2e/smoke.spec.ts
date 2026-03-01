import { test, expect } from '@playwright/test';

test('home page returns 200 and renders hero', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);

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
