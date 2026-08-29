import * as React from "react";
import { CloseIcon, FileIcon, UploadCloudIcon } from "../../icons";
import {
  fieldDropZoneTransition,
  fieldFocusWithinDefault,
} from "../fieldStyles";

// ── Types ──────────────────────────────────────────────────────────────────

export type FileUploadSize = "sm" | "md" | "lg";

/** `vertical`: stacked dropzone (default). `horizontal`: icon + text in a row, compact height. */
export type FileUploadOrientation = "vertical" | "horizontal";

export type FileUploadValidationIssue = {
  file: File;
  reason: "max-size" | "max-files";
};

export type FileUploadProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "size" | "children" | "onChange" | "value" | "defaultValue"
> & {
  /** Visual size */
  size?: FileUploadSize;
  /** Layout of the dropzone */
  orientation?: FileUploadOrientation;
  /** Accessible label (visible title in the dropzone) */
  label?: string;
  /** Secondary line under the title */
  description?: string;
  /** Helper or error text below the dropzone */
  helperText?: string;
  /** Error state (border + helper styling) */
  error?: boolean;
  /** Shown while dragging files over the zone */
  dropLabel?: string;
  /** Max size per file in MB (client-side check only) */
  maxSizeMb?: number;
  /** Max number of files (with `multiple`) */
  maxFiles?: number;
  /** Selected files (controlled). Omit for uncontrolled. */
  value?: File[];
  /** Initial files when uncontrolled */
  defaultValue?: File[];
  /** Fires when the file list changes after user action */
  onFilesChange?: (files: File[]) => void;
  /** Files rejected by client-side rules */
  onValidationError?: (issues: FileUploadValidationIssue[]) => void;
  /** Show list of selected files with remove actions */
  showFileList?: boolean;
  /** Replace default dropzone body */
  children?: React.ReactNode;
};

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<
  FileUploadSize,
  { zone: string; title: string; desc: string; icon: string; list: string }
> = {
  sm: {
    zone: "min-h-[7rem] gap-2 p-4",
    title: "text-sm font-medium",
    desc: "text-xs",
    icon: "h-8 w-8",
    list: "text-xs",
  },
  md: {
    zone: "min-h-[8.5rem] gap-2.5 p-5",
    title: "text-sm font-medium",
    desc: "text-sm",
    icon: "h-10 w-10",
    list: "text-sm",
  },
  lg: {
    zone: "min-h-[10rem] gap-3 p-6",
    title: "text-base font-medium",
    desc: "text-sm",
    icon: "h-12 w-12",
    list: "text-sm",
  },
};

/** Compact row layout for `orientation="horizontal"` */
const sizeClassesHorizontal: Record<FileUploadSize, { zone: string }> = {
  sm: {
    zone: "min-h-[4.25rem] gap-3 px-4 py-3",
  },
  md: {
    zone: "min-h-[5rem] gap-4 px-5 py-3.5",
  },
  lg: {
    zone: "min-h-[5.75rem] gap-4 px-6 py-4",
  },
};

function filesFromInputList(list: FileList | null): File[] {
  if (!list?.length) {
    return [];
  }
  return Array.from(list);
}

function mergeFilesToInput(
  input: HTMLInputElement,
  files: File[],
): void {
  const dt = new DataTransfer();
  files.forEach((f) => dt.items.add(f));
  input.files = dt.files;
}

// ── Component ──────────────────────────────────────────────────────────────

/**
 * File picker with drag-and-drop, optional validation, and file list.
 * Uses a native `input type="file"` (hidden); not a Base UI primitive.
 */
