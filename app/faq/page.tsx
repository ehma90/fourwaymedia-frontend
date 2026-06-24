import type { Metadata } from "next";

import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FaqHero } from "@/components/faq/FaqHero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "FAQ | Fourway Media",
  description:
    "Answers to common questions about Fourway Media's services, process, pricing, timelines, and how to get started.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <FaqHero />
      <FaqAccordion />
      <Footer />
    </div>
  );
}
