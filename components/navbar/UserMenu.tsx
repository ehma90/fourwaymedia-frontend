"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Download,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { useDashboardSubscription } from "@/hooks/use-dashboard-subscription";
import {
  MOCK_USER_DISPLAY_NAME,
  useMockAuth,
} from "@/lib/mock-auth-context";
import { cn } from "@/lib/utils";

type MenuNavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

function buildDashboardMenuItems(isSubscribed: boolean): MenuNavItem[] {
  const items: MenuNavItem[] = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  ];
  if (isSubscribed) {
    items.push(
      { href: "/dashboard/downloads", label: "Downloads", icon: Download },
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
    { href: "/dashboard/settings", label: "Account", icon: Settings },
  );
  return items;
}

function getInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
}

export function UserMenu() {
  const { signOut } = useMockAuth();
  const { isSubscribed } = useDashboardSubscription();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dashboardMenuItems = buildDashboardMenuItems(isSubscribed);
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

  const handleSignOut = () => {
    setOpen(false);
    signOut();
    router.push("/");
  };

  const initials = getInitials(MOCK_USER_DISPLAY_NAME);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={`user-menu-trigger-${menuId}`}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? `user-menu-${menuId}` : undefined}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-9 cursor-pointer items-center gap-1.5 rounded-xl px-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/40 md:h-10 md:gap-2 md:px-2.5",
        )}
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] text-xs font-semibold text-white md:h-8 md:w-8 md:text-sm"
          aria-hidden
        >
          {initials}
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
          id={`user-menu-${menuId}`}
          role="menu"
          aria-labelledby={`user-menu-trigger-${menuId}`}
          className="absolute right-0 z-80 mt-2 min-w-48 rounded-xl border border-black/10 bg-background/95 py-1.5 text-foreground shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/95"
        >
          <p className="border-b border-black/10 px-3 py-2 text-xs text-foreground/70 dark:border-white/10">
            {MOCK_USER_DISPLAY_NAME}
          </p>
          {dashboardMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                role="menuitem"
                href={item.href}
                className="flex items-center gap-2 px-3 py-2.5 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <Icon size={18} className="shrink-0 opacity-90" aria-hidden />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-700 transition-colors hover:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15 cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut size={18} className="shrink-0 opacity-90" aria-hidden />
             Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
