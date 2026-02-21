

# Markets Page - Pari-Mutuel Gambling Overhaul

Updating all market-facing components to use correct gambling terminology, highlight the Pot as the hero metric, and simplify the UX for a prediction market gambling experience.

## Problem Summary

Every market component still uses stock-trading language: "Volume", "Shares", "Traders", "Avg price", "Profit". The Pot (the prize pool users are competing for) is buried as a small stat instead of being the hero element. Pricing shows "cents" (68c) instead of contextualizing ticket prices within the pari-mutuel model.

## Terminology Map (applied everywhere)

| Old Term | New Term |
|----------|----------|
| Volume / Vol. | Pot / Pot Size |
| Shares | Tickets |
| Traders | Players |
| Avg price / Share Price | Ticket Price |
| Profit / Potential Profit | Est. Payout |
| "Buy" button text | "Buy Tickets" |

## Changes by File

### 1. MarketGridCard.tsx -- Highlight Pot as hero metric

- **Footer stats**: Change `{volume} Vol.` to a highlighted pot display: bold green text showing the pot size (e.g., "$2.4M Pot") so users immediately see the prize
- Desktop layout: add pot size next to the title percentage so the prize is always visible
- No structural changes, just label swaps and styling the pot prominently

### 2. MarketCard.tsx -- Pot + Players labels

- Stats row (line 92-99): Change `TrendingUp` icon + `{volume}` to a highlighted "Pot" label with the amount styled in primary/green
- Change `Clock` label from just `{endsIn}` -- keep as-is (time is fine)
- Outcome buttons: Change `{outcome.price}c` to `{outcome.price}%` for binary cards (percentages, not cents -- the price IS the percentage in pari-mutuel)

### 3. MarketDetail.tsx -- Full terminology overhaul

**Stats row (lines 342-356)**:
- "volume" label becomes "Pot Size" with highlighted styling
- "traders" becomes "Players"
- Keep Clock/endDate as-is

**Key Stats Grid (lines 404-417)**:
- "Volume" becomes "Pot Size"
- "Traders" becomes "Players"
- "24h Vol" becomes "24h Tickets"

**Chart tooltip (line 394)**: Change `"Price"` formatter to `"Probability"`

**Quick Trade panel (lines 544-730)**:
- "Quick Trade" header stays (it's clear)
- "Shares" becomes "Tickets"
- "Avg" becomes "Ticket Price"
- "Profit" becomes "Est. Payout"
- Toast message (line 245): "shares" to "tickets"

### 4. MarketDialog.tsx -- Same terminology fixes

**Stats section (lines 251-265)**:
- "volume" becomes "Pot Size"
- "traders" becomes "Players"

**Chart tooltip**: "Price" becomes "Probability"

**Trade panel (lines 406+)**:
- "Shares" becomes "Tickets"
- "Avg" becomes "Ticket Price"
- "Profit" becomes "Est. Payout"
- Toast message: "shares" to "tickets"

### 5. QuickTradeSheet.tsx -- Label swaps

- "Shares" becomes "Tickets"
- "Avg" becomes "Ticket Price"
- "Profit" becomes "Est. Payout"
- `{outcome.price}%` display -- already correct, keep
- Toast message: "shares" to "tickets"

### 6. BuyDialog.tsx -- Label swaps

- "Shares" becomes "Tickets"
- "Avg. price" becomes "Ticket Price"
- "Potential payout" becomes "Max Payout"
- "Potential profit" becomes "Est. Payout"
- Toast message: "shares" to "tickets"

### 7. HottestMarkets.tsx -- Pot highlight

- Change `{market.volume}` label to show as "Pot" with emphasized styling
- Change `Yes {market.yesPrice}c` to `{market.yesPrice}%` (probability, not cents)

### 8. Feed.tsx -- Sort label

- The sort option "volume" in FeedFilters should display as "Pot Size" (need to check FeedFilters component -- the sort value key stays "volume" internally but the display label changes)

## Pot Highlighting Strategy

Across all cards, the Pot size gets special treatment:
- Styled with `text-primary font-bold` (green, bold)
- Prefixed with a small trophy or dollar icon
- Positioned prominently (not buried in small muted text)

This makes the prize pool the first thing users notice, reinforcing the gambling feel.

## What Stays the Same

- All layout structures, card designs, responsive patterns
- All mock data values (just label changes)
- Chart components and their data
- All button behaviors and navigation
- Status badges and lifecycle states

## Technical Details

All changes are simple string replacements and minor className adjustments. No new components, no structural refactoring. Approximately 40-50 label changes across 8 files, plus adding `font-bold text-primary` styling to pot displays.

