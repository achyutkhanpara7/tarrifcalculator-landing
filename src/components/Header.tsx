"use client";

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Live demo", href: "#demo" },
  { label: "Why it matters", href: "#why-it-matters" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--color-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#top" className="text-lg font-bold tracking-tight">
          <span className="text-[color:var(--color-text-primary)]">TARIFF</span>
          <span className="text-[color:var(--color-primary)]">.IO</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="cursor-pointer rounded-xl bg-[linear-gradient(135deg,#F04255_0%,#EF2D3E_55%,#C41230_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(239,45,62,0.25)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          Book a walkthrough
        </a>
      </div>
    </header>
  );
}
