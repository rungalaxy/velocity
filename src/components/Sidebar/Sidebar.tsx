"use client";

import * as React from "react";
import { Collapsible } from "@base-ui-components/react/collapsible";
import { SidebarIcon } from "../../icons";
import { Badge } from "../Badge";
import type { BadgeProps } from "../Badge";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import { Separator } from "../Separator";
import { Skeleton } from "../Skeleton";
import {
  Drawer,
  DrawerBackdrop,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
} from "../Drawer";
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "../Tooltip";
import { useIsMobile } from "./use-is-mobile";

// ── Constants ──────────────────────────────────────────────────────────────

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
/** Matches Core 2.0 rail (~280px). */
const SIDEBAR_WIDTH = "17.5rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "4.5rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// ── Context ─────────────────────────────────────────────────────────────────

export type SidebarState = "expanded" | "collapsed";

export type SidebarContextValue = {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function useCollapsedIconMode(): boolean {
  const { state, isMobile } = useSidebar();
  return state === "collapsed" && !isMobile;
}

// ── Types ───────────────────────────────────────────────────────────────────

export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";
export type SidebarMenuButtonVariant = "default" | "outline";
export type SidebarMenuButtonSize = "default" | "sm" | "lg";
export type SidebarMenuSubButtonSize = "sm" | "md";

export interface SidebarProviderProps extends React.ComponentPropsWithoutRef<"div"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface SidebarProps extends React.ComponentPropsWithoutRef<"div"> {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  dir?: React.HTMLAttributes<HTMLElement>["dir"];
}

export interface SidebarTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof IconButton>,
  "label" | "children"
> {
  children?: React.ReactNode;
  /** Accessible name — defaults to French copy for the toggle control. */
  label?: string;
}

export interface SidebarMenuButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isActive?: boolean;
  variant?: SidebarMenuButtonVariant;
  size?: SidebarMenuButtonSize;
  tooltip?: string | { children?: React.ReactNode };
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
}

export interface SidebarMenuActionProps extends React.ComponentPropsWithoutRef<"button"> {
  showOnHover?: boolean;
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
}

export interface SidebarMenuSubButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  size?: SidebarMenuSubButtonSize;
  isActive?: boolean;
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"a">) => React.ReactElement);
}

export interface SidebarGroupLabelProps extends React.ComponentPropsWithoutRef<"div"> {
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"div">) => React.ReactElement);
}

export interface SidebarGroupActionProps extends React.ComponentPropsWithoutRef<"button"> {
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: React.ComponentProps<"button">) => React.ReactElement);
}

