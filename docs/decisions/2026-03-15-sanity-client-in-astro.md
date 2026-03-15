# Sanity client in Astro (Phase 6.4) — decisions

Date: 2026-03-15

## Context

Phase 6.4 sets up `@sanity/client` in the Astro app (`site/`) and adds GROQ query helpers for `background` and `project` documents.

## Decision: server-only by default

We will treat the Sanity client helper as **server-only in practice**.

- Keep the helper at `site/src/lib/sanity.ts`
- Only import it from `.astro` (or other server-only code paths)
- Do not import it from browser-executed code (React islands, inline client scripts, etc.)

Rationale: prevents accidental bundling of Sanity config into client bundles and keeps the integration “read-only + static” by default.

## Decision: published + CDN reads for now

The initial integration targets **published content** using `useCdn: true`.

Rationale: the site is static and public; CDN reads are faster and cheaper.

## Future: preview / visual editing (out of scope for 6.4)

If/when we add preview or visual editing:

- Add a second “preview” client (separate module) that uses:
  - `useCdn: false`
  - an auth token (server-only)
  - drafts-aware querying (e.g. drafts perspective)
- Keep the content model unchanged; only the client/query layer changes.

## Future: client-side reads (only if needed)

If we ever genuinely need Sanity calls from browser code:

- Split helpers into:
  - `site/src/lib/sanity.server.ts` (server-only)
  - `site/src/lib/sanity.public.ts` (browser-safe)
- Use `PUBLIC_` env vars for the public client.

