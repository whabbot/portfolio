import { createClient, type SanityClient } from '@sanity/client';

export type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
};

const API_VERSION_RE = /^\d{4}-\d{2}-\d{2}$/;

export function getSanityConfigFromEnv(
  env: Record<string, string | undefined>,
  opts?: { useCdn?: boolean },
): SanityConfig {
  const projectId = env.SANITY_PROJECT_ID?.trim();
  const dataset = env.SANITY_DATASET?.trim();
  const apiVersion = env.SANITY_API_VERSION?.trim();

  const missing: string[] = [];
  if (!projectId) {
    missing.push('SANITY_PROJECT_ID');
  }
  if (!dataset) {
    missing.push('SANITY_DATASET');
  }
  if (!apiVersion) {
    missing.push('SANITY_API_VERSION');
  }

  if (missing.length) {
    throw new Error(`Missing required Sanity env var(s): ${missing.join(', ')}`);
  }

  if (!API_VERSION_RE.test(apiVersion)) {
    throw new Error('SANITY_API_VERSION must be in YYYY-MM-DD format');
  }

  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: opts?.useCdn ?? true,
  };
}

export const queries = {
  backgroundItems: `*[_type == "background"] | order(sortOrder asc)`,
  featuredProjects: `*[_type == "project" && featured == true] | order(sortOrder asc)`,
  projectBySlug: `*[_type == "project" && slug.current == $slug][0]`,
  allProjects: `*[_type == "project"] | order(sortOrder asc)`,
  allProjectSlugs: `*[_type == "project" && defined(slug.current)]{"slug": slug.current}`,
} as const;

let cachedClient: SanityClient | undefined = undefined;

export function getSanityClient(
  env: Record<string, string | undefined> = import.meta.env as Record<string, string | undefined>,
): SanityClient {
  if (!cachedClient) {
    const config = getSanityConfigFromEnv(env);
    cachedClient = createClient(config);
  }

  return cachedClient;
}

export async function fetchBackgroundItems<TResult>(
  client: SanityClient = getSanityClient(),
): Promise<TResult> {
  return await client.fetch(queries.backgroundItems);
}

export async function fetchFeaturedProjects<TResult>(
  client: SanityClient = getSanityClient(),
): Promise<TResult> {
  return await client.fetch(queries.featuredProjects);
}

export async function fetchProjectBySlug<TResult>(
  slug: string,
  client: SanityClient = getSanityClient(),
): Promise<TResult | null> {
  const result = await client.fetch(queries.projectBySlug, { slug });
  return result ?? null;
}

export async function fetchAllProjectSlugs<TResult>(
  client: SanityClient = getSanityClient(),
): Promise<TResult> {
  return await client.fetch(queries.allProjectSlugs);
}
