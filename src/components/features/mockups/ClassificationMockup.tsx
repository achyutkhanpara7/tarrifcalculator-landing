import { LiveDot } from "@/components/LiveDot";

export function ClassificationMockup() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-5 py-3.5 sm:px-6">
        <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
          Classification result
        </span>
        <LiveDot />
      </div>
      <video
        className="block aspect-[30/17] w-full object-cover object-top"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hts-classify-demo.webm" type="video/webm" />
        <source src="/videos/hts-classify-demo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
