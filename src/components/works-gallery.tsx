"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import {
  workCategories,
  worksByCategory,
  type WorkCategory,
} from "@/data/content";

export function WorksGallery() {
  const [selected, setSelected] = useState<WorkCategory>(workCategories[0]);

  return (
    <main
      id="main-content"
      className="flex w-full min-w-0 flex-col gap-10 md:flex-row md:items-start md:gap-7"
    >
      <h1 className="sr-only">Selected works</h1>
      <section
        id="works-gallery"
        className="flex w-full min-w-0 flex-wrap content-start gap-3 sm:gap-4 md:w-auto md:flex-[3]"
        aria-label={`${selected} projects`}
      >
        {worksByCategory[selected].map((item, index) => (
          <ProjectCard
            key={item.id}
            project={item}
            className="aspect-square shrink-0 basis-[calc((100%_-_1.5rem)/3)] sm:basis-[calc((100%_-_2rem)/3)]"
            priority={index < 3}
          />
        ))}
      </section>
      <aside
        aria-label="Work categories"
        className="flex w-full min-w-0 flex-col gap-5 [container-type:inline-size] md:w-auto md:flex-1"
      >
        <h2 className="w-full font-[family-name:var(--font-victory)] leading-[1.1] text-[#520000] uppercase">
          <button
            type="button"
            aria-pressed="true"
            aria-controls="works-gallery"
            className={`cursor-pointer whitespace-nowrap outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#520000] text-[clamp(28px,27cqw,74px)]`}
          >
            {selected}
          </button>
        </h2>
        <div className="flex flex-col items-start gap-3">
          {workCategories
            .filter((category) => category !== selected)
            .map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed="false"
                aria-controls="works-gallery"
                onClick={() => setSelected(category)}
                className="flex cursor-pointer items-center gap-2 text-[24px] leading-[1.25] text-[#666] outline-offset-4 transition-colors hover:text-[#520000] focus-visible:outline-2 focus-visible:outline-[#520000] motion-reduce:transition-none md:text-[22px] xl:text-[28px]"
              >
                <svg
                  className="size-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
                <span>{category}</span>
              </button>
            ))}
        </div>
        <p className="sr-only" role="status">
          Showing {selected} projects
        </p>
      </aside>
    </main>
  );
}
