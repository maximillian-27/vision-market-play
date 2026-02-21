

# Make Pot Size Stand Out More

The pot currently uses `text-primary font-bold` which blends in with other green elements. I'll make it pop by using a solid green pill badge style -- a small colored background chip that visually separates the pot from surrounding text.

## Changes

### 1. MarketGridCard.tsx

**Desktop footer (line 291):** Replace plain text with a pill badge:
- From: `<span className="font-bold text-primary">{volume} Pot</span>`
- To: A span with `bg-primary/15 text-primary font-extrabold px-2 py-0.5 rounded-full text-[11px]` -- slightly larger text than surrounding stats, with a green-tinted background pill

**Mobile footer (line 467):** Same pill badge treatment.

### 2. MarketCard.tsx

**Stats row (line 92-93):** Same pill badge style applied:
- From: `<span className="flex items-center gap-1 font-bold text-primary">`
- To: Pill badge with `bg-primary/15 text-primary font-extrabold px-2 py-0.5 rounded-full`

### 3. HottestMarkets.tsx

**Trending sidebar (line 62):** Same pill badge:
- From: `<span className="font-bold text-primary">{market.volume} Pot</span>`
- To: Pill with `bg-primary/15 text-primary font-extrabold px-1.5 py-0.5 rounded-full text-[11px]`

## Why This Works

A colored background pill creates contrast against the card surface. The pot badge will be the only element with a filled background in the stats row, making it immediately the most visible piece of information without being garish. The `font-extrabold` + slightly bumped font size further separates it from the muted metadata around it.

