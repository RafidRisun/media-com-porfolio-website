# Urmi portfolio

Implement the three supplied Figma frames as Next.js App Router pages: Home (/), Works (/works), Contact (/contact), using Tailwind CSS. Browser inspection is the design source, as requested. The workspace starts empty.

Use a white background, pale gray image placeholders, narrow burgundy display headings, small serif body text, centered navigation, generous vertical whitespace, and a centered social footer. Home alternates portrait triptychs, a panoramic project, and a two-image project with a closing image/text row. Works uses a three-by-three square gallery and Writings sidebar. Contact uses a large portrait and Get in touch links.

Content has a maximum width of 1440px. At narrower sizes use fluid spacing and stack split layouts without horizontal overflow. Keep replaceable copy, dates, image paths, writing entries, and social links in src/data/content.ts. No CMS or backend is needed. Placeholder links open editable entry details rather than pointing to invented accounts.

All images/cards open the same modal with that item's image, title, description, and date. Support Escape, backdrop close, focus containment/restoration, and scroll locking. Images are local placeholders, matching the reference rather than invented artwork.

Approach: shared layout and reusable image buttons with one client-side gallery provider. This keeps content changes simple and avoids separate popup implementations. A CMS would add infrastructure the request doesn't need; a single-page site would lose the three distinct Figma navigation destinations.

Implementation choices: TypeScript, self-hosted Six Caps display font, native React interactions, local SVG placeholders. User authorization is the implementation request; routine choices proceed without an additional approval gate.
