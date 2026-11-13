import Image from "next/image";
import { ImageCard } from "@/components/gallery";
import { homeProjects, profile, projects } from "@/data/content";

export default function HomePage() {
  const [first, second, third] = homeProjects;
  return (
    <main id="main-content" className="flex w-full min-w-0 flex-col gap-[100px] md:gap-[180px] xl:gap-[240px]">
      <section aria-labelledby="hero-title" className="relative flex w-full flex-col items-start gap-7 md:flex-row md:gap-0">
        <div className="relative flex aspect-[.88] w-3/4 overflow-hidden bg-[#d9d9d9] md:w-7/12">
          <Image src={profile.portrait.image} alt={profile.portrait.alt} fill unoptimized priority sizes="(max-width: 767px) 75vw, 750px" className="object-cover" />
        </div>
        <div className="flex w-full min-w-0 flex-col items-end gap-7 text-right md:w-5/12 md:gap-14 md:pt-[170px] xl:pt-[240px]">
          <h1 id="hero-title" className="absolute top-8 right-0 whitespace-nowrap font-[family-name:var(--font-victory)] text-[clamp(32px,9.5vw,128px)] leading-none tracking-[-1px] text-[#520000] uppercase md:top-20">{profile.name}</h1>
          <p className="w-[83%] text-[15px] leading-[1.45] text-[#656565] md:w-full md:text-base xl:text-[19px]">{profile.introduction}</p>
          <div className="relative flex aspect-square w-[29%] overflow-hidden bg-[#d9d9d9] md:w-3/5">
            <Image src={profile.detail.image} alt={profile.detail.alt} fill unoptimized sizes="(max-width: 767px) 29vw, 320px" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="project-one-title" className="flex w-full flex-col gap-7 md:flex-row md:gap-6 xl:gap-7">
        <div className="flex min-w-0 flex-col gap-6 min-[400px]:flex-row md:flex-1 md:flex-col md:gap-10">
          <h2 id="project-one-title" className="min-[400px]:flex-1 whitespace-pre-line font-[family-name:var(--font-victory)] text-[60px] leading-[1.25] text-[#520000] uppercase md:flex-none md:text-[clamp(60px,7.2vw,104px)]">{first.title}</h2>
          <p className="min-w-0 text-[17px] leading-[1.55] text-[#656565] min-[400px]:flex-[1.4] md:flex-none xl:text-[19px] xl:leading-[1.42]">{first.description}</p>
        </div>
        <div className="flex min-h-[300px] w-full gap-3 md:aspect-[1.05] md:min-h-0 md:w-auto md:flex-[3] md:gap-4">
          {first.images.map((item) => <ImageCard key={item.id} item={item} className="flex-1 self-stretch" />)}
        </div>
      </section>

      <section aria-labelledby="project-two-title" className="flex w-full flex-col gap-7">
        <ImageCard item={second.images[0]} className="aspect-[2.45] w-full" />
        <div className="flex flex-col gap-6 md:flex-row md:gap-12">
          <p className="min-w-0 text-[17px] leading-[1.55] text-[#656565] md:flex-1 xl:text-[19px] xl:leading-[1.42]">{second.description}</p>
          <h2 id="project-two-title" className="order-first whitespace-pre-line font-[family-name:var(--font-victory)] text-[60px] leading-[1.25] text-[#520000] uppercase md:order-none md:flex-[.3] md:text-[clamp(60px,7.2vw,104px)]">{second.title}</h2>
        </div>
      </section>

      <section aria-labelledby="project-three-title" className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:gap-10">
          <h2 id="project-three-title" className="min-w-0 whitespace-pre-line font-[family-name:var(--font-victory)] text-[60px] leading-[1.25] text-[#520000] uppercase md:flex-1 md:text-[clamp(60px,7.2vw,104px)]">{third.title}</h2>
          <div className="flex aspect-[1.7] w-full gap-3 md:w-auto md:flex-[2] md:gap-4">
            {third.images.map((item) => <ImageCard key={item.id} item={item} className="flex-1 self-stretch" />)}
          </div>
        </div>
        <p className="text-[17px] leading-[1.55] text-[#656565] xl:text-[19px] xl:leading-[1.42]">{third.description}</p>
      </section>

      <section aria-label="More about my work" className="flex w-full flex-col items-start gap-7 md:flex-row md:gap-10">
        <p className="min-w-0 text-[17px] leading-[1.55] text-[#656565] md:flex-1 xl:text-[19px] xl:leading-[1.42]">{profile.closingText}</p>
        <ImageCard item={projects[6]} className="aspect-[1.8] w-full md:w-auto md:flex-[.94]" />
      </section>
    </main>
  );
}

