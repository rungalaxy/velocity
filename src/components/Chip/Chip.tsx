import * as React from "react";
import { Toggle } from "@base-ui-components/react/toggle";
import { CloseIcon } from "../../icons";

// ── Types ──────────────────────────────────────────────────────────────────

export type ChipVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand";

export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps {
  /** Visual color variant */
  variant?: ChipVariant;
  /** Size (padding + text) */
  size?: ChipSize;
  /** Outline style instead of filled */
  outline?: boolean;
  /** Full pill shape (default `true` for chips) */
  rounded?: boolean;
  /** Disables interaction (selectable, remove, or click) */
  disabled?: boolean;
  /** Optional icon or avatar before the label */
  startIcon?: React.ReactNode;
  /** Chip label */
  children?: React.ReactNode;
  className?: string;

  /**
   * When `true`, the chip is a **toggle** (filter / multi-select style) using
   * [Base UI Toggle](https://base-ui.com/react/components/toggle). Unselected: **outline** style;
   * selected: **solid fill** (`data-[pressed]`).
   */
  selectable?: boolean;
  /** Controlled pressed state (selectable only) */
  pressed?: boolean;
  /** Uncontrolled initial pressed state */
  defaultPressed?: boolean;
  onPressedChange?: (
    pressed: boolean,
    eventDetails: Toggle.ChangeEventDetails,
  ) => void;

  /** Shows a remove control; stops propagation so it does not toggle the chip */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label for the remove control */
  removeLabel?: string;

  /**
   * Plain click handler when **not** `selectable`. If `selectable` is `true`, use `onPressedChange` instead.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const filledVariantClasses: Record<ChipVariant, string> = {
  default: "bg-surface-secondary text-content-secondary",
  success: "bg-state-success text-content-primary",
  warning: "bg-state-warning text-content-primary",
  error: "bg-state-error text-content-primary",
  info: "bg-state-info text-content-primary",
  brand: "bg-accent-primary text-content-on-brand",
};

const outlineVariantClasses: Record<ChipVariant, string> = {
  default: "bg-transparent text-content-secondary border border-border-strong",
  success: "bg-transparent text-state-success border border-state-success",
  warning: "bg-transparent text-state-warning border border-state-warning",
  error: "bg-transparent text-state-error border border-state-error",
  info: "bg-transparent text-state-info border border-state-info",
  brand: "bg-transparent text-content-brand border border-border-brand",
};

/**
 * **Selected** state (`data-[pressed]`) for `selectable` chips: **solid** background
 * (same palette as filled badges), not a light tint.
 */
const selectablePressedFilledClasses: Record<ChipVariant, string> = {
  default:
    "data-[pressed]:bg-surface-secondary data-[pressed]:text-content-primary data-[pressed]:border-border-strong",
  success:
    "data-[pressed]:bg-state-success data-[pressed]:text-white data-[pressed]:border-state-success",
  warning:
    "data-[pressed]:bg-state-warning data-[pressed]:text-white data-[pressed]:border-state-warning",
  error:
    "data-[pressed]:bg-state-error data-[pressed]:text-white data-[pressed]:border-state-error",
  info: "data-[pressed]:bg-state-info data-[pressed]:text-white data-[pressed]:border-state-info",
  brand:
    "data-[pressed]:bg-accent-primary data-[pressed]:text-content-on-brand data-[pressed]:border-accent-primary",
};

const sizeClasses: Record<
  ChipSize,
  { root: string; splitContent: string; icon: string; remove: string }
> = {
  sm: {
    root: "gap-1 px-2 py-0.5 text-xs min-h-7",
    splitContent: "gap-1 py-0.5 pl-2 pr-0.5 text-xs min-h-7",
    icon: "size-3.5 shrink-0",
    remove: "min-w-7 px-1",
  },
  md: {
    root: "gap-1.5 px-2.5 py-1 text-sm min-h-8",
    splitContent: "gap-1.5 py-1 pl-2.5 pr-0.5 text-sm min-h-8",
    icon: "size-4 shrink-0",
    remove: "min-w-8 px-1.5",
  },
  lg: {
    root: "gap-2 px-3 py-1.5 text-sm min-h-10",
    splitContent: "gap-2 py-1.5 pl-3 pr-1 text-sm min-h-10",
    icon: "size-5 shrink-0",
    remove: "min-w-10 px-2",
  },
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

/**
 * Remove button background/text next to a `Toggle` (`peer`): matches the toggle
 * (transparent when idle, solid when the peer has `data-[pressed]`).
 */
const chipRemovePeerSurfaceClasses: Record<ChipVariant, string> = {
  default:
    "bg-transparent text-content-secondary hover:bg-content-secondary/14 " +
    "peer-data-[pressed]:bg-surface-secondary peer-data-[pressed]:text-content-primary " +
    "peer-data-[pressed]:hover:bg-surface-secondary/82 peer-data-[pressed]:active:bg-surface-secondary/72",
  success:
    "bg-transparent text-state-success hover:bg-state-success/14 " +
    "peer-data-[pressed]:bg-state-success peer-data-[pressed]:text-white " +
    "peer-data-[pressed]:hover:bg-state-success/86 peer-data-[pressed]:active:bg-state-success/76",
  warning:
    "bg-transparent text-state-warning hover:bg-state-warning/14 " +
    "peer-data-[pressed]:bg-state-warning peer-data-[pressed]:text-white " +
    "peer-data-[pressed]:hover:bg-state-warning/86 peer-data-[pressed]:active:bg-state-warning/76",
  error:
    "bg-transparent text-state-error hover:bg-state-error/14 " +
    "peer-data-[pressed]:bg-state-error peer-data-[pressed]:text-white " +
    "peer-data-[pressed]:hover:bg-state-error/86 peer-data-[pressed]:active:bg-state-error/76",
  info:
    "bg-transparent text-state-info hover:bg-state-info/14 " +
    "peer-data-[pressed]:bg-state-info peer-data-[pressed]:text-white " +
    "peer-data-[pressed]:hover:bg-state-info/86 peer-data-[pressed]:active:bg-state-info/76",
  brand:
    "bg-transparent text-content-brand hover:bg-content-brand/14 " +
    "peer-data-[pressed]:bg-accent-primary peer-data-[pressed]:text-content-on-brand " +
    "peer-data-[pressed]:hover:bg-accent-primary/86 peer-data-[pressed]:active:bg-accent-primary/76",
};

function chipSurface(
  variant: ChipVariant,
  outline: boolean,
  selectable: boolean,
): string {
  if (selectable) {
    // Idle: outline style so selected vs unselected contrast stays clear
    const idle = outlineVariantClasses[variant];
    return [idle, selectablePressedFilledClasses[variant]].join(" ");
  }
  return outline
    ? outlineVariantClasses[variant]
    : filledVariantClasses[variant];
}

// ── Remove button ───────────────────────────────────────────────────────────

function ChipRemoveButton({
  size,
  disabled,
  variant,
  label,
  onRemove,
  peerWithToggle,
}: {
  size: ChipSize;
  disabled?: boolean;
  variant: ChipVariant;
  label: string;
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Match background/color to the `<Toggle peer>` (selectable + removable chip) */
  peerWithToggle?: boolean;
}) {
  const sc = sizeClasses[size];
  /** Hover when not using peer toggle: subtle overlay on solid chip fills */
  const subtleBg =
    variant === "default"
      ? "hover:bg-surface-hover active:bg-surface-active"
      : "hover:bg-black/8 active:bg-black/14";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onRemove(e);
      }}
      className={[
        "inline-flex shrink-0 items-center justify-center border-0",
        peerWithToggle ? chipRemovePeerSurfaceClasses[variant] : "text-current",
        "transition-colors duration-200",
        "outline-none",
        focusRing,
        disabled
          ? "cursor-not-allowed opacity-50"
          : peerWithToggle
            ? "cursor-pointer"
            : ["cursor-pointer", subtleBg].join(" "),
        !peerWithToggle ? "text-current" : "",
        sc.remove,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CloseIcon className={sizeClasses[size].icon} aria-hidden />
    </button>
  );
}

// ── Chip ───────────────────────────────────────────────────────────────────

/**
 * Compact **chip** for labels, filters, and tags. **Removable** chips include a dismiss control.
 * **Selectable** chips use [Base UI Toggle](https://base-ui.com/react/components/toggle): idle **outline**;
 * selected **solid fill**. For static status tags, see [`Badge`](./Badge).
 */
export function Chip({
  variant = "default",
  size = "md",
  outline = false,
  rounded = true,
  disabled = false,
  startIcon,
  children,
  className,
  selectable = false,
  pressed,
  defaultPressed,
  onPressedChange,
  onRemove,
  removeLabel = "Remove",
  onClick,
}: ChipProps) {
  const sc = sizeClasses[size];
  const radius = rounded ? "rounded-full" : "rounded-md";
  const surface = chipSurface(variant, outline, selectable);
  const border = outline ? "border" : "";

  const sharedLayout = [
    "inline-flex max-w-full min-w-0 items-center font-medium leading-none transition-colors duration-200",
    radius,
    border,
    surface,
    disabled ? "opacity-50 pointer-events-none" : "",
    sc.root,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {startIcon !== undefined && startIcon !== null && (
        <span className="inline-flex shrink-0">{startIcon}</span>
      )}
      <span className="min-w-0 truncate">{children}</span>
    </>
  );

  // ── Selectable (Toggle) ─────────────────────────────────────────────────
  if (selectable) {
    const toggleBase = [
      "inline-flex max-w-full min-w-0 items-center font-medium leading-none transition-colors duration-200",
      "cursor-pointer",
      "disabled:cursor-not-allowed",
      "data-[disabled]:cursor-not-allowed",
      focusRing,
    ].join(" ");

    if (onRemove) {
      return (
        <span
          className={[
            "inline-flex max-w-full min-w-0 items-stretch overflow-hidden",
            radius,
            border,
            disabled ? "opacity-50 pointer-events-none" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Toggle
            pressed={pressed}
            defaultPressed={defaultPressed}
            disabled={disabled}
            onPressedChange={onPressedChange}
            className={[
              "peer",
              toggleBase,
              chipSurface(variant, outline, true),
              "flex-1 rounded-none border-0",
              sc.splitContent,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {content}
          </Toggle>
          <ChipRemoveButton
            size={size}
            disabled={disabled}
            variant={variant}
            label={removeLabel}
            onRemove={onRemove}
            peerWithToggle
          />
        </span>
      );
    }

    return (
      <Toggle
        pressed={pressed}
        defaultPressed={defaultPressed}
        disabled={disabled}
        onPressedChange={onPressedChange}
        className={[toggleBase, sharedLayout].filter(Boolean).join(" ")}
      >
        {content}
      </Toggle>
    );
  }

  // ── Clickable (button) without toggle ───────────────────────────────────
  if (onClick) {
    if (onRemove) {
      return (
        <span
          className={[
            "inline-flex max-w-full min-w-0 items-stretch overflow-hidden",
            radius,
            border,
            disabled ? "opacity-50 pointer-events-none" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={[
              "inline-flex max-w-full min-w-0 items-center font-medium leading-none transition-colors duration-200",
              chipSurface(variant, outline, false),
              "flex-1 cursor-pointer rounded-none border-0",
              focusRing,
              sc.splitContent,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {content}
          </button>
          <ChipRemoveButton
            size={size}
            disabled={disabled}
            variant={variant}
            label={removeLabel}
            onRemove={onRemove}
          />
        </span>
      );
    }

    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={[sharedLayout, "cursor-pointer", focusRing]
          .filter(Boolean)
          .join(" ")}
      >
        {content}
      </button>
    );
  }

  // ── Removable only (span + remove) ───────────────────────────────────────
  if (onRemove) {
    return (
      <span
        className={[
          "inline-flex max-w-full min-w-0 items-stretch overflow-hidden",
          radius,
          border,
          surface,
          disabled ? "opacity-50 pointer-events-none" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span
          className={[
            "inline-flex min-w-0 flex-1 items-center rounded-none border-0",
            sc.splitContent,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {content}
        </span>
        <ChipRemoveButton
          size={size}
          disabled={disabled}
          variant={variant}
          label={removeLabel}
          onRemove={onRemove}
        />
      </span>
    );
  }

  // ── Static ────────────────────────────────────────────────────────────────
  return (
    <span className={[sharedLayout, "cursor-default"].join(" ")}>
      {content}
    </span>
  );
}

Chip.displayName = "Chip";
