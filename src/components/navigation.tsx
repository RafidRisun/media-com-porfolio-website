"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
];

export function Navigation({ name }: { name: string }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const homeLinkRef = useRef<HTMLAnchorElement>(null);
  const [heroHidden, setHeroHidden] = useState(false);
  const expanded = pathname !== "/" || heroHidden;

  useEffect(() => {
    if (pathname !== "/") return;
    const title = document.getElementById("hero-title");
    if (!title) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && document.activeElement === brandRef.current) {
        homeLinkRef.current?.focus({ preventScroll: true });
      }
      setHeroHidden(!entry.isIntersecting);
    }, {
      rootMargin: `-${headerRef.current?.offsetHeight ?? 0}px 0px 0px 0px`,
      threshold: 0,
    });
    observer.observe(title);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header ref={headerRef}
      className={`sticky top-0 z-50 w-full pt-[29px] pb-3 transition-[background-color,backdrop-filter] duration-700 md:pt-[45px] md:pb-4 ${expanded ? "bg-white/95 backdrop-blur-md" : "bg-transparent backdrop-blur-none"}`}>
      <nav
        aria-label="Main navigation"
        className="relative flex min-h-11 w-full items-center justify-between"
      >
        <Link ref={brandRef} href="/" aria-hidden={!expanded} tabIndex={expanded ? 0 : -1}
          className={`inline-flex min-h-11 items-center whitespace-nowrap font-[family-name:var(--font-victory)] text-[20px] leading-none text-[#520000] uppercase outline-offset-4 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[360px]:text-[22px] min-[400px]:text-[26px] focus-visible:outline-2 focus-visible:outline-[#520000] md:text-[32px] ${expanded ? "translate-x-0 opacity-100 delay-150" : "pointer-events-none -translate-x-3 opacity-0 delay-0"}`}>
          {name}
        </Link>
        <div className={`absolute top-1/2 flex -translate-y-1/2 items-center font-[Calibri,'Segoe_UI',Arial,sans-serif] transition-[right,translate,gap] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? "right-0 translate-x-0 gap-2 sm:gap-8" : "right-1/2 translate-x-1/2 gap-14 sm:gap-16"}`}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              ref={href === "/" ? homeLinkRef : undefined}
              href={href}
              aria-current={pathname === href || (href === "/works" && pathname.startsWith("/works/")) ? "page" : undefined}
              className="py-2 text-sm text-[#777] outline-offset-4 transition-colors hover:text-[#520000] focus-visible:outline-2 focus-visible:outline-[#520000] aria-[current=page]:text-[#333] motion-reduce:transition-none"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
