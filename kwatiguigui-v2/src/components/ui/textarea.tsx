import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      showCount = false,
      maxLength,
      id,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const textareaId = id ?? React.useId();
    const [charCount, setCharCount] = React.useState(
      typeof value === "string" ? value.length : 0,
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={cn(
            "flex min-h-[100px] w-full resize-y rounded-lg border px-4 py-3",
            "bg-white text-body-md text-neutral-900 placeholder:text-neutral-400",
            "transition-all duration-200",
            "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100",
            "dark:placeholder:text-neutral-500",
            error
              ? "border-error-500 focus:ring-error-500/20"
              : "border-neutral-300",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />

        <div className="flex items-start justify-between gap-2">
          <div>
            {error && (
              <p
                id={`${textareaId}-error`}
                className="text-body-xs text-error-500"
                role="alert"
              >
                {error}
              </p>
            )}
            {helperText && !error && (
              <p
                id={`${textareaId}-helper`}
                className="text-body-xs text-neutral-500"
              >
                {helperText}
              </p>
            )}
          </div>
          {(showCount || maxLength) && (
            <p
              className={cn(
                "shrink-0 text-body-xs",
                maxLength && charCount >= maxLength * 0.9
                  ? "text-warning-600"
                  : "text-neutral-400",
              )}
            >
              {charCount}
              {maxLength ? `/${maxLength}` : ""}
            </p>
          )}
        </div>
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
