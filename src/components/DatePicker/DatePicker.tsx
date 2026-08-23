import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
} from "../Popover/Popover";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
} from "../../icons";
import {
  fieldBorderClass,
  fieldFocusVisibleDefault,
  fieldFocusVisibleError,
  fieldShellTransition,
  fieldTriggerPressMotion,
} from "../fieldStyles";

// ── Types ──────────────────────────────────────────────────────────────────

export type DatePickerSize = "sm" | "md" | "lg";

/** Inclusive date range (`YYYY-MM-DD`, local). Always `start <= end`. */
export interface DateRangeValue {
  start: string;
  end: string;
}

interface DatePickerSharedProps {
  size?: DatePickerSize;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: boolean;
  locale?: string;
  weekStartsOn?: 0 | 1;
  className?: string;
}

export type DatePickerSingleProps = DatePickerSharedProps & {
  mode?: "single";
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  name?: string;
};

export type DatePickerRangeProps = DatePickerSharedProps & {
  mode: "range";
  value?: DateRangeValue | null;
  defaultValue?: DateRangeValue | null;
  onValueChange?: (value: DateRangeValue | null) => void;
  placeholder?: string;
  nameStart?: string;
  nameEnd?: string;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

// ── Date helpers ────────────────────────────────────────────────────────────

function toDateOnlyString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDateOnly(s: string): Date {
  const [y, mo, d] = s.split("-").map(Number);
  return new Date(y, mo - 1, d);
}

function compareDateOnly(a: string, b: string): number {
  return a.localeCompare(b);
}

function isDateInRange(
  dateStr: string,
  minDate?: string,
  maxDate?: string,
): boolean {
  if (minDate && compareDateOnly(dateStr, minDate) < 0) return false;
  if (maxDate && compareDateOnly(dateStr, maxDate) > 0) return false;
  return true;
}

function normalizeRange(a: string, b: string): DateRangeValue {
  if (compareDateOnly(a, b) <= 0) return { start: a, end: b };
  return { start: b, end: a };
}

function isStrictlyBetween(
  dateStr: string,
  start: string,
  end: string,
): boolean {
  return (
    compareDateOnly(dateStr, start) > 0 && compareDateOnly(dateStr, end) < 0
  );
}

function buildMonthCells(
  year: number,
  month: number,
  weekStartsOn: 0 | 1,
): Date[] {
  const first = new Date(year, month, 1);
  const firstDow = first.getDay();
  const offset = (firstDow - weekStartsOn + 7) % 7;
  const start = new Date(year, month, 1 - offset);
  const cells: Date[] = [];
  const cur = new Date(start);
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return cells;
}

// ── Styles ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<
  DatePickerSize,
  {
    wrapper: string;
    textSize: string;
    paddingX: string;
    label: string;
    icon: string;
    calText: string;
    calPad: string;
    dayCell: string;
    navBtn: string;
    headerGrid: string;
  }
> = {
  sm: {
    wrapper: "h-8",
    textSize: "text-sm",
    paddingX: "px-2.5",
    label: "text-xs",
    icon: "size-3.5",
    calText: "text-xs",
    calPad: "p-2.5",
    dayCell: "size-8",
    navBtn: "size-8",
    headerGrid: "grid-cols-[2rem_minmax(0,1fr)_2rem]",
  },
  md: {
    wrapper: "h-10",
    textSize: "text-sm",
    paddingX: "px-3",
    label: "text-sm",
    icon: "size-4",
    calText: "text-sm",
    calPad: "p-3.5",
    dayCell: "size-9",
    navBtn: "size-9",
    headerGrid: "grid-cols-[2.25rem_minmax(0,1fr)_2.25rem]",
  },
  lg: {
    wrapper: "h-[48px]",
    textSize: "text-sm",
    paddingX: "px-4",
    label: "text-sm",
    icon: "size-5",
    calText: "text-sm",
    calPad: "p-4",
    dayCell: "size-10",
    navBtn: "size-10",
    headerGrid: "grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]",
  },
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

const dayFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus";

const navButtonClass = [
  "inline-flex shrink-0 items-center justify-center rounded-lg",
  "bg-surface-secondary text-content-secondary",
  "transition-colors duration-200",
  "hover:bg-surface-hover hover:text-content-primary",
  "active:bg-surface-active",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary",
].join(" ");

// ── Calendar body (shared grid) ─────────────────────────────────────────────

interface CalendarGridProps {
  id: string;
  size: DatePickerSize;
  locale: string;
  weekStartsOn: 0 | 1;
  viewYear: number;
  viewMonth: number;
  setViewYear: React.Dispatch<React.SetStateAction<number>>;
  setViewMonth: React.Dispatch<React.SetStateAction<number>>;
  cells: Date[];
  todayStr: string;
  minDate?: string;
  maxDate?: string;
  mode: "single" | "range";
  singleValue: string | null;
  rangeValue: DateRangeValue | null;
  pendingStart: string | null;
  onSelectDay: (d: Date) => void;
}

function CalendarGrid({
  id,
  size,
  locale,
  weekStartsOn,
  viewYear,
  viewMonth,
  setViewYear,
  setViewMonth,
  cells,
  todayStr,
  minDate,
  maxDate,
  mode,
  singleValue,
  rangeValue,
  pendingStart,
  onSelectDay,
}: CalendarGridProps) {
  const sc = sizeClasses[size];

  const monthFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale],
  );

  const weekdayFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "narrow" }),
    [locale],
  );

  const displayFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    [locale],
  );

  const weekdayLabels = React.useMemo(() => {
    const start =
      weekStartsOn === 0 ? new Date(2023, 11, 31) : new Date(2024, 0, 1);
    const labels: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      labels.push(weekdayFormatter.format(d));
    }
    return labels;
  }, [weekdayFormatter, weekStartsOn]);

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const rangeStart = rangeValue?.start ?? null;
  const rangeEnd = rangeValue?.end ?? null;

  return (
    <div
      id={`${id}-calendar`}
      role="dialog"
      aria-label={mode === "range" ? "Choose date range" : "Choose date"}
      className="outline-none"
    >
      <div
        className={[
          "mb-3 grid items-center gap-1 border-b border-border-subtle py-2 px-2",
          sc.headerGrid,
        ].join(" ")}
      >
        <button
          type="button"
          className={[navButtonClass, sc.navBtn].join(" ")}
          onClick={goPrev}
          aria-label="Previous month"
        >
          <ArrowLeftIcon className="size-4 shrink-0" aria-hidden />
        </button>
        <div
          id={`${id}-month`}
          className={[
            "min-w-0 truncate text-center font-semibold tracking-tight text-content-primary",
            sc.calText,
          ].join(" ")}
          aria-live="polite"
        >
          {monthFormatter.format(new Date(viewYear, viewMonth, 1))}
        </div>
        <button
          type="button"
          className={[navButtonClass, sc.navBtn].join(" ")}
          onClick={goNext}
          aria-label="Next month"
        >
          <ArrowRightIcon className="size-4 shrink-0" aria-hidden />
        </button>
      </div>
      <div
        role="grid"
        className="w-full min-w-0 p-1"
        aria-labelledby={`${id}-month`}
      >
        <div role="row" className="mb-2 grid grid-cols-7 gap-1">
          {weekdayLabels.map((wd, wi) => (
            <div
              key={`dow-${wi}`}
              role="columnheader"
              className={[
                "flex h-6 items-center justify-center font-medium text-content-tertiary",
                sc.calText,
              ].join(" ")}
            >
              {wd}
            </div>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, row) => (
          <div key={row} role="row" className="grid grid-cols-7 gap-1 m-1">
            {cells.slice(row * 7, row * 7 + 7).map((d) => {
              const str = toDateOnlyString(d);
              const inMonth = d.getMonth() === viewMonth;
              const isToday = str === todayStr;
              const inBounds = isDateInRange(str, minDate, maxDate);
              const isDisabled = !inBounds;

              let isRangeEndpoint = false;
              let isRangeMiddle = false;
              let isSelectedSingle = false;

              if (mode === "range" && pendingStart) {
                isRangeEndpoint = str === pendingStart;
              } else if (mode === "range" && rangeStart && rangeEnd) {
                isRangeEndpoint = str === rangeStart || str === rangeEnd;
                isRangeMiddle = isStrictlyBetween(str, rangeStart, rangeEnd);
              }
              if (mode === "single") {
                isSelectedSingle = singleValue === str;
              }

              const isSelected = mode === "single" && isSelectedSingle;

              return (
                <div
                  key={str + row}
                  role="gridcell"
                  className="flex aspect-square min-h-0 items-center justify-center p-0"
                >
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => onSelectDay(d)}
                    className={[
                      "flex shrink-0 items-center justify-center rounded-lg",
                      sc.dayCell,
                      "tabular-nums",
                      sc.calText,
                      "font-medium",
                      "transition-[box-shadow,background-color,color,transform] duration-200",
                      dayFocusRing,
                      !inMonth
                        ? "text-content-tertiary opacity-50"
                        : "text-content-primary",
                      mode === "range" && isRangeMiddle
                        ? "bg-accent-primary/12 text-content-primary"
                        : "",
                      mode === "range" && isRangeEndpoint
                        ? "bg-accent-primary text-white shadow-sm"
                        : "",
                      isSelected
                        ? "bg-accent-primary text-white shadow-sm"
                        : "",
                      mode === "single" &&
                      !isSelected &&
                      !isRangeMiddle &&
                      !isRangeEndpoint
                        ? [
                            "hover:bg-surface-hover",
                            isToday
                              ? "text-content-primary ring-1 ring-inset ring-border-brand"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")
                        : "",
                      mode === "range" &&
                      !isRangeMiddle &&
                      !isRangeEndpoint &&
                      !isSelected
                        ? [
                            "hover:bg-surface-hover",
                            isToday
                              ? "text-content-primary ring-1 ring-inset ring-border-brand"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")
                        : "",
                      isDisabled
                        ? "cursor-not-allowed opacity-25 hover:bg-transparent"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-selected={
                      isSelected ||
                      (mode === "range" && (isRangeEndpoint || isRangeMiddle))
                    }
                    aria-current={isToday ? "date" : undefined}
                    aria-label={displayFormatter.format(d)}
                  >
                    {d.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Single ───────────────────────────────────────────────────────────────────

function DatePickerSingle({
  size = "md",
  value: valueProp,
  defaultValue = null,
  onValueChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder = "Select date",
  label,
  helperText,
  error = false,
  name,
  locale = typeof navigator !== "undefined" ? navigator.language : "en-US",
  weekStartsOn = 1,
  className,
}: DatePickerSingleProps) {
  const id = React.useId();
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState<string | null>(
    defaultValue,
  );
  const value = isControlled ? valueProp! : uncontrolled;

  const setValue = React.useCallback(
    (next: string | null) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const [open, setOpen] = React.useState(false);

  const initialView = React.useMemo(() => {
    const s = valueProp !== undefined ? valueProp : defaultValue;
    if (s) {
      const d = parseDateOnly(s);
      return { y: d.getFullYear(), m: d.getMonth() };
    }
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  }, []);

  const [viewYear, setViewYear] = React.useState(initialView.y);
  const [viewMonth, setViewMonth] = React.useState(initialView.m);

  React.useEffect(() => {
    if (value) {
      const d = parseDateOnly(value);
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [value]);

  const cells = React.useMemo(
    () => buildMonthCells(viewYear, viewMonth, weekStartsOn),
    [viewYear, viewMonth, weekStartsOn],
  );

  const todayStr = toDateOnlyString(new Date());
  const sc = sizeClasses[size];

  const wrapperClasses = [
    "flex w-full min-w-0 items-center justify-between gap-2 overflow-hidden",
    "bg-surface-primary",
    "border",
    fieldBorderClass(error),
    "rounded-full",
    fieldShellTransition,
    fieldTriggerPressMotion,
    error ? fieldFocusVisibleError : fieldFocusVisibleDefault,
    focusRing,
    sc.wrapper,
    sc.paddingX,
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const displayFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    [locale],
  );

  const displayText = value
    ? displayFormatter.format(parseDateOnly(value))
    : placeholder;

  const selectDay = (d: Date) => {
    const str = toDateOnlyString(d);
    if (!isDateInRange(str, minDate, maxDate)) return;
    setValue(str);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className={["font-medium text-content-primary", sc.label].join(" ")}
          >
            {label}
          </label>
        )}
        <PopoverTrigger
          render={(props) => (
            <button
              id={id}
              type="button"
              {...props}
              disabled={disabled}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-controls={`${id}-calendar`}
              className={wrapperClasses}
            >
              <span
                className={[
                  "min-w-0 flex-1 truncate text-left",
                  value ? "text-content-primary" : "text-content-tertiary",
                  sc.textSize,
                ].join(" ")}
              >
                {displayText}
              </span>
              <CalendarIcon
                className={[sc.icon, "shrink-0 text-content-tertiary"].join(
                  " ",
                )}
                aria-hidden
              />
            </button>
          )}
        />
        {name ? (
          <input
            type="hidden"
            name={name}
            value={value ?? ""}
            readOnly
            aria-hidden
          />
        ) : null}
        <PopoverPortal>
          <PopoverPositioner side="bottom" align="start" sideOffset={4}>
            <PopoverPopup
              className={[
                "!p-0",
                sc.calPad,
                "min-w-[17.5rem]",
                "rounded-2xl",
                "border-border-default",
                "shadow-md",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <CalendarGrid
                id={id}
                size={size}
                locale={locale}
                weekStartsOn={weekStartsOn}
                viewYear={viewYear}
                viewMonth={viewMonth}
                setViewYear={setViewYear}
                setViewMonth={setViewMonth}
                cells={cells}
                todayStr={todayStr}
                minDate={minDate}
                maxDate={maxDate}
                mode="single"
                singleValue={value}
                rangeValue={null}
                pendingStart={null}
                onSelectDay={selectDay}
              />
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
        {helperText && (
          <p
            className={[
              "text-xs",
              error ? "text-feedback-negative" : "text-content-tertiary",
            ].join(" ")}
          >
            {helperText}
          </p>
        )}
      </div>
    </Popover>
  );
}

// ── Range ────────────────────────────────────────────────────────────────────

function DatePickerRange({
  size = "md",
  value: valueProp,
  defaultValue = null,
  onValueChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder = "Select date range",
  label,
  helperText,
  error = false,
  nameStart,
  nameEnd,
  locale = typeof navigator !== "undefined" ? navigator.language : "en-US",
  weekStartsOn = 1,
  className,
}: DatePickerRangeProps) {
  const id = React.useId();
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState<DateRangeValue | null>(
    defaultValue,
  );
  const rangeValue = isControlled ? valueProp! : uncontrolled;

  const setRangeValue = React.useCallback(
    (next: DateRangeValue | null) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const [open, setOpen] = React.useState(false);
  const [pendingStart, setPendingStart] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) setPendingStart(null);
  }, [open]);

  const initialView = React.useMemo(() => {
    const r = valueProp !== undefined ? valueProp : defaultValue;
    if (r?.start) {
      const d = parseDateOnly(r.start);
      return { y: d.getFullYear(), m: d.getMonth() };
    }
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  }, []);

  const [viewYear, setViewYear] = React.useState(initialView.y);
  const [viewMonth, setViewMonth] = React.useState(initialView.m);

  const anchorStr = pendingStart ?? rangeValue?.start ?? null;

  React.useEffect(() => {
    if (anchorStr) {
      const d = parseDateOnly(anchorStr);
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [anchorStr]);

  const cells = React.useMemo(
    () => buildMonthCells(viewYear, viewMonth, weekStartsOn),
    [viewYear, viewMonth, weekStartsOn],
  );

  const todayStr = toDateOnlyString(new Date());
  const sc = sizeClasses[size];

  const wrapperClasses = [
    "flex w-full min-w-0 items-center justify-between gap-2 overflow-hidden",
    "bg-surface-primary",
    "border",
    fieldBorderClass(error),
    "rounded-full",
    fieldShellTransition,
    fieldTriggerPressMotion,
    error ? fieldFocusVisibleError : fieldFocusVisibleDefault,
    focusRing,
    sc.wrapper,
    sc.paddingX,
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const displayFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    [locale],
  );

  const displayText = React.useMemo(() => {
    if (rangeValue?.start && rangeValue?.end) {
      return `${displayFormatter.format(parseDateOnly(rangeValue.start))} – ${displayFormatter.format(parseDateOnly(rangeValue.end))}`;
    }
    if (pendingStart) {
      return `${displayFormatter.format(parseDateOnly(pendingStart))} – …`;
    }
    return placeholder;
  }, [rangeValue, pendingStart, placeholder, displayFormatter]);

  const hasDisplayValue =
    Boolean(rangeValue?.start && rangeValue?.end) || Boolean(pendingStart);

  const selectDay = (d: Date) => {
    const str = toDateOnlyString(d);
    if (!isDateInRange(str, minDate, maxDate)) return;

    if (!pendingStart) {
      setPendingStart(str);
      return;
    }

    const next = normalizeRange(pendingStart, str);
    setRangeValue(next);
    setPendingStart(null);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className={["font-medium text-content-primary", sc.label].join(" ")}
          >
            {label}
          </label>
        )}
        <PopoverTrigger
          render={(props) => (
            <button
              id={id}
              type="button"
              {...props}
              disabled={disabled}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-controls={`${id}-calendar`}
              className={wrapperClasses}
            >
              <span
                className={[
                  "min-w-0 flex-1 truncate text-left",
                  hasDisplayValue
                    ? "text-content-primary"
                    : "text-content-tertiary",
                  sc.textSize,
                ].join(" ")}
              >
                {displayText}
              </span>
              <CalendarIcon
                className={[sc.icon, "shrink-0 text-content-tertiary"].join(
                  " ",
                )}
                aria-hidden
              />
            </button>
          )}
        />
        {nameStart ? (
          <input
            type="hidden"
            name={nameStart}
            value={rangeValue?.start ?? ""}
            readOnly
            aria-hidden
          />
        ) : null}
        {nameEnd ? (
          <input
            type="hidden"
            name={nameEnd}
            value={rangeValue?.end ?? ""}
            readOnly
            aria-hidden
          />
        ) : null}
        <PopoverPortal>
          <PopoverPositioner side="bottom" align="start" sideOffset={4}>
            <PopoverPopup
              className={[
                "!p-0",
                sc.calPad,
                "min-w-[17.5rem]",
                "rounded-2xl",
                "border-border-default",
                "shadow-md",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <CalendarGrid
                id={id}
                size={size}
                locale={locale}
                weekStartsOn={weekStartsOn}
                viewYear={viewYear}
                viewMonth={viewMonth}
                setViewYear={setViewYear}
                setViewMonth={setViewMonth}
                cells={cells}
                todayStr={todayStr}
                minDate={minDate}
                maxDate={maxDate}
                mode="range"
                singleValue={null}
                rangeValue={rangeValue}
                pendingStart={pendingStart}
                onSelectDay={selectDay}
              />
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
        {helperText && (
          <p
            className={[
              "text-xs",
              error ? "text-feedback-negative" : "text-content-tertiary",
            ].join(" ")}
          >
            {helperText}
          </p>
        )}
      </div>
    </Popover>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────

export function DatePicker(props: DatePickerProps) {
  if (props.mode === "range") {
    return <DatePickerRange {...props} />;
  }
  return <DatePickerSingle {...props} />;
}

DatePicker.displayName = "DatePicker";
