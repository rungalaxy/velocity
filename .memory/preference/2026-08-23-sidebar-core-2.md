---
date: 2026-08-23
user: Martin
category: preference
tags: [sidebar, navigation, core-2]
---

# Sidebar matches Core 2.0 rail

Sidebar uses seamless `bg-surface-tertiary` (no divider border between rail and content), ~17.5rem width, 48px nav rows with 24px Hugeicons, tree-style `SidebarMenuSub` connectors, and an elevated white pill (`bg-surface-primary shadow-sm rounded-xl`) for the active leaf. Submenus animate via Base UI `Collapsible` (`SidebarMenuCollapsible*`). In icon-collapsed mode, collapsibles stay closed (no inline submenu / chevron). `SidebarTrigger` is ghost. The `SidebarRail` hit area has no vertical border line.
