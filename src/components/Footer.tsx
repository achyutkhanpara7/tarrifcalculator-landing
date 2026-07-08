import { Mail } from "lucide-react";
import { LinkedInIcon, XIcon } from "@/components/icons/BrandIcons";

const PRODUCT_LINKS = [
  { label: "Classify", href: "#platform" },
  { label: "Calculate", href: "#platform" },
  { label: "Audit", href: "#platform" },
  { label: "Alerts", href: "#platform" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "mailto:hello@tariff.io" },
];

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-surface-cream)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="text-lg font-bold tracking-tight">
              <span className="text-[color:var(--color-text-primary)]">TARIFF</span>
              <span className="text-[color:var(--color-primary)]">.IO</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
              Tariff classification and duty-compliance intelligence — HTS
              classification, duty calculation, CBP entry audit, and rate
              alerts in one platform.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="TARIFF.IO on LinkedIn"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:border-[color:var(--color-primary-border)] hover:text-[color:var(--color-primary)]"
              >
                <LinkedInIcon size={15} />
              </a>
              <a
                href="#"
                aria-label="TARIFF.IO on X"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:border-[color:var(--color-primary-border)] hover:text-[color:var(--color-primary)]"
              >
                <XIcon size={15} />
              </a>
              <a
                href="mailto:hello@tariff.io"
                aria-label="Email TARIFF.IO"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:border-[color:var(--color-primary-border)] hover:text-[color:var(--color-primary)]"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
              Product
            </p>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:text-[color:var(--color-primary)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:text-[color:var(--color-primary)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@tariff.io"
                  className="text-sm text-[color:var(--color-text-secondary)] transition-colors duration-200 hover:text-[color:var(--color-primary)]"
                >
                  hello@tariff.io
                </a>
              </li>
              <li>
                <a
                  href="#cta"
                  className="text-sm font-semibold text-[color:var(--color-primary)] transition-colors duration-200 hover:text-[color:var(--color-primary-hover)]"
                >
                  Request a walkthrough →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-[color:var(--color-text-muted)] sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} TARIFF.IO. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors duration-200 hover:text-[color:var(--color-primary)]">
              Privacy
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-[color:var(--color-primary)]">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
