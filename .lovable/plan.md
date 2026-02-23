

# Desktop Markets Page Improvement

Upgrading the desktop feed to maximize conversion and information density, matching the reference layout with tradable hero cards, redesigned filters, and compact market cards with inline outcome buttons.

---

## 1. FeedFilters.tsx -- Redesign Desktop Layout

**Current**: Filters button on the LEFT, then category pills flowing right.

**New desktop layout** (matching reference):
- Category pills on the LEFT (full row, no Filters button inline)
- Filters button + Saved/Bookmark button on the RIGHT, aligned to the end
- Use `justify-between` to push pills left and action buttons right
- Keep the expanded filter panel unchanged

```text
[All] [Following] [Hot] [Politics] [Sports] [Crypto] ...    [Filters] [Saved]
```

---

## 2. Feed.tsx -- Hero Cards with Tradable Outcomes

### Left Hero (Main Featured Card)
**Current**: Image with title/pot overlay, no outcomes shown.

**New**: Keep the image background + overlay, but add outcome buttons at the bottom of the overlay:
- For binary markets: side-by-side Yes/No buttons (green/red tinted, semi-transparent to work on dark overlay)
- For multi-outcome: show top 2-3 outcomes as rows with label + percentage + Yes buttons
- Creator avatar + name below title
- Pot pill, players count, end timer remain
- Clicking outcomes navigates to market detail page

### Right Compact Cards (2 stacked)
**Current**: Thumbnail + title + pot pill + meta. No outcomes.

**New**: Add outcomes section to each compact card:
- Probability badge (e.g., "91% chance") in top-right corner, green pill
- Below title/creator: Yes/No buttons side by side (full width within the card)
- Pot displayed as "Vol. $2.4M" at bottom left
- Share + Bookmark icons at bottom right
- Keep the card height balanced (both cards fill the right column evenly)

---

## 3. MarketGridCard.tsx -- Compact Desktop Redesign

**Current**: Thumbnail + title, pot pill, then outcomes (binary Yes/No or multi-outcome list), then footer with players/timer.

**New desktop layout** (matching reference image's grid cards):

```text
[thumb] Title text here...          
[thumb] by CreatorName
        
Outcome Label    13%   [Yes] [No]
Outcome Label    11%   [Yes] [No]

Vol. $231k                  [share] [bookmark]
```

Key changes:
- Outcome rows: each row shows label + bold percentage + small inline Yes/No buttons on the right
- Yes/No buttons are compact pill-style (green text on light green bg, red text on light red bg)
- For binary: show "Yes" and "No" as two outcome rows with percentages
- For multi-outcome: show all outcomes as rows (up to 3-4), each with percentage + Yes/No
- Pot displayed as "Vol. $X" (not a pill) in footer, left-aligned
- Share + Bookmark icons always visible in footer right
- Remove the "Win up to" teaser line (clutters the card)
- Remove the separate pot pill row -- integrate pot into the footer
- Tighter padding: `p-2.5` instead of `p-3`
- Smaller thumbnail: keep `w-10 h-10`

---

## 4. Density and Sizing

- Market grid cards: reduce internal padding to `p-2.5`, outcome row padding to `py-1 px-1.5`
- Yes/No buttons in grid cards: very small, `px-2 py-0.5 text-[10px]` rounded pills
- Grid gap: keep `gap-2`
- The goal: first full row of cards visible without scrolling at 1440x900

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/FeedFilters.tsx` | Move Filters+Saved buttons to right side on desktop |
| `src/pages/Feed.tsx` | Add tradable outcomes to hero cards (main + compact) |
| `src/components/MarketGridCard.tsx` | Redesign desktop card: inline outcome rows with Yes/No pills, compact layout |

**Total: 3 files modified**

---

## Technical Notes

- Hero outcome buttons use `onClick` to navigate to `/market/{id}` (consistent with memory: betting buttons are navigation links)
- Compact featured cards pass market data to render outcomes inline
- MarketGridCard desktop layout uses a new outcome-row pattern: `flex items-center justify-between` with label, percentage, and Yes/No pill buttons
- All changes are desktop-only (`sm:` / `hidden sm:flex` classes) -- mobile layout unchanged
- No new dependencies needed

