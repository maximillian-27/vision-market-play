

## Problem

Vite's `import-analysis` plugin scans **all** `import()` calls — including dynamic ones — and fails because `xlsx`, `jspdf`, and `jspdf-autotable` are not actually installed in `node_modules`. This crashes the entire admin panel.

## Plan

**Remove all references to `xlsx`, `jspdf`, and `jspdf-autotable`** and keep only CSV export (which needs no external libraries).

### 1. Rewrite `src/components/admin/ExportDropdown.tsx`
- Remove `exportXlsx` and `exportPdf` functions entirely
- Remove `exportDashboardPdf` export entirely
- Keep only CSV export with the existing Blob-based approach
- Simplify the dropdown to a single "Export CSV" button (or keep dropdown with just CSV)

### 2. Update `src/components/admin/AdminDashboard.tsx`
- Remove the `import { exportDashboardPdf }` line
- Remove or replace the "Export Report (PDF)" button (change to CSV export or remove entirely)

### 3. Clean up `package.json`
- Remove `xlsx`, `jspdf`, `jspdf-autotable` from dependencies

### 4. Remove `src/types/vendor.d.ts`
- No longer needed since those modules are gone

**No changes needed** to SegmentsPanel, AdminUsers, AdminCreatorsAffiliates, AdminReferrals, or any other files — they just import `ExportDropdown` which will continue to work with CSV only.

### Result
- Admin panel loads without errors
- All segments (Users, Creators, Affiliates) work as designed
- All tables export to CSV
- No broken XLSX/PDF features cluttering the UI

