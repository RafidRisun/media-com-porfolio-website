"use client";

import { useEffect, useRef } from "react";

export function ProjectTitle({ title }: { title: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    let active = true;
    const fit = () => {
      if (!active || !svgRef.current || !textRef.current || typeof CanvasRenderingContext2D === "undefined") return;
      const context = document.createElement("canvas").getContext("2d");
      if (!context) return;
      const style = getComputedStyle(textRef.current);
      context.font = `${style.fontStyle} ${style.fontWeight} 100px ${style.fontFamily}`;
      const metrics = context.measureText(title.toUpperCase());
      // Ink bounds exclude the font's empty descent space at the card edge.
      const x = -metrics.actualBoundingBoxLeft;
      const y = -metrics.actualBoundingBoxAscent;
      const width = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
      const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      if (width > 0 && height > 0) {
        svgRef.current.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
      }
    };

    fit();
    void document.fonts?.ready.then(fit);
    return () => { active = false; };
  }, [title]);

  return (
    <svg ref={svgRef} aria-hidden="true" focusable="false"
      viewBox={`0 -100 ${Math.max(title.length * 60, 100)} 100`}
      preserveAspectRatio="xMinYMax meet"
      className="absolute inset-x-0 bottom-0 h-auto max-h-[55%] w-full overflow-visible text-white">
      <text ref={textRef} x="0" y="0" fontSize="100" fill="currentColor"
        className="font-[family-name:var(--font-victory)] uppercase">{title}</text>
    </svg>
  );
}
