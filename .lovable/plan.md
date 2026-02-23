

# Settings Page Optimization

## Issues Found
1. **Trading jargon** -- "Trading Notifications", "Price Alerts", "positions", "trades" don't match the ticket/gambling model
2. **Missing features** -- No responsible gambling tools (deposit limits, self-exclusion, session reminders), no 2FA/security section, no referral/affiliate settings, no odds format preference
3. **Privacy labels outdated** -- "Show Active Positions" and "portfolio value" should reference entries and winnings
4. **Payment tab is thin** -- Only a card on file and a withdrawal dropdown; could include deposit limits and transaction history link

## Plan

### 1. Rename and update Notifications tab
- "Trading Notifications" becomes "Activity Alerts"
- "Price Alerts" becomes "Odds Changes" (when odds shift on your entries)
- "Market Resolution" stays (core feature)
- Add "Draw Results" notification (weekly draw outcomes)
- Add "Entry Confirmations" toggle (get notified when tickets are confirmed)

### 2. Update Privacy labels
- "Show Portfolio Value" becomes "Show Winnings"
- "Show Active Positions" becomes "Show Active Entries"  
- "your current trades" becomes "your current entries"

### 3. Add Responsible Gambling section (new card inside Privacy tab)
- Daily deposit limit (input with dollar amount)
- Weekly deposit limit
- Session time reminder toggle + interval selector (30min, 1hr, 2hr)
- Self-exclusion button (cool-off period: 24h, 7d, 30d)
- This is important for a gambling platform and shows legitimacy

### 4. Add Security card to Account tab
- Two-factor authentication toggle (with badge showing enabled/disabled)
- Change password button
- Active sessions info (last login device/time)

### 5. Enhance Payment tab
- Add crypto wallet address field (for crypto withdrawals)
- Add deposit limits display that ties into the responsible gambling settings
- Add link to "View transaction history" that navigates to Portfolio wallet tab

### 6. Add Preferences card to Account tab
- Odds display format selector: Percentage / Decimal / Fractional
- Default ticket quantity (1, 5, 10)
- These are small but useful for power users

## Technical Details

### File: `src/pages/Settings.tsx`

**New state additions:**
- `security: { twoFactor: false }` 
- `responsible: { dailyLimit: "", weeklyLimit: "", sessionReminder: false, reminderInterval: "1hr" }`
- `preferences: { oddsFormat: "percentage", defaultTickets: "1" }`

**Updated notification keys:**
- `priceAlerts` renamed to `oddsChanges` with label "Odds Changes" / "When odds shift on markets you've entered"
- Add `drawResults: true` with label "Draw Results" / "Weekly draw winners and your results"
- Add `entryConfirmations: true` with label "Entry Confirmations" / "When your ticket purchase is confirmed"

**Updated privacy labels:**
- "Show Portfolio Value" to "Show Winnings"
- "Show Active Positions" to "Show Active Entries"  
- Descriptions updated accordingly

**New cards (in order of appearance):**
1. Security card -- added to Account tab after Language & Region
2. Preferences card -- added to Account tab after Security
3. Responsible Gambling card -- added to Privacy tab before Danger Zone
4. Crypto wallet + transaction history link -- added to Payment tab

**New imports:**
- `Lock`, `Smartphone`, `Timer`, `Ticket`, `AlertTriangle` from lucide-react
- `useNavigate` from react-router-dom (for transaction history link)

