export function LiveDot({
  label = "Live",
  className = "text-xs font-medium text-[color:var(--color-text-muted)]",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-1.5 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {label}
    </span>
  );
}
