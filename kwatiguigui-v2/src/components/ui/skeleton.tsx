import * as React from "react";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

function Skeleton({
  className,
  variant = "text",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "skeleton animate-shimmer",
        variant === "text" && "h-4 w-full rounded-md",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-lg",
        className,
      )}
      style={{
        width: width ?? undefined,
        height: height ?? undefined,
        ...style,
      }}
      {...props}
    />
  );
}

// Pre-built skeleton compositions
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-4 w-1/5" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonTableRow };
