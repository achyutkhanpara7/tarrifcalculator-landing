import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatStrip />
      </main>
    </>
  );
}
