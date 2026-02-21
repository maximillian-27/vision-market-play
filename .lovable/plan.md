
# Pari-Mutuel Model UI Update — COMPLETED

All platform terminology and metrics have been updated from AMM (shares, order book, avg price) to dynamic pari-mutuel (tickets, pot, payout per ticket).

## Changes Applied

### Terminology (all files)
- Shares → Tickets
- Volume → Pot / Pot Size
- Traders → Players
- Quick Trade → Buy Tickets
- Place Order → Buy Tickets
- Avg. price → Ticket price
- Positions → My Tickets
- Trade History → Ticket History
- Total Trades → Total Tickets

### Calculation Logic (MarketDetail, MarketDialog, QuickTradeSheet, BuyDialog)
- `tickets = Math.floor(amount / ticketPrice)` where ticketPrice = price/100
- `estPayout = (tickets / (totalTicketsForOutcome + tickets)) * (totalPot + amount)`
- Display: Tickets, Ticket price, Pot share %, Est. payout

### Files Modified
- MarketGridCard.tsx — "Vol." → "Pot" in footer
- MarketCard.tsx — volume label → "pot"
- HottestMarkets.tsx — volume → "pot", price format updated
- MarketDetail.tsx — full pari-mutuel terminology + calculation
- MarketDialog.tsx — full pari-mutuel terminology + calculation
- QuickTradeSheet.tsx — full pari-mutuel terminology + calculation
- BuyDialog.tsx — full pari-mutuel terminology + calculation
- ResolvedMarketDialog.tsx — "Your Position" → "Your Tickets", shares → tickets
- Portfolio.tsx — tabs, labels, mock data all updated
- Profile.tsx — "Total Trades" → "Total Tickets", "Positions" → "My Tickets"
- ProfileStats.tsx — "Volume" → "Pot Generated", "Total Trades" → "Total Tickets"
- FeedFilters.tsx — "Highest Volume" → "Biggest Pot"
- AdminMarkets.tsx — "Volume" → "Pot Size", "Trades" → "Tickets"
- AdminDashboard.tsx — "Total Volume" → "Total Pot Volume"
