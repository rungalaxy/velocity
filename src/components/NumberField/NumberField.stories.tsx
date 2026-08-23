import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { NumberField } from "./index";

const meta: Meta<typeof NumberField> = {
  title: "Components/NumberField",
  component: NumberField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Numeric field with increment/decrement steppers, built on [Base UI Number Field](https://base-ui.com/react/components/number-field). Optional **scrub area** (drag to adjust). Icons use [Hugeicons](https://hugeicons.com/) via `@velocity-ds/react` icons (`AddIcon`, `SubtractIcon`, `DragMoveIcon`).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Amount",
    defaultValue: 10,
    helperText: "Use the buttons or type a number.",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <NumberField label="Small" size="sm" defaultValue={1} helperText="size=&quot;sm&quot;" />
      <NumberField label="Medium" size="md" defaultValue={2} helperText="size=&quot;md&quot; (default)" />
      <NumberField label="Large" size="lg" defaultValue={3} helperText="size=&quot;lg&quot;" />
    </div>
  ),
};

export const MinMaxStep: Story = {
  name: "Min / max / step",
  args: {
    label: "Quantity",
    defaultValue: 5,
    min: 0,
    max: 20,
    step: 5,
    helperText: "Clamped between 0 and 20, step 5.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Read-only amount",
    defaultValue: 42,
    disabled: true,
    helperText: "Disabled state.",
  },
};

export const Error: Story = {
  args: {
    label: "Guests",
    defaultValue: 0,
    error: true,
    helperText: "Enter at least 1 guest.",
  },
};

export const WithScrubArea: Story = {
  name: "With scrub area",
  args: {
    label: "Fine tune",
    defaultValue: 50,
    min: 0,
    max: 100,
    showScrubArea: true,
    scrubLabel: "Drag horizontally to adjust",
    helperText: "Scrub strip uses Base UI ScrubArea (pointer drag).",
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = React.useState<number | null>(7);
    return (
      <div className="max-w-md space-y-2">
        <NumberField
          label="Controlled"
          value={value}
          onValueChange={setValue}
          min={0}
          max={99}
          helperText="Value is lifted to React state."
        />
        <p className="text-sm text-content-tertiary">Current: {value ?? "empty"}</p>
      </div>
    );
  },
};
