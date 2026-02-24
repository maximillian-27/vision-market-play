

# Improved Market Creation Flow

Redesign the `CreateMarketButton.tsx` component with a cleaner 4-step flow that feels intuitive and professional.

## New Flow (4 Steps)

```text
Step 1: Create        Step 2: AI Review      Step 3: Fix           Step 4: Post
+-----------------+   +-----------------+    +-----------------+   +-----------------+
| Question        |   | Analyzing...    |    | AI suggestions  |   | Free Post       |
| Description     |   |                 |    | inline in form  |   |   or            |
| Category        |   | Score: 8/10     |    | Edit fields     |   | Promote $1/day  |
| Outcomes        |   | Suggestions x3  |    | Re-check button |   |                 |
| End Date        |   |                 |    |                 |   | Duration picker |
| Resolution      |   |                 |    |                 |   | Total cost      |
+-----------------+   +-----------------+    +-----------------+   +-----------------+
```

## Step-by-Step Design

### Step 1 -- Create Market (single page form)
Combine the current 3 sub-steps into one clean scrollable form. Fields:
- Market Question (required)
- Description (required)
- Category dropdown (required)
- Outcomes (min 2, max 10, default Yes/No)
- End Date (required)
- Resolution Criteria (required)
- Resolution Source (optional)

This removes friction -- one page instead of three clicks.

### Step 2 -- AI Review (automatic)
- Clicking "Next" on Step 1 automatically triggers the AI check (no separate "Check with AI" button needed).
- Shows a loading state with a Sparkles animation and "Reviewing your market..." text.
- Once done, displays:
  - A quality score (e.g., "8/10") in a large circular badge.
  - A list of recommendations, each with type (success/warning/suggestion) and an icon.
  - If score is perfect: green "All Good" state with confetti-style check.

### Step 3 -- Fix Issues (conditional)
- Only appears if AI found warnings or suggestions (skipped if all clear).
- Shows the same form as Step 1, but with the problematic fields highlighted (yellow/blue border) and the AI suggestion shown inline below each flagged field.
- A "Re-check" button at the bottom runs AI review again.
- If user fixes issues, re-check updates the score.

### Step 4 -- Post / Promote
- Two clear options presented as selectable cards:
  - **Free Post** -- "List your market for free. It will appear in the feed organically." (default selected)
  - **Sponsored Post** -- "$1/day -- Boost visibility with promoted placement." With a duration selector (1-30 days slider or input) and a total cost display (e.g., "7 days = $7").
- Market summary shown above the options (compact: question, category, outcomes, end date).
- "Post Market" button at bottom.

### Success State
- Clean confirmation with checkmark.
- If sponsored: "Your market is live and promoted for X days!"
- If free: "Your market is live! It will appear in the feed shortly."

## Technical Details

### File changes
**`src/components/CreateMarketButton.tsx`** -- Full rewrite of the component:

- Change step count from 3 to 4, update progress bar to 4 segments.
- Step labels: "Create" / "AI Review" / "Fix" / "Post".
- Add new state:
  - `aiScore: number` (0-10)
  - `promotionType: "free" | "sponsored"`
  - `promotionDays: number` (default 1)
  - `hasIssues: boolean` (derived from recommendations)
- Step 1: Merge all form fields into a single scrollable section with compact spacing.
- Step 2: Auto-trigger `handleAICheck` via `useEffect` when step becomes 2. Show loading animation, then score + recommendations.
- Step 3: Re-render the form fields but only show ones flagged by AI, with inline suggestion text and highlighted borders. Include "Re-check with AI" button.
- Step 4: Two selectable cards (free vs sponsored) using a simple radio-style selection with card borders. Sponsored card includes a day input (number input, 1-30) and shows `$${days}` total. Compact market summary at top.
- Navigation logic: Step 2 "Next" skips to Step 4 if no issues found; otherwise goes to Step 3.
- Step 3 "Re-check" stays on Step 3 but re-runs AI; "Next" goes to Step 4.
- Update success message based on promotion choice.

### UI Components Used
- Existing: `Dialog`, `Input`, `Textarea`, `Select`, `Button`, `Label`
- New usage of `Slider` from `@radix-ui/react-slider` (already installed) for promotion days
- `Switch` component for toggling sponsored mode (already available)

### Visual Polish
- Step indicator uses labeled dots instead of plain bars (e.g., small text under each dot: Create / Review / Fix / Post)
- AI score displayed in a circular progress ring using SVG
- Sponsored card has a subtle gradient border when selected
- Compact spacing throughout to keep everything above the fold on mobile
