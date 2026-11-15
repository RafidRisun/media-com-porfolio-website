import Image from "next/image";
import Link from "next/link";
import { ProjectTitle } from "@/components/project-title";
import type { Project } from "@/data/content";

export function ProjectCard({ project, className = "", priority = false }: { project: Project; className?: string; priority?: boolean }) {
  return (
    <Link href={`/works/${project.id}`} aria-label={`View ${project.title}`}
      className={`group relative flex min-w-0 overflow-hidden bg-[#d9d9d9] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#520000] ${className}`}>
      <Image src={project.coverImage.image} alt={project.coverImage.alt} fill priority={priority}
        sizes="(max-width: 767px) 30vw, (max-width: 1199px) 23vw, 310px"
        className="object-cover transition-[transform,filter] duration-[450ms] group-hover:brightness-[.97] motion-reduce:transition-none" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
        <span className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        <ProjectTitle title={project.title} />
      </span>
    </Link>
  );
}
