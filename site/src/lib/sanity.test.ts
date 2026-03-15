import { describe, expect, it } from 'vitest';

import { getSanityConfigFromEnv, queries } from './sanity';

describe('sanity config', () => {
  it('throws if required env vars are missing', () => {
    expect(() => getSanityConfigFromEnv({})).toThrow(/SANITY_PROJECT_ID/i);
  });

  it('defaults to useCdn=true', () => {
    const config = getSanityConfigFromEnv({
      SANITY_PROJECT_ID: '8t2zlu0f',
      SANITY_DATASET: 'production',
      SANITY_API_VERSION: '2026-03-15',
    });

    expect(config).toMatchObject({
      projectId: '8t2zlu0f',
      dataset: 'production',
      apiVersion: '2026-03-15',
      useCdn: true,
    });
  });
});

describe('sanity queries', () => {
  it('orders background items by sortOrder', () => {
    expect(queries.backgroundItems).toContain('order(sortOrder asc)');
  });

  it('filters featured projects', () => {
    expect(queries.featuredProjects).toContain('featured == true');
  });

  it('queries a project by slug param', () => {
    expect(queries.projectBySlug).toContain('slug.current == $slug');
  });
});
