import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { CheckIcon, SubtractIcon } from "../../icons";

// ── Types ──────────────────────────────────────────────────────────────────

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  /** Whether the checkbox is checked (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Indeterminate state — shown when some (not all) child items are selected */
  indeterminate?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Visual size */
  size?: CheckboxSize;
  disabled?: boolean;
  /** Optional label rendered next to the checkbox */
  children?: React.ReactNode;
  className?: string;
  name?: string;
  value?: string;
  required?: boolean;
  /** Accessible name — required when no visible `children` label is provided */
  "aria-label"?: string;
  /** References the id of an element that labels the checkbox */
  "aria-labelledby"?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<
  CheckboxSize,
  { root: string; indicator: string; label: string; gap: string }
> = {
  sm: {
    root: "size-4 rounded",
    indicator: "size-3",
    label: "text-sm",
    gap: "gap-2",
  },
  md: {
    root: "size-5 rounded-md",
    indicator: "size-3.5",
    label: "text-sm",
    gap: "gap-2.5",
  },
  lg: {
    root: "size-6 rounded-md",
    indicator: "size-4",
    label: "text-base",
    gap: "gap-3",
  },
};

// ── Component ──────────────────────────────────────────────────────────────

export function Checkbox({
  checked,
  defaultChecked,
  indeterminate,
  onCheckedChange,
  size = "md",
  disabled,
  children,
  className,
  name,
  value,
  required,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: CheckboxProps) {
  const sizes = sizeClasses[size];

  return (
    <label
      className={[
        "inline-flex items-center select-none",
        "cursor-pointer",
        "has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50",
        children ? sizes.gap : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <BaseCheckbox.Root
        checked={checked}
        defaultChecked={defaultChecked}
        indeterminate={indeterminate}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        value={value}
        required={required}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={[
          "relative flex shrink-0 items-center justify-center",
          "border-2",
          "cursor-pointer transition-colors duration-200",
          // unchecked default
          "border-border-strong bg-transparent",
          // hover
          "hover:border-border-brand",
          // checked state
          "data-checked:border-accent-primary data-checked:bg-accent-primary",
          // indeterminate state
          "data-indeterminate:border-accent-primary data-indeterminate:bg-accent-primary",
          // focus ring
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background-primary",
          // disabled
          "data-disabled:cursor-not-allowed",
          // optical top-alignment with first line of label text
          children ? "mt-px" : "",
          sizes.root,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <BaseCheckbox.Indicator
          keepMounted
          className={[
            "flex items-center justify-center",
            "text-content-on-brand",
            "transition-[transform,opacity] duration-200",
            "data-unchecked:opacity-0 data-unchecked:scale-0",
            "data-starting-style:scale-0 data-ending-style:scale-0",
            sizes.indicator,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {indeterminate ? (
            <SubtractIcon className="size-full" aria-hidden />
          ) : (
            <CheckIcon className="size-full" aria-hidden />
          )}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>

      {children && (
        <span
          className={[
            "font-medium leading-snug text-content-primary",
            sizes.label,
          ].join(" ")}
        >
          {children}
        </span>
      )}
    </label>
  );
}

Checkbox.displayName = "Checkbox";
