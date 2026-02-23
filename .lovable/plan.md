

## Redesign the Filter Panel

The current expanded filter panel uses bulky dropdown selects with labels, borders, and a card container that feels heavy. We'll replace it with a clean, inline pill/chip-based filter system -- minimalistic, modern, and intuitive.

### Design Approach

Instead of select dropdowns in a bordered card, the filters will appear as **horizontal rows of toggleable pills** directly below the category bar. Each filter group (Sort, Status, Timeframe, Volume) sits on its own compact row with a subtle label. This is similar to how modern trading/betting platforms handle filters.

### What Changes

**File: `src/components/FeedFilters.tsx`**

Replace the current expanded filter panel (the bordered card with Select dropdowns) with:

1. **No card/border container** -- filters appear inline with just a subtle top separator line
2. **Pill-based selection** for each filter group, laid out horizontally:
   - **Sort**: Trending, Biggest Pots, Newest, Closing Soon, Most Active
   - **Status**: All, Open, Closing Soon, Resolved
   - **Timeframe**: 24h, 7d, 30d, All Time
3. **Each row** has a small muted label on the left ("Sort", "Status", "Time") followed by horizontally scrollable pills
4. **Active pill** gets a subtle filled background (like the category pills), inactive ones are ghost-style
5. **Clear filters** becomes a small "Reset" text link at the end, only visible when filters are active
6. Remove the "Filter Markets" header and X close button -- instead, clicking the Filters button again toggles it closed
7. Smooth animation on open/close

### Filter Groups (what makes sense for a prediction market)

- **Sort By**: Trending, Biggest Pots, Newest, Closing Soon, Most Active
- **Status**: All, Open, Closing Soon, Resolved
- **Timeframe**: 24h, 7 Days, 30 Days, All Time

These three groups cover what users actually need: how to order results, which markets to see, and how far back to look.

### Technical Details

- Remove `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` imports (no longer needed)
- Remove `Label` import
- Remove `X` icon import
- Keep the same `FilterState` interface and `updateFilter` logic
- Each filter group renders as a `<div>` row with a tiny label span and a set of `<button>` pills
- Pills use the same styling pattern as the existing category pills for consistency
- The entire filter area uses `space-y-1` for tight vertical rhythm
- Compact padding: pills get `px-2.5 py-0.5 text-xs`

