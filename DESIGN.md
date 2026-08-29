---
name: Velocity — Runcycl Design System
colors:
  # Core — Neutrals (shade-01…10)
  white: "#ffffff"
  black: "#000000"
  shade-01: "#141414"
  shade-02: "#101010"
  shade-03: "#191919"
  shade-04: "#222222"
  shade-05: "#4c4c4c"
  shade-06: "#727272"
  shade-07: "#7b7b7b"
  shade-08: "#e2e2e2"
  shade-09: "#f1f1f1"
  shade-10: "#fdfdfd"
  # Core — Yellow (BRAND)
  yellow-50: "#f6ffd0"
  yellow-100: "#eaff99"
  yellow-200: "#dcff55"
  yellow-300: "#d0f400"
  yellow-400: "#bde000"
  yellow-500: "#a8c800"
  yellow-600: "#8aaa00"
  yellow-700: "#667d00"
  yellow-800: "#445200"
  yellow-900: "#222900"
  yellow-950: "#111400"
  # Core — State primitives
  green-400: "#4ade80"
  green-500: "#22c55e"
  orange-400: "#fb923c"
  orange-500: "#f97316"
  red-400: "#f87171"
  red-500: "#ef4444"
  blue-400: "#60a5fa"
  blue-500: "#3b82f6"
  # Semantic — Background
  background-primary: "#ffffff"
  background-secondary: "#fdfdfd"
  background-tertiary: "#f1f1f1"
  background-brand: "#d0f400"
  background-inverse: "#101010"
  # Semantic — Surface (cards, panels, tinted feedback)
  surface-primary: "#ffffff"
  surface-secondary: "#fdfdfd"
  surface-tertiary: "#f1f1f1"
  surface-hover: "#f1f1f1"
  surface-active: "#e2e2e2"
  surface-elevated: "#ffffff"
  surface-overlay: "rgb(0 0 0 / 0.4)"
  surface-info: "rgb(59 130 246 / 0.10)"
  surface-success: "rgb(34 197 94 / 0.10)"
  surface-warning: "rgb(249 115 22 / 0.10)"
  surface-error: "rgb(239 68 68 / 0.10)"
  surface-brand-tint: "rgb(208 244 0 / 0.10)"
  surface-info-emphasis: "rgb(59 130 246 / 0.15)"
  surface-success-emphasis: "rgb(34 197 94 / 0.15)"
  surface-warning-emphasis: "rgb(249 115 22 / 0.15)"
  surface-error-emphasis: "rgb(239 68 68 / 0.15)"
  surface-brand-emphasis: "rgb(208 244 0 / 0.20)"
  # Semantic — Content (text / icon)
  content-primary: "#101010"
  content-secondary: "#4c4c4c"
  content-tertiary: "#727272"
  content-brand: "#445200"
  content-inverse: "#ffffff"
  content-disabled: "#7b7b7b"
  content-on-brand: "#101010"
  # Semantic — Border
  border-default: "#e2e2e2"
  border-subtle: "#f1f1f1"
  border-strong: "#e2e2e2"
  border-brand: "#d0f400"
  border-focus: "#d0f400"
  # Semantic — Accent (yellow tints)
  accent-primary: "#d0f400"
  accent-secondary: "#dcff55"
  accent-tertiary: "#eaff99"
  # Semantic — Brand
  brand-primary: "#d0f400"
  brand-secondary: "#d0f400"
  # Semantic — State (full-saturation icons, borders, text)
  state-success: "#22c55e"
  state-warning: "#f97316"
  state-error: "#ef4444"
  state-info: "#3b82f6"
  # Semantic — Feedback (softer)
  feedback-positive: "#4ade80"
  feedback-neutral: "#60a5fa"
  feedback-caution: "#fb923c"
  feedback-negative: "#f87171"

