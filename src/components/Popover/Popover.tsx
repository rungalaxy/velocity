import * as React from "react";
import { Popover as BasePopover } from "@base-ui-components/react/popover";
import { CloseIcon } from "../../icons";

type BasePopoverPopupProps = React.ComponentPropsWithoutRef<
  typeof BasePopover.Popup
>;

// ── Types ──────────────────────────────────────────────────────────────────

export type PopoverSide = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  /** Whether the popover is currently open (controlled). */
  open?: boolean;
  /** Whether the popover is initially open (uncontrolled). */
  defaultOpen?: boolean;
  /** Callback fired when the popover opens or closes. */
  onOpenChange?: (
    open: boolean,
    eventDetails: BasePopover.Root.ChangeEventDetails,
  ) => void;
  /** Callback fired after open/close animations complete. */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Modal behaviour.
   * - `true`: focus-trapped, scroll-locked, outside interactions disabled
   * - `false`: non-modal
   * - `'trap-focus'`: focus-trapped only
   * @default false
   */
  modal?: boolean | "trap-focus";
  /** Popover content — typically `PopoverTrigger` + `PopoverPortal`. */
  children?: React.ReactNode;
}

export interface PopoverTriggerProps {
  /** Trigger content — usually a `Button`. */
  children?: React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
  /**
   * Render as a custom element (e.g. `<Button />`).
   * Avoids nested `<button>` elements when composing with other button components.
   */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
  /** Whether the popover should also open when the trigger is hovered. */
  openOnHover?: boolean;
  /** How long to wait before opening on hover (ms). Requires `openOnHover`. */
  delay?: number;
  /** How long to wait before closing after hover ends (ms). Requires `openOnHover`. */
  closeDelay?: number;
}

export interface PopoverPortalProps {
  /** Keep portal mounted while hidden. */
  keepMounted?: boolean;
  /** Content rendered inside the portal. */
  children?: React.ReactNode;
}

export interface PopoverPositionerProps {
  /** Which side of the anchor to position the popover against. */
  side?: PopoverSide;
  /** Distance between the anchor and the popup in pixels. */
  sideOffset?: number;
  /** How to align the popup relative to the specified side. */
  align?: "start" | "center" | "end";
  /** Additional offset along the alignment axis in pixels. */
  alignOffset?: number;
  /**
   * Position against this element instead of the nearest `PopoverTrigger`.
   * Use for “anchored” panels built from plain inputs (e.g. search suggestions).
   */
  anchor?: React.RefObject<HTMLElement | null>;
  /** Additional CSS classes. */
  className?: string;
  /** Positioner content — typically `PopoverPopup`. */
  children?: React.ReactNode;
}

export interface PopoverPopupProps
  extends Pick<BasePopoverPopupProps, "initialFocus" | "finalFocus"> {
  /** Additional CSS classes. */
  className?: string;
  /** Inline styles (e.g. match anchor width for search suggestions). */
  style?: React.CSSProperties;
  /** Popup content. */
  children?: React.ReactNode;
}

export interface PopoverTitleProps {
  /** Additional CSS classes. */
  className?: string;
  /** Title content. */
  children?: React.ReactNode;
}

export interface PopoverDescriptionProps {
  /** Additional CSS classes. */
  className?: string;
  /** Description content. */
  children?: React.ReactNode;
}

export interface PopoverCloseProps {
  /** Additional CSS classes. */
  className?: string;
  /** Close button content (defaults to an X icon). */
  children?: React.ReactNode;
}

// ── Popover (Root) ─────────────────────────────────────────────────────────

export function Popover({
  open,
  defaultOpen,
  onOpenChange,
  onOpenChangeComplete,
  modal = false,
  children,
}: PopoverProps) {
  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      modal={modal}
    >
      {children}
    </BasePopover.Root>
  );
}

Popover.displayName = "Popover";

// ── PopoverTrigger ─────────────────────────────────────────────────────────

export function PopoverTrigger({
  children,
  className,
  render,
  openOnHover,
  delay,
  closeDelay,
}: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger
      className={["cursor-pointer", className].filter(Boolean).join(" ")}
      render={render}
      openOnHover={openOnHover}
      delay={delay}
      closeDelay={closeDelay}
    >
      {children}
    </BasePopover.Trigger>
  );
}

PopoverTrigger.displayName = "PopoverTrigger";

// ── PopoverPortal ──────────────────────────────────────────────────────────

export function PopoverPortal({ keepMounted, children }: PopoverPortalProps) {
  return (
    <BasePopover.Portal keepMounted={keepMounted}>
      {children}
    </BasePopover.Portal>
  );
}

PopoverPortal.displayName = "PopoverPortal";

// ── PopoverPositioner ──────────────────────────────────────────────────────

export function PopoverPositioner({
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset,
  anchor,
  className,
  children,
}: PopoverPositionerProps) {
  return (
    <BasePopover.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      anchor={anchor}
      className={className}
    >
      {children}
    </BasePopover.Positioner>
  );
}

PopoverPositioner.displayName = "PopoverPositioner";

// ── PopoverPopup ───────────────────────────────────────────────────────────

export function PopoverPopup({
  className,
  style,
  children,
  initialFocus,
  finalFocus,
}: PopoverPopupProps) {
  return (
    <BasePopover.Popup
      initialFocus={initialFocus}
      finalFocus={finalFocus}
      className={[
        "bg-surface-primary border border-border-default rounded-xl shadow-lg",
        "p-4 outline-none",
        // Match Dialog: opacity-only enter/exit — avoids close jank from scale + transform
        "will-change-opacity transition-opacity duration-[200ms]",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </BasePopover.Popup>
  );
}

PopoverPopup.displayName = "PopoverPopup";

// ── PopoverTitle ───────────────────────────────────────────────────────────

export function PopoverTitle({ className, children }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      className={["text-base font-semibold text-content-primary", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BasePopover.Title>
  );
}

PopoverTitle.displayName = "PopoverTitle";

// ── PopoverDescription ─────────────────────────────────────────────────────

export function PopoverDescription({
  className,
  children,
}: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={["mt-1 text-sm text-content-secondary", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </BasePopover.Description>
  );
}

PopoverDescription.displayName = "PopoverDescription";

// ── PopoverClose ───────────────────────────────────────────────────────────

export function PopoverClose({ className, children }: PopoverCloseProps) {
  return (
    <BasePopover.Close
      className={[
        "absolute top-3 right-3",
        "inline-flex items-center justify-center",
        "size-7 rounded-full",
        "text-content-secondary",
        "cursor-pointer",
        "transition-colors duration-[200ms]",
        "hover:bg-surface-hover hover:text-content-primary",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-border-focus focus-visible:ring-offset-2",
        "focus-visible:ring-offset-surface-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children ?? <CloseIcon className="size-4" aria-hidden />}
    </BasePopover.Close>
  );
}

PopoverClose.displayName = "PopoverClose";
