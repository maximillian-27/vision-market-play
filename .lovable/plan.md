

## Problem

The admin panel has **build errors** preventing it from loading. Multiple components fail to hot-reload because `ExportDropdown.tsx` imports three packages (`xlsx`, `jspdf`, `jspdf-autotable`) that are missing their **TypeScript type declarations**.

The packages themselves are installed, but their `@types/*` packages are not, causing TypeScript compilation to fail. This cascades across every admin section that imports `ExportDropdown`.

## Fix Plan

**Install missing type declarations:**

Add the following dev dependencies:
- `@types/jspdf` (if available, otherwise use `// @ts-ignore` or declare modules)
- For `jspdf-autotable`, a module declaration is typically needed

Actually, `jspdf` v4 ships its own types, and `xlsx` v0.18 ships its own types too. The issue is likely that the packages weren't fully installed or their types aren't resolving. The simplest reliable fix:

**Add a TypeScript module declaration file** (`src/types/vendor.d.ts`) to declare the three modules, ensuring TypeScript stops complaining regardless of whether the packages ship types:

```ts
declare module 'xlsx';
declare module 'jspdf';
declare module 'jspdf-autotable';
```

This is a single-file fix that unblocks the entire admin panel, including segments, export dropdowns, and all sections.

## Scope

- Create `src/types/vendor.d.ts` with module declarations
- No other changes needed — all segments, export features, and UI code already exist and will work once the build error is resolved

