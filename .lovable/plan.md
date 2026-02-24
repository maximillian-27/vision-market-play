

## Make Mobile Community Menu Solid White (Not Transparent)

### What Changes

**1. Sticky Tab Bar -- solid white background**

The "For You / Following" tab bar currently uses `bg-background/80 backdrop-blur-md`, making it semi-transparent with a blur effect. This will be changed to a solid `bg-background` (which resolves to white in light mode, dark in dark mode) with no transparency or blur -- matching the design convention used across the rest of the app.

**2. Bottom Navigation -- confirm solid styling**

The bottom floating nav (`MobileNav`) already uses `bg-background` (solid). No changes needed there -- it already matches the reference style.

### Technical Details

**File: `src/pages/CommunityFeed.tsx`**

- Line 130: Change the sticky tab bar container class from `bg-background/80 backdrop-blur-md` to `bg-background` (solid, no blur, no transparency)

That is the only change needed -- one class swap on one line.

