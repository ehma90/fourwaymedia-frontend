import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/40 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] text-white shadow-[0_10px_22px_rgba(220,68,55,0.25)] hover:brightness-110 dark:shadow-[0_10px_26px_rgba(220,68,55,0.15)]",
        outline:
          "border border-transparent bg-[linear-gradient(var(--surface),var(--surface))_padding-box,linear-gradient(120deg,#DC4437,#FEC107)_border-box] text-foreground hover:brightness-110",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
