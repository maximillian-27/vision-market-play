

# Mobile Hero Section Redesign

## Current Problem
On mobile, only the hero slideshow is visible. The **Weekly Draw**, **Sponsored market**, and **gradient banner** are all hidden inside the desktop-only `hidden sm:grid` block. Mobile users miss key features.

## Proposed Layout (top to bottom)

```text
+----------------------------------+
| Weekly Draw (compact strip)      |
+----------------------------------+
| Hero Slideshow (biggest markets) |
| [swipeable, 200px, dot indicators]|
+----------------------------------+
| Gradient Banner (Pollgy slogan)  |
+----------------------------------+
| Sponsored Market (first item)    |
+----------------------------------+
| Market 1                         |
| Market 2                         |
| Market 3 ...                     |
+----------------------------------+
```

## Changes (single file: `src/pages/Feed.tsx`)

### 1. Mobile Weekly Draw strip (new, above hero)
- A compact single-line strip showing: Trophy icon, pot amount, countdown timer, and entry count
- Reuses the same data constants already in WeeklyDrawCard
- Styled as a small bordered row (~36px tall) matching the sidebar strip style from MarketsSidebar

### 2. Hero slideshow -- keep as-is
- Already working well at 220px with dot indicators and outcome buttons

### 3. Gradient Banner -- already renders for mobile
- The `GradientDivider` component already shows on mobile (no `hidden` class), but it currently sits after the desktop hero block. Move it into the mobile section flow, right after the hero.

### 4. Sponsored market card before regular list
- Insert the first `sponsoredMarkets[0]` as a distinguished card at the top of the mobile market list
- Add a small "Sponsored" label, image, title, outcome buttons, and pot/players -- reusing the `CompactFeaturedCard` layout but rendered inline in the mobile flow
- Visually separated with a subtle accent border (`border-primary/20`)

### 5. Regular market list continues below
- No changes to the existing flat list

### Technical approach
- All changes within the mobile-only `sm:hidden` blocks in `Feed.tsx`
- No new components needed -- inline the compact weekly draw strip and sponsored card
- Desktop layout remains completely untouched

