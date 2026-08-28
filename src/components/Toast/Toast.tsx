import * as React from "react";
import { Toast as BaseToast } from "@base-ui-components/react/toast";
import {
  AlertIcon,
  CheckCircleIcon,
  CloseCircleIcon,
  CloseIcon,
  InformationIcon,
} from "../../icons";

// ── Types ──────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "warning" | "error" | "info";

export interface ToastData {
  /** Visual variant for the toast */
  variant?: ToastVariant;
}

// Re-export Base UI pieces that consumers need directly
export type {
  ToastProviderProps,
} from "@base-ui-components/react/toast";

export type {
  ToastObject,
  UseToastManagerReturnValue,
  ToastManagerAddOptions,
} from "@base-ui-components/react/toast";

// ── Variant style maps ─────────────────────────────────────────────────────

const variantContainerClasses: Record<ToastVariant, string> = {
  default:
    "bg-surface-secondary border-border-default",
  success:
    "bg-surface-secondary border-state-success",
  warning:
    "bg-surface-secondary border-state-warning",
  error:
    "bg-surface-secondary border-state-error",
  info:
    "bg-surface-secondary border-state-info",
};

const variantIconColors: Record<ToastVariant, string> = {
  default: "text-content-secondary",
  success: "text-feedback-positive",
  warning: "text-feedback-caution",
  error: "text-feedback-negative",
  info: "text-feedback-neutral",
};

const variantIcons: Record<
  ToastVariant,
  React.ComponentType<{ className?: string }> | null
> = {
  default: null,
  success: CheckCircleIcon,
  warning: AlertIcon,
  error: CloseCircleIcon,
  info: InformationIcon,
};

// ── Toast Provider ─────────────────────────────────────────────────────────

export interface VelocityToastProviderProps {
  /** Child elements */
  children?: React.ReactNode;
  /** Default auto-dismiss timeout in ms (default 5000). 0 = no auto-dismiss. */
  timeout?: number;
  /** Max number of toasts visible at once */
  limit?: number;
}

/**
 * Wraps Base UI Toast.Provider. Place at the root of your app.
 */
export function ToastProvider({
  children,
  timeout = 5000,
  limit = 3,
}: VelocityToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
    </BaseToast.Provider>
  );
}

ToastProvider.displayName = "ToastProvider";

// ── Toast Viewport ─────────────────────────────────────────────────────────

export interface ToastViewportProps {
  /** Additional CSS classes */
  className?: string;
  /**
   * Custom render function for each toast. By default renders the
   * `<Toast>` component with auto-detected variant, title, and description.
   */
  renderToast?: (toast: BaseToast.Root.ToastObject<ToastData>) => React.ReactNode;
}

/**
 * A container for toasts. Renders in a portal by default.
 * Internally iterates over all active toasts and renders them.
 * Place one per app (usually in the layout).
 */
