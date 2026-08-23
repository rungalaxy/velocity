import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ArrowDownIcon,
  DashboardIcon,
  FileListIcon,
  MoonIcon,
  PackageBoxIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingBagIcon,
  StoreIcon,
  SunIcon,
  UserIcon,
} from "../../icons";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuCollapsible,
  SidebarMenuCollapsiblePanel,
  SidebarMenuCollapsibleTrigger,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./Sidebar";

const meta = {
  title: "Components/Sidebar",
  component: SidebarProvider,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Application sidebar inspired by [Core 2.0](https://ui8-core-2.vercel.app/products): seamless `surface-tertiary` rail, 48px nav rows, tree-style submenus with **animated** Base UI collapsibles, and a white elevated pill for the active leaf. Desktop: collapsible; mobile: **Drawer**. Toggle with **SidebarTrigger** (ghost) or `Cmd/Ctrl+B`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function BrandMark() {
  return (
    <div
      className="flex size-12 items-center justify-center rounded-full bg-shade-02 text-content-inverse"
      aria-hidden
    >
      <span className="font-heading text-sm font-semibold tracking-tight">
        V
      </span>
    </div>
  );
}

function readDocumentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">(readDocumentTheme);
  const isDark = theme === "dark";

  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(readDocumentTheme());
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const applyTheme = (next: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };

  return (
    <div className="flex w-12 flex-col gap-1 rounded-full bg-surface-secondary p-1.5">
      <IconButton
        label="Dark mode"
        size="sm"
        variant={isDark ? "solid" : "ghost"}
        colorScheme="neutral"
        aria-pressed={isDark}
        className="!size-9 !min-w-9 !max-w-9 !rounded-full"
        onClick={() => applyTheme("dark")}
      >
        <MoonIcon className="size-4" aria-hidden />
      </IconButton>
      <IconButton
        label="Light mode"
        size="sm"
        variant={!isDark ? "solid" : "ghost"}
        colorScheme="neutral"
        aria-pressed={!isDark}
        className="!size-9 !min-w-9 !max-w-9 !rounded-full"
        onClick={() => applyTheme("light")}
      >
        <SunIcon className="size-4" aria-hidden />
      </IconButton>
    </div>
  );
}

function Chevron() {
  return (
    <ArrowDownIcon
      aria-hidden
      className="ml-auto size-5 shrink-0 transition-transform duration-normal ease-standard group-data-[open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden"
    />
  );
}

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <BrandMark />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <DashboardIcon aria-hidden />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuCollapsible defaultOpen>
                  <SidebarMenuCollapsibleTrigger
                    render={
                      <SidebarMenuButton className="group-data-[open]/collapsible:text-content-primary" />
                    }
                  >
                    <PackageBoxIcon aria-hidden />
                    <span>Products</span>
                    <Chevron />
                  </SidebarMenuCollapsibleTrigger>
                  <SidebarMenuCollapsiblePanel>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive href="#">
                          <span>Overview</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Drafts</span>
                          <SidebarMenuBadge variant="warning">2</SidebarMenuBadge>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Released</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Comments</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Scheduled</span>
                          <SidebarMenuBadge variant="success">8</SidebarMenuBadge>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuCollapsiblePanel>
                </SidebarMenuCollapsible>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuCollapsible>
                  <SidebarMenuCollapsibleTrigger
                    render={
                      <SidebarMenuButton className="group-data-[open]/collapsible:text-content-primary" />
                    }
                  >
                    <UserIcon aria-hidden />
                    <span>Customers</span>
                    <Chevron />
                  </SidebarMenuCollapsibleTrigger>
                  <SidebarMenuCollapsiblePanel>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Overview</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Customer list</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuCollapsiblePanel>
                </SidebarMenuCollapsible>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Shop">
                  <StoreIcon aria-hidden />
                  <span>Shop</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuCollapsible>
                  <SidebarMenuCollapsibleTrigger
                    render={
                      <SidebarMenuButton className="group-data-[open]/collapsible:text-content-primary" />
                    }
                  >
                    <ShoppingBagIcon aria-hidden />
                    <span>Income</span>
                    <Chevron />
                  </SidebarMenuCollapsibleTrigger>
                  <SidebarMenuCollapsiblePanel>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Earning</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Refunds</span>
                          <SidebarMenuBadge variant="warning">3</SidebarMenuBadge>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Payouts</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Statements</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuCollapsiblePanel>
                </SidebarMenuCollapsible>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Promote">
                  <FileListIcon aria-hidden />
                  <span>Promote</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-[5.5rem] items-center gap-4 px-5">
          <SidebarTrigger />
          <div className="min-w-0 flex-1 [&>div]:w-full">
            <Input
              size="lg"
              type="search"
              placeholder="Search anything..."
              leadingIcon={<SearchIcon aria-hidden />}
              aria-label="Search"
            />
          </div>
          <Button size="lg" variant="solid" colorScheme="primary">
            Create
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-5 pb-8">
          <div className="rounded-3xl bg-surface-primary p-6 shadow-sm">
            <h1 className="font-heading text-xl font-semibold text-content-primary">
              Product overview
            </h1>
            <p className="mt-2 text-sm text-content-secondary">
              Sidebar styled like{" "}
              <a
                className="underline"
                href="https://ui8-core-2.vercel.app/products"
                target="_blank"
                rel="noreferrer"
              >
                Core 2.0
              </a>
              — animated subnav, soft rail, active pill.
            </p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const IconCollapsed: Story = {
  name: "Icon collapse",
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-[5.5rem] items-center gap-4 px-5">
          <SidebarTrigger />
          <span className="text-sm font-semibold text-content-primary">
            Icon mode
          </span>
        </header>
        <main className="px-5 text-sm text-content-secondary">
          Sidebar starts collapsed — hover icons for tooltips.
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const CompactNav: Story = {
  name: "Flat nav",
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <BrandMark />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Dashboard">
                    <DashboardIcon aria-hidden />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Listings">
                    <FileListIcon aria-hidden />
                    <span>Listings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <SettingsIcon aria-hidden />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-[5.5rem] items-center gap-4 px-5">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  ),
};
