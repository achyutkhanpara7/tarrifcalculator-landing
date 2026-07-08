export type Severity = "ok" | "warn" | "error";

const SEVERITY_STYLES: Record<Severity, string> = {
  ok: "bg-[color:var(--color-ok-bg)] text-[color:var(--color-ok)] border-[color:var(--color-ok-border)]",
  warn: "bg-[color:var(--color-warn-bg)] text-[color:var(--color-warn)] border-[color:var(--color-warn-border)]",
  error:
    "bg-[color:var(--color-error-bg)] text-[color:var(--color-error)] border-[color:var(--color-error-border)]",
};

export function SeverityBadge({ severity, label }: { severity: Severity; label: string }) {
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${SEVERITY_STYLES[severity]}`}
    >
      {label}
    </span>
  );
}
