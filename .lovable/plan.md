

## Mobile Home Page Optimization

### Problem
The current mobile layout takes up too much vertical space before users reach regular markets. The stack is: Weekly Draw (collapsed ~50px) -> Hero slideshow (220px) -> Banner (40px) -> 2 full sponsored cards (~300px combined) = ~610px before any regular content. Key sections compete for space instead of working together efficiently.

### Solution: Compact, Information-Dense Mobile Layout

**New mobile hierarchy (top to bottom):**

1. **Filter pills** (unchanged)
2. **Hero carousel (reduced to 180px)** -- slightly shorter, with swipe support using Embla carousel for smooth touch interaction
3. **Weekly Draw + Sponsored in a horizontal scroll row** -- a single horizontal strip containing the Weekly Draw card and 2 sponsored market cards, all as equal-width snap-scrolling cards (~75% viewport width each). This puts all 3 items in ~140px of vertical space instead of ~400px
4. **Gradient banner** (unchanged)
5. **Regular market list** (unchanged)

### Detailed Changes

**File: `src/pages/Feed.tsx`**

**A. Hero Slideshow -- add swipe support**
- Replace the static image with Embla carousel for touch-swipeable slides
- Reduce height from 220px to 180px
- Keep dot indicators and auto-cycle

**B. New Horizontal Scroll Section (replaces stacked Weekly Draw + Sponsored)**
- Create a horizontal scrollable container with `overflow-x-auto snap-x snap-mandatory`
- 3 cards side by side, each `w-[75vw] snap-center shrink-0`
- Card 1: Weekly Draw (compact card version, tap opens a bottom sheet/dialog with full details including distribution, how-it-works tabs, and previous winners)
- Card 2: Sponsored market 1 (reuse CompactFeaturedCard styling)
- Card 3: Sponsored market 2

**C. Weekly Draw -- redesigned for the horizontal card**
- Collapsed/card form: Trophy icon, pot amount, countdown timer, entry count, and a small distribution bar preview -- all in a card matching the sponsored card height (~140px)
- On tap: opens a Dialog with full details (distribution bar, how-it-works/previous-winners tabs) -- reuses the existing expanded content from MobileWeeklyDraw
- More visually striking: gradient background with a subtle shimmer/glow effect, larger pot number

### Technical Details

```text
Before (vertical stack):
+---------------------------+
| Weekly Draw strip (~50px) |
+---------------------------+
| Hero Slideshow (220px)    |
+---------------------------+
| Banner (40px)             |
+---------------------------+
| Sponsored Card 1 (~150px) |
+---------------------------+
| Sponsored Card 2 (~150px) |
+---------------------------+
| Regular markets...        |
Total: ~610px before content

After (optimized):
+---------------------------+
| Hero Carousel (180px)     |  <- swipeable
+---------------------------+
| [Draw] [Spons1] [Spons2]  |  <- horizontal scroll (~140px)
+---------------------------+
| Banner (40px)             |
+---------------------------+
| Regular markets...        |
Total: ~360px before content
```

**Files to modify:**
- `src/pages/Feed.tsx` -- Refactor `MobileTopSection` with new layout, update `MobileWeeklyDraw` to be a card+dialog pattern, add Embla carousel for hero swipe

**No new dependencies needed** -- Embla carousel is already installed and the Carousel UI components exist.

