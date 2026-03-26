import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactHero } from "@/components/contact/ContactHero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ContactHero />
      <ContactFormSection />
      <Footer />
    </div>
  );
}
