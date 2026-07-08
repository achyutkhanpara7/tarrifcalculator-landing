"use client";

import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Accent = "red" | "green";

interface Stage {
  key: string;
  title: string;
  badge: string;
  bullets: string[];
  caption: string;
  terminal?: boolean;
  accent?: Accent;
}

const ACCENT_COLORS: Record<Accent, { border: string; badgeBg: string }> = {
  red: { border: "var(--color-primary)", badgeBg: "var(--color-primary-light)" },
  green: { border: "var(--color-ok)", badgeBg: "var(--color-ok-bg)" },
};

const STAGES: Stage[] = [
  {
    key: "classify",
    title: "Classify",
    badge: "HTS Code + Confidence",
    bullets: [
      "Checks for any existing binding rulings on your product",
      "Searches the full HTS schedule to find the best match",
      "Applies the official classification rules (GRI) in order",
      "If the description is ambiguous, asks targeted questions to resolve it before continuing",
    ],
    caption: "Output: HTS Code + Confidence Tier",
  },
  {
    key: "calculate",
    title: "Calculate",
    badge: "Total Duty + Fees",
    bullets: [
      "Checks if your shipment qualifies for FTA or USMCA savings",
      "Applies the base rate plus any active trade-action overlays (e.g., Section 301)",
      "Prevents double-counting when multiple surcharges apply",
      "Breaks down every fee line by line: duty, MPF, HMF",
    ],
    caption: "Output: Full Duty Stack + MPF/HMF",
  },
  {
    key: "file",
    title: "File & Ledger",
    badge: "CBP Form 7501 Draft",
    bullets: [
      "Uses the confirmed HTS code and duty stack, no re-entry",
      "Writes a tamper-evident ledger record the moment classification completes",
      "Generates a ready-to-review CBP Form 7501 on demand from that record",
      "Retrievable in seconds for audit or reuse",
    ],
    caption: "Output: CBP Form 7501 Draft",
    terminal: true,
  },
  {
    key: "watchlist",
    title: "Watchlist",
    badge: "Live Rate Alerts",
    bullets: [
      "Saves the HTS code to your personal watchlist",
      "Sends an alert when a rate, overlay, or trade program changes for that code",
      "Tracks both base rate changes and Chapter 99 overlay changes (e.g., Section 301)",
      "Covers your entire portfolio, not just the current shipment",
    ],
    caption: "Output: Rate Change Alerts",
    accent: "green",
  },
];

