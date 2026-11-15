# Project Galleries Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement the tasks in this session. Steps use checkbox syntax for tracking.

**Goal:** Make projects JSON-backed image collections with linked detail pages and the existing image modal.

**Architecture:** Category-grouped JSON contains independently editable projects, cover images, and image arrays. The content module supplies typed project data to linked Works covers, Home previews, and an async dynamic route.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-14-project-galleries-design.md`

## Global Constraints

- Preserve the existing category layout, Photography default, and nine projects per category.
- Use `/works/[id]`, existing grey placeholders, and optional image descriptions.
- Four gallery columns on desktop, two on mobile; preserve the modal's keyboard and scrolling behavior.
- Await route params as required by the installed Next.js documentation.
- Work in the supplied checkout to preserve the user's current Home changes; leave unrelated lockfile changes intact. Do not commit or deploy.

## Review Focus

- Cover links must open their own project's images across all categories.
- Images without descriptions must open without an empty caption or dangling ARIA reference.
- Unknown IDs must render 404 rather than an empty gallery.
- Home previews and links must refer to the same project.
- Direct route loading, mobile overflow, and modal dismissal must work in the browser.

### Task 1: Data, cover navigation, and optional descriptions

**Files:** `src/data/projects.json`, `src/data/content.ts`, `src/components/project-card.tsx`, `src/components/works-gallery.tsx`, `src/components/gallery.tsx`, `tests/works.test.tsx`, `tests/gallery.test.tsx`.

**Interfaces:** `Project` has `id`, `title`, `description`, `date`, `coverImage: { image, alt }`, and `images: PortfolioItem[]`; `PortfolioItem.description` becomes optional. `projects` lists all JSON projects; `worksByCategory` groups them; `getProjectById(id)` returns the matching project or undefined.

- [x] Write tests for category cover links and missing/empty image descriptions; confirm the expected failures.
- [x] Add JSON sample projects and typed exports; replace Works image buttons with linked project covers.
- [x] Render modal descriptions and their ARIA reference only when a nonblank description exists.
- [x] Run the focused tests and confirm they pass.

### Task 2: Detail routes and Home integration

**Files:** `src/app/works/[id]/page.tsx`, `src/app/page.tsx`, `src/components/navigation.tsx`, `tests/work-detail.test.tsx`, `tests/home.test.tsx`, `README.md`.

**Interfaces:** Route props contain `params: Promise<{ id: string }>`; the route consumes Task 1's `getProjectById` and renders that project's image cards. Home consumes the same projects and preserves its preview counts.

- [x] Write tests for scoped project images, modal opening, absent descriptions, unknown IDs, and Home link targets; confirm expected failures.
- [x] Implement static params, metadata, 404 handling, the responsive grid, and Home project links; mark Works active on detail pages.
- [x] Document the JSON shape and future per-project asset folders.
- [x] Run all tests, type checking, lint, and the production build.
- [x] Browser-check cover navigation, direct detail loading, 404s, four desktop columns, mobile columns, and modal dismissal; review the final diff.

## Verification and review

- All 19 tests pass, including category headers and return links for every category, renamed JSON titles, and focus loss when the background becomes inert.
- TypeScript and ESLint pass.
- `npm run build -- --webpack` passes and generates all 36 project routes. The default Turbopack build encounters a local CSS-worker connection failure; Webpack was verified outside the Windows sandbox after an in-sandbox output-directory permission error.
- Browser checks confirm linked cover navigation, direct project loading, unknown-ID 404s, two columns at 320/375px, four columns at 768/1280px, no horizontal overflow, both caption cases, dismissal, focus restoration, and unlocked scrolling.
- Independent review found a hardcoded Home title; it now derives from JSON. Browser QA found that focus was captured after the background became inert; it is now captured when the gallery opens. Both fixes were tested failing first and passing after the fix.
