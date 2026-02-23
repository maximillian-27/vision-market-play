

# Markets Feed Layout Redesign - Split Hero + Banner Divider

Restructuring the feed page to show 3 featured markets in a split layout (1 large + 2 small), move filters above the hero, and add a branded banner divider between the hero and the market grid.

---

## Layout Structure (Top to Bottom)

1. **Filters & Category Pills** (sticky, right below header)
2. **Hero Section** - 3 featured markets in split layout
3. **Banner Divider** - branded promotional strip
4. **Market Grid** - regular market cards (at least 2 rows visible)

---

## 1. Move Filters Above Hero (Feed.tsx)

Swap the order so `FeedFilters` renders before the hero section. The filters remain sticky at `top-14` so they stay visible when scrolling.

---

## 2. Split Hero Layout (Feed.tsx)

Replace the current single rotating banner with a static 3-market split:

```text
+---------------------------+  +----------------+
|                           |  |  Market #2     |
|       Market #1           |  |  (compact)     |
|       (large card)        |  +----------------+
|                           |  +----------------+
|                           |  |  Market #3     |
|                           |  |  (compact)     |
+---------------------------+  +----------------+
```

- **Left (roughly 60%)**: Largest pot market, full image background with gradient overlay, title, pot size pill, players, end date, "Enter Now" CTA
- **Right (roughly 40%)**: Two stacked compact cards, each showing: thumbnail, title, creator, pot pill, Yes/No buttons, volume
- All 3 are the top 3 markets by pot size (open/closing status)
- Remove the chevron navigation arrows and dot indicators (no longer cycling)
- Each card is clickable to navigate to market detail
- Height constrained so at least 2 rows of the grid below remain visible (max-h around 320-340px)

### Left Featured Card Details
- Full bleed image with `bg-gradient-to-t from-black/80 via-black/30 to-transparent`
- Status badge (Closing Soon if applicable)
- Pot size pill (prominent, primary color)
- Title (white, bold, max 2 lines)
- Players count + End date
- Subtle "Enter Now" text or arrow hint on hover

### Right Compact Cards Details
- Each card: horizontal layout with small thumbnail on left
- Creator name + avatar (small)
- Title (2 lines max)
- Pot pill
- Yes/No outcome buttons (functional, clickable)
- Volume/players in footer
- Separated by a thin divider or gap between the two

---

## 3. Banner Divider (Feed.tsx - new inline component)

A full-width branded banner between hero and grid, inspired by the reference image:

- Background: primary/brand gradient (green-based, matching the platform theme)
- Left side text: "Pollgy. **First creator led, community owned** prediction market platform"
- Right side keywords: **Safe** | **Relevant** | **The best.**
- Far right: "How it works?" button/link
- Height: compact (~48-56px), rounded corners
- Full width within the content area

---

## 4. Hero Section Sizing

- Set max height on the hero section to approximately `max-h-[340px]` on desktop
- This ensures at least 2 rows of the 4-5 column grid below are visible on a standard viewport
- On mobile: stack the 3 cards vertically (left card on top, two compact cards below side by side or stacked)

---

## 5. Remove Auto-Cycling Logic

- Remove the `featuredIndex` state and the `useEffect` interval
- Remove `ChevronLeft`, `ChevronRight` imports (no longer needed)
- All 3 featured markets are shown simultaneously

---

## Files Modified

| File | Changes |
|------|---------|
| Feed.tsx | Move filters above hero, replace rotating banner with split 3-market layout, add banner divider, remove cycling logic, constrain hero height |
| FeedFilters.tsx | No changes needed (already works as sticky) |

**Total: 1 file modified**

---

## Technical Notes

- The `featuredMarkets` array already computes top 3 by pot size -- reuse as-is
- Left card = `featuredMarkets[0]`, right top = `featuredMarkets[1]`, right bottom = `featuredMarkets[2]`
- Remove `Timer` import if no longer used in hero (still used in MarketGridCard)
- The banner uses Tailwind gradient classes, no new assets needed
- Mobile breakpoint: below `lg`, show all 3 cards stacked vertically with reduced heights

