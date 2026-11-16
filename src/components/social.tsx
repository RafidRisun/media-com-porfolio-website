"use client";

import Image from "next/image";
import { socialLinks, socialPlaceholder } from "@/data/contact";
import type { SocialIcon, SocialLink } from "@/types/portfolio";
import { useGallery } from "./gallery";

function Icon({ name }: { name: SocialIcon }) {
  const sources: Record<SocialIcon, string> = {
    linkedin: "/icons/LinkedinLogo.svg",
    whatsapp: "/icons/WhatsappLogo.svg",
    instagram: "/icons/InstagramLogo.svg",
    email: "/icons/EnvelopeOpen.svg",
  };
  return <Image src={sources[name]} alt="" aria-hidden="true" width={21} height={21} unoptimized className="size-[21px] shrink-0 object-contain" />;
}

export function SocialAnchor({ link, showLabel = false }: { link: SocialLink; showLabel?: boolean }) {
  const { open } = useGallery();
  const className = `inline-flex cursor-pointer items-center gap-3 outline-offset-4 transition-colors hover:text-[#520000] focus-visible:outline-2 focus-visible:outline-[#520000] motion-reduce:transition-none ${showLabel ? "justify-start text-[22px] text-[#686868] md:text-[19px] xl:text-[24px]" : "justify-center p-1 text-[#898989]"}`;
  const content = <><Icon name={link.icon} />{showLabel && <span>{link.label}</span>}</>;

  if (link.href) {
    const external = /^https?:\/\//.test(link.href);
    return <a href={link.href} aria-label={link.label} className={className} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{content}</a>;
  }
  return <button type="button" aria-label={link.label} className={className} onClick={() => open(socialPlaceholder(link.label))}>{content}</button>;
}

export function Footer() {
  return (
    <footer className="flex w-full justify-center">
      <nav aria-label="Social links" className="flex justify-center gap-12 sm:gap-14">
        {socialLinks.map((link) => <SocialAnchor key={link.icon} link={link} />)}
      </nav>
    </footer>
  );
}

