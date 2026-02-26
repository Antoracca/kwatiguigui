import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Pagination root
// ---------------------------------------------------------------------------
function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />;
}

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------
type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & React.ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  disabled,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-9 min-w-[36px] items-center justify-center rounded-full px-3",
        "text-body-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary-500 text-white shadow-sm"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
        "dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Previous / Next
// ---------------------------------------------------------------------------
function PaginationPrevious({
  className,
  href,
  disabled,
}: {
  className?: string;
  href: string;
  disabled?: boolean;
}) {
  return (
    <PaginationItem>
      <PaginationLink
        href={href}
        disabled={disabled}
        className={cn("gap-1 pl-3 pr-4", className)}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Precedent</span>
      </PaginationLink>
    </PaginationItem>
  );
}

function PaginationNext({
  className,
  href,
  disabled,
}: {
  className?: string;
  href: string;
  disabled?: boolean;
}) {
  return (
    <PaginationItem>
      <PaginationLink
        href={href}
        disabled={disabled}
        className={cn("gap-1 pl-4 pr-3", className)}
      >
        <span>Suivant</span>
        <ChevronRight className="h-4 w-4" />
      </PaginationLink>
    </PaginationItem>
  );
}

function PaginationEllipsis({ className }: { className?: string }) {
  return (
    <PaginationItem>
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center text-neutral-400",
          className,
        )}
        aria-hidden
      >
        <MoreHorizontal className="h-4 w-4" />
      </span>
    </PaginationItem>
  );
}

// ---------------------------------------------------------------------------
// Complete pagination component with logic
// ---------------------------------------------------------------------------
interface PaginationWithLinksProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  pageParam?: string;
  className?: string;
}

export function PaginationWithLinks({
  currentPage,
  totalPages,
  baseUrl,
  pageParam = "page",
  className,
}: PaginationWithLinksProps) {
  if (totalPages <= 1) return null;

  function getPageUrl(page: number) {
    const url = new URL(baseUrl, "https://kwatiguigui.org");
    url.searchParams.set(pageParam, String(page));
    return `${url.pathname}?${url.searchParams.toString()}`;
  }

  // Build page numbers to show
  const pages: (number | "ellipsis")[] = [];
  const SIBLINGS = 1;
  const leftSibling = Math.max(currentPage - SIBLINGS, 2);
  const rightSibling = Math.min(currentPage + SIBLINGS, totalPages - 1);

  pages.push(1);
  if (leftSibling > 2) pages.push("ellipsis");
  for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);
  if (rightSibling < totalPages - 1) pages.push("ellipsis");
  if (totalPages > 1) pages.push(totalPages);

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationPrevious
          href={getPageUrl(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        />

        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <PaginationEllipsis key={`ellipsis-${i}`} />
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={getPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationNext
          href={getPageUrl(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        />
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
