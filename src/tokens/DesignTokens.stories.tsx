import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Visual reference for Velocity tokens. Source of truth: `src/styles/tokens.css`
 * (generated from `tokens/core/*.json` and `tokens/semantic/*.json` via `npm run build:tokens`).
 */
function TokensPlaceholder() {
  return null;
}

const meta: Meta<typeof TokensPlaceholder> = {
  title: "Foundations/Design tokens",
  component: TokensPlaceholder,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Semantic colors, primitive palettes, elevation, and motion values exposed as Tailwind utilities after importing `velocity-ds/styles` (or the Storybook preview CSS). Prefer **semantic** tokens (`bg-surface-secondary`, `text-content-brand`) in components; use **primitive** scales for one-off needs.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({
  label,
  bgClass,
  textClass = "text-content-primary",
}: {
  label: string;
  bgClass: string;
  textClass?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div
        className={`flex h-14 items-end justify-start rounded-lg border border-border-default p-2 ${bgClass}`}
      >
        <span className={`text-caption font-medium ${textClass}`}>Aa</span>
      </div>
      <code className="truncate text-caption text-content-tertiary">{label}</code>
    </div>
  );
}

function TextTokenRow({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border-subtle py-3 last:border-0">
      <code className="shrink-0 text-caption text-content-tertiary">{label}</code>
      <p className={`min-w-0 text-right text-body ${className}`}>
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>
  );
}

export const SemanticColors: Story = {
  name: "Semantic colors",
  render: () => (
    <div className="mx-auto max-w-5xl space-y-12 p-8 font-sans">
      <header className="space-y-1 border-b border-border-default pb-6">
        <p className="text-overline uppercase text-content-tertiary">Foundations</p>
        <h2 className="text-heading-2 text-content-primary">Semantic tokens</h2>
        <p className="text-body text-content-secondary">
          Use these Tailwind classes in Velocity components. Maps to CSS variables such as{" "}
          <code className="text-caption">--color-background-primary</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-heading-4 text-content-tertiary">Background</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <Swatch label="bg-background-primary" bgClass="bg-background-primary" />
          <Swatch label="bg-background-secondary" bgClass="bg-background-secondary" />
          <Swatch label="bg-background-tertiary" bgClass="bg-background-tertiary" />
          <Swatch label="bg-background-brand" bgClass="bg-background-brand" textClass="text-content-inverse" />
          <Swatch label="bg-background-inverse" bgClass="bg-background-inverse" textClass="text-content-inverse" />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-heading-4 text-content-tertiary">Surface</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <Swatch label="bg-surface-primary" bgClass="bg-surface-primary" />
          <Swatch label="bg-surface-secondary" bgClass="bg-surface-secondary" />
          <Swatch label="bg-surface-tertiary" bgClass="bg-surface-tertiary" />
          <Swatch label="bg-surface-hover" bgClass="bg-surface-hover" />
          <Swatch label="bg-surface-active" bgClass="bg-surface-active" />
          <Swatch label="bg-surface-elevated" bgClass="bg-surface-elevated" />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-heading-4 text-content-tertiary">Content (text)</h3>
        <div className="rounded-xl border border-border-default bg-surface-primary px-4">
          <TextTokenRow label="text-content-primary" className="text-content-primary" />
          <TextTokenRow label="text-content-secondary" className="text-content-secondary" />
          <TextTokenRow label="text-content-tertiary" className="text-content-tertiary" />
          <TextTokenRow label="text-content-brand" className="text-content-brand" />
          <TextTokenRow label="text-content-disabled" className="text-content-disabled" />
        </div>
        <div className="rounded-xl bg-background-brand px-4 py-2">
          <TextTokenRow label="text-content-inverse" className="text-content-inverse" />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-heading-4 text-content-tertiary">Border</h3>
        <div className="flex flex-wrap gap-3">
          {(
            [
              ["border-border-default", "border-2 border-border-default"],
              ["border-border-subtle", "border-2 border-border-subtle"],
              ["border-border-strong", "border-2 border-border-strong"],
              ["border-border-brand", "border-2 border-border-brand"],
              ["border-border-focus", "border-2 border-border-focus"],
            ] as const
          ).map(([label, c]) => (
            <div key={label} className="flex flex-col gap-1">
              <div className={`h-14 w-24 rounded-lg bg-surface-secondary ${c}`} />
              <code className="text-caption text-content-tertiary">{label}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-heading-4 text-content-tertiary">Accent & brand</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch label="bg-accent-primary" bgClass="bg-accent-primary" textClass="text-content-primary" />
          <Swatch label="bg-accent-secondary" bgClass="bg-accent-secondary" textClass="text-content-primary" />
          <Swatch label="bg-accent-tertiary" bgClass="bg-accent-tertiary" textClass="text-content-primary" />
          <Swatch label="bg-brand-secondary" bgClass="bg-brand-secondary" textClass="text-content-primary" />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-heading-4 text-content-tertiary">State</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch label="bg-state-success" bgClass="bg-state-success" textClass="text-content-inverse" />
          <Swatch label="bg-state-warning" bgClass="bg-state-warning" textClass="text-content-inverse" />
          <Swatch label="bg-state-error" bgClass="bg-state-error" textClass="text-content-inverse" />
          <Swatch label="bg-state-info" bgClass="bg-state-info" textClass="text-content-inverse" />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-heading-4 text-content-tertiary">Feedback (text)</h3>
        <div className="rounded-xl border border-border-default bg-surface-primary px-4">
          <TextTokenRow label="text-feedback-positive" className="text-feedback-positive" />
          <TextTokenRow label="text-feedback-neutral" className="text-feedback-neutral" />
          <TextTokenRow label="text-feedback-caution" className="text-feedback-caution" />
          <TextTokenRow label="text-feedback-negative" className="text-feedback-negative" />
        </div>
      </section>
    </div>
  ),
};

/** Full class names so Tailwind can emit CSS (no dynamic `bg-*-${step}`). */
const PRIMITIVE_SWATCHES: { title: string; rows: { label: string; bg: string }[] }[] = [
  {
    title: "Shade (neutrals)",
    rows: [
      { label: "01", bg: "bg-shade-01" },
      { label: "02", bg: "bg-shade-02" },
      { label: "03", bg: "bg-shade-03" },
      { label: "04", bg: "bg-shade-04" },
      { label: "05", bg: "bg-shade-05" },
      { label: "06", bg: "bg-shade-06" },
      { label: "07", bg: "bg-shade-07" },
      { label: "08", bg: "bg-shade-08" },
      { label: "09", bg: "bg-shade-09" },
      { label: "10", bg: "bg-shade-10" },
    ],
  },
  {
    title: "Primary (brand orange)",
    rows: [
      { label: "50", bg: "bg-primary-50" },
      { label: "100", bg: "bg-primary-100" },
      { label: "200", bg: "bg-primary-200" },
      { label: "300", bg: "bg-primary-300" },
      { label: "400", bg: "bg-primary-400" },
      { label: "500", bg: "bg-primary-500" },
      { label: "600", bg: "bg-primary-600" },
      { label: "700", bg: "bg-primary-700" },
      { label: "800", bg: "bg-primary-800" },
      { label: "900", bg: "bg-primary-900" },
      { label: "950", bg: "bg-primary-950" },
    ],
  },
  {
    title: "Secondary",
    rows: [
      { label: "50", bg: "bg-secondary-50" },
      { label: "100", bg: "bg-secondary-100" },
      { label: "200", bg: "bg-secondary-200" },
      { label: "300", bg: "bg-secondary-300" },
      { label: "400", bg: "bg-secondary-400" },
      { label: "500", bg: "bg-secondary-500" },
      { label: "600", bg: "bg-secondary-600" },
      { label: "700", bg: "bg-secondary-700" },
      { label: "800", bg: "bg-secondary-800" },
      { label: "900", bg: "bg-secondary-900" },
      { label: "950", bg: "bg-secondary-950" },
    ],
  },
];

const STATE_SWATCHES: { title: string; rows: { label: string; bg: string }[] }[] = [
  {
    title: "Green",
    rows: [
      { label: "300", bg: "bg-green-300" },
      { label: "400", bg: "bg-green-400" },
      { label: "500", bg: "bg-green-500" },
      { label: "600", bg: "bg-green-600" },
    ],
  },
  {
    title: "Orange",
    rows: [
      { label: "300", bg: "bg-orange-300" },
      { label: "400", bg: "bg-orange-400" },
      { label: "500", bg: "bg-orange-500" },
      { label: "600", bg: "bg-orange-600" },
    ],
  },
  {
    title: "Red",
    rows: [
      { label: "300", bg: "bg-red-300" },
      { label: "400", bg: "bg-red-400" },
      { label: "500", bg: "bg-red-500" },
      { label: "600", bg: "bg-red-600" },
    ],
  },
  {
    title: "Blue",
    rows: [
      { label: "300", bg: "bg-blue-300" },
      { label: "400", bg: "bg-blue-400" },
      { label: "500", bg: "bg-blue-500" },
      { label: "600", bg: "bg-blue-600" },
    ],
  },
];

export const PrimitiveColors: Story = {
  name: "Primitive palettes",
  render: () => (
    <div className="mx-auto max-w-5xl space-y-10 p-8 font-sans">
      <header className="border-b border-border-default pb-6">
        <h2 className="text-heading-2 text-content-primary">Core scales</h2>
        <p className="mt-1 text-body text-content-secondary">
          Primitives from <code className="text-caption">tokens/core/color.json</code>. Classes like{" "}
          <code className="text-caption">bg-shade-05</code>, <code className="text-caption">bg-primary-500</code>.
        </p>
      </header>

      {PRIMITIVE_SWATCHES.map((group) => (
        <section key={group.title} className="space-y-3">
          <h3 className="text-heading-4 text-content-tertiary">{group.title}</h3>
          <div className="flex flex-wrap gap-1">
            {group.rows.map(({ label, bg }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className={`size-12 rounded-md ${bg}`} />
                <span className="text-caption text-content-tertiary">{label}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="grid gap-8 sm:grid-cols-2">
        {STATE_SWATCHES.map((group) => (
          <div key={group.title} className="space-y-3">
            <h3 className="text-heading-4 text-content-tertiary">{group.title}</h3>
            <div className="flex flex-wrap gap-1">
              {group.rows.map(({ label, bg }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className={`size-12 rounded-md ${bg}`} />
                  <span className="text-caption text-content-tertiary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  ),
};

export const ElevationAndMotion: Story = {
  name: "Elevation & motion",
  render: () => (
    <div className="mx-auto max-w-3xl space-y-10 p-8 font-sans">
      <header className="border-b border-border-default pb-6">
        <h2 className="text-heading-2 text-content-primary">Shadows & timing</h2>
        <p className="mt-1 text-body text-content-secondary">
          Shadows: <code className="text-caption">shadow-sm</code>, <code className="text-caption">shadow-md</code>,{" "}
          <code className="text-caption">shadow-lg</code>. Durations: <code className="text-caption">duration-fast</code>{" "}
          (100ms), <code className="text-caption">duration-normal</code> (200ms), <code className="text-caption">duration-slow</code>{" "}
          (300ms).
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-heading-4 text-content-tertiary">Elevation</h3>
        <div className="grid gap-6 rounded-xl bg-surface-secondary p-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3">
            <div className="h-24 w-full rounded-xl bg-surface-primary shadow-sm" />
            <code className="text-caption text-content-tertiary">shadow-sm</code>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-24 w-full rounded-xl bg-surface-primary shadow-md" />
            <code className="text-caption text-content-tertiary">shadow-md</code>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-24 w-full rounded-xl bg-surface-primary shadow-lg" />
            <code className="text-caption text-content-tertiary">shadow-lg</code>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-heading-4 text-content-tertiary">Motion tokens</h3>
        <ul className="space-y-2 text-body text-content-secondary">
          <li>
            <code className="text-caption text-content-primary">duration-fast</code> — 100ms
          </li>
          <li>
            <code className="text-caption text-content-primary">duration-normal</code> — 200ms
          </li>
          <li>
            <code className="text-caption text-content-primary">duration-slow</code> — 300ms
          </li>
          <li>
            <code className="text-caption text-content-primary">ease-standard</code>, <code className="text-caption">ease-spring</code> — see{" "}
            <code className="text-caption">tokens.css</code>
          </li>
        </ul>
      </section>
    </div>
  ),
};

export const DarkTheme: Story = {
  name: "Dark theme",
  parameters: {
    docs: {
      description: {
        story:
          "Semantic overrides for `data-theme=\"dark\"` on `html` or `body`. Toggle theme in Storybook to compare.",
      },
    },
  },
  render: () => (
    <div className="mx-auto max-w-2xl space-y-4 p-8 font-sans">
      <p className="text-body text-content-secondary">
        Dark mode remaps surfaces, content, and borders (see <code className="text-caption">tokens.css</code> under{" "}
        <code className="text-caption">[data-theme=&quot;dark&quot;]</code>). Use the Storybook **theme** toolbar to preview.
      </p>
      <div className="rounded-xl border border-border-default bg-background-primary p-6">
        <p className="text-heading-4 text-content-primary">Sample panel</p>
        <p className="mt-2 text-body text-content-secondary">
          <code className="text-caption">bg-background-primary</code> + <code className="text-caption">text-content-primary</code>
        </p>
      </div>
    </div>
  ),
};
