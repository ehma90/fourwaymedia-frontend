"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
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
        className={cn("gap-1 cursor-pointer rounded-xl h-9 px-2.5 flex items-center justify-center bg-gray-600 text-white", className)}
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
