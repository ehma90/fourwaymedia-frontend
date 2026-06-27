import { AboutHero } from "@/components/about/AboutHero";
import { IndustriesWeServe } from "@/components/about/IndustriesWeServe";
import { MeetOurTeam } from "@/components/about/MeetOurTeam";
import { OurProcess } from "@/components/about/OurProcess";
import { OurStory } from "@/components/about/OurStory";
// import { WereHiring } from "@/components/about/WereHiring";
import { WhyFourway } from "@/components/about/WhyFourway";
import { WhyTrustUs } from "@/components/about/WhyTrustUs";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHero />
      <OurStory />
      <IndustriesWeServe />
      <WhyTrustUs />
      <OurProcess />
      <WhyFourway />
      <MeetOurTeam />
      {/* <WereHiring /> */}
      <Footer />
    </div>
  );
}
