import Link from "next/link";

import { Button } from "@/components/ui/button";

// const HERO_BG =
//   "https://ik.imagekit.io/vp72mg6kz/Homepage/Reel2024Fastforgif-ezgif-ezgif.com-video-to-gif-converter.gif";
const HERO_BG_2 =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/1f9cea9ac36b9035519e4edbd7ce8f8050036d76.jpg";

export function HeroSection() {
  return (
    <section className="relative -mt-[90px] flex min-h-screen items-center justify-center overflow-hidden pt-[72px]">
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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex h-14 min-w-[180px] items-center justify-center rounded-xl bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] px-8 py-3 text-base font-medium text-white shadow-[0_10px_22px_rgba(220,68,55,0.35)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/40"
          >
            Shop Template
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="navbar-outline-button min-w-[120px] border-2 px-8 text-[16px] h-14 font-medium text-white py-3"
          >
            Work With Us
          </Button>
        </div>
      </div>
    </section>
  );
}
