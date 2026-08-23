import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /** Visual color variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Render as outline (transparent fill) instead of soft tint */
  outline?: boolean;
  /** Render with full pill shape instead of default rounded-lg */
  rounded?: boolean;
  /** Badge content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────
// Soft tinted labels — structure matches:
// inline-flex items-center h-6 px-1.5 rounded-lg border text-caption leading-none capitalize label-*

const softVariantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-surface-secondary text-content-secondary border-border-default",
  success:
    "bg-surface-success text-feedback-positive border-state-success/40",
  warning:
    "bg-surface-warning text-feedback-caution border-state-warning/40",
  error: "bg-surface-error text-feedback-negative border-state-error/40",
  info: "bg-surface-info text-feedback-neutral border-state-info/40",
  brand: "bg-surface-brand-tint text-content-brand border-border-brand",
};

const outlineVariantClasses: Record<BadgeVariant, string> = {
  default: "bg-transparent text-content-secondary border-border-strong",
  success: "bg-transparent text-feedback-positive border-state-success",
  warning: "bg-transparent text-feedback-caution border-state-warning",
  error: "bg-transparent text-feedback-negative border-state-error",
  info: "bg-transparent text-feedback-neutral border-state-info",
  brand: "bg-transparent text-content-brand border-border-brand",
};

/** Default (md) matches the design: h-6 px-1.5 text-caption */
const sizeClasses: Record<BadgeSize, string> = {
  sm: "h-5 px-1 text-overline",
  md: "h-6 px-1.5 text-caption",
  lg: "h-7 px-2 text-caption",
};

// ── Component ──────────────────────────────────────────────────────────────

export function Badge({
  variant = "default",
  size = "md",
  outline = false,
  rounded = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center border leading-none capitalize whitespace-nowrap",
        rounded ? "rounded-full" : "rounded-lg",
        sizeClasses[size],
        outline
          ? outlineVariantClasses[variant]
          : softVariantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";
