import { describe, expect, it } from 'vitest';

import {
  formatYearRange,
  normalizeBackgroundPreviewLines,
  normalizeProjectCard,
  normalizeProjectCards,
  normalizeProjectDetailPage,
  toBackgroundPreviewLine,
} from './mappers';

describe('formatYearRange', () => {
  it('prefers the timelineLabel override when present', () => {
    expect(
      formatYearRange({
        startDate: '2021-01-01',
        endDate: '2024-01-01',
        timelineLabel: ' Summer 2021 ',
      }),
    ).toBe('Summer 2021');
  });

  it('formats a start and end date as a year range', () => {
    expect(
      formatYearRange({
        startDate: '2021-06-15',
        endDate: '2024-01-01',
      }),
    ).toBe('2021–2024');
  });

  it('formats an ongoing role as start year to Present', () => {
    expect(
      formatYearRange({
        startDate: '2021-06-15',
      }),
    ).toBe('2021–Present');
  });

  it('returns undefined if startDate is missing or invalid', () => {
    expect(formatYearRange({})).toBeUndefined();
    expect(formatYearRange({ startDate: 'not-a-date' })).toBeUndefined();
  });
});

describe('background preview normalization', () => {
  it('formats a background preview line in the existing homepage style', () => {
    expect(
      toBackgroundPreviewLine({
        employerType: 'Fintech scale-up',
        jobTitle: 'Senior frontend engineer',
        startDate: '2021-01-01',
        endDate: '2024-01-01',
        summary: 'Built product UI with an emphasis on performance.',
      }),
    ).toBe(
      'Fintech scale-up · Senior frontend engineer · 2021–2024 — Built product UI with an emphasis on performance.',
    );
  });

  it('drops invalid items and keeps valid ones', () => {
    const lines = normalizeBackgroundPreviewLines([
      null,
      { employerType: 'Public sector', jobTitle: 'Fullstack engineer', startDate: '2019-01-01' },
      {
        employerType: 'B2B SaaS',
        jobTitle: 'Frontend engineer',
        startDate: '2017-01-01',
        endDate: '2019-01-01',
        summary: 'Scaled design patterns.',
      },
    ]);

    expect(lines).toEqual(['B2B SaaS · Frontend engineer · 2017–2019 — Scaled design patterns.']);
  });
});

describe('project card normalization', () => {
  it('returns null when required fields are missing', () => {
    expect(normalizeProjectCard(null)).toBeNull();
    expect(normalizeProjectCard({ title: 'x', description: 'y' })).toBeNull();
    expect(normalizeProjectCard({ slug: 'x', description: 'y' })).toBeNull();
  });

  it('normalizes optional URLs and tech tags', () => {
    expect(
      normalizeProjectCard({
        slug: 'design-system',
        title: 'Design system migration',
        description: 'Migrated components',
        techTags: ['Astro', ' Astro ', '', null, 'TypeScript', 'Astro'],
        githubUrl: ' https://github.com/example/repo ',
        demoUrl: '',
      }),
    ).toEqual({
      slug: 'design-system',
      title: 'Design system migration',
      description: 'Migrated components',
      techTags: ['Astro', 'TypeScript'],
      githubUrl: 'https://github.com/example/repo',
      demoUrl: undefined,
    });
  });

  it('filters to valid cards when normalizing a list', () => {
    expect(
      normalizeProjectCards([
        { slug: 'ok', title: 'A', description: 'B', techTags: ['x'] },
        { slug: '', title: 'bad', description: 'B' },
        { slug: 'ok-2', title: 'C', description: 'D', techTags: 'nope' },
      ]),
    ).toEqual([
      {
        slug: 'ok',
        title: 'A',
        description: 'B',
        techTags: ['x'],
        githubUrl: undefined,
        demoUrl: undefined,
      },
      {
        slug: 'ok-2',
        title: 'C',
        description: 'D',
        techTags: [],
        githubUrl: undefined,
        demoUrl: undefined,
      },
    ]);
  });
});

describe('normalizeProjectDetailPage', () => {
  it('returns null when required fields are missing', () => {
    expect(normalizeProjectDetailPage(null)).toBeNull();
    expect(normalizeProjectDetailPage({ title: 'x', slug: 'y' })).toBeNull();
  });

  it('uses CMS plain text when present and marks architecture with accent', () => {
    const detail = normalizeProjectDetailPage({
      title: 'Example',
      slug: 'example',
      description: 'Short summary for the hero line.',
      problemPlain: 'Real problem copy.',
      architectureDecisionsPlain: 'Key decision.',
    });

    expect(detail).not.toBeNull();
    expect(detail?.summary).toBe('Short summary for the hero line.');
    expect(detail?.sections.find((section) => section.id === 'problem')?.body).toBe(
      'Real problem copy.',
    );
    const arch = detail?.sections.find((section) => section.id === 'architecture-decisions');
    expect(arch?.body).toBe('Key decision.');
    expect(arch?.accent).toBe(true);
  });

  it('fills empty portable text fields with stable fallbacks', () => {
    const detail = normalizeProjectDetailPage({
      title: 'Example',
      slug: 'example',
      description: 'Summary here.',
    });

    expect(detail?.sections).toHaveLength(7);
    expect(detail?.sections[0]?.body).toContain(
      'Example is already represented on the projects grid',
    );
  });
});
