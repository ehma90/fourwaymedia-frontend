
const ROW_TOP = [
 "https://ik.imagekit.io/szglholrw/Product%20Design/SPREADIT-MOCKUP-2.jpg?updatedAt=1769029906614",
  "https://ik.imagekit.io/szglholrw/Social%20Media/Mirron%204.jpg?updatedAt=1769031707414",
  "https://ik.imagekit.io/szglholrw/Social%20Media/USPs%205.jpg?updatedAt=1769031690346",
  "https://ik.imagekit.io/szglholrw/Social%20Media/April%20Lotion%203.jpg?updatedAt=1769031694501",
  "https://ik.imagekit.io/szglholrw/Social%20Media/SA4.jpg?updatedAt=1769031668996",
  "https://ik.imagekit.io/szglholrw/Social%20Media/Noir%203.png?updatedAt=1769031704765",
  "https://ik.imagekit.io/szglholrw/Product%20Design/Custard-Mockup-2.jpg?updatedAt=1769029896696",
  "https://ik.imagekit.io/nuelt/Print%20designs/Artboard%201.jpg?updatedAt=1773525280507",
  "https://ik.imagekit.io/nuelt/Print%20designs/Artboard%2001.jpg?updatedAt=1773525278145",
  "https://ik.imagekit.io/nuelt/Print%20designs/Artboard%204.jpg?updatedAt=1773525278089"

] as const;

const ROW_BOTTOM = [
  "https://res.cloudinary.com/dqokmztzc/video/upload/q_auto/f_auto/v1775551456/Video_1_Memorial_Day_Sale_May2024_4x5_rz1vzp.mp4",
  "https://res.cloudinary.com/dqokmztzc/video/upload/q_auto/f_auto/v1775551420/Tombo_tub1ye.mp4",
  "https://res.cloudinary.com/dqokmztzc/video/upload/q_auto/f_auto/v1775551513/Video_2_Split_Screen_October2024_bgmphz.mp4",
  "https://res.cloudinary.com/dqokmztzc/video/upload/q_auto/f_auto/v1775551485/Novex_Sache_Ad_wwvpzq.mp4",
] as const;

type MarqueeDirection = "ltr" | "rtl";

function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src) || /\/video\//i.test(src);
}

function FeaturedMarqueeMedia({ src }: { src: string }) {
  const mediaClassName =
    "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]";

  if (isVideoSrc(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={mediaClassName}
        aria-hidden
      />
    );
  }

  return <img src={src} alt="" className={mediaClassName} />;
}

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
      ? "featured-work-card group relative h-[200px] w-[min(88vw,440px)] shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-zinc-900/40 sm:h-[348px] sm:w-[min(78vw,520px)]"
      : "featured-work-card group relative h-[148px] w-[min(46vw,280px)] shrink-0 overflow-hidden rounded-xl border border-white/12 bg-zinc-900/40 sm:h-[258px] sm:w-[300px]";

  return (
    <div
      className="featured-marquee-viewport overflow-hidden py-0.5 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      role="region"
      aria-label={ariaLabel}
    >
      <div className={trackClass}>
        {loop.map((src, index) => (
          <div key={`${src}-${index}`} className={cardSurface}>
            <FeaturedMarqueeMedia src={src} />
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
