

## Simplify Community Feed

Clean up the community feed to keep only the essentials, making it feel more like a polished X/IG hybrid.

### What gets removed

**Engagement bar** -- Remove the Bookmark action. Keep only: Comment, Repost, Like, Share (4 actions, not 5).

**Right sidebar (TrendingSidebar)** -- Remove the Search box and the "Who to follow" section. Keep only "Trending Markets" in a cleaner format.

**Post composer** -- Remove the image upload button. Keep just the market-attach icon, character count, and Post button. Cleaner toolbar.

### What stays (unchanged)

- For You / Following sticky tabs
- Post composer (textarea + market attach + Post)
- All post types (text, market, repost, position)
- Inline market previews
- Comment, Repost, Like, Share engagement actions
- Inline comments with reply input
- Left sidebar: Following users + Top Creators
- Right sidebar: Trending Markets only

### Files changed

**`src/components/CommunityPost.tsx`**
- Remove the Bookmark entry from the `engagementActions` array (line ~153-159)
- 4 actions remain: Comment, Repost, Like, Share

**`src/components/TrendingSidebar.tsx`**
- Remove the Search input (lines 22-29)
- Remove the entire "Who to follow" section (lines 54-77)
- Keep only the "Trending Markets" card

**`src/pages/CommunityFeed.tsx`**
- Remove the Image upload button from the composer toolbar (lines 175-177)
- Keep market-attach select, character count, and Post button

### Technical details

- 3 files edited, no new files
- No dependencies added or removed
- All changes are deletions (removing UI elements), keeping the core social experience clean

