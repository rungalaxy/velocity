import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Generic card (header, content, footer). **Base UI** does not provide a Card primitive — native elements + Velocity tokens. Variants are borderless; pass `outline` for a strong border. See also **ProductCard** for product tiles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "muted"],
    },
    outline: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    variant: "default",
    outline: false,
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Registration</CardTitle>
        <CardDescription>Enter your details to join the race.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-sm text-content-secondary">
          Main card content (form, text, etc.) goes here.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="solid" colorScheme="primary" size="sm">
          Continue
        </Button>
        <Button variant="ghost" colorScheme="neutral" size="sm">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
      {(["default", "elevated", "muted"] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader separator>
            <CardTitle className="capitalize">{variant}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-content-secondary">
              <code className="text-caption">{variant}</code> variant on the
              card.
            </p>
          </CardContent>
        </Card>
      ))}
      <Card outline>
        <CardHeader separator>
          <CardTitle>Outline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-content-secondary">
            <code className="text-caption">outline</code> boolean prop.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: { layout: "padded" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="w-full max-w-md">
          <p className="mb-2 text-caption text-content-tertiary">
            size=&quot;{size}&quot;
          </p>
          <Card size={size}>
            <CardHeader>
              <CardTitle>Title</CardTitle>
            </CardHeader>
            <CardContent>Content</CardContent>
          </Card>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

export const ContentOnly: Story = {
  name: "Content only",
  render: () => (
    <Card className="w-full max-w-sm">
      <CardContent>
        <p className="text-body-sm text-content-primary">
          Card with only <code>CardContent</code> — no header or footer.
        </p>
      </CardContent>
    </Card>
  ),
};
