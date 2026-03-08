// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import ProjectDetail from './ProjectDetail.astro';

const expectedSectionTitles = [
  'Problem',
  'Why It Mattered',
  'Constraints',
  'Architecture Decisions',
  'Trade-offs',
  'Outcomes',
  "What I'd Improve",
] as const;

const sections = [
  {
    id: 'problem',
    title: 'Problem',
    body: 'Customers dropped out before reviewing their order.',
  },
  {
    id: 'why-it-mattered',
    title: 'Why It Mattered',
    body: 'The team needed to reduce checkout friction without hiding important safeguards.',
  },
  {
    id: 'constraints',
    title: 'Constraints',
    body: 'We had to preserve compliance copy, legacy payment integrations, and release timing.',
  },
  {
    id: 'architecture-decisions',
    title: 'Architecture Decisions',
    body: 'We split validation concerns so the page could stay responsive while preserving guardrails.',
    accent: true,
  },
  {
    id: 'trade-offs',
    title: 'Trade-offs',
    body: 'We accepted a slightly larger client bundle to avoid a jarring full-page confirmation step.',
  },
  {
    id: 'outcomes',
    title: 'Outcomes',
    body: 'Completion improved and support tickets about failed payments dropped.',
  },
  {
    id: 'what-id-improve',
    title: "What I'd Improve",
    body: 'I would add stronger instrumentation around form recovery and post-purchase confidence.',
  },
] as const;

async function renderProjectDetail() {
  const container = await AstroContainer.create();

  return container.renderToString(ProjectDetail, {
    props: {
      title: 'Checkout flow redesign',
      summary:
        'A case-study layout that keeps the story readable on mobile while adding richer content when needed.',
      liveDemoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/example/checkout-flow',
      sections,
    },
    slots: {
      diagram: '<div>Architecture diagram slot</div>',
      code: '<pre><code>const checkout = improveFlow();</code></pre>',
      links: '<ul><li><a href="https://example.com/spec">Spec doc</a></li></ul>',
    },
  });
}

function assertProjectDetailStructure(article: Element, html: string) {
  const accentedSection = article.querySelector('#architecture-decisions');
  const summary = article.querySelector('header > p');
  const firstBody = article.querySelector('section[id] p');

  expect(article.getAttribute('class')).toContain('space-y-8');
  expect(article.getAttribute('class')).not.toContain('border-default');
  expect(article.querySelector('h1')?.textContent).toContain('Checkout flow redesign');
  expect(article.textContent).toContain(
    'A case-study layout that keeps the story readable on mobile while adding richer content when needed.',
  );
  expect(
    [...article.querySelectorAll('section[id] h2')].map((heading) => heading.textContent?.trim()),
  ).toEqual(expectedSectionTitles);
  expect(summary?.getAttribute('class')).toContain('text-sm');
  expect(summary?.getAttribute('class')).toContain('leading-6');
  expect(firstBody?.getAttribute('class')).toContain('text-sm');
  expect(firstBody?.getAttribute('class')).toContain('leading-6');
  expect(firstBody?.getAttribute('class')).toContain('sm:text-base');
  expect(firstBody?.getAttribute('class')).toContain('sm:leading-7');
  expect(html).toContain('border-l-4');
  expect(accentedSection?.getAttribute('class')).toContain('rounded-l-none');
}

function assertProjectDetailActions(article: Element) {
  expect(article.querySelector('a[href="https://example.com/demo"]')?.textContent).toContain(
    'Live demo',
  );
  expect(
    article.querySelector('a[href="https://github.com/example/checkout-flow"]')?.textContent,
  ).toContain('GitHub');
}

function assertProjectDetailSlots(article: Element) {
  expect(article.querySelector('[data-project-detail-slot="diagram"]')?.textContent).toContain(
    'Architecture diagram slot',
  );
  expect(article.querySelector('[data-project-detail-slot="code"]')?.textContent).toContain(
    'const checkout = improveFlow();',
  );
  expect(article.querySelector('[data-project-detail-slot="links"]')?.textContent).toContain(
    'Spec doc',
  );
}

describe('ProjectDetail', () => {
  it('renders the case-study structure, optional actions, and rich-content slots', async () => {
    const html = await renderProjectDetail();

    const { document } = new JSDOM(html).window;
    const article = document.querySelector('article');

    expect(article).not.toBeNull();
    assertProjectDetailStructure(article!, html);
    assertProjectDetailActions(article!);
    assertProjectDetailSlots(article!);
  });

  it('omits optional actions, rich-content wrappers, and desktop split classes when optional content is absent', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectDetail, {
      props: {
        title: 'Minimal case study',
        summary: 'A lean detail page with just the narrative sections.',
        sections,
      },
    });

    const { document } = new JSDOM(html).window;
    const article = document.querySelector('article');
    const shell = article?.querySelector(':scope > div');

    expect(article).not.toBeNull();
    expect(article?.textContent).not.toContain('Live demo');
    expect(article?.textContent).not.toContain('GitHub');
    expect(article?.querySelector('aside')).toBeNull();
    expect(article?.querySelector('[data-project-detail-slot="diagram"]')).toBeNull();
    expect(article?.querySelector('[data-project-detail-slot="code"]')).toBeNull();
    expect(article?.querySelector('[data-project-detail-slot="links"]')).toBeNull();
    expect(shell?.getAttribute('class')).not.toContain('md:grid');
    expect(shell?.getAttribute('class')).not.toContain('grid-cols');
  });
});
