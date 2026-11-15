import projectData from "./projects.json";

export type PortfolioItem = {
  id: string;
  title: string;
  description?: string;
  /** Use YYYY-MM-DD so dates display consistently. */
  date?: string;
  /** Public URL, with each filename/folder segment URL-encoded. */
  image: string;
  alt: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  date?: string;
  coverImage: { image: string; alt: string };
  images: PortfolioItem[];
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

export type WorkCategory = keyof typeof projectData;

export const workCategories = Object.keys(projectData) as WorkCategory[];

export const worksByCategory: Record<WorkCategory, Project[]> = projectData;

export const projects = workCategories.flatMap((category) => worksByCategory[category]);

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export const homeProjects = projects.slice(0, 3).map((project, index) => ({
  ...project,
  images: project.images.slice(0, [3, 1, 2][index]),
}));

export const homeClosingImage = projects[3]?.images[0] ?? projects[0]?.images[0] ?? profile.detail;

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
