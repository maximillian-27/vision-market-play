

## Redesign Market Dialog (Desktop Popup)

Restructure the MarketDialog into a clean two-column layout with clear information hierarchy, removing clutter and adding the pot revenue split. The goal: clean, engaging, casino-like feel with all necessary info visible.

### Layout Overview

```text
+--------------------------------------------------+
| [Avatar] Creator Name [Verified]   [Share] [Repost]|
+--------------------------------------------------+
|  LEFT COLUMN (scrollable)  |  RIGHT COLUMN (fixed) |
|                            |                        |
|  Title (bold, prominent)   |  OUTCOMES              |
|  Pot: $2.4M               |  [Yes 68%] [No 32%]    |
|                            |  Ticket: $0.68          |
|  Description               |                        |
|  ─────────────────────     |  ENTRY AMOUNT           |
|  Resolution Criteria       |  [$] [5][10][25][50]    |
|  (collapsible)             |                        |
|                            |  IF YOU WIN             |
|  ─────────────────────     |  Entry: $10.00          |
|  Comments (collapsible)    |  Payout: $14.70         |
|   - comment thread         |  Winnings: +$4.70       |
|   - [Add comment...]       |  ⚡ Winners split pot   |
|                            |                        |
|                            |  [=== Enter Yes $10 ===]|
|                            |                        |
|                            |  POT SPLIT (mini)       |
|                            |  90% Winners | 2% Draw  |
|                            |  5% Comp | 3% Platform  |
+--------------------------------------------------+
```

### What changes from the current dialog

**Removed:**
- Probability chart (hide in popup, available on full page)
- Bookmark button (keep share only, add repost)
- Players count / ends-in metadata from left column (keep it minimal)
- "Full page" link button (less prominent, move to footer text)

**Added:**
- Repost button next to share
- Ticket price display (price as cents = probability)
- Disclaimer text under "If you win" summary
- Pot revenue split at the bottom of the right panel (minimalistic horizontal bar + legend)

**Restructured:**
- Left: Title, Pot badge, Description (always visible, not collapsible), Resolution Criteria (collapsible), Comments (collapsible)
- Right: Outcomes with probability %, ticket price, amount entry, payout summary, disclaimer, buy button, pot split

### Files changed

**`src/components/MarketDialog.tsx`** (full rewrite of the component)

- Header: Creator avatar + name + verified badge on left, Share + Repost icons on right
- Left column: Title (larger), Pot badge with player count, Description (visible by default), Resolution Criteria (collapsible), Comments section (collapsible with inline reply)
- Right column: Outcome selector with probability percentages, ticket price per outcome, amount input with quick-select buttons, "If you win" summary card, disclaimer line ("Winners split the pot -- potential winnings may fluctuate"), Buy button (sticky at bottom of right column), Pot revenue split (thin bar + 4-item legend)
- Remove: chart section, bookmark button, "Full page" link
- Add: QuoteRepostDialog integration for repost functionality
- Keep: all existing logic for buy flow, validation, toast notifications, multi-outcome support, awaiting resolution state

### Technical details

- 1 file modified: `src/components/MarketDialog.tsx`
- No new dependencies
- Reuses existing QuoteRepostDialog for repost functionality
- Revenue split data: 90% Winners, 2% Weekly Draw, 5% Competitions, 3% Platform Fee (matching existing MarketDetail page data)
- Ticket price displayed as: `$0.XX` where XX = probability percentage (e.g., 68% = $0.68 per ticket)
- Dialog max-width stays at ~820px for comfortable two-column layout

