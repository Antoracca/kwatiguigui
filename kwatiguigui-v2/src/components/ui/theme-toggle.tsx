"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/**
 * ThemeToggle — cycles light -> dark -> system.
 * Uses CSS transitions for the icon swap (no Framer Motion dependency).
 * Already integrated in the Header component.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch: render nothing on server
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder with fixed dimensions to avoid layout shift
    return (
      <div
        className={cn(
          "h-9 w-9 rounded-full",
          className,
        )}
        aria-hidden
      />
    );
  }

  const isDark = theme === "dark";

  function toggle() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors",
        "hover:bg-neutral-100 hover:text-neutral-700",
        "dark:hover:bg-neutral-800 dark:hover:text-neutral-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        className,
      )}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={theme === "system" ? "Theme systeme" : isDark ? "Mode sombre" : "Mode clair"}
    >
      {/* Sun icon — visible in light mode */}
      <Sun
        className="h-[1.2rem] w-[1.2rem] transition-all duration-300 dark:-rotate-90 dark:scale-0"
        aria-hidden
      />
      {/* Moon icon — visible in dark mode */}
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
        aria-hidden
      />
    </button>
  );
}
