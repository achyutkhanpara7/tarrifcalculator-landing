import { TrendingUp, Clock, BadgeCheck } from "lucide-react";
import { MockupCard } from "../MockupCard";

const ALERTS = [
  {
    icon: TrendingUp,
    tone: "text-[color:var(--color-error)] bg-[color:var(--color-error-bg)]",
    text: "Section 301 rate increase — HTS 6110.20.2069",
    time: "2 hours ago",
  },
  {
    icon: Clock,
    tone: "text-[color:var(--color-warn)] bg-[color:var(--color-warn-bg)]",
    text: "Exclusion expiring in 14 days — HTS 8501.10.4060",
    time: "Yesterday",
  },
  {
    icon: BadgeCheck,
    tone: "text-[color:var(--color-ok)] bg-[color:var(--color-ok-bg)]",
    text: "New FTA preference available — HTS 7318.15.5051",
    time: "3 days ago",
  },
];

export function RateAlertsMockup() {
  return (
    <MockupCard title="Watchlist feed">
      <div className="space-y-2">
        {ALERTS.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.text}
              className="flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition-colors duration-150 hover:bg-[color:var(--color-surface-alt)]"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${alert.tone}`}>
                <Icon size={15} strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-sm leading-snug text-[color:var(--color-text-primary)]">
                  {alert.text}
                </p>
                <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </MockupCard>
  );
}
