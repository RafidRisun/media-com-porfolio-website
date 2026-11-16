import Link from "next/link";
import { CardCover } from "@/components/card-cover";
import type { Project } from "@/types/portfolio";

export function ProjectCard({ project, className = "", priority = false }: { project: Project; className?: string; priority?: boolean }) {
  return (
    <Link href={`/works/${project.id}`} aria-label={`View ${project.title}`}
      className={`group relative flex min-w-0 overflow-hidden bg-[#d9d9d9] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#520000] ${className}`}>
      <CardCover image={project.coverImage.image} alt={project.coverImage.alt} title={project.title} priority={priority} />
    </Link>
  );
}
