import * as React from "react";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { LoaderIcon } from "../../icons";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColorScheme =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Color scheme */
  colorScheme?: ButtonColorScheme;
  /** Whether the button remains focusable when disabled (Base UI) */
  focusableWhenDisabled?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Left icon element */
  startIcon?: React.ReactNode;
  /** Right icon element */
  endIcon?: React.ReactNode;
  /** Make button full width */
  fullWidth?: boolean;
  /** Render as a different element */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
};

// Shared interaction motion — transform + color only (Emil: no transition-all; press scale 0.97).
const buttonInteractionClasses = [
  "transition-[transform,background-color,border-color,color,box-shadow,filter] duration-fast ease-standard",
  "motion-safe:active:scale-[0.97]",
  "motion-reduce:active:scale-100",
  "disabled:active:scale-100 data-[disabled]:active:scale-100",
].join(" ");

// Glass gradient effect for non-primary solid buttons.
const solidGlassEffect = [
  "relative group",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:brightness-95 active:brightness-90",
  "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit]",
  "before:bg-gradient-to-b before:p-px before:from-white/[.12] before:to-transparent",
  "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude]",
  "before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
  "after:bg-gradient-to-b after:from-white after:to-transparent",
  "after:opacity-[.16] after:transition-opacity after:duration-normal after:ease-standard",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:after:opacity-[.24]",
  "disabled:before:hidden disabled:after:hidden data-[disabled]:before:hidden data-[disabled]:after:hidden",
].join(" ");

// Brand CTA — inset highlight, shine sweep on hover (fine pointer only).
// Hover uses accent-secondary so black (Runticket) lifts to mid-gray instead of near-black /90.
const primaryBrandSolidEffect = [
  "relative overflow-hidden font-semibold",
  "bg-accent-primary text-content-on-brand",
  "border-2 border-black/5",
  "shadow-[0_3px_2px_0_rgba(255,255,255,0.25)_inset]",
  "transition-[transform,background-color,box-shadow] duration-fast ease-standard",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent-secondary",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_3px_2px_0_rgba(255,255,255,0.3)_inset]",
  "active:bg-accent-primary/80",
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
  "before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
  "before:transition-transform before:duration-slow before:ease-standard",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:before:translate-x-full",
  "disabled:before:hidden data-[disabled]:before:hidden",
].join(" ");

const variantColorClasses: Record<
  ButtonColorScheme,
  Record<ButtonVariant, string>
