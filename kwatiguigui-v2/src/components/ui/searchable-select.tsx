"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check, ChevronDown, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Option {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    icon?: React.ReactNode;
    className?: string;
    name?: string;
    label?: string;
    error?: string;
    required?: boolean;
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = "Sélectionner une option",
    searchPlaceholder = "Rechercher...",
    icon,
    className,
    name,
    label,
    error,
    required,
}: SearchableSelectProps) {
    const id = React.useId();
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [internalValue, setInternalValue] = React.useState(value || "");
    const activeValue = value !== undefined ? value : internalValue;

    const filteredOptions = React.useMemo(() => {
        if (!searchQuery) return options;
        return options.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [options, searchQuery]);

    const handleSelect = (currentValue: string) => {
        const newValue = currentValue === activeValue ? "" : currentValue;
        setInternalValue(newValue);
        onChange?.(newValue);
        setOpen(false);
        setSearchQuery("");
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setInternalValue("");
        onChange?.("");
        setSearchQuery("");
    };

    // Focus the search input when popover opens
    React.useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    const selectedLabel = options.find((opt) => opt.value === activeValue)?.label;
    const hasError = Boolean(error);

    return (
        <div className="space-y-1.5">
            {label && (
                <label htmlFor={id} className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label} {required && <span className="text-error-500">*</span>}
                </label>
            )}

            <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
                <PopoverPrimitive.Trigger asChild>
                    <button
                        id={id}
                        type="button"
                        className={cn(
                            "group flex h-12 w-full items-center justify-between gap-2 rounded-xl border px-3 text-body-sm shadow-sm transition-all",
                            "focus:outline-none focus-visible:ring-2",
                            hasError
                                ? "border-error-400 bg-error-50/30 focus-visible:border-error-500 focus-visible:ring-error-500/20 dark:bg-error-950/10"
                                : "border-neutral-200 bg-white focus-visible:border-primary-500 focus-visible:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900",
                            open && !hasError && "border-primary-500 ring-2 ring-primary-500/20",
                            className
                        )}
                        aria-haspopup="listbox"
                        aria-expanded={open}
                    >
                        <div className="flex min-w-0 flex-1 items-center gap-2.5">
                            {icon && (
                                <span className={cn(
                                    "shrink-0 transition-colors",
                                    activeValue ? "text-primary-500" : "text-neutral-400",
                                    hasError && "text-error-400"
                                )}>
                                    {icon}
                                </span>
                            )}
                            <span className={cn(
                                "truncate",
                                activeValue ? "text-neutral-900 dark:text-neutral-100 font-medium" : "text-neutral-400 dark:text-neutral-500"
                            )}>
                                {selectedLabel || placeholder}
                            </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                            {activeValue && (
                                <span
                                    role="button"
                                    tabIndex={-1}
                                    onClick={handleClear}
                                    className="flex h-5 w-5 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
                                >
                                    <X size={12} />
                                </span>
                            )}
                            <ChevronDown
                                size={16}
                                className={cn(
                                    "text-neutral-400 transition-transform duration-200",
                                    open && "rotate-180"
                                )}
                            />
                        </div>
                    </button>
                </PopoverPrimitive.Trigger>

                <PopoverPrimitive.Portal>
                    <PopoverPrimitive.Content
                        align="start"
                        sideOffset={6}
                        className={cn(
                            "z-50 w-[var(--radix-popover-trigger-width)] min-w-[220px] overflow-hidden",
                            "rounded-2xl border border-neutral-100 bg-white shadow-2xl shadow-neutral-900/10",
                            "dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/40",
                            "data-[state=open]:animate-in data-[state=closed]:animate-out",
                            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                        )}
                    >
                        {/* Search bar */}
                        <div className="flex items-center gap-2 border-b border-neutral-100 px-3 dark:border-neutral-800">
                            <Search size={14} className="shrink-0 text-neutral-400" />
                            <input
                                ref={inputRef}
                                className="flex h-10 w-full bg-transparent text-body-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="shrink-0 text-neutral-400 hover:text-neutral-600"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Options list */}
                        <div className="max-h-[260px] overflow-y-auto p-1.5" role="listbox">
                            {filteredOptions.length === 0 ? (
                                <p className="py-8 text-center text-body-xs text-neutral-400 dark:text-neutral-500">
                                    Aucun résultat pour &ldquo;{searchQuery}&rdquo;
                                </p>
                            ) : (
                                filteredOptions.map((option) => {
                                    const isSelected = activeValue === option.value;
                                    return (
                                        <div
                                            key={option.value}
                                            role="option"
                                            aria-selected={isSelected}
                                            onClick={() => handleSelect(option.value)}
                                            className={cn(
                                                "flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-body-sm outline-none transition-colors select-none",
                                                isSelected
                                                    ? "bg-primary-50 text-primary-800 font-semibold dark:bg-primary-900/30 dark:text-primary-200"
                                                    : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                                                isSelected
                                                    ? "border-primary-500 bg-primary-500"
                                                    : "border-neutral-300 dark:border-neutral-600"
                                            )}>
                                                {isSelected && <Check size={10} className="text-white" strokeWidth={3} />}
                                            </div>
                                            {option.label}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </PopoverPrimitive.Content>
                </PopoverPrimitive.Portal>

                {name && <input type="hidden" name={name} value={activeValue} />}
            </PopoverPrimitive.Root>

            {error && (
                <p className="flex items-center gap-1.5 text-body-xs text-error-600 dark:text-error-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-error-500 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}
