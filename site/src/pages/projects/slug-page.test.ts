// @vitest-environment node
import reactRenderer from '@astrojs/react/server.js';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import ProjectDetailPage from './[slug].astro';

describe('Project detail page', () => {
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
