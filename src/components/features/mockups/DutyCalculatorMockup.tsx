import { MockupCard } from "../MockupCard";
import { DutyStackDonut } from "./DutyStackDonut";

const DUTY_ROWS = [
  { label: "MFN Base Rate", value: "19.7%", color: "#C41230" },
  { label: "Section 301 / 232", value: "7.5%", color: "#B8790A" },
  { label: "FTA Preference", value: "0.0%", color: "#1E8E5A" },
  { label: "Chapter 99", value: "0.0%", color: "#60A5FA" },
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
            <span className="flex items-center gap-2 text-[color:var(--color-text-secondary)]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: row.color }}
              />
              {row.label}
            </span>
            <span className="font-mono font-medium text-[color:var(--color-text-primary)]">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-[color:var(--color-border)] pt-4">
        <DutyStackDonut
          totalLabel="27.2%"
          segments={DUTY_ROWS.map((row) => ({
            name: row.label,
            value: parseFloat(row.value),
            color: row.color,
          }))}
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">
            Total effective rate
          </p>
          <p className="mt-2 rounded-xl bg-[color:var(--color-primary-light)] px-3 py-2 text-sm">
            <span className="text-[color:var(--color-text-secondary)]">Duty owed: </span>
            <span className="font-mono font-bold text-[color:var(--color-primary)]">$12,240</span>
          </p>
        </div>
      </div>
    </MockupCard>
  );
}
