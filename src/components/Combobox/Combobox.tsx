import * as React from 'react';
import { Combobox as BaseCombobox } from '@base-ui-components/react/combobox';
import { ArrowDownIcon, CheckIcon } from '../../icons';
import {
  fieldBorderClass,
  fieldFocusWithinDefault,
  fieldFocusWithinError,
  fieldListItemMotion,
  fieldPopupMotion,
  fieldShellTransition,
} from '../fieldStyles';

// ── Types ──────────────────────────────────────────────────────────────────

export type ComboboxSize = 'sm' | 'md' | 'lg';

export interface ComboboxProps {
  /** Visual size of the combobox */
  size?: ComboboxSize;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Shows error border and error-styled helper text */
  error?: boolean;
  /** Placeholder text shown in the input when nothing is typed */
  placeholder?: string;
  /** Accessible label rendered above the combobox */
  label?: string;
  /** Helper text shown below the combobox */
  helperText?: string;
  /** The controlled selected value */
  value?: string;
  /** The default selected value (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when the selected value changes */
  onValueChange?: (value: string | null) => void;
  /** Identifies the field when a form is submitted */
  name?: string;
  /** ComboboxOption and ComboboxGroup children */
  children?: React.ReactNode;
  /** Additional CSS classes applied to the input wrapper */
  className?: string;
}

export interface ComboboxOptionProps {
  /** Unique value that identifies this option */
  value: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Option display text */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ComboboxGroupProps {
  /** Accessible label for the option group */
  label: string;
  /** ComboboxOption children */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function collectLabels(node: React.ReactNode): Record<string, string> {
  const map: Record<string, string> = {};
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === ComboboxOption) {
      const props = child.props as ComboboxOptionProps;
      if (typeof props.children === 'string') {
        map[props.value] = props.children;
      }
    } else if (child.type === ComboboxGroup) {
      const props = child.props as ComboboxGroupProps;
      Object.assign(map, collectLabels(props.children));
    }
  });
  return map;
}

function filterChildren(
  node: React.ReactNode,
  query: string,
  labelMap: Record<string, string>,
): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === ComboboxOption) {
      const props = child.props as ComboboxOptionProps;
      const label = labelMap[props.value] ?? String(props.children ?? '');
      return label.toLowerCase().includes(query.toLowerCase()) ? child : null;
    }
    if (child.type === ComboboxGroup) {
      const props = child.props as ComboboxGroupProps;
      const filtered = React.Children.toArray(
        filterChildren(props.children, query, labelMap),
      ).filter(Boolean);
      if (filtered.length === 0) return null;
      return React.cloneElement(child as React.ReactElement<ComboboxGroupProps>, {
        children: filtered,
      });
    }
    return child;
  });
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<
  ComboboxSize,
  { wrapper: string; textSize: string; paddingLeft: string; label: string; icon: string }
> = {
  sm: {
    wrapper: 'h-8',
    textSize: 'text-sm',
    paddingLeft: 'pl-2.5',
    label: 'text-xs',
    icon: 'size-3.5',
  },
  md: {
    wrapper: 'h-10',
    textSize: 'text-sm',
    paddingLeft: 'pl-3',
    label: 'text-sm',
    icon: 'size-4',
  },
  lg: {
    wrapper: 'h-[48px]',
    textSize: 'text-sm',
    paddingLeft: 'pl-4',
    label: 'text-sm',
    icon: 'size-5',
  },
};

// ── Combobox ────────────────────────────────────────────────────────────────

export function Combobox({
  size = 'md',
  disabled,
  error = false,
  placeholder,
  label,
  helperText,
  value,
  defaultValue,
  onValueChange,
  name,
  children,
  className,
}: ComboboxProps) {
  const inputId = React.useId();
  const sc = sizeClasses[size];
  const [inputQuery, setInputQuery] = React.useState('');
  const labelMap = React.useMemo(() => collectLabels(children), [children]);
  const itemToStringLabel = React.useCallback(
    (val: string) => labelMap[val] ?? val,
    [labelMap],
  );
  const visibleChildren = React.useMemo(
    () => (inputQuery ? filterChildren(children, inputQuery, labelMap) : children),
    [children, inputQuery, labelMap],
  );

  const wrapperClasses = [
    'flex items-center overflow-hidden',
    'bg-surface-primary',
    'border',
    fieldBorderClass(error),
    'rounded-full',
    fieldShellTransition,
    error ? fieldFocusWithinError : fieldFocusWithinDefault,
    sc.wrapper,
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'flex-1 min-w-0 self-center bg-transparent outline-none appearance-none',
    'leading-none py-0 -translate-y-px',
    'text-content-primary placeholder:text-content-tertiary',
    sc.textSize,
    sc.paddingLeft,
  ].join(' ');

  const triggerClasses = [
    'flex items-center justify-center shrink-0 h-full pr-2.5 pl-1',
    'text-content-tertiary',
    'cursor-pointer outline-none',
    'transition-transform duration-fast ease-standard motion-safe:active:scale-95',
  ].join(' ');

  const popupClasses = [
    'bg-surface-primary border border-border-default rounded-xl shadow-lg',
    'overflow-y-auto',
    'outline-none',
    fieldPopupMotion,
  ].join(' ');

  return (
    <BaseCombobox.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      itemToStringLabel={itemToStringLabel}
      onInputValueChange={setInputQuery}
      onOpenChange={(open) => { if (!open) setInputQuery(''); }}
    >
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={['font-medium text-content-primary', sc.label].join(' ')}
          >
            {label}
          </label>
        )}
        <div className={wrapperClasses}>
          <BaseCombobox.Input
            id={inputId}
            placeholder={placeholder}
            className={inputClasses}
          />
          <BaseCombobox.Trigger className={triggerClasses} aria-label="Toggle options">
            <ArrowDownIcon className={sc.icon} aria-hidden />
          </BaseCombobox.Trigger>
        </div>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner sideOffset={4} align="start">
            <BaseCombobox.Popup className={popupClasses}>
              <BaseCombobox.List className="p-1">
                <BaseCombobox.Empty className="px-2 py-3 text-sm text-content-tertiary text-center select-none">
                  No results found.
                </BaseCombobox.Empty>
                {visibleChildren}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
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
    </BaseCombobox.Root>
  );
}

Combobox.displayName = 'Combobox';

// ── ComboboxOption ──────────────────────────────────────────────────────────

export function ComboboxOption({
  value,
  disabled,
  children,
  className,
}: ComboboxOptionProps) {
  return (
    <BaseCombobox.Item
      value={value}
      disabled={disabled}
      className={[
        'flex items-center gap-2 rounded-lg py-2 px-2 text-sm',
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
        <BaseCombobox.ItemIndicator>
          <CheckIcon className="size-full" aria-hidden />
        </BaseCombobox.ItemIndicator>
      </span>
      {children}
    </BaseCombobox.Item>
  );
}

ComboboxOption.displayName = 'ComboboxOption';

// ── ComboboxGroup ───────────────────────────────────────────────────────────

export function ComboboxGroup({ label, children, className }: ComboboxGroupProps) {
  return (
    <BaseCombobox.Group className={className}>
      <BaseCombobox.GroupLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        {label}
      </BaseCombobox.GroupLabel>
      {children}
    </BaseCombobox.Group>
  );
}

ComboboxGroup.displayName = 'ComboboxGroup';
