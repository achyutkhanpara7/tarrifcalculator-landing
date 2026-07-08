"use client";

import { useEffect, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LiveDot } from "@/components/LiveDot";
import { confidenceTier, totalRate, type DemoResult } from "./data";

function formatRate(value: number) {
  const sign = value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(1)}%`;
}

function AnimatedRate({
  value,
  runId,
  className,
}: {
  value: number;
  runId: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: reducedMotion ? 0 : 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [value, runId, reducedMotion]);

  return <span className={className}>{formatRate(display)}</span>;
}

const DUTY_ROWS = (result: DemoResult) => [
  { label: "MFN Base Rate", value: result.mfn },
  { label: "Section 301 / 232", value: result.section301 },
  { label: "FTA Preference", value: result.fta },
  { label: "Chapter 99", value: result.ch99 },
];

interface WorkspacePanelProps {
  result: DemoResult | null;
  runId: number;
}

export function WorkspacePanel({ result, runId }: WorkspacePanelProps) {
  const tier = result ? confidenceTier(result.confidence) : null;
  const total = result ? totalRate(result) : 0;
  const dutyOwed = result?.shipmentValue ? (result.shipmentValue * total) / 100 : null;

  const tierStyles: Record<string, string> = {
    High: "bg-[color:var(--color-ok-bg)] text-[color:var(--color-ok)] border-[color:var(--color-ok-border)]",
    Medium:
      "bg-[color:var(--color-warn-bg)] text-[color:var(--color-warn)] border-[color:var(--color-warn-border)]",
    Low: "bg-[color:var(--color-error-bg)] text-[color:var(--color-error)] border-[color:var(--color-error-border)]",
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
          Workspace
        </h3>
        <LiveDot />
      </div>

      <div className="flex-1 rounded-2xl border border-[color:var(--color-border)] bg-white p-5">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 text-center"
            >
              <PackageSearch
                size={28}
                strokeWidth={1.5}
                className="text-[color:var(--color-text-muted)]"
              />
              <p className="max-w-[220px] text-sm text-[color:var(--color-text-muted)]">
                Run a task from the chat to see a live classification result here.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${result.hts}-${runId}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[color:var(--color-text-primary)]">
                    {result.product}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold tracking-tight text-[color:var(--color-primary)]">
                    {result.hts}
                  </p>
                </div>
                {tier && (
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tierStyles[tier]}`}
                  >
                    {tier} confidence · {result.confidence}%
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs leading-snug text-[color:var(--color-text-muted)]">
                {result.griRule}
              </p>

              <div className="mt-5 space-y-2.5 border-t border-[color:var(--color-border)] pt-4">
                {DUTY_ROWS(result).map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="text-[color:var(--color-text-secondary)]">{row.label}</span>
                    <AnimatedRate
                      value={row.value}
                      runId={runId}
                      className="font-mono font-medium text-[color:var(--color-text-primary)]"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[color:var(--color-border)] pt-3">
                <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                  Total effective rate
                </span>
                <AnimatedRate
                  value={total}
                  runId={runId}
                  className="font-mono text-lg font-bold text-[color:var(--color-primary)]"
                />
              </div>

              {dutyOwed !== null && (
                <div className="mt-3 rounded-xl bg-[color:var(--color-primary-light)] px-4 py-3 text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">
                    Duty owed on ${result.shipmentValue?.toLocaleString()} shipment:{" "}
                  </span>
                  <span className="font-mono font-bold text-[color:var(--color-primary)]">
                    ${Math.round(dutyOwed).toLocaleString()}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
