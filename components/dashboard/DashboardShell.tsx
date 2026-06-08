"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Download,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { useNotifications } from "@/hooks/use-notifications";
import { usePurchases } from "@/hooks/use-purchases";
import { useAuth } from "@/lib/auth-context";
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

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/purchases", label: "Purchases", icon: Download },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/account", label: "Account", icon: Settings },
];

const SIDEBAR_COLLAPSED_KEY = "fourwaymedia-dashboard-sidebar-collapsed";
const NOTIFICATIONS_HREF = "/dashboard/notifications";

type DashboardShellProps = {
  children: React.ReactNode;
};

function SidebarShopPromo({
  collapsed,
  className,
  onNavigate,
}: {
  collapsed: boolean;
  className?: string;
  onNavigate?: () => void;
}) {
  if (collapsed) {
    return (
      <Link
        href="/shop"
        title="Shop for more"
        aria-label="Shop for more templates"
        onClick={onNavigate}
        className="flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(160deg,rgba(220,68,55,0.1),rgba(254,193,7,0.12))] text-[#DC4437] transition-colors hover:bg-[linear-gradient(160deg,rgba(220,68,55,0.18),rgba(254,193,7,0.2))] dark:text-[#FEC107]"
      >
        <Sparkles size={18} aria-hidden />
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden mt-10 rounded-xl border border-[#DC4437]/15 bg-[linear-gradient(145deg,rgba(220,68,55,0.06)_0%,rgba(254,193,7,0.1)_100%)] p-3.5",
        "dark:border-[#FEC107]/20 dark:bg-[linear-gradient(145deg,rgba(220,68,55,0.14)_0%,rgba(254,193,7,0.07)_55%,transparent_100%)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[linear-gradient(160deg,#DC4437,#FEC107)] opacity-[0.2] blur-2xl dark:opacity-30"
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(160deg,#DC4437,#FEC107)] text-white shadow-sm">
            <Sparkles size={14} aria-hidden />
          </span>
          <p className="text-sm font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
            Grow your library
          </p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Fresh templates added regularly. Find your next project.
        </p>
        <Link
          href="/shop"
          onClick={onNavigate}
          className={cn(
            buttonVariants({ variant: "primary", size: "sm" }),
            "mt-3 h-9 w-full rounded-lg text-xs font-semibold",
          )}
        >
          Shop for more
        </Link>
      </div>
    </div>
  );
}

function SidebarMenuFooter({
  onLogout,
  onAfterNavigate,
  pinToBottom,
  collapsed = false,
}: {
  onLogout: () => void;
  onAfterNavigate?: () => void;
  /** When true, push this block to the bottom of a flex sidebar (desktop). */
  pinToBottom?: boolean;
  collapsed?: boolean;
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
        title={collapsed ? "Log out" : undefined}
        aria-label={collapsed ? "Log out" : undefined}
        className={cn(
          "flex w-full items-center rounded-lg text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-700 dark:text-zinc-400 dark:hover:bg-red-500/15 dark:hover:text-red-300 cursor-pointer",
          collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2",
        )}
      >
        <LogOut size={18} className="shrink-0 opacity-90" aria-hidden />
        {!collapsed ? "Log out" : null}
      </button>
    </div>
  );
}

function MobileProfileMenu({
  displayName,
  userInitials,
  unreadNotificationCount,
  hasPurchases,
  onLogout,
  linkClass,
}: {
  displayName: string;
  userInitials: string;
  unreadNotificationCount: number;
  hasPurchases: boolean;
  onLogout: () => void;
  linkClass: (href: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={`dashboard-mobile-menu-trigger-${menuId}`}
        aria-label={`Account menu (${displayName})`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? `dashboard-mobile-menu-${menuId}` : undefined}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-2 text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] text-xs font-semibold text-white"
          aria-hidden
        >
          {userInitials}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 opacity-80 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={`dashboard-mobile-menu-${menuId}`}
          role="menu"
          aria-labelledby={`dashboard-mobile-menu-trigger-${menuId}`}
          className="absolute right-0 z-50 mt-2 w-64 max-h-[min(70vh,calc(100vh-5.5rem))] overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1.5 shadow-xl shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40"
        >
          <p className="border-b border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            {displayName}
          </p>
          <nav className="flex flex-col px-1 py-1" aria-label="Dashboard">
            {navItems.map((item) => (
              <SidebarNavLink
                key={item.href}
                item={item}
                collapsed={false}
                unreadNotificationCount={unreadNotificationCount}
                className={cn(linkClass(item.href), "w-full")}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
          {hasPurchases ? (
            <div className="border-t border-zinc-200 px-2 py-2 dark:border-zinc-800">
              <SidebarShopPromo
                collapsed={false}
                className="mt-0"
                onNavigate={() => setOpen(false)}
              />
            </div>
          ) : null}
          <div className="border-t border-zinc-200 px-1 py-1 dark:border-zinc-800">
            <button
              type="button"
              role="menuitem"
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
            >
              <LogOut size={18} className="shrink-0 opacity-90" aria-hidden />
              Log out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SidebarNavLink({
  item,
  collapsed,
  unreadNotificationCount,
  className,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  unreadNotificationCount: number;
  className: string;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const showBadge = item.href === NOTIFICATIONS_HREF && unreadNotificationCount > 0;
  const badgeLabel =
    unreadNotificationCount > 99 ? "99+" : String(unreadNotificationCount);

  return (
    <Link
      href={item.href}
      className={className}
      onClick={onNavigate}
      title={
        collapsed
          ? showBadge
            ? `${item.label} (${badgeLabel} unread)`
            : item.label
          : undefined
      }
      aria-label={
        collapsed
          ? showBadge
            ? `${item.label}, ${badgeLabel} unread`
            : item.label
          : undefined
      }
    >
      <span className="relative shrink-0">
        <Icon size={18} className="opacity-90" aria-hidden />
        {collapsed && showBadge ? (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[linear-gradient(160deg,#DC4437,#FEC107)] px-1 text-[10px] font-bold leading-none text-white">
            {badgeLabel}
          </span>
        ) : null}
      </span>
      {!collapsed ? (
        <>
          <span className="min-w-0 flex-1">{item.label}</span>
          {showBadge ? (
            <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#DC4437,#FEC107)] px-1.5 text-[11px] font-semibold tabular-nums text-white">
              {badgeLabel}
            </span>
          ) : null}
        </>
      ) : null}
    </Link>
  );
}

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
                aria-label="Fourwaymedia home"
                className={cn("min-w-0 shrink", sidebarCollapsed && "md:hidden")}
              >
                <img
                  src={LOGO_FOR_LIGHT_UI}
                  alt="Fourwaymedia logo"
                  className="h-20 w-20 object-cover md:h-11 md:w-11 dark:hidden"
                />
                <img
                  src={LOGO_FOR_DARK_UI}
                  alt="Fourwaymedia logo"
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
