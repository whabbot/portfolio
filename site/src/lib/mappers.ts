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
