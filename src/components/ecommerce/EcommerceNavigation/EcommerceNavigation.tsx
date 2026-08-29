import * as React from "react";
import { NavigationMenu as NM } from "@base-ui-components/react/navigation-menu";
import { ArrowDownIcon, MenuIcon } from "../../../icons";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerPortal,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "../../Drawer";
import { IconButton } from "../../IconButton/IconButton";
import { Separator } from "../../Separator/Separator";

/** Ref to the menu `<nav>` — mega menu portals here so triggers stay above the panel (same stacking context as `body` portaling would paint over the header). */
const EcommerceNavigationMenuPortalContainerRefContext =
  React.createContext<React.MutableRefObject<HTMLElement | null> | null>(null);

// ── Types ──────────────────────────────────────────────────────────────────

export interface EcommerceNavigationProps {
  /** Logo or site title (left) */
  brand: React.ReactNode;
  /** Primary navigation — compose with `EcommerceNavigationMenu*` + `EcommerceNavigationMegaViewport` */
  menu: React.ReactNode;
  /**
   * Content for the mobile drawer (viewports below `md`). When set, **menu** is hidden there and a control opens this panel.
   */
  mobileMenu?: React.ReactNode;
  /** Actions — search, account, cart (right) */
  utilities?: React.ReactNode;
  /**
   * Desktop layout for **menu**: same row as brand (`inline`, default) or full-width row under the top bar (`below`).
   * With `mobileMenu`, the desktop mega menu and this row show from **`md`** up; narrower viewports use the drawer.
   */
  navPlacement?: "inline" | "below";
  /** Extra classes on `<header>` */
  className?: string;
  /** Extra classes on the inner width-constrained shell (wraps all rows) */
  innerClassName?: string;
}

export type EcommerceNavigationMenuProps = NM.Root.Props;
export type EcommerceNavigationMenuListProps = NM.List.Props;
export type EcommerceNavigationMenuItemProps = NM.Item.Props;
export type EcommerceNavigationMenuTriggerProps = NM.Trigger.Props;
export type EcommerceNavigationMenuContentProps = NM.Content.Props;
export type EcommerceNavigationMenuLinkProps = NM.Link.Props;
export type EcommerceNavigationMenuIconProps = NM.Icon.Props;

export interface EcommerceNavigationMegaViewportProps {
  /** Offset under the nav triggers */
  sideOffset?: number;
  /** Forwarded to `NavigationMenu.Positioner` */
  positionerClassName?: string;
  /** Forwarded to `NavigationMenu.Popup` */
  popupClassName?: string;
  /** Show pointer arrow toward the trigger */
  showArrow?: boolean;
}

// ── Shell ───────────────────────────────────────────────────────────────────

/**
 * Storefront header: **brand** + **utilities** on the top bar; **menu** inline with brand or on a second row (`navPlacement="below"`).
 * Pair with Base UI [Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 * primitives exposed as `EcommerceNavigationMenu*`.
 */
