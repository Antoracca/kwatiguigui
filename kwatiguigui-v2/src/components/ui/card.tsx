import * as React from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Card root
// ---------------------------------------------------------------------------
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    interactive?: boolean;
    featured?: boolean;
  }
>(({ className, interactive = false, featured = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-neutral-200 bg-white",
      "dark:border-neutral-800 dark:bg-neutral-900",
      interactive && [
        "cursor-pointer transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg hover:border-primary-200",
        "dark:hover:border-primary-800",
      ],
      featured && [
        "border-primary-200 shadow-md ring-1 ring-primary-100",
        "dark:border-primary-800 dark:ring-primary-900",
      ],
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

// ---------------------------------------------------------------------------
// Card header
// ---------------------------------------------------------------------------
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ---------------------------------------------------------------------------
// Card title
// ---------------------------------------------------------------------------
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-heading-sm text-neutral-900",
      "dark:text-neutral-100",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ---------------------------------------------------------------------------
// Card description
// ---------------------------------------------------------------------------
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ---------------------------------------------------------------------------
// Card content
// ---------------------------------------------------------------------------
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 pb-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

// ---------------------------------------------------------------------------
// Card footer
// ---------------------------------------------------------------------------
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center border-t border-neutral-100 px-6 py-4",
      "dark:border-neutral-800",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
