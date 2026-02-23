

# Remove Gap Between Header and Filters on Mobile

## Problem
The `space-y-1.5` class on the parent wrapper (line 687 in Feed.tsx) adds vertical spacing above the filters on mobile, creating a visible gap between the fixed header and the category pills row.

## Solution
Two small changes:

### 1. Feed.tsx (line 687)
- Change `space-y-1.5` to `sm:space-y-1.5` so the inter-section spacing only applies on desktop
- The mobile sections will use their own margin/padding to control spacing individually

### 2. Feed.tsx (line 692)
- Add `mt-1.5` to the mobile Weekly Draw + Hero container so the gap only appears between filters and content below, not above filters

This ensures the sticky filter bar sits flush against the header bottom on mobile while preserving desktop spacing.

