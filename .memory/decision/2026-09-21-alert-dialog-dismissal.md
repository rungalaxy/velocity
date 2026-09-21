---
date: 2026-09-21
category: decision
tags: [alert-dialog, accessibility, base-ui]
---

## Alert dialog dismissal

`AlertDialog` wraps `@base-ui-components/react/alert-dialog`. It is always modal (`role="alertdialog"`). Escape closes it; overlay clicks do not, because the primitive sets `disablePointerDismissal`. Cancel and the primary action are explicit close buttons composed with `Button`.
