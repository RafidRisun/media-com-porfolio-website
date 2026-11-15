import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageCard } from "@/components/gallery";
import { getProjectById, projects, workCategories, worksByCategory } from "@/data/content";

type WorkPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();
  return { title: project.title };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const category = workCategories.find((name) => worksByCategory[name].some((item) => item.id === id));

  return (
    <main id="main-content" className="flex w-full min-w-0 flex-col gap-7 md:gap-10">
      <header className="flex w-full min-w-0 flex-row items-start justify-between gap-3 text-left md:gap-4">
        <div className="flex min-w-0 flex-col items-start">
          <p className="max-w-full font-[family-name:var(--font-victory)] text-[clamp(40px,8vw,74px)] leading-[1.1] wrap-break-word text-[#520000] uppercase">{project.title}</p>
          <h1 className="max-w-full text-2xl leading-tight wrap-break-word text-[#656565] md:text-[32px]">{category}</h1>
        </div>
        <Link href="/works" className="inline-flex min-h-11 items-center gap-2 px-4 py-2 text-base text-[#520000] outline-offset-4 transition-colors hover:bg-[#520000] hover:text-white focus-visible:outline-2 focus-visible:outline-[#520000] motion-reduce:transition-none">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
          Return to works
        </Link>
      </header>
      <section aria-label={`${project.title} images`} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {project.images.map((item, index) => (
          <ImageCard key={item.id} item={item} className="aspect-square" priority={index < 4} />
        ))}
      </section>
    </main>
  );
}
