"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <header className="flex w-full justify-center pt-[29px] md:pt-[45px] sticky top-0 z-50">
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-14 font-[Calibri,'Segoe_UI',Arial,sans-serif] sm:gap-16"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className="py-2 text-sm text-[#777] outline-offset-4 transition-colors hover:text-[#520000] focus-visible:outline-2 focus-visible:outline-[#520000] aria-[current=page]:text-[#333] motion-reduce:transition-none"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
