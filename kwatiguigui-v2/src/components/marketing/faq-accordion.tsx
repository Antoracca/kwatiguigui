"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={[
              "overflow-hidden rounded-2xl border transition-all duration-200",
              isOpen
                ? "border-primary-200 shadow-sm dark:border-primary-800"
                : "border-neutral-200 dark:border-neutral-700",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left dark:bg-neutral-900"
              aria-expanded={isOpen}
            >
              <span
                className={[
                  "font-heading text-fluid-base font-semibold transition-colors",
                  isOpen
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-neutral-900 dark:text-neutral-100",
                ].join(" ")}
              >
                {item.question}
              </span>
              <ChevronDown
                className={[
                  "h-5 w-5 shrink-0 transition-transform duration-200",
                  isOpen
                    ? "rotate-180 text-primary-500"
                    : "text-neutral-400",
                ].join(" ")}
              />
            </button>

            <div
              className={[
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
              role="region"
            >
              <p className="border-t border-neutral-100 bg-neutral-50 px-5 py-4 text-fluid-base leading-relaxed text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
