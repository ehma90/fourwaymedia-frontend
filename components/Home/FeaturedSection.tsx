"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

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
  "https://ik.imagekit.io/nuelt/Print%20designs/Artboard%204.jpg?updatedAt=1773525278089",
] as const;

const ROW_BOTTOM = [
  "https://res.cloudinary.com/dqokmztzc/video/upload/q_auto/f_auto/v1775551456/Video_1_Memorial_Day_Sale_May2024_4x5_rz1vzp.mp4",
  "https://res.cloudinary.com/drrluhcad/video/upload/v1781248109/Air_Travel_Video_stweky.mp4",
  "https://res.cloudinary.com/dqokmztzc/video/upload/q_auto/f_auto/v1775551420/Tombo_tub1ye.mp4",
  "https://res.cloudinary.com/dqokmztzc/video/upload/q_auto/f_auto/v1775551513/Video_2_Split_Screen_October2024_bgmphz.mp4",
  "https://res.cloudinary.com/drrluhcad/video/upload/v1781248016/logo_animation_for_hijjabr_v1_1080p_nieln1.mp4",
  "https://res.cloudinary.com/drrluhcad/video/upload/v1781248019/schematics_ui_design_and_animation_for_fabrik_v1_1080p_2_1_pk2kyc.mp4",
] as const;

type MarqueeDirection = "ltr" | "rtl";

function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src) || /\/video\//i.test(src);
}

function FeaturedMarqueeMedia({
  src,
  mode,
}: {
  src: string;
  mode: "thumbnail" | "preview";
}) {
  const mediaClassName =
    mode === "preview"
      ? "max-h-[min(85vh,920px)] w-full object-contain"
      : "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]";

  if (isVideoSrc(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop={mode === "thumbnail"}
        muted={mode === "thumbnail"}
        controls={mode === "preview"}
        playsInline
        preload={mode === "thumbnail" ? "metadata" : "auto"}
        className={mediaClassName}
        aria-hidden={mode === "thumbnail"}
      />
    );
  }

  return (
    <img
      src={src}
      alt={mode === "preview" ? "Featured work preview" : ""}
      className={mediaClassName}
    />
  );
}

function FeaturedMediaPreview({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!src) return;
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [src, handleKeyDown]);

  if (typeof document === "undefined" || !src) return null;

  const isVideo = isVideoSrc(src);

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-8"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-black/70 backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex w-full max-w-6xl flex-col items-center"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-0 z-20 flex h-10 w-10 translate-y-[-100%] items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEC107] sm:right-2 sm:top-0 sm:translate-y-0"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </button>

        <p id={titleId} className="sr-only">
          {isVideo ? "Featured video preview" : "Featured image preview"}
        </p>

        <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <FeaturedMarqueeMedia src={src} mode="preview" />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function FeaturedMarqueeRow({
  images,
  direction,
  variant,
  ariaLabel,
  onSelectMedia,
}: {
  images: readonly string[];
  direction: MarqueeDirection;
  variant: "tall" | "short";
  ariaLabel: string;
  onSelectMedia: (src: string) => void;
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
        {loop.map((src, index) => {
          const isVideo = isVideoSrc(src);
          return (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => onSelectMedia(src)}
              className={cn(
                cardSurface,
                "cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEC107]",
              )}
              aria-label={
                isVideo ? "Preview featured video" : "Preview featured image"
              }
            >
              <FeaturedMarqueeMedia src={src} mode="thumbnail" />
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/5"
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FeaturedSection() {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  return (
    <>
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
              <FeaturedMarqueeRow
                images={ROW_TOP}
                direction="ltr"
                variant="tall"
                ariaLabel="Featured work, primary row"
                onSelectMedia={setPreviewSrc}
              />
              <FeaturedMarqueeRow
                images={ROW_BOTTOM}
                direction="rtl"
                variant="short"
                ariaLabel="Featured work, secondary row"
                onSelectMedia={setPreviewSrc}
              />
            </div>
          </div>
        </div>
      </section>

      <FeaturedMediaPreview
        src={previewSrc}
        onClose={() => setPreviewSrc(null)}
      />
    </>
  );
}
