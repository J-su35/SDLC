# Repository instructions

## Build, lint, and validation

- `npm run dev` starts the Next.js development server.
- `npm run build` creates and type-checks the production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint across the repository.
- `npm test` runs the SQLite backend unit and integration tests in `tests/backend.test.ts`.
- To lint one file, run `npx eslint app/products/fresh-strawberries/page.tsx` and replace the path with the file being changed.
- To run TypeScript without emitting files, run `npx tsc --noEmit`.
- For one backend test by name: `node --conditions=react-server --import tsx --test tests/backend.test.ts --test-name-pattern "searches product names and labels without case sensitivity"`
- Tests use in-memory SQLite databases and do not modify the local catalog.

## Architecture

- This is a Next.js App Router application built with React 19, TypeScript, Tailwind CSS 4, and SQLite via `better-sqlite3`.
- `app/page.tsx` renders the storefront, and page data is loaded from `lib/store.ts` with request-time database access inside a `Suspense` boundary (`await io()` before reads).
- `lib/store.ts` owns SQLite initialization, schema creation, idempotent seed data, and catalog queries. It creates `categories` and `products` tables, initializes `data/farmart.sqlite` on first use, and keeps the seed data and query shapes aligned with the storefront.
- `app/api/home/route.ts` and `app/api/products/route.ts` expose the catalog APIs. The response-shaping logic sits in `lib/api-responses.ts` so route handlers stay thin.
- `app/components/product-search.tsx` is the client-side search form; it calls the product search API and renders matching results using the shared tile component from `app/components/product-card.tsx`.
- `app/products/fresh-strawberries/page.tsx` is the product detail route; it remains a server component, and its purchase panel is local UI state only.
- `app/design/page.tsx` is the visual design-system showcase. Its interactive dialog is isolated in `app/design/dialog-example.tsx`.
- `app/docs/route.ts` serves the OpenAPI 3.1 document at `/docs`, and `public/mermaid.html` shows the current SQLite schema as Mermaid ER syntax. Keep both aligned with actual schema and route behavior.
- The SQLite schema currently has `categories` and `products` tables with no declared foreign-key relationship; do not infer one that is not present in the database.
- `app/globals.css` defines Farmart CSS custom properties and maps colors and fonts into Tailwind v4 via `@theme inline`; `DESIGN.md` is the source specification for the visual language and design tokens.
- The default database is `data/farmart.sqlite`; the directory, SQLite file, WAL files, and shared-memory files are all ignored by Git. Deployments need writable, persistent filesystem storage.

## Project conventions

- Keep routes as server components by default; add `"use client"` only to the smallest component that needs browser state or event handling. Keep route metadata exported from the server page.
- Use `next/link` for internal navigation and reuse `ProductCard` instead of duplicating product tile markup.
- Use the shared Tailwind token utilities (`bg-canvas`, `text-foreground`, `bg-primary`, `border-border`, and category colors) and CSS variables in `app/globals.css`; keep styling aligned with `DESIGN.md` and the established radii (4px for controls, 7px for cards) and quick transitions.
- Update the storefront catalog, API response, OpenAPI document, and Mermaid schema together when a schema or catalog change is intentional.
- Use parameterized SQLite statements for user input. Keep tests isolated with in-memory databases via `initializeCatalog`; never reset or remove a developer's `data/farmart.sqlite` to prepare tests.
- `better-sqlite3` is a native dependency; on Windows, installation can require matching native prebuild support or Visual Studio C++ build tools.
- For Next.js API or file-convention changes, read the root `AGENTS.md` and the relevant guide in `node_modules/next/dist/docs/` before coding. This repo is using Next.js 16 and may differ from older conventions or docs.
- For newcomer orientation or setup, follow `.github/skills/onboarding/SKILL.md`.
- The repo already includes a Playwright MCP config in `.mcp.json` for browser automation and page verification where needed.
