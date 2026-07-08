import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
import { LiveDemoWidget } from "@/components/demo/LiveDemoWidget";
import { FeatureSection } from "@/components/features/FeatureSection";
import { ClassificationMockup } from "@/components/features/mockups/ClassificationMockup";
import { DutyCalculatorMockup } from "@/components/features/mockups/DutyCalculatorMockup";
import { EntryAuditMockup } from "@/components/features/mockups/EntryAuditMockup";
import { RateAlertsMockup } from "@/components/features/mockups/RateAlertsMockup";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatStrip />
        <LiveDemoWidget />

        <div id="platform">
          <FeatureSection
            index="01"
            eyebrow="HTS Classification"
            title="Plain-English product description in. Defensible 10-digit HTS code out."
            description="Describe what you're shipping the way you'd describe it to a colleague. TARIFF.IO returns a defensible HTS code with the GRI reasoning behind it — not just a guess."
            mockup={<ClassificationMockup />}
            align="right"
            background="white"
          />
          <FeatureSection
            index="02"
            eyebrow="Duty Calculator"
            title="Full stack in one calculation: MFN, 301/232, FTA, and Chapter 99."
            description="MFN base rate, Section 301/232 overlays, FTA preferences, active exclusions, antidumping duties, and Chapter 99 — combined into one defensible number, every time."
            mockup={<DutyCalculatorMockup />}
            align="left"
            background="alt"
          />
          <FeatureSection
            index="03"
            eyebrow="Entry Audit"
            title="Upload historical CBP entries. Re-classify and recalculate every line."
            description="Upload historical CBP entry documents and TARIFF.IO re-classifies and recalculates every line item automatically — surfacing under- and overpayments same-day."
            mockup={<EntryAuditMockup />}
            align="right"
            background="white"
          />
          <FeatureSection
            index="04"
            eyebrow="Rate Alerts"
            title="Notified before the next shipment, not at the border."
            description="TARIFF.IO monitors every tracked HTS code for rate changes, exclusion expirations, and new trade actions — so you find out before it costs you."
            mockup={<RateAlertsMockup />}
            align="left"
            background="alt"
          />
        </div>
      </main>
    </>
  );
}
