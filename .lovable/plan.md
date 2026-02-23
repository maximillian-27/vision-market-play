

# Mobile Markets Feed Redesign

Redesigning the mobile view to match the reference layout: a clean, list-based feed with a compact hero slide, prominent search/filters at top, and maximum market density below.

---

## Layout Structure (Mobile Only, top to bottom)

1. **Search bar** (full width, prominent)
2. **Category filter pills** (horizontally scrollable)
3. **Featured hero card** (single market slide with dot indicators)
4. **Market list** (flat, borderless cards separated by dividers -- no grid, maximum density)

---

## 1. FeedFilters.tsx - Mobile-Specific Layout

**Current**: Filter button + category pills in one row on both mobile and desktop.

**New mobile layout** (below `sm` breakpoint):
- Top row: full-width search input with filter icon button and bookmark icon on the right
- Second row: horizontally scrollable category pills (All, My Markets, Hot, Politics, Sports, Crypto, Tech, Entertainment, Finance) -- larger touch targets, more spacing
- Remove the "Filters" button label on mobile; just show the icon
- Keep the expanded filter panel as-is (already works well on mobile)

---

## 2. Feed.tsx - Mobile Hero Slide

**Current**: The split hero (1 large + 2 compact) shows on mobile as stacked cards, taking too much vertical space.

**New mobile layout** (below `md` breakpoint):
- Hide the desktop split hero section entirely on mobile
- Show a single swipeable hero card instead:
  - Featured market image as background with gradient overlay
  - Title, pot size, creator name overlaid
  - Dot indicators at bottom (3 dots for 3 featured markets)
  - Swipeable via state toggle (tap dots or auto-cycle)
  - Compact height: ~180px max
- Below hero: the GradientDivider (keep, but make it more compact on mobile -- reduce padding)
- Below divider: market list (not grid)

---

## 3. Feed.tsx - Mobile Market Grid becomes List

**Current**: `grid-cols-1` on mobile means each MarketGridCard renders as a full-width card with borders and padding.

**Change on mobile**:
- Switch from grid to a flat list layout: `flex flex-col divide-y divide-border` on mobile
- Each card renders in a compact list-item style (no card border, no shadow, no rounded corners on mobile)
- This maximizes density -- more markets visible per scroll

---

## 4. MarketGridCard.tsx - Redesigned Mobile Layout

**Current mobile layout**: Thumbnail left + title/creator/pot right, then outcomes bar, then stats footer -- all wrapped in a Card with borders.

**New mobile layout** (matching reference image):
- Remove Card wrapper border/shadow on mobile (flat, separated by dividers only)
- Row 1: Small square thumbnail (40x40) + Title + Probability badge (e.g., "68%" in green pill, top-right)
- Row 2: Creator name below title (small, muted text: "by CreatorName")
- Row 3: Full-width Yes/No buttons side by side (green background for Yes, red/pink for No) -- larger touch targets
- For multi-outcome: show outcome rows with label + percentage + Yes/No buttons
- Row 4: Pot size ("Pot $231k") left-aligned + share icon + bookmark icon right-aligned
- Dot pagination indicator if the card has multiple outcome views (like the reference)
- Clean spacing: `py-3 px-4` with no card borders

**Key visual changes**:
- Yes/No buttons: full-width, side-by-side, with soft colored backgrounds (bg-yes/10 and bg-no/10) and bold colored text
- Probability percentage displayed as a prominent badge next to the title (green pill with "68%" and small "chance" label below)
- Remove the probability bar on mobile (the reference doesn't use it)
- Pot displayed as "Pot $231k" in the footer, not as a pill

---

## 5. Sizing and Density

- Hero section: max 180px height on mobile
- Each market list item: approximately 140-160px height
- This means 2-3 full market items visible below the hero on a standard 844px mobile viewport
- Bottom nav clearance: add `pb-24` to the feed container for the floating nav bar

---

## Files Modified

| File | Changes |
|------|---------|
| Feed.tsx | Add mobile hero slide with dot indicators, hide desktop hero on mobile, switch grid to list on mobile, add search bar |
| FeedFilters.tsx | Mobile-specific layout with full-width search bar above category pills |
| MarketGridCard.tsx | Flat list-item mobile layout: remove card borders, larger Yes/No buttons, probability badge, simplified footer |

**Total: 3 files modified**

---

## Technical Notes

- Use `useIsMobile()` hook (already available) or Tailwind responsive classes (`sm:hidden` / `md:hidden`) to differentiate layouts
- Hero slide state: simple `useState` for `activeSlide` index with dot indicators
- The desktop layout remains completely unchanged -- all changes are scoped to mobile breakpoints
- Category pills: use `scrollbar-hide` utility class (already in use) for clean horizontal scroll

