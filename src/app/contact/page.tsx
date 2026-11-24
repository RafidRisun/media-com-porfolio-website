import type { Metadata } from "next";
import Image from "next/image";
import { SocialAnchor } from "@/components/social";
import { contactHeading, contactImage, contactLinks } from "@/data/contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main id="main-content" className="flex w-full min-w-0 flex-col gap-10 md:flex-row md:items-start md:gap-8 xl:gap-12">
      <div className="relative flex aspect-[860/820] w-full overflow-hidden bg-[#d9d9d9] md:w-auto md:flex-[2.6875]">
        <Image src={contactImage.image} alt={contactImage.alt} fill unoptimized priority sizes="(max-width: 767px) 100vw, (max-width: 1199px) 70vw, 900px" className="object-cover" />
      </div>
      <section aria-labelledby="contact-heading" className="flex min-w-0 flex-col gap-7 md:flex-1 md:gap-10 xl:gap-16">
        <h1 id="contact-heading" className="whitespace-nowrap font-[family-name:var(--font-victory)] text-[54px] leading-[1.05] text-[#520000] uppercase md:text-[clamp(32px,4.4vw,64px)]">{contactHeading}</h1>
        <div className="flex flex-col items-start gap-3">
          {contactLinks.map((link, index) => <SocialAnchor key={`${link.label}-${index}`} link={link} label={link.href.replace(/^mailto:/i, "") || link.label} showLabel />)}
        </div>
      </section>
    </main>
  );
}

