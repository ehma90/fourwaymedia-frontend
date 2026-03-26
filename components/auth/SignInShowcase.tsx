const SHOWCASE_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80";

export function SignInShowcase() {
  return (
    <div
      className="relative flex w-full flex-1 flex-col items-center justify-center p-6 sm:p-8 lg:p-12"
      aria-hidden
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/40 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={SHOWCASE_IMAGE}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-3 px-6 py-8 text-center sm:px-8">
          <h2 className="text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl dark:text-white">
            Smart Template Discovery
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 sm:text-[15px] dark:text-neutral-400">
            Let AI automatically recommend the best design templates based on your
            needs, project goals, and creative preferences.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="h-1.5 w-8 rounded-full bg-[#7c3aed]" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
