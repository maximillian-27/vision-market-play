

# Pot Size Display Redesign — Casino-Inspired, Modern & Clean

Elevating the pot size presentation across market cards to feel like a prize pool / jackpot display while staying professional.

---

## Design Concept

Instead of plain text in the footer, the pot becomes a **branded gradient pill** that scales visually with pot size — bigger pots get more visual weight, creating excitement and drawing the eye.

### Pot Size Tiers

| Tier | Threshold | Style |
|------|-----------|-------|
| Standard | Under $100K | Solid muted pill, subtle styling |
| Hot | $100K - $999K | Brand gradient pill (green-to-blue), bold |
| Jackpot | $1M+ | Brand gradient pill + subtle shimmer animation, larger text |

---

## Visual Treatment

### Desktop Footer
- Replace plain text pot with a **gradient pill**: `bg-gradient-to-r from-pollgy-green to-pollgy-blue` with white text
- Small "POT" label in uppercase tracking-wide before the dollar amount
- For jackpot-tier ($1M+): add a CSS shimmer/glint animation that sweeps across the pill every few seconds
- Standard tier uses a softer version: `bg-primary/10 text-primary` pill

### Mobile Footer
- Same tiered pill treatment, slightly larger for touch-friendliness
- "POT" label + amount in the gradient pill

### Example rendering:
```text
Standard:  [ POT $45K ]        (muted pill, primary color text)
Hot:       [ POT $890K ]       (gradient pill, white text, bold)  
Jackpot:   [ POT $2.4M ]       (gradient pill, white text, shimmer animation)
```

---

## Technical Details

### New CSS Animation (index.css)
Add a `shimmer` keyframe animation — a diagonal light sweep effect using a pseudo-element or gradient overlay. Subtle, runs every 3 seconds.

### MarketGridCard.tsx Changes
- Create a helper function `getPotTier(pot)` returning "standard" | "hot" | "jackpot"
- Create a `PotBadge` inline component that renders the appropriate styled pill
- Replace the plain `{potDisplay}` text in both desktop and mobile footers with the new `PotBadge`
- Desktop: rendered in the stats footer row
- Mobile: rendered in the footer row, replacing "Pot {potDisplay}" text

### Files Modified

| File | Changes |
|------|---------|
| MarketGridCard.tsx | Add `getPotTier` helper, `PotBadge` component, replace pot text in both layouts |
| index.css | Add `@keyframes shimmer` and `.pot-shimmer` utility class |

**Total: 2 files modified**

