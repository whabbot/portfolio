/**
 * Static CMS-shaped payloads for Playwright E2E. Used when `PLAYWRIGHT_MOCK_SANITY=1`
 * during `astro build` (see `playwright.config.ts` webServer env).
 */

import type { ProjectDetailProjection } from './mappers';

const designSystemDetail = {
  title: 'Design system migration',
  slug: 'design-system',
  description:
    'Migrated a fragmented component library into a shared design system with consistent tokens, patterns, and accessibility defaults.',
  techTags: ['Astro', 'TypeScript', 'Tailwind CSS'],
  githubUrl: 'https://github.com/clearcraft/design-system-migration',
  sortOrder: 0,
  featured: true as const,
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
} as const;

const checkoutFlowDetail = {
  title: 'Checkout flow optimisation',
  slug: 'checkout-flow',
  description:
    'Simplified a multi-step checkout into a faster, lower-friction flow focused on conversion, clarity, and validation.',
  techTags: ['React', 'TypeScript', 'Stripe'],
  githubUrl: 'https://github.com/clearcraft/checkout-flow-optimisation',
  sortOrder: 1,
  featured: false as const,
} as const;

const apiGatewayDetail = {
  title: 'API gateway redesign',
  slug: 'api-gateway',
  description:
    'Restructured backend entry points to improve service boundaries, observability, and safer rollout paths across teams.',
  techTags: ['Node.js', 'Express', 'OpenAPI'],
  githubUrl: 'https://github.com/clearcraft/api-gateway-redesign',
  sortOrder: 2,
  featured: false as const,
} as const;

const analyticsDashboardDetail = {
  title: 'Analytics dashboard v2',
  slug: 'analytics-dashboard',
  description:
    'Reworked a reporting dashboard around clearer KPIs, faster filtering, and stakeholder-ready views for daily decisions.',
  techTags: ['React', 'D3', 'PostgreSQL'],
  githubUrl: 'https://github.com/clearcraft/analytics-dashboard-v2',
  sortOrder: 3,
  featured: false as const,
} as const;

const projectDetailBySlug = {
  'design-system': designSystemDetail,
  'checkout-flow': checkoutFlowDetail,
  'api-gateway': apiGatewayDetail,
  'analytics-dashboard': analyticsDashboardDetail,
} as const;

export const playwrightBackgroundItems = [
  {
    employerType: 'Fintech scale-up',
    jobTitle: 'Senior frontend engineer',
    startDate: '2021-01-01',
    endDate: '2024-01-01',
    timelineLabel: undefined as string | undefined,
    summary:
      'Built product UI with an emphasis on performance, accessibility, and maintainable systems.',
    bullets: ['Shipping', 'Mentorship'],
    sortOrder: 0,
  },
  {
    employerType: 'Public sector',
    jobTitle: 'Fullstack engineer',
    startDate: '2019-01-01',
    endDate: '2021-01-01',
    summary:
      'Delivered user-facing workflows with a focus on reliability and privacy-aware design.',
    bullets: ['Compliance', 'Delivery'],
    sortOrder: 1,
  },
  {
    employerType: 'B2B SaaS',
    jobTitle: 'Frontend engineer',
    startDate: '2017-01-01',
    endDate: '2019-01-01',
    summary: 'Scaled design patterns and component architecture across multiple product surfaces.',
    bullets: ['Design systems', 'Quality'],
    sortOrder: 2,
  },
  {
    employerType: 'Early-stage startup',
    jobTitle: 'Generalist engineer',
    startDate: '2015-01-01',
    endDate: '2017-01-01',
    summary: 'Shipped end-to-end features, balancing speed with long-term maintainability.',
    bullets: ['Ownership', 'Iteration'],
    sortOrder: 3,
  },
] as const;

export const playwrightFeaturedProjects = [
  {
    title: designSystemDetail.title,
    slug: designSystemDetail.slug,
    description: designSystemDetail.description,
    techTags: [...designSystemDetail.techTags],
    githubUrl: designSystemDetail.githubUrl,
    demoUrl: undefined as string | undefined,
    sortOrder: designSystemDetail.sortOrder,
    featured: true,
  },
] as const;

export const playwrightAllProjects = [
  {
    title: designSystemDetail.title,
    slug: designSystemDetail.slug,
    description: designSystemDetail.description,
    techTags: [...designSystemDetail.techTags],
    githubUrl: designSystemDetail.githubUrl,
    demoUrl: undefined as string | undefined,
    sortOrder: designSystemDetail.sortOrder,
    featured: true,
  },
  {
    title: checkoutFlowDetail.title,
    slug: checkoutFlowDetail.slug,
    description: checkoutFlowDetail.description,
    techTags: [...checkoutFlowDetail.techTags],
    githubUrl: checkoutFlowDetail.githubUrl,
    demoUrl: undefined as string | undefined,
    sortOrder: checkoutFlowDetail.sortOrder,
    featured: false,
  },
  {
    title: apiGatewayDetail.title,
    slug: apiGatewayDetail.slug,
    description: apiGatewayDetail.description,
    techTags: [...apiGatewayDetail.techTags],
    githubUrl: apiGatewayDetail.githubUrl,
    demoUrl: undefined as string | undefined,
    sortOrder: apiGatewayDetail.sortOrder,
    featured: false,
  },
  {
    title: analyticsDashboardDetail.title,
    slug: analyticsDashboardDetail.slug,
    description: analyticsDashboardDetail.description,
    techTags: [...analyticsDashboardDetail.techTags],
    githubUrl: analyticsDashboardDetail.githubUrl,
    demoUrl: undefined as string | undefined,
    sortOrder: analyticsDashboardDetail.sortOrder,
    featured: false,
  },
] as const;

export const playwrightAllProjectSlugs = [
  { slug: 'design-system' },
  { slug: 'checkout-flow' },
  { slug: 'api-gateway' },
  { slug: 'analytics-dashboard' },
] as const;

export function getPlaywrightProjectBySlug(slug: string): ProjectDetailProjection | null {
  const hit = projectDetailBySlug[slug as keyof typeof projectDetailBySlug];
  if (!hit) {
    return null;
  }

  const base = {
    title: hit.title,
    slug: hit.slug,
    description: hit.description,
    techTags: [...hit.techTags],
    githubUrl: hit.githubUrl,
    demoUrl: undefined as string | undefined,
    sortOrder: hit.sortOrder,
    featured: hit.featured,
  };

  if (slug === 'design-system') {
    const ds = hit as typeof designSystemDetail;
    return {
      ...base,
      problemPlain: ds.problemPlain,
      whyItMatteredPlain: ds.whyItMatteredPlain,
      constraintsPlain: ds.constraintsPlain,
      architectureDecisionsPlain: ds.architectureDecisionsPlain,
      tradeoffsPlain: ds.tradeoffsPlain,
      outcomesPlain: ds.outcomesPlain,
      improvePlain: ds.improvePlain,
    };
  }

  return base;
}
