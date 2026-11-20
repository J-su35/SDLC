# Graph Report - Lab3  (2026-11-20)

## Corpus Check
- 41 files · ~14,921 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: .css 2, (none) 1, .ico 1)

## Summary
- 274 nodes · 354 edges · 21 communities (18 shown, 3 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b36c431d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- next
- initializeCatalog
- store.ts
- compilerOptions
- DESIGN.md
- design/page.tsx
- with
- block-dangerous-commands.mjs
- scripts
- playwright
- AGENTS.md
- dependencies
- update-project-skill.mjs
- interface
- interface
- Source modules
- Generated source snapshot

## God Nodes (most connected - your core abstractions)
1. `Source modules` - 27 edges
2. `compilerOptions` - 16 edges
3. `next` - 12 edges
4. `initializeCatalog()` - 9 edges
5. `scripts` - 9 edges
6. ``lib/store.ts`` - 8 edges
7. `getHomePageData()` - 7 edges
8. `Farmart Project Onboarding` - 7 edges
9. `with` - 6 edges
10. `react` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Ownership and invariants` --references--> `initializeCatalog()`  [INFERRED]
  .agents/skills/project-document/SKILL.md → lib/store.ts
- ``lib/store.ts`` --references--> `Category`  [INFERRED]
  .agents/skills/project-document/references/source-map.md → lib/store.ts
- ``lib/store.ts`` --references--> `initializeCatalog()`  [INFERRED]
  .agents/skills/project-document/references/source-map.md → lib/store.ts
- `Project conventions` --references--> `initializeCatalog()`  [INFERRED]
  .github/copilot-instructions.md → lib/store.ts
- `Find and verify` --references--> `initializeCatalog()`  [INFERRED]
  .github/skills/code-review/SKILL.md → lib/store.ts

## Import Cycles
- None detected.

## Communities (21 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.08
Nodes (34): devDependencies, eslint@^9.39.5, eslint-config-next@16.4.6, @eslint/js@^9.39.5, eslint-plugin-react@^7.37.5, globals@^17.14.0, @playwright/test@^1.65.1, tailwindcss@^4 (+26 more)

### Community 1 - "next"
Cohesion: 0.09
Nodes (18): ProductCard(), ProductCardProps, ProductSearch(), SearchProduct, SearchResponse, geistMono, geistSans, metadata (+10 more)

### Community 2 - "initializeCatalog"
Cohesion: 0.08
Nodes (23): Architecture, Build, lint, and validation, Project conventions, Repository instructions, Establish the scope, Farmart Code Review, Find and verify, Report (+15 more)

### Community 3 - "store.ts"
Cohesion: 0.16
Nodes (20): `lib/api-responses.ts`, `lib/store.ts`, GET(), GET(), homeApiResponse(), HomeDataProvider, HomePageData, productsApiResponse() (+12 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "DESIGN.md"
Cohesion: 0.22
Nodes (8): Colors, Components, Do's and Don'ts, Elevation & Depth, Layout, Overview, Shapes, Typography

### Community 6 - "design/page.tsx"
Cohesion: 0.32
Nodes (4): DialogExample(), colors, DesignSystemPage(), spacing

### Community 7 - "with"
Cohesion: 0.11
Nodes (18): jobs, regression, name, on, permissions, contents, runs-on, steps (+10 more)

### Community 8 - "block-dangerous-commands.mjs"
Cohesion: 0.33
Nodes (5): command, getBlockReason(), getCommand(), getCommandBlockReason(), reason

### Community 9 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, lint, skill:update, skill:watch, start, test (+1 more)

### Community 10 - "playwright"
Cohesion: 0.50
Nodes (3): npx, playwright, @playwright/mcp

### Community 11 - "AGENTS.md"
Cohesion: 0.50
Nodes (3): graphify, lint, This is NOT the Next.js you know

### Community 13 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, better-sqlite3@^13.0.3, next@16.4.6, react@19.3.0, react-dom@19.3.0, server-only@^0.0.1, react-dom, server-only

### Community 14 - "update-project-skill.mjs"
Cohesion: 0.14
Nodes (6): code(), output, refresh(), root, run(), hook

### Community 15 - "interface"
Cohesion: 0.33
Nodes (5): interface, display_name, short_description, policy, allow_implicit_invocation

### Community 16 - "interface"
Cohesion: 0.50
Nodes (3): interface, display_name, short_description

### Community 19 - "Source modules"
Cohesion: 0.08
Nodes (25): `app/api/hello/route.ts`, `app/api/home/route.ts`, `app/api/products/route.ts`, `app/components/product-card.tsx`, `app/components/product-search.tsx`, `app/design/dialog-example.tsx`, `app/design/page.tsx`, `app/docs/route.ts` (+17 more)

### Community 20 - "Generated source snapshot"
Cohesion: 0.22
Nodes (7): App Router entry files, Commands, Generated source snapshot, Package versions, Farmart project document, Ownership and invariants, Refresh loop

## Knowledge Gaps
- **2 isolated node(s):** `npx`, `@playwright/mcp`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 143 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Source modules` connect `Source modules` to `store.ts`, `Generated source snapshot`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `initializeCatalog()` (e.g. with ``lib/store.ts`` and `Ownership and invariants`) actually correct?**
  _`initializeCatalog()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `npx`, `@playwright/mcp` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `package.json`, `store.ts`, `dependencies`, `design/page.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09462365591397849 - nodes in this community are weakly interconnected._
- **Why does ``lib/store.ts`` connect `store.ts` to `initializeCatalog`, `Source modules`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._