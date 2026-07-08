import { ArrowRight } from "lucide-react";
import { MockupCard } from "../MockupCard";
import { SeverityBadge, type Severity } from "../SeverityBadge";

interface DiscrepancyRow {
  declared: string;
  correct: string;
  delta: string;
  severity: Severity;
  severityLabel: string;
}

const ROWS: DiscrepancyRow[] = [
  {
    declared: "6109.10.0012",
    correct: "6105.20.2010",
    delta: "+$4,200/qtr",
    severity: "error",
    severityLabel: "High",
  },
  {
    declared: "5702.42.2000",
    correct: "5701.10.4000",
    delta: "−$1,800",
    severity: "warn",
    severityLabel: "Overpaid",
  },
  {
    declared: "8501.10.4060",
    correct: "8501.10.4060",
    delta: "$0",
    severity: "ok",
    severityLabel: "Match",
  },
];

export function EntryAuditMockup() {
  return (
    <MockupCard title="Entry audit — 3 line items reviewed">
      <div className="space-y-1">
        {ROWS.map((row) => (
          <div
            key={`${row.declared}-${row.correct}`}
            className="flex items-center justify-between gap-3 rounded-xl px-2.5 py-2.5 transition-colors duration-150 hover:bg-[color:var(--color-surface-alt)]"
          >
            <div className="flex min-w-0 items-center gap-2 font-mono text-xs text-[color:var(--color-text-secondary)]">
              <span className="truncate">{row.declared}</span>
              <ArrowRight size={12} className="shrink-0 text-[color:var(--color-text-muted)]" />
              <span className="truncate font-semibold text-[color:var(--color-text-primary)]">
                {row.correct}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2.5">
              <span className="font-mono text-xs font-medium text-[color:var(--color-text-secondary)]">
                {row.delta}
              </span>
              <SeverityBadge severity={row.severity} label={row.severityLabel} />
            </div>
          </div>
        ))}
      </div>
    </MockupCard>
  );
}
