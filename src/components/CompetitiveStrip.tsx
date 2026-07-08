import { Check, X } from "lucide-react";

const COMPARISON_POINTS = [
  "Automated CBP entry PDF audit — not manual line review",
  "Direct 7501 draft generated from audit findings",
  "One platform: classify, calculate, audit, and alert together",
];

export function CompetitiveStrip() {
  return (
    <section className="bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-[color:var(--color-border)]">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-[color:var(--color-surface-alt)] px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)] sm:gap-8">
            <span>Capability</span>
            <span className="text-[color:var(--color-primary)]">TARIFF.IO</span>
            <span>Point solutions</span>
          </div>
          <div className="divide-y divide-[color:var(--color-border)]">
            {COMPARISON_POINTS.map((point) => (
              <div
                key={point}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-4 sm:gap-8"
              >
                <span className="text-sm text-[color:var(--color-text-secondary)]">{point}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-ok-bg)] text-[color:var(--color-ok)]">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-surface-alt)] text-[color:var(--color-text-muted)]">
                  <X size={13} strokeWidth={2.5} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
