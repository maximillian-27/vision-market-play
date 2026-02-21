

# Pari-Mutuel Model UI/UX Update

Transitioning the entire platform from AMM terminology (shares, volume, order book) to a dynamic pari-mutuel model (tickets, pot, payout). The core concept: people buy tickets, the pot accumulates, winners split the pot.

## Terminology Map

| Old (AMM) | New (Pari-Mutuel) |
|---|---|
| Shares | Tickets |
| Volume / Vol. | Pot / Pot Size |
| Traders | Players |
| Quick Trade | Buy Tickets |
| Place Order | Buy Tickets |
| Avg. price / Avg | Ticket Price |
| Potential profit / Profit | Est. Payout |
| Trade History | Ticket History |
| Total Trades | Total Tickets |
| Positions | My Tickets |
| Price (chart tooltip) | Ticket Price |
| 68c (cents format) | $0.68 (dollar format) |

## Calculation Logic Change

Current AMM logic:
- `shares = Math.floor((amount * 100) / price)`
- `potentialPayout = shares` (fixed $1/share)
- `profit = payout - amount`

New pari-mutuel logic:
- `ticketPrice = outcome.price / 100` (dynamic, e.g. 68% = $0.68)
- `tickets = Math.floor(amount / ticketPrice)`
- `totalTicketsForOutcome` = mock value (e.g. 15,000)
- `totalPot` = mock value from market data
- `potShare = (tickets / (totalTicketsForOutcome + tickets)) * 100`
- `estPayout = (tickets / (totalTicketsForOutcome + tickets)) * totalPot`
- Order summary shows: Tickets, Ticket Price, Pot Share %, Est. Payout

## Files to Modify (13 files)

### 1. `src/components/MarketGridCard.tsx`
- Line 37: `volume` prop stays in interface but display changes
- Line 291: `{volume} Vol.` becomes `{volume} Pot`
- Tooltip text updates if any

### 2. `src/components/MarketCard.tsx`
- Line 93-94: TrendingUp icon + `{volume}` label -- add "Pot" label after the value
- Line 116: `{outcome.price}c` becomes `${(outcome.price/100).toFixed(2)}` format

### 3. `src/components/HottestMarkets.tsx`
- Line 13: `volume` key in mock data -- rename display
- Line 59: `{market.volume}` display -- append "Pot" label
- Line 61: `Yes {market.yesPrice}c` becomes `Yes ${(market.yesPrice/100).toFixed(2)}`

### 4. `src/pages/MarketDetail.tsx`
- Lines 60, 63-64: Mock data keys `volume` renamed to `pot`, `traders` to `players`, `volume24h` to `tickets24h`
- Lines 202-206: Calculation logic updated to pari-mutuel
- Line 245: Toast `shares` to `tickets`
- Lines 342-356: Stats row -- "volume" to "pot", "traders" to "players"
- Lines 404-417: Key stats grid -- "Volume" to "Pot Size", "Traders" to "Players", "24h Vol" to "24h Tickets"
- Line 394: Chart tooltip "Price" to "Ticket Price"
- Line 551: "Quick Trade" to "Buy Tickets"
- Lines 701-703: Buy button text `Buy $X` to `Buy X Tickets`
- Lines 708-726: Order summary "Shares/Avg/Profit" to "Tickets/Price/Est. Payout" with pot share %

### 5. `src/components/MarketDialog.tsx`
- Lines 143-147: Calculation logic updated
- Line 167: Toast `shares` to `tickets`
- Lines 252-265: Stats "volume" to "pot", "traders" to "players"
- Line 304: Chart tooltip "Price" to "Ticket Price"
- Line 412: "Quick Trade" to "Buy Tickets"
- Lines 565-581: Order summary -- "Shares" to "Tickets", "Avg price" to "Ticket price", "Potential profit" to "Est. payout", add "Pot share" row
- Lines 593-598: Buy button text update

### 6. `src/components/QuickTradeSheet.tsx`
- Lines 39-42: Calculation logic updated to pari-mutuel
- Line 69: Toast `shares` to `tickets`
- Line 87: "Quick Trade" to "Buy Tickets"
- Lines 167-181: Order summary -- "Shares" to "Tickets", "Avg" to "Price", "Profit" to "Est. Payout"

### 7. `src/components/BuyDialog.tsx`
- Lines 43-45: Calculation logic updated
- Line 55: Toast `shares` to `tickets`
- Lines 108-125: Order summary -- "Shares" to "Tickets", "Avg. price" to "Ticket price", "Potential payout" to "Est. payout", "Potential profit" to "Est. profit"
- Line 136, 150: Button text and dialog title "Place Order" to "Buy Tickets"
- Line 145: `DrawerTitle` "Place Order" to "Buy Tickets"

### 8. `src/components/ResolvedMarketDialog.tsx`
- Lines 228-241: Stats -- "volume" to "pot", "traders" to "players"
- Lines 438-458: "Your Position" to "Your Tickets", "Shares: 150 Yes" to "Tickets: 150 Yes"
- Mock `userPosition` -- `shares` key renamed to `tickets`

### 9. `src/pages/Portfolio.tsx`
- Lines 53-58: Position mock data -- `shares` key to `tickets`
- Lines 60-66: Trade history mock data -- `shares` key to `tickets`
- Line 180: "Total Trades" to "Total Tickets"
- Line 217: "Positions" tab label to "My Tickets"
- Line 266: `{position.shares} @ ${position.avgPrice}` to `{position.tickets} @ ${position.avgPrice}`
- Line 287: `{position.shares} shares @ ${position.avgPrice}` to `{position.tickets} tickets`
- Line 314: "Trade History" to "Ticket History"
- Line 341-342: Trade card labels
- Line 359: "Shares" table header to "Tickets"

### 10. `src/pages/Feed.tsx`
- Line 29: `volume` prop stays in interface, display label changes
- Sort option "volume" label (if present via FeedFilters)

### 11. `src/components/FeedFilters.tsx`
- Line 85: `SelectItem value="volume"` label "Highest Volume" to "Biggest Pot"

### 12. `src/pages/Profile.tsx`
- Line 22, 29: `volume` in creator data display -- label to "Pot Generated"
- Any "Total Trades" references to "Total Tickets"

### 13. Admin components (light touch)
- `src/components/admin/AdminMarkets.tsx`:
  - Line 19-27: Mock data `trades` to `tickets`
  - Lines 94-95: "Volume" header to "Pot Size", "Trades" to "Tickets"
  - Line 108-109: Display values
  - Line 190: Category volume label to "Pot Size"
- `src/components/admin/AdminDashboard.tsx`:
  - Line 35-36: `totalVolume` to `totalPot`, `volumeGrowth` to `potGrowth`
  - Line 111: "Total Volume" to "Total Pot Size"

## What Stays the Same
- Overall layout, card designs, color scheme, navigation
- Yes/No button styling and interaction patterns
- Status badges (open, closing, awaiting resolution, resolved)
- Chart visuals (just tooltip label changes)
- Component structure and routing
- All responsive/mobile patterns

