import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal dialog for confirmations, previews, and quick forms. Built on Base UI Dialog with smooth open/close animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    modal: { control: 'boolean' },
  },
  args: {
    modal: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="solid" colorScheme="primary" />}>
        Open Dialog
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogClose />
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a default dialog with a title, description, and close
            button.
          </DialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <DialogClose className="static top-auto right-auto size-auto rounded-full px-4 py-2 text-sm font-medium text-content-secondary hover:bg-surface-hover transition-colors duration-[200ms] cursor-pointer">
              Cancel
            </DialogClose>
            <Button variant="solid" colorScheme="primary" size="md">
              Confirm
            </Button>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  ),
};

// ─── Delete Confirmation ──────────────────────────────────────────────────────

export const DeleteConfirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="solid" colorScheme="danger" />}>
        Delete Account
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup size="sm">
          <DialogClose />
          <DialogTitle>Delete Account?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All your data, projects, and settings
            will be permanently removed.
          </DialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <DialogClose className="static top-auto right-auto size-auto rounded-full px-4 py-2 text-sm font-medium text-content-secondary hover:bg-surface-hover transition-colors duration-[200ms] cursor-pointer">
              Cancel
            </DialogClose>
            <Button variant="solid" colorScheme="danger" size="md">
              Delete
            </Button>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  ),
};

// ─── Product Preview ──────────────────────────────────────────────────────────

export const ProductPreview: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" colorScheme="neutral" />}>
        Quick View
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup size="lg">
          <DialogClose />
          <div className="flex gap-6">
            <div className="w-48 h-48 rounded-xl bg-surface-secondary flex items-center justify-center shrink-0">
              <span className="text-content-tertiary text-sm">Image</span>
            </div>
            <div className="flex-1">
              <DialogTitle>Velocity Pro Sneakers</DialogTitle>
              <DialogDescription>
                High-performance sneakers with responsive cushioning. Available
                in multiple colorways.
              </DialogDescription>
              <p className="mt-4 text-xl font-bold text-content-brand">
                $149.99
              </p>
              <div className="mt-4">
                <Button
                  variant="solid"
                  colorScheme="primary"
                  size="md"
                  fullWidth
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  ),
};

// ─── Quick Login ──────────────────────────────────────────────────────────────

export const QuickLogin: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" colorScheme="primary" />}>
        Sign In
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup size="sm">
          <DialogClose />
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>
            Sign in to your account to continue.
          </DialogDescription>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-content-primary">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="h-10 px-3 rounded-xl border border-border-default bg-surface-secondary text-content-primary text-sm placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-brand transition-[border-color,box-shadow] duration-[200ms]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-content-primary">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="h-10 px-3 rounded-xl border border-border-default bg-surface-secondary text-content-primary text-sm placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-brand transition-[border-color,box-shadow] duration-[200ms]"
              />
            </div>
            <Button
              variant="solid"
              colorScheme="primary"
              size="md"
              fullWidth
            >
              Sign In
            </Button>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline" colorScheme="neutral" size="md" />}>
            Size: {size}
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup size={size}>
              <DialogClose />
              <DialogTitle>
                {size.toUpperCase()} Dialog
              </DialogTitle>
              <DialogDescription>
                This is a {size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'} dialog popup ({size}).
              </DialogDescription>
              <div className="mt-6 flex justify-end">
                <DialogClose className="static top-auto right-auto size-auto rounded-full px-4 py-2 text-sm font-medium text-content-secondary hover:bg-surface-hover transition-colors duration-[200ms] cursor-pointer">
                  Close
                </DialogClose>
              </div>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Dialog Variants
      </p>
      <div className="flex flex-wrap gap-4">
        <Dialog>
          <DialogTrigger render={<Button variant="solid" colorScheme="primary" />}>
            Confirmation
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup size="sm">
              <DialogClose />
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to proceed?
              </DialogDescription>
              <div className="mt-6 flex justify-end gap-3">
                <DialogClose className="static top-auto right-auto size-auto rounded-full px-4 py-2 text-sm font-medium text-content-secondary hover:bg-surface-hover transition-colors duration-[200ms] cursor-pointer">
                  Cancel
                </DialogClose>
                <Button variant="solid" colorScheme="primary" size="md">
                  Confirm
                </Button>
              </div>
            </DialogPopup>
          </DialogPortal>
        </Dialog>

        <Dialog>
          <DialogTrigger render={<Button variant="solid" colorScheme="danger" />}>
            Destructive
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup size="sm">
              <DialogClose />
              <DialogTitle>Delete Item?</DialogTitle>
              <DialogDescription>
                This cannot be undone.
              </DialogDescription>
              <div className="mt-6 flex justify-end gap-3">
                <DialogClose className="static top-auto right-auto size-auto rounded-full px-4 py-2 text-sm font-medium text-content-secondary hover:bg-surface-hover transition-colors duration-[200ms] cursor-pointer">
                  Cancel
                </DialogClose>
                <Button variant="solid" colorScheme="danger" size="md">
                  Delete
                </Button>
              </div>
            </DialogPopup>
          </DialogPortal>
        </Dialog>

        <Dialog>
          <DialogTrigger render={<Button variant="outline" colorScheme="neutral" />}>
            Information
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogClose />
              <DialogTitle>System Update</DialogTitle>
              <DialogDescription>
                A new version is available. Please save your work before
                updating.
              </DialogDescription>
              <div className="mt-6 flex justify-end">
                <Button variant="solid" colorScheme="primary" size="md">
                  Update Now
                </Button>
              </div>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
