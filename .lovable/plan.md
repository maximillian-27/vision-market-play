
# Restore Featured Market with Right Sidebar Layout

## What changes

The featured market section will be restructured into a two-column layout matching the reference:

- **Left (~65% width):** The existing featured market card, made slightly larger (bigger avatar, bigger title, more padding, wider Yes/No buttons)
- **Right (~35% width):** Two stacked compact market cards showing a percentage "chance" indicator, creator info, and Yes/No buttons
- **Below:** The existing gradient banner (already in place with correct text)

## Scope -- minimal changes

Only **one file** will be modified: `src/components/FeaturedMarketSection.tsx`

Everything else (Feed.tsx layout order, GradientDivider, market grid, filters) stays untouched.

## Technical details

### Changes to `FeaturedMarketSection.tsx`

1. **Wrap in a flex/grid row:** The component's return will use a `flex` layout with `gap-4`:
   - Left: the existing `Card` (given `flex-1` or `w-[65%]`)
   - Right: a vertical stack of two compact `Card` components (`w-[35%]`)

2. **Left card (main featured):** Keep all existing elements (avatar, title, outcome rows with sparklines, Yes/No buttons, volume, share/bookmark). Increase sizing slightly:
   - Avatar from `h-14 w-14` to `h-16 w-16`
   - Title from `text-lg` to `text-xl`
   - Padding from `p-5` to `p-6`
   - Yes/No buttons from `px-5 py-1.5` to `px-8 py-2`
   - Add carousel dots at the bottom (decorative, static)

3. **Right side cards (two stacked):** Create a simple compact card sub-component using existing market data (e.g., Fed rate and iPhone markets). Each card will show:
   - Creator avatar + title + "by creator_name"
   - A percentage "chance" badge (top-right, green text)
   - Full-width Yes and No buttons
   - Volume + share/bookmark icons at the bottom

4. **Responsive:** On mobile (`flex-col`), the right cards stack below the main card. On desktop (`md:flex-row`), they sit side by side.

No changes to Feed.tsx, GradientDivider, MarketGridCard, or any other file.