export function PipelineDiagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !rootRef.current) return;
    const root = rootRef.current;

    const ctx = gsap.context(() => {
      const inputCircle = root.querySelector<SVGCircleElement>("[data-input-circle]");
      const bullets = root.querySelectorAll("[data-bullet]");
      const captions = root.querySelectorAll("[data-caption]");
      const terminalFill = root.querySelector("[data-terminal-fill]");
      const terminalText = root.querySelectorAll("[data-terminal-text]");
      const terminalBadge = root.querySelector("[data-terminal-badge]");

      if (reducedMotion) {
        [inputCircle, ...Array.from(root.querySelectorAll<SVGGeometryElement>("[data-arrow], [data-box-outline]"))].forEach(
          (el) => {
            if (!el) return;
            gsap.set(el, { strokeDasharray: "none", strokeDashoffset: 0 });
          }
        );
        gsap.set(bullets, { opacity: 1, x: 0 });
        gsap.set(captions, { opacity: 1 });
        if (terminalFill) gsap.set(terminalFill, { opacity: 1 });
        if (terminalText.length) gsap.set(terminalText, { color: "#FFFFFF" });
        if (terminalBadge) gsap.set(terminalBadge, { backgroundColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" });
        return;
      }

      gsap.set(bullets, { opacity: 0, x: -12 });
      gsap.set(captions, { opacity: 0 });
      if (terminalFill) gsap.set(terminalFill, { opacity: 0 });

      const setupDraw = (el: SVGGeometryElement | null) => {
        if (!el) return;
        const length = el.getTotalLength();
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      };

      setupDraw(inputCircle);
      STAGES.forEach((_, i) => {
        setupDraw(root.querySelector(`[data-arrow="${i}"]`));
        setupDraw(root.querySelector(`[data-box-outline="${i}"]`));
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "restart none none reset",
        },
      });

      if (inputCircle) {
        tl.to(inputCircle, { strokeDashoffset: 0, duration: 0.65, ease: "power2.out" });
      }

      STAGES.forEach((stage, i) => {
        const arrow = root.querySelector(`[data-arrow="${i}"]`);
        const outline = root.querySelector(`[data-box-outline="${i}"]`);
        const stageBullets = root.querySelectorAll(`[data-bullet][data-stage="${i}"]`);
        const caption = root.querySelector(`[data-caption][data-stage="${i}"]`);

        if (arrow) {
          tl.to(arrow, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" });
        }
        if (outline) {
          tl.to(outline, { strokeDashoffset: 0, duration: 0.75, ease: "power2.out" });
        }
        if (stageBullets.length) {
          tl.to(stageBullets, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.15,
            ease: "power2.out",
          });
        }

        if (stage.terminal) {
          if (terminalFill) {
            tl.to(terminalFill, { opacity: 1, duration: 0.55, ease: "power1.inOut" });
          }
          if (terminalText.length) {
            tl.to(terminalText, { color: "#FFFFFF", duration: 0.55, ease: "power1.inOut" }, "<");
          }
          if (terminalBadge) {
            tl.to(
              terminalBadge,
              { backgroundColor: "rgba(255,255,255,0.2)", color: "#FFFFFF", duration: 0.55, ease: "power1.inOut" },
              "<"
            );
          }
        }

        if (caption) {
          tl.to(caption, { opacity: 1, duration: 0.4 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-white px-6 py-16 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-20"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            How a Product Description Becomes a Ready-to-File Entry
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[color:var(--color-text-secondary)]">
            One connected pipeline. <HighlightPhrase>No copy-pasting, no manual hand-offs</HighlightPhrase>.
          </p>
        </motion.div>

        <div ref={rootRef} className="lg:overflow-x-auto lg:pb-2">
          <div className="flex flex-col items-center gap-8 lg:mx-auto lg:w-max lg:flex-row lg:items-center lg:gap-0">
            <InputNode />

            {STAGES.map((stage, i) => (
              <Fragment key={stage.key}>
                <Arrow index={i} accent={stage.accent ?? "red"} />
                <PipelineBox stage={stage} index={i} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightPhrase({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <span className="relative inline-block px-0.5">
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reducedMotion ? 0 : 0.9,
          delay: reducedMotion ? 0 : 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originX: 0 }}
        className="absolute inset-y-0 -inset-x-0.5 -z-10 rounded-sm bg-[color:var(--color-primary)] opacity-40"
      />
      <span className="relative font-semibold text-[color:var(--color-text-primary)]">{children}</span>
    </span>
  );
}

function InputNode() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-4 lg:w-[130px]">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 96 96" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle
            data-input-circle
            cx={48}
            cy={48}
            r={44}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth={2}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[color:var(--color-primary)]">
          <FileText size={30} strokeWidth={1.75} />
        </div>
      </div>
      <p className="max-w-[170px] text-center text-sm font-semibold leading-snug text-[color:var(--color-text-secondary)]">
        A product name, description, or a past entry number — that&apos;s all we need to start.
      </p>
    </div>
  );
}

function Arrow({ index, accent }: { index: number; accent: Accent }) {
  return (
    <div className="flex h-14 w-14 shrink-0 rotate-90 items-center justify-center lg:h-6 lg:w-14 lg:rotate-0">
      <svg viewBox="0 0 80 24" className="h-6 w-full" aria-hidden="true">
        <path
          data-arrow={index}
          d="M4,12 L60,12 M52,4 L68,12 L52,20"
          fill="none"
          stroke={ACCENT_COLORS[accent].border}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function PipelineBox({ stage, index }: { stage: Stage; index: number }) {
  const accent = stage.accent ?? "red";
  const { border, badgeBg } = ACCENT_COLORS[accent];

  return (
    <div className="relative w-full max-w-[300px] shrink-0 lg:w-[196px]">
      <div className="relative rounded-2xl">
        {stage.terminal && (
          <div
            data-terminal-fill
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-[color:var(--color-primary)]"
          />
        )}
        <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <rect
            data-box-outline={index}
            x={1}
            y={1}
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx={16}
            ry={16}
            fill="none"
            stroke={border}
            strokeWidth={1.75}
          />
        </svg>

        <div className="relative p-4">
          <p
            data-terminal-text={stage.terminal ? "" : undefined}
            className="mb-2.5 text-xs font-bold uppercase tracking-wide"
            style={{ color: border }}
          >
            {stage.title}
          </p>

          <span
            data-terminal-badge={stage.terminal ? "" : undefined}
            className="mb-3 inline-block rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
            style={{ backgroundColor: badgeBg, color: border }}
          >
            {stage.badge}
          </span>

          <ul className="space-y-2.5">
            {stage.bullets.map((bullet) => (
              <li key={bullet} data-bullet data-stage={index} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: border }}
                />
                <span
                  data-terminal-text={stage.terminal ? "" : undefined}
                  className="text-[12.5px] font-medium leading-snug text-[color:var(--color-text-primary)]"
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        data-caption
        data-stage={index}
        className="mt-3 text-center text-xs font-semibold text-[color:var(--color-text-muted)]"
      >
        {stage.caption}
      </p>
    </div>
  );
}
