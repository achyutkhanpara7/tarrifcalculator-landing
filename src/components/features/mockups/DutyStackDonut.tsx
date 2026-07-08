"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface DutyStackDonutProps {
  segments: { name: string; value: number; color: string }[];
  totalLabel: string;
}

export function DutyStackDonut({ segments, totalLabel }: DutyStackDonutProps) {
  const data = segments.filter((segment) => segment.value > 0);

  return (
    <div className="relative h-[76px] w-[76px] shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={26}
            outerRadius={38}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((segment) => (
              <Cell key={segment.name} fill={segment.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-xs font-bold text-[color:var(--color-text-primary)]">
          {totalLabel}
        </span>
      </div>
    </div>
  );
}
