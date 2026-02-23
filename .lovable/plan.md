

# Portfolio Page Redesign for Ticket-Based Gambling Model

## Problem
The current portfolio uses trading jargon (P&L, shares, positions, trades, win rate, avg return) that doesn't match the pari-mutuel gambling model. It needs to feel like a fun, engaging dashboard where users see their balance, active entries, winnings, and ticket activity.

## New Structure

### 1. Top Section: Balance Overview (2 cards)
- **Balance** (replaces "Total Value"): Total funds available to play with, with Deposit/Withdraw buttons inline
- **Total Winnings** (replaces "Cash"): Lifetime winnings amount with a fun upward trend indicator

### 2. Quick Stats Strip (horizontal row of 4 small metrics)
- **Active Entries** - number of markets currently entered
- **Markets Won** - total wins count
- **Win Rate** - percentage
- **Biggest Win** - single largest payout
- No collapsible complexity, just a clean single row

### 3. Tabs: My Entries | Past Entries | Wallet

**My Entries** (replaces "Positions")
- Each row shows: Market name, outcome picked (Yes/No badge), tickets bought, potential payout ("If you win: $X"), and time remaining
- No P&L percentages or current price -- just what they picked, what they spent, and what they could win
- Clean card rows with market thumbnail

**Past Entries** (replaces "History")  
- Each row: Market name, outcome picked, result (Won/Lost badge in green/red), amount spent, amount won (or $0)
- Simple and clear -- did you win or lose, and how much

**Wallet** (replaces "Deposits")
- Deposit/Withdrawal history unchanged in structure, just cleaner labels

### 4. Data Model Changes
- `positions` becomes `entries` with fields: market, outcome, tickets, ticketPrice, potentialPayout, endsIn
- `tradeHistory` becomes `pastEntries` with fields: market, outcome, result (won/lost), spent, payout
- Remove all P&L calculations, share counts, avg/current price logic
- Remove the performance collapsible section entirely

---

## Technical Details

### File: `src/pages/Portfolio.tsx` (full rewrite)

**Mock data replacements:**
- `portfolioStats` -> `{ balance: 5230, totalWinnings: 3847 }`
- `positions` -> `entries` array with `{ market, outcome, tickets, ticketPrice, potentialPayout, endsIn, image }`
- `tradeHistory` -> `pastEntries` array with `{ market, outcome, result: "won"|"lost", spent, payout, date }`
- `transactions` stays similar
- Remove `statsByTimeline`, `StatsTimeframe`, collapsible state, timeframe selectors

**Removed components/imports:**
- `Collapsible`, `CollapsibleContent`, `CollapsibleTrigger`
- `PieChart`, `BarChart3`, `TrendingUp`, `TrendingDown`, `Filter`
- P&L timeframe buttons and performance card

**New layout:**
- Balance card with inline Deposit/Withdraw CTAs
- Total Winnings card with trophy icon
- Horizontal stats strip (4 items in a grid)
- 3-tab interface: My Entries, Past Entries, Wallet
- Entry cards show ticket count, potential payout, and countdown
- Past entry cards show Won/Lost result with green/red badge and actual payout

**New imports needed:**
- `Trophy`, `Ticket`, `Target`, `Timer` from lucide-react

