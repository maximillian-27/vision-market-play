

# Leaderboard Overhaul

## Current Problems

1. **Trading terminology**: "Traders", "trades", "accuracy" -- should be "Players", "markets entered", "win rate"
2. **Creator stats show "volume"** -- should be "Pot Generated"
3. **No time period selector** -- users can't see who's hot this week vs all-time
4. **No "Your Rank" context** -- users have no idea where they stand
5. **Only 5 entries per list** -- feels thin, no option to see more
6. **Challenges section is disconnected** -- "points" reward system that leads nowhere and uses stale trading language ("Trade over $1000 in volume")
7. **No "hot streak" or momentum indicators** -- in gambling, streaks matter and are exciting
8. **Two sort options (Earnings/Accuracy) but no time filter** -- the most important filter for a leaderboard

## New Structure

### 1. Your Rank Card (top of page, always visible)
A compact card showing the logged-in user's current standing:
- Rank position with movement indicator (up/down arrow + how many spots moved)
- Total winnings, win rate, markets entered
- "You're in the top 8% of players" motivational line

### 2. Players Tab (replaces "Traders")

**Time period selector**: This Week / This Month / All Time (default: This Week -- keeps it dynamic and competitive)

**Sort options**: Winnings / Win Rate / Streak (replaces "Earnings" / "Accuracy")

**Extended list**: 10 players instead of 5

**Each player row shows**:
- Rank badge (gold/silver/bronze for top 3)
- Avatar + name
- Primary stat based on sort (winnings amount, win rate %, or streak count)
- Secondary stats: markets entered, win rate (when not primary)
- Movement indicator: up/down/new arrow showing rank change from previous period
- Hot streak badge: fire icon + "5W" if they have an active winning streak

### 3. Creators Tab

**Time period selector**: same as Players

**Sort options**: Pot Generated / Markets Created / Avg Pot

**Each creator row shows**:
- Rank + avatar + name
- Primary stat based on sort
- Secondary: markets created, total players attracted
- Movement indicator

### 4. Highlights Section (replaces Challenges)
Instead of a disconnected "challenges" system, show real-time exciting stats:

**Hot Streaks** -- Players currently on the longest winning streaks (fire icon, streak count, last win)

**Biggest Wins This Week** -- Individual winning payouts that were large (player name, market title, amount won)

**Rising Stars** -- Players who climbed the most ranks this period

This is more engaging than static challenges because it's dynamic, real, and shows actual platform activity.

## Technical Details

### File: `src/pages/Community.tsx` (full rewrite)

**Removed**:
- `topEarners` / `mostAccurate` arrays with trading terminology
- `topCreators` with "volume" field
- `challenges` array entirely
- `communityFilter` state

**New state**:
- `timePeriod`: "week" | "month" | "all" (default "week")
- `playerSort`: "winnings" | "winRate" | "streak" (default "winnings")
- `creatorSort`: "pot" | "markets" | "avgPot" (default "pot")

**New mock data**:
- `players` array (10 entries) with fields: name, avatar, rank, winnings, winRate, marketsEntered, streak, rankChange (+2, -1, 0, "new"), period-aware
- `creators` array (10 entries) with: name, avatar, rank, potGenerated, marketsCreated, totalPlayers, avgPot, rankChange
- `hotStreaks` array (3 entries): player name, streak count, last market won
- `biggestWins` array (3 entries): player name, market title, amount won
- `risingStars` array (3 entries): player name, rank change (e.g., "+47 spots"), previous rank

**New imports**:
- `Flame, ArrowUp, ArrowDown, Star, Clock, Medal` from lucide-react
- `Progress` from ui/progress (for streak visualization)

**Key UI patterns**:
- Time period as pill buttons (same pattern as earnings period selector on Creator Dashboard)
- Sort options as Badge toggles (same existing pattern)
- Rank change shown as small green/red arrow + number next to rank badge
- Streak badge: small fire icon + count inline with player stats
- "Your Rank" card uses a subtle primary border highlight
- Highlights section uses compact horizontal cards instead of the tall challenge cards

**Layout**: Keeps existing 3-column layout (ActivitySidebar | Content | MarketsSidebar)

