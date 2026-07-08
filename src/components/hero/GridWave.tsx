"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TILE_WIDTH = 800;
const TILE_HEIGHT = 320;
const RESOLUTION = 120;

interface WaveConfig {
  baseline: number;
  amplitudes: number[];
  frequencies: number[];
  phases: number[];
}

function buildWavePoints({ baseline, amplitudes, frequencies, phases }: WaveConfig) {
  const points: [number, number][] = [];
  for (let i = 0; i <= RESOLUTION; i++) {
    const x = (i / RESOLUTION) * TILE_WIDTH;
    let y = baseline;
    for (let h = 0; h < amplitudes.length; h++) {
      y += amplitudes[h] * Math.sin((2 * Math.PI * frequencies[h] * x) / TILE_WIDTH + phases[h]);
    }
    points.push([x, y]);
  }
  return points;
}

function pointsToLine(points: [number, number][]) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function pointsToFill(points: [number, number][]) {
  return `${pointsToLine(points)} L${TILE_WIDTH},${TILE_HEIGHT} L0,${TILE_HEIGHT} Z`;
}

const RIDGE = buildWavePoints({
  baseline: 200,
  amplitudes: [26, 10, 5],
  frequencies: [2, 3, 5],
  phases: [0, 1.1, 2.3],
});
const BACK_LINE_1 = buildWavePoints({
  baseline: 150,
  amplitudes: [20, 8],
  frequencies: [2, 4],
  phases: [0.8, 2.0],
});
const BACK_LINE_2 = buildWavePoints({
  baseline: 108,
  amplitudes: [16, 6],
  frequencies: [3, 5],
  phases: [1.6, 0.4],
});

const RIDGE_LINE_PATH = pointsToLine(RIDGE);
const RIDGE_FILL_PATH = pointsToFill(RIDGE);
const BACK_LINE_1_PATH = pointsToLine(BACK_LINE_1);
const BACK_LINE_2_PATH = pointsToLine(BACK_LINE_2);

function WaveTile({ patternId }: { patternId: string }) {
  return (
    <svg
      viewBox={`0 0 ${TILE_WIDTH} ${TILE_HEIGHT}`}
      preserveAspectRatio="none"
      className="h-full w-1/2 shrink-0"
    >
      <defs>
        <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M20 0 L0 0 0 20"
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity={0.09}
            strokeWidth={0.5}
          />
        </pattern>
      </defs>

      <path d={BACK_LINE_2_PATH} fill="none" stroke="var(--color-primary)" strokeOpacity={0.07} strokeWidth={1} />
      <path d={BACK_LINE_1_PATH} fill="none" stroke="var(--color-primary)" strokeOpacity={0.11} strokeWidth={1.1} />
      <path d={RIDGE_FILL_PATH} fill={`url(#${patternId})`} />
      <path
        d={RIDGE_LINE_PATH}
        fill="none"
        stroke="var(--color-primary)"
        strokeOpacity={0.22}
        strokeWidth={1.4}
        style={{ filter: "drop-shadow(0 0 5px rgba(239,45,62,0.25))" }}
      />
    </svg>
  );
}

export function GridWave() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !trackRef.current) return;

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 26,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] overflow-hidden"
      style={{ maskImage: "linear-gradient(to top, black 30%, transparent 90%)" }}
    >
      <div ref={trackRef} className="flex h-full w-[200%]">
        <WaveTile patternId="grid-wave-a" />
        <WaveTile patternId="grid-wave-b" />
      </div>
    </div>
  );
}
