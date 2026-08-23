# Color

## When to use
Read this file every time you need to pick a background, text, border, icon, accent, or status color.

## Palette philosophy

Velocity is **neutral-dominant** (~90% gray surfaces) with a **lime-yellow brand** used sparingly for primary actions, active states, and small highlights. Status colors (green/orange/red/blue) are reserved for feedback only.

## Core palette — reference only

Never hardcode these in product code. They exist so that semantic tokens can alias them.

| Scale | Base | Purpose |
| --- | --- | --- |
| `yellow-50..950` | `#d0f400` (yellow-300) | **Brand scale** — lime-yellow |
| `shade-01..10` | — | Neutrals (`#141414` … `#fdfdfd`) |
| `primary-50..950` | `#fc4c02` (primary-500) | **Legacy orange**, no longer routed through semantic tokens |
| `green-300/400/500/600` | — | Success feedback |
| `orange-300/400/500/600` | — | Warning feedback |
| `red-300/400/500/600` | — | Error feedback |
| `blue-300/400/500/600` | — | Info feedback |

IMPORTANT: The brand color is **lime-yellow**, not orange. Do not use the `primary-*` (orange) scale for new UI.

## Semantic tokens — backgrounds

| Tailwind class | Purpose |
| --- | --- |
| `bg-background-primary` | Default app canvas |
| `bg-background-secondary` | Slightly raised section background |
| `bg-background-tertiary` | Subtle panel background |
| `bg-background-brand` | Brand-colored background (yellow-300 light / yellow-400 dark) |
| `bg-background-inverse` | Inverted (dark on light or vice versa) |

## Semantic tokens — surfaces

Used for cards, popovers, modals, elevated panels.

| Tailwind class | Use |
| --- | --- |
| `bg-surface-primary` | Default card / panel |
| `bg-surface-secondary` | Slightly recessed |
| `bg-surface-tertiary` | Further recessed |
| `bg-surface-hover` | Hover state on a surface |
| `bg-surface-active` | Pressed / active state |
| `bg-surface-elevated` | Popovers, menus, tooltips |
| `bg-surface-overlay` | Scrim behind modals/drawers |

**Tinted surfaces** — for banners, alerts, callouts:

| Class | Variant | Use |
| --- | --- | --- |
| `bg-surface-info` / `bg-surface-info-emphasis` | blue 10% / 15% | Info messages |
| `bg-surface-success` / `bg-surface-success-emphasis` | green 10% / 15% | Success messages |
| `bg-surface-warning` / `bg-surface-warning-emphasis` | orange 10% / 15% | Warning messages |
| `bg-surface-error` / `bg-surface-error-emphasis` | red 10% / 15% | Error messages |
| `bg-surface-brand-tint` / `bg-surface-brand-emphasis` | yellow 10% / 20% | Brand-tinted callouts |

## Semantic tokens — content (text & icons)

| Class | Use |
| --- | --- |
| `text-content-primary` | Default body text |
| `text-content-secondary` | Muted / supporting text |
| `text-content-tertiary` | Captions, helper text |
| `text-content-brand` | Brand-colored text (yellow-800 light, yellow-400 dark) |
| `text-content-inverse` | Text on inverse/dark backgrounds |
| `text-content-on-brand` | Text on `bg-brand-*` / `bg-background-brand` (always gray-950 for contrast on yellow) |
| `text-content-disabled` | Disabled controls |

## Semantic tokens — borders

| Class | Use |
| --- | --- |
| `border-border-default` | Default border |
| `border-border-subtle` | Low-contrast divider |
| `border-border-strong` | High-contrast border |
| `border-border-brand` | Brand-colored border (yellow-300 / yellow-400) |
| `border-border-focus` | Focus rings |

## Semantic tokens — accent & brand

All routed to the `yellow` scale. `accent-*` is the decorative side, `brand-*` is the assertive primary.

