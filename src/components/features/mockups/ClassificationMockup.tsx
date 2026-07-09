import { MockupCard } from "../MockupCard";
import { SeverityBadge } from "../SeverityBadge";

const ALTERNATIVES = [
  { hts: "6110.20.2079", label: "Cotton knit sweater", confidence: 22 },
  { hts: "6205.20.2065", label: "Cotton woven shirt", confidence: 9 },
];

export function ClassificationMockup() {
  return (
    <MockupCard title="Classification result">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[color:var(--color-text-primary)]">
            Men&apos;s cotton-blend knit polo
          </p>
          <p className="mt-1 font-mono text-lg font-bold tracking-tight text-[color:var(--color-primary)]">
            6105.10.0010
          </p>
        </div>
        <SeverityBadge severity="ok" label="High confidence · 96%" />
      </div>

      <p className="mt-2 text-xs leading-snug text-[color:var(--color-text-muted)]">
        GRI 1 — heading text controls, knit construction
      </p>

      <div className="mt-5 space-y-2 border-t border-[color:var(--color-border)] pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
          Considered alternatives
        </p>
        {ALTERNATIVES.map((alt) => (
          <div key={alt.hts} className="flex items-center justify-between text-sm">
            <span className="text-[color:var(--color-text-secondary)]">{alt.label}</span>
            <span className="flex items-center gap-2 font-mono text-xs text-[color:var(--color-text-muted)]">
              {alt.hts}
              <span className="rounded-full bg-[color:var(--color-surface-alt)] px-2 py-0.5">
                {alt.confidence}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </MockupCard>
  );
}
