import { sanityClient } from 'sanity:client';

export const queries = {
  backgroundItems: `*[_type == "background"] | order(sortOrder asc)`,
  featuredProjects: `*[_type == "project" && featured == true] | order(sortOrder asc)`,
  projectBySlug: `*[_type == "project" && slug.current == $slug][0]`,
  allProjects: `*[_type == "project"] | order(sortOrder asc)`,
  allProjectSlugs: `*[_type == "project" && defined(slug.current)]{"slug": slug.current}`,
} as const;

export async function fetchBackgroundItems<TResult>(): Promise<TResult> {
  return await sanityClient.fetch(queries.backgroundItems);
}

export async function fetchFeaturedProjects<TResult>(): Promise<TResult> {
  return await sanityClient.fetch(queries.featuredProjects);
}

export async function fetchProjectBySlug<TResult>(slug: string): Promise<TResult | null> {
  const result = await sanityClient.fetch(queries.projectBySlug, { slug });
  return result ?? null;
}

export async function fetchAllProjectSlugs<TResult>(): Promise<TResult> {
  return await sanityClient.fetch(queries.allProjectSlugs);
}
