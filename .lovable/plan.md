

## Mobile Market Detail -- Compact Sticky Purchase Bar

### Problem
The current sticky entry panel contains everything (outcome buttons, ticket counter, quick pills, weekly draw badge, summary card, buy button, pot split bar) making it ~300px tall. This covers half the screen and hides the market content beneath it. Users can't see market details and the purchase area simultaneously.

### Solution: Split the UI into two zones

**Zone 1: Inline content (scrollable)** -- Move the detailed purchase info INTO the main scrollable content, below the engagement row. This includes the full summary breakdown, weekly draw badge, and pot split bar.

**Zone 2: Sticky bottom bar (compact, ~120px)** -- Keep only the essentials locked at the bottom: outcome selection, a compact ticket stepper, and the buy button with key numbers visible inline.

### Changes

**1. Compact sticky bottom bar (~120px instead of ~300px)**

The sticky panel will contain only:
- Row 1: Outcome buttons (Yes/No for binary, horizontal scroll for multi) -- same as now but slightly smaller padding
- Row 2: Inline ticket stepper `[-] 5 [+]` on the left, Buy button on the right showing price
- A tiny text line below showing "$0.50/ticket | Profit: +$X.XX" for at-a-glance info

**2. Inline purchase details section (new, in scrollable content)**

Add a new section between the engagement row and comments containing:
- Quick ticket pills (1, 5, 10, 25)
- Summary card (Cost / Potential Winning / Potential Profit) -- same rounded card style
- Weekly Draw entry badge
- Pot split bar (95% Pot | 2% Draw | 3% Platform)

This way users see all details while scrolling, but can always buy from the compact bottom bar.

**3. Keep hero and content sections as-is**

The hero image (2:1 ratio), creator block, metrics strip, probability chart, description, resolution criteria, and engagement row remain unchanged.

### Technical Details

**File: `src/pages/MarketDetail.tsx`**

**Sticky panel refactor (lines 629-843):**

Replace the current massive sticky panel with a compact version:

```text
=== COMPACT STICKY BAR ===
[Yes (68%) | No (32%)]           <- outcome buttons, same style, py-2
[[-] [5] [+]  |  Buy 5 Tickets · $2.50]  <- stepper + buy in one row
[$0.50/ticket · Profit: +$X.XX]  <- tiny info line
```

- Outcome buttons: reduce `py-2.5` to `py-2`, keep grid layout
- Ticket stepper + buy button on same row using `flex`: stepper on left (h-8 buttons, smaller input), buy button on right (flex-1)
- Info line: single text row with ticket price and estimated profit, text-[10px]

**New inline section (after engagement row, before comments):**

Insert between the engagement row (line 573) and comments collapsible (line 576):

```tsx
{/* Purchase Details -- scrollable */}
{!isAwaitingResolution && (
  <div className="px-4 py-4 space-y-3 sm:hidden">
    {/* Quick ticket pills */}
    <div className="grid grid-cols-4 gap-1.5">
      {quickTickets.map(...)} // same as current
    </div>

    {/* Weekly Draw badge */}
    <div className="flex items-center gap-2 ...">
      <Trophy /> Includes X Weekly Draw entries
    </div>

    {/* Summary card */}
    <div className="rounded-xl border divide-y ...">
      Cost / Potential Winning / Potential Profit rows
    </div>

    {/* Pot split bar */}
    <div className="space-y-1">
      colored bar + labels
    </div>
  </div>
)}
```

This section is wrapped in `sm:hidden` so it only appears on mobile.

**Bottom padding:** Keep `pb-56` on the container but can reduce to `pb-40` since the sticky bar is now shorter.

### Mobile Layout (top to bottom)

```text
[Hero Image (2:1)]
  [Back] [Share] [Bookmark]
[Creator + Title]
[Pot + Players + Date + Activity]
[Win teaser]
---
[Probability Chart]
---
[About This Market]
[Resolution Criteria]
[Like | Comment | Share]
---
[Quick Ticket Pills: 1 | 5 | 10 | 25]    <-- NEW inline section
[Weekly Draw badge]
[Cost / Winning / Profit card]
[Pot Split Bar]
---
[Comments]
         ... scroll space ...

=== COMPACT STICKY BAR (bottom) ===
[ Yes 68%  |  No 32% ]
[ [-][5][+]   Buy 5 Tickets · $2.50 ]
[ $0.50/ticket · Profit: +$4.17 ]
```

### Key Benefits
- Sticky bar shrinks from ~300px to ~120px -- users see 2x more content
- All purchase details are still visible when scrolling (inline section)
- The buy action is always one tap away
- Ticket price, potential winnings, and profit are visible both inline (detailed) and in the sticky bar (summary)
- Matches the professional, clean UX directive