typography:
  heading-1:
    fontFamily: Stack Sans Headline
    fontSize: 36px
    fontWeight: "700"
    lineHeight: 1.25
    letterSpacing: -0.02em
  heading-2:
    fontFamily: Stack Sans Headline
    fontSize: 30px
    fontWeight: "700"
    lineHeight: 1.25
    letterSpacing: -0.02em
  heading-3:
    fontFamily: Stack Sans Headline
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 1.375
    letterSpacing: 0
  heading-4:
    fontFamily: Stack Sans Headline
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 1.375
    letterSpacing: 0
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 1.625
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 1.5
  overline:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 1.25
    letterSpacing: 0.06em

rounded:
  sm: 0.125rem      # 2px — rare
  DEFAULT: 0.25rem  # 4px — small inputs, dense UI
  md: 0.375rem      # 6px — Badge default
  lg: 0.5rem        # 8px — internal slots
  xl: 0.75rem       # 12px — DEFAULT for controls (Button sm/md, Input, Select, Combobox, NumberField, DatePicker)
  2xl: 1rem         # 16px — Overlays (Dialog, Drawer, Popover, Toast) & Button lg
  3xl: 1.5rem       # 24px — Card
  full: 9999px      # Chip, Avatar, pill Badge, NotificationBadge

spacing:
  # Tailwind v4 default scale — no custom ramp
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
  container-padding-mobile: 24px
  container-padding-desktop: 48px
  section-gap: 48px
  card-padding-sm: 16px
  card-padding-md: 20px
  card-padding-lg: 24px

shadow:
  sm: "0px 5px 1.5px -4px #08080817, 0px 6px 4px -4px #0808080d"
  md: "0 4px 12px rgba(0,0,0,0.08)"
  lg: "0 8px 24px rgba(0,0,0,0.12)"
  sm-dark: "0px 5px 1.5px -4px #08080817, 0px 6px 4px -4px #0808080d"
  md-dark: "0 4px 12px rgba(0,0,0,0.5)"
  lg-dark: "0 8px 24px rgba(0,0,0,0.6)"

motion:
  duration-fast: 100ms
  duration-normal: 200ms
  duration-slow: 300ms
  ease-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  ease-spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"

