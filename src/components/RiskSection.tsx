"use client";

import { motion } from "framer-motion";

const RISK_STATS = [
  { value: "$200B+", label: "Calendar-year 2025 CBP tariff revenue" },
  { value: "150%", label: "FY2025 vs. FY2024 CBP duty, tax & fee collections" },
  { value: "$100M", label: "Single classification scheme CBP uncovered in 2025" },
  { value: "5 years", label: "CBP retroactive lookback window" },
];

const PENALTY_TIERS = [
  {
    tier: "Negligence",
    penalty: "2× lost revenue",
    note: "Or 20% of dutiable value if no revenue loss",
  },
  {
    tier: "Gross Negligence",
    penalty: "4× lost revenue",
    note: "Or 40% of dutiable value if no revenue loss",
  },
  {
    tier: "Fraud",
    penalty: "Full domestic value",
    note: "Of the merchandise involved, per entry",
  },
  {
    tier: "Prior Disclosure",
    penalty: "Unpaid duties + interest",
    note: "No penalty if disclosed before CBP investigation",
  },
];

export function RiskSection() {
  return (
    <section id="why-it-matters" className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-primary)]">
            Why it matters
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            Misclassification isn&apos;t a paperwork issue. It&apos;s a liability.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--color-text-secondary)]">
            CBP enforcement has never been more aggressive — and every entry
            stays open for five years.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RISK_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] p-6"
            >
              <p className="text-3xl font-extrabold tracking-tight text-[color:var(--color-primary)] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-[color:var(--color-text-muted)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 overflow-hidden rounded-3xl border border-[color:var(--color-border)]"
        >
          <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-4 bg-[color:var(--color-surface-alt)] px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
            <span>Culpability tier</span>
            <span>Max penalty</span>
            <span className="hidden sm:block">Note</span>
          </div>
          <div className="divide-y divide-[color:var(--color-border)]">
            {PENALTY_TIERS.map((row) => (
              <div
                key={row.tier}
                className="grid grid-cols-[1fr_1fr_1.4fr] items-center gap-4 px-6 py-4 transition-colors duration-150 hover:bg-[color:var(--color-surface-alt)]"
              >
                <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                  {row.tier}
                </span>
                <span className="font-mono text-sm font-medium text-[color:var(--color-primary)]">
                  {row.penalty}
                </span>
                <span className="hidden text-sm text-[color:var(--color-text-secondary)] sm:block">
                  {row.note}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
