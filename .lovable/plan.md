

## Community Feed Overhaul -- X-Style Redesign

Transform the Community Feed into a true social timeline that feels like X (Twitter), optimized for interaction around prediction markets.

### Current Problems
- Every post forces a full MarketGridCard embed -- too heavy and repetitive
- PageHeader wastes vertical space (conflicts with density memory)
- No "For You" / "Following" tab navigation like X
- Missing core social actions: repost, bookmark
- No mixed content types -- every post looks identical
- No text-only posts or varied post formats
- Engagement bar missing repost action
- Right sidebar (HottestMarkets) doesn't add social value -- should be "Trending" or "Who to follow"

### What Changes

**1. Replace PageHeader with X-style tab bar**
- Remove the "Community" title + subtitle
- Add sticky tabs at top: "For You" | "Following"
- Clean, borderless tabs matching X's aesthetic
- Sticky below header on scroll

**2. Diversify post types in the feed**
- **Text-only posts**: Opinions without a market attached
- **Market share posts**: Text + compact inline market preview (not a full MarketGridCard)
- **Repost posts**: Shows "username reposted" with original post nested
- **Position posts**: "I just bought YES on [market]" auto-generated posts
- Each post type has a slightly different visual treatment but same base layout

**3. Compact inline market embed (replace full MarketGridCard)**
- Instead of the heavy MarketGridCard, create a lightweight `InlineMarketPreview`:
  - Single row: market image (24px) + title (truncated) + Yes/No prices as small pills
  - Wrapped in a rounded border, clickable to open market
  - Takes ~40px height instead of ~180px
  - Much more X-like (similar to how X shows link previews)

**4. Upgrade engagement bar to match X**
- Actions in order: Comment, Repost, Like, Bookmark, Share
- Each with icon + count
- Like turns red on click, repost turns green
- Hover states with colored backgrounds (red for like, green for repost)
- All inline, evenly spaced

**5. Replace right sidebar with "Trending" + "Who to follow"**
- Top section: "Trending Markets" -- 3-4 market titles with category + volume (no images, text-only like X trending)
- Bottom section: "Who to follow" -- 3 suggested users with follow button
- Matches X's right sidebar pattern exactly

**6. Improve post composer**
- Remove the card border -- make it borderless like X
- Avatar + textarea inline, no card wrapper
- Bottom toolbar: image, market attach, character count, Post button
- Thin bottom border separator only

**7. Polish comment threads**
- Show 2-3 recent comments inline (collapsed) without clicking
- "Show more replies" link
- Threaded reply lines (vertical connector like X)

### File Changes

**`src/pages/CommunityFeed.tsx`** (major rewrite)
- Remove PageHeader
- Add "For You" / "Following" sticky tabs
- Diversify mock posts with different types (text-only, market-share, repost, position)
- Replace MarketGridCard usage with new InlineMarketPreview
- Borderless composer
- Updated engagement bar with all 5 actions + active states

**`src/components/InlineMarketPreview.tsx`** (new)
- Lightweight market preview component
- Shows: 24px image, truncated title, Yes/No price pills
- Single clickable row in a subtle bordered container
- Opens MarketDialog on click

**`src/components/CommunityPost.tsx`** (new)
- Extracted post component for cleaner code
- Handles all post types: text-only, market-share, repost, position
- Contains engagement bar with like/repost/bookmark state
- Shows inline comments preview

**`src/components/TrendingSidebar.tsx`** (new, replaces HottestMarkets on community page)
- "Trending Markets" section: category label + market title + volume (text-only, no images)
- "Who to follow" section: 3 users with avatar, name, username, Follow button
- Matches X right sidebar pattern

### Mock Data Additions

New post types added to mock data:
```text
- Text-only: "Hot take: AI markets are overpriced right now. The hype cycle is peaking."
- Position: "Sarah Chen bought YES on 'Will Bitcoin reach $100K'"  
- Repost: James reposted Maria's Apple foldable take
- Market share: existing format but with InlineMarketPreview instead of full card
```

### Visual Reference

```text
+------------------+-------------------------+------------------+
| Following        | [For You] [Following]   | Trending Markets |
| Sidebar          |                         |                  |
| (unchanged)      | [Avatar] What's on your | 1. Crypto        |
|                  |  mind?  [img][mkt][Post] |   Bitcoin $100K  |
|                  | ________________________|   $2.4M volume   |
|                  |                         |                  |
|                  | @alexthompson . 2h      | 2. Politics      |
|                  | This is actually more   |   Fed Rate...    |
|                  | likely than people...   |   $3.1M volume   |
|                  | +---------------------+ |                  |
|                  | | BTC img | Bitcoin.. | | Who to follow    |
|                  | |     Yes 68% No 32%  | | [avatar] Name    |
|                  | +---------------------+ |   @user [Follow] |
|                  | Reply  Repost  Like  BM | [avatar] Name    |
|                  | ________________________|   @user [Follow] |
|                  |                         |                  |
|                  | @davidkim . 6h          |                  |
|                  | Hot take: AI markets    |                  |
|                  | are way overpriced...   |                  |
|                  | (no market attached)    |                  |
|                  | Reply  Repost  Like  BM |                  |
+------------------+-------------------------+------------------+
```

### Technical Notes
- All state (likes, reposts, bookmarks) managed locally with useState
- InlineMarketPreview reuses MarketDialog for click-through
- Post types distinguished by a `type` field on CommunityPost interface
- No new dependencies needed
- Existing FollowingSidebar remains unchanged (left side)

