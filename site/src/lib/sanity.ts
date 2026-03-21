import { sanityClient } from 'sanity:client';

import {
  getPlaywrightProjectBySlug,
  playwrightAllProjectSlugs,
  playwrightAllProjects,
  playwrightBackgroundItems,
  playwrightFeaturedProjects,
} from './sanity.fixtures';
import type { BackgroundItemsResult, ProjectCardsResult, ProjectSlugsResult } from './sanity.types';
import type {
  BackgroundItemProjection,
  ProjectCardProjection,
  ProjectDetailProjection,
} from './mappers';

function isPlaywrightSanityMock(): boolean {
  return process.env.PLAYWRIGHT_MOCK_SANITY === '1';
}

export const queries = {
  backgroundItems: `*[_type == "background"] | order(sortOrder asc){
    employerType,
    jobTitle,
    startDate,
    endDate,
    timelineLabel,
    summary,
    bullets,
    sortOrder
  }`,
  featuredProjects: `*[_type == "project" && featured == true] | order(sortOrder asc){
    title,
    "slug": slug.current,
    description,
    techTags,
    githubUrl,
    demoUrl,
    sortOrder,
    featured
  }`,
  projectBySlug: `*[_type == "project" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    description,
    techTags,
    githubUrl,
    demoUrl,
    sortOrder,
    featured,
    "problemPlain": pt::text(problem),
    "whyItMatteredPlain": pt::text(whyItMattered),
    "constraintsPlain": pt::text(constraints),
    "architectureDecisionsPlain": pt::text(architectureDecisions),
    "tradeoffsPlain": pt::text(tradeoffs),
    "outcomesPlain": pt::text(outcomes),
    "improvePlain": pt::text(improve)
  }`,
  allProjects: `*[_type == "project"] | order(sortOrder asc){
    title,
    "slug": slug.current,
    description,
    techTags,
    githubUrl,
    demoUrl,
    sortOrder,
    featured
  }`,
  allProjectSlugs: `*[
    _type == "project" &&
    defined(slug.current) &&
    defined(title) &&
    defined(description) &&
    title != "" &&
    description != ""
  ]{
    "slug": slug.current
  }`,
} as const;

export async function fetchBackgroundItems(): Promise<BackgroundItemsResult> {
  if (isPlaywrightSanityMock()) {
    return playwrightBackgroundItems.map((row) => ({ ...row, bullets: [...row.bullets] }));
  }
  return await sanityClient.fetch<BackgroundItemProjection[]>(queries.backgroundItems);
}

export async function fetchFeaturedProjects(): Promise<ProjectCardsResult> {
  if (isPlaywrightSanityMock()) {
    return playwrightFeaturedProjects.map((project) => ({
      ...project,
      techTags: [...project.techTags],
    }));
  }
  return await sanityClient.fetch<ProjectCardProjection[]>(queries.featuredProjects);
}

export async function fetchAllProjects(): Promise<ProjectCardsResult> {
  if (isPlaywrightSanityMock()) {
    return playwrightAllProjects.map((project) => ({
      ...project,
      techTags: [...project.techTags],
    }));
  }
  return await sanityClient.fetch<ProjectCardProjection[]>(queries.allProjects);
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectDetailProjection | null> {
  if (isPlaywrightSanityMock()) {
    return getPlaywrightProjectBySlug(slug);
  }
  const result = await sanityClient.fetch<ProjectDetailProjection | null>(queries.projectBySlug, {
    slug,
  });
  return result ?? null;
}

export async function fetchAllProjectSlugs(): Promise<ProjectSlugsResult> {
  if (isPlaywrightSanityMock()) {
    return playwrightAllProjectSlugs.map((row) => ({ slug: row.slug }));
  }
  return await sanityClient.fetch<Array<{ slug: string }>>(queries.allProjectSlugs);
}
