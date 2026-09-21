import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActions,
  AlertDialogCancel,
  AlertDialogAction,
} from './AlertDialog';

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal alert dialog that requires an explicit confirm or cancel. Built on Base UI Alert Dialog. Escape closes it; clicking the overlay does not.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    defaultOpen: { control: 'boolean' },
  },
  args: { size: 'sm', defaultOpen: false },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function AlertDialogExample({
  size = 'sm',
  triggerLabel,
  triggerColor = 'primary',
  title,
  description,
  confirmLabel,
  intent = 'primary',
  children,
}: {
  size?: 'sm' | 'md' | 'lg';
  triggerLabel: string;
  triggerColor?: 'primary' | 'danger' | 'neutral';
  title: string;
  description: string;
  confirmLabel: string;
  intent?: 'primary' | 'danger';
  children?: React.ReactNode;
}) {
  return (
    <AlertDialog size={size}>
      <AlertDialogTrigger
        render={
          <Button
            variant={triggerColor === 'neutral' ? 'outline' : 'solid'}
            colorScheme={triggerColor}
          />
        }
      >
        {triggerLabel}
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogPopup>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
            {children}
          </AlertDialogDescription>
          <AlertDialogActions>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction intent={intent}>{confirmLabel}</AlertDialogAction>
          </AlertDialogActions>
        </AlertDialogPopup>
      </AlertDialogPortal>
    </AlertDialog>
  );
}

export const Default: Story = {
  render: (args) => (
    <AlertDialogExample
      size={args.size}
      triggerLabel="Leave page"
      title="Leave this page?"
      description="You have unsaved changes. If you leave now, those changes will be lost."
      confirmLabel="Leave"
    />
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialogExample
      triggerLabel="Delete item"
      triggerColor="danger"
      title="Delete this item?"
      description="This action cannot be undone. The item and its history will be permanently removed."
      confirmLabel="Delete"
      intent="danger"
    />
  ),
};

export const CustomContent: Story = {
  render: () => (
    <AlertDialogExample
      size="md"
      triggerLabel="Remove member"
      triggerColor="danger"
      title="Remove Alex Rivera?"
      description="They will lose access to this workspace immediately."
      confirmLabel="Remove"
      intent="danger"
    >
      <span className="mt-4 block rounded-xl bg-surface-secondary px-3 py-2">
        Projects they own will stay in the workspace. You can invite them again later.
      </span>
    </AlertDialogExample>
  ),
};

function ControlledAlertDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="outline" colorScheme="neutral" />}>
          Open controlled dialog
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogBackdrop />
          <AlertDialogPopup>
            <AlertDialogTitle>Confirm this action?</AlertDialogTitle>
            <AlertDialogDescription>
              The open state is controlled by the parent. Escape or either action closes it.
              Clicking the overlay keeps it open.
            </AlertDialogDescription>
            <AlertDialogActions>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogActions>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialog>
      <p className="text-sm text-content-secondary">Open: {open ? 'true' : 'false'}</p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledAlertDialog />,
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      <p className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
        Alert dialog
      </p>
      <div className="flex flex-wrap gap-4">
        <AlertDialogExample
          triggerLabel="Confirmation"
          title="Save changes?"
          description="Your updates will be applied to the published page."
          confirmLabel="Save"
        />
        <AlertDialogExample
          triggerLabel="Destructive"
          triggerColor="danger"
          title="Delete item?"
          description="This cannot be undone."
          confirmLabel="Delete"
          intent="danger"
        />
        <AlertDialogExample
          size="md"
          triggerLabel="Custom content"
          triggerColor="neutral"
          title="Discard draft?"
          description="The draft will be removed from this device."
          confirmLabel="Discard"
          intent="danger"
        >
          <span className="mt-4 block text-content-secondary">Last edited 2 hours ago.</span>
        </AlertDialogExample>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
