"use client";

import { Suspense } from "react";

import { ShopBrowse } from "@/components/shop/ShopBrowse";
import { ShopHero } from "@/components/shop/ShopHero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Shop() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* <ShopHero /> */}
      <Suspense
        fallback={
          <div className="flex justify-center py-24">
            <LoadingSpinner label="Loading shop" />
          </div>
        }
      >
        <ShopBrowse />
      </Suspense>
      <Footer />
    </div>
  );
}