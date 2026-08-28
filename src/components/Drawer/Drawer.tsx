import * as React from "react";
import { CloseIcon } from "../../icons";
import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";

// ── Types ──────────────────────────────────────────────────────────────────

export type DrawerSide = "left" | "right";

export interface DrawerProps {
  /** Whether the drawer is currently open (controlled). */
  open?: boolean;
  /** Whether the drawer is initially open (uncontrolled). */
  defaultOpen?: boolean;
  /** Callback fired when the drawer opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Which side the drawer slides in from. */
  side?: DrawerSide;
  /** Whether the drawer is modal. */
  modal?: boolean | "trap-focus";
  children?: React.ReactNode;
}

export interface DrawerTriggerProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Render as a custom element to avoid nested `<button>` when composing
   * with other button components like `<Button />`.
   */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
}

export interface DrawerPortalProps {
  /** Whether to keep the portal mounted while hidden. */
  keepMounted?: boolean;
  children?: React.ReactNode;
}

export interface DrawerBackdropProps {
  className?: string;
}

export interface DrawerPopupProps {
  /** Which side the drawer slides in from. Overrides the root-level `side`. */
  side?: DrawerSide;
  className?: string;
  /** Classes for the inner scrollable wrapper (default padding: `p-6`). */
  contentClassName?: string;
  children?: React.ReactNode;
}

export interface DrawerTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export interface DrawerDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export interface DrawerCloseProps {
  children?: React.ReactNode;
  className?: string;
}

// ── Context for side prop ──────────────────────────────────────────────────

const DrawerContext = React.createContext<DrawerSide>("right");

// ── Style maps ─────────────────────────────────────────────────────────────

const sideClasses: Record<DrawerSide, string> = {
  left: [
    "left-0 top-0 bottom-0 border-r",
    "data-[starting-style]:-translate-x-full",
    "data-[ending-style]:-translate-x-full",
  ].join(" "),
  right: [
    "right-0 top-0 bottom-0 border-l",
    "data-[starting-style]:translate-x-full",
    "data-[ending-style]:translate-x-full",
  ].join(" "),
};

// ── Drawer (Root) ──────────────────────────────────────────────────────────

export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  side = "right",
  modal = true,
  children,
}: DrawerProps) {
  return (
    <DrawerContext.Provider value={side}>
      <BaseDialog.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        modal={modal}
      >
        {children}
      </BaseDialog.Root>
    </DrawerContext.Provider>
  );
}

Drawer.displayName = "Drawer";

// ── DrawerTrigger ──────────────────────────────────────────────────────────

export function DrawerTrigger({ children, className, render }: DrawerTriggerProps) {
  return (
    <BaseDialog.Trigger
      className={["cursor-pointer", className].filter(Boolean).join(" ")}
      render={render}
    >
      {children}
    </BaseDialog.Trigger>
  );
}

DrawerTrigger.displayName = "DrawerTrigger";

// ── DrawerPortal ───────────────────────────────────────────────────────────

export function DrawerPortal({ keepMounted, children }: DrawerPortalProps) {
  return (
    <BaseDialog.Portal keepMounted={keepMounted}>{children}</BaseDialog.Portal>
  );
}

DrawerPortal.displayName = "DrawerPortal";

// ── DrawerBackdrop ─────────────────────────────────────────────────────────

export function DrawerBackdrop({ className }: DrawerBackdropProps) {
  return (
    <BaseDialog.Backdrop
      className={[
        "fixed inset-0 bg-surface-overlay",
        "transition-opacity duration-[300ms]",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

DrawerBackdrop.displayName = "DrawerBackdrop";

// ── DrawerPopup ────────────────────────────────────────────────────────────

export function DrawerPopup({
  side: sideProp,
  className,
  contentClassName,
  children,
}: DrawerPopupProps) {
  const contextSide = React.useContext(DrawerContext);
  const side = sideProp ?? contextSide;

  return (
    <BaseDialog.Popup
      className={[
        "fixed h-full",
        "w-[min(400px,80vw)]",
        "bg-surface-primary border-border-default shadow-lg",
        sideClasses[side],
        "transition-transform duration-[300ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        "focus-visible:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "flex h-full flex-col overflow-y-auto",
          contentClassName ?? "p-6",
        ].join(" ")}
      >
        {children}
      </div>
    </BaseDialog.Popup>
  );
}

DrawerPopup.displayName = "DrawerPopup";

// ── DrawerTitle ────────────────────────────────────────────────────────────

export function DrawerTitle({ children, className }: DrawerTitleProps) {
  return (
    <BaseDialog.Title
      className={[
        "text-lg font-semibold text-content-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseDialog.Title>
  );
}

DrawerTitle.displayName = "DrawerTitle";

// ── DrawerDescription ──────────────────────────────────────────────────────

export function DrawerDescription({
  children,
  className,
}: DrawerDescriptionProps) {
  return (
    <BaseDialog.Description
      className={[
        "mt-1 text-sm text-content-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BaseDialog.Description>
  );
}

DrawerDescription.displayName = "DrawerDescription";

// ── DrawerClose ────────────────────────────────────────────────────────────

export function DrawerClose({ children, className }: DrawerCloseProps) {
  return (
    <BaseDialog.Close
      className={[
        "absolute top-4 right-4",
        "inline-flex items-center justify-center",
        "h-8 w-8 rounded-full",
        "text-content-secondary bg-transparent",
        "cursor-pointer transition-colors duration-[200ms]",
        "hover:bg-surface-hover hover:text-content-primary",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-border-focus focus-visible:ring-offset-2",
        "focus-visible:ring-offset-surface-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children ?? <CloseIcon className="h-4 w-4" aria-hidden />}
    </BaseDialog.Close>
  );
}

DrawerClose.displayName = "DrawerClose";
