# Graph Report - Lab3  (2026-11-15)

## Corpus Check
- 39 files · ~13,574 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .css 2, (none) 1, .ico 1)

## Summary
- 228 nodes · 294 edges · 19 communities (15 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `212d744f`
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
- command-hook.test.mjs
- interface
- interface

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `next` - 12 edges
3. `initializeCatalog()` - 8 edges
4. `scripts` - 7 edges
5. `Farmart Project Onboarding` - 7 edges
6. `with` - 6 edges
7. `getHomePageData()` - 6 edges
8. `react` - 6 edges
9. `steps` - 5 edges
10. `ProductCard()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Project conventions` --references--> `initializeCatalog()`  [INFERRED]
  .github/copilot-instructions.md → lib/store.ts
- `Find and verify` --references--> `initializeCatalog()`  [INFERRED]
  .github/skills/code-review/SKILL.md → lib/store.ts
- `4. Catalog and API baseline` --references--> `initializeCatalog()`  [INFERRED]
  .github/skills/onboarding/SKILL.md → lib/store.ts
- `5. Start feature work safely` --references--> `initializeCatalog()`  [INFERRED]
  .github/skills/onboarding/SKILL.md → lib/store.ts
- `HomePageContent()` --calls--> `getHomePageData()`  [EXTRACTED]
  app/page.tsx → lib/store.ts

## Import Cycles
- None detected.

## Communities (19 total, 4 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.08
Nodes (34): devDependencies, eslint@^9.39.5, eslint-config-next@16.4.6, @eslint/js@^9.39.5, eslint-plugin-react@^7.37.5, globals@^17.14.0, @playwright/test@^1.65.1, tailwindcss@^4 (+26 more)

### Community 1 - "next"
Cohesion: 0.09
Nodes (18): ProductCard(), ProductCardProps, ProductSearch(), SearchProduct, SearchResponse, geistMono, geistSans, metadata (+10 more)

### Community 2 - "initializeCatalog"
Cohesion: 0.08
Nodes (21): Architecture, Build, lint, and validation, Project conventions, Repository instructions, Establish the scope, Farmart Code Review, Find and verify, Report (+13 more)

### Community 3 - "store.ts"
Cohesion: 0.14
Nodes (20): GET(), GET(), homeApiResponse(), HomeDataProvider, HomePageData, productsApiResponse(), ProductSearch, Category (+12 more)

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
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, test:e2e

### Community 10 - "playwright"
Cohesion: 0.50
Nodes (3): npx, playwright, @playwright/mcp

### Community 11 - "AGENTS.md"
Cohesion: 0.50
Nodes (3): graphify, lint, This is NOT the Next.js you know

### Community 13 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, better-sqlite3@^13.0.3, next@16.4.6, react@19.3.0, react-dom@19.3.0, server-only@^0.0.1, react-dom, server-only

### Community 15 - "interface"
Cohesion: 0.33
Nodes (5): interface, display_name, short_description, policy, allow_implicit_invocation

### Community 16 - "interface"
Cohesion: 0.50
Nodes (3): interface, display_name, short_description

## Knowledge Gaps
- **2 isolated node(s):** `npx`, `@playwright/mcp`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 114 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `package.json`, `store.ts`, `dependencies`, `design/page.tsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `initializeCatalog()` (e.g. with `Project conventions` and `Find and verify`) actually correct?**
  _`initializeCatalog()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `npx`, `@playwright/mcp` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Why does `better-sqlite3` connect `store.ts` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09462365591397849 - nodes in this community are weakly interconnected._
- **Should `initializeCatalog` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._