export function EcommerceNavigation({
  brand,
  menu,
  mobileMenu,
  utilities,
  navPlacement = "inline",
  className,
  innerClassName,
}: EcommerceNavigationProps) {
  const menuBelow = navPlacement === "below";

  const menuShellClass = mobileMenu
    ? "hidden min-w-0 flex-1 items-center md:flex"
    : "flex min-w-0 flex-1 items-center";

  const menuBelowRowClass = "hidden w-full min-w-0 items-center md:flex";

  const shellClass = [
    "mx-auto flex w-full max-w-7xl min-w-0 flex-col px-4 sm:px-6 lg:px-8",
    innerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const topBarClass = [
    "flex h-14 min-w-0 flex-nowrap items-center justify-between gap-4 sm:h-16 sm:gap-6",
  ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full border-b border-border-default",
        "bg-surface-primary/95 backdrop-blur-md supports-backdrop-filter:bg-surface-primary/90",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={shellClass}>
        <div className={topBarClass}>
          <div className="flex min-w-0 max-w-full shrink grow-0 basis-auto items-center gap-3 sm:gap-6 lg:gap-10">
            <div className="flex shrink-0 items-center">{brand}</div>
            {mobileMenu ? (
              <div className="flex shrink-0 items-center gap-2 md:hidden">
                <Separator orientation="vertical" className="h-5" />
                <Drawer side="left">
                  <DrawerTrigger
                    render={
                      <IconButton
                        label="Open navigation menu"
                        variant="ghost"
                        colorScheme="neutral"
                        size="sm"
                      >
                        <MenuIcon className="h-5 w-5" />
                      </IconButton>
                    }
                  />
                  <DrawerPortal>
                    <DrawerBackdrop />
                    <DrawerPopup side="left" contentClassName="px-4 pb-4 pt-20">
                      <DrawerClose />
                      <div className="mt-3">{mobileMenu}</div>
                    </DrawerPopup>
                  </DrawerPortal>
                </Drawer>
              </div>
            ) : null}
            {!menuBelow ? <div className={menuShellClass}>{menu}</div> : null}
          </div>
          {utilities ? (
            <div
              className={[
                "flex max-w-full min-w-0 flex-1 flex-nowrap items-center justify-end",
                "gap-1 sm:gap-2",
              ].join(" ")}
            >
              {utilities}
            </div>
          ) : null}
        </div>
        {menuBelow ? (
          <div className={menuBelowRowClass}>
            <div className="flex min-h-11 min-w-0 flex-1 items-center pb-2">
              <div className="flex min-w-0 flex-1 items-center">{menu}</div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

EcommerceNavigation.displayName = "EcommerceNavigation";

// ── Navigation menu (Base UI + Velocity tokens) ─────────────────────────────

const menuRootClass =
  "relative flex min-w-0 flex-1 items-center justify-start outline-none";

export const EcommerceNavigationMenu = React.forwardRef<
  HTMLElement,
  EcommerceNavigationMenuProps
>(function EcommerceNavigationMenu(
  { className, delay = 75, closeDelay = 150, ...props },
  ref,
) {
  const portalContainerRef = React.useRef<HTMLElement | null>(null);

  const setRootRef = React.useCallback(
    (node: HTMLElement | null) => {
      portalContainerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  return (
    <EcommerceNavigationMenuPortalContainerRefContext.Provider
      value={portalContainerRef}
    >
      <NM.Root
        ref={setRootRef}
        className={[menuRootClass, className].filter(Boolean).join(" ")}
        delay={delay}
        closeDelay={closeDelay}
        {...props}
      />
    </EcommerceNavigationMenuPortalContainerRefContext.Provider>
  );
});

EcommerceNavigationMenu.displayName = "EcommerceNavigationMenu";

/** `z-20` keeps triggers above the portaled mega panel (`z-10`); transparent row lets the panel show below. */
const listClass =
  "relative z-20 m-0 flex list-none flex-wrap items-center gap-0.5 p-0 sm:flex-nowrap";

export const EcommerceNavigationMenuList = React.forwardRef<
  HTMLDivElement,
  EcommerceNavigationMenuListProps
>(function EcommerceNavigationMenuList({ className, ...props }, ref) {
  return (
    <NM.List
      ref={ref}
      className={[listClass, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});

EcommerceNavigationMenuList.displayName = "EcommerceNavigationMenuList";

export const EcommerceNavigationMenuItem = NM.Item;

const triggerClass = [
  "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium",
  "text-content-primary outline-none transition-colors duration-200",
  "hover:bg-surface-hover active:bg-surface-active",
  "data-popup-open:bg-surface-secondary",
  "focus-visible:relative focus-visible:ring-2 focus-visible:ring-border-focus",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
].join(" ");

export interface EcommerceNavigationMenuTriggerOwnProps {
  /** Set `false` to hide the chevron icon */
  showChevron?: boolean;
}

export const EcommerceNavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  EcommerceNavigationMenuTriggerProps & EcommerceNavigationMenuTriggerOwnProps
>(function EcommerceNavigationMenuTrigger(
  { className, children, showChevron = true, ...props },
  ref,
) {
  return (
    <NM.Trigger
      ref={ref}
      className={[triggerClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
      {showChevron ? (
        <NM.Icon className="text-content-tertiary transition-transform duration-200 ease-out data-popup-open:rotate-180">
          <ArrowDownIcon className="h-4 w-4" aria-hidden />
        </NM.Icon>
      ) : null}
    </NM.Trigger>
  );
});

EcommerceNavigationMenuTrigger.displayName = "EcommerceNavigationMenuTrigger";

const contentClass = [
  "h-full w-[min(100vw-2rem,56rem)] max-w-[min(100vw-2rem,56rem)] p-5 sm:p-6",
  "md:w-max md:min-w-[28rem]",
  "transition-[opacity,transform,translate] duration-200 ease-out",
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  "data-[starting-style]:data-[activation-direction=left]:translate-x-[-6px]",
  "data-[starting-style]:data-[activation-direction=right]:translate-x-[6px]",
  "data-[ending-style]:data-[activation-direction=left]:translate-x-[6px]",
  "data-[ending-style]:data-[activation-direction=right]:translate-x-[-6px]",
].join(" ");

export const EcommerceNavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  EcommerceNavigationMenuContentProps
>(function EcommerceNavigationMenuContent({ className, ...props }, ref) {
  return (
    <NM.Content
      ref={ref}
      className={[contentClass, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});

EcommerceNavigationMenuContent.displayName = "EcommerceNavigationMenuContent";

const linkCardClass = [
  "block rounded-lg no-underline outline-none transition-colors duration-200",
  "text-inherit",
  "hover:bg-surface-hover active:bg-surface-active",
  "focus-visible:relative focus-visible:ring-2 focus-visible:ring-border-focus",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
].join(" ");

export const EcommerceNavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  EcommerceNavigationMenuLinkProps
>(function EcommerceNavigationMenuLink(
  { className, closeOnClick = true, ...props },
  ref,
) {
  return (
    <NM.Link
      ref={ref}
      render={<a />}
      closeOnClick={closeOnClick}
      className={[linkCardClass, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});

EcommerceNavigationMenuLink.displayName = "EcommerceNavigationMenuLink";

export const EcommerceNavigationMenuIcon = NM.Icon;

/**
 * Portal + positioner + popup + viewport for mega panels.
 * Place **once** inside `EcommerceNavigationMenu`, as a sibling of `EcommerceNavigationMenuList`.
 */
export function EcommerceNavigationMegaViewport({
  sideOffset = 10,
  positionerClassName,
  popupClassName,
  showArrow = false,
}: EcommerceNavigationMegaViewportProps) {
  const menuPortalContainerRef = React.useContext(
    EcommerceNavigationMenuPortalContainerRefContext,
  );

  const positionerCn = [
    "box-border transition-[top,left,right,bottom] duration-200 ease-out data-[instant]:transition-none",
    "max-w-[var(--available-width)]",
    positionerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const popupCn = [
    "origin-[var(--transform-origin)] rounded-xl border border-border-default",
    "bg-surface-primary text-content-primary shadow-lg",
    "transition-[opacity,transform,width,height,scale] duration-200 ease-out",
    "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[ending-style]:duration-150",
    "outline-none focus:outline-none",
    popupClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <NM.Portal
      container={menuPortalContainerRef ?? undefined}
      className={menuPortalContainerRef ? "z-10" : undefined}
    >
      <NM.Positioner
        side="bottom"
        align="start"
        sideOffset={sideOffset}
        collisionPadding={{ top: 6, bottom: 12, left: 16, right: 16 }}
        collisionAvoidance={{ side: "none" }}
        className={positionerCn}
      >
        <NM.Popup className={popupCn}>
          {showArrow ? (
            <NM.Arrow className="flex data-[side=bottom]:top-[-7px]">
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                className="text-surface-primary"
                aria-hidden
              >
                <path
                  d="M7 0 L14 7 H0 Z"
                  fill="currentColor"
                  className="stroke-border-default"
                  strokeWidth="1"
                />
              </svg>
            </NM.Arrow>
          ) : null}
          <NM.Viewport className="relative h-full w-full overflow-hidden" />
        </NM.Popup>
      </NM.Positioner>
    </NM.Portal>
  );
}

EcommerceNavigationMegaViewport.displayName = "EcommerceNavigationMegaViewport";

// Re-export Base types for advanced composition
export type NavigationMenuRootChangeEventDetails = NM.Root.ChangeEventDetails;