components:
  # --- BUTTONS ---
  button-primary:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.content-on-brand}"
    typography: "{typography.caption}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 16px
  button-primary-hover:
    backgroundColor: "{colors.yellow-400}"
    textColor: "{colors.content-on-brand}"
  button-neutral:
    backgroundColor: "{colors.shade-04}"
    textColor: "{colors.white}"
    typography: "{typography.caption}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 16px
  button-success:
    backgroundColor: "{colors.state-success}"
    textColor: "{colors.white}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 16px
  button-warning:
    backgroundColor: "{colors.state-warning}"
    textColor: "{colors.white}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 16px
  button-danger:
    backgroundColor: "{colors.state-error}"
    textColor: "{colors.white}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 16px
  button-outline:
    backgroundColor: "{colors.surface-primary}"
    textColor: "{colors.content-primary}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 16px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.content-primary}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 16px
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.content-brand}"
    rounded: "{rounded.sm}"
    padding: 0
  button-sm:
    rounded: "{rounded.xl}"
    height: 32px
    padding: 0 12px
  button-lg:
    rounded: "{rounded.2xl}"
    height: 48px
    padding: 0 24px
  icon-button:
    backgroundColor: "transparent"
    rounded: "{rounded.xl}"
    size: 40px
  # --- INPUTS ---
  input-field:
    backgroundColor: "{colors.surface-primary}"
    textColor: "{colors.content-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 12px
  input-field-focus:
    rounded: "{rounded.xl}"
    # focus ring: ring-2 ring-border-focus
  input-field-error:
    rounded: "{rounded.xl}"
    # error ring: ring-2 ring-state-error
  textarea:
    backgroundColor: "{colors.surface-primary}"
    textColor: "{colors.content-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: 12px
  select:
    backgroundColor: "{colors.surface-primary}"
    textColor: "{colors.content-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    height: 40px
    padding: 0 12px
  checkbox:
    backgroundColor: "{colors.surface-primary}"
    rounded: "{rounded.sm}"
    size: 20px
  switch:
    backgroundColor: "{colors.shade-08}"
    rounded: "{rounded.full}"
  switch-checked:
    backgroundColor: "{colors.brand-primary}"
  # --- DATA DISPLAY ---
  badge-default:
    backgroundColor: "{colors.shade-09}"
    textColor: "{colors.content-secondary}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 2px 8px
  badge-brand:
    backgroundColor: "{colors.accent-tertiary}"
    textColor: "{colors.content-brand}"
    rounded: "{rounded.md}"
    padding: 2px 8px
  badge-success:
    backgroundColor: "{colors.surface-success}"
    textColor: "{colors.state-success}"
    rounded: "{rounded.md}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.surface-warning}"
    textColor: "{colors.state-warning}"
    rounded: "{rounded.md}"
    padding: 2px 8px
  badge-error:
    backgroundColor: "{colors.surface-error}"
    textColor: "{colors.state-error}"
    rounded: "{rounded.md}"
    padding: 2px 8px
  badge-info:
    backgroundColor: "{colors.surface-info}"
    textColor: "{colors.state-info}"
    rounded: "{rounded.md}"
    padding: 2px 8px
  badge-pill:
    rounded: "{rounded.full}"
    padding: 2px 10px
  notification-badge:
    backgroundColor: "{colors.state-error}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    size: 16px
  chip-default:
    backgroundColor: "{colors.surface-primary}"
    textColor: "{colors.content-secondary}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    height: 32px
    padding: 4px 12px
  chip-active:
    backgroundColor: "{colors.accent-tertiary}"
    textColor: "{colors.content-brand}"
    rounded: "{rounded.full}"
  avatar:
    rounded: "{rounded.full}"
  # --- CARDS ---
  card-default:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.content-primary}"
    rounded: "{rounded.3xl}"
    padding: "{spacing.card-padding-md}"
    # no border — optional outline prop adds border-strong
  card-elevated:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.content-primary}"
    rounded: "{rounded.3xl}"
    padding: "{spacing.card-padding-md}"
    # shadow-md, no border
  card-muted:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.content-primary}"
    rounded: "{rounded.3xl}"
    padding: "{spacing.card-padding-md}"
    # no border
  product-card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.content-primary}"
    rounded: "{rounded.xl}"
    padding: "0"
    # lifts from shadow-sm to shadow-md on hover
  # --- OVERLAYS ---
  dialog:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.2xl}"
    padding: 24px
    # uses shadow-lg
  drawer:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.2xl}"
  popover:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.2xl}"
    padding: 12px
  tooltip:
    backgroundColor: "{colors.background-inverse}"
    textColor: "{colors.content-inverse}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 4px 8px
  toast:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.2xl}"
    padding: 16px
  # --- BANNERS ---
  alert-info:
    backgroundColor: "{colors.surface-info}"
    textColor: "{colors.state-info}"
    rounded: "{rounded.xl}"
    padding: 12px 16px
  alert-success:
    backgroundColor: "{colors.surface-success}"
    textColor: "{colors.state-success}"
    rounded: "{rounded.xl}"
    padding: 12px 16px
  alert-warning:
    backgroundColor: "{colors.surface-warning}"
    textColor: "{colors.state-warning}"
    rounded: "{rounded.xl}"
    padding: 12px 16px
  alert-error:
    backgroundColor: "{colors.surface-error}"
    textColor: "{colors.state-error}"
    rounded: "{rounded.xl}"
    padding: 12px 16px
  marketing-banner:
    backgroundColor: "{colors.background-brand}"
    textColor: "{colors.content-on-brand}"
    rounded: "{rounded.xl}"
    padding: 16px
  # --- NAVIGATION ---
  tab:
    textColor: "{colors.content-secondary}"
    typography: "{typography.caption}"
    padding: 8px 16px
  tab-active:
    textColor: "{colors.content-primary}"
    # border-bottom: 2px solid {colors.border-brand}
  breadcrumb-item:
    textColor: "{colors.content-secondary}"
    typography: "{typography.body-sm}"
  breadcrumb-current:
    textColor: "{colors.content-primary}"
  pagination-item:
    rounded: "{rounded.xl}"
    size: 36px
  pagination-active:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.content-on-brand}"
  accordion-trigger:
    textColor: "{colors.content-primary}"
    typography: "{typography.heading-4}"
    padding: 16px 0
  divider:
    backgroundColor: "{colors.border-default}"
    size: 1px
  page-background:
    backgroundColor: "{colors.background-primary}"
    textColor: "{colors.content-primary}"
  nav-top:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.content-primary}"
    typography: "{typography.caption}"
  brand-accent:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.content-on-brand}"
