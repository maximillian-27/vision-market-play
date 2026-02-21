

# Admin Dashboard - Logic & Usability Overhaul

Streamlining the admin panel to surface important information first, reduce tab overload, apply pari-mutuel terminology consistently, and remove clutter.

## Problem Summary

- **Analytics has 6 sub-tabs** (Overview, User Analytics, Market Analytics, Revenue, Funnel, Marketing) -- too many clicks to find what matters
- **Pari-mutuel terminology missing** in admin: still says "Volume", "Trades", "Trading Volume" instead of "Pot Size", "Tickets"
- **Dashboard duplicates** Analytics data (both show revenue, volume, users)
- **Marketing tab buried** as last item in Analytics
- **Funnel and Revenue are separate tabs** but should be front-and-center, not hidden

## Changes

### 1. AdminAnalytics.tsx -- Consolidate 6 tabs down to 4, reorder by importance

**Current tabs:** Overview | User Analytics | Market Analytics | Revenue | Funnel | Marketing

**New tabs:** Performance | Users & Funnel | Markets | Marketing

- **Performance** (was Overview + Revenue merged): KPI cards on top (Revenue 24h, Active Users, Pot Size 24h, New Signups, Retention, Avg Session), then Revenue Trend chart, then Traffic Sources. Removes the separate Revenue tab entirely.
- **Users & Funnel** (was User Analytics + Funnel merged): User metrics cards on top (DAU/MAU, ARPU, Churn, CAC, LTV), then Conversion Funnel visual with the 3 insight cards (Best Performing, Needs Improvement, Overall Conversion), then User Activity chart below.
- **Markets**: Top Performing Markets table (rename "Volume" to "Pot Size", "Trades" to "Tickets"), Category pie chart, Pot Size Over Time bar chart. Same data, updated labels.
- **Marketing**: Unchanged -- already well-structured from AdminMarketing.tsx.

Also update all labels: "Trading Volume" to "Total Pot Size", "Volume" to "Pot Size" in charts.

### 2. AdminDashboard.tsx -- Apply pari-mutuel terminology

- Line 35: `totalVolume` display label "Total Volume" becomes "Total Pot Size"
- Line 111: Label text "Total Volume" becomes "Total Pot Size"
- Keep the data values the same, just rename the labels

### 3. AdminMarkets.tsx -- Apply pari-mutuel terminology

- Mock data: keep `volume` and `trades` keys but update display labels
- Line 94: Table header "Volume" becomes "Pot Size"
- Line 95: Table header "Trades" becomes "Tickets"
- Line 190: Category card "Volume" label becomes "Pot Size"

### 4. AdminMarketing.tsx -- Minor cleanup

- Remove the "Action" column from Event Tracking table (redundant with "Category") to reduce width
- Remove the `font-mono` ID line from integrations (visual clutter -- the description already explains what to do)

## What stays the same

- Sidebar structure and navigation
- All other admin sections (Users, Disputes, Transactions, CRM, Commissions, Creators, Partners, Bonuses, UAT)
- Card designs, color scheme, responsive patterns
- All mock data values (just label changes)

## Technical Details

### AdminAnalytics.tsx restructure
- Remove `TabsTrigger` for "revenue" and "funnel" tabs
- Rename "overview" tab to "performance", merge in revenue KPI cards + AreaChart from the old revenue tab
- Rename "users" tab to "users-funnel", append the conversion funnel Progress bars + 3 insight cards from the old funnel tab
- Update chart tooltip labels and table headers for pari-mutuel terminology
- Remove unused imports after consolidation

### Label changes (AdminDashboard + AdminMarkets)
- Simple string replacements: "Volume" to "Pot Size", "Trades" to "Tickets", "Trading Volume" to "Total Pot Size"

