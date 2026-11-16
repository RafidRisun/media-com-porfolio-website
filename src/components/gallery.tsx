"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import type { PortfolioItem, VideoItem } from "@/data/content";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

type GalleryItem = PortfolioItem | VideoItem;

const GalleryContext = createContext<{ open: (item: GalleryItem) => void } | null>(null);

export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) throw new Error("Gallery components must be inside GalleryProvider.");
  return context;
}

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<{ item: GalleryItem; trigger: HTMLElement | null } | null>(null);
  const open = useCallback((item: GalleryItem) => {
    const trigger = document.activeElement;
    setSelected({ item, trigger: trigger instanceof HTMLElement ? trigger : null });
  }, []);
  const close = useCallback(() => setSelected(null), []);
  return (
    <GalleryContext.Provider value={{ open }}>
      <div className="w-full" inert={selected ? true : undefined}>{children}</div>
      {selected && <ProjectModal item={selected.item} trigger={selected.trigger} onClose={close} />}
    </GalleryContext.Provider>
  );
}

export function ImageCard({ item, className = "", priority = false }: { item: PortfolioItem; className?: string; priority?: boolean }) {
  const { open } = useGallery();
  return (
    <button type="button" className={`group relative flex min-w-0 cursor-pointer overflow-hidden bg-[#d9d9d9] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#520000] ${className}`} aria-label={`View ${item.title}`} onClick={() => open(item)}>
      <Image src={item.image} alt={item.alt} fill priority={priority} sizes="(max-width: 767px) 90vw, (max-width: 1199px) 60vw, 900px"
        className="object-cover transition-[transform,filter] duration-[450ms] group-hover:brightness-[.97] motion-reduce:transition-none" />
    </button>
  );
}

function ProjectModal({ item, trigger, onClose }: { item: GalleryItem; trigger: HTMLElement | null; onClose: () => void }) {
  const lenis = useLenis();
  const descriptionId = useId();
  const description = item.description?.trim();
  const isVideo = "link" in item;
  const videoEmbedUrl = isVideo ? getYouTubeEmbedUrl(item.link) : null;
  const modalRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const wasStopped = lenis?.isStopped;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>('button, iframe, a[href], [tabindex="0"]:not([data-focus-guard])');
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      if (!wasStopped) lenis?.start();
      trigger?.focus();
    };
  }, [lenis, onClose, trigger]);

  const date = item.date ? new Date(`${item.date}T00:00:00Z`) : null;
  const dateLabel = date && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" }).format(date) : item.date;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center overflow-y-auto bg-[rgb(20_10_10/55%)] p-[18px] backdrop-blur-[5px] md:p-8"
      data-testid="modal-backdrop" data-lenis-prevent onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={modalRef} role="dialog" aria-modal="true" aria-label={item.title} aria-describedby={description ? descriptionId : undefined}
        className="relative flex max-h-[calc(100dvh-36px)] w-full max-w-[1280px] flex-col overflow-y-auto bg-white shadow-[0_24px_100px_#0003] md:max-h-[calc(100dvh-64px)]">
        <button type="button" ref={closeRef} aria-label="Close project" onClick={onClose}
          className="absolute top-3 right-3 z-10 flex size-8 cursor-pointer items-center justify-center bg-white/80 text-[#555] outline-offset-4 hover:bg-white focus-visible:outline-2 focus-visible:outline-[#520000]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
        {isVideo ? (
          <div className="relative flex aspect-video max-h-[70dvh] min-h-[200px] w-full shrink-0 items-center justify-center bg-black">
            {videoEmbedUrl ? (
              <iframe src={videoEmbedUrl} title={`YouTube player: ${item.title}`} tabIndex={0}
                className="absolute inset-0 size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            ) : <p className="p-6 text-center text-white">This video is unavailable.</p>}
          </div>
        ) : <div className="relative flex aspect-[158/94] max-h-[70dvh] min-h-40 w-full shrink bg-[#d9d9d9] md:min-h-[200px]">
          <Image src={item.image} alt={item.alt} fill unoptimized sizes="(max-width: 1280px) 100vw, 1280px" className="object-contain" />
        </div>}
        {(description || item.date) && <div className={`flex w-full min-w-0 shrink-0 flex-col gap-6 p-5 md:p-8 ${description ? "md:min-h-[184px]" : ""}`}>
          {description && <p id={descriptionId} className="text-[17px] leading-[1.55] text-[#656565] md:max-w-[70%] md:text-[20px] md:leading-[1.42]">{description}</p>}
          {item.date && <time dateTime={item.date} className="self-end font-[Calibri,'Segoe_UI',Arial,sans-serif] text-right text-sm text-[#656565] md:text-base">{dateLabel}</time>}
        </div>}
        {videoEmbedUrl && <span data-focus-guard tabIndex={0} aria-hidden="true" className="sr-only" onFocus={() => closeRef.current?.focus()} />}
      </section>
    </div>
  );
}

