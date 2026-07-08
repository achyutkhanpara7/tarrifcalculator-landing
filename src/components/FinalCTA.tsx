"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden px-6 py-24 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #C41230 0%, #8A0E22 55%, #3D0812 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08), transparent 45%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/70">
          Next steps
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          API integration with your ERP
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80">
          Connect classification, duty calculation, and audit directly into
          your existing workflow — no rip and replace.
        </p>

        <a
          href="mailto:hello@tariff.io"
          className="group mt-9 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-[color:var(--color-primary-dark)] shadow-[0_8px_32px_rgba(0,0,0,0.24)] transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
        >
          Book a walkthrough
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>
      </motion.div>
    </section>
  );
}
