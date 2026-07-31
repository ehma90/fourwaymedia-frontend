import { ChevronDown, LogOut } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { SidebarNavLink } from "@/components/dashboard/SidebarNavLink";
import { SidebarShopPromo } from "@/components/dashboard/SidebarShopPromo";
import { cn } from "@/lib/utils";

type MobileProfileMenuProps = {
  displayName: string;
  userInitials: string;
  unreadNotificationCount: number;
  hasPurchases: boolean;
  onLogout: () => void;
  linkClass: (href: string) => string;
  navItems: Array<{
    href: string;
    label: string;
    icon: typeof import("lucide-react").LayoutDashboard;
  }>;
};

export function MobileProfileMenu({
  displayName,
  userInitials,
  unreadNotificationCount,
  hasPurchases,
  onLogout,
  linkClass,
  navItems,
}: MobileProfileMenuProps) {
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
