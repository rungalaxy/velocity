import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  useToast,
  type ToastData,
} from "./Toast";

// ── Helper wrapper ─────────────────────────────────────────────────────────

function ToastStage({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider timeout={60000} limit={5}>
      {children}
      <ToastViewport />
    </ToastProvider>
  );
}

/**
 * ToastStage variant that uses a custom renderToast to show action buttons.
 */
function ToastStageWithAction({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider timeout={60000} limit={5}>
      {children}
      <ToastViewport
        renderToast={(toast) => (
          <Toast toast={toast}>
            <div>
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
              {toast.actionProps && (
                <ToastAction>
                  {toast.actionProps.children ?? "Action"}
                </ToastAction>
              )}
            </div>
          </Toast>
        )}
      />
    </ToastProvider>
  );
}

// ── Trigger components for stories ─────────────────────────────────────────

function DefaultTrigger() {
  const { add } = useToast();
  return (
    <button
      className="rounded-full bg-surface-secondary px-4 py-2 text-sm font-medium text-content-primary border border-border-default transition-colors duration-[200ms] hover:bg-surface-hover cursor-pointer"
      onClick={() =>
        add({
          title: "Item saved",
          description: "Your changes have been saved successfully.",
        })
      }
    >
      Show default toast
    </button>
  );
}

function SuccessTrigger() {
  const { add } = useToast();
  return (
    <button
      className="rounded-full bg-state-success px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-[200ms] hover:bg-green-600 cursor-pointer"
      onClick={() =>
        add<ToastData>({
          title: "Added to cart",
          description: "Nike Air Max 90 has been added to your cart.",
          data: { variant: "success" },
        })
      }
    >
      Show success toast
    </button>
  );
}

function WarningTrigger() {
  const { add } = useToast();
  return (
    <button
      className="rounded-full bg-state-warning px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-[200ms] hover:bg-orange-600 cursor-pointer"
      onClick={() =>
        add<ToastData>({
          title: "Low stock",
          description: "Only 2 items left in stock. Order soon!",
          data: { variant: "warning" },
        })
      }
    >
      Show warning toast
    </button>
  );
}

function ErrorTrigger() {
  const { add } = useToast();
  return (
    <button
      className="rounded-full bg-state-error px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-[200ms] hover:bg-red-600 cursor-pointer"
      onClick={() =>
        add<ToastData>({
          title: "Payment failed",
          description:
            "Your card was declined. Please try a different payment method.",
          data: { variant: "error" },
          priority: "high",
        })
      }
    >
      Show error toast
    </button>
  );
}

function InfoTrigger() {
  const { add } = useToast();
  return (
    <button
      className="rounded-full bg-state-info px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-[200ms] hover:bg-blue-600 cursor-pointer"
      onClick={() =>
        add<ToastData>({
          title: "Shipping update",
          description: "Your order #1234 has been shipped and is on its way.",
          data: { variant: "info" },
        })
      }
    >
      Show info toast
    </button>
  );
}

function ActionTrigger() {
  const { add } = useToast();
  return (
    <button
      className="rounded-full bg-accent-primary px-4 py-2 text-sm font-medium text-content-primary transition-colors duration-[200ms] hover:bg-primary-600 cursor-pointer"
      onClick={() =>
        add<ToastData>({
          title: "Item removed",
          description: "Nike Air Max 90 was removed from your cart.",
          data: { variant: "default" },
          actionProps: {
            children: "Undo",
            onClick: () => {
              // eslint-disable-next-line no-console
              console.log("Undo clicked");
            },
          },
        })
      }
    >
      Show toast with action
    </button>
  );
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Components/Toast",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toast notifications for e-commerce — Added to cart, payment errors, confirmations, and more. Built on Base UI Toast.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <ToastStage>
      <DefaultTrigger />
    </ToastStage>
  ),
};

export const Success: Story = {
  render: () => (
    <ToastStage>
      <SuccessTrigger />
    </ToastStage>
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastStage>
      <WarningTrigger />
    </ToastStage>
  ),
};

export const Error: Story = {
  render: () => (
    <ToastStage>
      <ErrorTrigger />
    </ToastStage>
  ),
};

export const Info: Story = {
  render: () => (
    <ToastStage>
      <InfoTrigger />
    </ToastStage>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastStageWithAction>
      <ActionTrigger />
    </ToastStageWithAction>
  ),
};

export const Overview: Story = {
  render: () => (
    <ToastStageWithAction>
      <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-widest">
          Toast variants
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <DefaultTrigger />
          <SuccessTrigger />
          <WarningTrigger />
          <ErrorTrigger />
          <InfoTrigger />
          <ActionTrigger />
        </div>
        <p className="text-xs text-content-tertiary">
          Click the buttons above to trigger toast notifications.
        </p>
      </div>
    </ToastStageWithAction>
  ),
  parameters: { layout: "padded" },
};
