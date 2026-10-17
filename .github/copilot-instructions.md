# Repository instructions

## Build, lint, and validation

- `npm run dev` starts the Next.js development server.
- `npm run build` creates and type-checks the production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint across the repository.
- To lint one file, run `npx eslint app/products/fresh-strawberries/page.tsx` and replace the path with the file being changed.
- To run TypeScript without emitting files, run `npx tsc --noEmit`.
- There is no configured test script or test runner in this repository.

## Architecture

- This is a Next.js App Router application. `app/layout.tsx` provides the root document, metadata, and shared `app/globals.css`.
- `app/page.tsx` is the grocery storefront. `app/products/fresh-strawberries/page.tsx` is the product detail route; both currently render primarily as server components.
- `app/design/page.tsx` is the visual design-system showcase. Its interactive dialog is isolated in `app/design/dialog-example.tsx`.
- Shared product tiles live in `app/components/product-card.tsx`. Product purchase quantity and confirmation feedback are client-side state in `app/products/fresh-strawberries/purchase-panel.tsx`; they are not connected to persistent cart or inventory services.
- `app/globals.css` defines Farmart CSS custom properties and maps colors and fonts into Tailwind v4 with `@theme inline`. `DESIGN.md` is the source specification for the visual language and tokens.

## Project conventions

- Keep routes as server components by default; add `"use client"` to the smallest component that needs browser state or event handling. Keep route metadata exported from the server page.
- Use `next/link` for internal route navigation. Reuse `ProductCard` for product tiles rather than duplicating its markup.
- Use the shared Tailwind token utilities (`bg-canvas`, `text-foreground`, `bg-primary`, `border-border`, and category colors) and CSS variables in `app/globals.css`; keep the page styling aligned with `DESIGN.md`. The established radii are 4px for controls and 7px for cards, with restrained 150ms color/border transitions.
- Product and category content is currently defined as local arrays in the route that displays it. Preserve the existing static-content pattern unless adding a data source is part of the task.
- For Next.js API or file-convention changes, follow the root `AGENTS.md`: read the relevant guide shipped in `node_modules/next/dist/docs/` before coding, since this repository's installed Next.js version may differ from general documentation.
