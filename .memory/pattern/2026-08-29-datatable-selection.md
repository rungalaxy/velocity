---
date: 2026-08-29
category: pattern
tags: [DataTable, Table, Checkbox, selection]
---

DataTable is the selectable data grid: compose existing `Table` primitives + `Checkbox`, do not duplicate table chrome. Leading checkbox column with select-all (incl. indeterminate); selection via `selectedKeys` / `defaultSelectedKeys` / `onSelectionChange` and `getRowKey`. Forward `aria-label` through Checkbox (fixed so Base UI Root receives it); use `getRowLabel` for distinct per-row names.