export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload(
    {
      size = "md",
      orientation = "vertical",
      label = "Upload a file",
      description = "Drag and drop here, or click to browse",
      helperText,
      error = false,
      disabled = false,
      multiple = false,
      dropLabel = "Drop files to upload",
      maxSizeMb,
      maxFiles,
      value: valueProp,
      defaultValue,
      onFilesChange,
      onValidationError,
      showFileList = true,
      className,
      children,
      id: idProp,
      name,
      accept,
      ...inputProps
    },
    ref,
  ) {
    const generatedId = React.useId();
    const inputId = idProp ?? `file-upload-${generatedId}`;
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const [uncontrolledFiles, setUncontrolledFiles] = React.useState<File[]>(
      () => defaultValue ?? [],
    );
    const isControlled = valueProp !== undefined;
    const files = isControlled ? valueProp : uncontrolledFiles;

    const setFiles = React.useCallback(
      (next: File[]) => {
        if (!isControlled) {
          setUncontrolledFiles(next);
        }
        onFilesChange?.(next);
      },
      [isControlled, onFilesChange],
    );

    React.useEffect(() => {
      if (isControlled || !defaultValue?.length || !innerRef.current) {
        return;
      }
      mergeFilesToInput(innerRef.current, defaultValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps -- sync initial defaultValue to input once
    }, []);

    React.useEffect(() => {
      if (!isControlled || !innerRef.current) {
        return;
      }
      mergeFilesToInput(innerRef.current, valueProp);
    }, [isControlled, valueProp]);

    const [dragging, setDragging] = React.useState(false);
    const dragDepth = React.useRef(0);

    const sc = sizeClasses[size];
    const horizontal = orientation === "horizontal";
    const scH = sizeClassesHorizontal[size];

    const validateAndCommit = React.useCallback(
      (incoming: File[]) => {
        const issues: FileUploadValidationIssue[] = [];
        let next = incoming;

        if (maxSizeMb != null && maxSizeMb > 0) {
          const maxBytes = maxSizeMb * 1024 * 1024;
          const tooLarge = next.filter((f) => f.size > maxBytes);
          tooLarge.forEach((file) =>
            issues.push({ file, reason: "max-size" }),
          );
          next = next.filter((f) => f.size <= maxBytes);
        }

        if (multiple && maxFiles != null && maxFiles > 0 && next.length > maxFiles) {
          const dropped = next.slice(maxFiles);
          dropped.forEach((file) =>
            issues.push({ file, reason: "max-files" }),
          );
          next = next.slice(0, maxFiles);
        }

        if (issues.length) {
          onValidationError?.(issues);
        }

        setFiles(next);
        if (innerRef.current) {
          mergeFilesToInput(innerRef.current, next);
        }
      },
      [maxFiles, maxSizeMb, multiple, onValidationError, setFiles],
    );

    const onInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = filesFromInputList(e.target.files);
        const next = multiple ? picked : picked.slice(0, 1);
        validateAndCommit(next);
        e.target.value = "";
      },
      [multiple, validateAndCommit],
    );

    const removeAt = React.useCallback(
      (index: number) => {
        const next = files.filter((_, i) => i !== index);
        validateAndCommit(next);
      },
      [files, validateAndCommit],
    );

    const clearAll = React.useCallback(() => {
      validateAndCommit([]);
      if (innerRef.current) {
        innerRef.current.value = "";
      }
    }, [validateAndCommit]);

    const onDragEnter = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) {
          return;
        }
        dragDepth.current += 1;
        setDragging(true);
      },
      [disabled],
    );

    const onDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepth.current -= 1;
      if (dragDepth.current <= 0) {
        dragDepth.current = 0;
        setDragging(false);
      }
    }, []);

    const onDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const onDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragDepth.current = 0;
        setDragging(false);
        if (disabled) {
          return;
        }
        const dropped = filesFromInputList(e.dataTransfer.files);
        if (!multiple && dropped.length > 1) {
          validateAndCommit([dropped[0]]);
          return;
        }
        validateAndCommit(multiple ? dropped : dropped.slice(0, 1));
      },
      [disabled, multiple, validateAndCommit],
    );

    const zoneClasses = [
      "relative flex rounded-xl border border-dashed",
      fieldDropZoneTransition,
      horizontal
        ? "flex-row items-center justify-start text-left"
        : "flex-col items-center justify-center text-center",
      error
        ? "border-state-error bg-surface-primary focus-within:ring-2 focus-within:ring-state-error/30"
        : dragging
          ? "border-border-brand bg-surface-hover ring-2 ring-border-focus/40"
          : "border-border-default bg-surface-primary [@media(hover:hover)_and_(pointer:fine)]:hover:border-border-strong [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-secondary/60",
      fieldFocusWithinDefault,
      disabled ? "pointer-events-none opacity-50" : "",
      horizontal ? scH.zone : sc.zone,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const labelId = `${inputId}-label`;
    const descId = `${inputId}-desc`;

    const rowWithList =
      horizontal && showFileList && files.length > 0;

    return (
      <div className="flex w-full flex-col gap-2">
        <div
          className={[
            "flex gap-2",
            rowWithList ? "flex-col lg:flex-row lg:items-start" : "flex-col",
          ].join(" ")}
        >
          <div
            className={rowWithList ? "min-w-0 flex-1" : "w-full"}
          >
            <div
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              className={zoneClasses}
            >
              <input
                {...inputProps}
                ref={innerRef}
                id={inputId}
                type="file"
                name={name}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                className="sr-only"
                onChange={onInputChange}
                aria-labelledby={children ? undefined : labelId}
                aria-label={children ? (label ?? "Upload file") : undefined}
                aria-describedby={!children && description ? descId : undefined}
                aria-invalid={error || undefined}
              />

              <label
                htmlFor={inputId}
                className={[
                  "flex min-h-0 w-full cursor-pointer gap-1 px-2",
                  horizontal
                    ? "flex-row items-center gap-3 text-left"
                    : "flex-col items-center justify-center text-center",
                  disabled ? "cursor-not-allowed" : "",
                ].join(" ")}
              >
                {children ??
                  (horizontal ? (
                    <>
                      <UploadCloudIcon
                        className={[
                          sc.icon,
                          "shrink-0 text-content-tertiary",
                          dragging ? "text-content-brand" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-hidden
                      />
                      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
                        <span
                          id={labelId}
                          className={[
                            sc.title,
                            error ? "text-state-error" : "text-content-primary",
                          ].join(" ")}
                        >
                          {dragging ? dropLabel : label}
                        </span>
                        {!dragging && description ? (
                          <span
                            id={descId}
                            className={[sc.desc, "text-content-tertiary"].join(
                              " ",
                            )}
                          >
                            {description}
                          </span>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <>
                      <UploadCloudIcon
                        className={[
                          sc.icon,
                          "text-content-tertiary",
                          dragging ? "text-content-brand" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-hidden
                      />
                      <span
                        id={labelId}
                        className={[
                          sc.title,
                          error ? "text-state-error" : "text-content-primary",
                        ].join(" ")}
                      >
                        {dragging ? dropLabel : label}
                      </span>
                      {!dragging && description ? (
                        <span
                          id={descId}
                          className={[sc.desc, "text-content-tertiary"].join(
                            " ",
                          )}
                        >
                          {description}
                        </span>
                      ) : null}
                    </>
                  ))}
              </label>
            </div>
          </div>

        {showFileList && files.length > 0 ? (
          <ul
            className={[
              "flex flex-col gap-1.5 rounded-xl border border-border-default bg-surface-secondary p-2",
              sc.list,
              rowWithList ? "lg:min-w-0 lg:max-w-md lg:flex-1" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                className="flex items-center gap-2 text-content-primary"
              >
                <FileIcon
                  className="h-4 w-4 shrink-0 text-content-tertiary"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate">{file.name}</span>
                <span className="shrink-0 text-content-tertiary">
                  {formatBytes(file.size)}
                </span>
                {!disabled ? (
                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    className={[
                      "inline-flex shrink-0 rounded-full p-1",
                      "text-content-tertiary transition-colors duration-fast ease-standard",
                      "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:text-content-primary",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                    ].join(" ")}
                    aria-label={`Remove ${file.name}`}
                  >
                    <CloseIcon className="h-4 w-4" aria-hidden />
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
        </div>

        {helperText ? (
          <p
            className={[
              size === "lg" ? "text-sm" : "text-xs",
              error ? "text-state-error" : "text-content-tertiary",
            ].join(" ")}
            role={error ? "alert" : undefined}
          >
            {helperText}
          </p>
        ) : null}

        {files.length > 0 && !disabled && multiple ? (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={clearAll}
              className="rounded text-xs font-medium text-content-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              Clear all
            </button>
          </div>
        ) : null}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
