"use client";

import { CardCover } from "@/components/card-cover";
import { useGallery } from "@/components/gallery";
import type { VideoItem } from "@/types/portfolio";

export function VideoTrigger({ video, children, className = "" }: { video: VideoItem; children: React.ReactNode; className?: string }) {
  const { open } = useGallery();
  return <button type="button" onClick={() => open(video)} className={`cursor-pointer ${className}`}>{children}</button>;
}

export function VideoCard({ video, className = "", priority = false }: { video: VideoItem; className?: string; priority?: boolean }) {
  const { open } = useGallery();
  return (
    <button type="button" onClick={() => open(video)} aria-label={`Play ${video.title}`}
      className={`group relative flex min-w-0 cursor-pointer overflow-hidden bg-[#d9d9d9] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#520000] ${className}`}>
      <CardCover image={video.image} alt={video.alt} title={video.title} priority={priority} unoptimized={/^https?:\/\//i.test(video.image)} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out group-hover:opacity-0 group-focus-visible:opacity-0 [@media(hover:none)]:opacity-0">
        <span className="flex size-9 items-center justify-center rounded-full bg-black/45 text-white sm:size-11">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7V5Z" /></svg>
        </span>
      </span>
    </button>
  );
}
