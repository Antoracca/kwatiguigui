import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
} as const;

function Spinner({ size = "md", label, className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label ?? "Chargement en cours"}
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      <Loader2
        className={cn("animate-spin text-primary-500", sizeMap[size])}
      />
      {label && (
        <span className="text-body-sm text-neutral-500">{label}</span>
      )}
      <span className="sr-only">{label ?? "Chargement en cours"}</span>
    </div>
  );
}

export { Spinner };
