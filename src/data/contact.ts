import type { PortfolioItem, SocialLink } from "@/types/portfolio";

export const contactHeading = "Get in touch";

export const contactImage = {
  image: "/images/ending.jpg",
  alt: "Portrait of Zannatul Urmi",
};

export const contactLinks: SocialLink[] = [
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/zannatul-urmi-021257214/" },
  { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/01780594105" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/zannatul.urmiii/" },
  { label: "Email", icon: "email", href: "mailto:zannaturmi72@gmail.com" },
];

export const socialLinks = contactLinks;

export function socialPlaceholder(label: string): PortfolioItem {
  return {
    id: `contact-${label.toLowerCase().replaceAll(" ", "-")}`,
    title: label,
    description: "Contact details coming soon.",
    date: "2026-01-01",
    image: "/images/profilephoto.jpeg",
    alt: `${label} placeholder`,
  };
}
