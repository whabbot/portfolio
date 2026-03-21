import { defineConfig, devices } from '@playwright/test';

/** Dedicated port so `astro dev` on 4321 does not block Playwright's preview server. */
const e2eBaseUrl = 'http://localhost:4322';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: e2eBaseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // E2E uses a static preview build. Sanity is read at build time on the server, so we inject
  // `PLAYWRIGHT_MOCK_SANITY=1` (see `src/lib/sanity.ts` + `sanity.fixtures.ts`), not browser routing.
  webServer: {
    command: 'npm run build && npm run preview -- --port 4322',
    url: e2eBaseUrl,
    reuseExistingServer: process.env.PW_REUSE_EXISTING_SERVER === '1',
    env: {
      PLAYWRIGHT_MOCK_SANITY: '1',
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ?? 'playwright-mock',
      SANITY_DATASET: process.env.SANITY_DATASET ?? 'mock',
      SANITY_API_VERSION: process.env.SANITY_API_VERSION ?? '2024-01-01',
    },
  },
});
