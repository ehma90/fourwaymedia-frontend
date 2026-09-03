import { cn } from "@/lib/utils";

type UserAvatarProps = {
  displayName: string;
  avatarUrl?: string | null;
  className?: string;
  imageClassName?: string;
};

function getInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
}

export function UserAvatar({
  displayName,
  avatarUrl,
  className,
  imageClassName,
}: UserAvatarProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] text-xs font-semibold text-white",
        className,
      )}
      aria-hidden={Boolean(avatarUrl)}
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- user-uploaded Cloudinary URL
        <img
          src={avatarUrl}
          alt=""
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      ) : (
        getInitials(displayName)
      )}
    </span>
  );
}
