

## Mobile Home Page: Sponsored Carousel + Weekly Draw Banner

### Changes (mobile only, desktop untouched)

**New mobile layout order:**

```text
+-------------------------------+
| Weekly Draw Banner (tap=expand)|  <- new position, full-width strip
+-------------------------------+
| Hero Carousel (180px, swipe)  |  <- unchanged
+-------------------------------+
| Sponsored Carousel (auto-3s)  |  <- replaces horizontal scroll
+-------------------------------+
| Gradient Banner               |  <- unchanged
+-------------------------------+
| Regular markets...            |  <- unchanged
```

### A. Weekly Draw -- moves to top as an expanding banner
- Full-width strip at the very top of the mobile section (above the hero carousel)
- Compact single row: Trophy icon, "$48,600" pot, countdown timer, entry count -- all inline
- Tapping opens the existing Dialog with full details (distribution bar, tabs for how-it-works / previous-winners)
- Styled with a gradient background and subtle glow to stand out as a banner

### B. Sponsored Markets -- auto-cycling carousel
- Replace the horizontal scroll row with an auto-rotating carousel
- Shows one sponsored market card at a time, full width
- Auto-cycles every 3 seconds with a crossfade/slide transition
- Small dot indicators (2 dots) at the bottom
- Users can also swipe manually using Embla carousel
- Each card uses the existing `CompactFeaturedCard` component

### Technical Details

**File: `src/pages/Feed.tsx`**

1. **MobileTopSection** -- reorder children:
   - First: `MobileWeeklyDrawCard` as a full-width banner strip (no longer inside horizontal scroll)
   - Second: Hero carousel (unchanged)
   - Third: New sponsored auto-carousel with Embla (loop, autoplay via `useEffect` + `setInterval` every 3 seconds)
   - Fourth: `GradientDivider` (unchanged)

2. **MobileWeeklyDrawCard** -- restyle as banner:
   - Change from card layout to a slim horizontal banner strip
   - All key info (trophy, pot, timer, entries) in one line
   - Keep the Dialog trigger for tap-to-expand with full details

3. **Sponsored carousel** -- new Embla instance:
   - Second `useEmblaCarousel({ loop: true })` instance inside `MobileTopSection`
   - `useEffect` with 3-second interval calling `emblaApi.scrollNext()`
   - Dot indicators synced with `onSelect` callback
   - Each slide is a full-width `CompactFeaturedCard`

No new dependencies -- Embla is already installed.

