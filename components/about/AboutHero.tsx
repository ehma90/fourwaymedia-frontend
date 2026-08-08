"use client";

import { motion } from "framer-motion";
import type { DragEvent, MouseEvent } from "react";

const ABOUT_HERO_IMAGE =
  "https://res.cloudinary.com/drrluhcad/video/upload/v1785428490/About_us_m0akiy.mp4";
const ABOUT_HERO_IMAGE_MOBILE =
  "https://res.cloudinary.com/drrluhcad/video/upload/v1786148880/About_Us_portrait_apopx1.mp4";

const easeOut = [0.22, 1, 0.36, 1] as const;

function preventVideoCopy(
  event: MouseEvent<HTMLVideoElement> | DragEvent<HTMLVideoElement>,
) {
  event.preventDefault();
}

export function AboutHero() {
  return (
    <section
      className="relative -mt-24 overflow-hidden"
      aria-labelledby="about-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: easeOut }}
        >
          <div className="h-full w-full md:block hidden">
            <video
              src={ABOUT_HERO_IMAGE}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controlsList="nodownload"
              aria-hidden="true"
              className="h-full w-full object-cover object-center "
              onContextMenu={preventVideoCopy}
              onDragStart={preventVideoCopy}
            />
          </div>
          <div className="h-full w-full md:hidden block">
            <video
              src={ABOUT_HERO_IMAGE_MOBILE}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controlsList="nodownload"
              aria-hidden="true"
              className="h-full w-full object-cover object-center "
              onContextMenu={preventVideoCopy}
              onDragStart={preventVideoCopy}
            />
          </div>
        </motion.div>
        <div
          className="absolute inset-0 bg-black/60 dark:bg-black/55"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center sm:pb-28 sm:pt-36 md:pt-40"></div>
    </section>
  );
}
