"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  decimals?: number;
}

const STATS: Stat[] = [
  {
    value: 30,
    suffix: " sec",
    label: "Classification time vs. 2–5 business days manually",
  },
  {
    value: 0,
    suffix: "",
    label: "Manual steps from product description to ledger record",
  },
  {
    value: 5,
    suffix: " years",
    label: "CBP retroactive lookback — every entry needs a defensible trail",
  },
  {
    value: 200,
    prefix: "$",
    suffix: "B+",
    label: "CY2025 CBP tariff revenue — why this matters",
  },
];

function StatNumber({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, stat.value, {
      duration: reducedMotion ? 0 : 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, reducedMotion, stat.value]);

  return (
    <span
      ref={ref}
      className="text-4xl font-extrabold tracking-tight text-[color:var(--color-primary)] sm:text-5xl"
    >
      {stat.prefix}
      {display}
      {stat.suffix}
    </span>
  );
}

export function StatStrip() {
  return (
    <section className="relative bg-white px-6 pb-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 bg-white p-8">
            <StatNumber stat={stat} />
            <p className="text-sm leading-snug text-[color:var(--color-text-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
