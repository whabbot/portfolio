// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import ProjectTile from './ProjectTile.astro';

describe('ProjectTile', () => {
  it('renders required links and accessibility attributes', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectTile, {
      props: {
        slug: 'placeholder',
        title: 'Project Tile Playground',
        description: 'Clickable card with overlay link + GitHub icon link.',
        techTags: ['Astro', 'Tailwind', 'Playwright'],
        githubUrl: 'https://github.com/example/repo',
      },
    });

    expect(html).toContain('aria-label="Open project: Project Tile Playground"');
    expect(html).toContain('href="/projects/placeholder"');

    expect(html).toContain('aria-label="View source on GitHub"');
    expect(html).toContain('href="https://github.com/example/repo"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noreferrer"');
    expect(html).toContain('>GitHub<');

    expect(html).toContain('Astro');
    expect(html).toContain('Tailwind');
    expect(html).toContain('Playwright');

    // Always-visible microcopy should be a real link (not just text)
    expect(html).toMatch(
      /<a[^>]*href="\/projects\/placeholder"[^>]*>[\s\S]*See decisions[\s\S]*→[\s\S]*<\/a>/,
    );
  });
});
