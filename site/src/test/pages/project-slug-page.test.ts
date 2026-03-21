// @vitest-environment node
import reactRenderer from '@astrojs/react/server.js';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { JSDOM } from 'jsdom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/sanity', () => ({
  fetchAllProjectSlugs: vi.fn(),
  fetchProjectBySlug: vi.fn(),
}));

import ProjectDetailPage from '@/pages/projects/[slug].astro';
import { fetchAllProjectSlugs, fetchProjectBySlug } from '@/lib/sanity';

const designSystemDoc = {
  title: 'Design system migration',
  slug: 'design-system',
  description:
    'Migrated a fragmented component library into a shared design system with consistent tokens, patterns, and accessibility defaults.',
  techTags: ['Astro', 'TypeScript', 'Tailwind CSS'],
  githubUrl: 'https://github.com/clearcraft/design-system-migration',
  demoUrl: undefined,
  sortOrder: 0,
  featured: true,
  problemPlain:
    'Teams were building similar UI patterns in parallel, but each product area had drifted into its own spacing, typography, and component conventions.',
  whyItMatteredPlain:
    'The design system work mattered because it improved more than aesthetics. A shared foundation reduced rework, shortened review cycles, and gave designers and engineers a common language for accessibility and interaction quality.',
  constraintsPlain:
    'I had to improve consistency without forcing a risky big-bang rewrite. Existing products still had active roadmaps, multiple engineering teams consumed the library differently, and accessibility regressions were unacceptable during the migration.',
  architectureDecisionsPlain:
    'I split the work into tokens, primitives, and adoption guidance. Tokens became the stable contract, a small set of primitives handled the highest-volume patterns, and migration notes helped teams replace one surface at a time instead of waiting for a perfect redesign window.',
  tradeoffsPlain:
    'Keeping the first version intentionally small meant saying no to low-value one-off components. That limited early coverage, but it prevented the system from becoming a dumping ground and kept the shared API easier to learn and maintain.',
  outcomesPlain:
    'The migration created more consistent UI decisions, reduced duplicate implementation work, and gave new features a faster path from design review to production.',
  improvePlain:
    'Next time I would add stronger telemetry around component adoption and visual regressions earlier.',
};

describe('Project detail page', () => {
  beforeEach(() => {
    vi.mocked(fetchAllProjectSlugs).mockResolvedValue([{ slug: 'design-system' }]);
    vi.mocked(fetchProjectBySlug).mockResolvedValue(designSystemDoc);
  });

  it('renders the sample case-study structure for the design-system slug', async () => {
    const container = await AstroContainer.create();
    container.addServerRenderer({ renderer: reactRenderer });
    container.addClientRenderer({
      name: '@astrojs/react',
      entrypoint: '@astrojs/react/client.js',
    });

    const html = await container.renderToString(
      ProjectDetailPage as unknown as Parameters<typeof container.renderToString>[0],
      {
        partial: false,
        request: new Request('http://localhost/projects/design-system'),
        params: {
          slug: 'design-system',
        },
      },
    );

    const { document } = new JSDOM(html).window;
    const main = document.querySelector('main');

    expect(main).not.toBeNull();
    expect(main?.querySelector('h1')?.textContent).toContain('Design system migration');
    expect(main?.textContent).toContain(
      'Migrated a fragmented component library into a shared design system',
    );

    expect(
      [...main!.querySelectorAll('section[id] h2')].map((heading) => heading.textContent?.trim()),
    ).toEqual([
      'Problem',
      'Why It Mattered',
      'Constraints',
      'Architecture Decisions',
      'Trade-offs',
      'Outcomes',
      "What I'd Improve",
    ]);

    expect(
      main?.querySelector('a[href="https://github.com/clearcraft/design-system-migration"]')
        ?.textContent,
    ).toContain('GitHub');
  });
});
