"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function BackButton({ className, children = "← Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={`${className} cursor-pointer`}>
      {children}
    </button>
  );
}
