/** Cloudinary video URLs live under `/video/upload/`. */
function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src) || /\/video\//i.test(src);
}

type ShopTemplateMediaProps = {
  src: string;
  className?: string;
  alt?: string
};

/** Shop preview: an image (incl. GIF) or a muted looping video. */
export function ShopTemplateMedia({ src, className, alt }: ShopTemplateMediaProps) {
  if (isVideoSrc(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={className}
        aria-hidden
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element -- CDN previews, incl. animated GIFs
  return <img src={src} alt={alt} className={className} />;
}
