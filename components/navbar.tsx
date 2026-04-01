"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Service", href: "/service" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const titleId = useId();

  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const linkClass = (href: string) =>
    cn(
      "border-b-2 border-transparent pb-1 text-sm transition-colors",
      isActiveLink(href)
        ? "text-[#DC4437] [border-image:linear-gradient(120deg,#DC4437,#FEC107)_1]"
        : "text-white/80 hover:text-white",
    );

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-4">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 rounded-br-2xl rounded-bl-2xl border border-black/10 bg-black/45 px-3 py-2 backdrop-blur-xl dark:border-white/10 dark:bg-black/45 md:gap-6 md:px-5 md:py-3">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Fourwaymedia home"
        >
          <img
            src="https://ik.imagekit.io/vp72mg6kz/Homepage/b6e6c23c2b27644f6c869e127d3df5e2d2aec9d8.png"
            alt="Fourwaymedia logo"
            className="h-12 w-12 object-cover mix-blend-difference dark:block md:h-16 md:w-16"
          />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-7 md:flex"
          aria-label="Main"
        >
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "navbar-outline-button inline-flex h-9 min-w-0 border-2 px-4 text-sm font-medium text-white md:h-10 md:min-w-[120px] md:px-8 md:text-[16px]",
              )}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: "primary" }),
                "inline-flex h-9 min-w-0 bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] px-4 text-sm font-medium text-white shadow-[0_10px_22px_rgba(220,68,55,0.35)] md:h-10 md:min-w-[120px] md:px-8 md:text-[16px]",
              )}
            >
              Sign up
            </Link>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-9 w-9 shrink-0 border-white/20 bg-white/5 p-0 text-white hover:bg-white/10 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? "mobile-nav" : undefined}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = "";
        }}
      >
        {mobileOpen ? (
          <>
            <motion.button
              key="mobile-nav-backdrop"
              type="button"
              className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-nav-panel"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="fixed inset-y-0 right-0 z-70 flex w-[min(100vw-2.5rem,20rem)] flex-col border-l border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 380, mass: 0.85 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <Link
                  id={titleId}
                  href="/"
                  className="shrink-0"
                  aria-label="Fourwaymedia home"
                  onClick={() => setMobileOpen(false)}
                >
                  <img
                    src="https://ik.imagekit.io/vp72mg6kz/Homepage/b6e6c23c2b27644f6c869e127d3df5e2d2aec9d8.png"
                    alt=""
                    className="h-13 w-13 object-cover mix-blend-difference dark:block"
                  />
                </Link>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/40"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base transition-colors",
                      isActiveLink(item.href)
                        ? "bg-white/10 text-[#FEC107]"
                        : "text-white/90 hover:bg-white/5",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-white/10 p-4">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/sign-in"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "navbar-outline-button h-11 w-full justify-center border-2 text-[16px] font-medium text-white",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className={cn(
                      buttonVariants({ variant: "primary" }),
                      "h-11 w-full justify-center bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] text-[16px] font-medium text-white shadow-[0_10px_22px_rgba(220,68,55,0.35)]",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
