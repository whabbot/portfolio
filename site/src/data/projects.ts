export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly techTags: readonly string[];
  readonly githubUrl: string;
}

export const projects: readonly Project[] = [
  {
    slug: 'design-system',
    title: 'Design system migration',
    description:
      'Migrated a fragmented component library into a shared design system with consistent tokens, patterns, and accessibility defaults.',
    techTags: ['Astro', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/clearcraft/design-system-migration',
  },
  {
    slug: 'checkout-flow',
    title: 'Checkout flow optimisation',
    description:
      'Simplified a multi-step checkout into a faster, lower-friction flow focused on conversion, clarity, and validation.',
    techTags: ['React', 'TypeScript', 'Stripe'],
    githubUrl: 'https://github.com/clearcraft/checkout-flow-optimisation',
  },
  {
    slug: 'api-gateway',
    title: 'API gateway redesign',
    description:
      'Restructured backend entry points to improve service boundaries, observability, and safer rollout paths across teams.',
    techTags: ['Node.js', 'Express', 'OpenAPI'],
    githubUrl: 'https://github.com/clearcraft/api-gateway-redesign',
  },
  {
    slug: 'analytics-dashboard',
    title: 'Analytics dashboard v2',
    description:
      'Reworked a reporting dashboard around clearer KPIs, faster filtering, and stakeholder-ready views for daily decisions.',
    techTags: ['React', 'D3', 'PostgreSQL'],
    githubUrl: 'https://github.com/clearcraft/analytics-dashboard-v2',
  },
];
