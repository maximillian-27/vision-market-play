
# Admin Panel - Full Business Model Restructure

Reorganizing the entire admin panel to match your crypto prediction market business model: 3% trading fee, creators earn 20% of market fees, affiliates earn 20% of referred fees, crypto-only payments.

## New Sidebar Structure

Current (12 items, 4 groups):
```text
Core: Dashboard, Users, Markets, Disputes, Transactions
CRM: CRM
Growth: Commissions, Creators, Partners, Bonuses
Intelligence: Analytics, UAT
```

New (8 items, 3 groups):
```text
Operations:  Dashboard, Markets, Transactions
People:      CRM, Loyalty & Bonuses
Intelligence: Analytics & BI, Security, Support
```

Sections removed from sidebar: Users, Disputes, Commissions, Creators, Partners, UAT (moved into other sections).

---

## 1. Dashboard (AdminDashboard.tsx) - Tailor to crypto model

**Platform Health**: Remove "Stripe" (not crypto). Replace with: API, Blockchain RPC, Wallet Service, Database.

**Revenue cards**: Keep GGR/NGR. Add a small "3% Fee Rate" indicator. Change "Total Pot Size" to show as main hero metric. Replace "Signup -> Deposit" conversion with "Daily Fee Revenue" (3% of daily volume).

**Alert cards**: Keep Pending Markets, Open Disputes, Pending Resolutions, KYC Reviews -- these are the right quick-action items.

**Activity log**: Add more crypto-relevant entries (wallet connections, large crypto deposits, market creations by creators).

**Changes**: ~30 lines of label/data updates. No structural change.

---

## 2. Markets (AdminMarkets.tsx) - Absorb Disputes & Resolutions

This is the biggest restructure. Markets currently has 4 tabs (All, Pending, Categories, Settings). Disputes has 3 tabs (Disputes, Resolutions, History). Merge them into one unified Markets section.

**Search bar**: Always visible at top above tabs.

**New tabs**: Active | Pending | Disputed | Resolution | History | Categories | Settings

**Analytics row** (above tabs): 4 KPI cards
- Total Active Markets
- Total Pot Size (all markets)
- 24h Trading Volume
- 24h Fee Revenue (volume x 3%)

**Market table columns** (Active tab): Title, Creator, Status, Trades, Pot Size, Fee Revenue (pot x 3%), Date Created, End Date, Actions

**Actions per market**: View, Pause, Resolve, Cancel

**Disputed tab**: Pull in the disputes table from AdminDisputesResolutions (market, user, reason, priority, amount, actions)

**Resolution tab**: Pull in the resolutions table (market, outcome, status, pot size, deadline, confirm/reject actions)

**History tab**: Pull in resolved disputes + completed resolutions

**Categories and Settings**: Keep as-is from current AdminMarkets.

**Fee setting**: Change "Platform Fee (%)" default from 2 to 3 to match business model.

**Technical**: Rewrite AdminMarkets.tsx to include dispute/resolution data and tabs. AdminDisputesResolutions.tsx becomes unused (remove from imports in Admin.tsx).

---

## 3. Transactions (AdminTransactions.tsx) - Crypto only

**Remove PSP Config tab** -- crypto doesn't need Stripe/PayPal/Coinbase Commerce cards. Replace with a simpler "Wallets" tab showing connected wallet addresses and balances.

**Analytics**: Add time period selector (24h / 30d / 90d / All Time) that updates the 4 KPI cards:
- Total Deposits (for selected period)
- Total Withdrawals (for selected period)
- Net Flow
- Pending Review

**Search + Filters**: Keep search bar, type filter. Remove date picker (use the period selector instead for simplicity).

**Transaction methods**: Update mock data to crypto only: BTC, ETH, USDT, SOL. Remove "Bank Transfer", "Credit Card", "Market Buy/Sell". Types become: Deposit, Withdrawal, Fee (platform fee collections).

**Each transaction**: ID, User, Type, Method (crypto type), Amount, Status, Date, Actions

**Risk & Limits tab**: Keep but update labels -- "Min Deposit" in crypto terms, remove credit card references.

---

## 4. CRM (AdminCRM.tsx) - Unified People Management

This is the second biggest restructure. Currently Users, Creators, Partners, Commissions, and CRM are 5 separate sidebar items. Merge into one CRM section.

**Search bar**: Always visible at top.

**Tabs**: Users | Creators & Affiliates | Payouts | Segments | Campaigns | Automations

### Users tab
**Analytics cards** (6): Total Users, Active (30d), Churned (30d), High Value (>$10K volume), Whales (>$100K volume), High Risk (flagged)

**Table columns**: Name, Contact (email), Date Joined, Status, Volume, Trades, Verified (KYC badge), Actions

**Actions**: View Profile, Suspend, View KYC, Send Email

### Creators & Affiliates tab
This merges Creators + Partners (which are really affiliates). Every creator is automatically an affiliate. Some people are affiliate-only.

**Analytics cards** (6): Total Creators, Total Affiliates, Active, Pending Applications, Total Earnings Paid, Revenue Generated