---

## Brand & Identity

**Velocity** is the design system powering **Runcycl**, a C2C marketplace for buying and selling second-hand running and cycling gear between enthusiasts. The aesthetic balances the raw energy of sport with the clarity and trustworthiness expected from a marketplace.

- **Personality**: active, clean, confident — the focused simplicity of athletic brands with the openness of a community-driven platform.
- **Visual signature**: **chartreuse-lime yellow** `#d0f400` (`yellow-300`). Used sparingly: primary CTAs, active states, focus rings, highlights.
- **Surface strategy**: neutral-dominant (~90% white / light grey). The brand yellow is an **accent**, never a large background fill.
- **Language pairings**: white + near-black (`#101010`) carry the layout; the yellow carries the action.

## Typography

Two families define the Velocity hierarchy:

- **Stack Sans Headline** — geometric display family. Used **exclusively** for headings (`heading-1` through `heading-4`) and hero text. Tight letter-spacing (`-0.02em`) at large sizes gives an editorial, premium feel.
- **Inter** — UI & body family. Used for `body-lg`, `body`, `body-sm`, `caption`, `overline`, plus every form field, button label, table cell, and piece of metadata.
- **JetBrains Mono** — code / data (prices in specs, SKUs, hashes). Not used in product UI.

Levels:

| Token        | Family | Size | Weight | Line-height | Tracking | Usage                         |
| ------------ | ------ | ---- | ------ | ----------- | -------- | ----------------------------- |
| `heading-1`  | Stack Sans Headline   | 36px | 700    | 1.25        | -0.02em  | Hero titles                   |
| `heading-2`  | Stack Sans Headline   | 30px | 700    | 1.25        | -0.02em  | Page titles                   |
| `heading-3`  | Stack Sans Headline   | 24px | 600    | 1.375       | 0        | Section headings              |
| `heading-4`  | Stack Sans Headline   | 20px | 600    | 1.375       | 0        | Card titles, accordion trigger|
| `body-lg`    | Inter  | 18px | 400    | 1.625       | 0        | Hero paragraphs               |
| `body`       | Inter  | 16px | 400    | 1.5         | 0        | Default paragraph             |
| `body-sm`    | Inter  | 14px | 400    | 1.5         | 0        | Metadata, dense tables        |
| `caption`    | Inter  | 12px | 500    | 1.5         | 0        | Labels, buttons, chips        |
| `overline`   | Inter  | 12px | 600    | 1.25        | 0.06em   | Category labels (UPPERCASE)   |

All text colours go through `content-*` tokens. Never pair Stack Sans Headline with small sizes (< 20px) — it's a display face.

## Color

The palette is **core** (raw hex) + **semantic** (role-based). Components always reference semantic tokens so dark mode adapts cleanly via `data-theme="dark"` on the root element.

