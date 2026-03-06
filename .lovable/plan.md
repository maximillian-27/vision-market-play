

## Problem

The admin panel shows a Vite build error: **"Failed to resolve import 'xlsx'"**. The packages `xlsx`, `jspdf`, and `jspdf-autotable` are listed in `package.json` but are not installed in `node_modules`. This blocks the entire admin panel from loading.

The root cause is that `ExportDropdown.tsx` uses top-level static imports (`import * as XLSX from "xlsx"`, `import jsPDF from "jspdf"`, etc.), which crash immediately when the modules aren't resolved.

## Fix

Rewrite `ExportDropdown.tsx` to use **dynamic imports** (`await import(...)`) inside the export handler functions instead of top-level static imports. This way:

- The component loads without requiring the packages at module parse time
- CSV export works natively (no external dependency needed)
- XLSX and PDF exports lazy-load their dependencies only when the user clicks the button
- If a package fails to load, a toast error is shown gracefully

### Changes to `src/components/admin/ExportDropdown.tsx`:

1. **Remove** the three top-level imports: `import * as XLSX`, `import jsPDF`, `import autoTable`
2. **CSV** — already uses no external dependency (Blob + download), keep as-is
3. **XLSX** — change `exportXlsx` to `async`, dynamically import `xlsx` inside
4. **PDF** — change `exportPdf` and `exportDashboardPdf` to `async`, dynamically import `jspdf` and `jspdf-autotable` inside
5. Wrap each dynamic import in try/catch with a `toast.error("Export library not available")` fallback

### Also update `src/components/admin/SegmentsPanel.tsx`:
- Verify it imports `ExportDropdown` (already does) — no changes needed once ExportDropdown is fixed

No other files need changes. This single-file fix unblocks the entire admin panel.

