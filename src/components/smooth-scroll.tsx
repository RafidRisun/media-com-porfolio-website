"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.075,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
        smoothWheel: true,
        // Match AronnyoJon's Lenis 1.3.25 behavior; 1.3.27 otherwise
        // overrides lerp when the browser requests reduced motion.
        respectReducedMotion: false,
        syncTouch: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
