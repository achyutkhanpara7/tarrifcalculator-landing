import { Search, Calculator, FileOutput, BellRing, type LucideIcon } from "lucide-react";

export interface DemoResult {
  product: string;
  hts: string;
  confidence: number;
  griRule: string;
  mfn: number;
  section301: number;
  fta: number;
  ch99: number;
  shipmentValue?: number;
  agentReply: string;
}

export interface DemoPrompt {
  text: string;
  result: DemoResult;
}

export interface TaskPill {
  key: "classify" | "calculate" | "export7501" | "watchlist";
  label: string;
  icon: LucideIcon;
  inputPlaceholder: string;
  prompts: [DemoPrompt, DemoPrompt];
}

export const TASK_PILLS: TaskPill[] = [
  {
    key: "classify",
    label: "Classify",
    icon: Search,
    inputPlaceholder: "Describe a product to classify…",
    prompts: [
      {
        text: "Men's cotton knit polo shirt, 60% cotton / 40% polyester, from China",
        result: {
          product: "Men's cotton-blend knit polo",
          hts: "6105.10.0010",
          confidence: 96,
          griRule: "GRI 1 — heading text controls, knit construction",
          mfn: 19.7,
          section301: 7.5,
          fta: 0,
          ch99: 0,
          agentReply:
            'Classified "Men\'s cotton-blend knit polo" at 96% confidence. Duty stack ready →',
        },
      },
      {
        text: "Wireless earbuds with charging case, plastic housing, from Vietnam",
        result: {
          product: "Wireless earbuds + charging case",
          hts: "8518.30.2000",
          confidence: 91,
          griRule: "GRI 3(b) — essential character, composite good",
          mfn: 4.9,
          section301: 0,
          fta: 0,
          ch99: 0,
          agentReply:
            'Classified "Wireless earbuds + charging case" at 91% confidence. No 301 exposure — Vietnam origin →',
        },
      },
    ],
  },
  {
    key: "calculate",
    label: "Calculate",
    icon: Calculator,
    inputPlaceholder: "Paste an HTS code or shipment details…",
    prompts: [
      {
        text: "Calculate duty for HTS 6105.10.0010 from China, $45,000 shipment",
        result: {
          product: "Cotton-blend knit polo — $45,000 shipment",
          hts: "6105.10.0010",
          confidence: 96,
          griRule: "GRI 1 — heading text controls, knit construction",
          mfn: 19.7,
          section301: 7.5,
          fta: 0,
          ch99: 0,
          shipmentValue: 45000,
          agentReply: "Full duty stack calculated on a $45,000 shipment value →",
        },
      },
      {
        text: "Compare MFN vs FTA rate for steel fasteners from Mexico (USMCA)",
        result: {
          product: "Steel fasteners — USMCA origin",
          hts: "7318.15.5051",
          confidence: 94,
          griRule: "GRI 1 — heading text controls, threaded article",
          mfn: 8.0,
          section301: 0,
          fta: -8.0,
          ch99: 0,
          agentReply: "USMCA preference applied — effective rate drops to 0% →",
        },
      },
    ],
  },
  {
    key: "export7501",
    label: "Export 7501",
    icon: FileOutput,
    inputPlaceholder: "Enter an entry number to draft a 7501…",
    prompts: [
      {
        text: "Draft 7501 for entry #MBLA-88213 using latest classification",
        result: {
          product: "Cotton polo shirts — Entry MBLA-88213",
          hts: "6105.10.0010",
          confidence: 96,
          griRule: "GRI 1 — heading text controls, knit construction",
          mfn: 19.7,
          section301: 7.5,
          fta: 0,
          ch99: 0,
          agentReply: "7501 draft assembled from the latest classification →",
        },
      },
      {
        text: "Export corrected entry summary for Q3 rug shipment",
        result: {
          product: "Hand-knotted wool rug (corrected)",
          hts: "5701.10.4000",
          confidence: 98,
          griRule: "GRI 1 — heading text controls, hand-knotted construction",
          mfn: 0,
          section301: 0,
          fta: 0,
          ch99: 0,
          agentReply: "Correction applied — hand-knotted construction confirmed, 0% duty →",
        },
      },
    ],
  },
  {
    key: "watchlist",
    label: "Watchlist",
    icon: BellRing,
    inputPlaceholder: "Enter an HTS code to monitor…",
    prompts: [
      {
        text: "Track HTS 6110.20.2069 for Section 301 rate changes",
        result: {
          product: "Cotton sweaters — Watchlist entry",
          hts: "6110.20.2069",
          confidence: 98,
          griRule: "GRI 1 — heading text controls, knit construction",
          mfn: 16.5,
          section301: 7.5,
          fta: 0,
          ch99: 0,
          agentReply: "Now monitoring 6110.20.2069 for rate and exclusion changes →",
        },
      },
      {
        text: "Alert me if exclusions expire on my top 10 codes",
        result: {
          product: "Portfolio monitor — Ch. 99 exclusion review",
          hts: "8501.10.4060",
          confidence: 92,
          griRule: "GRI 1 — heading text controls, rated by output",
          mfn: 2.4,
          section301: 0,
          fta: 0,
          ch99: 0,
          agentReply: "Top 10 codes added — you'll be notified before any exclusion lapses →",
        },
      },
    ],
  },
];

export function confidenceTier(confidence: number): "High" | "Medium" | "Low" {
  if (confidence >= 90) return "High";
  if (confidence >= 70) return "Medium";
  return "Low";
}

export function totalRate(result: DemoResult): number {
  return result.mfn + result.section301 + result.fta + result.ch99;
}
