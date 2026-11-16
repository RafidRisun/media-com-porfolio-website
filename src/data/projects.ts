import projectData from "./projects.json";
import videoData from "./videos.json";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";
import type { Project, ProjectCategory, VideoItem, WorkCategory } from "@/types/portfolio";

export const videos: VideoItem[] = videoData.map((video) => ({
  ...video,
  image: video.image.trim() || getYouTubeThumbnailUrl(video.link) || "/images/placeholder.svg",
  alt: `Thumbnail for ${video.title}`,
}));

export const projectCategories = Object.keys(projectData) as ProjectCategory[];
export const workCategories: WorkCategory[] = [...projectCategories, "Videography"];

export const worksByCategory: Record<ProjectCategory, Project[]> = projectData;

export const projects = projectCategories.flatMap((category) => worksByCategory[category]);

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
