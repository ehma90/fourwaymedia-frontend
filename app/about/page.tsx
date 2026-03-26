import { AboutHero } from "@/components/about/AboutHero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHero />
      <Footer />
    </div>
  );
}
