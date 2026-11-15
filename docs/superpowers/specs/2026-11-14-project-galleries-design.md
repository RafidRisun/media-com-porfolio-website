# Project galleries

Each project is a container for images, described in JSON with an ID, title, category grouping, date, description, cover image, and nested images. Cover images and gallery images use the existing grey placeholder URL. Image descriptions are optional.

Works keeps its categories and nine cover cards per category. Clicking a cover navigates to `/works/[id]`. The detail page shows the selected category and project title aligned left, with a Return to works button, before an accessible image grid: four columns from the existing medium breakpoint, two columns on phones. Clicking an image uses the existing modal, including its keyboard controls, focus restoration, date, and optional description. Unknown IDs render a 404.

Home keeps its featured arrangements and gains working See Project links. Its previews come from each featured project's own images. Profile and contact content stay in the existing TypeScript content module.

The implementation uses the existing Next.js App Router, Tailwind classes, and gallery provider without new dependencies. Real project files can later live in `public/images/projects/<id>/`, with their paths recorded in JSON. No new images are generated.
