import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type SidebarNavLinkProps = {
  item: NavItem;
  collapsed: boolean;
  unreadNotificationCount: number;
  className: string;
  onNavigate?: () => void;
};

export function SidebarNavLink({
  item,
  collapsed,
  unreadNotificationCount,
  className,
  onNavigate,
}: SidebarNavLinkProps) {
  const Icon = item.icon;
  const showBadge =
    item.href === "/dashboard/notifications" && unreadNotificationCount > 0;
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
