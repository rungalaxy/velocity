import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentType } from "react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "./Icon";
import {
  AddIcon,
  AlertIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseCircleIcon,
  CloseIcon,
  DashboardIcon,
  DeleteIcon,
  DragMoveIcon,
  FileIcon,
  FileListIcon,
  FlagIcon,
  GiftIcon,
  HeartIcon,
  InformationIcon,
  LoaderIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  MoonIcon,
  NotificationIcon,
  PackageBoxIcon,
  RunIcon,
  RulerIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  SidebarIcon,
  StarFilledIcon,
  StarOutlineIcon,
  StoreIcon,
  SubtractIcon,
  SunIcon,
  TagIcon,
  TruckIcon,
  UploadCloudIcon,
  UserIcon,
} from "./velocity-icons";

type IconEntry = {
  name: string;
  Icon: ComponentType<{ className?: string }>;
};

const curatedIcons: IconEntry[] = [
  { name: "AddIcon", Icon: AddIcon },
  { name: "AlertIcon", Icon: AlertIcon },
  { name: "ArrowDownIcon", Icon: ArrowDownIcon },
  { name: "ArrowLeftIcon", Icon: ArrowLeftIcon },
  { name: "ArrowRightIcon", Icon: ArrowRightIcon },
  { name: "CalendarIcon", Icon: CalendarIcon },
  { name: "CheckCircleIcon", Icon: CheckCircleIcon },
  { name: "CheckIcon", Icon: CheckIcon },
  { name: "CloseCircleIcon", Icon: CloseCircleIcon },
  { name: "CloseIcon", Icon: CloseIcon },
  { name: "DashboardIcon", Icon: DashboardIcon },
  { name: "DeleteIcon", Icon: DeleteIcon },
  { name: "DragMoveIcon", Icon: DragMoveIcon },
  { name: "FileIcon", Icon: FileIcon },
  { name: "FileListIcon", Icon: FileListIcon },
  { name: "FlagIcon", Icon: FlagIcon },
  { name: "GiftIcon", Icon: GiftIcon },
  { name: "HeartIcon", Icon: HeartIcon },
  { name: "InformationIcon", Icon: InformationIcon },
  { name: "LoaderIcon", Icon: LoaderIcon },
  { name: "LockIcon", Icon: LockIcon },
  { name: "MailIcon", Icon: MailIcon },
  { name: "MapPinIcon", Icon: MapPinIcon },
  { name: "MenuIcon", Icon: MenuIcon },
  { name: "MoonIcon", Icon: MoonIcon },
  { name: "NotificationIcon", Icon: NotificationIcon },
  { name: "PackageBoxIcon", Icon: PackageBoxIcon },
  { name: "RunIcon", Icon: RunIcon },
  { name: "RulerIcon", Icon: RulerIcon },
  { name: "SearchIcon", Icon: SearchIcon },
  { name: "SettingsIcon", Icon: SettingsIcon },
  { name: "ShoppingBagIcon", Icon: ShoppingBagIcon },
  { name: "ShoppingCartIcon", Icon: ShoppingCartIcon },
  { name: "SidebarIcon", Icon: SidebarIcon },
  { name: "StarFilledIcon", Icon: StarFilledIcon },
  { name: "StarOutlineIcon", Icon: StarOutlineIcon },
  { name: "StoreIcon", Icon: StoreIcon },
  { name: "SubtractIcon", Icon: SubtractIcon },
  { name: "SunIcon", Icon: SunIcon },
  { name: "TagIcon", Icon: TagIcon },
  { name: "TruckIcon", Icon: TruckIcon },
  { name: "UploadCloudIcon", Icon: UploadCloudIcon },
  { name: "UserIcon", Icon: UserIcon },
];

function IconsPlaceholder() {
  return null;
}

const meta: Meta<typeof IconsPlaceholder> = {
  title: "Foundations/Icons",
  component: IconsPlaceholder,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Velocity ships curated [Hugeicons](https://hugeicons.com/) wrappers from `velocity-ds/icons`. Use named exports in components and stories; use `Icon` + `@hugeicons/core-free-icons` for icons not yet in the catalog.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function IconTile({ name, Icon: IconComponent }: IconEntry) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border-subtle bg-surface-secondary p-4 text-center">
      <IconComponent className="size-6 text-content-primary" aria-hidden />
      <code className="text-caption leading-tight text-content-tertiary">{name}</code>
    </div>
  );
}

