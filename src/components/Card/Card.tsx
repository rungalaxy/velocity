import * as React from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type CardVariant = "default" | "elevated" | "muted";

export type CardSize = "sm" | "md" | "lg";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background and elevation */
  variant?: CardVariant;
  /** Add a strong border around the card */
  outline?: boolean;
  /** Padding for header / content / footer sections */
  size?: CardSize;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Divider below the header */
  separator?: boolean;
}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Divider above the footer (off by default) */
  separator?: boolean;
}

// ── Context ────────────────────────────────────────────────────────────────

interface CardContextValue {
  size: CardSize;
}

const CardContext = React.createContext<CardContextValue>({ size: "md" });

function useCardContext() {
  return React.useContext(CardContext);
}

// ── Style maps ─────────────────────────────────────────────────────────────

const variantClasses: Record<CardVariant, string> = {
  default: "bg-surface-primary",
  elevated: "bg-surface-primary shadow-md",
  muted: "bg-surface-secondary",
};

const headerPadding: Record<CardSize, string> = {
  sm: "px-4 pt-4 pb-0",
  md: "px-5 pt-5 pb-0",
  lg: "px-6 pt-6 pb-0",
};

/** Horizontal + bottom; tighter top padding when CardContent follows CardHeader (`:not(:first-child)`). */
const contentPadding: Record<CardSize, string> = {
  sm: "px-4 pb-3 first:pt-4 [&:not(:first-child)]:pt-2",
  md: "px-5 pb-4 first:pt-5 [&:not(:first-child)]:pt-2",
  lg: "px-6 pb-5 first:pt-6 [&:not(:first-child)]:pt-2",
};

const footerPadding: Record<CardSize, string> = {
  sm: "px-4 pt-3 pb-4",
  md: "px-5 pt-3 pb-5",
  lg: "px-6 pt-4 pb-6",
};

const titleSize: Record<CardSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

// ── Card ───────────────────────────────────────────────────────────────────

/**
 * Generic **card** container (grouped content with optional border / shadow).
 * **Base UI** does not ship a Card primitive — native elements + Velocity tokens.
 * Variants are borderless; pass `outline` for a strong border.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "default",
    outline = false,
    size = "md",
    className,
    children,
    ...props
  },
  ref,
) {
  const ctx = React.useMemo(() => ({ size }), [size]);

  return (
    <CardContext.Provider value={ctx}>
      <div
        ref={ref}
        className={[
          "flex flex-col overflow-hidden rounded-4xl",
          "transition-shadow duration-200",
          variantClasses[variant],
          outline ? "border border-border-strong" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
});

Card.displayName = "Card";

// ── CardHeader ─────────────────────────────────────────────────────────────

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(
    { className, separator = false, children, ...props },
    ref,
  ) {
    const { size } = useCardContext();
    return (
      <div
        ref={ref}
        className={[
          "flex flex-col gap-1 pb-2",
          headerPadding[size],
          separator ? "border-b border-border-subtle" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

// ── CardTitle ─────────────────────────────────────────────────────────────

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ className, children, ...props }, ref) {
    const { size } = useCardContext();
    return (
      <h3
        ref={ref}
        className={[
          "font-semibold leading-snug tracking-tight text-content-primary font-heading",
          titleSize[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "CardTitle";

// ── CardDescription ───────────────────────────────────────────────────────

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(function CardDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={["text-body-sm text-content-secondary", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

// ── CardContent ───────────────────────────────────────────────────────────

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...props }, ref) {
    const { size } = useCardContext();
    return (
      <div
        ref={ref}
        className={[
          "flex flex-1 flex-col gap-3",
          contentPadding[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

CardContent.displayName = "CardContent";

// ── CardFooter ─────────────────────────────────────────────────────────────

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, separator = false, ...props }, ref) {
    const { size } = useCardContext();
    return (
      <div
        ref={ref}
        className={[
          "flex flex-wrap items-center gap-2",
          footerPadding[size],
          separator ? "border-t border-border-subtle" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

CardFooter.displayName = "CardFooter";
