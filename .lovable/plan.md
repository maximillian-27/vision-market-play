

# Fix: Move Categories Row Above Weekly Draw on Mobile

## Problem
The categories/filter row is overlapping the Weekly Draw strip due to the `sticky top-14` positioning and z-index. They visually collide instead of stacking cleanly.

## Solution
Adjust the mobile layout in `src/pages/Feed.tsx` so the categories row sits flush below the header, with the weekly draw strip clearly below it. Two changes needed:

### 1. `src/components/FeedFilters.tsx`
- Increase z-index from `z-10` to `z-20` on the sticky container so it always stays above scrolling content
- Ensure the background fully covers any content scrolling behind it

### 2. `src/pages/Feed.tsx`
- Add top margin/padding to the mobile hero block (`sm:hidden`) so the weekly draw strip doesn't sit underneath the sticky filter row
- Alternatively, move `FeedFilters` rendering inside the mobile block structure and remove sticky on mobile, keeping it as a normal flow element that scrolls with content -- but this would lose the sticky filter behavior

The simplest fix: ensure the sticky filter bar has enough z-index and the content below it has proper spacing so nothing overlaps. Change `z-10` to `z-20` in FeedFilters, and add `mt-1` or `pt-1` to the mobile hero block to prevent visual collision.

### Files to edit:
- `src/components/FeedFilters.tsx` -- bump z-index to z-20
- `src/pages/Feed.tsx` -- add small top spacing to the mobile hero section so the weekly draw clears the sticky filter bar

