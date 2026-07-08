"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { WaveBackground } from "./hero/WaveBackground";
import { OrbitVisual } from "./hero/OrbitVisual";

const HEADLINE_LINE_1 = "Classification you can defend.";
const HEADLINE_LINE_2 = "Duty you can trust.";

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedHeadline({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: delayOffset + index * 0.06,
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pb-24 pt-36 sm:pt-44">
      <WaveBackground />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-secondary)]"
          >
            Compliance intelligence platform
          </motion.div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[color:var(--color-text-primary)] sm:text-5xl lg:text-[3.4rem]">
            <AnimatedHeadline text={HEADLINE_LINE_1} />
            <br />
            <span className="text-[color:var(--color-primary)]">
              <AnimatedHeadline text={HEADLINE_LINE_2} delayOffset={0.32} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--color-text-secondary)]"
          >
            TARIFF.IO turns plain-English product descriptions into defensible HTS
            codes, full duty-stack calculations, and audit-ready CBP entries —
            before a shipment ever crosses the border.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.68 }}
            className="mt-9"
          >
            <a
              href="#cta"
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[color:var(--color-text-primary)] px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              Book a demo
              <Plus
                size={16}
                className="transition-transform duration-200 group-hover:rotate-90"
              />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <OrbitVisual />
        </motion.div>
      </div>
    </section>
  );
}
