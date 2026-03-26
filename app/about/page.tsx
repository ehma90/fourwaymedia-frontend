import { AboutHero } from "@/components/about/AboutHero";
import { MeetOurTeam } from "@/components/about/MeetOurTeam";
import { WereHiring } from "@/components/about/WereHiring";
import { WhyWorkWithUs } from "@/components/about/WhyWorkWithUs";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHero />
      <WhyWorkWithUs />
      <MeetOurTeam />
      <WereHiring />
      <Footer />
    </div>
  );
}
