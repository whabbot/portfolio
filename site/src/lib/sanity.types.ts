import type { BackgroundItemProjection, ProjectCardProjection } from './mappers';

export type BackgroundItemsResult = readonly BackgroundItemProjection[];

export type ProjectCardsResult = readonly ProjectCardProjection[];

export interface ProjectSlugRow {
  slug: string;
}

export type ProjectSlugsResult = readonly ProjectSlugRow[];
