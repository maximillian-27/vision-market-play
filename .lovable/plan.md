

# Ticket + Entry Bundle Model

## Overview
Change the model from "20 tickets = 1 draw entry" to "1 ticket = 1 entry." Every ticket purchased is automatically a draw entry. Update the price split to show **95% to pot, 2% to weekly draw, 3% platform fee**.

## Changes

### 1. WeeklyDrawCard (`src/components/WeeklyDrawCard.tsx`)

**Entry info section (lines 79-97):**
- Replace the "20 tickets = 1 entry" tooltip with a simple statement: "Every ticket = 1 entry"
- Change `MY_ENTRIES` display to reflect total tickets purchased this week (e.g., "3 entries this week")
- Remove the `ENTRY_COST = 20` constant since it's no longer needed
- Update the tooltip text to explain the bundle: "Every ticket you buy is also an entry into the weekly draw. 2% of your purchase funds the prize pool."

**"How it works" dialog (lines 174-181):**
- Update the "Entry" step text from "Every 20 tickets you buy earns 1 draw entry" to "Every ticket is a bundle -- you get a market ticket + a draw entry. No separate purchase needed."

**"Funding" step (lines 169-172):**
- Update to mention the 95/2/3 split explicitly

### 2. MarketDialog (`src/components/MarketDialog.tsx`)

**Pot split constants (lines 114-119):**
- Change from `[90% Winners, 2% Draw, 5% Comp, 3% Platform]` to `[95% Pot, 2% Weekly Draw, 3% Platform]` (3 segments instead of 4)

**Bundle label in the ticket purchase area (around line 551-601):**
- Add a small badge/label above or below the ticket counter that says something like: "Each ticket includes 1 draw entry" with a Trophy icon, reinforcing the bundle concept

**Buy button text (lines 638-643):**
- Change from "Buy 5 tickets" to "Buy 5 Tickets + Entries" to reinforce the bundle

**Summary breakdown (lines 604-622):**
- Add a row showing draw entries earned (equal to ticket count) with a Trophy icon, e.g., "Draw entries: 5"

**Pot split bar (lines 646-659):**
- Update to 3 segments: 95% Pot, 2% Weekly Draw, 3% Platform Fee

**Footer text (line 623-625):**
- Update from "Winners split 90% of the pot" to "95% goes to the pot -- 2% funds the weekly draw"

### 3. MarketsSidebar (`src/components/MarketsSidebar.tsx`)
- No changes needed; the weekly draw strip there just shows pot/countdown/entries which remain valid

## Technical Details

- Remove `ENTRY_COST` constant from WeeklyDrawCard
- Update `POT_SPLIT` array in MarketDialog from 4 items to 3: `[{label: "Pot", pct: 95}, {label: "Weekly Draw", pct: 2}, {label: "Platform", pct: 3}]`
- Update `estimatedWinningPool` calculation from `potValue * 0.9` to `potValue * 0.95` in MarketDialog
- Add a small informational row in the ticket purchase panel with a Trophy icon and text like "Includes {ticketCount} draw entries" between the ticket selector and the summary breakdown

