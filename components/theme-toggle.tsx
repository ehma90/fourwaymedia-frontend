"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps = {}) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggleLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div>
      <button
        type="button"
        aria-label={toggleLabel}
        title={toggleLabel}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "flex h-9 md:h-10 cursor-pointer items-center justify-center gap-1 rounded-xl bg-transparent border border-white/20 px-2.5 md:px-3 hover:bg-white/10 text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/40",
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
