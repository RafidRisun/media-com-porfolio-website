export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  /** Use YYYY-MM-DD so dates display consistently. */
  date: string;
  /** Place files in public/images and use /images/your-file.jpg here. */
  image: string;
  alt: string;
};

const placeholder = "/images/placeholder.svg";

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const profile = {
  name: "Zannatul Urmi",
  introduction: description,
  closingText: description,
  portrait: {
    id: "portrait",
    title: "Zannatul Urmi",
    description,
    date: "2026-01-01",
    image: placeholder,
    alt: "Portrait of Zannatul Urmi",
  } satisfies PortfolioItem,
  detail: {
    id: "studio-detail",
    title: "A little about me",
    description,
    date: "2026-01-01",
    image: placeholder,
    alt: "A detail from my creative practice",
  } satisfies PortfolioItem,
};

export const projects = Array.from({ length: 9 }, (_, index): PortfolioItem => ({
  id: `project-${index + 1}`,
  title: `Project title ${index + 1}`,
  description,
  date: "2026-01-01",
  image: placeholder,
  alt: `Project ${index + 1} image placeholder`,
}));

export const homeProjects = [
  { title: "Project\ntitle 1", description, images: projects.slice(0, 3) },
  { title: "Project\ntitle 2", description, images: [projects[3]] },
  { title: "Project\ntitle 3", description, images: projects.slice(4, 6) },
];

export type WorkCategory = "Writings" | "Photography" | "Videography" | "Presentations";

export const workCategories: WorkCategory[] = ["Writings", "Photography", "Videography", "Presentations"];

// Replace each category's placeholder entries with your own projects.
// Each category has independent titles, descriptions, dates, images and alt text.
export const worksByCategory: Record<WorkCategory, PortfolioItem[]> = {
  Writings: projects,
  Photography: projects.map((item, index) => ({ ...item, id: `photography-${index + 1}`, title: `Photography project ${index + 1}`, alt: `Photography project ${index + 1} image placeholder` })),
  Videography: projects.map((item, index) => ({ ...item, id: `videography-${index + 1}`, title: `Videography project ${index + 1}`, alt: `Videography project ${index + 1} image placeholder` })),
  Presentations: projects.map((item, index) => ({ ...item, id: `presentations-${index + 1}`, title: `Presentations project ${index + 1}`, alt: `Presentations project ${index + 1} image placeholder` })),
};

export type SocialIcon = "linkedin" | "whatsapp" | "instagram" | "email";
export type SocialLink = {
  label: string;
  icon: SocialIcon;
  /** Add your real profile URL or mailto: address to turn this into a link. */
  href: string;
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", icon: "linkedin", href: "" },
  { label: "WhatsApp", icon: "whatsapp", href: "" },
  { label: "Instagram", icon: "instagram", href: "" },
  { label: "Email", icon: "email", href: "" },
];

export const contactLinks: SocialLink[] = [
  { label: "LinkedIn", icon: "linkedin", href: "" },
  { label: "WhatsApp", icon: "whatsapp", href: "" },
  { label: "Instagram", icon: "instagram", href: "" },
  { label: "Email", icon: "email", href: "" },
];

export function socialPlaceholder(label: string): PortfolioItem {
  return {
    id: `contact-${label.toLowerCase().replaceAll(" ", "-")}`,
    title: label,
    description: "Contact details coming soon.",
    date: "2026-01-01",
    image: placeholder,
    alt: `${label} placeholder`,
  };
}