| Class | Light | Dark |
| --- | --- | --- |
| `bg-accent-primary` / `text-accent-primary` | yellow-300 | yellow-400 |
| `bg-accent-secondary` | yellow-200 | yellow-500 |
| `bg-accent-tertiary` | yellow-100 | yellow-600 |
| `bg-brand-primary` | yellow-300 | yellow-400 |
| `bg-brand-secondary` | yellow-300 | yellow-300 |

## Semantic tokens — state (strong)

For icons, inline labels, focus rings of semantic meaning.

| Class | Color |
| --- | --- |
| `text-state-success` / `bg-state-success` | green-500 |
| `text-state-warning` / `bg-state-warning` | orange-500 |
| `text-state-error` / `bg-state-error` | red-500 |
| `text-state-info` / `bg-state-info` | blue-500 |

## Semantic tokens — feedback (softer)

For softer indicators, dots, non-critical accents.

| Class | Color |
| --- | --- |
| `text-feedback-positive` / `bg-feedback-positive` | green-400 |
| `text-feedback-neutral` / `bg-feedback-neutral` | blue-400 |
| `text-feedback-caution` / `bg-feedback-caution` | orange-400 |
| `text-feedback-negative` / `bg-feedback-negative` | red-400 |

## Decision tree — background

```
┌─ "What background should I use?"
│
├─ Main page canvas?
│  └─ bg-background-primary
│
├─ Section background within a page?
│  └─ bg-background-secondary
│
├─ Elevated card or panel?
│  └─ bg-surface-primary
│
├─ Popover, menu, tooltip?
│  └─ bg-surface-elevated
│
├─ Brand CTA or hero?
│  └─ bg-brand-primary  (pair with text-content-on-brand)
│
├─ Info / success / warning / error banner?
│  └─ bg-surface-{info,success,warning,error}
│     (pair with text-state-{info,success,warning,error})
│
├─ Modal scrim?
│  └─ bg-surface-overlay
│
└─ Needs to invert against the main canvas?
   └─ bg-background-inverse  (pair with text-content-inverse)
```

## Decision tree — text color

```
┌─ "What text color should I use?"
│
├─ Body text the user must read?
│  └─ text-content-primary
│
├─ Supporting / helper text?
│  └─ text-content-secondary
│
├─ Captions, metadata?
│  └─ text-content-tertiary
│
├─ Brand accent text (links, emphasis)?
│  └─ text-content-brand
│
├─ Text on yellow brand background?
│  └─ text-content-on-brand
│
├─ Text on dark inverse background?
│  └─ text-content-inverse
│
├─ Status message text?
│  └─ text-state-{success,warning,error,info}
│
└─ Disabled control?
   └─ text-content-disabled
```

## Examples

### Primary CTA
```tsx
<Button className="bg-brand-primary text-content-on-brand">
  Save changes
</Button>
```

### Info banner
```tsx
<div className="bg-surface-info border border-state-info rounded p-4">
  <p className="text-state-info">Your order is being processed.</p>
</div>
```

### Card
```tsx
<div className="bg-surface-primary border border-border-default rounded-lg p-4 shadow-md">
  <h3 className="text-heading-4 text-content-primary">Title</h3>
  <p className="text-body-sm text-content-secondary">Supporting text</p>
</div>
```

### Inverse callout
```tsx
<div className="bg-background-inverse text-content-inverse p-6 rounded-lg">
  …
</div>
```

## Rules

- NEVER hardcode hex values (`#d0f400`, `#fc4c02`, `#fff`...) in product code.
- NEVER use Tailwind's raw color scales (`bg-orange-500`, `text-gray-700`, `border-zinc-300`...) in product code.
- ALWAYS pair `bg-brand-*` / `bg-background-brand` with `text-content-on-brand` (yellow surfaces need dark text).
- USE `text-content-inverse` only on `bg-background-inverse` and other dark surfaces.
- USE `state-*` tokens for semantic strength (errors, success), `feedback-*` for softer indicators (dots, badges).
- The brand is yellow/lime, NOT orange. Do not use the legacy `primary-*` orange scale.
