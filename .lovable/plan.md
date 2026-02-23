

# Markets Page & Market Detail - Casino-Inspired Pari-Mutuel Redesign

Tailoring both pages to the dynamic pari-mutuel ticket model with casino-grade UX. Replacing all trading jargon with the correct terminology (Pot, Tickets, Players, Winnings). Making pot size the hero element. Adding visual excitement while keeping things clean and minimalist.

---

## Terminology Changes (Global across both pages)

All instances updated:
- "Volume" becomes **"Pot"** (with a pot/trophy-free, high-contrast pill style)
- "Shares" becomes **"Tickets"**
- "Traders" becomes **"Players"**
- "P&L" / "Profit" becomes **"Winnings"**
- "Positions" / "Trades" becomes **"Entries"**
- "Buy" becomes **"Enter"** or **"Place Entry"**
- "Quick Trade" becomes **"Place Entry"**
- Price display: show as **percentage** (e.g., "68%") not cents

---

## 1. Markets Feed Page (Feed.tsx + MarketGridCard.tsx)

### A. Feed Layout Improvements

**Hero Banner Section** (new, above filters):
- Rotating featured market card at top -- larger format, showing the market with the biggest pot
- Shows: market image (large), title, pot size prominently, countdown timer, and a "Enter Now" CTA
- Auto-cycles through top 3 markets by pot size
- Clean, minimal design -- just an image with overlay text, no clutter

**Category Filters Enhancement** (FeedFilters.tsx):
- Replace "Following" with "My Markets" (markets user has entries in)
- Add "Closing Soon" as a category pill (urgent timer feel)
- Add "Biggest Pots" as a sort option
- Remove "Region" filter (not relevant for this product)
- Keep filter panel but simplify: Sort By, Status, Timeframe only (3 filters instead of 4)

### B. Market Card Redesign (MarketGridCard.tsx)

**Pot Size as Hero Element:**
- Move pot size to a prominent position -- displayed as a bold pill/badge at the top-right of each card
- Format: green pill with "$2.4M Pot" in bold
- This is the first thing users should notice

**Card Structure (Desktop):**
1. Header row: Small image + Title + Pot Size pill (top-right)
2. Outcome buttons (unchanged layout, but show % not cents)
3. Footer: Players count + End date + Share/Bookmark icons

**Card Structure (Mobile):**
1. Thumbnail left + Title + Pot pill (bold, below title)
2. Probability bar + outcome buttons
3. Footer: Players count + End date

**"If You Win" Teaser:**
- Below outcome buttons, add a subtle line: "Win up to $X" calculated from pot / outcome tickets
- This creates excitement and conversion motivation

**Closing Soon Treatment:**
- Cards with < 24h left get a subtle pulsing border or amber glow
- Countdown shown as "2h 15m left" in amber text

**Remove from cards:**
- All trading jargon (shares, volume, cents)
- Engagement row (likes, comments, repost) -- keep only on detail page

### C. Feed Sorting Improvements
- Default sort: "Trending" (mix of pot size + recent activity)
- Add "Biggest Pots" sort (descending pot size)
- Add "Closing Soon" sort (ascending time remaining)
- Add "Newest" sort (most recently created)

---

## 2. Market Detail Page (MarketDetail.tsx)

### A. Page Header Redesign

**Hero Section:**
- Market image as a wide banner (16:9 aspect ratio, max height ~200px) with gradient overlay
- Title overlaid on bottom of image (white text on gradient) -- or below image cleanly
- Creator row below with avatar, name, verified badge
- Status badge (Live / Closing Soon / Awaiting Resolution)

**Pot Size Highlight:**
- Large, prominent pot display directly below title
- Format: "$2.4M" in large bold text with "Total Pot" label
- Styled with primary color background pill or high-contrast treatment
- This is THE number users care about

### B. Key Stats Row
Replace current stats grid with a single clean row:
- **Pot Size** (hero, primary color, bold) 
- **Players** (count)
- **24h Activity** (new entries in last 24h)  
- **Ends** (date/countdown)

Remove the duplicate stats grid below the chart (currently showing Volume, Traders, 24h Vol redundantly).

