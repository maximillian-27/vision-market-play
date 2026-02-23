

## Add Unified Right Sidebar to Non-Market Pages

Replace the different right-side sidebars on Community, CommunityFeed, and News pages with a single consistent sidebar containing three sections: Weekly Draw, 3 Biggest Markets, and a Sponsored Market.

### New Component: `MarketsSidebar`

Create `src/components/MarketsSidebar.tsx` -- a single reusable right sidebar that stacks:

1. **Weekly Draw card** -- reuses the existing `WeeklyDrawCard` component as-is
2. **Biggest Markets** -- 3 top markets listed with image thumbnail, title, pot, and player count (same style as existing `HottestMarkets` but embedded inline)
3. **Sponsored Market** -- a compact card similar to the `CompactFeaturedCard` from the Feed hero section, showing a "Sponsored" label, market title, outcomes with percentages, and pot

The sidebar wrapper uses `w-72 hidden lg:block sticky top-20 self-start space-y-3` to match existing sidebar patterns.

### Page Changes

| Page | Current Right Sidebar | New Right Sidebar |
|------|----------------------|-------------------|
| News (`src/pages/News.tsx`) | `HottestMarkets` | `MarketsSidebar` |
| Leaderboards (`src/pages/Community.tsx`) | `HottestMarkets` | `MarketsSidebar` |
| Community Feed (`src/pages/CommunityFeed.tsx`) | `TrendingSidebar` | `MarketsSidebar` |

### Technical Details

**New file:** `src/components/MarketsSidebar.tsx`
- Imports and renders `WeeklyDrawCard`
- Contains a "Biggest Markets" section with 3 items (reuses data from `HottestMarkets`)
- Contains a "Sponsored" compact card with market title, outcomes, and pot
- All sections use `rounded-2xl border border-border/40` card styling for consistency

**Modified files:**
- `src/pages/News.tsx` -- replace `<HottestMarkets />` with `<MarketsSidebar />`
- `src/pages/Community.tsx` -- replace `<HottestMarkets />` with `<MarketsSidebar />`
- `src/pages/CommunityFeed.tsx` -- replace `<TrendingSidebar />` with `<MarketsSidebar />`

No changes to the `WeeklyDrawCard` itself -- it's rendered as a child component.
