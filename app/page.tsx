import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/Home/HeroSection";
import { ServiceCategories } from "@/components/Home/ServiceCategories";
import { FeaturedSection } from "@/components/Home/FeaturedSection";
import { Footer } from "@/components/footer";
import { ShopDigital } from "@/components/Home/ShopDigital";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServiceCategories />
      <FeaturedSection />
      <ShopDigital />
      <Footer />
    </div>
  );
}
