import { test, expect } from '@playwright/test';

test('home page returns 200 and renders heading', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Clearcraft', level: 1 })).toBeVisible();
});
