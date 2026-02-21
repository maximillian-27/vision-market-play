
# Admin Dashboard - Usability & Layout Polish

Cleaning up redundancy, improving information hierarchy, and making everything scannable at a glance.

## Issues Found

1. **Duplicate "Analytics & BI" title** -- the page header says "Analytics & BI" AND there's a second "Analytics & BI" heading with the date filter inside the content area. Double header wastes space.
2. **Performance tab has 10 KPI cards** stacked before any chart -- too many cards before you see the trend. The revenue breakdown (MTD, Platform Fees, Withdrawal Fees, Other Revenue) duplicates what's already on the Dashboard.
3. **Users & Funnel** has 5 metric cards at the top with "Benchmark" labels that feel clinical -- CAC and LTV are on separate cards leaving empty space on the right.
4. **Dashboard has too many card rows** -- 4 rows of stat cards + action buttons + 2-column layout = a lot of scrolling before anything actionable.
5. **Marketing tab is well-structured** but the Event Tracking table takes up a lot of space for what's essentially a reference list.

## Changes

### 1. AdminAnalytics.tsx -- Remove duplication, tighten layout

**Remove the duplicate heading**: The inner "Analytics & BI" h2 + date filter row is redundant since the page already has a header. Move the date filter and Export button into the tabs row (right-aligned).

**Performance tab -- reduce from 10 cards to 6 + chart**:
- Keep the 6 KPI cards (Revenue, Active Users, Pot Size, Signups, Retention, Avg Session) in a 3x2 grid
- Remove the 4 revenue breakdown cards (MTD, Platform Fees, Withdrawal Fees, Other Revenue) -- this detail belongs in Transactions, not the overview
- Revenue Trend chart stays
- Traffic Sources stays

**Users & Funnel tab -- tighten the metric cards**:
- Combine the 5 metrics into a 3+2 grid (already is, but make the second row span 3 columns so cards stretch evenly instead of leaving a gap)
- The rest (funnel, insights, activity chart) stays as-is

**Markets tab** -- no changes, already clean.

### 2. AdminDashboard.tsx -- Merge action items into the alert cards

**Combine the "Quick Stats" row with "Quick Actions" row**:
- Instead of separate alert cards (Pending Markets: 23, Open Disputes: 8, Pending Resolutions: 15) AND separate buttons below, put the action button inside each alert card. This removes an entire row.
- Remove the standalone Quick Actions button row entirely.

**Move Platform Settings to a collapsed section or remove from dashboard**:
- Platform Settings (maintenance mode, crypto deposits, social features) belongs in a dedicated Settings page, not on the main dashboard overview. Remove it from the dashboard to reduce scroll length.
- Keep Recent Activity as the only bottom card, spanning full width.

### 3. AdminMarketing.tsx -- Compact the event table

- Reduce the event tracking table to show only the top 5 events by default with a "Show all" toggle, instead of always showing all 7 rows.
- This isn't critical but keeps the tab cleaner.

## Summary of Visual Impact

**Dashboard**: Goes from ~5 scroll-lengths to ~3 by removing the separate action buttons row and Platform Settings card.

**Analytics Performance**: Goes from 10 stat cards + chart to 6 stat cards + chart by removing the revenue breakdown that duplicates Transactions data.

**Analytics header**: Single clean row with tabs on the left, date filter + export on the right. No duplicate title.

## Technical Details

### AdminAnalytics.tsx
- Remove lines 107-123 (the duplicate h2 + Select + Export row)
- Move the Select and Export Button into the TabsList row, wrapped in a flex container
- Remove lines 155-181 (the 4 revenue breakdown cards)
- In the Users & Funnel tab, change the second row grid from `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` to `grid-cols-2 lg:grid-cols-3` so the 2 remaining cards (CAC, LTV) stretch to fill 2 of 3 columns instead of leaving a gap

### AdminDashboard.tsx
- Merge lines 183-214 (alert cards) with lines 216-234 (action buttons) into a single section where each card has an inline "View" button
- Remove lines 254-297 (Platform Settings card)
- Make Recent Activity card span full width instead of being in a 2-col grid
