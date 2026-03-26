import Link from "next/link";

const ROW_TOP = [
  "https://ik.imagekit.io/vp72mg6kz/Homepage/88507498df3c2047a804f53ff310c763d35a7228%20(1).jpg",
  "https://ik.imagekit.io/vp72mg6kz/Homepage/27ae5e736f11788f4269a4d49b4b35037b35441a.png",
  "https://ik.imagekit.io/vp72mg6kz/Homepage/3e22c1daba940ce0dcd18bea89bc06414b6d0072.jpg",
  "https://ik.imagekit.io/vp72mg6kz/Homepage/55c163a7824139ccafa2d8d87ef974e84228a91c.jpg",
] as const;

const ROW_BOTTOM = [
  "https://ik.imagekit.io/vp72mg6kz/Homepage/c70ed8c45b92416b95dd8ce61eaf9b87e60378f2.jpg",
  "https://ik.imagekit.io/vp72mg6kz/Homepage/f3c144330654faa0c8034e190c5ac3bb28c29cbe.jpg",
  "https://ik.imagekit.io/vp72mg6kz/Homepage/c4dda155e17aed488b73e0b40f1492aa4ba9f95e.jpg",
  "https://ik.imagekit.io/vp72mg6kz/Homepage/3be48836a304b604ddb3bd818b1d8094110c1d82.png",
] as const;

type MarqueeDirection = "ltr" | "rtl";

function FeaturedMarqueeRow({
  images,
  direction,
  variant,
  ariaLabel,
}: {
  images: readonly string[];
  direction: MarqueeDirection;
  variant: "tall" | "short";
  ariaLabel: string;
}) {
  const loop = [...images, ...images];
  const trackClass =
    direction === "ltr"
      ? "featured-marquee-track-ltr gap-5 sm:gap-6"
      : "featured-marquee-track-rtl gap-4 sm:gap-5";

  const cardSurface =
    variant === "tall"
      ? "featured-work-card group relative h-[200px] w-[min(88vw,440px)] shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-zinc-900/40 sm:h-[248px] sm:w-[min(78vw,520px)]"
      : "featured-work-card group relative h-[148px] w-[min(46vw,280px)] shrink-0 overflow-hidden rounded-xl border border-white/12 bg-zinc-900/40 sm:h-[178px] sm:w-[300px]";

  return (
    <div
      className="featured-marquee-viewport overflow-hidden py-0.5 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      role="region"
      aria-label={ariaLabel}
    >
      <div className={trackClass}>
        {loop.map((src, index) => (
          <div key={`${src}-${index}`} className={cardSurface}>
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/5"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturedSection() {
  return (
    <section
      className="relative overflow-x-hidden border-t border-copy-body/15 py-16 sm:py-24"
      aria-labelledby="featured-work-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="featured-work-heading"
            className="text-3xl font-semibold tracking-tight text-copy-primary sm:text-4xl"
          >
            Featured work
          </h2>
        
        </div>

        <div className="rounded-2xl border border-[#DC4437]/35 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-5 md:p-6 dark:border-[#DC4437]/40 dark:bg-black/35">
          <div className="space-y-4 sm:space-y-5">
            {/* Top row: scrolls left → right (track translates +) */}
            <FeaturedMarqueeRow
              images={ROW_TOP}
              direction="ltr"
              variant="tall"
              ariaLabel="Featured work, primary row"
            />
            {/* Bottom row: opposite direction */}
            <FeaturedMarqueeRow
              images={ROW_BOTTOM}
              direction="rtl"
              variant="short"
              ariaLabel="Featured work, secondary row"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
