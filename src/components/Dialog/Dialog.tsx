import * as React from 'react';
import { CloseIcon } from '../../icons';
import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';

// ── Types ──────────────────────────────────────────────────────────────────

export type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogProps {
  /** Whether the dialog is currently open (controlled) */
  open?: boolean;
  /** Whether the dialog is initially open (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback fired when the dialog opens or closes */
  onOpenChange?: (
    open: boolean,
    eventDetails: BaseDialog.Root.ChangeEventDetails,
  ) => void;
  /** Callback fired after open/close animations complete */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Modal behaviour.
   * - `true`: focus-trapped, scroll-locked, outside interactions disabled
   * - `false`: non-modal
   * - `'trap-focus'`: focus-trapped only
   * @default true
   */
  modal?: boolean | 'trap-focus';
  /** Dialog content — typically `DialogTrigger` + `DialogPortal` */
  children?: React.ReactNode;
}

export interface DialogTriggerProps {
  /** Trigger content — usually a `Button` */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /**
   * Render as a custom element (e.g. `<Button />`).
   * Avoids nested `<button>` elements when composing with other button components.
   */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<'button'>) => React.ReactElement);
}

export interface DialogPortalProps {
  /** Keep portal mounted while hidden */
  keepMounted?: boolean;
  /** Content rendered inside the portal */
  children?: React.ReactNode;
}

export interface DialogBackdropProps {
  /** Additional CSS classes */
  className?: string;
}

export interface DialogPopupProps {
  /** Visual size of the dialog popup */
  size?: DialogSize;
  /** Additional CSS classes */
  className?: string;
  /** Popup content */
  children?: React.ReactNode;
}

export interface DialogTitleProps {
  /** Additional CSS classes */
  className?: string;
  /** Title content */
  children?: React.ReactNode;
}

export interface DialogDescriptionProps {
  /** Additional CSS classes */
  className?: string;
  /** Description content */
  children?: React.ReactNode;
}

export interface DialogCloseProps {
  /** Additional CSS classes */
  className?: string;
  /** Close button content (defaults to an X icon) */
  children?: React.ReactNode;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const popupSizeClasses: Record<DialogSize, string> = {
  sm: 'w-[400px]',
  md: 'w-[500px]',
  lg: 'w-[640px]',
};

// ── Dialog (Root) ──────────────────────────────────────────────────────────

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  onOpenChangeComplete,
  modal,
  children,
}: DialogProps) {
  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      modal={modal}
    >
      {children}
    </BaseDialog.Root>
  );
}

Dialog.displayName = 'Dialog';

// ── DialogTrigger ──────────────────────────────────────────────────────────

export function DialogTrigger({ children, className, render }: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger className={className} render={render}>
      {children}
    </BaseDialog.Trigger>
  );
}

DialogTrigger.displayName = 'DialogTrigger';

// ── DialogPortal ───────────────────────────────────────────────────────────

export function DialogPortal({ keepMounted, children }: DialogPortalProps) {
  return (
    <BaseDialog.Portal keepMounted={keepMounted}>{children}</BaseDialog.Portal>
  );
}

DialogPortal.displayName = 'DialogPortal';

// ── DialogBackdrop ─────────────────────────────────────────────────────────

export function DialogBackdrop({ className }: DialogBackdropProps) {
  return (
    <BaseDialog.Backdrop
      className={[
        'fixed inset-0 bg-surface-overlay',
        'will-change-opacity transition-opacity duration-[200ms]',
        'data-[starting-style]:opacity-0',
        'data-[ending-style]:opacity-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

DialogBackdrop.displayName = 'DialogBackdrop';

// ── DialogPopup ────────────────────────────────────────────────────────────

export function DialogPopup({
  size = 'md',
  className,
  children,
}: DialogPopupProps) {
  return (
    <BaseDialog.Popup
      className={[
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'bg-surface-primary border border-border-default shadow-lg',
        'rounded-2xl p-6',
        'outline-none',
        'will-change-opacity transition-opacity duration-[200ms]',
        'data-[starting-style]:opacity-0',
        'data-[ending-style]:opacity-0',
        popupSizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BaseDialog.Popup>
  );
}

DialogPopup.displayName = 'DialogPopup';

// ── DialogTitle ────────────────────────────────────────────────────────────

export function DialogTitle({ className, children }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      className={[
        'text-lg font-semibold text-content-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BaseDialog.Title>
  );
}

DialogTitle.displayName = 'DialogTitle';

// ── DialogDescription ──────────────────────────────────────────────────────

export function DialogDescription({
  className,
  children,
}: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={[
        'mt-2 text-sm text-content-secondary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BaseDialog.Description>
  );
}

DialogDescription.displayName = 'DialogDescription';

// ── DialogClose ────────────────────────────────────────────────────────────

export function DialogClose({ className, children }: DialogCloseProps) {
  return (
    <BaseDialog.Close
      className={[
        'absolute top-4 right-4',
        'inline-flex items-center justify-center',
        'size-8 rounded-full',
        'text-content-secondary',
        'cursor-pointer',
        'transition-colors duration-[200ms]',
        'hover:bg-surface-hover hover:text-content-primary',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-border-focus focus-visible:ring-offset-2',
        'focus-visible:ring-offset-surface-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children ?? <CloseIcon className="size-4" aria-hidden />}
    </BaseDialog.Close>
  );
}

DialogClose.displayName = 'DialogClose';
