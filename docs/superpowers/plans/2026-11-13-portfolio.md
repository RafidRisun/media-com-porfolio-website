# Portfolio Implementation Plan

**Goal:** Build the three Figma pages with editable content and accessible image popups.
**Architecture:** Shared App Router layout; data in src/data/content.ts; GalleryProvider and ImageCard handle every image interaction.
**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library.
**Spec:** ../specs/2026-11-13-portfolio-design.md

## Global constraints
Browser inspection only for Figma. Maximum content width 1440px. Local placeholders. Three routes. Every image/card opens item details.

## Review focus
Keyboard-only access, restored focus and scrolling, long popup content, narrow screens, editable image paths and links.

## Tasks
- [x] Configure Next.js/Tailwind and write popup interaction tests; run tests before implementation.
- [x] Create editable content, shared navigation/footer and popup provider; rerun interaction tests.
- [x] Implement Home, Works and Contact from the inspected frame proportions with responsive styling.
- [x] Run tests, ESLint, TypeScript and production build. Check all routes and mobile layout in the browser.
- [x] Document content editing and startup commands.

## Verification results

- Three popup interaction tests passed after first failing against the non-interactive card.
- ESLint passed without warnings; TypeScript and the production build passed.
- All three pages reviewed in the browser. Phone gallery and popup checked at 390px; tablet Home checked at 768px; maximum shell width measured at exactly 1440px with a 1920px viewport.
- Production dependency audit reported zero vulnerabilities.
- The preinstalled npm 10 resolver crashed; npm 11.6.2 installed the dependencies successfully. README recommends Node 22.13+ to meet all tooling engine requirements.
