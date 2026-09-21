# Velocity — Components

E-commerce design system built on [Base UI](https://base-ui.com) + Tailwind CSS v4.

E-commerce–specific UI lives under **`src/components/ecommerce/`** (e.g. `ProductCard/`, `EcommerceNavigation/`). Public imports stay **`velocity-ds`** — only internal paths changed.

---

## ✅ Done

| Component | Base UI | Description |
|---|---|---|
| `Button` | `@base-ui-components/react/button` | Button with `primary`, `secondary`, `ghost`, `destructive` variants and `sm`, `md`, `lg` sizes |
| `Radio` / `RadioGroup` | `@base-ui-components/react/radio` | Single selection within a group of options |

---

## 🔲 To do

### Foundations

| Component | Base UI | E-commerce use |
|---|---|---|
| ~~`Checkbox`~~ ✅ | `@base-ui-components/react/checkbox` | Product filters, T&C acceptance, delivery options |
| ~~`Switch`~~ ✅ | `@base-ui-components/react/switch` | Account preferences, notifications, dark mode |
| ~~`Slider`~~ ✅ | `@base-ui-components/react/slider` | Price range filters, volume, numeric ranges |
| ~~`Input`~~ ✅ | — (native) | Text field — quantity, promo code, search |
| `Textarea` | — (native) | Customer reviews, order message |
| `Select` | `@base-ui-components/react/select` | Size, color, country selection |
| `Label` | — (native) | Accessible label for all form fields |
| `Badge` | — | Status tag — "New", "Sale", "Out of stock", "Best-seller" |
| `Spinner` / `Loader` | — | Cart loading, payment confirmation |

### Navigation & Layout

| Component | Base UI | E-commerce use |
|---|---|---|
| `Tabs` | `@base-ui-components/react/tabs` | Product description / Reviews / Specifications |
| `Accordion` | `@base-ui-components/react/accordion` | FAQ, mobile filters, order details |
| `Breadcrumb` | — | Category → subcategory → product navigation |
| `Pagination` | — | Product listings, order history |
| ~~`Footer`~~ ✅ | — | Page footer with multi-column link groups and bottom bar |

### Feedback & Overlays

| Component | Base UI | E-commerce use |
|---|---|---|
| `Toast` / `Snackbar` | `@base-ui-components/react/toast` | "Added to cart", payment error, confirmation |
| `Dialog` / `Modal` | `@base-ui-components/react/dialog` | Delete confirmation, product preview, quick login |
| ~~`AlertDialog`~~ ✅ | `@base-ui-components/react/alert-dialog` | Destructive confirm, unsaved changes, irreversible actions |
| `Drawer` | `@base-ui-components/react/dialog` | Side cart, mobile filters |
| `Tooltip` | `@base-ui-components/react/tooltip` | Price info bubble, form field help |
| `Popover` | `@base-ui-components/react/popover` | Quick product preview, color/size picker |
| `AlertBanner` | — | Global promotion, free shipping, low stock alert |

### Product & Catalog

| Component | Base UI | E-commerce use |
|---|---|---|
| `ProductCard` | — | Product card — image, name, price, CTA |
| ~~`Price`~~ ✅ | — | Current price, strikethrough original, optional discount badge |
| `RatingStars` | — | Product rating (read + review input) |
| `QuantityInput` | — | Quantity selector with `+` / `−` |
| `ColorSwatch` | — | Visual color/variant selector |
| `ImageGallery` | — | Product image carousel with zoom |

### Cart & Checkout

| Component | Base UI | E-commerce use |
|---|---|---|
| `CartItem` | — | Cart line — image, name, variant, quantity, price |
| `OrderSummary` | — | Order recap — subtotal, shipping, total |
| `PromoCodeInput` | — | Promo code field + button with feedback |
| `StepIndicator` | — | Checkout progress — Cart → Shipping → Payment |

### Account & Forms

| Component | Base UI | E-commerce use |
|---|---|---|
| `FormField` | — | Label + input + error message wrapper |
| `AddressForm` | — | Shipping/billing address form |
| `PasswordInput` | — | Password input with visibility toggle |

---

## Suggested priority order

1. `Checkbox` + `Input` + `Select` + `Label` — required for forms
2. `Toast` + `Dialog` — cart feedback and confirmations
3. `Badge` + `ProductCard` + `PriceDisplay` — catalog display
4. `Accordion` + `Drawer` — mobile navigation and filters
5. `QuantityInput` + `CartItem` + `OrderSummary` — checkout flow
6. Remaining components based on product needs
