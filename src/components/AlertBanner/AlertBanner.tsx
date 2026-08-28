import * as React from "react";
import {
  AlertIcon,
  CheckCircleIcon,
  CloseCircleIcon,
  CloseIcon,
  InformationIcon,
  StarOutlineIcon,
} from "../../icons";

// ── Types ──────────────────────────────────────────────────────────────────

export type AlertBannerVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "brand";

export interface AlertBannerAction {
  /** Label text for the action button */
  label: string;
  /** Click handler */
  onClick: () => void;
}

export interface AlertBannerProps {
  /** Color variant controlling accent border, icon, and background tint */
  variant?: AlertBannerVariant;
  /** Bold heading text */
  title?: string;
  /** Supporting body text */
  description?: string;
  /** Whether the banner can be dismissed via close button */
  dismissible?: boolean;
  /** Callback fired when the close button is clicked */
  onDismiss?: () => void;
  /** Custom icon override; replaces the default variant icon */
  icon?: React.ReactNode;
  /** Optional action rendered as a button inside the banner */
  action?: AlertBannerAction;
  /** Additional CSS classes */
  className?: string;
  /** Banner content (used instead of title/description when more control is needed) */
  children?: React.ReactNode;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const variantBgClasses: Record<AlertBannerVariant, string> = {
  info: "bg-surface-info",
  success: "bg-surface-success",
  warning: "bg-surface-warning",
  error: "bg-surface-error",
  brand: "bg-surface-brand-tint",
};

const variantIconClasses: Record<AlertBannerVariant, string> = {
  info: "text-feedback-neutral",
  success: "text-feedback-positive",
  warning: "text-feedback-caution",
  error: "text-feedback-negative",
  brand: "text-content-brand",
};

const variantActionClasses: Record<AlertBannerVariant, string> = {
  info: "bg-surface-info-emphasis text-content-primary hover:bg-state-info/25 active:bg-state-info/30",
  success:
    "bg-surface-success-emphasis text-content-primary hover:bg-state-success/25 active:bg-state-success/30",
  warning:
    "bg-surface-warning-emphasis text-content-primary hover:bg-state-warning/25 active:bg-state-warning/30",
  error:
    "bg-surface-error-emphasis text-content-primary hover:bg-state-error/25 active:bg-state-error/30",
  brand:
    "bg-surface-brand-emphasis text-content-primary hover:bg-accent-primary/30 active:bg-accent-primary/35",
};

const defaultIcons: Record<
  AlertBannerVariant,
  React.ComponentType<{ className?: string }>
> = {
  info: InformationIcon,
  success: CheckCircleIcon,
  warning: AlertIcon,
  error: CloseCircleIcon,
  brand: StarOutlineIcon,
};

// ── Component ──────────────────────────────────────────────────────────────

export function AlertBanner({
  variant = "info",
  title,
  description,
  dismissible = false,
  onDismiss,
  icon,
  action,
  className,
  children,
}: AlertBannerProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const DefaultIcon = defaultIcons[variant];
  const iconElement =
    icon !== undefined ? (
      <span
        className={["h-5 w-5 shrink-0", variantIconClasses[variant]].join(" ")}
      >
        {icon}
      </span>
    ) : (
      <DefaultIcon
        className={["h-5 w-5 shrink-0", variantIconClasses[variant]].join(" ")}
      />
    );

  return (
    <div
      role="alert"
      className={[
        "w-full px-4 py-3 rounded-xl",
        "flex items-start gap-3",
        "transition-colors duration-[200ms]",
        variantBgClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {iconElement}

      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-content-primary">{title}</p>
        )}
        {description && (
          <p
            className={["text-sm text-content-secondary", title ? "mt-1" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {description}
          </p>
        )}
        {children}
      </div>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={[
            "shrink-0 text-sm font-medium px-3 py-1 rounded-full",
            "cursor-pointer transition-colors duration-[200ms]",
            variantActionClasses[variant],
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-border-focus focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background-primary",
          ].join(" ")}
        >
          {action.label}
        </button>
      )}

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className={[
            "shrink-0 p-1 rounded-full",
            "cursor-pointer transition-colors duration-[200ms]",
            "text-content-secondary hover:text-content-primary",
            "hover:bg-black/5 active:bg-black/10",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-border-focus focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background-primary",
          ].join(" ")}
        >
          <CloseIcon className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

AlertBanner.displayName = "AlertBanner";
