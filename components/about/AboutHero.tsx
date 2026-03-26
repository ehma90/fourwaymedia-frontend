const ABOUT_HERO_IMAGE =
  "https://ik.imagekit.io/vp72mg6kz/Shop-page/33ba4f8844d3f757600fa3d99a5cfb96e24bfa3d.jpg";

export function AboutHero() {
  return (
    <section
      className="relative -mt-24 overflow-hidden "
      aria-labelledby="about-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={ABOUT_HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-black/60 dark:bg-black/55"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(75vh,700px)] max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center sm:pb-28 sm:pt-36 md:pt-40">
        <h1
          id="about-hero-heading"
          className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          About Us
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-8 sm:text-lg md:text-xl">
          We&apos;re a creative team focused on building simple, effective digital
          experiences that connect people and ideas.
        </p>
      </div>
    </section>
  );
}
