"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureSectionProps {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  mockup: ReactNode;
  align: "left" | "right";
  background?: "white" | "alt";
}

export function FeatureSection({
  index,
  eyebrow,
  title,
  description,
  mockup,
  align,
  background = "white",
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !mockupRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(mockupRef.current, { opacity: 1, x: 0 });
        return;
      }

      gsap.fromTo(
        mockupRef.current,
        { opacity: 0, x: align === "right" ? 48 : -48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 1, filter: "blur(0px)" },
        {
          opacity: 0.35,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [align, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-6 py-24 lg:px-8 ${
        background === "alt" ? "bg-[color:var(--color-surface-alt)]" : "bg-white"
      }`}
    >
      <div ref={contentRef} className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className={`relative order-2 pt-10 sm:pt-14 ${
              align === "right" ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 left-0 -z-10 select-none text-[6rem] font-extrabold leading-none text-[color:var(--color-primary)] opacity-[0.09] sm:text-[8rem]"
            >
              {index}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-primary)]">
              {eyebrow}
            </p>
            <h3 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
              {title}
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[color:var(--color-text-secondary)]">
              {description}
            </p>
          </div>

          <div
            ref={mockupRef}
            className={`order-1 ${align === "right" ? "lg:order-2" : "lg:order-1"}`}
          >
            {mockup}
          </div>
        </div>
      </div>
    </section>
  );
}
