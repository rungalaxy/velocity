import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArrowRightIcon,
  TagIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "../../../icons";
import { Button } from "../../Button/Button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerPortal,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "../../Drawer/Drawer";
import { IconButton } from "../../IconButton/IconButton";
import { Logo } from "../../Logo/Logo";
import { EcommerceSearchInput } from "../EcommerceSearchInput/EcommerceSearchInput";
import { EcommerceNavigationSearch } from "../EcommerceSearchInput/EcommerceNavigationSearch";
import type { EcommerceSearchResultItem } from "../EcommerceSearchInput/EcommerceNavigationSearch";
import {
  ProductCard,
  ProductCardBrand,
  ProductCardContent,
  ProductCardImage,
  ProductCardPrice,
  ProductCardTitle,
} from "../ProductCard/ProductCard";
import {
  EcommerceNavigation,
  EcommerceNavigationMegaViewport,
  EcommerceNavigationMenu,
  EcommerceNavigationMenuContent,
  EcommerceNavigationMenuItem,
  EcommerceNavigationMenuLink,
  EcommerceNavigationMenuList,
  EcommerceNavigationMenuTrigger,
} from "./EcommerceNavigation";
import { Badge } from "../../Badge/Badge";
import { NotificationBadge } from "../../NotificationBadge/NotificationBadge";

const shoesLinks = [
  {
    href: "#",
    title: "Road",
    desc: "Pre-loved road shoes and carbon plates",
  },
  {
    href: "#",
    title: "Trail & skyrunning",
    desc: "Lugs, aggressive outsoles, skyracing models",
  },
  {
    href: "#",
    title: "Track & race",
    desc: "Spikes, lightweight session shoes",
  },
  {
    href: "#",
    title: "By brand",
    desc: "Nike, Saucony, Asics, Hoka, New Balance…",
  },
] as const;

const apparelLinks = [
  {
    href: "#",
    title: "Tops",
    desc: "Technical tees, tanks, mid-layers",
  },
  {
    href: "#",
    title: "Tights & shorts",
    desc: "Winter / summer, trail, compression",
  },
  {
    href: "#",
    title: "Jackets & wind shells",
    desc: "Breathable waterproofs, light insulation",
  },
  {
    href: "#",
    title: "Base layers",
    desc: "Merino, synthetic, first layer",
  },
] as const;

const accessoriesLinks = [
  {
    href: "#",
    title: "GPS watches & heart rate",
    desc: "Garmin, Coros, Polar — running",
  },
  {
    href: "#",
    title: "Cycling GPS & bike computers",
    desc: "Garmin Edge, Wahoo, refurbished head units",
  },
  {
    href: "#",
    title: "HR straps & sensors",
    desc: "Heart rate belts, foot pods, power meters",
  },
  {
    href: "#",
    title: "Packs & hydration",
    desc: "Bottle belts, trail vests, flasks",
  },
] as const;

