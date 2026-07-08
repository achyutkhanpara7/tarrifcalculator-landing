import { LiveDot } from "@/components/LiveDot";

export function MockupCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
          {title}
        </span>
        <LiveDot />
      </div>
      {children}
    </div>
  );
}
