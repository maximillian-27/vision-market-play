

## Polish Weekly Draw Card -- Same Size, Better Clarity

Reorganize the information hierarchy so everything is instantly scannable without increasing card height.

### Current Issues
- Distribution bar legend at 7px is nearly unreadable
- Entry info row feels cramped with dots as separators
- Bottom action row has 3 different items competing for attention
- "Prize pool this week" label is redundant when you already have "WEEKLY DRAW" title
- The "1,284 entries" button at bottom-right duplicates info from the entry row

### Layout Redesign (same height)

```text
+------------------------------------------+
| [trophy] WEEKLY DRAW         [clock] 3d 14h |
|                                            |
| $48,600                                   |
| Prize pool this week                       |
|                                            |
| [======distribution bar======]             |
| 1st 50%   2nd 25%   3rd 15%   Rest 10%    |
|                                            |
| [ticket] 20 tickets = 1 entry              |
| You: 3 entries  ·  1,284 total             |
|____________________________________________|
| [history] Previous    [info] How it works  |
+------------------------------------------+
```

### What Changes

**1. Separate "Your entries" and "Total entries" onto their own line**
- Move them out of the cramped inline strip
- "You: 3 entries" in bold foreground, then a dot, then "1,284 total" in muted
- Cleaner two-line entry section instead of one crowded line

**2. Remove the "1,284 entries" button from the bottom row**
- It duplicates the total entries count already shown above
- Bottom row becomes just two clean links: "Previous" and "How it works"
- Evenly spaced with a subtle separator

**3. Bump distribution legend from 7px to 8px**
- Currently nearly invisible at `text-[7px]`
- Small bump to `text-[8px]` for readability without taking more space

**4. Slightly better spacing**
- Tighten the gap between pot amount and description
- Give the entry section a subtle top border to group it visually

### Files Changed

**`src/components/WeeklyDrawCard.tsx`** -- single file edit
- Split the entry info row into two lines: ticket rule + your entries / total
- Remove the "1,284 entries" ChevronRight button from the bottom actions
- Remove `Users` and `ChevronRight` icon imports (no longer needed)
- Bump distribution legend text from `text-[7px]` to `text-[8px]`
- Add a subtle `border-t border-border/40 pt-1.5` above the entry section for visual grouping

### Technical Details
- Single file changed: `src/components/WeeklyDrawCard.tsx`
- No new dependencies
- Removes 2 unused icon imports (`Users`, `ChevronRight`)
- Card height stays the same or slightly shorter due to removing the entries button

