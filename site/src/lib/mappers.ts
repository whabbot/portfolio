export interface BackgroundItemProjection {
  employerType: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  timelineLabel?: string;
  summary: string;
  bullets: readonly string[];
  sortOrder: number;
}

export interface ProjectDetailProjection extends ProjectCardProjection {
  problemPlain?: string | null;
  whyItMatteredPlain?: string | null;
  constraintsPlain?: string | null;
  architectureDecisionsPlain?: string | null;
  tradeoffsPlain?: string | null;
  outcomesPlain?: string | null;
  improvePlain?: string | null;
}

export interface ProjectCardProjection {
  title: string;
  slug: string;
  description: string;
  techTags: readonly string[];
  githubUrl?: string;
  demoUrl?: string;
  sortOrder: number;
  featured?: boolean;
}

export interface ProjectCard {
  slug: string;
  title: string;
  description: string;
  techTags: readonly string[];
  githubUrl?: string;
  demoUrl?: string;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const asOptionalNonEmptyString = (value: unknown): string | undefined => {
  if (!isNonEmptyString(value)) {
    return undefined;
  }
  return value.trim();
};

const asStringArray = (value: unknown): readonly string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  const seen = new Set<string>();
  const output: string[] = [];

  for (const item of value) {
    if (!isNonEmptyString(item)) {
      continue;
    }
    const normalized = item.trim();
    if (seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    output.push(normalized);
  }

  return output;
};

export function formatYearRange(opts: {
  startDate?: unknown;
  endDate?: unknown;
  timelineLabel?: unknown;
}): string | undefined {
  const override = asOptionalNonEmptyString(opts.timelineLabel);
  if (override) {
    return override;
  }

  const startDate = asOptionalNonEmptyString(opts.startDate);
  if (!startDate) {
    return undefined;
  }

  const start = new Date(startDate);
  if (Number.isNaN(start.valueOf())) {
    return undefined;
  }

  const endDate = asOptionalNonEmptyString(opts.endDate);
  const end = endDate ? new Date(endDate) : undefined;
  if (end && Number.isNaN(end.valueOf())) {
    return undefined;
  }

  const startYear = start.getUTCFullYear();
  const endYear = end ? end.getUTCFullYear() : undefined;

  return endYear ? `${startYear}–${endYear}` : `${startYear}–Present`;
}

export function toBackgroundPreviewLine(input: {
  employerType?: unknown;
  jobTitle?: unknown;
  startDate?: unknown;
  endDate?: unknown;
  timelineLabel?: unknown;
  summary?: unknown;
}): string | null {
  const employerType = asOptionalNonEmptyString(input.employerType);
  const jobTitle = asOptionalNonEmptyString(input.jobTitle);
  const summary = asOptionalNonEmptyString(input.summary);
  const timeline = formatYearRange(input);

  if (!employerType || !jobTitle || !summary || !timeline) {
    return null;
  }

  return `${employerType} · ${jobTitle} · ${timeline} — ${summary}`;
}

export function normalizeBackgroundPreviewLines(items: ReadonlyArray<unknown>): readonly string[] {
  const output: string[] = [];

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      continue;
    }
    const line = toBackgroundPreviewLine(item as Record<string, unknown>);
    if (!line) {
      continue;
    }
    output.push(line);
  }

  return output;
}

export function normalizeProjectCard(input: unknown): ProjectCard | null {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const record = input as Record<string, unknown>;

  const slug = asOptionalNonEmptyString(record.slug);
  const title = asOptionalNonEmptyString(record.title);
  const description = asOptionalNonEmptyString(record.description);

  if (!slug || !title || !description) {
    return null;
  }

  return {
    slug,
    title,
    description,
    techTags: asStringArray(record.techTags),
    githubUrl: asOptionalNonEmptyString(record.githubUrl),
    demoUrl: asOptionalNonEmptyString(record.demoUrl),
  };
}

export function normalizeProjectCards(items: ReadonlyArray<unknown>): readonly ProjectCard[] {
  const output: ProjectCard[] = [];

  for (const item of items) {
    const card = normalizeProjectCard(item);
    if (!card) {
      continue;
    }
    output.push(card);
  }

  return output;
}

export interface ProjectDetailSection {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly accent?: boolean;
}

export interface ProjectDetailPageModel {
  readonly title: string;
  readonly summary: string;
  readonly sections: readonly ProjectDetailSection[];
  readonly githubUrl?: string;
  readonly liveDemoUrl?: string;
}

type CaseStudySectionSpec = {
  readonly id: string;
  readonly title: string;
  readonly plainKey: string;
  readonly accent?: true;
};

const CASE_STUDY_SECTIONS: readonly CaseStudySectionSpec[] = [
  { id: 'problem', title: 'Problem', plainKey: 'problemPlain' },
  { id: 'why-it-mattered', title: 'Why It Mattered', plainKey: 'whyItMatteredPlain' },
  { id: 'constraints', title: 'Constraints', plainKey: 'constraintsPlain' },
  {
    id: 'architecture-decisions',
    title: 'Architecture Decisions',
    plainKey: 'architectureDecisionsPlain',
    accent: true,
  },
  { id: 'trade-offs', title: 'Trade-offs', plainKey: 'tradeoffsPlain' },
  { id: 'outcomes', title: 'Outcomes', plainKey: 'outcomesPlain' },
  { id: 'what-id-improve', title: "What I'd Improve", plainKey: 'improvePlain' },
];

function fallbackCaseStudyBody(sectionId: string, title: string): string {
  switch (sectionId) {
    case 'problem':
      return `${title} is already represented on the projects grid, but the full written case study for this route is still being expanded.`;
    case 'why-it-mattered':
      return 'The project belongs in the portfolio because it shows product judgment, technical range, and delivery discipline across a real implementation.';
    case 'constraints':
      return 'For now, the detail page intentionally stays lightweight while richer narrative content is added for each project one by one.';
    case 'architecture-decisions':
      return 'The detail route already uses the shared case-study layout so future write-ups can slot in without revisiting the page structure.';
    case 'trade-offs':
      return 'The trade-off is depth versus speed: this version keeps the route valid and consistent while prioritising one polished sample case study first.';
    case 'outcomes':
      return 'Visitors can still move from the projects grid into a consistent detail experience instead of landing on a dead-end placeholder.';
    case 'what-id-improve':
      return 'The next improvement is replacing this temporary summary with a project-specific narrative, supporting assets, and measurable outcomes.';
    default:
      return '';
  }
}

const asPlainTextBlock = (value: unknown): string | undefined => {
  if (!isNonEmptyString(value)) {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export function normalizeProjectDetailPage(input: unknown): ProjectDetailPageModel | null {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const record = input as Record<string, unknown>;

  const title = asOptionalNonEmptyString(record.title);
  const slug = asOptionalNonEmptyString(record.slug);
  const description = asOptionalNonEmptyString(record.description);

  if (!title || !slug || !description) {
    return null;
  }

  const sections: ProjectDetailSection[] = [];

  for (const spec of CASE_STUDY_SECTIONS) {
    const fromCms = asPlainTextBlock(record[spec.plainKey]);
    const body = fromCms ?? fallbackCaseStudyBody(spec.id, title);
    if (!body) {
      continue;
    }
    sections.push({
      id: spec.id,
      title: spec.title,
      body,
      ...(spec.accent ? { accent: true } : {}),
    });
  }

  return {
    title,
    summary: description,
    sections,
    githubUrl: asOptionalNonEmptyString(record.githubUrl),
    liveDemoUrl: asOptionalNonEmptyString(record.demoUrl),
  };
}
