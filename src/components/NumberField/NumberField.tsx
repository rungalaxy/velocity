import * as React from "react";
import {
  NumberField as BaseNumberField,
  type NumberFieldRoot,
} from "@base-ui-components/react/number-field";
import { AddIcon, DragMoveIcon, SubtractIcon } from "../../icons";
import {
  fieldBorderClass,
  fieldFocusWithinDefault,
  fieldFocusWithinError,
  fieldShellTransition,
  fieldStepperButtonMotion,
} from "../fieldStyles";

// ── Types ──────────────────────────────────────────────────────────────────

export type NumberFieldSize = "sm" | "md" | "lg";

export interface NumberFieldProps {
  /** Accessible label */
  label?: string;
  /** Helper text below the control */
  helperText?: string;
  /** Error state — border + helper styling */
  error?: boolean;
  /** Visual size (stepper + input height) */
  size?: NumberFieldSize;
  /**
   * When `true`, shows a **scrub area** above the stepper (drag horizontally to change value).
   * @see https://base-ui.com/react/components/number-field
   */
  showScrubArea?: boolean;
  /** Text next to the scrub cursor (default: hint for drag) */
  scrubLabel?: string;
  /** Extra class on the root */
  className?: string;
  /** Extra class on the inner group (bordered control) */
  groupClassName?: string;

  // ── Passed to Base UI Root ─────────────────────────────────────────────
  id?: string;
  name?: string;
  value?: number | null;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  smallStep?: number;
  largeStep?: number;
  snapOnStep?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  format?: Intl.NumberFormatOptions;
  allowWheelScrub?: boolean;
  locale?: Intl.LocalesArgument;
  inputRef?: React.Ref<HTMLInputElement>;
  onValueChange?: (value: number | null, eventDetails: NumberFieldRoot.ChangeEventDetails) => void;
  onValueCommitted?: (value: number | null, eventDetails: NumberFieldRoot.CommitEventDetails) => void;
}

// ── Styles ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<
  NumberFieldSize,
  {
    group: string;
    text: string;
    label: string;
    helper: string;
    btn: string;
    icon: string;
  }
> = {
  sm: {
    group: "h-8 min-h-8",
    text: "text-sm tabular-nums",
    label: "text-xs",
    helper: "text-xs",
    btn: "min-w-8 px-0",
    icon: "size-4",
  },
  md: {
    group: "h-10 min-h-10",
    text: "text-sm tabular-nums",
    label: "text-sm",
    helper: "text-sm",
    btn: "min-w-10 px-0",
    icon: "size-4",
  },
  lg: {
    group: "h-[48px] min-h-[48px]",
    text: "text-sm tabular-nums",
    label: "text-sm",
    helper: "text-sm",
    btn: "min-w-12 px-0",
    icon: "size-5",
  },
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

const stepperBtn = [
  "inline-flex h-full self-stretch shrink-0 items-center justify-center",
  "border-border-default bg-surface-secondary text-content-primary",
  "cursor-pointer",
  fieldStepperButtonMotion,
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
  focusRing,
].join(" ");

// ── Primitives (composition) ────────────────────────────────────────────────

/** Re-export Base UI parts for custom layouts. */
export const NumberFieldParts = {
  Root: BaseNumberField.Root,
  Group: BaseNumberField.Group,
  Input: BaseNumberField.Input,
  Increment: BaseNumberField.Increment,
  Decrement: BaseNumberField.Decrement,
  ScrubArea: BaseNumberField.ScrubArea,
  ScrubAreaCursor: BaseNumberField.ScrubAreaCursor,
} as const;

// ── NumberField ───────────────────────────────────────────────────────────
/**
 * Numeric field with **increment / decrement** controls, built on
 * [Base UI Number Field](https://base-ui.com/react/components/number-field).
 * Optional **scrub area** (drag to change value).
 */
export function NumberField({
  label,
  helperText,
  error = false,
  size = "md",
  showScrubArea = false,
  scrubLabel = "Drag to adjust",
  className,
  groupClassName,
  id: idProp,
  ...rootProps
}: NumberFieldProps) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const sc = sizeClasses[size];

  const groupShell = [
    "flex items-center overflow-hidden rounded-full border bg-surface-primary",
    fieldShellTransition,
    fieldBorderClass(error),
    error ? fieldFocusWithinError : fieldFocusWithinDefault,
    rootProps.disabled ? "opacity-50 pointer-events-none" : "",
    sc.group,
    groupClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <BaseNumberField.Root id={id} className={["flex flex-col gap-1.5", className].filter(Boolean).join(" ")} {...rootProps}>
      {label !== undefined && (
        <label htmlFor={id} className={["font-medium text-content-primary", sc.label].join(" ")}>
          {label}
        </label>
      )}

      {showScrubArea && (
        <BaseNumberField.ScrubArea
          className={[
            "flex cursor-ew-resize select-none items-center gap-2 rounded-lg px-2 py-1.5",
            "text-content-tertiary bg-surface-secondary/80",
            "text-xs",
          ].join(" ")}
        >
          <span className="min-w-0 flex-1 truncate">{scrubLabel}</span>
          <BaseNumberField.ScrubAreaCursor className="inline-flex text-content-brand">
            <DragMoveIcon className={sc.icon} aria-hidden />
          </BaseNumberField.ScrubAreaCursor>
        </BaseNumberField.ScrubArea>
      )}

      <BaseNumberField.Group className={groupShell}>
        <BaseNumberField.Decrement
          type="button"
          className={[stepperBtn, "border-r", sc.btn].join(" ")}
          aria-label="Decrease value"
        >
          <SubtractIcon className={sc.icon} aria-hidden />
        </BaseNumberField.Decrement>

        <BaseNumberField.Input
          className={[
            "min-w-0 flex-1 self-center border-0 bg-transparent text-center appearance-none",
            "leading-none py-0 -translate-y-px",
            "text-content-primary placeholder:text-content-tertiary",
            "outline-none",
            sc.text,
            focusRing,
          ].join(" ")}
        />

        <BaseNumberField.Increment
          type="button"
          className={[stepperBtn, "border-l", sc.btn].join(" ")}
          aria-label="Increase value"
        >
          <AddIcon className={sc.icon} aria-hidden />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>

      {helperText !== undefined && (
        <p
          className={[
            sc.helper,
            error ? "text-feedback-negative" : "text-content-tertiary",
          ].join(" ")}
        >
          {helperText}
        </p>
      )}
    </BaseNumberField.Root>
  );
}

NumberField.displayName = "NumberField";