**Table columns**: Name, Contact, Type (Creator badge / Affiliate badge / both), Status, Nr. Markets (creators only), Volume Generated, Earnings (20% of fees), Followers, Last Online, Actions

**Actions**: View Profile, View Markets (creators), Suspend, Revoke Creator Status, Edit Commission

**Commission tiers section**: Below the table, show the commission structure:
- Creator Market Fee: 20% of 3% trading fee on their markets
- Affiliate Referral Fee: 20% of 3% trading fee from referred users
- Display as a simple info card, not a complex table

### Payouts tab
Unified payouts for both creators and affiliates:
- Pending payouts table with Name, Type (Creator/Affiliate), Amount, Period, Status
- Payout history
- Payout settings (frequency: weekly, min threshold)

### Segments, Campaigns, Automations tabs
Keep from current AdminCRM.tsx mostly as-is. These are CRM marketing tools that work fine.

**Technical**: Rewrite AdminCRM.tsx to absorb data from AdminUsers, AdminCreators, AdminPartners, AdminCommissions. Those 4 components become unused.

---

## 5. Loyalty & Bonuses (AdminBonusManagement.tsx) - Minor tweaks

- Keep current structure (Active Bonuses, Create, Promotions, Loyalty Tiers)
- Update "Free Bet" terminology to "Free Ticket" (matching pari-mutuel model)
- Update deposit match to mention crypto deposits specifically
- No structural changes needed

---

## 6. Analytics & BI (AdminAnalytics.tsx) - Add time periods + creator analytics

**Time period selector**: Add 1d, 7d, 30d, 90d, 1y, All Time options (currently only has 24h, 7d, 30d, 90d).

**Performance tab**: Add "Fee Revenue" KPI (3% of volume). Add "Creator Revenue" KPI (total paid to creators).

**Users & Funnel tab**: Keep as-is, already good.

**Markets tab**: Add "Top Creators by Revenue" table showing which creators generate the most fee revenue.

**Marketing tab**: Keep as-is (AdminMarketing component).

---

## 7. Security (NEW - AdminSecurity.tsx)

Brand new section with tabs:

**Wallet Monitoring tab**:
- Platform wallet balances (hot wallet, cold wallet)
- Recent large transactions (flagged automatically)
- Wallet addresses connected per user analytics

**Fraud Detection tab**:
- Suspicious activity log (multiple accounts, rapid deposits/withdrawals, unusual patterns)
- Risk scores for flagged users
- Action buttons: Investigate, Flag, Block

**Bug Reports tab**:
- Move UAT issues here
- Severity, status, assignee
- Report new bug button

**Audit Log tab**:
- Admin actions log (who did what, when)
- Market resolutions, user suspensions, payout approvals

---

## 8. Customer Support (NEW - AdminSupport.tsx)

Brand new section with tabs:

**Tickets tab**:
- Analytics cards: Open Tickets, Avg Response Time, Resolution Rate, Escalated
- Table: Ticket ID, User, Subject, Category (Account/Market/Payment/Other), Priority, Status (Open/In Progress/Escalated/Resolved), Created, Assigned To, Actions
- Actions: View, Assign, Escalate, Resolve

**Knowledge Base tab**:
- FAQ categories with article counts
- Most searched topics
- Add/edit articles (toast placeholder)

**Live Chat tab** (placeholder):
- Active sessions count
- Queue size
- Average wait time
- Status indicator

---

## Files Changed

| File | Action |
|------|--------|
| AdminSidebar.tsx | Rewrite sidebar items: 8 items in 3 groups |
| Admin.tsx | Update section mapping, imports, titles |
| AdminDashboard.tsx | Update health services, crypto terminology |
| AdminMarkets.tsx | Major rewrite: absorb disputes/resolutions, add analytics, update columns |
| AdminTransactions.tsx | Remove PSPs, crypto-only methods, add time periods |
| AdminCRM.tsx | Major rewrite: absorb Users/Creators/Partners/Commissions |
| AdminBonusManagement.tsx | Minor label updates |
| AdminAnalytics.tsx | Add time periods, creator analytics |
| AdminSecurity.tsx | NEW file |
| AdminSupport.tsx | NEW file |
| AdminDisputesResolutions.tsx | Remove (absorbed into Markets) |
| AdminUsers.tsx | Remove (absorbed into CRM) |
| AdminCreators.tsx | Remove (absorbed into CRM) |
| AdminPartners.tsx | Remove (absorbed into CRM) |
| AdminCommissions.tsx | Remove (absorbed into CRM) |
| AdminUAT.tsx | Remove (bugs moved to Security) |
| AdminMarketing.tsx | No changes (used by Analytics) |

**Total**: 10 files modified/created, 6 files removed, 1 unchanged.

---

## Business Logic Summary

All mock data reflects:
- 3% platform fee on every trade
- Creators earn 20% of fees from their markets
- Affiliates earn 20% of fees from referred trades
- Crypto-only: BTC, ETH, USDT, SOL
- Creator = always an affiliate (shown with dual badges)
- Affiliate-only = no market creation ability
- Fee revenue calculated as: Volume x 3%
- Creator earnings: Volume x 3% x 20%
