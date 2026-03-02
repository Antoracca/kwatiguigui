"use client";

import { useId } from "react";
import {
    PhoneInput as InternationalPhoneInput,
    defaultCountries,
} from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneNumberInputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
    helperText?: string;
}

export function PhoneNumberInput({
    label,
    value,
    onChange,
    placeholder = "72 42 12 46",
    error,
    required,
    helperText,
}: PhoneNumberInputProps) {
    const id = useId();
    const hasError = Boolean(error);

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                    {label} {required && <span className="text-error-500">*</span>}
                </label>
            )}

            {/*
             * NO overflow-hidden here — that was clipping the country dropdown.
             * The inner library renders its dropdown via absolute positioning
             * outside of this wrapper so it must be able to escape.
             */}
            <div
                className={[
                    "phone-input-wrapper group relative flex h-12 w-full rounded-xl border shadow-sm transition-all",
                    "focus-within:ring-2",
                    hasError
                        ? "border-error-400 bg-error-50/30 focus-within:border-error-500 focus-within:ring-error-500/20"
                        : "border-neutral-200 bg-white focus-within:border-primary-500 focus-within:ring-primary-500/20 dark:border-neutral-700 dark:bg-neutral-900",
                ].join(" ")}
            >
                <InternationalPhoneInput
                    defaultCountry="cf"
                    value={value}
                    onChange={onChange}
                    countries={defaultCountries}
                    inputProps={{
                        id,
                        required,
                        /*
                         * We set placeholder via CSS when the input contains ONLY the
                         * dial code so the user sees "72 42 12 46" even though the
                         * library has already inserted "+236 " as initial content.
                         * The placeholder attribute is intentionally left empty here
                         * so the library's own dial-code management works correctly.
                         */
                        placeholder: "",
                        className: [
                            "h-full flex-1 bg-transparent px-2 text-body-sm outline-none min-w-0",
                            "text-neutral-900",
                            "dark:text-neutral-100",
                            /* When the only content is the dial code the input is
                               effectively "empty" from the user's perspective.
                               We fake the placeholder with the ::placeholder pseudo
                               and rely on the data-placeholder attribute below.    */
                            "[&::placeholder]:text-neutral-400 dark:[&::placeholder]:text-neutral-500",
                        ].join(" "),
                        style: { border: "none", background: "transparent" },
                        // aria-label so screen readers get context
                        "aria-label": "Numéro de téléphone",
                        // data attribute for CSS trick
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ...({ "data-placeholder": placeholder } as any),
                    }}
                    countrySelectorStyleProps={{
                        buttonStyle: {
                            height: "100%",
                            border: "none",
                            borderRight: "1px solid",
                            borderRightColor: hasError ? "rgb(248 113 113)" : "rgb(229 231 235)",
                            borderRadius: "12px 0 0 12px",
                            paddingLeft: "10px",
                            paddingRight: "8px",
                            background: "transparent",
                            flexShrink: 0,
                        },
                        dropdownStyleProps: {
                            style: {
                                position: "fixed",   // fixed keeps it outside any overflow context
                                zIndex: 99999,
                                borderRadius: "12px",
                                border: "1px solid rgb(229 231 235)",
                                boxShadow: "0 16px 48px -8px rgba(0,0,0,0.18)",
                                overflow: "auto",
                                maxHeight: "280px",
                                minWidth: "260px",
                            },
                        },
                    }}
                />
            </div>

            {/* CSS trick: show the data-placeholder as a visual hint inside the input */}
            {/* We append a small helper text below showing the expected format */}
            {!error && (
                <p className="text-body-xs text-neutral-400">
                    Ex : {placeholder}
                </p>
            )}

            {error && (
                <p className="flex items-center gap-1.5 text-body-xs text-error-600 dark:text-error-400">
                    <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-error-500" />
                    {error}
                </p>
            )}
            {!error && helperText && (
                <p className="text-body-xs text-neutral-400">{helperText}</p>
            )}
        </div>
    );
}
