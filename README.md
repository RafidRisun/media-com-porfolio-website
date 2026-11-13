# Zannatul Urmi portfolio

Next.js App Router + TypeScript + Tailwind CSS. Implements the Home, Works and Contact frames from the supplied Figma file, inspected in the browser. Gray image placeholders and sample text are intentional.

## Run locally

Use Node.js 22.13+ (or Node 24 LTS) and a current npm version.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Pages: `/`, `/works`, `/contact`.

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

## Add your content

Edit **src/data/content.ts**:

- `profile`: your name, introduction, portrait and small hero image.
- `projects`: the nine Works cards. Each entry has a title, description, ISO date, image path and alt text.
- `homeProjects`: featured image arrangements and their text on Home.
- `worksByCategory`: independent project arrays for Writings, Photography, Videography, and Presentations. Writings is selected initially; choosing another category changes the grid and the large sidebar heading. Each card still opens its own popup.
- `socialLinks` and `contactLinks`: labels, icons and destinations. Empty destinations open a placeholder popup; add real URLs or `mailto:you@example.com` to activate links.

Put your photos in **public/images/**, then set `image` to e.g. `/images/my-project.jpg`. Replace the generated `projects` array with individual objects to give each card unique content. The popup uses the same object as the clicked image, so its details stay in sync. Dates use `YYYY-MM-DD`.

The shared container is capped at **1280px** in **src/app/layout.tsx**. Pages fill that container. Component styles live in Tailwind `className` values; `globals.css` only imports Tailwind. Layouts use flexbox with parent `gap` utilities for spacing and padding for container edges. Navigation uses native links, interactive controls use buttons, and pages use semantic HTML. Titles use **Victory Striker Sans Demo**, text uses **Viaoda Libre**, and navigation links use **Calibri**. Both web fonts are self-hosted through `next/font/local`.

Every image and writing entry opens a shared popup: a wide image above a white caption area with the description and a right-aligned date in DD/MM/YYYY format. The popup has no visible title. Close it with Escape, the close button or the backdrop. Focus stays inside the popup, returns to the clicked card when it closes, and background scrolling is locked while open.

The Home hero and Contact portrait are plain, non-clickable images. Popup dates use Calibri. Lenis handles smooth scrolling through `src/components/smooth-scroll.tsx` and pauses page scrolling while a popup is open. Scrollable popup content keeps native scrolling. `respectReducedMotion: false` matches the AronnyoJon project's Lenis 1.3.25 behavior: scroll easing stays enabled even when the browser requests reduced motion. Set it to `true` to honor that preference instead.
"# media-com-porfolio-website" 
