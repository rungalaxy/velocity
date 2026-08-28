import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A floating panel anchored to a trigger, ideal for quick product previews, color/size pickers, and contextual actions. Built on Base UI Popover with a fade animation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    modal: { control: 'boolean' },
  },
  args: {
    modal: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="solid" colorScheme="primary" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner>
          <PopoverPopup>
            <PopoverClose />
            <PopoverTitle>Quick Preview</PopoverTitle>
            <PopoverDescription>
              This is a basic popover with a title, description, and close button.
            </PopoverDescription>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  ),
};

// ─── Placement ─────────────────────────────────────────────────────────────────

export const Placement: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-16">
      {/* Top */}
      <div className="col-start-2 flex justify-center">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" colorScheme="neutral" size="sm" />}>
            Top
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner side="top" sideOffset={8}>
              <PopoverPopup>
                <PopoverTitle>Top</PopoverTitle>
                <PopoverDescription>
                  Positioned above the trigger.
                </PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      </div>

      {/* Left */}
      <div className="col-start-1 row-start-2 flex justify-end">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" colorScheme="neutral" size="sm" />}>
            Left
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner side="left" sideOffset={8}>
              <PopoverPopup>
                <PopoverTitle>Left</PopoverTitle>
                <PopoverDescription>
                  Positioned to the left.
                </PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      </div>

      {/* Right */}
      <div className="col-start-3 row-start-2 flex justify-start">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" colorScheme="neutral" size="sm" />}>
            Right
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner side="right" sideOffset={8}>
              <PopoverPopup>
                <PopoverTitle>Right</PopoverTitle>
                <PopoverDescription>
                  Positioned to the right.
                </PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      </div>

      {/* Bottom */}
      <div className="col-start-2 row-start-3 flex justify-center">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" colorScheme="neutral" size="sm" />}>
            Bottom
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner side="bottom" sideOffset={8}>
              <PopoverPopup>
                <PopoverTitle>Bottom</PopoverTitle>
                <PopoverDescription>
                  Positioned below the trigger.
                </PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── Product Preview ───────────────────────────────────────────────────────────

export const ProductPreview: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" colorScheme="neutral" />}>
        Quick View
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner sideOffset={8}>
          <PopoverPopup className="w-72">
            <PopoverClose />
            <div className="flex gap-3">
              <div className="size-16 shrink-0 rounded-lg bg-surface-secondary flex items-center justify-center">
                <span className="text-content-tertiary text-xs">IMG</span>
              </div>
              <div className="flex-1 min-w-0">
                <PopoverTitle>Velocity Pro Sneakers</PopoverTitle>
                <PopoverDescription>
                  High-performance cushioning. 3 colorways.
                </PopoverDescription>
                <p className="mt-2 text-sm font-bold text-content-brand">$149.99</p>
              </div>
            </div>
            <div className="mt-3">
              <Button variant="solid" colorScheme="primary" size="sm" fullWidth>
                Add to Cart
              </Button>
            </div>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  ),
};

// ─── Color Picker ──────────────────────────────────────────────────────────────

const swatches = [
  { name: 'Midnight', color: '#1a1a2e' },
  { name: 'Ocean', color: '#16213e' },
  { name: 'Forest', color: '#1b4332' },
  { name: 'Ember', color: '#6b2737' },
  { name: 'Sand', color: '#c4a35a' },
  { name: 'Coral', color: '#e07a5f' },
];

export const ColorPicker: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" colorScheme="neutral" />}>
        Pick Color
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner sideOffset={8}>
          <PopoverPopup className="w-56">
            <PopoverTitle>Select Color</PopoverTitle>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {swatches.map((s) => (
                <button
                  key={s.name}
                  className="flex flex-col items-center gap-1 rounded-full p-2 cursor-pointer hover:bg-surface-hover transition-colors duration-[200ms]"
                >
                  <span
                    className="size-8 rounded-full border border-border-default"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-xs text-content-secondary">{s.name}</span>
                </button>
              ))}
            </div>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  ),
};

// ─── Hover Trigger ─────────────────────────────────────────────────────────────

export const HoverTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger
        render={<Button variant="ghost" colorScheme="neutral" />}
        openOnHover
        delay={200}
        closeDelay={100}
      >
        Hover me
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner side="top" sideOffset={8}>
          <PopoverPopup>
            <PopoverTitle>Quick Info</PopoverTitle>
            <PopoverDescription>
              This popover opens on hover with a short delay.
            </PopoverDescription>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  ),
};

// ─── Overview ──────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Popover Variants
      </p>
      <div className="flex flex-wrap gap-4">
        {/* Basic */}
        <Popover>
          <PopoverTrigger render={<Button variant="solid" colorScheme="primary" size="sm" />}>
            Basic
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner sideOffset={8}>
              <PopoverPopup>
                <PopoverTitle>Basic Popover</PopoverTitle>
                <PopoverDescription>
                  Simple popover with title and description.
                </PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>

        {/* With Close */}
        <Popover>
          <PopoverTrigger render={<Button variant="outline" colorScheme="neutral" size="sm" />}>
            With Close
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner sideOffset={8}>
              <PopoverPopup>
                <PopoverClose />
                <PopoverTitle>Closable</PopoverTitle>
                <PopoverDescription>
                  Has an explicit close button.
                </PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>

        {/* Hover */}
        <Popover>
          <PopoverTrigger
            render={<Button variant="ghost" colorScheme="neutral" size="sm" />}
            openOnHover
            delay={200}
            closeDelay={100}
          >
            Hover
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner side="top" sideOffset={8}>
              <PopoverPopup>
                <PopoverDescription>
                  Opens on hover.
                </PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
