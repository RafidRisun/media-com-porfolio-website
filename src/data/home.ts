import { getProjectById, projects, videos } from "./projects";
import type { PortfolioItem } from "@/types/portfolio";

const placeholder = "/images/profilephoto.jpeg";

const coverphoto = "/images/coverPhoto.jpg";

const description = 'Communications professional with a background in Mass Communication and Journalism and experience in communication planning, project coordination, research, and content development. Skilled in crafting proposals, bilingual project narratives, and beneficiary stories, alongside visual communication and audiovisual production using Canva, Adobe Creative Suite, Google Workspace, and Microsoft Office. Dedicated to leveraging strategic storytelling to document development outcomes, amplify community voices, and strengthen public engagement.';

const closingDescription = `A Little More to Explore

I have always been drawn to stories, the ones people tell, the ones hidden in everyday moments, and the ones waiting to be discovered. Whether through words, photographs or moving images, I find meaning in observing the world, asking questions and capturing perspectives. 

This portfolio is only a glimpse of what I have explored and created so far. There is still so much to learn, see, experience and tell.

Hope the stories continue.`;

export const profile = {
  name: "Zannatul Urmi",
  introduction: description,
  closingText: closingDescription,
  coverPhoto: {
    image: coverphoto,
    alt: "A detail from my creative practice",
  },
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

const tajhatProject = getProjectById("photography-tajhat-zamindar-bari")!;
const conchBanglesVideo = videos.find((video) => video.id === "video-2")!;
const uphcsdpProject = getProjectById("graphics-uphcsdp-ii")!;

export const homeProjects = [
  { ...tajhatProject, images: tajhatProject.images.slice(0, 3) },
  { ...conchBanglesVideo, image: "/images/shakha.png" },
  { ...uphcsdpProject, images: uphcsdpProject.images.slice(0, 2) },
] as const;

export const closingImage = "/images/ending.jpg";

export const homeClosingImage: PortfolioItem = closingImage
  ? { id: "home-closing", title: "A detail from my creative practice", image: closingImage, alt: "A detail from my creative practice" }
  : projects[3]?.images[0] ?? projects[0]?.images[0] ?? profile.detail;

