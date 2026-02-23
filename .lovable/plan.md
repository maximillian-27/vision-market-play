

## Weekly Prize Draw Feature

Add a weekly prize draw system where 2% of every trade feeds a community prize pool, distributed weekly to 10 random winners. The feature integrates minimally into the existing UI.

### What Gets Added

**1. Ticket Counter in Header** (logged-in users only)
- A small, inline element next to the Deposit button showing: a ticket icon + "14/20" (tickets this week) and entry count
- Compact pill style, clickable to open a small popover with details
- Shows tickets purchased this week, progress toward next entry, and total entries

**2. Weekly Draw "Market Card"** in the Feed
- Displayed as a special card right after the hero section (before GradientDivider)
- Styled like a market card but with a distinct accent (subtle gradient border or trophy icon)
- Shows: "Weekly Prize Draw", the current prize pool amount (2% of weekly volume), countdown timer to next draw, number of eligible players
- Distribution breakdown shown as a minimal horizontal bar or small list inside the card

**3. Prize Distribution Display**
- Inside the Weekly Draw card, a compact breakdown:
  - 1st: 50% | 2nd: 20% | 3rd: 10% | 4-10th: ~2.9% each
- Shown as tiny pills or a single-line summary
- A small "Transparency" or "How it works" link/tooltip explaining the 2% mechanism

### File Changes

**`src/components/Header.tsx`**
- Add a ticket counter pill next to the Deposit button (only when logged in)
- Shows ticket icon + "14/20" progress + entry count badge
- Clicking opens a Popover with:
  - "Tickets this week: 14/20"
  - "Entries earned: 3"
  - Small progress bar toward next entry
  - "Buy 6 more tickets for another entry"
- Mock state: `ticketsThisWeek = 14`, `entries = 3`

**`src/components/WeeklyDrawCard.tsx`** (new file)
- A special card component styled to look like a market card
- Contains:
  - Trophy icon + "Weekly Prize Draw" title
  - Prize pool amount (calculated as 2% of total mock volume)
  - Countdown timer (mock: "3d 14h left")
  - Number of eligible players (mock)
  - Distribution breakdown as compact horizontal segments or pill row
  - "20 tickets = 1 entry" note
- Matches existing card styling (rounded-xl, border, bg-card)

**`src/pages/Feed.tsx`**
- Import and render `WeeklyDrawCard` between the hero section and the GradientDivider
- On desktop: full-width card spanning the grid
- On mobile: compact version

### Technical Details

- All data is mock/hardcoded (no backend changes)
- Ticket counter uses local state in Header (ticketsThisWeek, entries)
- Prize pool calculated from `mockMarkets` total volume * 0.02
- Distribution constants: `[50, 20, 10, 2.86, 2.86, 2.86, 2.86, 2.86, 2.86, 2.86]`
- WeeklyDrawCard uses existing Card, Progress, Badge components
- Popover from radix for ticket counter detail view
- Timer icon + countdown for draw deadline
- No new dependencies needed

### Visual Summary

```text
Header: [Logo] [Nav] [Search] [Globe] [Bell] [Ticket 14/20 (3)] [+Deposit] [Avatar]

Feed:
  [Filters]
  [Hero Slideshow] [Sponsored Cards]
  [Weekly Prize Draw Card — pool: $X, countdown, distribution bar]
  [Gradient Divider]
  [Market Grid...]
```

