// @vitest-environment node
import reactRenderer from '@astrojs/react/server.js';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { JSDOM } from 'jsdom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/sanity', () => ({
  fetchAllProjects: vi.fn(),
}));

import ProjectsPage from '@/pages/projects/index.astro';
import { fetchAllProjects } from '@/lib/sanity';

const mockProjectsResponse = [
  {
    slug: 'design-system',
    title: 'Design system migration',
    description:
      'Migrated a fragmented component library into a shared design system with consistent tokens, patterns, and accessibility defaults.',
    techTags: ['Astro', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/clearcraft/design-system-migration',
    demoUrl: undefined,
    sortOrder: 0,
    featured: true,
  },
  {
    slug: 'checkout-flow',
    title: 'Checkout flow optimisation',
    description:
      'Simplified a multi-step checkout into a faster, lower-friction flow focused on conversion, clarity, and validation.',
    techTags: ['React', 'TypeScript', 'Stripe'],
    githubUrl: 'https://github.com/clearcraft/checkout-flow-optimisation',
    demoUrl: undefined,
    sortOrder: 1,
    featured: false,
  },
  {
    slug: 'api-gateway',
    title: 'API gateway redesign',
    description:
      'Restructured backend entry points to improve service boundaries, observability, and safer rollout paths across teams.',
    techTags: ['Node.js', 'Express', 'OpenAPI'],
    githubUrl: 'https://github.com/clearcraft/api-gateway-redesign',
    demoUrl: undefined,
    sortOrder: 2,
    featured: false,
  },
  {
    slug: 'analytics-dashboard',
    title: 'Analytics dashboard v2',
    description:
      'Reworked a reporting dashboard around clearer KPIs, faster filtering, and stakeholder-ready views for daily decisions.',
    techTags: ['React', 'D3', 'PostgreSQL'],
    githubUrl: 'https://github.com/clearcraft/analytics-dashboard-v2',
    demoUrl: undefined,
    sortOrder: 3,
    featured: false,
  },
] as const;

describe('Projects page', () => {
  beforeEach(() => {
    vi.mocked(fetchAllProjects).mockResolvedValue([...mockProjectsResponse]);
  });

  it('renders a tile for every project with detail and GitHub links', async () => {
    const container = await AstroContainer.create();
    container.addServerRenderer({ renderer: reactRenderer });
    container.addClientRenderer({
      name: '@astrojs/react',
      entrypoint: '@astrojs/react/client.js',
    });

    const html = await container.renderToString(ProjectsPage, {
      partial: false,
      request: new Request('http://localhost/projects'),
    });

    const { document } = new JSDOM(html).window;
    const main = document.querySelector('main');

    expect(main).not.toBeNull();

    const expectedProjectDetailLinks = mockProjectsResponse
      .map(({ slug }) => `/projects/${slug}`)
      .sort();
    const expectedProjectGithubLinks = mockProjectsResponse
      .map(({ githubUrl }) => githubUrl)
      .sort();
    const expectedProjectTileLabels = mockProjectsResponse
      .map(({ title }) => `Open project: ${title}`)
      .sort();

    const renderedProjectTileOverlays = [
      ...main!.querySelectorAll<HTMLAnchorElement>('a[aria-label^="Open project: "]'),
    ];
    const renderedProjectTileLabels = renderedProjectTileOverlays
      .map((link) => link.getAttribute('aria-label'))
      .filter((label): label is string => label !== null)
      .sort();
    const renderedProjectTileOverlayLinks = renderedProjectTileOverlays
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => href !== null)
      .sort();

    const renderedProjectDetailLinks = [
      ...new Set(
        [...main!.querySelectorAll<HTMLAnchorElement>('a[href^="/projects/"]')]
          .map((link) => link.getAttribute('href'))
          .filter((href): href is string => href !== null)
          .sort(),
      ),
    ];
    const renderedProjectGithubLinks = [
      ...new Set(
        [...main!.querySelectorAll<HTMLAnchorElement>('a[href^="https://github.com/"]')]
          .map((link) => link.getAttribute('href'))
          .filter((href): href is string => href !== null)
          .sort(),
      ),
    ];

    expect(renderedProjectTileOverlays).toHaveLength(mockProjectsResponse.length);
    expect(renderedProjectTileLabels).toEqual(expectedProjectTileLabels);
    expect(renderedProjectTileOverlayLinks).toEqual(expectedProjectDetailLinks);
    expect(renderedProjectDetailLinks).toEqual(expectedProjectDetailLinks);
    expect(renderedProjectGithubLinks).toEqual(expectedProjectGithubLinks);
  });
});
