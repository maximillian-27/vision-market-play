

# Profile Pages -- Gambling Model Overhaul

## Problems Found

### Profile.tsx (Player + Creator hybrid page)
1. **Trading jargon everywhere**: "Portfolio Value", "Cash Balance", "Available to trade", "Total P&L", "Accuracy", "Total Trades", "Positions" tab, prices shown as "68c" (cents)
2. **Own-profile financial section** shows "Portfolio Value" and "Cash Balance" -- should be Balance and Total Winnings
3. **Positions tab** shows entries with "+$124 / +15.2%" percentage gains -- in pari-mutuel there are no percentage gains, just "If you win: $X" payouts
4. **Achievements** still reference "First Trade", "Sharp Shooter" with accuracy -- should use ticket/gambling language
5. **Mock activity posts** say "great returns" and "prediction markets" -- minor but should reflect the model

### CreatorProfile.tsx (Dedicated creator page)
1. **Stats use "Volume"** -- should be "Pot Generated" (pari-mutuel term)
2. **Market cards show `volume`** -- should say "Pot"
3. **`yesPrice`/`noPrice`** labels imply trading prices -- these are odds percentages
4. **Achievements** reference "Held positions through 5 major swings" (Diamond Hands) -- not relevant to pari-mutuel
5. **"Avg Vol / Market"** -- should be "Avg Pot / Market"

### ProfileStats.tsx (Shared component)
1. **Trader stats**: "Total P&L", "Accuracy", "Total Trades" -- should be "Total Winnings", "Win Rate", "Markets Entered"
2. **Creator stats**: "Volume", "Avg Vol / Market" -- should be "Pot Generated", "Avg Pot / Market"

---

## Plan

### 1. ProfileStats.tsx -- Rename labels to gambling model

**Trader stats (4 cards):**
- "Total P&L" becomes **"Total Winnings"** (with TrendingUp icon)
- "Accuracy" becomes **"Win Rate"** (with Target icon)  
- "Total Trades" becomes **"Markets Entered"** (with Ticket icon)
- "Rank" stays

**Creator stats (4 cards):**
- "Volume" becomes **"Pot Generated"** (with DollarSign icon)
- "Rank" stays
- "Markets Created" stays
- "Avg Vol / Market" becomes **"Avg Pot / Market"**

**Interface rename:**
- `totalProfit` stays (used as winnings value)
- `winRate` stays (was `accuracy` conceptually but field already exists)
- `totalTrades` stays as field name but label changes
- `totalVolume` stays as field name but label changes
- `avgVolume` stays as field name but label changes

### 2. Profile.tsx -- Full terminology migration

**Own-profile financial card:**
- "Portfolio Value" becomes **"Balance"** (total balance including active entries)
- "Cash Balance" becomes **"Total Winnings"** with period context
- "+$12,450 profit" becomes "+$12,450 total winnings"
- "Available to trade" becomes "Available to play"
- Remove percentage-based P&L from mock data

**Trader stats passed to ProfileStats:**
- `totalProfit` value stays "+$12,450" but label rendered as "Total Winnings"
- `accuracy` renamed conceptually to win rate -- pass `winRate` instead of `accuracy`
- `totalTrades` value 142 -- label becomes "Markets Entered"

**Positions tab becomes "Entries" tab:**
- Tab label: "Entries" (not "Positions")
- Entry rows show: market title, outcome picked (YES/NO badge), tickets held, "If you win: $X"
- Remove percentage gains -- replace with payout projection
- "Yes at 68c" becomes "YES -- 25 tickets" with "If you win: $312"

**Achievements updated:**
- "First Trade" becomes **"First Entry"** / "Placed your first ticket"
- "Sharp Shooter" becomes **"Hot Streak"** / "5+ wins in a row"  
- "Big Winner" stays / "$1,000+ in winnings"

**Activity posts:**
- "great returns" becomes "great picks"
- "prediction markets" becomes "prediction games"

**Creator "About" tab:**
- "Volume" becomes "Pot Generated"
- "Success" label stays (success rate)

### 3. CreatorProfile.tsx -- Pot-based terminology

**Creator data mock:**
- `volume` field label in UI becomes "Pot Generated"
- `avgVolume` label becomes "Avg Pot"

**Market cards mock data:**
- `volume: "$1.2M"` field renamed to `pot` in display (or just change the label in MarketGridCard -- but since MarketGridCard is shared, we update the mock field name and pass it through)
- Keep `yesPrice`/`noPrice` as odds percentages (this is correct -- they represent probability)

**Achievements updated:**
- "Diamond Hands" / "Held positions through 5 major swings" becomes **"Loyal Creator"** / "Markets active for 6+ months"
- Other achievements are fine (Top Creator, Market Maker, etc.)

---

## Technical Details

### File: `src/components/ProfileStats.tsx`
- Change trader labels: "Total P&L" to "Total Winnings", "Accuracy" to "Win Rate", "Total Trades" to "Markets Entered"
- Change creator labels: "Volume" to "Pot Generated", "Avg Vol / Market" to "Avg Pot / Market"
- Import `Ticket` icon from lucide-react for "Markets Entered"

### File: `src/pages/Profile.tsx`
- **Financial card**: Rename "Portfolio Value" to "Balance", "Cash Balance" to "Total Winnings", update subtexts
- **Stats**: Pass `winRate` instead of `accuracy` (field already exists in ProfileStats interface)
- **Tabs**: Rename "Positions" to "Entries", update tab content to show ticket count + payout instead of price/percentage
- **Entry rows**: Replace "Yes at 68c" format with "YES -- 25 tickets" and replace "+$124 / +15.2%" with "If you win: $312"
- **Achievements**: Update text to gambling model
- **About tab**: "Volume" to "Pot Generated"
- **Activity posts**: Minor wording tweaks

### File: `src/pages/CreatorProfile.tsx`
- Update mock data labels: `volume` displayed as "Pot" in market cards
- Update achievements: replace trading-specific ones with creator-relevant ones
- Stats passed to ProfileStats already use correct field names, just labels change via ProfileStats update

### No new files or dependencies needed.

