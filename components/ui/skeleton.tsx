import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-zinc-200/90 dark:bg-zinc-800/80",
        className,
      )}
      aria-hidden
    />
  );
}

export function ShopCategoryTabsSkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden" aria-hidden>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-full" />
      ))}
    </div>
  );
}

export function ShopFilterSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ShopGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white dark:border-white/10 dark:bg-neutral-900/50">
            <Skeleton className="aspect-4/3 w-full rounded-none" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function PurchasesTableSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-zinc-200/90 p-4 dark:border-zinc-800"
        >
          <Skeleton className="h-12 w-12 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
      ))}
    </div>
  );
}
