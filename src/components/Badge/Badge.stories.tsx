import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Status label for Active, New, Sale, etc. Soft tinted border + `text-caption` (matches design: `h-6 px-1.5 rounded-lg border capitalize`).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info", "brand"],
      description: "Color variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Badge size",
    },
    outline: {
      control: "boolean",
      description: "Outline style instead of filled",
    },
    rounded: {
      control: "boolean",
      description: "Full pill shape",
    },
    children: {
      control: "text",
      description: "Badge content",
    },
  },
  args: {
    children: "Active",
    variant: "success",
    size: "md",
    outline: false,
    rounded: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: { variant: "default", children: "Default" },
};

// Variants
export const Success: Story = {
  args: { variant: "success", children: "Active" },
};
export const Warning: Story = {
  args: { variant: "warning", children: "Low stock" },
};
export const Error: Story = {
  args: { variant: "error", children: "Out of stock" },
};
export const Info: Story = { args: { variant: "info", children: "Pre-order" } };
export const Brand: Story = {
  args: { variant: "brand", children: "Best seller" },
};

// Outline
export const OutlineDefault: Story = {
  args: { outline: true, children: "Draft" },
};
export const OutlineSuccess: Story = {
  args: { variant: "success", outline: true, children: "Active" },
};

// Rounded (pill)
export const Rounded: Story = {
  args: { rounded: true, children: "Pill" },
};
export const RoundedBrand: Story = {
  args: { variant: "brand", rounded: true, children: "Sale" },
};

// Sizes
export const Small: Story = { args: { size: "sm", children: "SM" } };
export const Medium: Story = { args: { size: "md", children: "MD" } };
export const Large: Story = { args: { size: "lg", children: "LG" } };

// Disabled (visual only — no native disabled)
export const AllVariantsFilled: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
        Soft (default)
      </span>
      <div className="flex items-center gap-3 flex-wrap">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Low stock</Badge>
        <Badge variant="error">Out of stock</Badge>
        <Badge variant="info">Pre-order</Badge>
        <Badge variant="brand">Best seller</Badge>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};

export const AllVariantsOutline: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
        Outline
      </span>
      <div className="flex items-center gap-3 flex-wrap">
        <Badge variant="default" outline>
          Default
        </Badge>
        <Badge variant="success" outline>
          Active
        </Badge>
        <Badge variant="warning" outline>
          Pending
        </Badge>
        <Badge variant="error" outline>
          Rejected
        </Badge>
        <Badge variant="info" outline>
          Info
        </Badge>
        <Badge variant="brand" outline>
          Featured
        </Badge>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm" variant="brand">
        Small
      </Badge>
      <Badge size="md" variant="brand">
        Medium
      </Badge>
      <Badge size="lg" variant="brand">
        Large
      </Badge>
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      {(["default", "success", "warning", "error", "info", "brand"] as const).map(
        (variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
              {variant}
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant={variant}>Soft</Badge>
              <Badge variant={variant} outline>
                Outline
              </Badge>
              <Badge variant={variant} rounded>
                Pill
              </Badge>
              <Badge variant={variant} outline rounded>
                Pill Outline
              </Badge>
            </div>
          </div>
        ),
      )}
    </div>
  ),
  parameters: { layout: "padded" },
};
