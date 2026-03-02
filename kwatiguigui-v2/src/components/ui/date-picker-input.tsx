"use client";

import { useMemo, useId } from "react";
import { CalendarDays } from "lucide-react";

interface DatePickerInputProps {
    label?: string;
    value: string; // ISO format: "YYYY-MM-DD"
    onChange: (value: string) => void;
    max?: string; // ISO format: "YYYY-MM-DD"
    error?: string;
    required?: boolean;
}

const MONTHS = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

export function DatePickerInput({
    label,
    value,
    onChange,
    max,
    error,
    required,
}: DatePickerInputProps) {
    const id = useId();
    const maxYear = max ? parseInt(max.split("-")[0] ?? "9999") : new Date().getFullYear();

    const [yearStr, monthStr, dayStr] = value ? value.split("-") : ["", "", ""];
    const year = yearStr ? parseInt(yearStr) : 0;
    const month = monthStr ? parseInt(monthStr) : 0;
    const day = dayStr ? parseInt(dayStr) : 0;

    const daysInMonth = useMemo(() => {
        if (!year || !month) return 31;
        return new Date(year, month, 0).getDate();
    }, [year, month]);

    const emit = (newYear: string, newMonth: string, newDay: string) => {
        const y = newYear;
        const m = newMonth ? newMonth.padStart(2, "0") : "";
        const d = newDay ? newDay.padStart(2, "0") : "";

        if (y && m && d) {
            // Clamp to max
            const iso = `${y}-${m}-${d}`;
            if (max && iso > max) {
                onChange(max);
            } else {
                onChange(iso);
            }
        } else {
            // partial — just emit what we have
            onChange(`${y}-${m}-${d}`);
        }
    };

    const handleDay = (val: string) => emit(yearStr || "", monthStr || "", val);
    const handleMonth = (val: string) => emit(yearStr || "", val, dayStr || "");
    const handleYear = (val: string) => {
        // Allow typing up to 4 digits
        if (val.length > 4) return;
        emit(val, monthStr || "", dayStr || "");
    };

    const selectClass = (filled: boolean) =>
        `h-full flex-1 min-w-0 appearance-none bg-transparent text-center text-body-sm font-medium outline-none cursor-pointer transition-colors ${filled ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}`;

    const hasError = Boolean(error);

    return (
        <div className="space-y-1.5">
            {label && (
                <label htmlFor={id} className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label} {required && <span className="text-error-500">*</span>}
                </label>
            )}

            <div
                className={`group flex h-12 items-center gap-1 rounded-xl border px-3 shadow-sm transition-all focus-within:ring-2 ${hasError
                    ? "border-error-400 bg-error-50/30 focus-within:border-error-500 focus-within:ring-error-500/20 dark:bg-error-950/10"
                    : "border-neutral-200 bg-white focus-within:border-primary-500 focus-within:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900"
                    }`}
            >
                <CalendarDays
                    size={17}
                    className={`shrink-0 transition-colors ${hasError ? "text-error-400" : "text-neutral-400 group-focus-within:text-primary-500"}`}
                />

                <div className="flex flex-1 items-center gap-0.5">
                    {/* Day */}
                    <select
                        id={id}
                        value={day || ""}
                        onChange={(e) => handleDay(e.target.value)}
                        className={selectClass(Boolean(day))}
                        aria-label="Jour"
                    >
                        <option value="">JJ</option>
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                            <option key={d} value={d}>{String(d).padStart(2, "0")}</option>
                        ))}
                    </select>

                    <span className="text-neutral-300 dark:text-neutral-600 select-none text-body-sm">/</span>

                    {/* Month */}
                    <select
                        value={month || ""}
                        onChange={(e) => handleMonth(e.target.value)}
                        className={selectClass(Boolean(month))}
                        aria-label="Mois"
                    >
                        <option value="">MM</option>
                        {MONTHS.map((name, i) => (
                            <option key={i + 1} value={i + 1}>{name}</option>
                        ))}
                    </select>

                    <span className="text-neutral-300 dark:text-neutral-600 select-none text-body-sm">/</span>

                    {/* Year — manual input */}
                    <input
                        type="number"
                        value={year || ""}
                        onChange={(e) => handleYear(e.target.value)}
                        placeholder="AAAA"
                        min={1920}
                        max={maxYear}
                        aria-label="Année"
                        inputMode="numeric"
                        className={`h-full w-16 flex-none appearance-none bg-transparent text-center text-body-sm font-medium outline-none transition-colors [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${year ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}`}
                    />
                </div>
            </div>

            {error && (
                <p className="flex items-center gap-1.5 text-body-xs text-error-600 dark:text-error-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-error-500 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}
