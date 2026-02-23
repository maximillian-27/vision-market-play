

## Clean Up Market Cards -- Gambling-First Design

The current cards have too many elements (win up to, share/bookmark buttons, volume labels). We'll strip them down to just the 5 essentials: Title, Pot, Players, Outcomes with percentages, and Timer.

### What changes

**1. Remove clutter**
- Remove "Win up to $X / ticket" line
- Remove share and bookmark hover buttons
- Remove "pot" label text (the dollar sign is enough context)
- Remove the image thumbnail on desktop (the title alone is sufficient for a compact card)

**2. New card layout (Desktop)**
```
┌─────────────────────────────┐
│ Will Bitcoin reach $100K?   │  <- title, 2 lines max
│                             │
│ $2.4M  ·  12,400 players    │  <- pot + players on one line
│                             │
│ [Yes 68%]  [No 32%]        │  <- outcome buttons (binary)
│  -- or --                   │
│ [Lakers 25%] [Celtics 32%] │  <- outcome buttons (multi)
│ +2 more                    │
│                             │
│ ⏱ 3 months                 │  <- timer, bottom-left
└─────────────────────────────┘
```

**3. New card layout (Mobile)**
Same structure but flat/borderless list item with slightly larger text.

**4. Outcome buttons refresh**
- Binary: side-by-side Yes/No with bold percentage, colored tint backgrounds
- Multi: compact pill-style rows showing label + percentage
- Slightly larger buttons for better tap targets

**5. Timer styling**
- Default: subtle muted text with clock icon
- Closing soon: amber pulsing text
- Awaiting/Resolved: appropriate status colors (same as now, just cleaner)

### Technical details

**File modified:** `src/components/MarketGridCard.tsx`

- Remove `Ticket`, `Bookmark`, `Share2` icon imports (no longer needed)
- Remove `formatWinUpTo` function entirely
- Remove `winUpTo` variable and all its usage
- Remove the share/bookmark hover buttons from the desktop footer
- Remove the image thumbnail `<img>` from the desktop "Image + Title" section
- Simplify the pot+players row: `$2.4M · 12,400 players` -- remove the "pot" label suffix
- Desktop footer simplified to just `{statusLine()}` (timer only)
- Mobile layout: same cleanup -- remove winUpTo line, remove image, keep title + pot + players + outcomes + timer
- Keep all click handlers, dialog integrations, and status logic unchanged

