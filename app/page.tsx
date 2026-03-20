import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/Home/HeroSection";
import { ServiceCategories } from "@/components/Home/ServiceCategories";  
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServiceCategories />
      <Footer />
    </div>
  );
}