- **Yellow (brand)** — 11 steps, `yellow-300` (`#d0f400`) is the canonical brand signal. Light tints (`yellow-100` / `yellow-200`) are safe for hover states and accent fills; dark tints (`yellow-700` / `yellow-800`) are used for text on yellow surfaces via `content-brand`.
- **Shade scale** — 10 steps `shade-01` (`#141414`) … `shade-10` (`#fdfdfd`); darkest UI ink is `shade-02` (`#101010`). Surfaces stack in thin layers: `surface-primary` (white) for elevated, `background-secondary` (`shade-10`) for page, `surface-tertiary` (`shade-09`) for muted blocks.
- **State primitives** — green / orange / red / blue at 500 for full-saturation icons and text; their tinted counterparts (`surface-success`, `surface-warning`, `surface-error`, `surface-info`) apply the same hue at 10–15% alpha for fills. WCAG AA compliant.
- **On-brand text** — when rendering text/icons on a brand surface (`bg-brand-primary`, `bg-background-brand`), ALWAYS pair with `text-content-on-brand` (`#101010`). Never white text on brand yellow/mint.
- **Focus ring** — yellow (`border-focus` = `yellow-300`) at 2px, on every interactive element.

### Semantic quick map

| Role         | Token                    | Light value   | Dark value     |
| ------------ | ------------------------ | ------------- | -------------- |
| Page bg      | `background-primary`     | white         | `shade-02`     |
| Section bg   | `background-secondary`   | `shade-10`    | `shade-01`     |
| Card surface | `surface-elevated`       | white         | `shade-01`     |
| Hover        | `surface-hover`          | `shade-09`    | `shade-03`     |
| Text primary | `content-primary`        | `shade-02`    | white          |
| Text muted   | `content-secondary`      | `shade-05`    | `shade-08`     |
| Border       | `border-default`         | `shade-08`    | `shade-03`     |
| Brand fill   | `brand-primary`          | `yellow-300`  | `yellow-400`   |
| Focus ring   | `border-focus`           | `yellow-300`  | `yellow-400`   |

## Layout & Spacing

8px base grid. Velocity uses the **Tailwind v4 default spacing scale** (`1` = 4px, `2` = 8px, `3` = 12px, `4` = 16px, ...). No custom pixel values.

- **Product grids**: 2 cols (mobile) → 3 cols (≥ 768px) → 4 cols (≥ 1024px). Gap: 16px. Card images are aspect-ratio locked.
- **Page container**: `max-w-7xl mx-auto`. Horizontal padding 24px (mobile) → 48px (desktop).
- **Section rhythm**: 48px vertical gap between sections, 24px between item groups, 16px inside cards.
- **Cards**: padding scales with variant — `sm` 16px, `md` 20px, `lg` 24px.
- **Touch targets**: minimum 44×44px. `button-lg` (48px) preferred for primary mobile CTAs.

## Elevation

Subtle elevation — this is a marketplace, not a dashboard. Three tokens only.

| Token       | Value                             | Usage                                          |
| ----------- | --------------------------------- | ---------------------------------------------- |
| `shadow-sm` | `0px 5px 1.5px -4px #08080817, 0px 6px 4px -4px #0808080d` | Default cards, `ProductCard` at rest           |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)`     | Elevated cards, hovered `ProductCard`, Popover |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)`     | Dialog, Drawer, Toast                          |

Product cards lift from `shadow-sm` → `shadow-md` on hover over `duration-normal` (200ms).

## Shape (Radius)

Four meaningful tiers — each maps to a family of components.

