import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// const HERO_BG =
//   "https://ik.imagekit.io/vp72mg6kz/Homepage/Reel2024Fastforgif-ezgif-ezgif.com-video-to-gif-converter.gif";
const HERO_BG_2 =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/1f9cea9ac36b9035519e4edbd7ce8f8050036d76.jpg";

export function HeroSection() {
  return (
    <section className="relative -mt-[76px] flex min-h-screen items-center justify-center overflow-hidden pt-[64px] md:-mt-[90px] md:pt-[72px]">
      <img
        src={HERO_BG_2}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Creative work, done properly.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Strategy, design, and production-ready templates, all in one place.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-row flex-nowrap items-center justify-center gap-2 self-stretch sm:max-w-none sm:gap-4">
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "inline-flex h-11 min-w-0 flex-1 items-center justify-center px-4 py-2 whitespace-nowrap sm:min-w-[135px] sm:flex-none sm:px-8 sm:py-3 sm:text-base md:h-14",
            )}
          >
            Shop Template
          </Link>
          <Link
            href="/contact"
            className="navbar-outline-button inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-xl border-2 px-4 py-2 text-sm font-medium text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/40 whitespace-nowrap sm:min-w-[135px] sm:flex-none sm:px-8 sm:py-3 sm:text-[16px] md:h-14"
          >
            Work With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
