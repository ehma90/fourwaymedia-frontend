import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarMenuFooterProps = {
  onLogout: () => void;
  onAfterNavigate?: () => void;
  pinToBottom?: boolean;
  collapsed?: boolean;
};

export function SidebarMenuFooter({
  onLogout,
  onAfterNavigate,
  pinToBottom,
  collapsed = false,
}: SidebarMenuFooterProps) {
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
