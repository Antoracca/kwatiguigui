"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-heading font-semibold text-body-sm",
    "whitespace-nowrap transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-500 text-white",
          "hover:bg-primary-600 hover:shadow-md",
          "active:bg-primary-700",
        ],
        secondary: [
          "bg-secondary-500 text-white",
          "hover:bg-secondary-600 hover:shadow-md",
          "active:bg-secondary-700",
        ],
        accent: [
          "bg-accent-500 text-accent-950",
          "hover:bg-accent-600 hover:shadow-md",
          "active:bg-accent-700",
        ],
        outline: [
          "border-2 border-primary-500 text-primary-500 bg-transparent",
          "hover:bg-primary-50 hover:shadow-sm",
          "active:bg-primary-100",
          "dark:border-primary-400 dark:text-primary-400",
          "dark:hover:bg-primary-950",
        ],
        ghost: [
          "text-neutral-700 bg-transparent",
          "hover:bg-neutral-100 hover:text-neutral-900",
          "dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        ],
        destructive: [
          "bg-error-500 text-white",
          "hover:bg-error-600 hover:shadow-md",
          "active:bg-error-700",
        ],
        link: [
          "text-primary-500 underline-offset-4 bg-transparent",
          "hover:underline hover:text-primary-600",
          "dark:text-primary-400 dark:hover:text-primary-300",
        ],
      },
      size: {
        sm: "h-9 px-4 text-body-xs rounded-full",
        md: "h-11 px-6 text-body-sm rounded-full",
        lg: "h-13 px-8 text-body-md rounded-full",
        xl: "h-14 px-10 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            <span>Chargement...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
