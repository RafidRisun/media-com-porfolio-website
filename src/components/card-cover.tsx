import Image from "next/image";
import { ProjectTitle } from "@/components/project-title";

export function CardCover({ image, alt, title, priority = false, unoptimized = false }: {
  image: string; alt: string; title: string; priority?: boolean; unoptimized?: boolean;
}) {
  return (
    <>
      <Image src={image} alt={alt} fill priority={priority} unoptimized={unoptimized}
        sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1199px) 23vw, 310px"
        className="object-cover transition-[transform,filter] duration-[450ms] group-hover:brightness-[.97] motion-reduce:transition-none" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
        <span className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        <ProjectTitle title={title} />
      </span>
    </>
  );
}
