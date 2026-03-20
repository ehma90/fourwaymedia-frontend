"use client";
import { useTheme } from "next-themes";
import Link from "next/link";

const LIGHT_LOGO =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/b6e6c23c2b27644f6c869e127d3df5e2d2aec9d8.png";
const DARK_LOGO =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/d2242744f33f60f914c35531a37adedc66f5bf87.png";

const topRow = [
  {
    title: "Product",
    links: [
      { label: "Marketplace", href: "#" },
      { label: "Video Templates", href: "#" },
      { label: "Design Templates", href: "#" },
      { label: "Audio Assets", href: "#" },
      { label: "3D Templates", href: "#" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Branding", href: "#" },
      { label: "Content", href: "#" },
      { label: "Web & Mobile", href: "#" },
      { label: "Marketing", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Startups", href: "#" },
      { label: "Freelancer", href: "#" },
      { label: "Creator", href: "#" },
      { label: "Brands", href: "#" },
      { label: "Marketing Teams", href: "#" },
    ],
  },
];

const bottomRow = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Career", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Term & Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookies Policy", href: "#" },
    ],
  },
  {
    title: "Get help",
    links: [
      { label: "Pricing", href: "#" },
      { label: "Support", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6a2.6 2.6 0 0 1 2.6-2.6c.27 0 .53.04.78.12V9.6a5.82 5.82 0 0 0-.78-.05A5.83 5.83 0 0 0 4 15.38a5.83 5.83 0 0 0 5.86 5.8 5.83 5.83 0 0 0 5.86-5.8V9.01a7.33 7.33 0 0 0 4.28 1.37V7.29a4.28 4.28 0 0 1-3.4-1.47Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-base font-semibold text-copy-primary">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-copy-body transition-colors hover:text-copy-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const logo = isDark ? LIGHT_LOGO : DARK_LOGO;
  return (
    <footer className="text-copy-primary border-t border-copy-body/15">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Fourwaymedia home">
              <img
                src={logo}
                alt="Fourwaymedia logo"
                className="block h-16 w-16 object-cover dark:hidden"
              />
              <img
                src={logo}
                alt="Fourwaymedia logo"
                className="hidden h-16 w-16 object-cover dark:block"
              />
            </Link>

            <div>
              <p className="text-sm font-medium text-copy-primary transition-colors">Contact us</p>
              <a
                href="mailto:@4waydesigngmail.com"
                className="text-sm text-copy-body transition-colors hover:text-copy-primary"
              >
                @4waydesigngmail.com
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-copy-body transition-colors hover:text-copy-primary">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="TikTok" className="text-copy-body transition-colors hover:text-copy-primary">
                <TikTokIcon />
              </a>
              <a href="#" aria-label="X" className="text-copy-body transition-colors hover:text-copy-primary">
                <XIcon />
              </a>
            </div>

            <p className="text-xs text-copy-body">
              &copy; {new Date().getFullYear()} Fourwaymedia. All Right Reserved
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {topRow.map((col) => (
                <FooterColumn key={col.title} {...col} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {bottomRow.map((col) => (
                <FooterColumn key={col.title} {...col} />
              ))}
            </div>
          </div>
        </div>
      </div>

    
    </footer>
  );
}
