---
name: project-document
description: Understand and maintain the Farmart project source map, module ownership, and development workflow. Use for project architecture questions and updating project documentation from source changes.
---

# Farmart project document

Read [the generated source snapshot](references/source-map.md) for current package versions, commands, imports, exports, and file fingerprints. It is regenerated from Git-visible source files, including untracked files that are not ignored. It is a structural index, not a semantic code review or proof that tests passed.

## Ownership and invariants

- `app/` owns Next.js App Router pages and HTTP handlers. Keep browser interactions in the smallest client component.
- `lib/store.ts` owns SQLite access and catalog queries. At the time this skill was created, runtime access opens an existing database read-only and throws when its file is missing. `initializeCatalog` is a separate schema/seed helper used by tests; runtime does not call it. Recheck this distinction when changing storage behavior: older onboarding notes describe automatic initialization.
- `lib/api-responses.ts` owns API response shapes and search query validation. Search trims `q`, requires 1–100 characters, and caps matches at 50 through the store. SQL values are parameterized and LIKE wildcards are escaped.
- `tests/backend.test.ts` uses in-memory SQLite; preserve the developer database. Purchase controls currently use local UI state, not a persistent cart service.
- Follow root `AGENTS.md`: query graphify before source exploration, consult installed Next.js guides before coding, update graphify after code edits, and run lint and tests.

Source is authoritative. Confirm behavioral claims in the responsible module before editing; update this hand-maintained section when ownership or invariants change. Do not infer behavior from exported names alone.

## Refresh loop

From the repository root:

```powershell
npm run skill:update
npm run skill:watch
```

The watcher refreshes immediately, then checks every 300 seconds. It updates only `references/source-map.md` when source content changes, preserving this hand-maintained skill. It includes source fingerprints so implementation-only changes are detected. It does not execute application code, read environment files/databases, call AI services, commit changes, or claim semantic review. Errors are reported and retried on the next interval. Run only one watcher; Ctrl+C stops a foreground watcher. A background watcher stops when its process is terminated or Windows restarts; it does not install a startup task.
