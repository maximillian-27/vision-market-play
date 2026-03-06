

# Admin Panel Rebuild Plan

## Current State
The admin panel has 10 sections with a working sidebar. The content is dense but lacks structural consistency — some sections are overstuffed (CRM mixes users + creators + affiliates + payouts), while others are sparse. The sidebar organization (Operations/People/Growth/Intelligence) is solid.

## New Structure

The sidebar will be reorganized into **8 sections** (down from 10), splitting CRM into separate Users and Creators & Affiliates sections, and merging Security + Compliance + Support into one section.

```text
Sidebar (unchanged grouping style)
─────────────────────────────
CORE
  Dashboard          (overview + quick actions)
  Analytics & BI     (5 tabs: performance, financial, users/funnels, markets, creators)

OPERATIONS
  Markets            (status counts + tabbed management)
  Transactions       (time-filtered analytics + tabs)

PEOPLE
  Users              (simple user mgmt + segments + campaigns)
  Creators & Affiliates  (metrics + lists + payouts + segments + campaigns + automations)

ENGAGE
  Loyalty & Bonuses  (active bonuses, promotions, loyalty tiers, create)
  Marketing          (SEO, tracking, events, socials, channels)

TRUST
  Security & Compliance & Support  (merged into one section with tabs)
```

## Detailed Changes Per Section

### 1. Analytics & BI (existing — refine)
Keep 5 tabs: **Performance, Financial, Users & Funnels, Markets, Creators & Affiliates**. Clean up:
- Performance: Platform KPIs (volume, trades, revenue, retention, signups), fee revenue trend chart, traffic sources
- Financial: P&L cards, monthly trend, cost breakdown, revenue by source, unit economics
- Users & Funnels: DAU/MAU, conversion funnel, demographics (new: geo breakdown, device split, age ranges), cohort retention
- Markets: Category distribution, volume by category chart, top markets table, market health metrics
- Creators & Affiliates: Growth chart, top creators/affiliates tables, avg revenue per creator/affiliate

### 2. Markets (existing — minor cleanup)
- Top row: 4 status count cards (Open, Pending, Disputed, Resolution) — clickable
- Tabs: **Active, Pending, Disputed, Resolution, History, Categories, Settings**
- Table columns: Highlighted star icon, Title, Creator, Status, Trades, Pot Size, Fee Revenue, Start Date, End Date, Actions dropdown (View, View Creator, Highlight/Unhighlight, Pause, Cancel, Resolve)
- Filters: Search, status, category, sort, time period

### 3. Transactions (existing — refine)
- Time period pills: 24h / 7d / 30d / 90d / All Time
- Analytics row: Nr. Deposits + avg deposit, Nr. Withdrawals + avg withdrawal, Net Flow, Pending Review count
- Tabs: **Transactions, Wallets, Risk & Limits**
- Risk & Limits tab: withdrawal limits config, deposit thresholds, auto-hold rules

### 4. Users (NEW — extracted from CRM)
- Simple user table with search/filters (name, email, status, volume, trades, joined, verified)
- Segments tab: predefined segments (Whales, New users, Dormant, VIP) with counts
- Campaigns tab: email/push campaign list with status, open rate, click rate
- Actions: View profile, suspend, verify, message, export

### 5. Creators & Affiliates (NEW — extracted from CRM)
- Metrics row: Total creators, total affiliates, avg revenue per creator, avg revenue per affiliate, pending applications
- List tab with filter toggle: Creators / Affiliates / All — table with name, type, tier, markets, volume, earnings, status, actions
- Payouts tab: pending/completed payouts table
- Segments tab: creator/affiliate segments
- Campaigns tab: targeted outreach
- Automations tab: auto-tier upgrades, payout schedules, notification rules

### 6. Loyalty & Bonuses (existing — keep as-is, minor polish)
- Tabs: Active Bonuses, Promotions, Loyalty Tiers, Create Bonus
- Each bonus card shows ROI (revenue from users vs. cost)

### 7. Marketing (existing — keep as-is)
- SEO checklist, Tracking integrations, Event tracking table, Social channels, Platforms & tools

### 8. Security, Compliance & Support (MERGED)
- Tabs: **Wallet Monitoring, Fraud Detection, KYC/AML, Compliance, Bug Reports, Audit Log, Support Tickets, Knowledge Base**
- This consolidates 3 existing sections into one, reducing sidebar clutter

## Implementation Approach

Files to create/modify:
1. **`src/components/admin/AdminSidebar.tsx`** — Update sidebar items to new 8-section structure
2. **`src/pages/Admin.tsx`** — Update section routing and titles
3. **`src/components/admin/AdminUsers.tsx`** — NEW: Simple user management (extracted from AdminCRM)
4. **`src/components/admin/AdminCreatorsAffiliates.tsx`** — NEW: Creators & affiliates (extracted from AdminCRM)
5. **`src/components/admin/AdminDashboard.tsx`** — Simplify: keep P&L, platform health, alerts, activity. Remove redundant stat rows
6. **`src/components/admin/AdminAnalytics.tsx`** — Add demographics/geo to Users & Funnels tab
7. **`src/components/admin/AdminMarkets.tsx`** — Add highlight toggle to table, add start date column
8. **`src/components/admin/AdminTransactions.tsx`** — Add analytics summary row (deposits count/avg, withdrawals count/avg, net flow, pending), add Risk & Limits tab
9. **`src/components/admin/AdminBonusManagement.tsx`** — Minor polish only
10. **`src/components/admin/AdminMarketing.tsx`** — Keep as-is
11. **`src/components/admin/AdminSecurityComplianceSupport.tsx`** — NEW: Merge Security + Compliance + Support into one tabbed component
12. Delete `AdminCRM.tsx`, `AdminSecurity.tsx`, `AdminCompliance.tsx`, `AdminSupport.tsx` (merged)

This is a large rebuild spanning ~12 files. It should be broken into 3-4 implementation steps to keep changes manageable.

