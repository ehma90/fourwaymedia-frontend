import Link from "next/link";
import { Linkedin } from "lucide-react";

const LIGHT_LOGO =
  "https://res.cloudinary.com/drrluhcad/image/upload/v1785428482/Fourlabs_White-01_t9pt0w.png";
const DARK_LOGO =
  "https://res.cloudinary.com/drrluhcad/image/upload/v1785428482/Fourlabs_Black-01_z2ommb.png";

const topRow = [
  {
    title: " Our Services",
    links: [
      { label: "Branding", href: "/service/branding-visual-identity" },
      { label: "Content", href: "/service/content-creation" },
      { label: "Web & Mobile", href: "/service/web-mobile-development" },
      { label: "Marketing", href: "/service/performance-marketing" },
      { label: "Social Media", href: "/service/social-media-management" },
      {
        label: "Illustration & Motion",
        href: "/service/illustrated-art-motion",
      },
      {
        label: "Videography & Photography",
        href: "/service/videography-photography",
      },
    ],
  },
];

function getBottomRow() {
  return [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "FAQ", href: "/faq" },
        { label: "Term & Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Get help",
      links: [{ label: "Contact us", href: "/contact" }],
    },
  ] as const;
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// function XIcon() {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
//       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//     </svg>
//   );
// }

type FooterLink =
  | { label: string; href: string }
  | { label: string; onClick: () => void };

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  const linkClassName = `${title === "Service" ? "text-end" : ""}block w-full cursor-pointer text-left text-sm text-copy-body transition-colors hover:text-copy-primary`;

  return (
    <div className={`min-w-0`}>
      <h4 className="mb-4 text-base font-semibold text-copy-primary">
        {title}
      </h4>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {links.map((link) => (
          <li key={link.label} className="m-0 p-0">
            {"href" in link ? (
              <Link href={link.href} className={linkClassName}>
                {link.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={link.onClick}
                className={linkClassName}
              >
                {link.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const navColumns = [...topRow, ...getBottomRow()];

  return (
    <footer className="text-copy-primary [--copy-body:#4b5563] border-t border-copy-body/15 dark:[--copy-body:#d1d5db]">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start justify-between lg:gap-10 xl:gap-12 w-full">
          <div className="flex shrink-0 flex-col gap-5 lg:max-w-[280px]">
            <Link href="/" aria-label="Fourlabs Studio home" className="block h-16 w-36">
              <img
                src={DARK_LOGO}
                alt="Fourlabs Studio logo"
                className="block h-full w-full object-cover dark:hidden"
              />
              <img
                src={LIGHT_LOGO}
                alt="Fourlabs Studio logo"
                className="hidden h-full w-full md:h-full md:w-full object-cover dark:block"
              />
            </Link>

            <div>
              <p className="text-sm font-medium text-copy-primary transition-colors">
                Email us:
              </p>
              <a
                href="mailto:contact@fourlabs.studio"
                className="text-sm text-copy-body transition-colors hover:text-copy-primary"
              >
                contact@fourlabs.studio
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/fourlabs_studio?igsh=MWQ4eTRkN3F4aHJ0eg%3D%3D&utm_source=qr"
                aria-label="Instagram"
                className="text-copy-body transition-colors hover:text-copy-primary"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/fourwaymedia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-copy-body transition-colors hover:text-copy-primary"
              >
                <Linkedin className="size-5" aria-hidden />
              </a>
              {/* <a
                href="#"
                aria-label="X"
                className="text-copy-body transition-colors hover:text-copy-primary"
              >
                <XIcon />
              </a> */}
            </div>

            <p className="text-xs text-copy-body">
              &copy; {new Date().getFullYear()} Fourlabs Studio. All Right
              Reserved
            </p>
          </div>

          <div
            className={`grid min-w-0 flex-1 grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3`}
          >
            {navColumns.map((col) => (
              <FooterColumn key={col.title} {...col} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
