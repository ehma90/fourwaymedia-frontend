import { cn } from "@/lib/utils";

const fieldFocusClass =
  "outline-none transition-colors focus:border-[#f27121]/50 focus:ring-2 focus:ring-[#e94057]/20";

const fieldSurfaceClass =
  "w-full rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 dark:border-neutral-600 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500";

/** Fixed-height single-line inputs (auth forms and similar). */
export const inputFieldClassName = cn(fieldSurfaceClass, fieldFocusClass, "h-11 px-3.5");

/** Inputs and textareas with comfortable padding (contact forms, etc.). */
export const formFieldClassName = cn(fieldSurfaceClass, fieldFocusClass, "px-4 py-3");
