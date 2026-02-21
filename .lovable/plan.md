

# Pari-Mutuel Model UI/UX Update

Transitioning the platform from AMM terminology (shares, volume, order book) to a dynamic pari-mutuel model (tickets, pot, split the pot). The visual design stays the same -- only labels, metrics, and calculation logic change.

## What Changes

### Terminology (across all files)

| Current | New |
|---|---|
| Shares | Tickets |
| Volume / Vol. | Pot |
| Traders | Players |
| Quick Trade | Buy Tickets |
| Place Order | Buy Tickets |
| Avg. price / Share price | Ticket Price |
| Potential profit | Est. Payout |
| Positions | My Tickets |
| Trade History | Ticket History |
| 68c / 32c (cent pricing) | $0.68 / $0.32 (dollar pricing) |

### Pot as the Hero Metric

The pot size is what players are competing for -- it needs to be prominent on every card and page. Currently "volume" is a small footnote. In the new model, **pot size becomes the primary metric** users see, visually emphasized.

### Calculation Logic

Current AMM math:
- `shares = (amount * 100) / price`
- Fixed $1 payout per share

New pari-mutuel math:
- `tickets = Math.floor(amount / ticketPrice)`
- `estPayout = (tickets / totalTicketsForOutcome) * totalPot`
- Order summary shows: Tickets, Ticket Price, Pot Share %, Est. Payout

## Files to Modify

### 1. Feed Page (`src/pages/Feed.tsx`)
- Rename `volume` field to `pot` in mock data interface and values (keep same dollar amounts)
- Pass `pot` instead of `volume` to MarketGridCard
- Rename sort option "Highest Volume" to "Biggest Pot" in the sort logic

### 2. Feed Filters (`src/components/FeedFilters.tsx`)
- Sort option "Highest Volume" becomes "Biggest Pot"

### 3. Market Grid Card (`src/components/MarketGridCard.tsx`)
- Rename `volume` prop to `pot`
- Desktop footer: "$2.4M Vol." becomes "$2.4M Pot" with a trophy/target icon instead of TrendingUp
- Mobile bottom bar: Same change -- TrendingUp icon + volume becomes pot-focused display
- Binary outcome cent pricing ("68c") stays as percentage ("68%") -- already done

### 4. Market Card (`src/components/MarketCard.tsx`)
- Rename `volume` prop to `pot`
- Stats row: TrendingUp icon + volume label becomes pot display
- Outcome buttons: "68c" pricing becomes "$0.68" ticket price format

### 5. Hottest Markets Sidebar (`src/components/HottestMarkets.tsx`)
- `volume` field becomes `pot` in mock data
- Display: "$2.4M" label stays, but context changes to "pot"
- "Yes 68c" becomes "Yes $0.68" ticket price

### 6. Market Dialog (`src/components/MarketDialog.tsx`)
- Left panel stats: "volume" label becomes "pot", "traders" becomes "players"
- Chart tooltip: "Price" becomes "Ticket Price"
- Right panel header: "Quick Trade" becomes "Buy Tickets"
- Order summary: "Shares" to "Tickets", "Avg price" to "Ticket price", "Potential profit" to "Est. payout"
- Add "Pot share" percentage to order summary
- Buy button: "Buy" becomes contextual ticket purchase text
- Toast: "bought X shares" becomes "bought X tickets"
- Pari-mutuel calculation logic replaces AMM math

### 7. Quick Trade Sheet (`src/components/QuickTradeSheet.tsx`)
- Header: "Quick Trade" becomes "Buy Tickets"
- Order summary row: "Shares" to "Tickets", "Avg" to "Price", "Profit" to "Est. Payout"
- Add pot share % display
- Toast: shares to tickets
- Update calculation logic

### 8. Buy Dialog (`src/components/BuyDialog.tsx`)
- Title: "Place Order" becomes "Buy Tickets"
- "Buying" section: show ticket price instead of cent price
- Summary: "Shares" to "Tickets", "Avg. price" to "Ticket price"
- "Potential payout" to "Est. payout", "Potential profit" to "Est. profit"
- Button: "Buy Yes for $10.00" becomes "Buy 10 Yes Tickets"
- Update calculation logic

### 9. Market Detail Page (`src/pages/MarketDetail.tsx`)
- Stats row: "volume" to "pot", "traders" to "players", "24h Vol" to "24h Tickets"
- Chart tooltip: "Price" to "Ticket Price"
- Trade panel header: "Quick Trade" to "Buy Tickets"
- Order summary: same terminology changes as MarketDialog
- Toast and button text updates
- Mock data: rename `traders` to `players`, `volume` to `pot`, `volume24h` to `tickets24h`
- Update pari-mutuel calculation logic

### 10. Resolved Market Dialog (`src/components/ResolvedMarketDialog.tsx`)
- Stats: "volume" to "pot", "traders" to "players"
- "Your Position" becomes "Your Tickets"
- "Shares: 150 Yes" becomes "Tickets: 150 Yes"

### 11. Portfolio Page (`src/pages/Portfolio.tsx`)
- Tab: "Positions" to "My Tickets"
- Position cards: "shares" to "tickets", "avgPrice" label to "ticket price"
- Trade history: "shares" column to "tickets"
- Stats labels update

### 12. Profile Page (`src/pages/Profile.tsx`)
- Creator stats: "volume" display to "pot"
- "Total Trades" to "Total Tickets"

### 13. Admin (light touch)
- `AdminMarkets.tsx`: "Volume" column header to "Pot Size", "Trades" to "Tickets"
- `AdminDashboard.tsx`: Update volume/trade labels if present

## What Stays the Same
- All layouts, card designs, color schemes, component structure
- Yes/No buttons, probability bars, outcome presentation
- Navigation, routing, status badges (open, closing, awaiting resolution, resolved)
- Icons and visual hierarchy (only swapping TrendingUp for a pot-relevant icon where it represents volume)

