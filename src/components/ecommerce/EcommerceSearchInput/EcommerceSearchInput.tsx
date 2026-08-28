import * as React from "react";
import { CloseIcon, SearchIcon } from "../../../icons";
import { Input, type InputProps } from "../../Input/Input";

// ── Types ──────────────────────────────────────────────────────────────────

export interface EcommerceSearchInputProps
  extends Omit<InputProps, "type" | "leadingIcon" | "trailingIcon"> {
  /** Icon inside the field on the left — defaults to a search glyph */
  leadingIcon?: React.ReactNode;
  /** Accessible label for the clear control */
  clearLabel?: string;
  /** Called after the field is cleared */
  onClear?: () => void;
}

// ── Component ──────────────────────────────────────────────────────────────

/**
 * Storefront search field built on **`Input`**: magnifier by default,
 * marketplace-oriented placeholder and accessible name unless you pass `label` / overrides.
 * Shows a **Hugeicons** clear control when the field has a value.
 */
export const EcommerceSearchInput = React.forwardRef<
  HTMLInputElement,
  EcommerceSearchInputProps
>(function EcommerceSearchInput(
  {
    leadingIcon,
    placeholder = "Search products…",
    label,
    className,
    "aria-label": ariaLabel,
    value: valueProp,
    defaultValue,
    onChange,
    clearLabel = "Clear search",
    onClear,
    ...props
  },
  ref,
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mergedRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    String(defaultValue ?? ""),
  );
  const value = isControlled
    ? String(valueProp ?? "")
    : uncontrolledValue;
  const hasValue = value.length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value);
    }
    onChange?.(event);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const input = inputRef.current;
    if (!input) return;

    if (!isControlled) {
      setUncontrolledValue("");
      input.value = "";
    }

    const changeEvent = {
      target: input,
      currentTarget: input,
    } as React.ChangeEvent<HTMLInputElement>;
    Object.defineProperty(changeEvent.target, "value", {
      value: "",
      configurable: true,
    });

    onChange?.(changeEvent);
    onClear?.();
    input.focus();
  };

  const icon =
    leadingIcon ?? <SearchIcon className="size-full" aria-hidden />;

  const clearButton = hasValue ? (
    <button
      type="button"
      onClick={handleClear}
      className="flex size-full items-center justify-center rounded-full text-content-tertiary transition-colors hover:text-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      aria-label={clearLabel}
    >
      <CloseIcon className="size-full" aria-hidden />
    </button>
  ) : undefined;

  return (
    <Input
      ref={mergedRef}
      type="text"
      role="searchbox"
      enterKeyHint="search"
      label={label}
      leadingIcon={icon}
      trailingIcon={clearButton}
      placeholder={placeholder}
      aria-label={label ? undefined : (ariaLabel ?? "Search products")}
      className={className}
      value={isControlled ? valueProp : undefined}
      defaultValue={isControlled ? undefined : defaultValue}
      onChange={handleChange}
      {...props}
    />
  );
});

EcommerceSearchInput.displayName = "EcommerceSearchInput";
