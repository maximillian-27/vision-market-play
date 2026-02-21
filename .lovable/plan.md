
# Pari-Mutuel Model UI Update

Updating all platform terminology and metrics from AMM (shares, order book, avg price) to dynamic pari-mutuel (tickets, pot, payout per ticket).

## Terminology Changes

| Old (AMM) | New (Pari-Mutuel) |
|---|---|
| Shares | Tickets |
| Volume | Pot Size |
| Traders | Players |
| Quick Trade | Buy Tickets |
| Place Order | Buy Tickets |
| Avg. price | Ticket price |
| Buy [outcome] | Buy [outcome] tickets |
| X shares @ $Y | X tickets |
| Trade History | Ticket History |
| Total Trades | Total Tickets |
| Positions | My Tickets |

## Key Concept Changes

- **Pot size** replaces volume as the primary market metric (the total pool people are competing for)
- **Ticket price** is dynamic based on demand (replaces share price / cents)
- **Payout** = your share of the pot if your outcome wins, not a fixed $1/share
- Order summary shows "Tickets", "Ticket price", "Pot share" (your % of the pot), and "Est. payout" instead of shares/avg price/profit

## Files to Modify

### 1. `src/components/MarketGridCard.tsx`
- Footer: "Vol." becomes "Pot" (e.g., "$2.4M Pot" instead of "$2.4M Vol.")
- Tooltip and labels throughout

### 2. `src/components/MarketCard.tsx`
- Stats row: Volume icon/label becomes Pot icon/label

### 3. `src/components/HottestMarkets.tsx`
- Change "volume" display to "pot" in trending sidebar
- Change "Yes 68c" to "Yes $X" ticket price format

### 4. `src/pages/MarketDetail.tsx`
- Stats row: "volume" to "pot", "traders" to "players", "24h Vol" to "24h Tickets"
- Chart tooltip: "Price" to "Ticket Price"
- Quick Trade header: "Quick Trade" to "Buy Tickets"
- Order summary: "Shares" to "Tickets", "Avg" to "Price", "Profit" to "Est. Payout"
- Buy button: "Buy $X" to "Buy X Tickets"
- Toast: "bought X shares" to "bought X tickets"
- Mock data: rename `traders` to `players`, `volume` to `pot`, `volume24h` to `tickets24h`

### 5. `src/components/MarketDialog.tsx`
- Left panel stats: "volume" to "pot", "traders" to "players"
- Right panel: "Quick Trade" to "Buy Tickets"
- Order summary: "Shares" to "Tickets", "Avg price" to "Ticket price", "Potential profit" to "Est. payout"
- Buy button text update
- Toast messages update

### 6. `src/components/QuickTradeSheet.tsx`
- Header: "Quick Trade" to "Buy Tickets"
- Order summary: "Shares" to "Tickets", "Avg" to "Price", "Profit" to "Est. Payout"
- Toast: shares to tickets

### 7. `src/components/BuyDialog.tsx`
- Title: "Place Order" to "Buy Tickets"
- Summary: "Shares" to "Tickets", "Avg. price" to "Ticket price"
- "Potential payout" to "Est. payout", "Potential profit" to "Est. profit"
- Button and toast text updates

### 8. `src/components/ResolvedMarketDialog.tsx`
- Stats: "volume" to "pot", "traders" to "players"
- "Your Position" becomes "Your Tickets"
- "Shares: 150 Yes" becomes "Tickets: 150 Yes"

### 9. `src/pages/Portfolio.tsx`
- Tab: "Positions" to "My Tickets"
- "Active (4)" header update
- Position cards: "shares" to "tickets", "shares @ $X" to "tickets @ $X"
- Trade history: "shares" column to "tickets", trade type labels
- Stats: "Total Trades" to "Total Tickets"
- Mock data labels update

### 10. `src/pages/Feed.tsx`
- Mock data: `volume` key stays but display label becomes "Pot"
- Sort option "volume" label could become "Pot Size"

### 11. `src/components/FeedFilters.tsx`
- If "Volume" sort option exists, rename to "Pot Size"

### 12. `src/pages/Profile.tsx`
- Creator stats: "volume" display to "pot"
- "Total Trades" to "Total Tickets"
- Portfolio value labels

### 13. Admin components (light touch)
- `AdminMarkets.tsx`: "Volume" column header to "Pot Size", "Trades" to "Tickets"
- `AdminDashboard.tsx`: If volume/trades metrics exist, update labels

## Calculation Logic Changes

The pari-mutuel math is slightly different. Currently:
- `shares = (amount * 100) / price` (AMM: fixed $1 payout per share)

New model:
- `tickets = Math.floor(amount / ticketPrice)` where ticketPrice is dynamic
- `estPayout = (tickets / totalTicketsForOutcome) * totalPot`
- Display "Est. payout" and "Pot share" percentage

This will be updated in MarketDetail, MarketDialog, QuickTradeSheet, and BuyDialog.

## What Stays the Same
- Overall layout and visual design (no structural changes)
- Yes/No buttons, color scheme, card layouts
- Navigation, routing, and component structure
- All status badges (open, closing, awaiting resolution, resolved)