| Tier        | Value  | Token        | Components                                                                                          |
| ----------- | ------ | ------------ | --------------------------------------------------------------------------------------------------- |
| **Tag**     | 6px    | `rounded-md` | `Badge` (default), select options, tooltip                                                          |
| **Control** | 12px   | `rounded-xl` | `Textarea`, dropdown popovers, `SelectBox`, `Alert` surfaces                                        |
| **Overlay** | 16px   | `rounded-2xl`| `Dialog`, `Drawer`, `Popover`, `Toast`                                                              |
| **Surface** | 24px+  | `rounded-3xl` / `rounded-4xl` | `Card`                                                                                   |
| **Pill**    | full   | `rounded-full`| `Button`, `IconButton`, field shells (`Input`, `Select`, `Combobox`, `NumberField`, `DatePicker`), close/dismiss controls, `Pagination`, `Chip`, `Avatar`, `NotificationBadge`, pill `Badge`, `Switch` track |

Critical rules:

- All buttons and button-like controls use `rounded-full` (`Button`, `IconButton`, Pagination items, Dialog/Drawer/Toast/Popover close, banner dismiss/action, sidebar menu buttons).
- `Badge` default is `rounded-md` (not a pill). Pass `rounded` prop to switch to pill.
- `Chip` is a pill by default — opposite of `Badge`.
- Field shells (`Input`, `Select`, `Combobox`, `NumberField`, `DatePicker`) use `rounded-full`. `Textarea` and dropdown popovers stay `rounded-xl` / non-pill.
- `Card` uses a large surface radius (`rounded-3xl` / `rounded-4xl`) with `overflow-hidden` so images respect the radius. Nested images inherit — never add a separate radius on `<img>`.
- On mobile, bottom `Drawer` uses `rounded-t-2xl` with no bottom radius.

## Motion

| Token           | Value                                  | Usage                              |
| --------------- | -------------------------------------- | ---------------------------------- |
| `duration-fast` | 100ms                                  | Hover fills, tooltip show          |
| `duration-normal` | 200ms                                | Default — card lift, toast enter   |
| `duration-slow` | 300ms                                  | Accordion, drawer slide            |
| `ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)`         | Default easing                     |
| `ease-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)`    | Playful / toast / popover entrance |

Rules: transitions ≤ 300ms, prefer `transition-colors` / `transition-transform` / `transition-opacity` over `transition-all`. No arbitrary durations.

## Component Inventory

Every component is exported from the top-level `velocity-ds` entry point and built on **Base UI** primitives + Tailwind v4 semantic tokens.

### Actions
- **Button** — 5 variants (`solid`, `soft`, `ghost`, `outline`, `link`) × 5 colour schemes (`primary`, `neutral`, `success`, `warning`, `danger`) × 3 sizes (`sm` 32px, `md` 40px, `lg` 48px). Supports leading/trailing icons and `loading`. Focus: `ring-2 ring-border-focus`. Never stack two solid primary buttons in the same view.
- **IconButton** — same variants/colors/sizes. `aria-label` REQUIRED.

### Inputs
- **Input**, **Textarea**, **NumberField** — unified heights; field shells are `rounded-full` (`Textarea` stays non-pill), yellow focus ring, red ring on error.
- **Select**, **Combobox**, **SelectBox** — `Select` for short lists, `Combobox` for searchable, `SelectBox` for card-grid picker (condition pickers, category selectors).
- **Checkbox**, **RadioGroup**, **Switch** — `Switch` for instant state changes, `Checkbox` for multi-select in forms.
- **DatePicker** — `rounded-full` trigger; Inter body font.
- **Label**, **FileUpload**, **Rating**.

### Forms
- **Form** — compound: `FormSection` / `FormField` / `FormLabel` / `FormMessage` / `FormActions`. Wires `id` / `aria-*` / error state automatically.

### Data display
- **Badge** — 6 semantic variants (`default`, `brand`, `success`, `warning`, `error`, `info`). `rounded-md` default; `rounded` prop → pill.
- **NotificationBadge** — red dot/count over icons (cart, bell). `rounded-full`.
- **Chip** — filter pill, `rounded-full`. `active` state uses yellow accent tint.
- **Avatar**, **Separator**, **Spinner**, **Skeleton**, **Card** (compound: `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`), **Table**.

