---
name: sanity-mcp-portable-text-sync
description: >-
  Syncs structured markdown (e.g. case-study sections) into Sanity Portable Text
  fields using the Sanity MCP. Explains why patch_document_from_markdown must not
  be used for verbatim content and how patch_document_from_json + publish work.
  Use when importing or updating Sanity documents from local markdown, seeding PT
  fields, or when the user mentions Sanity MCP, draft content, or Portable Text
  patches.
---

# Sanity MCP: Portable Text sync

## When this applies

- You have **source markdown** (sections with headings and lists) that must map **exactly** to Sanity **Portable Text** fields on a document (e.g. `problem`, `constraints`, `outcomes`).
- The **Sanity MCP** is connected (`plugin-sanity-Sanity` or equivalent).

## What did not work (and why)

**Do not rely on `patch_document_from_markdown`** to paste literal copy.

- That tool **interprets** markdown through an LLM-style path. It **rewrites**, summarizes, or substitutes generic advice for the text you provided.
- Symptom: headings and bullets look structurally fine, but **sentences are wrong** (not your draft).

**Verbatim body copy** needs a deterministic path: explicit Portable Text JSON, not “smart” markdown conversion.

## What worked

1. **Read the MCP tool schema** under the project’s MCP descriptors (e.g. `mcps/plugin-sanity-Sanity/tools/*.json`) before calling. Confirm required fields: `resource.projectId`, `resource.dataset`, `intent`, etc.

2. **Map sections to schema fields** using the Studio schema (e.g. `sanity/schemaTypes/project.ts`). Example: `### Problem` → `problem`, list sections → array-of-blocks with `listItem: "bullet"`.

3. **Apply content with `patch_document_from_json`**:
   - Use the `set` array with one entry per field: `{ "path": "fieldName", "value": [ ...blocks ] }`.
   - **Replace entire field arrays** for PT fields so you do not merge with bad prior content.
   - Portable Text **block** shape: `_type`, `_key`, `style`, optional `listItem` / `level`, `children` spans with `_type: "span"`, `text`, `marks` (`strong`, `em`, `code` as needed). Include `markDefs: []` on blocks when absent.

4. **Targeting drafts vs published**:
   - Patching a **published** id typically **creates/updates a draft**; the published doc stays until you publish.
   - To edit the draft directly, use `documentId` `drafts.<baseId>` if you need to be explicit.

5. **Publish when ready**: `publish_documents` with `ids: ["<baseDocumentId>"]` (no `drafts.` prefix), after verifying the draft in Studio or via `get_document` / `query_documents`.

6. **Large payloads**: If a single `patch_document_from_json` body is too large for one call, **split** into multiple patches (e.g. first batch of fields, then the rest). Same `documentId`, sequential `set` operations.

## Optional: generating PT from markdown

- A small **one-off script** (Node) that outputs the `set` payload can keep wording identical and avoid hand-typing blocks.
- Regenerate **new `_key` values** for blocks/spans when building fresh JSON (unique strings; hex/random is fine).

## Quick checklist

- [ ] Confirm `projectId` and `dataset` (e.g. `sanity.config.ts` / `sanity.cli.ts`).
- [ ] Map each markdown section to the correct **schema field name**.
- [ ] Use **`patch_document_from_json`** for exact wording; avoid **`patch_document_from_markdown`** for literal copy.
- [ ] **Publish** if the site reads the published dataset, not drafts.

## Related Sanity MCP tools (typical)

| Tool | Role |
|------|------|
| `query_documents` | GROQ check after sync |
| `get_document` | Fetch one doc by id |
| `patch_document_from_json` | Deterministic field updates (use for PT) |
| `patch_document_from_markdown` | **Not** for verbatim PT when fidelity matters |
| `publish_documents` | Make draft changes live |

Adjust tool names to match the descriptors in your MCP folder if they differ.
