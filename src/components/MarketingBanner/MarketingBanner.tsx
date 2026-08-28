import * as React from "react";
import { CloseIcon } from "../../icons";

// ── Types ──────────────────────────────────────────────────────────────────

export type MarketingBannerVariant = "neutral" | "brand" | "accent" | "inverse";

export type MarketingBannerLayout = "center" | "split";

export interface MarketingBannerCta {
  label: string;
  href: string;
  /** Sets `target="_blank"` and `rel="noopener noreferrer"`. */
  external?: boolean;
}

export interface MarketingBannerProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "title" | "children"> {
  /** Visual treatment */
  variant?: MarketingBannerVariant;
  /** Stack and alignment of copy + CTA */
  layout?: MarketingBannerLayout;
  /** Optional short headline */
  title?: React.ReactNode;
  /** Primary line (promo, shipping, etc.) — ignored if `children` is set */
  message?: React.ReactNode;
  /** Text link CTA */
  cta?: MarketingBannerCta;
  /** Extra control next to CTA (e.g. `Button`) */
  trailing?: React.ReactNode;
  /** Full control over body — replaces `title` / `message` */
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Accessible name for the region */
  "aria-label"?: string;
}

// ── Styles ─────────────────────────────────────────────────────────────────

const shellClasses: Record<MarketingBannerVariant, string> = {
  neutral:
    "border-b border-border-default bg-surface-secondary text-content-primary",
  brand: "border-b border-primary-600/30 bg-accent-primary text-white",
  accent:
    "border-b border-secondary-200/60 bg-secondary-50 text-content-primary",
  inverse:
    "border-b border-white/10 bg-background-inverse text-content-inverse",
};

const ctaLinkClasses: Record<MarketingBannerVariant, string> = {
  neutral:
    "font-semibold text-content-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary rounded-sm",
  brand:
    "font-semibold text-white underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-accent-primary rounded-sm",
  accent:
    "font-semibold text-content-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-50 rounded-sm",
  inverse:
    "font-semibold text-content-inverse underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-inverse rounded-sm",
};

const dismissClasses: Record<MarketingBannerVariant, string> = {
  neutral:
    "text-content-secondary hover:bg-black/5 hover:text-content-primary active:bg-black/10",
  brand: "text-white/90 hover:bg-white/10 hover:text-white active:bg-white/15",
  accent:
    "text-content-secondary hover:bg-black/5 hover:text-content-primary active:bg-black/10",
  inverse:
    "text-content-inverse/80 hover:bg-white/10 hover:text-content-inverse active:bg-white/15",
};

// ── Component ───────────────────────────────────────────────────────────────

/**
 * Compact **marketing** strip (promo, free shipping, sale). For system / status
 * messages, use **AlertBanner**. Renders a `section` landmark (`aria-label`).
 */
export const MarketingBanner = React.forwardRef<
  HTMLElement,
  MarketingBannerProps
>(function MarketingBanner(
  {
    variant = "neutral",
    layout = "center",
    title,
    message,
    cta,
    trailing,
    children,
    dismissible = false,
    onDismiss,
    className,
    "aria-label": ariaLabel = "Site announcement",
    ...props
  },
  ref,
) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) {
    return null;
  }

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const body = children ?? (
    <div
      className={[
        "min-w-0 text-sm leading-snug",
        layout === "center" ? "text-center sm:text-left" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title ? (
        <p className="text-[0.9375rem] font-semibold text-current">{title}</p>
      ) : null}
      {message ? (
        <p
          className={[
            title ? "mt-0.5" : "",
            variant === "neutral" || variant === "accent"
              ? "text-content-secondary"
              : "text-current/90",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {message}
        </p>
      ) : null}
    </div>
  );

  const ctaNode =
    cta != null ? (
      <a
        href={cta.href}
        className={["shrink-0 text-sm", ctaLinkClasses[variant]].join(" ")}
        {...(cta.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {cta.label}
      </a>
    ) : null;

  const ctaGroup =
    ctaNode != null || trailing != null ? (
      <div
        className={[
          "flex shrink-0 flex-wrap items-center gap-2",
          layout === "center"
            ? "justify-center sm:justify-start"
            : "justify-start sm:justify-end",
        ].join(" ")}
      >
        {ctaNode}
        {trailing}
      </div>
    ) : null;

  const rowClass =
    layout === "center"
      ? "mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-2.5 text-center sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1 sm:px-6 sm:py-3 sm:text-left lg:px-8"
      : "mx-auto flex w-full max-w-7xl flex-row items-center justify-between gap-3 px-4 py-2.5 text-left sm:px-6 sm:py-3 lg:px-8";

  return (
    <section
      ref={ref}
      aria-label={ariaLabel}
      className={[shellClasses[variant], className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className={rowClass}>
        <div
          className={[
            "min-w-0",
            layout === "split" ? "flex-1 pr-2" : "",
            layout === "center"
              ? "flex w-full max-w-3xl flex-col justify-center sm:w-auto"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {body}
        </div>

        {ctaGroup}

        {dismissible ? (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className={[
              "-m-1 shrink-0 cursor-pointer rounded-full p-1.5 transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
              variant === "brand"
                ? "focus-visible:ring-white/60 focus-visible:ring-offset-accent-primary"
                : variant === "inverse"
                  ? "focus-visible:ring-white/50 focus-visible:ring-offset-background-inverse"
                  : "focus-visible:ring-offset-background-primary",
              dismissClasses[variant],
            ].join(" ")}
          >
            <CloseIcon className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </div>
    </section>
  );
});

MarketingBanner.displayName = "MarketingBanner";
