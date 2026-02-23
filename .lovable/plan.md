

## Improve Market Dialog -- Ticket Pricing, Clarity, and Engagement

### What changes

**1. Add Ticket Cost Display + Dynamic Pricing Note**
- Show the ticket price prominently next to each outcome button (e.g., "YES $0.68" instead of just "YES")
- Add a small info line below outcomes: "Ticket prices increase as the event approaches"
- This educates users about the dynamic pricing model

**2. Clean Up the Right Column**
- Move the probability bar INTO the outcome buttons themselves (show percentage inside the button)
- Show ticket price directly on each outcome button: "Yes 68% -- $0.68"
- Remove the separate "Ticket: $0.XX" line that only appears after selection (redundant)
- Add the "ends in" countdown to the right column header so users know urgency

**3. Improve the "If You Win" Section**
- Show Payout and Winnings immediately with default values (using first outcome as default selection hint) instead of showing dashes
- Make the winnings number larger and green to feel more rewarding
- Add a subtle highlight/glow effect to the winnings amount

**4. Left Column Refinements**
- Add the market image as a small thumbnail next to the title for visual recognition
- Add player count and "ends in" as subtle metadata below the pot badge
- Make the chart slightly taller for better readability
- Add a current price indicator on the chart (dot at the latest point)

**5. Buy Button Enhancement**
- Make the button more engaging with a gradient and slight animation on hover
- Show the potential winnings on the button itself: "Enter Yes $10 -- Win $14.70"

**6. Pot Split -- Move Below Buy Button (already there, just clean up)**
- Keep as-is but ensure the bar has slightly more height for visibility

### Technical details

**File modified:** `src/components/MarketDialog.tsx`

Key changes:
- Outcome buttons redesigned to show both probability percentage and dollar ticket price in one button (e.g., "Yes 68% | $0.68")
- New info text: "Ticket prices rise closer to conclusion" with a TrendingUp icon, placed below outcomes
- "Ends in" badge added to right column top area
- Market image thumbnail (24x24) added next to title in left column
- Player count shown as metadata line under pot badge
- "If You Win" section: winnings text made larger (text-lg) with green color and a subtle bg highlight
- Buy button text updated to include potential winnings preview
- Default outcome auto-selected (first outcome) so payout summary is never empty on open
- Chart height increased from h-24 to h-28 with a dot marker on the latest data point
