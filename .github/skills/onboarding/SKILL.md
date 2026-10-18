---
name: onboarding
description: "Get started with the Farmart storefront repository: orient to its Next.js and SQLite architecture, install dependencies, initialize and inspect seed catalog data, run the app, and verify APIs and tests. Use when onboarding a developer, starting project work, or setting up a fresh checkout."
argument-hint: "Optional: describe the feature or area you are onboarding to"
---

# Farmart Project Onboarding

Use this workflow to establish a verified understanding of the project before
starting development. Treat the checked-in source and current package scripts
as authoritative when repository notes disagree.

## 1. Orient to the checkout

1. Check the repository status first. Preserve any existing work; do not reset,
   overwrite, or delete user changes.
2. Read [README.md](../../../README.md), [package.json](../../../package.json),
   and [copilot-instructions.md](../../copilot-instructions.md). Read the
   specific source files for the feature being changed.
3. This is a Next.js 16 App Router application using React 19, TypeScript,
   Tailwind CSS 4, SQLite through `better-sqlite3`, and the Node test runner.
   Follow the installed Next.js guides in `node_modules/next/dist/docs/` for
   API or file-convention changes; do not rely on documentation for other
   Next.js versions.

## 2. Set up and verify

1. Install the lockfile-defined dependencies with `npm ci`.
2. Run the focused checks relevant to the task. Available project commands:

   ```powershell
   npm test
   npm run lint
   npx tsc --noEmit
   npm run build
   ```

3. Start the development server with `npm run dev` if one is not already
   running. Avoid starting a second server on the same project; use the
   existing server or choose an available port.
4. Load the storefront at `http://localhost:3000`. The SQLite catalog is
   initialized automatically on the first server-side catalog access. No
   separate seed command is needed.

## 3. Understand the application

- `app/page.tsx` renders the storefront and loads category and featured-product
  data from SQLite.
- `app/components/product-search.tsx` is the client-side search form; it calls
  the product search API and renders the matching products.
- `app/components/product-card.tsx` is the shared product tile.
- `app/products/fresh-strawberries/` contains the product page and purchase
  panel. The purchase interaction is local UI state, not a persistent cart API.
- `app/design/` contains the design-system showcase.
- `lib/store.ts` owns SQLite initialization, schema, seed records, and catalog
  queries. `lib/api-responses.ts` constructs JSON API responses.
- `app/api/home/route.ts` and `app/api/products/route.ts` expose the catalog
  APIs. `app/docs/route.ts` serves the OpenAPI specification.
- `public/mermaid.html` displays the current SQLite schema as a Mermaid ER
  diagram.
- `app/globals.css` and `DESIGN.md` define the shared visual tokens and design
  conventions.

## 4. Catalog and API baseline

The default database file is `data/farmart.sqlite`. Its directory and schema
are created by `initializeCatalog`; categories and products are inserted
transactionally with `INSERT OR IGNORE`. The database, SQLite WAL files, and
shared-memory files are ignored by Git. Do not delete or reset a developer's
database to reproduce seed data; tests create their own in-memory databases.

The current seed has eight categories:

- Fruits & Vegetables
- Breads & Sweets (active)
- Frozen Seafoods
- Raw Meats
- Wines & Alcohol Drinks
- Coffees and Teas
- Milks and Dairies
- Pet Foods

It has five featured products: Fresh strawberries (499 cents), Popcorn, Fresh
soup, Berry soda, and Hot dog. Only the strawberries currently have a listed
price.

Available endpoints:

- `GET /api/home` returns `{ categories, featuredProducts }`.
- `GET /api/products?q=<term>` searches product names and labels
  case-insensitively. The trimmed query is required, must be at most 100
  characters, and results are capped at 50. Invalid input returns HTTP 400.
- `GET /docs` returns the OpenAPI 3.1 document.
- `/mermaid.html` displays the schema diagram.

The SQLite database uses `categories` and `products` tables. Products have no
category foreign key in the current schema; do not imply a relationship that
isn't present in SQLite.

## 5. Start feature work safely

1. Confirm the requested behavior and identify the smallest relevant route,
   component, store helper, and tests.
2. Keep pages as Server Components by default. Put browser state in the
   smallest necessary `"use client"` component.
3. For catalog changes, update the schema or seed logic in `lib/store.ts` and
   keep homepage/API response shapes consistent. Use parameterized SQLite
   statements; do not interpolate user input into SQL.
4. Add or update unit/integration tests in `tests/backend.test.ts`. Use
   `initializeCatalog` with an in-memory `better-sqlite3` database so tests
   never modify `data/farmart.sqlite`.
5. Update `/docs`, `public/mermaid.html`, or `README.md` when the API, schema,
   or developer workflow changes.
6. Run `npm test`, lint the changed files, run `npx tsc --noEmit`, and build
   when appropriate. For UI work, also verify the rendered page and interaction
   in a browser.

## 6. Current project constraints

- The catalog is local SQLite data, not a hosted database service. A deployed
  instance needs writable persistent storage for `data/farmart.sqlite`.
- Cart, wishlist, account, search-language selection, and several storefront
  links are visual/client-side affordances rather than implemented backend
  services. Do not document or build them as server capabilities unless the
  task explicitly adds those features.
- Keep seed records representative of the current storefront content. Add
  migrations or an explicit seed workflow if future schema/data evolution
  requires more than the current idempotent first-use initialization.
