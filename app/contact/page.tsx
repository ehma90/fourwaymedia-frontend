import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactHero } from "@/components/contact/ContactHero";
import { GetInTouch } from "@/components/contact/GetInTouch";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ContactHero />
      <GetInTouch />
      <ContactFormSection />
      <Footer />
    </div>
  );
}
