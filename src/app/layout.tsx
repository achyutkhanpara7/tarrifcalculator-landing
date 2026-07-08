import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TARIFF.IO — Tariff Classification & Duty Compliance",
  description:
    "Classify HTS codes, calculate duty stacks, audit CBP entries, and track rate changes — all in one compliance platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="min-h-screen bg-white font-sans text-[color:var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
