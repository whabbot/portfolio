import { describe, expect, it } from 'vitest';

import { queries } from './sanity';

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
