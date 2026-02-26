import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution.
 * Uses clsx for conditional classes + tailwind-merge for deduplication.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a price in FCFA.
 * Example: formatPrice(2500) => "2 500 FCFA"
 */
export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} FCFA`;
}

/**
 * Format a date in French locale.
 * Example: formatDate(new Date()) => "26 fevrier 2026"
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  });
}

/**
 * Format a relative date.
 * Example: formatRelativeDate(new Date(Date.now() - 3600000)) => "il y a 1 heure"
 */
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "a l'instant";
  if (diffMinutes < 60)
    return `il y a ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
  if (diffHours < 24)
    return `il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
  if (diffDays < 30)
    return `il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;

  return formatDate(d);
}

/**
 * Generate a payment reference.
 * Format: KWT-{timestamp}-{random9}
 */
export function generatePaymentReference(): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.random().toString(36).substring(2, 11).toUpperCase();
  return `KWT-${timestamp}-${random}`;
}

/**
 * Mask a WhatsApp number for non-premium users.
 * Example: maskWhatsApp("+236 74 14 34 34") => "+236 74 ** ** **"
 */
export function maskWhatsApp(number: string): string {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 8) return "** ** ** **";
  const prefix = digits.slice(0, 5);
  return `+${prefix.slice(0, 3)} ${prefix.slice(3, 5)} ** ** **`;
}

/**
 * Slugify a string for URL-friendly format.
 * Example: slugify("Aide menagere") => "aide-menagere"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Check if code is running on the server.
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Delay execution (for loading states, debouncing).
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
