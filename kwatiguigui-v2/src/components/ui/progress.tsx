"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
  showValue?: boolean;
  label?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, value, indicatorClassName, showValue = false, label, ...props },
    ref,
  ) => (
    <div className="w-full space-y-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-body-xs font-medium text-neutral-600 dark:text-neutral-400">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-body-xs text-neutral-500">{value ?? 0}%</span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full",
          "bg-neutral-200 dark:bg-neutral-700",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 rounded-full transition-all duration-500 ease-out",
            "bg-primary-500",
            indicatorClassName,
          )}
          style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
