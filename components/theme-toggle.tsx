"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  /**
   * `default` — icon/border follow the page theme (for light headers, e.g. dashboard).
   * `onDark` — always light icon/border for controls sitting on a dark bar (e.g. main site navbar).
   */
  variant?: "default" | "onDark";
};

export function ThemeToggle({ className, variant = "default" }: ThemeToggleProps = {}) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggleLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  const surfaceClass =
    variant === "onDark"
      ? "border-white/20 text-white hover:bg-white/10"
      : "border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10";

  return (
    <div>
      <button
        type="button"
        aria-label={toggleLabel}
        title={toggleLabel}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "flex h-9 md:h-10 cursor-pointer items-center justify-center gap-1 rounded-xl border bg-transparent px-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/40 md:px-3",
          surfaceClass,
          className,
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.65 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.65 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Moon size={18} className="text-current" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.65 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.65 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Sun size={18} className="text-current" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
