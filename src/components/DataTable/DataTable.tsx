import * as React from "react";
import { Checkbox } from "../Checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableSize,
} from "../Table";

// ── Types ──────────────────────────────────────────────────────────────────

export type DataTableSelectionMode = "none" | "multiple";

export type DataTableColumnAlign = "start" | "center" | "end";

export interface DataTableColumn<T> {
  /** Stable identifier for the column (used as React key) */
  key: string;
  /** Header cell content */
  header: React.ReactNode;
  /** Renders the body cell for a given row */
  cell: (row: T) => React.ReactNode;
  /** Fixed column width (any valid CSS width value) */
  width?: string | number;
  /** Text alignment for header + body cells */
  align?: DataTableColumnAlign;
}

export interface DataTableProps<T> {
  /** Column definitions, rendered in order */
  columns: DataTableColumn<T>[];
  /** Row data */
  data: T[];
  /** Derives a stable, unique key for a row — used for selection and React keys */
  getRowKey: (row: T) => string;
  /** Cell padding + text size, inherited by the underlying `Table` */
  size?: TableSize;
  /** Zebra striping on even body rows */
  striped?: boolean;
  /** `'multiple'` renders a leading checkbox column; `'none'` hides it. @default 'multiple' */
  selectionMode?: DataTableSelectionMode;
  /** Selected row keys (controlled). Omit for uncontrolled. */
  selectedKeys?: Iterable<string>;
  /** Initial selected row keys when uncontrolled */
  defaultSelectedKeys?: Iterable<string>;
  /** Called with the full set of selected keys whenever selection changes */
  onSelectionChange?: (keys: Set<string>) => void;
  /** Marks a row as disabled — its checkbox is disabled and it cannot be selected */
  isRowDisabled?: (row: T) => boolean;
  /**
   * Derives a human-readable label for a row (e.g. its name/title), used to build
   * an accessible name for its checkbox — `"Select {label}"` / `"Deselect {label}"`.
   * Falls back to the generic `"row"` when omitted.
   */
  getRowLabel?: (row: T) => string;
  /** Content shown in place of the body when `data` is empty */
  emptyState?: React.ReactNode;
  className?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

const alignClasses: Record<DataTableColumnAlign, string> = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
};

function toKeySet(keys: Iterable<string> | undefined): Set<string> {
  return keys ? new Set(keys) : new Set();
}

// ── Component ──────────────────────────────────────────────────────────────

/**
 * Data grid built on top of `Table`, with an optional leading checkbox column
 * for row selection (select-all in the header, one checkbox per row).
 *
 * Selection supports both controlled (`selectedKeys` + `onSelectionChange`)
 * and uncontrolled (`defaultSelectedKeys`) usage, keyed by `getRowKey`.
 */
export function DataTable<T>({
  columns,
  data,
  getRowKey,
  size = "md",
  striped = false,
  selectionMode = "multiple",
  selectedKeys: selectedKeysProp,
  defaultSelectedKeys,
  onSelectionChange,
  isRowDisabled,
  getRowLabel,
  emptyState,
  className,
}: DataTableProps<T>) {
  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<
    Set<string>
  >(() => toKeySet(defaultSelectedKeys));

  const isControlled = selectedKeysProp !== undefined;
  const selectedKeys = isControlled
    ? toKeySet(selectedKeysProp)
    : uncontrolledSelectedKeys;

  const setSelectedKeys = React.useCallback(
    (next: Set<string>) => {
      if (!isControlled) {
        setUncontrolledSelectedKeys(next);
      }
      onSelectionChange?.(next);
    },
    [isControlled, onSelectionChange],
  );

  const selectionEnabled = selectionMode === "multiple";

  const selectableRows = React.useMemo(
    () => data.filter((row) => !isRowDisabled?.(row)),
    [data, isRowDisabled],
  );
  const selectableKeys = React.useMemo(
    () => selectableRows.map(getRowKey),
    [selectableRows, getRowKey],
  );

  const selectedSelectableCount = selectableKeys.filter((key) =>
    selectedKeys.has(key),
  ).length;
  const isAllSelected =
    selectableKeys.length > 0 && selectedSelectableCount === selectableKeys.length;
  const isIndeterminate =
    selectedSelectableCount > 0 && !isAllSelected;

  const selectionAnnouncement =
    selectedSelectableCount === 0
      ? "No rows selected"
      : isAllSelected
        ? `All ${selectableKeys.length} rows selected`
        : `${selectedSelectableCount} of ${selectableKeys.length} rows selected`;

  const handleSelectAll = React.useCallback(
    (checked: boolean) => {
      const next = new Set(selectedKeys);
      if (checked) {
        selectableKeys.forEach((key) => next.add(key));
      } else {
        selectableKeys.forEach((key) => next.delete(key));
      }
      setSelectedKeys(next);
    },
    [selectedKeys, selectableKeys, setSelectedKeys],
  );

  const handleSelectRow = React.useCallback(
    (key: string, checked: boolean) => {
      const next = new Set(selectedKeys);
      if (checked) {
        next.add(key);
      } else {
        next.delete(key);
      }
      setSelectedKeys(next);
    },
    [selectedKeys, setSelectedKeys],
  );

  return (
    <>
      {selectionEnabled && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {selectionAnnouncement}
        </div>
      )}
      <Table size={size} striped={striped} className={className}>
        <TableHeader>
          <TableRow>
            {selectionEnabled && (
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onCheckedChange={handleSelectAll}
                  disabled={selectableKeys.length === 0}
                  aria-label={isAllSelected ? "Deselect all rows" : "Select all rows"}
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={column.align ? alignClasses[column.align] : undefined}
                style={column.width !== undefined ? { width: column.width } : undefined}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectionEnabled ? 1 : 0)}
                className="text-center text-content-secondary"
              >
                {emptyState ?? "No data"}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => {
              const key = getRowKey(row);
              const disabled = isRowDisabled?.(row) ?? false;
              const selected = selectedKeys.has(key);
              const rowLabel = getRowLabel ? getRowLabel(row) : "row";
              return (
                <TableRow
                  key={key}
                  aria-selected={selectionEnabled ? selected : undefined}
                  className={[
                    selected ? "[&>td]:bg-surface-hover" : "",
                    disabled ? "opacity-50" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {selectionEnabled && (
                    <TableCell>
                      <Checkbox
                        checked={selected}
                        onCheckedChange={(checked) => handleSelectRow(key, checked)}
                        disabled={disabled}
                        aria-label={`${selected ? "Deselect" : "Select"} ${rowLabel}`}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={column.align ? alignClasses[column.align] : undefined}
                    >
                      {column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </>
  );
}

DataTable.displayName = "DataTable";
