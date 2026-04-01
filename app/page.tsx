import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/Home/HeroSection";
import { ServiceCategories } from "@/components/Home/ServiceCategories";
import { FeaturedSection } from "@/components/Home/FeaturedSection";
import { Footer } from "@/components/footer";
import { ShopDigital } from "@/components/Home/ShopDigital";
import { TestimonialsSection } from "@/components/Home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-[100vw] overflow-x-hidden bg-background text-foreground">
        <HeroSection />
        <ServiceCategories />
        <FeaturedSection />
        <TestimonialsSection />
        <ShopDigital />
        <Footer />
      </div>
    </>
  );
}
