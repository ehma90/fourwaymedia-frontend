import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  className?: string;
  label?: string;
};

export function LoadingSpinner({ className, label = "Loading" }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span
        className={cn(
          "h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-[#DC4437]",
          "dark:border-zinc-700 dark:border-t-[#FEC107]",
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
