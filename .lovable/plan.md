
# Fix: Remove Gap Between Header and Filters on Mobile

## Root Cause
The Feed.tsx wrapper (line 686) has `-mt-14 pt-14` -- the `-mt-14` pulls the container up to cancel the main element's `pt-14`, but then `pt-14` adds 56px of internal padding back, pushing the filters down. This creates the visible empty space between the header and the category pills.

## Fix (single line change in `src/pages/Feed.tsx`)

**Line 686** -- Change the wrapper classes so `-mt-14 pt-14` only applies on desktop (where it may be needed for spacing), and on mobile there is zero top padding:

```
Before: -mt-14 pt-14 sm:mt-0 sm:pt-0
After:  sm:-mt-14 sm:pt-14
```

Wait -- actually the logic is inverted. Currently it does `-mt-14 pt-14` on all screens then resets on `sm:`. Since the main already has `pt-14`, on mobile we just need no extra offset. Removing `-mt-14 pt-14` on mobile means the content starts right at the top of the main content area (which already has `pt-14` from App.tsx).

**Change line 686 from:**
```
className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 pb-24 sm:pb-0 -mt-14 pt-14 sm:mt-0 sm:pt-0"
```
**To:**
```
className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 pb-24 sm:pb-0"
```

This removes the `-mt-14 pt-14 sm:mt-0 sm:pt-0` entirely since the main wrapper in App.tsx already provides the correct `pt-14` offset on all screen sizes. The extra negative margin / padding trick was unnecessary and was the source of the gap.
