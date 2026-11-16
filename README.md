# Zannatul Urmi portfolio

Next.js App Router + TypeScript + Tailwind CSS. Project images come from `public/projects`; profile images and introductory text still use placeholders.

## Run locally

Use Node.js 22.13+ (or Node 24 LTS) and a current npm version.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Pages: `/`, `/works`, `/works/[id]`, `/contact`.

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

## Add your content

Project folders in **public/projects/** are grouped by category:

```text
public/projects/
  Photography/
    Birulia Zamindar Bari/
      20221130131024_IMG_3160.jpg
    Jolshiri Park/
    Street Photography/
    Tajhat Zamindar Bari/
  Graphics/
    UPHCSDP-II/
```

Run `npm run sync:projects` after adding or changing files to regenerate **src/data/projects.json**. The current import includes five projects and 81 images. This command rebuilds the JSON, replacing manual metadata edits; keep a copy of custom descriptions or cover overrides before rescanning.

Folder names become category and project titles. IDs use stable category/project slugs. The first naturally sorted image becomes the cover; a file named `cover.jpg`, `cover.png`, or another supported image extension takes precedence. Spaces, punctuation, and Bengali filenames are encoded safely in image URLs. Each collection has this shape:

```json
{
  "id": "photography-birulia-zamindar-bari",
  "title": "Birulia Zamindar Bari",
  "description": "",
  "date": "2022-11-30",
  "coverImage": {
    "image": "/projects/Photography/Birulia%20Zamindar%20Bari/20221130131024_IMG_3160.jpg",
    "alt": "Project cover"
  },
  "images": [
    {
      "id": "photography-birulia-zamindar-bari-20221130131024-img-3160-jpg",
      "title": "20221130131024_IMG_3160",
      "image": "/projects/Photography/Birulia%20Zamindar%20Bari/20221130131024_IMG_3160.jpg",
      "alt": "Describe the image for accessibility",
      "date": "2022-11-30"
    }
  ]
}
```

Project IDs form URLs such as `/works/photography-birulia-zamindar-bari`. Image descriptions are optional. Dates are included only when a valid `YYYYMMDD` prefix exists in the filename; unknown dates are omitted. A project date is included only when all its images share the same known date. You can edit descriptions and cover URLs in the JSON after importing.

Project cards reveal their full title in white Victory lettering on hover or keyboard focus, with a 500ms fade and a subtle gradient for contrast. Titles scale uniformly to the card width and touch its bottom edge. Touch devices show the titles without requiring hover.

### Videography

Edit **src/data/videos.json** to add YouTube videos. This file is maintained separately and is not overwritten by `npm run sync:projects`. Replace the included YouTube demo with your own entries:

```json
[
  {
    "id": "my-video",
    "link": "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    "title": "Your video title",
    "description": "Your video description.",
    "image": "/images/my-video-thumbnail.jpg"
  }
]
```

Use a unique `id` for each entry. `description` is optional. Leave `image` as `""` to use the video's own YouTube thumbnail automatically. A nonempty `image` overrides it with a local public path or a full thumbnail URL. Empty or invalid video links fall back to the grey placeholder. Normal YouTube links, `youtu.be` shares, Shorts, live-video links, and embed links are supported. Use videos that permit embedding.

Selecting Videography shows widescreen thumbnail cards with the same fitted Victory title fade. Clicking a card opens its YouTube player and description in the shared modal. The player supports inline playback and fullscreen; closing the modal removes the player and stops playback. Other project categories continue to open their image galleries.

Edit **src/data/content.ts** for other content:

- `profile`: your name, introduction, portrait and small hero image.
- `homeProjects`: featured projects and their image arrangements on Home. The three See Project links open the matching project galleries.
- `projects`, `worksByCategory`, and `getProjectById`: typed views and lookups of the JSON data. Categories come from the imported folders, with Photography first. Choosing another category changes the covers and the large sidebar heading. Clicking a cover opens its `/works/[id]` page.
- `socialLinks` and `contactLinks`: labels, icons and destinations. Empty destinations open a placeholder popup; add real URLs or `mailto:you@example.com` to activate links.

Project pages show the category and project title aligned left above the image grid, with a Return to works button. The grid contains only that project's images, with four columns on desktop and two on phones. Clicking an image opens the existing popup. The popup uses the clicked image's JSON object, so its details stay in sync. Dates use `YYYY-MM-DD`.

The shared container is capped at **1280px** in **src/app/layout.tsx**. Pages fill that container. Component styles live in Tailwind `className` values; `globals.css` only imports Tailwind. Layouts use flexbox with parent `gap` utilities for spacing and padding for container edges. Navigation uses native links, interactive controls use buttons, and pages use semantic HTML. Titles use **Victory Striker Sans Demo**, text uses **Viaoda Libre**, and navigation links use **Calibri**. Both web fonts are self-hosted through `next/font/local`.

The sticky navbar starts centered on Home. Once `hero-title` scrolls behind the header, the links slide right over 700ms and the Victory name fades in on the left. Scrolling back reverses the transition. Other pages always show the name and right-aligned links. The header height stays fixed during the animation, and the hidden name is excluded from keyboard navigation.

Gallery images open a shared popup: a wide image above a white caption area with an optional description and a right-aligned date in DD/MM/YYYY format when known. Missing or blank descriptions leave no empty caption paragraph. The popup has no visible title. Close it with Escape, the close button or the backdrop. Focus stays inside the popup, returns to the clicked image when it closes, and background scrolling is locked while open.

The Home hero and Contact portrait are plain, non-clickable images. Popup dates use Calibri. Lenis handles smooth scrolling through `src/components/smooth-scroll.tsx` and pauses page scrolling while a popup is open. Scrollable popup content keeps native scrolling. `respectReducedMotion: false` matches the AronnyoJon project's Lenis 1.3.25 behavior: scroll easing stays enabled even when the browser requests reduced motion. Set it to `true` to honor that preference instead.
"# media-com-porfolio-website" 
