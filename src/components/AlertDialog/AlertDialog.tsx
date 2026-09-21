import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog';
import { Button } from '../Button/Button';
import type { ButtonColorScheme } from '../Button/Button';

// ── Types ──────────────────────────────────────────────────────────────────

export type AlertDialogSize = 'sm' | 'md' | 'lg';

/** Confirming action colour. `danger` is for destructive confirms. */
export type AlertDialogActionIntent = Extract<ButtonColorScheme, 'primary' | 'danger'>;

export interface AlertDialogProps {
  /** Whether the alert dialog is currently open (controlled). */
  open?: boolean;
  /** Whether the alert dialog is initially open (uncontrolled). */
  defaultOpen?: boolean;
  /**
   * Callback fired when the alert dialog opens or closes.
   * Escape closes the dialog (`eventDetails.reason === 'escape-key'`).
   * Outside clicks do not close it — call `eventDetails.cancel()` to keep it open on Escape as well.
   */
  onOpenChange?: (
    open: boolean,
    eventDetails: BaseAlertDialog.Root.ChangeEventDetails,
  ) => void;
  /** Callback fired after open/close animations complete. */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Visual width of the dialog popup.
   * Passed through context so `AlertDialogPopup` can omit its own `size`.
   * @default 'sm'
   */
  size?: AlertDialogSize;
  /** Alert dialog content — typically `AlertDialogTrigger` + `AlertDialogPortal`. */
  children?: React.ReactNode;
}

export interface AlertDialogTriggerProps {
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
    | ((props: React.ComponentProps<'button'>) => React.ReactElement);
}

export interface AlertDialogPortalProps {
  /** Keep the portal mounted while hidden. */
  keepMounted?: boolean;
  /** Content rendered inside the portal. */
  children?: React.ReactNode;
}

export interface AlertDialogBackdropProps {
  /** Additional CSS classes. */
  className?: string;
}

export interface AlertDialogPopupProps {
  /**
   * Visual size of the popup.
   * Falls back to the `size` set on `AlertDialog`.
   */
  size?: AlertDialogSize;
  /** Additional CSS classes. */
  className?: string;
  /**
   * Element to focus when the dialog opens.
   * Defaults to the first tabbable control (place Cancel before the primary action).
   */
  initialFocus?: React.ComponentProps<typeof BaseAlertDialog.Popup>['initialFocus'];
  /**
   * Element to focus when the dialog closes.
   * Defaults to the trigger that opened it.
   */
  finalFocus?: React.ComponentProps<typeof BaseAlertDialog.Popup>['finalFocus'];
  /** Popup content — title, description, optional custom content, and actions. */
  children?: React.ReactNode;
}

export interface AlertDialogTitleProps {
  /** Additional CSS classes. */
  className?: string;
  /** Title content. Labels the dialog via `aria-labelledby`. */
  children?: React.ReactNode;
}

export interface AlertDialogDescriptionProps {
  /** Additional CSS classes. */
  className?: string;
  /** Description content. Describes the dialog via `aria-describedby`. */
  children?: React.ReactNode;
}

export interface AlertDialogActionsProps {
  /** Additional CSS classes. */
  className?: string;
  /** Cancel and primary actions. */
  children?: React.ReactNode;
}

export interface AlertDialogCloseProps {
  /** Additional CSS classes. */
  className?: string;
  /** Close control content. */
  children?: React.ReactNode;
  /**
   * Accessible name when the control has no visible text
   * (for example an icon-only button).
   */
  'aria-label'?: string;
  /** Called when the control is pressed, before the dialog closes. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Prevent the control from closing the dialog. */
  disabled?: boolean;
}

export interface AlertDialogCancelProps {
  /** Additional CSS classes. */
  className?: string;
  /** Cancel label. */
  children?: React.ReactNode;
  /** Called when Cancel is pressed, before the dialog closes. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Prevent Cancel from closing the dialog. */
  disabled?: boolean;
}