export interface SidebarMenuSkeletonProps extends React.ComponentPropsWithoutRef<"div"> {
  showIcon?: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

type MergeRenderOptions = {
  className?: string;
  children?: React.ReactNode;
  render?:
    | React.ReactElement<Record<string, unknown>>
    | ((props: Record<string, unknown>) => React.ReactElement);
} & Record<string, unknown>;

function mergeRenderProps(
  defaultTag: keyof React.JSX.IntrinsicElements,
  { className, render, ...props }: MergeRenderOptions,
): React.ReactElement {
  const mergedClassName = className;

  if (typeof render === "function") {
    return render({ ...props, className: mergedClassName });
  }

  if (render) {
    return React.cloneElement(render, {
      ...props,
      className: cx(
        mergedClassName,
        (render.props as { className?: string }).className,
      ),
    });
  }

  return React.createElement(defaultTag, {
    ...props,
    className: mergedClassName,
  });
}

const menuButtonVariantClasses: Record<SidebarMenuButtonVariant, string> = {
  default: "text-content-secondary hover:text-content-primary",
  outline:
    "bg-surface-primary text-content-primary shadow-sm hover:text-content-primary",
};

const menuButtonSizeClasses: Record<SidebarMenuButtonSize, string> = {
  default: "h-12 text-sm",
  sm: "h-10 text-sm",
  lg: "h-12 text-sm",
};

const menuButtonIconModeClasses =
  "!h-11 !w-11 !min-w-11 !max-w-11 shrink-0 !p-0 justify-center gap-0 [&>span]:hidden [&>svg:not(:first-of-type)]:hidden [&_svg]:mx-auto";

const menuSubButtonSizeClasses: Record<SidebarMenuSubButtonSize, string> = {
  sm: "h-10 text-sm",
  md: "h-11 text-sm",
};

// ── SidebarProvider ───────────────────────────────────────────────────────────

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((current) => !current)
      : setOpen((current) => !current);
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state: SidebarState = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cx(
          "group/sidebar-wrapper flex min-h-svh w-full bg-surface-tertiary has-data-[variant=inset]:bg-surface-tertiary",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

SidebarProvider.displayName = "SidebarProvider";

// ── Sidebar ───────────────────────────────────────────────────────────────────

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cx(
          "flex h-full w-(--sidebar-width) flex-col bg-surface-tertiary p-5 text-content-primary",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile}>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerPopup
            side={side}
            className={cx(
              "w-[min(18rem,80vw)] border-0 bg-surface-tertiary p-0 text-content-primary",
            )}
            contentClassName="p-5"
          >
            <div
              dir={dir}
              data-sidebar="sidebar"
              data-slot="sidebar"
              data-mobile="true"
              className="flex h-full w-full flex-col"
            >
              <div className="sr-only">
                <DrawerTitle>Sidebar</DrawerTitle>
                <DrawerDescription>
                  Displays the mobile sidebar.
                </DrawerDescription>
              </div>
              {children}
            </div>
          </DrawerPopup>
        </DrawerPortal>
      </Drawer>
    );
  }

  return (
    <div
      className="group peer hidden text-content-primary md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cx(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cx(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          "data-[side=left]:left-0 data-[side=right]:right-0",
          "data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
          "data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cx(
            "flex size-full flex-col bg-surface-tertiary p-5 text-content-primary",
            "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-5",
            variant === "floating" && "rounded-3xl shadow-sm",
            variant === "inset" && "rounded-3xl",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

Sidebar.displayName = "Sidebar";

// ── SidebarTrigger ────────────────────────────────────────────────────────────

export function SidebarTrigger({
  className,
  onClick,
  children,
  label = "Afficher ou masquer la barre latérale",
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <IconButton
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="md"
      colorScheme="neutral"
      label={label}
      className={cx("shrink-0 !size-12 !rounded-full !gap-0", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children ?? (
        <SidebarIcon className="size-5 rtl:rotate-180" aria-hidden />
      )}
    </IconButton>
  );
}

SidebarTrigger.displayName = "SidebarTrigger";

// ── SidebarRail ───────────────────────────────────────────────────────────────

export function SidebarRail({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cx(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear sm:flex",
        "ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
        "group-data-[collapsible=offcanvas]:translate-x-0",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

SidebarRail.displayName = "SidebarRail";

// ── Layout parts ──────────────────────────────────────────────────────────────

export function SidebarInset({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cx(
        "relative flex w-full flex-1 flex-col bg-surface-tertiary",
        className,
      )}
      {...props}
    />
  );
}

SidebarInset.displayName = "SidebarInset";

export function SidebarInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      size="sm"
      className={cx("bg-surface-primary", className)}
      {...props}
    />
  );
}

SidebarInput.displayName = "SidebarInput";

export function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cx(
        "flex flex-col gap-2 pb-5",
        collapsedIconMode && "items-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarHeader.displayName = "SidebarHeader";

export function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cx(
        "mt-auto flex flex-col gap-2 pt-6",
        collapsedIconMode && "items-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarFooter.displayName = "SidebarFooter";

export function SidebarSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cx("mx-2 w-auto", className)}
      {...props}
    />
  );
}

SidebarSeparator.displayName = "SidebarSeparator";

export function SidebarContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cx(
        "flex min-h-0 flex-1 flex-col gap-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

SidebarContent.displayName = "SidebarContent";

// ── Groups & menu ─────────────────────────────────────────────────────────────

export function SidebarGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cx(
        "relative flex w-full min-w-0 flex-col",
        collapsedIconMode && "items-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarGroup.displayName = "SidebarGroup";

export function SidebarGroupLabel({
  className,
  render,
  ...props
}: SidebarGroupLabelProps) {
  const collapsedIconMode = useCollapsedIconMode();

  return mergeRenderProps("div", {
    ...props,
    render,
    className: cx(
      "flex h-8 shrink-0 items-center rounded-xl px-3 text-xs font-semibold uppercase tracking-wide text-content-tertiary outline-none [&>svg]:size-4 [&>svg]:shrink-0",
      collapsedIconMode && "hidden",
      className,
    ),
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
  });
}

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export function SidebarGroupAction({
  className,
  render,
  ...props
}: SidebarGroupActionProps) {
  return mergeRenderProps("button", {
    ...props,
    render,
    type: "button",
    className: cx(
      "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-content-secondary outline-none transition-transform hover:bg-surface-hover hover:text-content-primary group-data-[collapsible=icon]:hidden [&>svg]:size-4 [&>svg]:shrink-0",
      className,
    ),
    "data-slot": "sidebar-group-action",
    "data-sidebar": "group-action",
  });
}

SidebarGroupAction.displayName = "SidebarGroupAction";

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cx(
        "w-full text-sm",
        collapsedIconMode && "flex flex-col items-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarGroupContent.displayName = "SidebarGroupContent";

export function SidebarMenu({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cx(
        "flex w-full min-w-0 flex-col gap-1",
        collapsedIconMode && "items-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenu.displayName = "SidebarMenu";

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  const collapsedIconMode = useCollapsedIconMode();

  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cx(
        "group/menu-item relative w-full",
        collapsedIconMode && "flex justify-center",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenuItem.displayName = "SidebarMenuItem";

export function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const collapsedIconMode = useCollapsedIconMode();

  const buttonClasses = cx(
    "peer/menu-button group/menu-button relative flex items-center overflow-hidden rounded-full font-semibold outline-none transition-[width,height,padding,colors]",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:size-6 [&_svg]:shrink-0",
    collapsedIconMode
      ? menuButtonIconModeClasses
      : "w-full min-w-0 max-w-full gap-3 px-3 text-left [&>span:last-child]:truncate",
    !collapsedIconMode && menuButtonSizeClasses[size],
    menuButtonVariantClasses[variant],
    isActive &&
      "bg-surface-primary text-content-primary shadow-sm hover:text-content-primary",
    className,
  );

  const comp = mergeRenderProps("button", {
    ...props,
    render,
    type: props.type ?? "button",
    className: buttonClasses,
    "data-slot": "sidebar-menu-button",
    "data-sidebar": "menu-button",
    "data-active": isActive ? true : undefined,
    "data-size": size,
    children,
  });

  if (!tooltip) {
    return comp;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  const showTooltip = state === "collapsed" && !isMobile;

  return (
    <div className={cx("w-full", collapsedIconMode && "flex justify-center")}>
      <Tooltip>
        <TooltipTrigger
          className={cx(
            "flex min-w-0",
            collapsedIconMode ? "w-8 justify-center" : "w-full",
          )}
          render={comp as React.ReactElement<Record<string, unknown>>}
        />
        {showTooltip ? (
          <TooltipPortal>
            <TooltipPositioner side="right" align="center">
              <TooltipPopup {...tooltipProps} />
            </TooltipPositioner>
          </TooltipPortal>
        ) : null}
      </Tooltip>
    </div>
  );
}

SidebarMenuButton.displayName = "SidebarMenuButton";

export function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) {
  return mergeRenderProps("button", {
    ...props,
    render,
    type: "button",
    className: cx(
      "absolute top-3 right-2 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-content-secondary outline-none transition-transform hover:text-content-primary group-data-[collapsible=icon]:hidden [&>svg]:size-4 [&>svg]:shrink-0",
      showOnHover &&
        "md:opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:opacity-100",
      className,
    ),
    "data-slot": "sidebar-menu-action",
    "data-sidebar": "menu-action",
  });
}

SidebarMenuAction.displayName = "SidebarMenuAction";

export type SidebarMenuBadgeProps = BadgeProps;

export function SidebarMenuBadge({
  className,
  size = "sm",
  ...props
}: SidebarMenuBadgeProps) {
  return (
    <Badge
      size={size}
      className={cx(
        "pointer-events-none relative z-2 ml-auto shrink-0 tabular-nums normal-case group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenuBadge.displayName = "SidebarMenuBadge";

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: SidebarMenuSkeletonProps) {
  const [width] = React.useState(
    () => `${Math.floor(Math.random() * 40) + 50}%`,
  );

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cx("flex h-12 items-center gap-3 rounded-xl px-3", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton variant="circular" className="size-6 rounded-md" />
      )}
      <Skeleton
        variant="text"
        className="h-4 max-w-(--skeleton-width) flex-1"
        style={{ "--skeleton-width": width } as React.CSSProperties}
      />
    </div>
  );
}

SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

export function SidebarMenuSub({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cx(
        "relative flex min-w-0 flex-col pl-9",
        "before:absolute before:top-0 before:bottom-3 before:left-[1.4375rem] before:w-px before:bg-border-default",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenuSub.displayName = "SidebarMenuSub";

export function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cx(
        "group/menu-sub-item relative",
        "before:absolute before:top-0 before:-left-[0.8125rem] before:bottom-[calc(50%-0.75px)] before:w-[0.8125rem]",
        "before:rounded-bl-[10px] before:border-b before:border-l before:border-border-default",
        className,
      )}
      {...props}
    />
  );
}

SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  children,
  ...props
}: SidebarMenuSubButtonProps) {
  return mergeRenderProps("a", {
    ...props,
    render,
    className: cx(
      "relative flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-full px-3 font-semibold outline-none transition-colors",
      "text-content-secondary hover:text-content-primary",
      "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
      "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
      menuSubButtonSizeClasses[size],
      isActive &&
        "bg-surface-primary text-content-primary shadow-sm hover:text-content-primary",
      "group-data-[collapsible=icon]:hidden",
      className,
    ),
    "data-slot": "sidebar-menu-sub-button",
    "data-sidebar": "menu-sub-button",
    "data-active": isActive ? true : undefined,
    "data-size": size,
    children,
  });
}

SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// ── Animated menu collapsible (Base UI) ───────────────────────────────────────

export interface SidebarMenuCollapsibleProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Collapsible.Root>,
    "className"
  > {
  className?: string;
}

export function SidebarMenuCollapsible({
  className,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  ...props
}: SidebarMenuCollapsibleProps) {
  const collapsedIconMode = useCollapsedIconMode();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  /** Icon rail: never expand inline submenus — keeps a single icon per row. */
  const open = collapsedIconMode
    ? false
    : isControlled
      ? openProp
      : uncontrolledOpen;

  return (
    <Collapsible.Root
      data-slot="sidebar-menu-collapsible"
      data-sidebar="menu-collapsible"
      {...props}
      open={open}
      onOpenChange={(next, eventDetails) => {
        if (collapsedIconMode) return;
        if (!isControlled) {
          setUncontrolledOpen(next);
        }
        onOpenChange?.(next, eventDetails);
      }}
      className={cx(
        "group/collapsible w-full min-w-0",
        collapsedIconMode && "flex justify-center",
        className,
      )}
    />
  );
}

SidebarMenuCollapsible.displayName = "SidebarMenuCollapsible";

export interface SidebarMenuCollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Collapsible.Trigger> {}

export function SidebarMenuCollapsibleTrigger({
  className,
  ...props
}: SidebarMenuCollapsibleTriggerProps) {
  return (
    <Collapsible.Trigger
      data-slot="sidebar-menu-collapsible-trigger"
      data-sidebar="menu-collapsible-trigger"
      className={className}
      {...props}
    />
  );
}

SidebarMenuCollapsibleTrigger.displayName = "SidebarMenuCollapsibleTrigger";

export interface SidebarMenuCollapsiblePanelProps
  extends React.ComponentPropsWithoutRef<typeof Collapsible.Panel> {}

export function SidebarMenuCollapsiblePanel({
  className,
  keepMounted = true,
  children,
  ...props
}: SidebarMenuCollapsiblePanelProps) {
  const collapsedIconMode = useCollapsedIconMode();

  if (collapsedIconMode) {
    return null;
  }

  return (
    <Collapsible.Panel
      data-slot="sidebar-menu-collapsible-panel"
      data-sidebar="menu-collapsible-panel"
      keepMounted={keepMounted}
      className={cx(
        "overflow-hidden",
        "h-(--collapsible-panel-height)",
        "transition-[height] duration-normal ease-standard",
        "motion-reduce:transition-none",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
        typeof className === "string" ? className : undefined,
      )}
      {...props}
    >
      {children}
    </Collapsible.Panel>
  );
}

SidebarMenuCollapsiblePanel.displayName = "SidebarMenuCollapsiblePanel";
