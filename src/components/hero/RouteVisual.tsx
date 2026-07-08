"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Search, Calculator, FileText, Bell, Container, Warehouse, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(MotionPathPlugin);

const VIEW_W = 640;
const VIEW_H = 420;

const P0: [number, number] = [30, 250];
const P1: [number, number] = [190, 90];
const P2: [number, number] = [420, 360];
const P3: [number, number] = [610, 190];

function cubicBezierPoint(t: number): [number, number] {
  const mt = 1 - t;
  const x = mt ** 3 * P0[0] + 3 * mt ** 2 * t * P1[0] + 3 * mt * t ** 2 * P2[0] + t ** 3 * P3[0];
  const y = mt ** 3 * P0[1] + 3 * mt ** 2 * t * P1[1] + 3 * mt * t ** 2 * P2[1] + t ** 3 * P3[1];
  return [x, y];
}

const PATH_D = `M${P0[0]},${P0[1]} C${P1[0]},${P1[1]} ${P2[0]},${P2[1]} ${P3[0]},${P3[1]}`;

type CheckpointSide = "above" | "below";

interface Checkpoint {
  key: string;
  t: number;
  side: CheckpointSide;
  icon: LucideIcon;
  label: string;
  caption: string;
}

const CHECKPOINTS: Checkpoint[] = [
  { key: "classify", t: 0.2, side: "above", icon: Search, label: "Classify", caption: "Plain-English in, defensible code out" },
  { key: "calculate", t: 0.45, side: "below", icon: Calculator, label: "Calculate", caption: "Full duty stack, one calculation" },
  { key: "audit", t: 0.7, side: "above", icon: FileText, label: "Audit", caption: "Re-classify every line, same-day report" },
  { key: "alerts", t: 0.95, side: "below", icon: Bell, label: "Alerts", caption: "Notified before the next shipment" },
];

const PILL_OFFSET = 58;

function toPercent([x, y]: [number, number]) {
  return { left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` };
}

export function RouteVisual() {
  const pathRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<SVGGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!pathRef.current || !truckRef.current) return;

    if (reducedMotion) {
      const [x, y] = cubicBezierPoint(0.5);
      gsap.set(truckRef.current, { x, y, opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ repeat: -1 });
    tl.set(truckRef.current, { opacity: 0 })
      .to(
        truckRef.current,
        {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0.03,
            end: 0.9,
          },
          duration: 7,
          ease: "power1.inOut",
        },
        0
      )
      .to(truckRef.current, { opacity: 1, duration: 0.35 }, 0)
      .to(truckRef.current, { opacity: 0, duration: 0.35 }, 6.55);

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <>
    <div className="relative mx-auto hidden w-full lg:block" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {CHECKPOINTS.map((cp) => {
          const [x, y] = cubicBezierPoint(cp.t);
          const endY = cp.side === "above" ? y - PILL_OFFSET : y + PILL_OFFSET;
          return (
            <line
              key={cp.key}
              x1={x}
              y1={y}
              x2={x}
              y2={endY}
              stroke="var(--color-primary)"
              strokeOpacity={0.3}
              strokeWidth={1.25}
              strokeDasharray="3 3"
            />
          );
        })}

        <path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="var(--color-primary)"
          strokeOpacity={0.45}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="1 9"
        />

        {CHECKPOINTS.map((cp) => {
          const [x, y] = cubicBezierPoint(cp.t);
          return (
            <circle key={`${cp.key}-dot`} cx={x} cy={y} r={3.5} fill="var(--color-primary)" fillOpacity={0.7} />
          );
        })}

        <g ref={truckRef} opacity={0}>
          <circle r={17} fill="var(--color-primary)" style={{ filter: "drop-shadow(0 3px 8px rgba(239,45,62,0.45))" }} />
          <g transform="scale(0.72) translate(-12,-12)" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx={17} cy={18} r={2} />
            <circle cx={7} cy={18} r={2} />
          </g>
        </g>
      </svg>

      <RouteMarker point={cubicBezierPoint(0)} icon={Container} label="Origin" />
      <RouteMarker point={cubicBezierPoint(1)} icon={Warehouse} label="US Entry" />

      {CHECKPOINTS.map((cp) => {
        const [x, y] = cubicBezierPoint(cp.t);
        const anchor = cp.side === "above" ? y - PILL_OFFSET : y + PILL_OFFSET;
        const Icon = cp.icon;
        return (
          <div
            key={cp.key}
            className="absolute w-[172px] -translate-x-1/2 rounded-2xl border border-[color:var(--color-border)] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            style={{
              left: `${(x / VIEW_W) * 100}%`,
              top: `${(anchor / VIEW_H) * 100}%`,
              transform: cp.side === "above" ? "translate(-50%, -100%)" : "translate(-50%, 0%)",
            }}
          >
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-text-primary)] text-[color:var(--color-primary)]">
                <Icon size={15} strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-[color:var(--color-text-primary)]">
                  {cp.label}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-[color:var(--color-text-muted)]">
                  {cp.caption}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>

    <div className="grid gap-3 lg:hidden">
      {CHECKPOINTS.map((cp) => {
        const Icon = cp.icon;
        return (
          <div
            key={cp.key}
            className="flex items-start gap-2.5 rounded-2xl border border-[color:var(--color-border)] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-text-primary)] text-[color:var(--color-primary)]">
              <Icon size={15} strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-[color:var(--color-text-primary)]">
                {cp.label}
              </span>
              <span className="mt-0.5 block text-[11px] leading-snug text-[color:var(--color-text-muted)]">
                {cp.caption}
              </span>
            </span>
          </div>
        );
      })}
    </div>
    </>
  );
}

function RouteMarker({
  point,
  icon: Icon,
  label,
}: {
  point: [number, number];
  icon: LucideIcon;
  label: string;
}) {
  const [x, y] = point;
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
      style={toPercent([x, y])}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-text-primary)] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
        <Icon size={17} strokeWidth={1.75} />
      </span>
      <span className="whitespace-nowrap text-[11px] font-semibold text-[color:var(--color-text-muted)]">
        {label}
      </span>
    </div>
  );
}
