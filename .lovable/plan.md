

## Mobile Community Feed Improvements

### Current Issues
- The post composer takes up significant screen space at the top, pushing content down
- Both sidebars (Following, Trending Markets) are hidden on mobile with no replacement -- users miss key social context
- The tab bar is functional but plain
- No trending content discovery on mobile
- Posts need tighter mobile-optimized spacing
- No bottom padding to account for the floating mobile nav bar

### Changes Overview

**1. Replace inline composer with a Floating Action Button (FAB)**
- Hide the full composer section on mobile (keep it on desktop)
- Add a floating "+" button above the mobile nav bar (bottom-20 right-4)
- Tapping the FAB opens a bottom Sheet with the full composer (market selector, character count, post button)
- Saves ~120px of vertical space, letting users see content immediately

**2. Add horizontal scrollable "Top Traders" avatars row**
- Below the tab bar, add an Instagram-style horizontally scrollable row of creator avatars
- Shows the top traders from the FollowingSidebar data (name + avatar + profit badge)
- Tapping navigates to their profile
- Only visible on mobile, hidden on desktop (where the sidebar handles this)

**3. Add a "Trending Markets" horizontal card strip**
- Below the avatars row, show a compact horizontally scrollable row of 3 trending market mini-cards
- Each card: small image, truncated title, YES/NO prices
- Tapping opens the market dialog
- Replaces the hidden MarketsSidebar content on mobile

**4. Tighten mobile post layout**
- Reduce avatar size from 40px to 36px on mobile
- Reduce left margin on engagement bar from 52px to 48px on mobile
- Reduce post padding slightly for denser feel
- Add `pb-24` to the feed container to clear the floating nav bar

**5. Polish the tab bar on mobile**
- Add a subtle top border and reduce vertical padding slightly on mobile
- Ensure sticky positioning accounts for mobile header height

### Technical Details

**Files modified:**

**`src/pages/CommunityFeed.tsx`**
- Import `useIsMobile` hook, `Sheet`/`SheetContent`/`SheetTrigger` components, and `Plus` icon
- Add FAB state (`composerOpen`) and Sheet-based mobile composer
- Wrap the existing inline composer in a `hidden sm:block` wrapper
- Add `TopTradersRow` component (horizontal scroll of avatars, mobile-only)
- Add `TrendingMarketsRow` component (horizontal scroll of market cards, mobile-only)
- Add `pb-24` to the feed container for bottom nav clearance

**`src/components/CommunityPost.tsx`**
- Add responsive classes: avatar `h-9 w-9 sm:h-10 sm:w-10`
- Engagement bar margin: `ml-[48px] sm:ml-[52px]`
- Post padding: `px-3 sm:px-4`

### Mobile Layout Hierarchy (top to bottom)
```text
[Sticky Tab Bar: For You | Following]
[Top Traders Row: scrollable avatars]
[Trending Markets: scrollable mini-cards]
[Feed Posts...]
                              [+ FAB]
[Bottom Nav Bar]
```

