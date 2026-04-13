"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CreditCard,
  Download,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { useDashboardSubscription } from "@/hooks/use-dashboard-subscription";
import {
  MOCK_USER_DISPLAY_NAME,
  useMockAuth,
} from "@/lib/mock-auth-context";
import { cn } from "@/lib/utils";

/** Light chrome (no `html.dark`) — dark mark on light sidebar */
const LOGO_FOR_LIGHT_UI =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/d2242744f33f60f914c35531a37adedc66f5bf87.png";
/** Dark chrome — light mark on dark sidebar (do not pick via useTheme; `resolvedTheme` is undefined on first paint) */
const LOGO_FOR_DARK_UI =
  "https://ik.imagekit.io/vp72mg6kz/Homepage/b6e6c23c2b27644f6c869e127d3df5e2d2aec9d8.png";

function getInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
}

const DASHBOARD_ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/downloads": "My downloads",
  "/dashboard/subscription": "Subscription",
  "/dashboard/billing": "Billing",
  "/dashboard/notifications": "Notifications",
  "/dashboard/account": "Account",
  "/dashboard/purchases": "Purchases",
};

function getDashboardPageTitle(pathname: string): string {
  if (DASHBOARD_ROUTE_TITLES[pathname]) return DASHBOARD_ROUTE_TITLES[pathname];
  const m = pathname.match(/^\/dashboard\/([^/]+)/);
  if (m) {
    const slug = m[1];
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return "Dashboard";
}

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };

/** Subscription upsell vs Premium routes — see plan: subscription hidden when subscribed; billing + downloads when subscribed. */
function buildNavItems(isSubscribed: boolean): NavItem[] {
  const items: NavItem[] = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  ];
  if (isSubscribed) {
    items.push(
      { href: "/dashboard/downloads", label: "My downloads", icon: Download },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
    );
  } else {
    items.push({
      href: "/dashboard/subscription",
      label: "Subscription",
      icon: Sparkles,
    });
  }
  items.push(
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { href: "/dashboard/account", label: "Account", icon: Settings },
  );
  return items;
}

type DashboardShellProps = {
  children: React.ReactNode;
};

function SidebarMenuFooter({
  onLogout,
  onAfterNavigate,
  pinToBottom,
}: {
  onLogout: () => void;
  onAfterNavigate?: () => void;
  /** When true, push this block to the bottom of a flex sidebar (desktop). */
  pinToBottom?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-t border-zinc-200 pt-3 dark:border-zinc-800",
        pinToBottom && "mt-auto",
      )}
    >
      <button
        type="button"
        onClick={() => {
          onLogout();
          onAfterNavigate?.();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-700 dark:text-zinc-400 dark:hover:bg-red-500/15 dark:hover:text-red-300 cursor-pointer"
      >
        <LogOut size={18} className="shrink-0 opacity-90" aria-hidden />
        Log out
      </button>
    </div>
  );
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useMockAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSubscribed } = useDashboardSubscription();
  const navItems = buildNavItems(isSubscribed);

  const handleLogout = () => {
    signOut();
    router.push("/sign-in");
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const linkClass = (href: string) => {
    const active =
      pathname === href ||
      (href !== "/dashboard" && pathname.startsWith(`${href}/`));
    return cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-zinc-200/90 text-zinc-900 dark:bg-white/[0.08] dark:text-white dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100",
    );
  };

  const pageTitle = getDashboardPageTitle(pathname);
  const userInitials = getInitials(MOCK_USER_DISPLAY_NAME);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="flex min-h-0 shrink-0 flex-col border-b border-zinc-200 bg-white md:min-h-screen md:w-68 md:border-b-0 md:border-r dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-3 md:py-5">
            <div className="flex items-center justify-between gap-2">
              <Link href="/" aria-label="Fourwaymedia home" className="min-w-0 shrink">
                <img
                  src={LOGO_FOR_LIGHT_UI}
                  alt="Fourwaymedia logo"
                  className="h-16 w-16 object-cover md:h-11 md:w-11 dark:hidden"
                />
                <img
                  src={LOGO_FOR_DARK_UI}
                  alt="Fourwaymedia logo"
                  className="hidden h-16 w-16 object-cover md:h-11 md:w-11 dark:block"
                />
              </Link>
              <div className="flex shrink-0 items-center gap-2 md:gap-3">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Link
                    href="/dashboard/account"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] text-xs font-semibold text-white md:h-9 md:w-9 md:text-sm"
                    aria-label={`Account settings (${MOCK_USER_DISPLAY_NAME})`}
                    title={MOCK_USER_DISPLAY_NAME}
                  >
                    {userInitials}
                  </Link>
                </div>

                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-800 transition-colors hover:bg-zinc-100 md:hidden dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
                  aria-expanded={mobileOpen}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileOpen((o) => !o)}
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
            <nav
              className="hidden min-h-0 flex-1 flex-col md:flex"
              aria-label="Dashboard"
            >
              <div className="flex flex-col gap-2.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                      <Icon size={18} className="shrink-0 opacity-90" aria-hidden />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <SidebarMenuFooter onLogout={handleLogout} pinToBottom />
            </nav>
          </div>
        </aside>

        {mobileOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 md:hidden"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed inset-x-0 top-22 z-50 max-h-[min(70vh,calc(100vh-5.5rem))] overflow-y-auto border-b border-zinc-200 bg-white px-4 py-3 shadow-xl shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40 md:hidden">
              <nav className="flex flex-col" aria-label="Dashboard">
                <div className="flex flex-col gap-0.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                        <Icon size={18} className="shrink-0 opacity-90" aria-hidden />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <SidebarMenuFooter
                  onLogout={handleLogout}
                  onAfterNavigate={() => setMobileOpen(false)}
                />
              </nav>
            </div>
          </>
        )}

        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-white text-zinc-950 dark:bg-zinc-900/70 dark:text-zinc-50">
          
          <div className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
