"use client";

import {
  Briefcase,
  Info,
  LogIn,
  Menu,
  Moon,
  Sun,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/jobs", label: "Offres d'emploi", icon: Briefcase },
  { href: "/about", label: "A propos", icon: Info },
  { href: "/info", label: "Infos emploi", icon: Info },
] as const;

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Track scroll for sticky header effect
  React.useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "glass border-b border-neutral-200/60 shadow-sm dark:border-neutral-800/60"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-heading-sm font-bold text-primary-500 transition-colors hover:text-primary-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
            <span className="text-body-sm font-bold">K</span>
          </div>
          <span className="hidden sm:inline">KWATIGUIGUI</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" role="navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-body-sm font-medium transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "rounded-full p-2 text-neutral-500 transition-colors",
              "hover:bg-neutral-100 hover:text-neutral-700",
              "dark:hover:bg-neutral-800 dark:hover:text-neutral-300",
            )}
            aria-label="Changer le theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          <Link href="/login">
            <Button variant="ghost" size="sm">
              <LogIn size={16} />
              Connexion
            </Button>
          </Link>

          <Link href="/register">
            <Button variant="primary" size="sm">
              <UserPlus size={16} />
              Inscription
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 md:hidden dark:text-neutral-400 dark:hover:bg-neutral-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden dark:border-neutral-800 dark:bg-neutral-900">
          <nav className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-body-md font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400"
                    : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800",
                )}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-neutral-200 dark:border-neutral-800" />

            <Link href="/login" className="w-full">
              <Button variant="ghost" size="md" className="w-full justify-start">
                <LogIn size={18} />
                Connexion
              </Button>
            </Link>

            <Link href="/register" className="w-full">
              <Button variant="primary" size="md" className="w-full">
                <UserPlus size={18} />
                Inscription gratuite
              </Button>
            </Link>

            {/* Mobile theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-body-md text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              {theme === "dark" ? "Mode clair" : "Mode sombre"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
