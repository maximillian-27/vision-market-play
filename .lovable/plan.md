

# Simplify the Entire Platform: From Trading App to Ticket Entry Game

The platform currently feels like a stock trading app with complex P&L charts, trade histories, share prices in cents, and professional trader metrics. The actual product is much simpler: **pick an outcome, buy tickets, winners split the pot.** This plan strips away all the complexity and makes every page immediately understandable.

---

## Core Problem

The terminology and UI patterns are borrowed from stock trading platforms (P&L, positions, share prices in cents, win rates, avg returns, trade history). A regular user seeing "150 shares @ $0.45, current $0.62, PnL +37.8%" has no idea what that means. What they need to see: "You have 150 tickets on YES. If YES wins, you get $150."

---

## The Simple Model (reference for all changes)

- User picks an outcome (Yes/No, or a team, etc.)
- User buys tickets at the current ticket price (probability as a dollar amount: 68% = $0.68/ticket)
- All ticket money goes into the Pot
- When resolved, winning ticket holders each get $1 per ticket
- Payout = Number of tickets x $1 (if you win)
- Profit = Payout - Amount spent

---

## File-by-File Changes

### 1. Portfolio Page (`src/pages/Portfolio.tsx`) -- Major Overhaul

This is the most complex page that needs the biggest simplification.

