"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GridWave } from "./GridWave";

export function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const blobs = containerRef.current.querySelectorAll<HTMLElement>("[data-blob]");
    const tweens = Array.from(blobs).map((blob, index) => {
      const distance = 60 + index * 20;
      return gsap.to(blob, {
        x: index % 2 === 0 ? distance : -distance,
        y: index % 2 === 0 ? -distance * 0.6 : distance * 0.6,
        duration: 14 + index * 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        data-blob
        className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #F04255 0%, #EF2D3E 45%, transparent 72%)",
        }}
      />
      <div
        data-blob
        className="absolute right-[-15%] top-[5%] h-[480px] w-[480px] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #C41230 0%, #EF2D3E 50%, transparent 72%)",
        }}
      />
      <div
        data-blob
        className="absolute bottom-[-20%] left-[20%] h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #F04255 0%, #EF2D3E 50%, transparent 75%)",
        }}
      />

      <GridWave />
    </div>
  );
}
