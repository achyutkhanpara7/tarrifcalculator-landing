import { MockupCard } from "../MockupCard";

const DUTY_ROWS = [
  { label: "MFN Base Rate", value: "19.7%" },
  { label: "Section 301 / 232", value: "7.5%" },
  { label: "FTA Preference", value: "0.0%" },
  { label: "Chapter 99", value: "0.0%" },
];

export function DutyCalculatorMockup() {
  return (
    <MockupCard title="Duty calculation">
      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
        HTS 6105.10.0010 · $45,000 shipment
      </p>

      <div className="mt-4 space-y-2.5">
        {DUTY_ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-[color:var(--color-text-secondary)]">{row.label}</span>
            <span className="font-mono font-medium text-[color:var(--color-text-primary)]">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[color:var(--color-border)] pt-3">
        <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
          Total effective rate
        </span>
        <span className="font-mono text-lg font-bold text-[color:var(--color-primary)]">27.2%</span>
      </div>

      <div className="mt-3 rounded-xl bg-[color:var(--color-primary-light)] px-4 py-3 text-sm">
        <span className="text-[color:var(--color-text-secondary)]">Duty owed: </span>
        <span className="font-mono font-bold text-[color:var(--color-primary)]">$12,240</span>
      </div>
    </MockupCard>
  );
}
