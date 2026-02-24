

## Improve Mobile Weekly Draw Banner

### Problem
The current banner is a single cryptic row showing "$48,600", a countdown, and an entry count -- but there's no label explaining what this is or why users should care. New users won't understand what "3 entries" means or what happens when the timer runs out.

### Solution: Two-row banner with context, still compact

Redesign the `MobileWeeklyDrawBanner` button from a single row into a compact two-row layout that stays slim (~56px) but communicates much more clearly:

```text
+--------------------------------------------------+
| [Trophy]  WEEKLY DRAW  ·  3d 14h     [3 entries] |
|   $48,600 prize pool — tap to learn more    [->] |
+--------------------------------------------------+
```

**Row 1**: Trophy icon, "WEEKLY DRAW" label (uppercase, small), a dot separator, countdown timer, and entry badge on the right.

**Row 2**: Large bold pot amount, followed by a subtle "prize pool -- tap to learn more" hint text, and a chevron arrow on the far right.

### Changes

**File: `src/pages/Feed.tsx` -- `MobileWeeklyDrawBanner` component (~lines 558-576)**

- Replace the single `flex items-center` row with a two-row layout using `flex flex-col`
- Top row: "WEEKLY DRAW" label text (tiny uppercase tracking), dot separator, countdown -- entries badge on the right
- Bottom row: Pot amount (bold, larger), "prize pool" label, subtle "tap for details" text, chevron
- Keep the same gradient background, border, glow, Dialog trigger behavior
- Total height stays compact (~56px vs current ~40px, a small tradeoff for much better clarity)

The dialog content (distribution bar, tabs, how-it-works, previous winners) stays exactly the same -- only the banner strip changes.