### C. Chart Section
- Keep the probability chart as-is (it works well)
- Change Y-axis label from "Price" to "Probability"
- Tooltip: show "68% chance" instead of "68%" / "Price"

### D. Outcome Selection & Entry Panel (Bottom Sticky)

**Rename "Quick Trade" to "Place Entry"**

**Binary Markets:**
- Keep probability bar (clean, works well)
- Keep Yes/No buttons
- Change "Buy" button text to "Enter" or "Place Entry"

**Multi-Outcome Markets:**
- Horizontal scrollable outcome chips (keep current design)
- Each chip shows: logo/initial + name + probability %

**Entry Input:**
- Dollar amount input (keep current)
- Quick amount buttons: $5, $10, $25, $50, $100
- Add $100 to quick amounts (casino users bet bigger)

**"If You Win" Display (replaces current order summary):**
- Replace shares/avg/profit with:
  - **"Your Entry"**: $10
  - **"If you win"**: $14.70 (absolute dollar payout)
  - **"Potential Winnings"**: +$4.70
- Formula: Payout = (Your Entry / Total Outcome Entries) x Total Pot
- Show this in a highlighted card with green accent for winnings
- Remove "shares" and "avg price" -- users don't need to know ticket mechanics

### E. Description & Resolution
- Keep collapsible resolution criteria (works well)
- Keep description section
- Add "Created by" link to creator profile in description area

### F. Comments Section
- Keep current collapsible comments (works well)
- No changes needed

### G. Social/Engagement Row
- Keep like, comment, share buttons
- Add bookmark button
- Remove repost button (less relevant for casino feel)

---

## 3. Market Dialog (MarketDialog.tsx - Desktop Quick View)

### Same Terminology Updates:
- "Quick Trade" becomes "Place Entry"
- Shares/Avg/Profit becomes Entry/If You Win/Winnings
- Add "If you win: $X" prominent display
- Pot size shown prominently in stats row
- Add $100 quick amount button

---

## 4. Quick Trade Sheet (QuickTradeSheet.tsx - Mobile)

### Same Updates:
- Rename to "Place Entry"
- Same "If you win" display
- Same pot size prominence
- Same terminology

---

## 5. Hottest Markets Sidebar (HottestMarkets.tsx)

- Rename "Trending Now" to "Biggest Pots"
- Sort by pot size descending
- Show pot size prominently (bold, primary color)
- Remove "Yes 68c" -- show "68%" instead
- Add player count

---

## Files Modified

| File | Changes |
|------|---------|
| Feed.tsx | Add hero featured market banner, terminology updates, remove "Region" filter usage |
| FeedFilters.tsx | Remove Region filter, add "Closing Soon" + "My Markets" categories, add "Biggest Pots" sort |
| MarketGridCard.tsx | Pot size as hero pill, "Win up to $X" teaser, terminology updates, remove engagement row, closing soon pulse, % not cents |
| MarketDetail.tsx | Hero image banner, pot size highlight, "If you win" display, terminology updates, add $100 quick amount, remove redundant stats |
| MarketDialog.tsx | Same terminology and "If you win" updates as MarketDetail |
| QuickTradeSheet.tsx | Same terminology and "If you win" updates |
| HottestMarkets.tsx | "Biggest Pots" rename, pot size prominence, % display |
| BuyDialog.tsx | Terminology updates (tickets, entry, winnings), "If you win" display |

**Total: 8 files modified, 0 new files**

---

## Technical Notes

**Pari-Mutuel Payout Calculation:**
```
Payout = (userEntry / totalOutcomeEntries) * totalPot
Winnings = Payout - userEntry
```

Display as: "If you win: $14.70" (absolute, never show ticket count to end users)

**Pot Size Formatting:**
- Under $1K: "$500"
- $1K-$999K: "$2.4K" 
- $1M+: "$2.4M"
- Always use primary color, font-extrabold, pill background

**Closing Soon Logic:**
- Less than 24h: amber pulsing indicator
- Less than 1h: red urgent indicator  
- Show countdown format: "2h 15m" or "45m"