**Stats Overview (lines 94-115):**
- "Total Value" stays (it's clear)
- "Cash" stays
- Remove the complex P&L collapsible section entirely (lines 118-200) -- users don't need win rates, avg returns, best/worst trade stats. Replace with a simple one-liner: "Total Winnings: +$1,847"

**Quick Actions (lines 203-212):** Keep Deposit/Withdraw as-is.

**Tabs (lines 215-226):**
- "Positions" tab rename to "My Entries"
- "History" tab rename to "Past Entries"  
- "Deposits" tab stays

**Positions/My Entries data (lines 53-58):**
- Remove: `shares`, `avgPrice`, `currentPrice`, `pnl`, `pnlPercent`
- Replace with: `tickets`, `outcome` (Yes/No/team name), `ticketPrice` (what they paid per ticket), `potentialPayout` (tickets x $1 if win)
- Each entry card shows: Market name, Outcome chosen, Number of tickets, "If [outcome] wins: $X payout"

**Position cards (lines 244-308):**
- Mobile: Show market name, outcome badge, "X tickets", and "Wins $X" or "Potential: $X"
- Desktop: Same but in a row layout
- Remove the PnL percentage, arrow icons, current price vs avg price comparison
- Remove `{position.shares} shares @ ${position.avgPrice}` -- replace with `{position.tickets} tickets on {position.outcome}`

**Trade History / Past Entries (lines 311-391):**
- Remove "Buy/Sell" type column (there's no selling in this model -- you buy tickets and wait)
- Simplify to: Date, Market, Outcome, Tickets, Amount Paid, Result (Won $X / Pending / Lost)
- Remove the `shares`, `price` columns from the desktop table
- Remove "Filter" button (unnecessary complexity)

**Remove from mock data:**
- Remove `statsByTimeline` object (lines 45-51) entirely
- Simplify `positions` to use tickets/outcome/potentialPayout
- Simplify `tradeHistory` to entry-based format

### 2. Market Detail Page (`src/pages/MarketDetail.tsx`) -- Simplify Trade Panel

**Key Stats Grid (lines 402-416):**
- Remove "24h Tickets" stat -- it's meaningless to users. Replace with "Ticket Price" showing current price (e.g., "$0.68")
- Keep "Pot Size" and "Players"

**Sticky Trade Panel (lines 543-729):**
- Change "Quick Trade" header to "Buy Tickets" (lines 548-551)
- Remove `Zap` icon (trading app feel)
- Order summary (lines 707-724): Remove "Ticket Price" row showing cents -- it's redundant with the probability already shown. Simplify to just:
  - "Tickets: X"
  - "If you win: $X" (instead of "Est. Payout: +$X")
- Change the buy button text from `Buy Tickets $${amountNum}` to `Buy ${shares} Tickets for $${amountNum}` (shows what you're getting)

**Toast message (line 245):** Already says tickets -- good.

### 3. Market Dialog (`src/components/MarketDialog.tsx`) -- Same Trade Panel Fixes

**Trade panel header (lines 409-412):**
- "Quick Trade" with Zap icon becomes "Buy Tickets"

**Order summary (lines 562-581):**
- Same simplification: Remove "Ticket Price" row, change "Est. Payout" to "If you win"
- Remove cents display

**Buy button (lines 587-599):** Same text change as MarketDetail.

### 4. QuickTradeSheet (`src/components/QuickTradeSheet.tsx`) -- Label Simplification

**Header (lines ~88-94):**
- "Quick Trade" with Zap icon becomes "Buy Tickets"

**Order summary (lines ~157-169):**
- Remove "Ticket Price" (redundant -- the probability IS the price indicator)
- Change "Est. Payout" to "If you win"
- Simplify to: "X tickets | If you win: +$Y"

### 5. BuyDialog (`src/components/BuyDialog.tsx`) -- Simplify Order Summary

**Order summary (lines ~108-122):**
- Remove "Ticket Price" row (redundant)
- Rename "Max Payout" to "If you win" 
- Remove "Est. Payout" (it's confusing having both Max Payout and Est. Payout)
- Simplify to: Tickets count + "If you win: $X"

### 6. Profile Page (`src/pages/Profile.tsx`) -- Terminology Updates

**Position items (lines 362-432):**
- Change "Yes at 68c" to "Yes at 68%" (lines 369, 383, etc.)
- Change "+$124" / "+15.2%" to just "Potential: $150" (what they'd win)

**Portfolio overview card (lines 285-302):**
- Change "profit" to "winnings" (line 293)
- Change "Available to trade" to "Available balance" (line 298)

### 7. ProfileStats Component (`src/components/ProfileStats.tsx`)

**Trader stats (lines 57-81):**
- "Total P&L" becomes "Total Winnings"
- "Total Trades" becomes "Entries"
- "Accuracy" label stays (it's clear)
- Keep "Rank"

**Creator stats (lines 29-54):**
- "Volume" becomes "Total Pot Generated"
- "Avg Vol / Market" becomes "Avg Pot / Market"

### 8. Header (`src/components/Header.tsx`)

**Profile dropdown (lines 228-237):**
- "Portfolio" label in dropdown is fine
- Remove "Cash" label -- merge into one line: "Balance: $5,230" (simpler)
- Or keep both but rename "Portfolio" to "Total Value" for consistency

---

## What Gets Removed (Simplification)

1. **P&L collapsible section** on Portfolio page (win rate, avg return, best/worst trade, total trades stats) -- replaced with a simple "Total Winnings" number
2. **Buy/Sell distinction** in trade history -- there's no selling, only buying tickets
3. **"Ticket Price" in order summaries** -- redundant with the probability shown on buttons
4. **Cents notation** throughout -- probabilities shown as percentages, prices shown as dollar amounts
5. **"Quick Trade" branding** -- replaced with plain "Buy Tickets"
6. **Complex PnL percentages** on position cards -- replaced with simple "If you win: $X"
7. **StatsTimeframe selector** (1D/1W/1M/90D/1Y) on Portfolio -- unnecessary complexity

## What Stays

- Pot size highlighting (already done)
- Probability charts on market detail/dialog
- Categories and filters on feed
- Comments, likes, sharing
- Deposit/Withdraw flows
- Creator profiles and stats

---

## Technical Notes

- All changes are string replacements and removal of JSX blocks
- No new components needed
- Mock data structures need updating in Portfolio.tsx and Profile.tsx
- Approximately 8 files modified
- The Portfolio page has the most significant structural changes (removing the collapsible P&L section and simplifying position cards)

