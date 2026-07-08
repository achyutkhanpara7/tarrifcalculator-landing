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

interface Stage {
  key: string;
  title: string;
  bullets: string[];
  caption: string;
  terminal?: boolean;
}

const STAGES: Stage[] = [
  {
    key: "classify",
    title: "Classify",
    bullets: [
      "Binding-ruling pre-check",
      "Hybrid search: pgvector + CROSS",
      "GRI rules engine (1, 3, 6)",
      "Neo4j confusion-pair check",
    ],
    caption: "Output: HTS Code + Confidence Tier",
  },
  {
    key: "calculate",
    title: "Calculate",
    bullets: [
      "FTA/USMCA eligibility",
      "Base rate + overlay lookup",
      "Anti-stacking: 232 vs 122",
      "Line-item duty breakdown",
    ],
    caption: "Output: Full Duty Stack + MPF/HMF",
  },
  {
    key: "file",
    title: "File & Ledger",
    bullets: [
      "Pulls HTS code + duty stack directly",
      "Auto-drafts CBP Form 7501",
      "Hash-chained ledger entry written",
      "Tamper-evident, query in seconds",
    ],
    caption: "Output: CBP Form 7501 Draft",
    terminal: true,
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
        tl.to(inputCircle, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" });
      }

      STAGES.forEach((stage, i) => {
        const arrow = root.querySelector(`[data-arrow="${i}"]`);
        const outline = root.querySelector(`[data-box-outline="${i}"]`);
        const stageBullets = root.querySelectorAll(`[data-bullet][data-stage="${i}"]`);
        const caption = root.querySelector(`[data-caption][data-stage="${i}"]`);

        if (arrow) {
          tl.to(arrow, { strokeDashoffset: 0, duration: 0.2, ease: "power2.out" });
        }
        if (outline) {
          tl.to(outline, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" });
        }
        if (stageBullets.length) {
          tl.to(stageBullets, {
            opacity: 1,
            x: 0,
            duration: 0.18,
            stagger: 0.05,
            ease: "power2.out",
          });
        }

        if (stage.terminal) {
          if (terminalFill) {
            tl.to(terminalFill, { opacity: 1, duration: 0.2, ease: "power1.inOut" });
          }
          if (terminalText.length) {
            tl.to(terminalText, { color: "#FFFFFF", duration: 0.2, ease: "power1.inOut" }, "<");
          }
        }

        if (caption) {
          tl.to(caption, { opacity: 1, duration: 0.15 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-[color:var(--color-surface-alt)] px-6 py-16 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-20"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            How a Classification Becomes a Filing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[color:var(--color-text-secondary)]">
            One pipeline, three sub-systems, <HighlightPhrase>no manual handoff</HighlightPhrase> between
            them.
          </p>
        </motion.div>

        <div ref={rootRef}>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <InputNode />

            {STAGES.map((stage, i) => (
              <Fragment key={stage.key}>
                <Arrow index={i} />
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
          duration: reducedMotion ? 0 : 0.45,
          delay: reducedMotion ? 0 : 0.25,
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
      <p className="max-w-[160px] text-center text-sm font-semibold leading-snug text-[color:var(--color-text-secondary)]">
        Product description or historical entry
      </p>
    </div>
  );
}

function Arrow({ index }: { index: number }) {
  return (
    <div className="flex h-14 w-14 shrink-0 rotate-90 items-center justify-center lg:h-6 lg:w-14 lg:rotate-0 xl:w-20">
      <svg viewBox="0 0 80 24" className="h-6 w-full" aria-hidden="true">
        <path
          data-arrow={index}
          d="M4,12 L60,12 M52,4 L68,12 L52,20"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function PipelineBox({ stage, index }: { stage: Stage; index: number }) {
  return (
    <div className="relative w-full max-w-[300px] shrink-0 lg:w-[228px] xl:w-[248px]">
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
            stroke="var(--color-primary)"
            strokeWidth={1.75}
          />
        </svg>

        <div className="relative p-5">
          <p
            data-terminal-text={stage.terminal ? "" : undefined}
            className="mb-3 text-xs font-bold uppercase tracking-wide text-[color:var(--color-primary)]"
          >
            {stage.title}
          </p>
          <ul className="space-y-2.5">
            {stage.bullets.map((bullet) => (
              <li
                key={bullet}
                data-bullet
                data-stage={index}
                data-terminal-text={stage.terminal ? "" : undefined}
                className="flex items-start gap-2 text-[13px] font-medium leading-snug text-[color:var(--color-text-primary)]"
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current" />
                {bullet}
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
