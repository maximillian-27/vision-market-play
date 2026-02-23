

# Simplified Search: Markets First, Users Optional

## Current State
The search bar in the header navigates to a full `/search` page showing markets, users, posts, and news in collapsible sections. It's overbuilt -- users primarily want to find markets quickly.

## New Approach: Inline Dropdown Search

Replace the navigate-to-page pattern with a **live dropdown** that appears as you type, right below the search bar in the header. No page navigation needed for quick searches.

### How it works

1. User clicks the search bar (header on desktop, search button on mobile)
2. A dropdown appears immediately with **two tabs**: "Markets" (default, selected) and "Players"
3. As the user types, results filter live in the dropdown
4. Clicking a result navigates directly to that market or player profile
5. Pressing Enter navigates to the full `/search` page for deeper results

### Dropdown Layout

```text
+------------------------------------+
| [search icon] Search...            |
+------------------------------------+
| [Markets]  [Players]               |  <-- tab pills
|                                    |
| Bitcoin $100K by 2025?        68%  |  <-- market rows
| NBA Championship winner?      32%  |     title + top odds
| Apple foldable iPhone?        23%  |
| Fed interest rate decision?   45%  |
|                                    |
| Press Enter for all results        |  <-- footer hint
+------------------------------------+
```

When "Players" tab is selected:

```text
+------------------------------------+
| [search icon] bitcoin              |
+------------------------------------+
| [Markets]  [Players]               |
|                                    |
| [avatar] Sarah Chen  @sarahchen   |  <-- user rows
|          Creator - 12.3K followers |
| [avatar] Alex Thompson            |
|          Player - 234 followers    |
+------------------------------------+
```

### What changes

**File: `src/components/Header.tsx`**
- Replace the plain `<form>` search with a new `<SearchDropdown />` component
- Remove the `onSubmit` navigate logic (moved into the new component)

**File: `src/components/SearchDropdown.tsx`** (new)
- Self-contained component with input, tab pills, and results list
- Uses `Popover` (already available) anchored to the input
- State: `query`, `activeTab` ("markets" | "players"), `isOpen`
- Filters mock data from the existing `allMarkets` and `allUsers` arrays (moved to a shared location or duplicated for now)
- Shows top 5 results per tab
- Market rows: title (truncated) + lead odds percentage
- Player rows: avatar + name + username + follower count + Creator/Player badge
- Footer: "Press Enter for all results" that navigates to `/search?q=...`
- Keyboard: Enter navigates to full search page, Escape closes

**File: `src/components/MobileNav.tsx`**
- Update the mobile search dialog to use the same `SearchDropdown` component (or replicate the tab pattern inside the existing dialog)

**File: `src/pages/Search.tsx`**
- Keep as-is for the full results page (accessed via Enter key)
- Remove posts and news sections to simplify (they add clutter) -- or keep them collapsed as they are now

### Technical Details

- The dropdown uses `Popover` from Radix (already installed) for positioning
- Mock data arrays for markets and users are defined inside the component (same pattern as Search.tsx)
- No new dependencies needed
- The dropdown closes on outside click (Popover default behavior) and on result click
- On mobile, the existing search dialog gets the same two-tab pattern added inside it
- Desktop: dropdown width matches input width (`w-full` on the popover relative to the form container)

