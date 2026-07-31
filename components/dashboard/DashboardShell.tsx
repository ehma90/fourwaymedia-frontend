"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Download,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";

import { MobileProfileMenu } from "@/components/dashboard/MobileProfileMenu";
import { SidebarMenuFooter } from "@/components/dashboard/SidebarMenuFooter";
import { SidebarNavLink, type NavItem } from "@/components/dashboard/SidebarNavLink";
import { SidebarShopPromo } from "@/components/dashboard/SidebarShopPromo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNotifications } from "@/hooks/use-notifications";
import { usePurchases } from "@/hooks/use-purchases";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

/** Light chrome (no `html.dark`) — dark mark on light sidebar */
const LOGO_FOR_LIGHT_UI =
  "https://res.cloudinary.com/drrluhcad/image/upload/v1785428482/Fourlabs_White-01_t9pt0w.png";
/** Dark chrome — light mark on dark sidebar (do not pick via useTheme; `resolvedTheme` is undefined on first paint) */
const LOGO_FOR_DARK_UI =
  "https://res.cloudinary.com/drrluhcad/image/upload/v1785428482/Fourlabs_Black-01_z2ommb.png";

function getInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
}

const DASHBOARD_ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/purchases": "Purchases",
  "/dashboard/notifications": "Notifications",
  "/dashboard/account": "Account",
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

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/purchases", label: "Purchases", icon: Download },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/account", label: "Account", icon: Settings },
];

const SIDEBAR_COLLAPSED_KEY = "fourwaymedia-dashboard-sidebar-collapsed";

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { unreadCount: unreadNotificationCount, reload: reloadNotifications } =
    useNotifications();
  const { downloads, isLoading: purchasesLoading } = usePurchases();
  const hasPurchases = !purchasesLoading && downloads.length > 0;
  const displayName = user?.displayName ?? "Account";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (stored === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore persisted sidebar preference
      setSidebarCollapsed(true);
    }
  }, []);

  const handleLogout = () => {
    void signOut().then(() => router.push("/sign-in"));
  };

  function toggleSidebarCollapsed() {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      return next;
    });
  }

  useEffect(() => {
    void reloadNotifications();
  }, [pathname, reloadNotifications]);

  useEffect(() => {
    const onNotificationsUpdated = () => {
      void reloadNotifications();
    };
    window.addEventListener("notifications-updated", onNotificationsUpdated);
    return () => {
      window.removeEventListener("notifications-updated", onNotificationsUpdated);
    };
  }, [reloadNotifications]);

  const linkClass = (href: string, collapsed = false) => {
    const active =
      pathname === href ||
      (href !== "/dashboard" && pathname.startsWith(`${href}/`));
    return cn(
      "flex items-center rounded-lg text-sm font-medium transition-colors",
      collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2",
      active
        ? "bg-zinc-200/90 text-zinc-900 dark:bg-white/[0.08] dark:text-white dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100",
    );
  };

  // const pageTitle = getDashboardPageTitle(pathname);
  const userInitials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 md:h-screen md:overflow-hidden">
      <div className="flex min-h-screen flex-col md:h-full md:min-h-0 md:flex-row">
        <aside
          className={cn(
            "flex min-h-0 shrink-0 flex-col border-b border-zinc-200 bg-white transition-[width] duration-200 md:h-full md:overflow-hidden md:border-b-0 md:border-r dark:border-zinc-800 dark:bg-zinc-950",
            sidebarCollapsed ? "md:w-18" : "md:w-68",
          )}
        >
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col gap-4 px-4 md:h-full md:overflow-y-auto md:py-5",
              sidebarCollapsed && "md:px-2",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between gap-2",
                sidebarCollapsed && "md:justify-center",
              )}
            >
              <Link
                href="/"
                aria-label="Fourlabs Studio home"
                className={cn("min-w-0 shrink", sidebarCollapsed && "md:hidden")}
              >
                <img
                  src={LOGO_FOR_LIGHT_UI}
                  alt="Fourlabs Studio logo"
                  className="h-20 w-20 object-cover md:h-11 md:w-11 dark:hidden"
                />
                <img
                  src={LOGO_FOR_DARK_UI}
                  alt="Fourlabs Studio logo"
                  className="hidden h-20 w-20 object-cover md:h-11 md:w-11 dark:block"
                />
              </Link>
              <div className="flex shrink-0 items-center gap-2 md:gap-3">
                <div className="flex items-center gap-2 md:hidden">
                  <ThemeToggle />
                  <MobileProfileMenu
                    displayName={displayName}
                    userInitials={userInitials}
                    unreadNotificationCount={unreadNotificationCount}
                    hasPurchases={hasPurchases}
                    onLogout={handleLogout}
                    linkClass={(href) => linkClass(href, false)}
                    navItems={navItems}
                  />
                </div>
                <button
                  type="button"
                  className="hidden h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-800 transition-colors hover:bg-zinc-100 md:inline-flex dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
                  aria-expanded={!sidebarCollapsed}
                  aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  onClick={toggleSidebarCollapsed}
                >
                  {sidebarCollapsed ? (
                    <PanelLeftOpen size={18} aria-hidden />
                  ) : (
                    <PanelLeftClose size={18} aria-hidden />
                  )}
                </button>
              </div>
            </div>
            <nav
              className="hidden min-h-0 flex-1 flex-col md:flex"
              aria-label="Dashboard"
            >
              <div className="flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <SidebarNavLink
                    key={item.href}
                    item={item}
                    collapsed={sidebarCollapsed}
                    unreadNotificationCount={unreadNotificationCount}
                    className={cn(linkClass(item.href, sidebarCollapsed), !sidebarCollapsed && "w-full")}
                  />
                ))}
              </div>
              {hasPurchases ? (
                <div className={cn("mt-3", sidebarCollapsed && "px-0")}>
                  <SidebarShopPromo collapsed={sidebarCollapsed} />
                </div>
              ) : null}
              <SidebarMenuFooter
                onLogout={handleLogout}
                pinToBottom
                collapsed={sidebarCollapsed}
              />
            </nav>
          </div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-white text-zinc-950 dark:bg-zinc-900/70 dark:text-zinc-50 md:overflow-y-auto">
          <header className="sticky top-0 z-30 items-center justify-end border-b border-zinc-200 bg-white/90 px-4 md:py-3 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95 dark:shadow-[0_1px_0_0_rgba(0,0,0,0.35)] md:px-8 hidden md:flex">

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/dashboard/account"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] text-xs font-semibold text-white md:h-9 md:w-9 md:text-sm"
                aria-label={`Account settings (${displayName})`}
                title={displayName}
              >
                {userInitials}
              </Link>
            </div>
          </header>
          <div className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
