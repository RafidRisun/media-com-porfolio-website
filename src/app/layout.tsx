import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "lenis/dist/lenis.css";
import { GalleryProvider } from "@/components/gallery";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/social";
import { SmoothScroll } from "@/components/smooth-scroll";
import { profile } from "@/data/content";

const victory = localFont({ src: "../../public/fonts/victory-striker-sans-demo.otf", variable: "--font-victory", display: "swap" });
const viaoda = localFont({ src: "../../node_modules/@fontsource/viaoda-libre/files/viaoda-libre-latin-400-normal.woff2", variable: "--font-viaoda", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Zannatul Urmi — Portfolio", template: "%s — Zannatul Urmi" },
  description: "Selected work and creative explorations by Zannatul Urmi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-auto">
      <body className={`${victory.variable} ${viaoda.variable} bg-white font-[family-name:var(--font-viaoda)] text-[18px] text-[#222] antialiased selection:bg-[#520000] selection:text-white`}>
        <SmoothScroll>
        <GalleryProvider>
          <div className="flex min-h-screen w-full justify-center px-6 md:px-9 xl:px-0">
            <div data-layout-container className="flex w-full max-w-[1280px] flex-col gap-20 pb-[70px] md:gap-40 md:pb-40 xl:gap-[220px] xl:pb-[220px]">
              <div className="flex w-full flex-col gap-10 md:gap-[72px]">
                <Navigation name={profile.name} />
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </GalleryProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}

