

# Mobile Optimization: Every Page Tailored for 390px

## Issues Found

After reviewing all 8 main pages on a 390px viewport, these are the consistent problems:

1. **PageHeader wastes 50-60px** on Leaderboards, News, Settings, and Portfolio -- the tab structure or page context already tells users where they are
2. **Leaderboard filters wrap to 2 rows** instead of fitting in a single scrollable strip
3. **Leaderboard list items truncate names** and have oversized avatars/gaps for mobile
4. **News page** has generous padding that wastes vertical space
5. **Profile page** has oversized balance text ($18,450 at text-3xl) and tall cover gradient
6. **Settings page** shows only icons for tabs (no labels) which is confusing
7. **Community Feed** composer takes significant space above fold
8. **Market Detail** has a double header (main header + sticky "Market" bar) eating 112px of vertical space

## Changes by Page

### 1. Feed (`/`) -- Already good, minor tweaks
- No major changes needed -- the hero, filters, and flat list are well-tuned

### 2. Leaderboards (`/community`) 
- **Hide PageHeader on mobile** (title + subtitle) -- the "Players | Creators" tabs provide enough context
- **Merge time period + sort pills into one scrollable row** with a divider between them, preventing the 2-row wrap
- **Shrink avatars** from h-9 to h-7 on mobile
- **Remove "Top Players" / "Top Creators" card headers** on mobile -- redundant with tab
- **Compact list row padding** from py-3 to py-2.5
- **Abbreviate secondary stats** on mobile (e.g., "87% . 342 mkts" instead of "87% win rate . 342 entered")
- **Highlights section**: make cards more compact by reducing card header/content padding

### 3. News (`/news`)
- **Hide PageHeader on mobile** -- the "News" tab in the bottom nav already indicates context
- **Reduce article padding** from py-5 to py-3.5 and tighten spacing
- **Tighten the NewsFilters** top spacing

### 4. Community Feed (`/community-feed`)
- **Compact the composer** on mobile: reduce avatar from h-10 to h-8, shrink textarea min-height
- Already looks solid otherwise

### 5. Profile (`/profile`)
- **Reduce cover gradient height** from h-24 to h-16 on mobile
- **Shrink avatar** from h-24 to h-20 on mobile
- **Reduce balance card text** from text-3xl to text-2xl on mobile
- **Reduce action button spacing** -- tighter gap

### 6. Portfolio (`/portfolio`)
- **Hide PageHeader on mobile** -- the Portfolio context is clear from the balance cards
- Already well-optimized otherwise

### 7. Settings (`/settings`)
- **Hide PageHeader on mobile**
- **Show short labels alongside tab icons** on mobile (Account, Alerts, etc.) -- currently only icons show which is confusing
- **Reduce card padding** slightly for mobile density

### 8. Market Detail (`/market/:id`)
- **Remove the sticky sub-header** ("Market" title bar) on mobile since the back arrow can be placed directly on the hero image overlay -- saves 48px
- **Reduce hero image aspect ratio** on mobile for less scroll
- **Tighten metric strip spacing**

## Technical Details

### Files to modify:

| File | Changes |
|------|---------|
| `src/pages/Community.tsx` | Hide PageHeader on mobile, merge filter rows, compact list items, shrink avatars, abbreviate stats, compact highlights |
| `src/pages/News.tsx` | Hide PageHeader on mobile, tighten article padding |
| `src/pages/CommunityFeed.tsx` | Compact composer avatar and textarea on mobile |
| `src/pages/Profile.tsx` | Reduce cover height, avatar size, balance text on mobile |
| `src/pages/Portfolio.tsx` | Hide PageHeader on mobile |
| `src/pages/Settings.tsx` | Hide PageHeader on mobile, show tab labels on mobile |
| `src/pages/MarketDetail.tsx` | Remove sticky sub-header on mobile, reduce hero aspect ratio |
| `src/components/PageHeader.tsx` | Add optional `hideOnMobile` prop or use responsive classes at call sites |

### Pattern used:
All changes use Tailwind responsive prefixes (`sm:` for desktop, plain for mobile) and the existing `useIsMobile()` hook where conditional logic is needed. No new dependencies.

### Approach:
- Use `hidden sm:block` on PageHeaders to hide them on mobile
- Use `sm:h-9 h-7` patterns for avatar sizing
- Use `isMobile` hook for conditional text abbreviation in leaderboard stats
- All changes are additive responsive overrides -- desktop remains untouched

