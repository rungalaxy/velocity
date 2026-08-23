# Data display

Components for showing information, structure, and loading states.

```ts
import {
  Badge, NotificationBadge, Chip,
  Avatar, AvatarParts,
  Separator, Spinner, Skeleton,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell,
} from "velocity-ds";
```

---

# Badge

Small, static status pill.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"solid" \| "soft" \| "outline"` | `"soft"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `colorScheme` | `"primary" \| "neutral" \| "success" \| "warning" \| "danger"` | `"neutral"` |

```tsx
<Badge colorScheme="success">In stock</Badge>
<Badge variant="outline" colorScheme="warning">Low stock</Badge>
<Badge colorScheme="danger">Out of stock</Badge>
```

## When to use
- Stock / order / delivery status
- Feature tags on a product ("New", "Bestseller")
- Counters without numeric values ("Sale")

---

# NotificationBadge

Dot / numeric counter anchored to an icon or avatar.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"dot" \| "count"` | `"count"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `value` | `number` (for `count`) | — |
| `max` | `number` | `99` |

```tsx
<div className="relative">
  <IconButton aria-label="Cart"><RiShoppingCart2Line /></IconButton>
  <NotificationBadge value={3} className="absolute -top-1 -right-1" />
</div>
```

## When to use
- Cart counts, unread notifications
- Presence dots on avatars

---

# Chip

Interactive tag (filter, removable, selectable).

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"solid" \| "soft" \| "outline"` | `"soft"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `onRemove` | `() => void` | — |
| `selected` | `boolean` | — |
| `disabled` | `boolean` | `false` |

```tsx
{/* Filter chips */}
<Chip selected onClick={toggleRoadFilter}>Road</Chip>
<Chip onClick={toggleTrailFilter}>Trail</Chip>

{/* Removable tag */}
<Chip onRemove={() => removeTag("running")}>running</Chip>
```

## Chip vs Badge

- **Badge** → static, non-interactive status label.
- **Chip** → interactive tag (click to toggle, remove with X).

---

# Avatar (+ `AvatarParts`)

User / entity profile image with fallback.

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `src` | `string` | — |
| `alt` | `string` | required when `src` |
| `fallback` | `ReactNode` (initials, icon) | — |

```tsx
<Avatar src={user.photo} alt={user.name} fallback={user.initials} />
```

For custom composition (status dot, group stacks), use `AvatarParts.{Root, Image, Fallback}`.

---

# Separator

Horizontal or vertical divider.

| Prop | Type | Default |
| --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `decorative` | `boolean` | `true` |

```tsx
<Separator />
<div className="flex gap-4">
  <span>Road</span>
  <Separator orientation="vertical" />
  <span>Trail</span>
</div>
```

## Rules
- Set `decorative={false}` only if the separator has semantic meaning (rare).
- DO NOT replace `Separator` with a raw `<hr>` or `<div className="border-t" />`.

---

# Spinner

Inline loading indicator.

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `colorScheme` | same as `Button` | `"primary"` |

```tsx
<Spinner size="sm" />
<Button loading>Saving…</Button>  {/* has its own spinner baked in */}
```

## Spinner vs Skeleton

- **Spinner** → small punctual loading (button, icon button, "sending").
- **Skeleton** → page / card / list loading that has a known shape.

---

# Skeleton

Content-shaped loading placeholder.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"text" \| "rect" \| "circle"` | `"rect"` |
| `animation` | `"pulse" \| "wave" \| "none"` | `"pulse"` |

```tsx
<div className="flex items-center gap-3">
  <Skeleton variant="circle" className="h-10 w-10" />
  <div className="flex-1">
    <Skeleton variant="text" className="w-1/2" />
    <Skeleton variant="text" className="w-1/3 mt-2" />
  </div>
</div>
```

## Rules
- Match the skeleton shape to the final content (image box, avatar circle, text lines).
- Render skeletons at the same position / size as the eventual content to avoid layout shift.

---

# Card compound

Container for grouped content.

## Parts

- `Card` — root
- `CardHeader` — header area (title / description)
- `CardTitle` — heading (renders as an `<h3>`-shaped text)
- `CardDescription` — subtitle / supporting text
- `CardContent` — main body
- `CardFooter` — bottom actions

## Props (`Card`)

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "elevated" \| "muted"` | `"default"` |
| `outline` | `boolean` | `false` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |

## Example

```tsx
<Card variant="elevated" size="md">
  <CardHeader>
    <CardTitle>Order #1024</CardTitle>
    <CardDescription>Placed on 12 April</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-body text-content-secondary">3 items · 129 €</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Track</Button>
    <Button variant="solid">View details</Button>
  </CardFooter>
</Card>
```

## Rules
- ALWAYS use the compound parts. Do NOT render a single `<div>` styled like a card.
- `CardTitle` is visual; if the card is a landmark, wrap it with proper semantics (`<article>`, `<section>`).
- Variants are borderless. Pass `outline` when you need a strong border.
- `CardFooter` has no top separator by default.

---

# Table compound

Compound for data tables.

## Parts

- `Table`, `TableHeader`, `TableBody`, `TableFooter`
- `TableRow`, `TableHead` (`<th>`), `TableCell` (`<td>`)

## Props (`Table`)

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |

## Example

```tsx
<Table size="md">
  <TableHeader>
    <TableRow>
      <TableHead>Order</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orders.map((o) => (
      <TableRow key={o.id}>
        <TableCell>{o.number}</TableCell>
        <TableCell>{o.date}</TableCell>
        <TableCell><Badge colorScheme="success">{o.status}</Badge></TableCell>
        <TableCell className="text-right">{o.total} €</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Rules
- Use `TableHead` for header cells (`<th>`), `TableCell` for body cells (`<td>`).
- For sortable columns, put an interactive `Button variant="ghost"` inside the `TableHead`.
- For pagination, pair with the `Pagination` compound ([navigation.md](./navigation.md)).
- DO NOT nest `<table>` elements manually inside velocity components.
