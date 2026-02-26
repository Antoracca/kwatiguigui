import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1",
    "rounded-full px-3 py-1",
    "font-heading text-body-xs font-medium",
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-neutral-100 text-neutral-700",
          "dark:bg-neutral-800 dark:text-neutral-300",
        ],
        primary: [
          "bg-primary-50 text-primary-700",
          "dark:bg-primary-950 dark:text-primary-300",
        ],
        secondary: [
          "bg-secondary-50 text-secondary-700",
          "dark:bg-secondary-950 dark:text-secondary-300",
        ],
        accent: [
          "bg-accent-50 text-accent-700",
          "dark:bg-accent-950 dark:text-accent-300",
        ],
        success: [
          "bg-success-50 text-success-700",
          "dark:bg-green-950 dark:text-green-300",
        ],
        warning: [
          "bg-warning-50 text-warning-700",
          "dark:bg-amber-950 dark:text-amber-300",
        ],
        error: [
          "bg-error-50 text-error-700",
          "dark:bg-red-950 dark:text-red-300",
        ],
        premium: [
          "bg-gradient-to-r from-accent-500 to-accent-400 text-accent-950",
          "font-semibold shadow-sm",
        ],
        outline: [
          "border border-neutral-300 text-neutral-600 bg-transparent",
          "dark:border-neutral-700 dark:text-neutral-400",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
