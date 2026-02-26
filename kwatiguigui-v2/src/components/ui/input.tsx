import { Label } from "@radix-ui/react-label";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = id ?? React.useId();
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <Label
            htmlFor={inputId}
            className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </Label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}

          <input
            type={inputType}
            id={inputId}
            className={cn(
              "flex h-11 w-full rounded-lg border bg-white px-4 py-2",
              "text-body-md text-neutral-900 placeholder:text-neutral-400",
              "transition-all duration-200",
              "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
              "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60",
              "dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100",
              "dark:placeholder:text-neutral-500",
              "dark:focus:border-primary-400 dark:focus:ring-primary-400/20",
              leftIcon && "pl-10",
              (rightIcon || isPassword) && "pr-10",
              error
                ? "border-error-500 focus:border-error-500 focus:ring-error-500/20"
                : "border-neutral-300",
              className,
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="flex items-center gap-1 text-body-xs text-error-500"
            role="alert"
          >
            <AlertCircle size={14} />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-body-xs text-neutral-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
