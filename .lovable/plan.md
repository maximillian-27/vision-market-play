

## Mobile Market Detail -- Match Desktop Dialog Layout

### Goal
Restructure the mobile `MarketDetail` page so it mirrors the desktop `MarketDialog` content, flow, and trading experience, all in a single-column mobile-optimized layout.

### Current Issues on Mobile
- Uses a different trading system (dollar amounts + quick amounts) vs the desktop dialog (ticket counter + quick tickets)
- Has a large revenue distribution pie chart section that the dialog doesn't show (wastes space)
- The sticky entry panel at the bottom is cramped and hard to use
- Hero image takes up too much vertical space before users see actionable content
- Missing the pot split bar visual that the dialog has
- Engagement actions (like, comment, share) are separated from the main flow

### Changes

**1. Reduce hero image height on mobile**
- Change mobile aspect ratio from `aspect-[16/9]` to a shorter `aspect-[2/1]` so users see content faster
- Keep the overlay back/share/bookmark buttons as-is

**2. Switch mobile trading to ticket-based system (match dialog)**
- Replace the dollar input + quick amounts with the ticket counter (minus/plus buttons + input) from the dialog
- Add the same quick ticket buttons (1, 5, 10, 25)
- Show ticket price ($0.50/ticket) info
- Show the summary breakdown (cost, potential winning, potential profit) matching the dialog's rounded card style
- Add the Weekly Draw entry bonus badge
- Add the pot split bar at the bottom of the panel

**3. Replace revenue distribution section with pot split bar**
- Remove the full pie chart / revenue distribution section on mobile (lines 475-504)
- The pot split bar in the sticky panel already shows this info more compactly

**4. Move engagement actions inline with the main content**
- Keep the like/comment/share row but make it more compact
- Move it above the description section so it's more accessible

**5. Compact the sticky entry panel**
- Make the panel tighter with the ticket system
- Ensure proper clearance above the mobile nav bar (`bottom-14`)

### Technical Details

**File: `src/pages/MarketDetail.tsx`**

Key changes:
- Add new state: `ticketCount` (default 5), replace `amount`/`selectedOutcome` dollar logic with ticket logic
- Add imports: `Minus`, `Plus`, `Ticket` (already imported), `Trophy` (already imported)
- Add constants: `quickTickets = [1, 5, 10, 25]`, `currentTicketPrice = 0.50`, `POT_SPLIT` array
- Compute `totalCost`, `estimatedPayout`, `estimatedProfit` matching the dialog's formulas

- **Hero image** (line 331): Change `aspect-[16/9]` to `aspect-[2/1] sm:aspect-[16/7]`

- **Remove revenue distribution section** (lines 475-504): Delete the pie chart section and its separator on mobile, wrap in `hidden sm:block` or remove entirely

- **Sticky entry panel** (lines 610-770): Replace the dollar-based system with:
  - Outcome selection (binary yes/no buttons or multi-outcome horizontal scroll) -- keep as-is
  - Ticket counter row: minus button, input, plus button
  - Quick ticket pills: 1, 5, 10, 25
  - Weekly Draw badge
  - Summary card (cost / potential winning / potential profit)
  - Buy button: "Buy X Tickets + Entries . $Y.YY"
  - Pot split bar below the buy button

- **Quick amounts removal**: Remove the old `quickAmounts` array and dollar-based quick select buttons

### Mobile Layout (top to bottom)
```text
[Hero Image (shorter 2:1 ratio)]
  [Back] [Share] [Bookmark] overlay
[Creator + Title]
[Pot + Players + Date + Activity metrics]
[Win teaser]
---
[Probability Chart with timeframe buttons]
---
[About This Market - description]
[Resolution Criteria - collapsible]
[Like | Comment | Share row]
[Comments - collapsible]
                    ...space for sticky panel...

=== STICKY ENTRY PANEL ===
[Outcome buttons: Yes / No or multi-scroll]
[Ticket counter: [-] [5] [+]]
[Quick: 1 | 5 | 10 | 25]
[Weekly Draw badge]
[Cost / Potential / Profit card]
[Buy X Tickets button]
[Pot split bar: 95% Pot | 2% Draw | 3% Platform]
```

