

# Remove blank space - match reference layout

## Change

In `src/components/FeaturedMarketSection.tsx`, remove `self-start` from the main card so both columns stretch to equal height, and ensure the right-side cards each take `flex-1` to fill the column evenly with no gaps.

## Technical detail

1. Remove `self-start` from the main card's className (line 74) so it stretches to match the right column height
2. Confirm the right-side cards already use `flex-1` so they split the vertical space evenly

Only one line changes in one file.

