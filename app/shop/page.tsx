"use client";

import { ShopBrowse } from "@/components/shop/ShopBrowse";
import { ShopHero } from "@/components/shop/ShopHero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Shop() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* <ShopHero /> */}
      <ShopBrowse />
      <Footer />
    </div>
  );
}