import type projectData from "@/data/projects.json";

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

export type VideoItem = PortfolioItem & { link: string };

export type ProjectCategory = keyof typeof projectData;
export type WorkCategory = ProjectCategory | "Videography";

export type SocialIcon = "linkedin" | "whatsapp" | "instagram" | "email";

export type SocialLink = {
  label: string;
  icon: SocialIcon;
  /** Add your real profile URL or mailto: address to turn this into a link. */
  href: string;
};
