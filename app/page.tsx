import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/Home/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
    </div>
  );
}
