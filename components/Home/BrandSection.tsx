import Link from "next/link";

/** Light theme: dark mark on light. Dark theme: light mark on dark. Same as navbar. */
const LOGO_LIGHT =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/d2242744f33f60f914c35531a37adedc66f5bf87.png";
const LOGO_DARK =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/b6e6c23c2b27644f6c869e127d3df5e2d2aec9d8.png";

export function BrandSection() {
  return (
    <section
      className="border-t border-copy-body/15 py-16 sm:py-20"
      aria-labelledby="brand-section-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-90"
          aria-label="Fourwaymedia home"
        >
          <img
            src={LOGO_LIGHT}
            alt=""
            width={64}
            height={64}
            className="block h-14 w-14 object-contain dark:hidden sm:h-16 sm:w-16"
          />
          <img
            src={LOGO_DARK}
            alt=""
            width={64}
            height={64}
            className="hidden h-14 w-14 object-contain dark:block sm:h-16 sm:w-16"
          />
        </Link>

        <div className="max-w-xl space-y-2">
          <h2
            id="brand-section-heading"
            className="text-2xl font-semibold tracking-tight text-copy-primary sm:text-3xl"
          >
            Templates and services, built for creators
          </h2>
          <p className="text-base leading-relaxed text-copy-body sm:text-lg">
            From motion to brand systems—everything you need to ship polished work,
            faster.
          </p>
        </div>
      </div>
    </section>
  );
}