export const Catalog: Story = {
  name: "Curated catalog",
  render: () => (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="space-y-1 border-b border-border-default pb-6">
        <p className="text-overline uppercase text-content-tertiary">Foundations</p>
        <h2 className="text-heading-2">Hugeicons</h2>
        <p className="text-body text-content-secondary">
          {curatedIcons.length} icons exported from{" "}
          <code className="text-caption">velocity-ds/icons</code>. Free stroke-rounded
          set via <code className="text-caption">@hugeicons/core-free-icons</code>.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {curatedIcons.map((entry) => (
          <IconTile key={entry.name} {...entry} />
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="mx-auto flex max-w-md flex-col gap-6 rounded-2xl bg-surface-primary p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Tailwind sizing
      </p>
      <div className="flex items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <SearchIcon className="size-4 text-content-primary" aria-hidden />
          <code className="text-caption text-content-tertiary">size-4</code>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SearchIcon className="size-5 text-content-primary" aria-hidden />
          <code className="text-caption text-content-tertiary">size-5</code>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SearchIcon className="size-6 text-content-primary" aria-hidden />
          <code className="text-caption text-content-tertiary">size-6</code>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SearchIcon className="size-8 text-content-primary" aria-hidden />
          <code className="text-caption text-content-tertiary">size-8</code>
        </div>
      </div>
    </div>
  ),
};

export const SemanticColors: Story = {
  name: "Semantic colors",
  render: () => (
    <div className="mx-auto flex max-w-lg flex-wrap gap-6 rounded-2xl bg-surface-primary p-8">
      <HeartIcon className="size-6 text-content-brand" aria-hidden />
      <CheckCircleIcon className="size-6 text-feedback-positive" aria-hidden />
      <AlertIcon className="size-6 text-feedback-caution" aria-hidden />
      <CloseCircleIcon className="size-6 text-feedback-negative" aria-hidden />
      <InformationIcon className="size-6 text-feedback-neutral" aria-hidden />
      <LoaderIcon className="size-6 animate-spin text-content-secondary" aria-hidden />
    </div>
  ),
};

export const PrimitiveUsage: Story = {
  name: "Icon primitive",
  parameters: {
    docs: {
      description: {
        story:
          "For icons outside the curated set, compose `Icon` with any export from `@hugeicons/core-free-icons`.",
      },
    },
  },
  render: () => (
    <div className="mx-auto flex max-w-md flex-col gap-4 rounded-2xl border border-border-default bg-surface-secondary p-6">
      <Icon icon={Search01Icon} className="size-6 text-content-primary" aria-hidden />
      <pre className="overflow-x-auto rounded-lg bg-surface-primary p-4 text-caption text-content-secondary">
        {`import { Icon } from "velocity-ds/icons";
import { Search01Icon } from "@hugeicons/core-free-icons";

<Icon icon={Search01Icon} className="size-6" aria-hidden />`}
      </pre>
    </div>
  ),
};

export const Overview: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="bg-background-primary p-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-2">
          <p className="text-overline uppercase text-content-tertiary">Foundations</p>
          <h1 className="text-heading-1 text-content-primary">Icons</h1>
          <p className="max-w-2xl text-body text-content-secondary">
            Import named icons from{" "}
            <code className="text-caption">velocity-ds/icons</code>. Size with Tailwind
            (<code className="text-caption">size-4</code>,{" "}
            <code className="text-caption">h-5 w-5</code>) and color with semantic
            tokens (<code className="text-caption">text-content-brand</code>).
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-heading-4 text-content-tertiary">Catalog</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {curatedIcons.map((entry) => (
              <IconTile key={entry.name} {...entry} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-surface-primary p-6">
            <h2 className="text-heading-4 text-content-tertiary">Sizes</h2>
            <div className="flex items-end gap-6">
              {(["size-4", "size-5", "size-6", "size-8"] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <MenuIcon className={`${size} text-content-primary`} aria-hidden />
                  <code className="text-caption text-content-tertiary">{size}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-surface-primary p-6">
            <h2 className="text-heading-4 text-content-tertiary">Semantic colors</h2>
            <div className="flex flex-wrap gap-5">
              <HeartIcon className="size-6 text-content-brand" aria-hidden />
              <CheckCircleIcon className="size-6 text-feedback-positive" aria-hidden />
              <AlertIcon className="size-6 text-feedback-caution" aria-hidden />
              <CloseCircleIcon className="size-6 text-feedback-negative" aria-hidden />
              <StarFilledIcon className="size-6 fill-current text-state-warning" aria-hidden />
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};