> = {
  primary: {
    solid: primaryBrandSolidEffect,
    outline:
      "border bg-transparent text-content-primary [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent-primary/20 active:bg-accent-primary/30 border-border-brand",
    ghost:
      "bg-transparent text-content-brand [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent-primary/20 active:bg-accent-primary/30",
    link: "bg-transparent text-content-brand [@media(hover:hover)_and_(pointer:fine)]:hover:text-content-on-brand underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:underline motion-safe:active:scale-100",
  },
  success: {
    solid: [
      solidGlassEffect,
      "bg-state-success text-content-inverse shadow-sm",
    ].join(" "),
    outline:
      "border bg-transparent text-feedback-positive [@media(hover:hover)_and_(pointer:fine)]:hover:bg-green-100 active:bg-surface-active border-state-success",
    ghost:
      "bg-transparent text-feedback-positive [@media(hover:hover)_and_(pointer:fine)]:hover:bg-green-100 active:bg-surface-active",
    link: "bg-transparent text-feedback-positive [@media(hover:hover)_and_(pointer:fine)]:hover:text-green-400 underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:underline motion-safe:active:scale-100",
  },
  warning: {
    solid: [
      solidGlassEffect,
      "bg-state-warning text-content-inverse shadow-sm",
    ].join(" "),
    outline:
      "border bg-transparent text-feedback-caution [@media(hover:hover)_and_(pointer:fine)]:hover:bg-orange-100 active:bg-surface-active border-state-warning",
    ghost:
      "bg-transparent text-feedback-caution [@media(hover:hover)_and_(pointer:fine)]:hover:bg-orange-100 active:bg-surface-active",
    link: "bg-transparent text-feedback-caution [@media(hover:hover)_and_(pointer:fine)]:hover:text-orange-400 underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:underline motion-safe:active:scale-100",
  },
  danger: {
    solid: [
      solidGlassEffect,
      "bg-state-error text-content-inverse shadow-sm",
    ].join(" "),
    outline:
      "border bg-transparent text-feedback-negative [@media(hover:hover)_and_(pointer:fine)]:hover:bg-red-100 active:bg-surface-active border-state-error",
    ghost:
      "bg-transparent text-feedback-negative [@media(hover:hover)_and_(pointer:fine)]:hover:bg-red-100 active:bg-surface-active",
    link: "bg-transparent text-feedback-negative [@media(hover:hover)_and_(pointer:fine)]:hover:text-red-400 underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:underline motion-safe:active:scale-100",
  },
  neutral: {
    solid: [
      solidGlassEffect,
      "bg-surface-secondary text-content-primary shadow-sm border border-border-default",
    ].join(" "),
    outline:
      "border bg-transparent text-content-secondary [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover active:bg-surface-active border-border-strong",
    ghost:
      "bg-transparent text-content-secondary [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover active:bg-surface-active",
    link: "bg-transparent text-content-secondary [@media(hover:hover)_and_(pointer:fine)]:hover:text-content-primary underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:underline motion-safe:active:scale-100",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-full",
  md: "h-10 px-5 text-sm gap-2 rounded-full",
  lg: "h-[48px] px-6 text-sm gap-2.5 rounded-full",
};

function pressFeedbackClass(variant: ButtonVariant): string {
  return variant === "link" ? "" : buttonInteractionClasses;
}

function isPrimaryBrandSolid(
  variant: ButtonVariant,
  colorScheme: ButtonColorScheme,
) {
  return variant === "solid" && colorScheme === "primary";
}

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

/** Centers SVG / icon components; avoids baseline offset from inline SVG. */
function iconSlotClass(size: ButtonSize): string {
  return [
    "inline-flex shrink-0 items-center justify-center self-center",
    iconSizeClasses[size],
    "[&_svg]:pointer-events-none [&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:shrink-0",
  ].join(" ");
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <LoaderIcon
      className={["animate-spin", className].filter(Boolean).join(" ")}
      aria-hidden
    />
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "solid",
      size = "md",
      colorScheme = "primary",
      loading = false,
      startIcon,
      endIcon,
      fullWidth = false,
      disabled,
      focusableWhenDisabled,
      type = "button",
      onClick,
      children,
      className,
      render,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;
    const primaryBrandSolid = isPrimaryBrandSolid(variant, colorScheme);

    const classes = [
      // Base styles — leading-none keeps icon + label vertically centered vs text metrics
      "inline-flex items-center justify-center leading-none font-stack",
      primaryBrandSolid ? "font-semibold" : "font-medium",
      "cursor-pointer",
      pressFeedbackClass(variant),
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
      // Size
      sizeClasses[size],
      // Variant + Color
      variantColorClasses[colorScheme][variant],
      // Full width
      fullWidth ? "w-full" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <BaseButton
        ref={ref}
        {...rest}
        className={[classes, className].filter(Boolean).join(" ")}
        disabled={isDisabled}
        focusableWhenDisabled={focusableWhenDisabled}
        type={type}
        onClick={onClick}
        render={render}
      >
        {loading ? (
          <span
            className={[
              iconSlotClass(size),
              primaryBrandSolid ? "relative z-1" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            <LoadingSpinner className="size-full" />
          </span>
        ) : startIcon ? (
          <span
            className={[
              iconSlotClass(size),
              primaryBrandSolid ? "relative z-1" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            {startIcon}
          </span>
        ) : null}
        {children ? (
          <span
            className={[
              "min-w-0 leading-normal",
              primaryBrandSolid ? "relative z-1" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {children}
          </span>
        ) : null}
        {!loading && endIcon ? (
          <span
            className={[
              iconSlotClass(size),
              primaryBrandSolid ? "relative z-1" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            {endIcon}
          </span>
        ) : null}
      </BaseButton>
    );
  },
);

Button.displayName = "Button";
