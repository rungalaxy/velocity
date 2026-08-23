import * as React from 'react';
import { Select as BaseSelect } from '@base-ui-components/react/select';
import { ArrowDownIcon, CheckIcon } from '../../icons';
import {
  fieldBorderClass,
  fieldFocusVisibleDefault,
  fieldFocusVisibleError,
  fieldListItemMotion,
  fieldPopupMotion,
  fieldShellTransition,
  fieldTriggerPressMotion,
} from '../fieldStyles';

// ── Types ──────────────────────────────────────────────────────────────────

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps {
  /** Visual size of the select trigger */
  size?: SelectSize;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Shows error border and error-styled helper text */
  error?: boolean;
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Accessible label rendered above the select */
  label?: string;
  /** Helper text shown below the select */
  helperText?: string;
  /** The controlled value */
  value?: string;
  /** The default value (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when the selected value changes */
  onValueChange?: (value: string) => void;
  /** Whether the field is required */
  required?: boolean;
  /** Identifies the field when a form is submitted */
  name?: string;
  /** SelectOption and SelectGroup children */
  children?: React.ReactNode;
  /** Additional CSS classes applied to the trigger button */
  className?: string;
}

export interface SelectOptionProps {
  /** Unique value that identifies this option */
  value: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Option display text */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface SelectGroupProps {
  /** Accessible label for the option group */
  label: string;
  /** SelectOption children */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const triggerSizeClasses: Record<
  SelectSize,
  { trigger: string; textSize: string; label: string; icon: string }
> = {
  sm: {
    trigger: 'h-8 px-2.5',
    textSize: 'text-sm',
    label: 'text-xs',
    icon: 'size-3.5',
  },
  md: {
    trigger: 'h-10 px-3',
    textSize: 'text-sm',
    label: 'text-sm',
    icon: 'size-4',
  },
  lg: {
    trigger: 'h-[48px] px-4',
    textSize: 'text-sm',
    label: 'text-sm',
    icon: 'size-5',
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────

function collectItems(
  node: React.ReactNode,
): Record<string, React.ReactNode> {
  const map: Record<string, React.ReactNode> = {};
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === SelectOption) {
      const props = child.props as SelectOptionProps;
      map[props.value] = props.children;
    } else if (child.type === SelectGroup) {
      const props = child.props as SelectGroupProps;
      Object.assign(map, collectItems(props.children));
    }
  });
  return map;
}

// ── Select ─────────────────────────────────────────────────────────────────

export function Select({
  size = 'md',
  disabled,
  error = false,
  placeholder,
  label,
  helperText,
  value,
  defaultValue,
  onValueChange,
  required,
  name,
  children,
  className,
}: SelectProps) {
  const generatedId = React.useId();
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue,
  );
  const currentValue = value !== undefined ? value : internalValue;
  const showPlaceholder = currentValue === undefined;
  const sc = triggerSizeClasses[size];
  const items = React.useMemo(() => collectItems(children), [children]);

  const handleValueChange = React.useCallback(
    (newValue: string | null) => {
      if (newValue !== null) {
        setInternalValue(newValue);
        onValueChange?.(newValue);
      }
    },
    [onValueChange],
  );

  const triggerClasses = [
    'flex items-center w-full',
    'bg-surface-primary',
    'border',
    fieldBorderClass(error),
    'rounded-full',
    'cursor-pointer',
    fieldShellTransition,
    fieldTriggerPressMotion,
    'focus-visible:outline-none',
    error ? fieldFocusVisibleError : fieldFocusVisibleDefault,
    !error &&
      'data-[popup-open]:border-border-brand data-[popup-open]:ring-2 data-[popup-open]:ring-border-focus',
    error &&
      'data-[popup-open]:ring-2 data-[popup-open]:ring-state-error/40',
    'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
    sc.trigger,
    sc.textSize,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const popupClasses = [
    'bg-surface-primary border border-border-default rounded-xl shadow-lg',
    'p-1',
    'overflow-y-auto overflow-x-hidden',
    'outline-none',
    fieldPopupMotion,
    /* Floating UI `size` middleware sets --anchor-width on the positioner (inherited here) */
    'w-[var(--anchor-width)] min-w-[var(--anchor-width)] max-w-[var(--anchor-width)]',
  ].join(' ');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={generatedId}
          className={['font-medium text-content-primary', sc.label].join(' ')}
        >
          {label}
        </label>
      )}
      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        required={required}
        name={name}
        items={items}
        modal={false}
      >
        <BaseSelect.Trigger id={generatedId} className={triggerClasses}>
          {showPlaceholder ? (
            <span className="flex-1 text-left truncate text-content-tertiary">
              {placeholder}
            </span>
          ) : (
            <BaseSelect.Value className="flex-1 text-left truncate text-content-primary" />
          )}
          <BaseSelect.Icon className="ml-2 text-content-tertiary shrink-0">
            <ArrowDownIcon className={sc.icon} aria-hidden />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            sideOffset={4}
            align="start"
            alignItemWithTrigger={false}
            positionMethod="fixed"
            className="z-50"
          >
            <BaseSelect.Popup className={popupClasses}>
              {children}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {helperText && (
        <p
          className={[
            'text-xs',
            error ? 'text-feedback-negative' : 'text-content-tertiary',
          ].join(' ')}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

Select.displayName = 'Select';

// ── SelectOption ───────────────────────────────────────────────────────────

export function SelectOption({
  value,
  disabled,
  children,
  className,
}: SelectOptionProps) {
  return (
    <BaseSelect.Item
      value={value}
      disabled={disabled}
      className={[
        'flex min-w-0 items-center gap-2 rounded-lg py-2 px-2 text-sm',
        'cursor-pointer outline-none select-none',
        'text-content-primary',
        fieldListItemMotion,
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="flex items-center justify-center size-4 shrink-0 text-content-brand">
        <BaseSelect.ItemIndicator>
          <CheckIcon className="size-full" aria-hidden />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText className="min-w-0 flex-1 truncate">{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

SelectOption.displayName = 'SelectOption';

// ── SelectGroup ────────────────────────────────────────────────────────────

export function SelectGroup({
  label,
  children,
  className,
}: SelectGroupProps) {
  return (
    <BaseSelect.Group className={className}>
      <BaseSelect.GroupLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        {label}
      </BaseSelect.GroupLabel>
      {children}
    </BaseSelect.Group>
  );
}

SelectGroup.displayName = 'SelectGroup';
