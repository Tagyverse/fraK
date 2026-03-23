import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Preview } from "@/components/preview";
import { Footer } from "@/components/footer";

export default function Home() {
  console.log("[v0] Home page rendering");
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <Preview />
      <Footer />
    </main>
  );
}
