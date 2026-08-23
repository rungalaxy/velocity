import * as React from "react";
import { Button } from "../Button";
import type { ButtonProps, ButtonSize } from "../Button";

// ── Types ──────────────────────────────────────────────────────────────────

export interface IconButtonProps
  extends Omit<
    ButtonProps,
    "children" | "startIcon" | "endIcon" | "fullWidth"
  > {
  /**
   * Accessible name for the control (rendered as visually hidden text).
   * Use a short action phrase, e.g. "Add to wishlist", "Close".
   */
  label: string;
  /** Icon element — keep to a single SVG or icon component */
  children: React.ReactNode;
}

// ── Size overrides (square hit target, no horizontal padding) ─────────────

const iconOnlyLayoutClasses: Record<ButtonSize, string> = {
  sm: "!gap-0 !px-0 !min-w-8 !w-8 !max-w-[2rem]",
  md: "!gap-0 !px-0 !min-w-10 !w-10 !max-w-[2.5rem]",
  lg: "!gap-0 !px-0 !h-[48px] !min-w-[48px] !w-[48px] !max-w-[48px]",
};

// ── Component ──────────────────────────────────────────────────────────────

/**
 * Icon-only button built on **Button** + Base UI. Requires `label` for screen readers.
 */
export function IconButton({
  label,
  children,
  variant = "outline",
  size = "md",
  colorScheme = "neutral",
  loading = false,
  disabled,
  focusableWhenDisabled,
  type = "button",
  onClick,
  className,
  render,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      colorScheme={colorScheme}
      loading={loading}
      disabled={disabled}
      focusableWhenDisabled={focusableWhenDisabled}
      type={type}
      onClick={onClick}
      className={[iconOnlyLayoutClasses[size], className].filter(Boolean).join(" ")}
      startIcon={children}
      render={render}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </Button>
  );
}

IconButton.displayName = "IconButton";
