"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Service", href: "/service" },
  { label: "Shop", href: "/shop" },
  { label: "Product", href: "/product" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();

  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 px-4">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 rounded-br-2xl rounded-bl-2xl border border-black/10 bg-white/65 px-5 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/45">
        <Link href="/" className="shrink-0 text-lg font-semibold tracking-wide">
          FOURWAY
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors ${
                isActiveLink(item.href)
                  ? "text-[#DC4437] border-b-2 border-[#DC4437]"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="outline"
            className="navbar-outline-button h-10 min-w-[120px] border-2 px-8 text-[16px] font-medium text-white "
          >
            Sign in
          </Button>
          <Button
            variant="primary"
            className="h-10 min-w-[120px] bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] px-8 text-[16px] font-medium text-white shadow-[0_10px_22px_rgba(220,68,55,0.35)]"
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
