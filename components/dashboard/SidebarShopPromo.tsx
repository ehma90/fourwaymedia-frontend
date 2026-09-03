import Link from "next/link";
import { Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarShopPromoProps = {
  collapsed: boolean;
  className?: string;
  onNavigate?: () => void;
};

export function SidebarShopPromo({
  collapsed,
  className,
  onNavigate,
}: SidebarShopPromoProps) {
  if (collapsed) {
    return (
      <Link
        href="/shop"
        title="Shop for more"
        aria-label="Shop for more templates"
        onClick={onNavigate}
        className="flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(160deg,rgba(220,68,55,0.1),rgba(254,193,7,0.12))] text-[#DC4437] transition-colors hover:bg-[linear-gradient(160deg,rgba(220,68,55,0.18),rgba(254,193,7,0.2))] dark:text-[#FEC107]"
      >
        <Sparkles size={18} aria-hidden />
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden mt-10 rounded-xl border border-[#DC4437]/15 bg-[linear-gradient(145deg,rgba(220,68,55,0.06)_0%,rgba(254,193,7,0.1)_100%)] p-3.5",
        "dark:border-[#FEC107]/20 dark:bg-[linear-gradient(145deg,rgba(220,68,55,0.14)_0%,rgba(254,193,7,0.07)_55%,transparent_100%)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-lg bg-[linear-gradient(160deg,#DC4437,#FEC107)] opacity-[0.2] blur-2xl dark:opacity-30"
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(160deg,#DC4437,#FEC107)] text-white shadow-sm">
            <Sparkles size={14} aria-hidden />
          </span>
          <p className="text-sm font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
            Grow your library
          </p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Fresh templates added regularly. Find your next project.
        </p>
        <Link
          href="/shop"
          onClick={onNavigate}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-3 h-9 w-full navbar-outline-button text-white justify-center rounded-md text-xs font-semibold",
          )}
        >
          Shop for more
        </Link>
      </div>
    </div>
  );
}
