

# Admin Console Overhaul

This is a significant restructuring and expansion of the admin panel to cover all the operational needs of running a prediction market platform. The sidebar navigation will be reorganized into logical groups, and several sections will be rebuilt or created from scratch.

## New Sidebar Navigation Structure

The sidebar will be reorganized into these groups:

**Core Operations**
- Dashboard (exists, minor refresh)
- Users (exists, keep as-is)
- Prediction Markets (exists as "All Markets" + "Pending Markets", consolidate into one section with tabs)
- Disputes & Resolutions (merge existing two sections into one)
- Transactions / PSPs (expand existing with PSP management tab)

**CRM & Channels**
- CRM (rebuild with Insider-style channel management)
  - Overview tab with lifecycle metrics
  - Channels tab (Email, SMS, Push Notifications, In-App Messaging)
  - Segments tab (keep existing)
  - Campaigns tab (expanded with per-channel campaign creation)
  - Automations tab (triggered journeys like welcome series, re-engagement)

**Growth & Revenue**
- Commissions Console (new - set commission rates per creator, partner, RAF)
- Creators Platform (expand existing with reporting, link/code generator)
- Partners Platform (new - partner reporting, tracking, link and code generation)
- Bonus Management (extract from Loyalty, standalone console for all bonus types)

**Intelligence**
- Analytics & BI (exists, keep and enhance)
- UAT Console (new - device/browser compatibility tracking and test status)

## Detailed Changes Per Section

### 1. CRM (rebuild `AdminCRM.tsx`)
Tabs: Overview | Channels | Segments | Campaigns | Automations
- **Channels tab**: Cards for each channel (Email, SMS, Push, In-App) showing delivery rate, open rate, opt-in count, and a "Configure" action per channel
- **Automations tab**: Table of automated journeys (Welcome Series, Churn Prevention, Win Celebration, etc.) with trigger, channel, status, and conversion metrics

### 2. Commissions Console (new `AdminCommissions.tsx`)
Tabs: Creator Commissions | Partner Commissions | RAF (Refer-a-Friend) | Codes & Links
- **Creator Commissions**: Table of creators with individual commission % (editable), revenue share model, payout schedule
- **Partner Commissions**: Same structure for external partners
- **RAF**: Configure refer-a-friend program settings (commission %, duration, code vs link preference)
- **Codes & Links**: Generate and manage promo codes and tracking links, set expiry, usage limits, and attribution

### 3. Prediction Markets (consolidate `AdminMarkets.tsx` + `AdminPendingMarkets.tsx`)
Tabs: All Markets | Pending Approval | Categories | Settings
- **Categories**: Manage market categories (Sports, Crypto, Politics, Tech, etc.)
- **Settings**: Market creation rules, min/max bet, fee structure, resolution timeframes

### 4. Creators Platform (expand `AdminCreators.tsx`)
Tabs: Overview | Creators | Reporting | Link & Code Generator
- **Reporting**: Per-creator performance dashboard (markets created, volume generated, commission earned, follower growth)
- **Link & Code Generator**: Generate unique tracking links and promo codes per creator

### 5. Partners Platform (new `AdminPartners.tsx`)
Tabs: Overview | Partners | Reporting | Link & Code Generator
- Mirror of Creators Platform but for external partners (affiliates, influencers, media partners)
- Replaces the existing Affiliate section with a more comprehensive partner management tool

### 6. Bonus Management (new `AdminBonusManagement.tsx`)
Tabs: Active Bonuses | Create Bonus | Promotions | Loyalty Tiers
- Consolidates bonus programs, promotions, and loyalty tiers from the old `AdminLoyalty.tsx`
- **Create Bonus**: Form to set bonus type, value, conditions, eligible segments, expiry, budget cap
- **Active Bonuses**: Table with real-time usage, budget remaining, and toggle on/off

### 7. Transactions & PSPs (expand `AdminTransactions.tsx`)
Tabs: Transactions | PSP Configuration | Risk & Limits
- **PSP Configuration**: Manage payment service providers (Stripe, PayPal, Crypto wallets), set routing rules, view health status
- **Risk & Limits**: Configure deposit/withdrawal limits, fraud rules, KYC thresholds

### 8. Disputes & Resolutions (merge into `AdminDisputesResolutions.tsx`)
Tabs: Open Disputes | Resolutions | History
- Combines the two existing sections into one streamlined view

### 9. UAT Console (new `AdminUAT.tsx`)
Tabs: Test Matrix | Devices | Issues
- **Test Matrix**: Table of features vs browser/device combos with pass/fail/untested status
- **Devices**: List of target devices and browser versions
- **Issues**: Track UAT bugs with severity, assignee, and status

### 10. Analytics & BI (keep `AdminAnalytics.tsx`)
- No major changes, already comprehensive

## Updated Sidebar Items

```text
CORE OPERATIONS
  Dashboard
  Users
  Prediction Markets
  Disputes & Resolutions
  Transactions & PSPs

CRM & CHANNELS
  CRM

GROWTH & REVENUE
  Commissions
  Creators
  Partners
  Bonus Management

INTELLIGENCE
  Analytics & BI
  UAT
```

## Files to Create
- `src/components/admin/AdminCommissions.tsx`
- `src/components/admin/AdminPartners.tsx`
- `src/components/admin/AdminBonusManagement.tsx`
- `src/components/admin/AdminDisputesResolutions.tsx`
- `src/components/admin/AdminUAT.tsx`

## Files to Modify
- `src/components/admin/AdminSidebar.tsx` - New navigation groups and items
- `src/pages/Admin.tsx` - Updated section routing and titles
- `src/components/admin/AdminCRM.tsx` - Full rebuild with channels and automations
- `src/components/admin/AdminCreators.tsx` - Add reporting and link/code generator tabs
- `src/components/admin/AdminMarkets.tsx` - Merge pending markets, add categories and settings tabs
- `src/components/admin/AdminTransactions.tsx` - Add PSP and risk management tabs

## Files to Remove (replaced)
- `src/components/admin/AdminPendingMarkets.tsx` (merged into AdminMarkets)
- `src/components/admin/AdminAffiliate.tsx` (replaced by AdminPartners)
- `src/components/admin/AdminLoyalty.tsx` (replaced by AdminBonusManagement)
- `src/components/admin/AdminDisputes.tsx` (merged into AdminDisputesResolutions)
- `src/components/admin/AdminResolutions.tsx` (merged into AdminDisputesResolutions)

## Design Principles
- Each section uses tabs for sub-navigation (consistent with current pattern)
- Stats cards at the top of each section for key metrics
- Tables for list data, cards for configuration items
- Same color tokens, badge styles, and card borders (`border-border/40`) used throughout
- Mobile-responsive with stacked layouts and scrollable tables
- No unnecessary clutter - only actionable data and controls

