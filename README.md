# velocity-ds

Velocity is the Runswap design system — a collection of accessible, themeable UI components built on [Base UI](https://base-ui.com) and styled with [Tailwind CSS v4](https://tailwindcss.com).

## Requirements

| Peer dependency | Version |
|---|---|
| `react` | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `@base-ui-components/react` | `^1.0.0-alpha.8` |
| `@hugeicons/react` + `@hugeicons/core-free-icons` | bundled with `velocity-ds` |
| Tailwind CSS | v4 |

> **Tailwind v4 is required.** The design tokens are shipped as a CSS file that uses Tailwind v4 `@theme` variables. It will not work with Tailwind v3.

## Installation

```bash
npm install velocity-ds
```

Install peer dependencies if not already present:

```bash
npm install react react-dom @base-ui-components/react velocity-ds
```

## Setup

### 1. Import the design tokens

In your global CSS entry point (e.g. `src/index.css`), import the Velocity token stylesheet **after** your Tailwind import:

```css
@import "tailwindcss";
@import "velocity-ds/styles";
```

### 2. Use components

```tsx
import { Button } from 'velocity-ds';

export function App() {
  return <Button variant="solid" colorScheme="primary">Click me</Button>;
}
```

## Components

| Component | Description |
|---|---|
| `Button` | Accessible button with `solid`, `outline`, `ghost`, and `link` variants + color schemes |
| `NumberField` | Numeric input with steppers (optional scrub area) on [Base UI Number Field](https://base-ui.com/react/components/number-field) |
| `Chip` | Tags / filters — optional **remove** control; **selectable** mode uses [Base UI Toggle](https://base-ui.com/react/components/toggle) |
| `Avatar` | User photo / initials / fallback on [Base UI Avatar](https://base-ui.com/react/components/avatar) |
| `Table` | Semantic HTML table (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`) — Velocity tokens |
| `Rating` | Star rating (buttons + Remix icons); not a Base UI primitive |
| `Card` | Generic container (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) — not a Base UI primitive |
| `SelectBox` / `SelectBoxGroup` | Card-style option (icon, title, description); group `mode="radio"` or `mode="checkbox"` |
| `RadioGroup` / `RadioItem` | Accessible radio group built on Base UI |

## Tokens

Design tokens are available as a separate sub-path import for tooling that needs raw token values:

```ts
import { coreColors, coreTypography, semanticTypography } from 'velocity-ds/tokens';
```

The full set of CSS custom properties (semantic tokens) is exposed via `velocity-ds/styles`.

### Brands

Default brand is **Runcycl (Velocity)** (mint accent, Stack Sans Headline for headings). Switch to **Runticket** (black accent, Inter everywhere) with:

```html
<html data-brand="runticket">
```

Combine with dark mode: `data-theme="dark"` + `data-brand="runticket"`. Storybook exposes a Brand toolbar for the same switch.

### Semantic text styles (Tailwind)

After importing Velocity styles, use composite typography utilities (font family + size + line-height + weight + tracking). **Headings** (`text-heading-1` … `4`) use **Stack Sans Headline**; body styles use **Inter** — load Stack Sans Headline in your app (e.g. [Google Fonts](https://fonts.google.com/specimen/Stack Sans Headline)) like the Storybook `preview.css` does.

| Class | Role |
|-------|------|
| `text-heading-1` … `text-heading-4` | Headings |
| `text-body-lg`, `text-body`, `text-body-sm` | Body copy |
| `text-caption` | Captions, metadata |
| `text-overline` | Eyebrows / labels (often with `uppercase`) |

Primitives are also in `@theme`: `font-size-*`, `leading-*`, `font-weight-*`, `tracking-*`, and `--typography-{role}-*` if you compose manually.

## Development

```bash
# Install dependencies
pnpm install

# Build the library
npm run build

# Run Storybook
npm run storybook

# Type-check
npm run type-check
```

### Popover / Tooltip hover (Base UI patch)

This repo applies a **`patch-package`** fix to `@base-ui-components/react`: upstream `Popover.Trigger` (`openOnHover`) and **`Tooltip.Trigger`** wired hover delays so **`mouseenter` exited early** until the pointer moved (`move: false` without `delay.open`). Tooltips/popovers then felt “broken” on a normal hover.

The patch sets `restMs: 0` and puts the **open** delay on `delay.open` (and **close** on `delay.close`), matching what `useHoverReferenceInteraction` expects.

- Applied automatically via **`pnpm install`** (`postinstall`: `patch-package`), from `patches/@base-ui-components+react+*.patch`.
- **Storybook:** Vite is configured to **exclude** `@base-ui-components/react` from `optimizeDeps` so a cached pre-bundle does not ignore your patched files. If hover still looks wrong, delete `node_modules/.vite` and restart Storybook.
- **Apps using Velocity** should either use the same patch (copy `patches/` + `patch-package` + `postinstall` + similar Vite `optimizeDeps.exclude`) or upgrade Base UI once the issue is fixed upstream.

### Storybook MCP (AI agents)

With **`@storybook/addon-mcp`**, start Storybook (`npm run storybook`) and point your MCP client at the local server:

- **MCP URL:** `http://localhost:6006/mcp`

See [Storybook MCP overview](https://storybook.js.org/docs/ai/mcp/overview) for setup in Cursor, Claude, etc.

## License

MIT
