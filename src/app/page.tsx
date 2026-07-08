import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
import { LiveDemoWidget } from "@/components/demo/LiveDemoWidget";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatStrip />
        <LiveDemoWidget />
      </main>
    </>
  );
}
