"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggleLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={toggleLabel}
      title={toggleLabel}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="min-w-[88px] gap-1.5"
    >
      {isDark ? <Moon size={14} /> : <Sun size={14} />}
  
    </Button>
  );
}
