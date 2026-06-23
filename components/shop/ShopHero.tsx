const SHOP_HERO_IMAGE =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/a5956611446515a523035d76c478e356d7405f9d.jpg";

type ShopHeroProps = {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
};

export function ShopHero({
  title = "Professional Video Templates",
  description = "High-quality templates designed for brands and creators.",
  image = SHOP_HERO_IMAGE,
  imageAlt = "Video and smart device creative showcase",
  eyebrow,
}: ShopHeroProps = {}) {
  return (
    <section
      className="border-b border-neutral-200/80 bg-[#f4f4f2] py-14 sm:py-20 lg:py-24 dark:border-white/10 dark:bg-[#141414] -mt-24"
      aria-labelledby="shop-hero-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 mt-32 lg:flex-row lg:items-center lg:gap-14 xl:gap-20">
        <div className="flex min-w-0 flex-1 flex-col justify-center font-[family-name:var(--font-lexend),system-ui,sans-serif]">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#dc4437]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="shop-hero-heading"
            className="text-3xl font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.75rem] xl:text-5xl dark:text-white"
          >
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            {description}
          </p>
        </div>

        <div className="relative min-w-0 flex-1">
          <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:rounded-[18px] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
            <img
              src={image}
              alt={imageAlt}
              className="aspect-4/3 w-full object-cover sm:aspect-16/11 lg:aspect-auto lg:min-h-[280px] lg:max-h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
