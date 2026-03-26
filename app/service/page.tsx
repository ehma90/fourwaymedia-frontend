import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ServiceHero } from "@/components/service/ServiceHero";

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ServiceHero />
      <Footer />
    </div>
  );
}
