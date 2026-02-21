

# Admin Console Audit & Improvements

After reviewing all 12 admin sections, the structure is solid but there are gaps that would prevent actually running a platform. Here's what needs attention:

## Critical Issues

### 1. Dashboard is too basic
The current dashboard only shows 8 stat cards and a recent activity list. For a platform operator, this needs to be the command center.

**Add:**
- Gross Gaming Revenue (GGR) and Net Gaming Revenue (NGR) cards
- Platform health status indicator (API uptime, PSP health)
- Clickable stat cards that navigate to the relevant section (e.g., clicking "Open Disputes" goes to Disputes)
- Today's signups vs deposits conversion mini-metric
- Quick action buttons (Approve pending markets, Review disputes)

### 2. Analytics has empty chart placeholders
The Analytics section has 4 placeholder boxes with dashed borders saying "chart visualization" instead of actual charts. The project already has `recharts` installed -- these should be real charts.

**Replace placeholders with:**
- User Activity Over Time: line chart with daily active users
- Category Distribution: pie chart of market volume by category
- Volume Over Time: bar chart of weekly trading volume
- Revenue Trend: area chart of daily revenue

### 3. CRM contacts data unused
The CRM component defines a `contacts` array (line 45-50) with 4 contacts but never renders them anywhere. The Overview tab only shows stats and segments.

**Fix:** Add a "Recent Contacts" table to the Overview tab showing the contacts data.

### 4. UAT test matrix is random
The test matrix uses `Math.random()` at module scope, so results change every time the component re-mounts. This makes it useless for tracking.

**Fix:** Replace with deterministic mock data so statuses are stable.

## Missing Features (needed to run a platform)

### 5. No pagination on any table
Every table shows all rows with no pagination. With real data (124K users, 1,247 markets), these tables would be unusable.

**Add:** A simple "Showing 1-10 of X" footer with Previous/Next buttons to key tables (Users, Transactions, Markets, Disputes).

### 6. No date range filtering
Most sections lack date range controls. Transactions especially need date filtering to find specific records.

**Add:** Date range selector to Transactions, Campaigns, and History tables.

### 7. Users section missing KYC detail
Users table shows a "Verified" badge but there's no way to manage KYC -- view documents, approve/reject verification, see KYC status detail.

**Add:** A "KYC" column with statuses (Not Started, Pending, Approved, Rejected) and a "Review KYC" action in the dropdown.

### 8. No system/platform settings
Market Settings exist but there's no general platform configuration -- things like:
- Platform name, support email, timezone
- Maintenance mode toggle
- Feature flags (enable/disable crypto deposits, social features, etc.)
- Terms of Service and legal page URLs

**Add:** A "Platform Settings" card to the Dashboard or a settings sub-section.

## Polish & UX Improvements

### 9. Save buttons don't provide feedback
Settings forms (Market Settings, Risk & Limits, RAF Settings, Bonus Create) have "Save" buttons but no toast/confirmation when clicked.

**Fix:** Add toast notifications on save button clicks using the existing sonner toast system.

### 10. Export buttons are non-functional
Export buttons in Users and Transactions don't do anything.

**Fix:** Wire them to generate and download a CSV of the currently filtered data.

### 11. Dashboard stats should link to sections
Clicking "Pending Markets: 23" should take you to the Pending Approval tab in Markets. Currently, the cards are static.

**Fix:** Make stat cards clickable with `onClick` handlers that change the active section.

## Technical Details

### Files to modify:
- `src/components/admin/AdminDashboard.tsx` -- Add GGR/NGR stats, platform health, clickable cards, quick actions
- `src/components/admin/AdminAnalytics.tsx` -- Replace 4 chart placeholders with actual recharts components
- `src/components/admin/AdminCRM.tsx` -- Render contacts table in Overview tab
- `src/components/admin/AdminUAT.tsx` -- Replace random matrix with deterministic data
- `src/components/admin/AdminUsers.tsx` -- Add KYC column and pagination
- `src/components/admin/AdminTransactions.tsx` -- Add date filter and pagination
- `src/components/admin/AdminMarkets.tsx` -- Add pagination to All Markets table
- `src/components/admin/AdminCommissions.tsx` -- Add toast on save
- `src/components/admin/AdminBonusManagement.tsx` -- Add toast on create bonus
- `src/pages/Admin.tsx` -- Support section navigation from dashboard clicks

### No new files needed
All improvements are enhancements to existing components.

### Dependencies
- `recharts` (already installed) for Analytics charts
- `sonner` (already installed) for toast notifications
- No new packages required

## Priority Order
1. Dashboard enhancements (command center)
2. Real charts in Analytics (visual credibility)
3. Toast feedback on all save/action buttons
4. Pagination on tables
5. CRM contacts fix
6. UAT deterministic data
7. Date filters
8. KYC management
9. Export functionality
10. Platform settings

