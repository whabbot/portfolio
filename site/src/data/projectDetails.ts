import type { Project } from './projects';

export interface ProjectDetailSection {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly accent?: boolean;
}

export interface ProjectDetailContent {
  readonly title: string;
  readonly summary: string;
  readonly sections: readonly ProjectDetailSection[];
  readonly githubUrl: string;
  readonly liveDemoUrl?: string;
}

const fallbackSections = (project: Project): readonly ProjectDetailSection[] => [
  {
    id: 'problem',
    title: 'Problem',
    body: `${project.title} is already represented on the projects grid, but the full written case study for this route is still being expanded.`,
  },
  {
    id: 'why-it-mattered',
    title: 'Why It Mattered',
    body: 'The project belongs in the portfolio because it shows product judgment, technical range, and delivery discipline across a real implementation.',
  },
  {
    id: 'constraints',
    title: 'Constraints',
    body: 'For now, the detail page intentionally stays lightweight while richer narrative content is added for each project one by one.',
  },
  {
    id: 'architecture-decisions',
    title: 'Architecture Decisions',
    body: 'The detail route already uses the shared case-study layout so future write-ups can slot in without revisiting the page structure.',
    accent: true,
  },
  {
    id: 'trade-offs',
    title: 'Trade-offs',
    body: 'The trade-off is depth versus speed: this version keeps the route valid and consistent while prioritising one polished sample case study first.',
  },
  {
    id: 'outcomes',
    title: 'Outcomes',
    body: 'Visitors can still move from the projects grid into a consistent detail experience instead of landing on a dead-end placeholder.',
  },
  {
    id: 'what-id-improve',
    title: "What I'd Improve",
    body: 'The next improvement is replacing this temporary summary with a project-specific narrative, supporting assets, and measurable outcomes.',
  },
];

const detailedProjectContentBySlug: Partial<Record<Project['slug'], ProjectDetailContent>> = {
  'design-system': {
    title: 'Design system migration',
    summary:
      'Migrated a fragmented component library into a shared design system with consistent tokens, accessibility defaults, and a cleaner delivery model for product teams shipping across multiple surfaces.',
    githubUrl: 'https://github.com/clearcraft/design-system-migration',
    sections: [
      {
        id: 'problem',
        title: 'Problem',
        body: 'Teams were building similar UI patterns in parallel, but each product area had drifted into its own spacing, typography, and component conventions. That made the interface feel inconsistent and turned even small feature launches into rounds of visual clean-up.',
      },
      {
        id: 'why-it-mattered',
        title: 'Why It Mattered',
        body: 'The design system work mattered because it improved more than aesthetics. A shared foundation reduced rework, shortened review cycles, and gave designers and engineers a common language for accessibility and interaction quality.',
      },
      {
        id: 'constraints',
        title: 'Constraints',
        body: 'I had to improve consistency without forcing a risky big-bang rewrite. Existing products still had active roadmaps, multiple engineering teams consumed the library differently, and accessibility regressions were unacceptable during the migration.',
      },
      {
        id: 'architecture-decisions',
        title: 'Architecture Decisions',
        body: 'I split the work into tokens, primitives, and adoption guidance. Tokens became the stable contract, a small set of primitives handled the highest-volume patterns, and migration notes helped teams replace one surface at a time instead of waiting for a perfect redesign window.',
        accent: true,
      },
      {
        id: 'trade-offs',
        title: 'Trade-offs',
        body: 'Keeping the first version intentionally small meant saying no to low-value one-off components. That limited early coverage, but it prevented the system from becoming a dumping ground and kept the shared API easier to learn and maintain.',
      },
      {
        id: 'outcomes',
        title: 'Outcomes',
        body: 'The migration created more consistent UI decisions, reduced duplicate implementation work, and gave new features a faster path from design review to production. It also made accessibility expectations visible earlier in the development process instead of treating them as late QA fixes.',
      },
      {
        id: 'what-id-improve',
        title: "What I'd Improve",
        body: 'Next time I would add stronger telemetry around component adoption and visual regressions earlier. That would make it easier to spot where teams were still bypassing the shared patterns and where the system itself needed clearer guidance.',
      },
    ],
  },
};

export const getProjectDetailContent = (project: Project): ProjectDetailContent =>
  detailedProjectContentBySlug[project.slug] ?? {
    title: project.title,
    summary: `${project.description} A fuller case study for this project is coming soon.`,
    githubUrl: project.githubUrl,
    sections: fallbackSections(project),
  };