### Navigation
- **Tabs** — active tab uses yellow underline (`border-brand`).
- **Accordion** — `heading-4` trigger, 300ms slide on expand.
- **Breadcrumb** — secondary → current content colour progression.
- **Pagination** — active page fills with `brand-primary`.
- **Logo** — wordmark, uses Stack Sans Headline.

### Overlays
- **Dialog**, **Drawer** — `rounded-2xl`, `shadow-lg`. On mobile, prefer Drawer.
- **Popover**, **Tooltip** — `Tooltip` for pure descriptions (inverse bg), `Popover` for rich content.
- **Toast** — requires `ToastProvider` at app root. Prefer over `AlertBanner` for transient notifications.

### Banners
- **AlertBanner** — inline, for persistent messages (e.g. "Your listing is pending review"). 4 variants: `info`, `success`, `warning`, `error`.
- **MarketingBanner** — storefront promos. `solid` (yellow fill + `content-on-brand`) / `soft` / `outline`.

### E-commerce compounds
- **ProductCard** — media slot (aspect-ratio locked image), body (title, price, condition badge, seller avatar), optional action footer. Lifts `shadow-sm → shadow-md` on hover.
- **EcommerceSearchInput** — with suggestion dropdown.
- **EcommerceNavigation** — top bar: logo, search, cart with `NotificationBadge`, account avatar. Collapses to hamburger + `Drawer` on mobile.
- **CartContent**, **Footer**.

## Dark mode

Triggered by `data-theme="dark"` on `<html>` or `<body>`. All semantic tokens flip automatically:

- Background: white → `shade-02`; surfaces step up in lightness to separate from page.
- Content: `shade-02` → white; `content-on-brand` STAYS `shade-02` (yellow surfaces remain dark-text).
- Brand: `yellow-300` → `yellow-400` (slightly darker/more saturated for dark backgrounds).
- Shadows: intensified to 0.4 / 0.5 / 0.6 opacity.

NEVER write `dark:` variants against raw hex. Use semantic tokens and the theme follows.

## Do's & Don'ts

**Do**

- Use semantic tokens (`bg-background-*`, `text-content-*`, `border-border-*`, `bg-surface-*`, `shadow-*`).
- Use composite text utilities (`text-heading-1`, `text-body`, `text-caption`, `text-overline`) — they apply the right family + size + weight + tracking atomically.
- Use `rounded-full` for buttons and interactive controls; `rounded-xl` for textareas/popovers; `rounded-2xl` for overlays.
- Use `button-lg` (48px) for the primary CTA on mobile to meet touch targets.
- Apply `ring-2 ring-border-focus` on every focusable element.
- Pair every `bg-brand-*` / `bg-background-brand` with `text-content-on-brand`.
- Use Drawer instead of Dialog on mobile for bottom-sheet interactions.

**Don't**

- Don't apply `bg-brand-primary` or `bg-background-brand` to large surfaces — yellow overwhelms.
- Don't use raw Tailwind color scales (`bg-orange-500`, `text-shade-04`) in product code.
- Don't use fonts other than **Stack Sans Headline** (headings) and **Inter** (body/UI).
- Don't stack two solid primary buttons in the same view.
- Don't skip labels on form inputs — `aria-label` or `<FormLabel>` is mandatory.
- Don't write `dark:` variants with raw colors.
- Don't re-implement a Velocity component with custom markup. Extend via `className` or wrap it.

## Responsive

| Breakpoint  | Width   | Product grid | Navigation            |
| ----------- | ------- | ------------ | --------------------- |
| default     | < 640px | 2 cols       | Hamburger + Drawer    |
| sm (640px)  | ≥ 640px | 2 cols       | Compact top nav       |
| md (768px)  | ≥ 768px | 3 cols       | Full top nav          |
| lg (1024px) | ≥ 1024px| 4 cols       | Full nav + filters    |
| xl (1280px) | ≥ 1280px| 4–5 cols     | Wide container        |
