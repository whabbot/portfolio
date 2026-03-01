/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';
import { resolve } from 'node:path';

export default getViteConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
