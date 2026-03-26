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
      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 rounded-br-2xl rounded-bl-2xl border border-black/10 bg-black/45  px-5 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/45">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Fourwaymedia home"
        >
          {/* <img
            src="https://ik.imagekit.io/vp72mg6kz/Homepage/d2242744f33f60f914c35531a37adedc66f5bf87.png"
            alt="Fourwaymedia logo"
            className="block h-16 w-16 object-cover"
          /> */}
          <img
            src="https://ik.imagekit.io/vp72mg6kz/Homepage/b6e6c23c2b27644f6c869e127d3df5e2d2aec9d8.png"
            alt="Fourwaymedia logo"
            className=" h-16 w-16 object-cover dark:block mix-blend-difference"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`border-b-2 border-transparent pb-1 text-sm transition-colors ${
                isActiveLink(item.href)
                  ? "text-[#DC4437] [border-image:linear-gradient(120deg,#DC4437,#FEC107)_1]"
                  : "text-white/80 hover:text-white"
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