function MegaLinkGrid({
  items,
}: {
  items: readonly { href: string; title: string; desc: string }[];
}) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-2">
      {items.map((item) => (
        <li key={item.title}>
          <EcommerceNavigationMenuLink
            href={item.href}
            className="px-4 py-3 sm:px-5 sm:py-3.5"
          >
            <span className="block text-base font-medium text-content-primary">
              {item.title}
            </span>
            <span className="mt-1 block text-sm text-content-tertiary">
              {item.desc}
            </span>
          </EcommerceNavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

/** Promo aside shown next to shoe links on desktop mega menu and below links in the mobile drawer. */
function ShoesNavAsideCard({ className }: { className?: string }) {
  return (
    <div
      className={["rounded-xl bg-surface-secondary p-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <h3 className="m-0 text-sm font-medium text-content-primary">
        Sizing & condition
      </h3>
      <p className="mt-1 text-xs text-content-secondary">
        Every listing shows wear and shoe width so you can buy with confidence.
      </p>
      <Button
        type="button"
        variant="outline"
        colorScheme="neutral"
        size="md"
        className="mt-4 w-full"
      >
        Read the guide
      </Button>
    </div>
  );
}

function MobileLinkList({
  items,
}: {
  items: readonly { href: string; title: string; desc: string }[];
}) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((item) => (
        <li key={item.title}>
          <a
            href={item.href}
            className={[
              "block rounded-full px-4 py-3.5 no-underline outline-none transition-colors",
              "hover:bg-surface-hover focus-visible:relative focus-visible:ring-2",
              "focus-visible:ring-border-focus focus-visible:ring-offset-2",
              "focus-visible:ring-offset-surface-primary",
            ].join(" ")}
          >
            <span className="block text-sm font-medium text-content-primary">
              {item.title}
            </span>
            <span className="mt-0.5 block text-xs text-content-tertiary">
              {item.desc}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const mobileSections = [
  { id: "shoes" as const, label: "Shoes", items: shoesLinks },
  { id: "apparel" as const, label: "Apparel", items: apparelLinks },
  {
    id: "accessories" as const,
    label: "Accessories",
    items: accessoriesLinks,
  },
];

type MobileSectionId = (typeof mobileSections)[number]["id"];

const mobileRootRowClass = [
  "flex w-full items-center justify-between gap-2 rounded-full px-4 py-3.5 text-left text-sm font-medium",
  "text-content-primary no-underline outline-none transition-colors hover:bg-surface-hover",
  "focus-visible:relative focus-visible:ring-2 focus-visible:ring-border-focus",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary",
].join(" ");

const breadcrumbLinkClass = [
  "inline-block rounded-md px-2 py-1.5 text-content-secondary no-underline outline-none transition-colors",
  "hover:bg-surface-hover hover:text-content-primary hover:no-underline",
  "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
  "focus-visible:ring-offset-surface-primary",
].join(" ");

function SellProductCta({
  className,
  fullWidth,
  children = "Vendre un produit",
}: {
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="solid"
      colorScheme="primary"
      size="md"
      fullWidth={fullWidth}
      className={className}
      aria-label="Vendre un produit"
      startIcon={<TagIcon className="h-4 w-4" aria-hidden />}
    >
      {children}
    </Button>
  );
}

/** Same IA as the mega menu: drill-down with breadcrumb (small viewports). */
function MobileNavPanel() {
  const [section, setSection] = React.useState<MobileSectionId | null>(null);

  const active = section ? mobileSections.find((s) => s.id === section) : null;

  return (
    <div>
      {active ? (
        <nav aria-label="Breadcrumb" className="mb-3 text-sm">
          <ol className="m-0 flex flex-wrap items-center gap-x-1.5 gap-y-1 px-1 py-0">
            <li className="flex min-w-0 items-center">
              <a
                href="#"
                className={breadcrumbLinkClass}
                onClick={(e) => {
                  e.preventDefault();
                  setSection(null);
                }}
              >
                Menu
              </a>
            </li>
            <li
              aria-hidden
              className="shrink-0 select-none text-content-tertiary"
            >
              /
            </li>
            <li className="min-w-0 px-2 py-1.5 font-medium text-content-primary">
              <span aria-current="page">{active.label}</span>
            </li>
          </ol>
        </nav>
      ) : null}

      <nav aria-label="Main navigation">
        {active ? (
          active.id === "shoes" ? (
            <div className="flex flex-col">
              <MobileLinkList items={active.items} />
              <ShoesNavAsideCard className="mt-5 w-full" />
            </div>
          ) : (
            <MobileLinkList items={active.items} />
          )
        ) : (
          <div className="flex flex-col gap-1">
            <ul className="m-0 list-none p-0">
              {mobileSections.map((s) => (
                <li key={s.id}>
                  <a
                    href="#"
                    className={mobileRootRowClass}
                    onClick={(e) => {
                      e.preventDefault();
                      setSection(s.id);
                    }}
                  >
                    {s.label}
                    <ArrowRightIcon
                      className="h-4 w-4 shrink-0 text-content-tertiary"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={[
                "flex items-center rounded-full px-4 py-3.5 text-sm font-medium text-content-brand",
                "no-underline outline-none transition-colors hover:bg-surface-hover",
                "focus-visible:relative focus-visible:ring-2 focus-visible:ring-border-focus",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary",
              ].join(" ")}
            >
              Deals
              <Badge variant="brand" size="sm" className="ml-2">
                New
              </Badge>
            </a>
          </div>
        )}
      </nav>

      <div className="mt-6 border-t border-border-default pt-4">
        <SellProductCta fullWidth />
      </div>
    </div>
  );
}

/** Demo products for navigation search (French marketplace). */
const NAV_SEARCH_PRODUCTS: readonly EcommerceSearchResultItem[] = [
  {
    id: "nike-pegasus-40",
    title: "Pegasus 40 — taille 42",
    brand: "Nike",
    price: "89,00 €",
    originalPrice: "120,00 €",
    imageSrc:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    imageAlt: "Nike Pegasus 40",
    category: "Chaussures route",
    href: "#",
  },
  {
    id: "saucony-endorphin-speed-3",
    title: "Endorphin Speed 3",
    brand: "Saucony",
    price: "95,00 €",
    imageSrc:
      "https://images.unsplash.com/photo-1606107557195-0a74c4788f17?w=400&h=300&fit=crop",
    imageAlt: "Saucony Endorphin Speed 3",
    category: "Chaussures route",
    href: "#",
  },
  {
    id: "garmin-forerunner-965",
    title: "Forerunner 965",
    brand: "Garmin",
    price: "449,00 €",
    originalPrice: "599,00 €",
    imageSrc:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
    imageAlt: "Garmin Forerunner 965",
    category: "Montre GPS",
    href: "#",
  },
  {
    id: "wahoo-elemnt-roam",
    title: "Elemnt Roam",
    brand: "Wahoo",
    price: "279,00 €",
    imageSrc:
      "https://images.unsplash.com/photo-1508685098649-9aacd3260913?w=400&h=300&fit=crop",
    imageAlt: "Wahoo Elemnt Roam",
    category: "GPS vélo",
    href: "#",
  },
  {
    id: "polar-h10",
    title: "H10 — ceinture cardio",
    brand: "Polar",
    price: "59,00 €",
    imageSrc:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    imageAlt: "Polar H10",
    category: "Capteurs",
    href: "#",
  },
  {
    id: "patagonia-trail-short",
    title: "Short trail",
    brand: "Patagonia",
    price: "32,00 €",
    imageSrc:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop",
    imageAlt: "Short trail Patagonia",
    category: "Textile",
    href: "#",
  },
  {
    id: "on-cap",
    title: "Casquette running",
    brand: "On",
    price: "18,00 €",
    imageSrc:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    imageAlt: "Casquette On Running",
    category: "Accessoires",
    href: "#",
  },
  {
    id: "hydration-bottle",
    title: "Bidon isotherme 500 ml",
    brand: "Elite",
    price: "12,00 €",
    imageSrc:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop",
    imageAlt: "Bidon isotherme 500 ml",
    category: "Hydratation",
    href: "#",
  },
];

function filterNavSearchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return NAV_SEARCH_PRODUCTS.filter((item) => {
    const haystack = [item.title, item.brand, item.category]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  }).slice(0, 8);
}

function NavSearchProductList({
  id,
  items,
  listClassName,
}: {
  id: string;
  items: readonly EcommerceSearchResultItem[];
  listClassName?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul
      id={id}
      role="list"
      aria-label="Résultats de recherche"
      className={["m-0 list-none p-0", listClassName].filter(Boolean).join(" ")}
    >
      {items.map((item) => (
        <li key={item.id ?? item.title} className="py-1.5">
          <ProductCard layout="horizontal" size="sm" variant="ghost" href={item.href ?? "#"}>
            <ProductCardImage src={item.imageSrc} alt={item.imageAlt} />
            <ProductCardContent>
              <ProductCardBrand>{item.brand}</ProductCardBrand>
              <ProductCardTitle>{item.title}</ProductCardTitle>
              <ProductCardPrice
                price={item.price}
                originalPrice={item.originalPrice}
              />
            </ProductCardContent>
          </ProductCard>
        </li>
      ))}
    </ul>
  );
}

/**
 * Mobile: **full-viewport** search sheet (`md:hidden`) — same dataset as desktop, list scrolls under the field.
 */
function NavigationMobileFullPageSearch() {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listId = React.useId();
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(
    () => filterNavSearchProducts(query),
    [query],
  );

  React.useEffect(() => {
    if (sheetOpen) {
      inputRef.current?.focus();
    }
  }, [sheetOpen]);

  const trimmed = query.trim();

  return (
    <Drawer open={sheetOpen} onOpenChange={setSheetOpen} side="right" modal>
      <DrawerTrigger
        render={
          <IconButton
            className="md:hidden"
            label="Rechercher"
            variant="ghost"
            colorScheme="neutral"
            size="md"
          >
            <SearchIcon className="h-6 w-6" />
          </IconButton>
        }
      />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerPopup
          className="w-full! max-w-none border-0 shadow-xl"
          contentClassName="flex h-full min-h-0 flex-col overflow-hidden p-0"
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-border-default px-4 py-3">
            <DrawerClose className="relative top-0 right-0 shrink-0" />
            <DrawerTitle className="m-0 flex-1 text-base font-semibold text-content-primary">
              Rechercher
            </DrawerTitle>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
            <EcommerceSearchInput
              ref={inputRef}
              size="md"
              placeholder="Rechercher un produit…"
              aria-label="Rechercher sur le site"
              aria-controls={listId}
              className="w-full shrink-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {trimmed ? (
              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <p className="m-0 text-sm font-medium text-content-primary">
                  Résultats pour « {trimmed} »
                </p>
                {filtered.length > 0 ? (
                  <NavSearchProductList
                    id={listId}
                    items={filtered}
                    listClassName="min-h-0 flex-1"
                  />
                ) : (
                  <p className="m-0 text-sm text-content-tertiary">
                    Aucun résultat pour « {trimmed} »
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </DrawerPopup>
      </DrawerPortal>
    </Drawer>
  );
}

const meta: Meta = {
  title: "Ecommerce/Navigation",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "Storefront header for a **second-hand running gear** marketplace (shoes, apparel, accessories & electronics).",
          "Built on [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu).",
          "Compose `EcommerceNavigationMenu*` and place `EcommerceNavigationMegaViewport` once next to the list.",
          "Pass `mobileMenu` for a left drawer below `md` (demo uses breadcrumb drill-down).",
          'Set `navPlacement="below"` to put desktop nav links on a **second row** under the logo / search bar.',
          "The **Default** story: desktop search focuses the field, blurs the page, and shows **horizontal `ProductCard`** results; **below `md`** the loupe opens a full-screen search sheet with the same product list.",
        ].join(" "),
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-[480px] bg-background-primary">
      <EcommerceNavigation
        brand={
          <a
            href="#"
            className="flex shrink-0 items-center rounded-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <Logo size="md" aria-label="Runswap — Home" />
          </a>
        }
        mobileMenu={<MobileNavPanel />}
        navPlacement="below"
        menu={
          <EcommerceNavigationMenu>
            <EcommerceNavigationMenuList>
              <EcommerceNavigationMenuItem value="shoes">
                <EcommerceNavigationMenuTrigger>
                  Shoes
                </EcommerceNavigationMenuTrigger>
                <EcommerceNavigationMenuContent>
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                    <div className="min-w-0 flex-1">
                      <h2 className="m-0 mb-3 font-heading text-xl font-semibold text-content-primary">
                        Pre-loved running shoes
                      </h2>
                      <MegaLinkGrid items={shoesLinks} />
                    </div>
                    <div className="hidden w-52 shrink-0 lg:block">
                      <ShoesNavAsideCard />
                    </div>
                  </div>
                </EcommerceNavigationMenuContent>
              </EcommerceNavigationMenuItem>

              <EcommerceNavigationMenuItem value="apparel">
                <EcommerceNavigationMenuTrigger>
                  Apparel
                </EcommerceNavigationMenuTrigger>
                <EcommerceNavigationMenuContent>
                  <h2 className="m-0 mb-3 font-heading text-xl font-semibold text-content-primary">
                    Second-hand technical kit
                  </h2>
                  <MegaLinkGrid items={apparelLinks} />
                </EcommerceNavigationMenuContent>
              </EcommerceNavigationMenuItem>

              <EcommerceNavigationMenuItem value="accessories">
                <EcommerceNavigationMenuTrigger>
                  Accessories
                </EcommerceNavigationMenuTrigger>
                <EcommerceNavigationMenuContent>
                  <h2 className="m-0 mb-3 font-heading text-xl font-semibold text-content-primary">
                    GPS, heart rate, cycling & more
                  </h2>
                  <MegaLinkGrid items={accessoriesLinks} />
                </EcommerceNavigationMenuContent>
              </EcommerceNavigationMenuItem>

              <EcommerceNavigationMenuItem value="deals">
                <EcommerceNavigationMenuLink
                  href="#"
                  className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-content-brand"
                >
                  Deals
                  <Badge variant="brand" size="md" className="ml-0">
                    New
                  </Badge>
                </EcommerceNavigationMenuLink>
              </EcommerceNavigationMenuItem>
            </EcommerceNavigationMenuList>
            <EcommerceNavigationMegaViewport />
          </EcommerceNavigationMenu>
        }
        utilities={
          <>
            <div className="hidden min-w-0 max-w-full flex-1 basis-0 md:block">
              <EcommerceNavigationSearch
                className="min-w-0 w-full"
                size="md"
                placeholder="Rechercher un produit…"
                aria-label="Rechercher sur le site"
                suggestions={NAV_SEARCH_PRODUCTS}
              />
            </div>
            <NavigationMobileFullPageSearch />
            <IconButton
              label="Account"
              variant="ghost"
              colorScheme="neutral"
              size="md"
            >
              <UserIcon className="h-6 w-6" />
            </IconButton>
            <span className="relative inline-flex">
              <IconButton
                label="Cart, 3 items"
                variant="ghost"
                colorScheme="neutral"
                size="md"
              >
                <ShoppingCartIcon className="h-6 w-6" />
              </IconButton>
              <NotificationBadge
                count={3}
                className="absolute -right-0.5 -top-0.5 z-10"
                aria-hidden
              />
            </span>
            <span className="hidden md:contents">
              <SellProductCta className="ml-2 shrink-0 whitespace-nowrap">
                <span className="inline">Vendre un produit</span>
              </SellProductCta>
            </span>
          </>
        }
      />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-content-secondary">
          Page content — on wide screens, hover nav items for the mega menu; on
          narrow screens, use the menu and search icons next to the logo (search
          opens a full-screen sheet with suggestions).
        </p>
      </main>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div className="min-h-[360px] bg-background-primary">
      <EcommerceNavigation
        brand={
          <a
            href="#"
            className="flex shrink-0 items-center rounded-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <Logo size="md" aria-label="Runswap — Home" />
          </a>
        }
        menu={
          <EcommerceNavigationMenu>
            <EcommerceNavigationMenuList>
              <EcommerceNavigationMenuItem value="accessories-tech">
                <EcommerceNavigationMenuTrigger>
                  Accessories & tech
                </EcommerceNavigationMenuTrigger>
                <EcommerceNavigationMenuContent>
                  <h2 className="m-0 mb-3 font-heading text-xs font-semibold uppercase tracking-wider text-content-tertiary">
                    Pre-owned electronics & sensors
                  </h2>
                  <MegaLinkGrid items={accessoriesLinks} />
                </EcommerceNavigationMenuContent>
              </EcommerceNavigationMenuItem>
            </EcommerceNavigationMenuList>
            <EcommerceNavigationMegaViewport showArrow />
          </EcommerceNavigationMenu>
        }
      />
    </div>
  ),
};
