

## Polish Market Dialog -- Minimalism and Fun

The dialog is solid but still feels a bit form-like with numbered steps, too many labels, and the exciting parts (winnings, YES/NO) aren't prominent enough. Here's a focused cleanup pass.

### What changes

**1. Remove numbered steps and reduce labels**
- Drop "1. Pick your side" and "2. How many tickets?" headers -- the UI should be self-explanatory
- The YES/NO buttons speak for themselves; the ticket counter is obvious

**2. Make YES/NO buttons bigger and more exciting**
- Increase button height and font size -- these are the main interaction, make them feel like placing a bet
- Add a subtle emoji or icon inside (thumbs up/down or checkmark/x)

**3. Shrink community sentiment**
- Move the sentiment bar into a single subtle line under the pot badge instead of its own section with a header
- It's informational only, so it shouldn't take a full section

**4. Make the chart more compact**
- Reduce chart height from h-28 to h-20 -- it's supplementary info
- Remove the x-axis labels (Jan, Feb, etc.) to save space -- the trend line alone tells the story

**5. Make estimated winnings the hero of the right column**
- Increase the winnings number size significantly -- this is the exciting part
- Add a subtle green glow/background to make it pop
- Move it above the buy button with more visual weight

**6. Simplify ticket counter**
- Merge "Price per ticket" into the counter row instead of a separate card
- Show ticket price as subtle text next to the counter, not a full bordered row
- Remove the "Ticket price increases closer to the deadline" banner -- move this info into a tiny tooltip or one-liner under the price

**7. Clean up the cost breakdown**
- Combine "5 tickets x $0.50 = $2.50" and "Est. winnings" into a single clean card
- Less borders, less padding, less visual noise

**8. Buy button -- keep gradient but simplify text**
- Just show the ticket emoji + total: "Buy 5 tickets -- $2.50" (already good, minor text tweak)

### Technical details

**File modified:** `src/components/MarketDialog.tsx`

- Remove "1. Pick your side" and "2. How many tickets?" paragraph headers
- YES/NO buttons: increase from `py-3.5` to `py-5`, font from `text-base` to `text-lg`
- Community sentiment: collapse from its own section into a single-line element tucked under the pot/players metadata row
- Chart: reduce from `h-28` to `h-20`, remove XAxis component entirely for cleaner look
- Price per ticket: remove the bordered card, show as inline `text-xs text-muted-foreground` next to the ticket counter (e.g., "$0.50/ticket" right-aligned above the counter)
- Remove the "Ticket price increases" banner; add a small `(price increases over time)` parenthetical next to the price text
- Winnings summary: increase winnings font to `text-2xl`, add `bg-success/5 rounded-xl p-3` wrapper for visual emphasis
- Merge cost line and winnings into one compact card with less padding
- Remove the `Separator` between cost and winnings
- Total lines of change: ~80 lines modified within the existing component structure

