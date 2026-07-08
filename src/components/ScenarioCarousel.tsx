"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, X, Check } from "lucide-react";

interface Scenario {
  title: string;
  without: { headline: string; detail: string };
  with: { headline: string; detail: string };
}

const SCENARIOS: Scenario[] = [
  {
    title: "T-shirts from China",
    without: {
      headline: "A plain t-shirt code got copied onto a collared shirt by mistake.",
      detail: "$16K/quarter underpayment → $128K in back duties and penalties after 2 years.",
    },
    with: {
      headline: "TARIFF.IO catches the collar construction on the first upload.",
      detail: "Billed correctly at 37.2% from day one — no exposure, no surprise audit.",
    },
  },
  {
    title: "Hand-knotted vs. tufted wool rugs",
    without: {
      headline: "Same design, different construction — filed identically on reorder.",
      detail: "0% vs. 6% duty missed when the manufacturer switched construction methods.",
    },
    with: {
      headline: "TARIFF.IO flags the construction change automatically.",
      detail: "Correct rate applied the moment the reorder is classified — no manual review needed.",
    },
  },
];

export function ScenarioCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex((nextIndex + SCENARIOS.length) % SCENARIOS.length);
  };

  const scenario = SCENARIOS[index];

  return (
    <section className="bg-[color:var(--color-surface-alt)] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-primary)]">
            Real scenarios
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            One wrong digit compounds fast
          </h2>
        </div>

        <div className="relative">
          <Quote
            size={40}
            strokeWidth={1.5}
            className="mx-auto mb-4 text-[color:var(--color-primary)] opacity-30"
          />

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={scenario.title}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-[color:var(--color-border)] bg-white p-2 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
              >
                <h3 className="px-4 pt-4 text-center text-lg font-bold text-[color:var(--color-text-primary)] sm:text-xl">
                  {scenario.title}
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[color:var(--color-error-bg)] p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-error)] text-white">
                        <X size={13} strokeWidth={2.5} />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-error)]">
                        Without TARIFF.IO
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-snug text-[color:var(--color-text-primary)]">
                      {scenario.without.headline}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-[color:var(--color-text-secondary)]">
                      {scenario.without.detail}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[color:var(--color-ok-bg)] p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-ok)] text-white">
                        <Check size={13} strokeWidth={2.5} />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-ok)]">
                        With TARIFF.IO
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-snug text-[color:var(--color-text-primary)]">
                      {scenario.with.headline}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-[color:var(--color-text-secondary)]">
                      {scenario.with.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous scenario"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:border-[color:var(--color-primary-border)] hover:text-[color:var(--color-primary)]"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {SCENARIOS.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to scenario ${i + 1}`}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-200 ${
                    i === index
                      ? "w-6 bg-[color:var(--color-primary)]"
                      : "w-2 bg-[color:var(--color-border-strong)]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next scenario"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:border-[color:var(--color-primary-border)] hover:text-[color:var(--color-primary)]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
