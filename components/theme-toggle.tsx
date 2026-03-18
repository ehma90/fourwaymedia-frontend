"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggleLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div className=" ">
      <Button
        type="button"
        // variant="outline" 
        size="sm"
        aria-label={toggleLabel}
        title={toggleLabel}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className=" gap-1 bg-gray-800"
      >
        {isDark ? <Moon size={16} className="text-white" /> : <Sun size={16} className="text-white" />}

      </Button>
    </div>
  );
}
