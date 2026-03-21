import { describe, expect, it } from 'vitest';

import { playwrightAllProjectSlugs, playwrightAllProjects } from './sanity.fixtures';
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

  it('projects portable text as plain strings for detail pages', () => {
    expect(queries.projectBySlug).toContain('pt::text(problem)');
    expect(queries.projectBySlug).toContain('pt::text(improve)');
  });

  it('orders all projects by sortOrder', () => {
    expect(queries.allProjects).toContain('order(sortOrder asc)');
  });
});

describe('Playwright Sanity fixtures', () => {
  it('keeps slug routes aligned with the project list', () => {
    expect(playwrightAllProjectSlugs.map((row) => row.slug).sort()).toEqual(
      playwrightAllProjects.map((project) => project.slug).sort(),
    );
  });
});