export interface AlertDialogActionProps {
  /**
   * Confirming action colour.
   * @default 'primary'
   */
  intent?: AlertDialogActionIntent;
  /** Additional CSS classes. */
  className?: string;
  /** Primary action label. */
  children?: React.ReactNode;
  /** Called when the action is pressed, before the dialog closes. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Prevent the action from closing the dialog. */
  disabled?: boolean;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const popupSizeClasses: Record<AlertDialogSize, string> = {
  sm: 'w-full max-w-[400px]',
  md: 'w-full max-w-[500px]',
  lg: 'w-full max-w-[640px]',
};

const AlertDialogSizeContext = React.createContext<AlertDialogSize>('sm');

// ── AlertDialog (Root) ─────────────────────────────────────────────────────

export function AlertDialog({
  open,
  defaultOpen,
  onOpenChange,
  onOpenChangeComplete,
  size = 'sm',
  children,
}: AlertDialogProps) {
  return (
    <AlertDialogSizeContext.Provider value={size}>
      <BaseAlertDialog.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
      >
        {children}
      </BaseAlertDialog.Root>
    </AlertDialogSizeContext.Provider>
  );
}

AlertDialog.displayName = 'AlertDialog';

// ── AlertDialogTrigger ─────────────────────────────────────────────────────

export const AlertDialogTrigger = React.forwardRef<
  React.ComponentRef<typeof BaseAlertDialog.Trigger>,
  AlertDialogTriggerProps
>(function AlertDialogTrigger({ children, className, render }, ref) {
  return (
    <BaseAlertDialog.Trigger ref={ref} className={className} render={render}>
      {children}
    </BaseAlertDialog.Trigger>
  );
});

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

// ── AlertDialogPortal ──────────────────────────────────────────────────────

export function AlertDialogPortal({ keepMounted, children }: AlertDialogPortalProps) {
  return (
    <BaseAlertDialog.Portal keepMounted={keepMounted}>{children}</BaseAlertDialog.Portal>
  );
}

AlertDialogPortal.displayName = 'AlertDialogPortal';

// ── AlertDialogBackdrop ────────────────────────────────────────────────────

export const AlertDialogBackdrop = React.forwardRef<
  React.ComponentRef<typeof BaseAlertDialog.Backdrop>,
  AlertDialogBackdropProps
>(function AlertDialogBackdrop({ className }, ref) {
  return (
    <BaseAlertDialog.Backdrop
      ref={ref}
      className={[
        'fixed inset-0 bg-surface-overlay',
        'will-change-opacity transition-opacity duration-[200ms] motion-reduce:transition-none',
        'data-[starting-style]:opacity-0',
        'data-[ending-style]:opacity-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
});

AlertDialogBackdrop.displayName = 'AlertDialogBackdrop';

// ── AlertDialogPopup ───────────────────────────────────────────────────────

export const AlertDialogPopup = React.forwardRef<
  React.ComponentRef<typeof BaseAlertDialog.Popup>,
  AlertDialogPopupProps
>(function AlertDialogPopup(
  { size, className, initialFocus, finalFocus, children },
  ref,
) {
  const contextSize = React.useContext(AlertDialogSizeContext);
  const resolvedSize = size ?? contextSize;

  return (
    <BaseAlertDialog.Popup
      ref={ref}
      initialFocus={initialFocus}
      finalFocus={finalFocus}
      aria-modal="true"
      className={[
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'bg-surface-primary border border-border-default shadow-lg',
        'rounded-2xl p-6',
        'max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-border-focus focus-visible:ring-offset-2',
        'focus-visible:ring-offset-surface-primary',
        'will-change-opacity transition-opacity duration-[200ms] motion-reduce:transition-none',
        'data-[starting-style]:opacity-0',
        'data-[ending-style]:opacity-0',
        popupSizeClasses[resolvedSize],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BaseAlertDialog.Popup>
  );
});

AlertDialogPopup.displayName = 'AlertDialogPopup';

// ── AlertDialogTitle ───────────────────────────────────────────────────────

export const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof BaseAlertDialog.Title>,
  AlertDialogTitleProps
>(function AlertDialogTitle({ className, children }, ref) {
  return (
    <BaseAlertDialog.Title
      ref={ref}
      className={['text-lg font-semibold text-content-primary', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BaseAlertDialog.Title>
  );
});

AlertDialogTitle.displayName = 'AlertDialogTitle';

// ── AlertDialogDescription ─────────────────────────────────────────────────

export const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof BaseAlertDialog.Description>,
  AlertDialogDescriptionProps
>(function AlertDialogDescription({ className, children }, ref) {
  return (
    <BaseAlertDialog.Description
      ref={ref}
      className={['mt-2 text-sm text-content-secondary', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BaseAlertDialog.Description>
  );
});

AlertDialogDescription.displayName = 'AlertDialogDescription';

// ── AlertDialogActions ─────────────────────────────────────────────────────

export const AlertDialogActions = React.forwardRef<HTMLDivElement, AlertDialogActionsProps>(
  function AlertDialogActions({ className, children }, ref) {
    return (
      <div
        ref={ref}
        className={['mt-6 flex flex-wrap justify-end gap-3', className]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    );
  },
);

AlertDialogActions.displayName = 'AlertDialogActions';

// ── AlertDialogClose ───────────────────────────────────────────────────────

export const AlertDialogClose = React.forwardRef<
  React.ComponentRef<typeof BaseAlertDialog.Close>,
  AlertDialogCloseProps
>(function AlertDialogClose({ className, children, onClick, disabled, 'aria-label': ariaLabel }, ref) {
  return (
    <BaseAlertDialog.Close
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        'cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-border-focus focus-visible:ring-offset-2',
        'focus-visible:ring-offset-surface-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </BaseAlertDialog.Close>
  );
});

AlertDialogClose.displayName = 'AlertDialogClose';

// ── AlertDialogCancel ──────────────────────────────────────────────────────

export const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof BaseAlertDialog.Close>,
  AlertDialogCancelProps
>(function AlertDialogCancel({ className, children, onClick, disabled }, ref) {
  return (
    <BaseAlertDialog.Close
      ref={ref}
      className={className}
      onClick={onClick}
      disabled={disabled}
      render={<Button variant="outline" colorScheme="neutral" size="md" />}
    >
      {children}
    </BaseAlertDialog.Close>
  );
});

AlertDialogCancel.displayName = 'AlertDialogCancel';

// ── AlertDialogAction ──────────────────────────────────────────────────────

export const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof BaseAlertDialog.Close>,
  AlertDialogActionProps
>(function AlertDialogAction(
  { intent = 'primary', className, children, onClick, disabled },
  ref,
) {
  return (
    <BaseAlertDialog.Close
      ref={ref}
      className={className}
      onClick={onClick}
      disabled={disabled}
      render={<Button variant="solid" colorScheme={intent} size="md" />}
    >
      {children}
    </BaseAlertDialog.Close>
  );
});

AlertDialogAction.displayName = 'AlertDialogAction';