export function ToastViewport({ className, renderToast }: ToastViewportProps) {
  const { toasts } = BaseToast.useToastManager();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        className={[
          "fixed bottom-0 right-0 z-[9999]",
          "flex flex-col-reverse gap-3",
          "p-4 m-0",
          "w-full max-w-sm",
          "outline-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {toasts.map((toast, index) => {
          const stackDepth = Math.min(Math.max(toasts.length - index - 1, 0), 2);
          const stackStyle: React.CSSProperties =
            stackDepth > 0
              ? {
                  transform: `translateY(${stackDepth * 6}px) scale(${1 - stackDepth * 0.02})`,
                  opacity: 1 - stackDepth * 0.08,
                }
              : {};

          return (
            <div
              key={toast.id}
              className="transition-[transform,opacity] duration-[250ms] ease-out"
              style={stackStyle}
            >
              {renderToast ? renderToast(toast) : <Toast toast={toast} />}
            </div>
          );
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

ToastViewport.displayName = "ToastViewport";

// ── Toast Root ─────────────────────────────────────────────────────────────

export interface ToastProps {
  /** The toast object from useToastManager */
  toast: BaseToast.Root.ToastObject<ToastData>;
  /** Additional CSS classes */
  className?: string;
  children?: React.ReactNode;
}

/**
 * An individual toast notification with variant-based styling.
 * Built on Base UI Toast.Root + Toast.Content.
 */
export function Toast({ toast, className, children }: ToastProps) {
  const variant: ToastVariant =
    toast.data?.variant ?? (toast.type as ToastVariant) ?? "default";
  const Icon = variantIcons[variant] ?? null;

  return (
    <BaseToast.Root
      toast={toast}
      className={[
        // layout
        "group relative flex items-start gap-3",
        "w-full rounded-xl border p-4 shadow-md",
        // enter animation
        "data-[starting-style]:translate-x-[calc(100%+1rem)]",
        "data-[starting-style]:opacity-0",
        // exit animation
        "data-[ending-style]:translate-x-[calc(100%+1rem)]",
        "data-[ending-style]:opacity-0",
        // transitions
        "transition-all duration-[300ms] ease-out",
        "data-[swipe-direction=right]:data-[swiping]:translate-x-[var(--toast-swipe-movement-x)]",
        // variant colors
        variantContainerClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {Icon && (
        <span
          className={[
            "mt-0.5 flex-shrink-0",
            variantIconColors[variant],
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </span>
      )}

      <BaseToast.Content className="flex-1 min-w-0">
        {children ?? (
          <>
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
          </>
        )}
      </BaseToast.Content>

      <ToastClose />
    </BaseToast.Root>
  );
}

Toast.displayName = "Toast";

// ── Toast Title ────────────────────────────────────────────────────────────

export interface ToastTitleProps {
  /** Additional CSS classes */
  className?: string;
  children?: React.ReactNode;
}

/**
 * A heading for the toast message.
 */
export function ToastTitle({ className, children }: ToastTitleProps) {
  return (
    <BaseToast.Title
      className={[
        "text-sm font-semibold text-content-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseToast.Title>
  );
}

ToastTitle.displayName = "ToastTitle";

// ── Toast Description ──────────────────────────────────────────────────────

export interface ToastDescriptionProps {
  /** Additional CSS classes */
  className?: string;
  children?: React.ReactNode;
}

/**
 * A description providing additional context for the toast.
 */
export function ToastDescription({ className, children }: ToastDescriptionProps) {
  return (
    <BaseToast.Description
      className={[
        "mt-1 text-sm text-content-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseToast.Description>
  );
}

ToastDescription.displayName = "ToastDescription";

// ── Toast Close ────────────────────────────────────────────────────────────

export interface ToastCloseProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * A close button (X icon) that dismisses the toast.
 */
export function ToastClose({ className }: ToastCloseProps) {
  return (
    <BaseToast.Close
      aria-label="Close toast"
      className={[
        "flex-shrink-0 mt-0.5 p-1 rounded-full",
        "text-content-tertiary",
        "transition-colors duration-[200ms]",
        "hover:text-content-primary hover:bg-surface-hover",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-border-focus focus-visible:ring-offset-2",
        "focus-visible:ring-offset-surface-secondary",
        "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CloseIcon className="size-4" aria-hidden />
    </BaseToast.Close>
  );
}

ToastClose.displayName = "ToastClose";

// ── Toast Action ───────────────────────────────────────────────────────────

export interface ToastActionProps {
  /** Additional CSS classes */
  className?: string;
  children?: React.ReactNode;
}

/**
 * An action button within the toast (e.g. "Undo", "View cart").
 */
export function ToastAction({ className, children }: ToastActionProps) {
  return (
    <BaseToast.Action
      className={[
        "mt-2 inline-flex items-center text-sm font-medium",
        "text-content-brand",
        "transition-colors duration-[200ms]",
        "hover:text-accent-secondary",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-border-focus",
        "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseToast.Action>
  );
}

ToastAction.displayName = "ToastAction";

// ── useToast hook (re-export) ──────────────────────────────────────────────

/**
 * Returns the list of toasts and methods to add/close/update them.
 * Must be called within a `<ToastProvider>`.
 */
export const useToast = BaseToast.useToastManager;

/**
 * Creates a global toast manager for use outside React components.
 */
export const createToastManager = BaseToast.createToastManager;
