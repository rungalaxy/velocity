import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Runswap wordmark: `currentColor` from **`variant`** (`default` | `inverse` | `inherit`). Use **`variant=\"inverse\"`** on dark / brand bars (light theme). Do not rely on `className=\"text-content-inverse\"` alone — it can lose to the default `text-*` utility in Tailwind.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "inverse", "inherit"] },
  },
  args: {
    size: "md",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6 p-8">
      <div className="flex items-end gap-8">
        <Logo size="sm" />
        <Logo size="md" />
        <Logo size="lg" />
      </div>
      <p className="text-body-sm text-content-tertiary">sm · md · lg</p>
    </div>
  ),
};

export const OnInverseSurface: Story = {
  name: "On inverse / brand bar",
  render: () => (
    <div className="flex flex-col gap-6 rounded-2xl bg-shade-02 p-10">
      <Logo variant="inverse" size="lg" />
      <p className="text-body-sm text-content-inverse/70">
        Use <code className="rounded bg-white/10 px-1">variant=&quot;inverse&quot;</code> on dark
        surfaces (light theme).
      </p>
    </div>
  ),
  parameters: { layout: "padded" },
};

export const DarkTheme: Story = {
  render: () => (
    <div className="rounded-2xl bg-background-primary p-10" data-theme="dark">
      <Logo size="lg" />
      <p className="mt-4 text-body-sm text-content-secondary">
        Wrapped with <code className="rounded bg-surface-secondary px-1">data-theme=&quot;dark&quot;</code>
        — wordmark follows <code className="rounded bg-surface-secondary px-1">content-primary</code>.
      </p>
    </div>
  ),
  parameters: { layout: "padded" },
};
