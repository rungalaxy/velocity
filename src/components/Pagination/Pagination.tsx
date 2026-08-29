import * as React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../icons";

// ── Types ──────────────────────────────────────────────────────────────────

export type PaginationSize = "sm" | "md" | "lg";

export interface PaginationProps {
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Called when the user selects a different page */
  onPageChange?: (page: number) => void;
  /** Size of the pagination controls */
  size?: PaginationSize;
  /** Number of sibling pages shown around the current page */
  siblingCount?: number;
  /** Pass children to compose manually; omit to auto-generate page items */
  children?: React.ReactNode;
  /** Additional CSS classes applied to the `<nav>` element */
  className?: string;
}

export interface PaginationContentProps {
  /** Pagination items */
  children?: React.ReactNode;
  /** Additional CSS classes applied to the `<ul>` element */
  className?: string;
}

export interface PaginationItemProps {
  /** Page number this item represents */
  page: number;
  /** Whether this item is the currently active page */
  isActive?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Called when this item is clicked */
  onClick?: (page: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Item content (defaults to the page number) */
  children?: React.ReactNode;
}

export interface PaginationPreviousProps {
  /** Whether the previous button is disabled */
  disabled?: boolean;
  /** Called when clicked */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Button label (defaults to "Previous") */
  children?: React.ReactNode;
}

export interface PaginationNextProps {
  /** Whether the next button is disabled */
  disabled?: boolean;
  /** Called when clicked */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Button label (defaults to "Next") */
  children?: React.ReactNode;
}

export interface PaginationEllipsisProps {
  /** Additional CSS classes */
  className?: string;
}

// ── Context ────────────────────────────────────────────────────────────────

interface PaginationContextValue {
  size: PaginationSize;
}

const PaginationContext = React.createContext<PaginationContextValue>({
  size: "md",
});

function usePaginationContext() {
  return React.useContext(PaginationContext);
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<
  PaginationSize,
  { item: string; gap: string; icon: string }
> = {
  sm: {
    item: "h-8 min-w-8 px-2 text-xs rounded-full",
    gap: "gap-1",
    icon: "h-3.5 w-3.5",
  },
  md: {
    item: "h-9 min-w-9 px-3 text-sm rounded-full",
    gap: "gap-1.5",
    icon: "h-4 w-4",
  },
  lg: {
    item: "h-11 min-w-11 px-4 text-base rounded-full",
    gap: "gap-2",
    icon: "h-5 w-5",
  },
};

const focusClasses = [
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-border-focus focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background-primary",
].join(" ");

// ── Helpers ────────────────────────────────────────────────────────────────

const ELLIPSIS = "ellipsis" as const;

type PageItem = number | typeof ELLIPSIS;

function buildPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageItem[] {
  const totalSlots = siblingCount * 2 + 5; // siblings + current + 2 boundaries + 2 ellipses

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = siblingCount * 2 + 3;
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, ELLIPSIS, totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = siblingCount * 2 + 3;
    const rightRange = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + i + 1,
    );
    return [1, ELLIPSIS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, ELLIPSIS, ...middleRange, ELLIPSIS, totalPages];
}

// ── PaginationContent ──────────────────────────────────────────────────────

export function PaginationContent({
  children,
  className,
}: PaginationContentProps) {
  const { size } = usePaginationContext();

  return (
    <ul
      className={[
        "flex items-center list-none m-0 p-0",
        sizeClasses[size].gap,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </ul>
  );
}

PaginationContent.displayName = "PaginationContent";

// ── PaginationItem ─────────────────────────────────────────────────────────

export function PaginationItem({
  page,
  isActive = false,
  disabled = false,
  onClick,
  className,
  children,
}: PaginationItemProps) {
  const { size } = usePaginationContext();

  return (
    <li>
      <button
        type="button"
        disabled={disabled}
        aria-current={isActive ? "page" : undefined}
        onClick={() => onClick?.(page)}
        className={[
          "inline-flex items-center justify-center font-medium",
          "cursor-pointer transition-colors duration-[200ms]",
          focusClasses,
          sizeClasses[size].item,
          isActive
            ? "bg-accent-primary text-content-on-brand"
            : "text-content-tertiary hover:bg-surface-hover hover:text-content-primary",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children ?? page}
      </button>
    </li>
  );
}

PaginationItem.displayName = "PaginationItem";

// ── PaginationPrevious ─────────────────────────────────────────────────────

export function PaginationPrevious({
  disabled = false,
  onClick,
  className,
  children,
}: PaginationPreviousProps) {
  const { size } = usePaginationContext();

  return (
    <li>
      <button
        type="button"
        disabled={disabled}
        aria-label="Go to previous page"
        onClick={onClick}
        className={[
          "inline-flex items-center justify-center gap-1 font-medium",
          "cursor-pointer transition-colors duration-[200ms]",
          "text-content-secondary hover:bg-surface-hover hover:text-content-primary",
          focusClasses,
          sizeClasses[size].item,
          disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <ArrowLeftIcon className={sizeClasses[size].icon} aria-hidden />
        {children ?? <span className="sr-only">Previous</span>}
      </button>
    </li>
  );
}

PaginationPrevious.displayName = "PaginationPrevious";

// ── PaginationNext ─────────────────────────────────────────────────────────

export function PaginationNext({
  disabled = false,
  onClick,
  className,
  children,
}: PaginationNextProps) {
  const { size } = usePaginationContext();

  return (
    <li>
      <button
        type="button"
        disabled={disabled}
        aria-label="Go to next page"
        onClick={onClick}
        className={[
          "inline-flex items-center justify-center gap-1 font-medium",
          "cursor-pointer transition-colors duration-[200ms]",
          "text-content-secondary hover:bg-surface-hover hover:text-content-primary",
          focusClasses,
          sizeClasses[size].item,
          disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children ?? <span className="sr-only">Next</span>}
        <ArrowRightIcon className={sizeClasses[size].icon} aria-hidden />
      </button>
    </li>
  );
}

PaginationNext.displayName = "PaginationNext";

// ── PaginationEllipsis ─────────────────────────────────────────────────────

export function PaginationEllipsis({ className }: PaginationEllipsisProps) {
  const { size } = usePaginationContext();

  return (
    <li>
      <span
        aria-hidden="true"
        className={[
          "inline-flex items-center justify-center",
          "text-content-tertiary select-none",
          sizeClasses[size].item,
          "cursor-default",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        &hellip;
      </span>
    </li>
  );
}

PaginationEllipsis.displayName = "PaginationEllipsis";

// ── Pagination (root) ──────────────────────────────────────────────────────

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  size = "md",
  siblingCount = 1,
  children,
  className,
}: PaginationProps) {
  const ctx = React.useMemo<PaginationContextValue>(() => ({ size }), [size]);
  const pages = buildPageRange(currentPage, totalPages, siblingCount);

  return (
    <PaginationContext.Provider value={ctx}>
      <nav
        aria-label="Pagination"
        className={["inline-flex", className].filter(Boolean).join(" ")}
      >
        {children ?? (
          <PaginationContent>
            <PaginationPrevious
              disabled={currentPage <= 1}
              onClick={() => onPageChange?.(currentPage - 1)}
            />
            {pages.map((item, index) =>
              item === ELLIPSIS ? (
                <PaginationEllipsis key={`ellipsis-${index}`} />
              ) : (
                <PaginationItem
                  key={item}
                  page={item}
                  isActive={item === currentPage}
                  onClick={(page) => onPageChange?.(page)}
                />
              ),
            )}
            <PaginationNext
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
            />
          </PaginationContent>
        )}
      </nav>
    </PaginationContext.Provider>
  );
}

Pagination.displayName = "Pagination";
