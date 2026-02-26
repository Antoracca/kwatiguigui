"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/lib/utils";

const avatarSizes = {
  xs: "h-6 w-6 text-body-xs",
  sm: "h-8 w-8 text-body-xs",
  md: "h-10 w-10 text-body-sm",
  lg: "h-12 w-12 text-body-md",
  xl: "h-16 w-16 text-heading-sm",
} as const;

// ---------------------------------------------------------------------------
// Avatar root
// ---------------------------------------------------------------------------
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    size?: keyof typeof avatarSizes;
  }
>(({ className, size = "md", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      avatarSizes[size],
      className,
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

// ---------------------------------------------------------------------------
// Avatar image
// ---------------------------------------------------------------------------
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

// ---------------------------------------------------------------------------
// Avatar fallback (initials)
// ---------------------------------------------------------------------------
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-primary-100 font-heading font-semibold text-primary-700",
      "dark:bg-primary-900 dark:text-primary-300",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

/**
 * Get initials from a name string.
 * Example: getInitials("Jean Pierre") => "JP"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export { Avatar, AvatarImage, AvatarFallback };
