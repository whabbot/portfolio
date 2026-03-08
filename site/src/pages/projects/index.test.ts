// @vitest-environment node
import reactRenderer from '@astrojs/react/server.js';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import ProjectsPage from './index.astro';

describe('Projects page', () => {
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

    const expectedProjectDetailLinks = projects.map(({ slug }) => `/projects/${slug}`).sort();
    const expectedProjectGithubLinks = projects.map(({ githubUrl }) => githubUrl).sort();
    const expectedProjectTileLabels = projects.map(({ title }) => `Open project: ${title}`).sort();

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

    expect(renderedProjectTileOverlays).toHaveLength(projects.length);
    expect(renderedProjectTileLabels).toEqual(expectedProjectTileLabels);
    expect(renderedProjectTileOverlayLinks).toEqual(expectedProjectDetailLinks);
    expect(renderedProjectDetailLinks).toEqual(expectedProjectDetailLinks);
    expect(renderedProjectGithubLinks).toEqual(expectedProjectGithubLinks);
  });
});
