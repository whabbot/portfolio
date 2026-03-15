// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import { loadEnv } from 'vite';

import sanity from '@sanity/astro';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      apiVersion: env.SANITY_API_VERSION,
      useCdn: true,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      SANITY_PROJECT_ID: envField.string({ context: 'server', access: 'public' }),
      SANITY_DATASET: envField.string({ context: 'server', access: 'public' }),
      SANITY_API_VERSION: envField.string({ context: 'server', access: 'public' }),
    },
  },
});
