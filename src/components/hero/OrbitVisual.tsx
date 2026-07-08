"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Search, BarChart3, FileText, Bell, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LiveDot } from "@/components/LiveDot";

gsap.registerPlugin(MotionPathPlugin);

type ModulePosition = "N" | "E" | "S" | "W";

interface ModuleCard {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
  position: ModulePosition;
  path: string;
}

const MODULES: ModuleCard[] = [
  {
    key: "classify",
    label: "HTS Classification",
    description: "Plain-English in, defensible code out",
    icon: Search,
    position: "N",
    path: "M200,200 Q160,130 200,60",
  },
  {
    key: "calculate",
    label: "Duty Calculator",
    description: "Full stack: MFN + 301/232 + FTA + Ch.99",
    icon: BarChart3,
    position: "E",
    path: "M200,200 Q270,160 340,200",
  },
  {
    key: "audit",
    label: "Entry Audit",
    description: "Re-classify every line, same-day report",
    icon: FileText,
    position: "S",
    path: "M200,200 Q240,270 200,340",
  },
  {
    key: "alerts",
    label: "Rate Alerts",
    description: "Notified before the next shipment, not at the border",
    icon: Bell,
    position: "W",
    path: "M200,200 Q130,240 60,200",
  },
];

const POSITION_CLASSES: Record<ModulePosition, string> = {
  N: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  E: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  S: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  W: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
};

export function OrbitVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll<SVGPathElement>("[data-orbit-path]");
    const trucks = svgRef.current.querySelectorAll<SVGGElement>("[data-orbit-truck]");
    const tweens: gsap.core.Tween[] = [];

    paths.forEach((path, index) => {
      const length = path.getTotalLength();

      if (reducedMotion) {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
        return;
      }

      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      tweens.push(
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.1,
          delay: 0.4 + index * 0.15,
          ease: "power2.out",
        })
      );

      const truck = trucks[index];
      if (truck) {
        tweens.push(
          gsap.fromTo(
            truck,
            { opacity: 0 },
            {
              opacity: 1,
              delay: 1.2 + index * 0.15,
              duration: 0.3,
              onComplete: () => {
                tweens.push(
                  gsap.to(truck, {
                    motionPath: {
                      path,
                      align: path,
                      alignOrigin: [0.5, 0.5],
                      autoRotate: true,
                    },
                    duration: 3.2,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: index * 0.35,
                  })
                );
              },
            }
          )
        );
      }
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [reducedMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* Desktop / tablet orbit layout */}
      <div className="relative hidden aspect-square lg:block">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {MODULES.map((mod) => (
            <path
              key={mod.key}
              data-orbit-path
              d={mod.path}
              fill="none"
              stroke="var(--color-primary)"
              strokeOpacity={0.28}
              strokeWidth={1.5}
            />
          ))}
          {MODULES.map((mod) => (
            <g key={mod.key} data-orbit-truck opacity={0}>
              <circle
                r={9}
                fill="var(--color-primary)"
                style={{ filter: "drop-shadow(0 2px 5px rgba(239,45,62,0.5))" }}
              />
              <g
                transform="scale(0.36) translate(-12,-12)"
                stroke="#FFFFFF"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                <circle cx={17} cy={18} r={2} />
                <circle cx={7} cy={18} r={2} />
              </g>
            </g>
          ))}
        </svg>

        {/* Center badge */}
        <div className="absolute inset-0 m-auto flex h-[168px] w-[168px] flex-col items-center justify-center rounded-full border border-[color:var(--color-primary-border)] bg-white text-center shadow-[0_8px_32px_rgba(239,45,62,0.16)]">
          <span className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-primary)]">
            TARIFF.IO Engine
          </span>
          <span className="mt-1.5 px-6 text-[11px] leading-snug text-[color:var(--color-text-muted)]">
            Compliance intelligence in motion
          </span>
        </div>

        {/* Status chip */}
        <div className="absolute right-[2%] top-[22%] whitespace-nowrap rounded-full border border-[color:var(--color-border)] bg-white px-3 py-1.5 text-[11px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <LiveDot label="Connected to ingestion data stack" />
        </div>

        {MODULES.map((mod) => (
          <ModulePill key={mod.key} module={mod} className={POSITION_CLASSES[mod.position]} />
        ))}
      </div>

      {/* Mobile: simple stacked list */}
      <div className="grid gap-3 lg:hidden">
        {MODULES.map((mod) => (
          <ModulePill key={mod.key} module={mod} className="static" stacked />
        ))}
        <div className="flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white px-3 py-1.5 text-[11px]">
          <LiveDot label="Connected to ingestion data stack" />
        </div>
      </div>
    </div>
  );
}

function ModulePill({
  module,
  className,
  stacked = false,
}: {
  module: ModuleCard;
  className: string;
  stacked?: boolean;
}) {
  const Icon = module.icon;
  return (
    <div
      className={`${className} ${
        stacked ? "" : "absolute w-[180px]"
      } flex items-start gap-2.5 rounded-2xl border border-[color:var(--color-border)] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary-light)] text-[color:var(--color-primary)]">
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-[color:var(--color-text-primary)]">
          {module.label}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-[color:var(--color-text-muted)]">
          {module.description}
        </span>
      </span>
    </div>
  );
}
