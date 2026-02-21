

# CMO Request Sheet - Admin Dashboard Implementation

Adding a comprehensive **Marketing & GTM** section to the admin panel, plus implementing the technical SEO/tracking infrastructure that can be done directly in the codebase.

## What Can Be Implemented Now (in the codebase)

From the CMO's full request sheet, these items can be covered:

| CMO Request | What We'll Build |
|---|---|
| GTM (Google Tag Manager) | Add GTM snippet placeholders to `index.html` with configurable container ID |
| Event Tracking | Create a `src/lib/analytics.ts` utility that pushes events to the dataLayer (regstarted, regcomplete, depositstarted, depositcomplete, betcomplete, etc.) |
| Rich Snippets / Structured Data | Add JSON-LD schema markup to `index.html` for the platform |
| Meta Data improvements | Update `index.html` with canonical URL, improved OG tags |
| Admin: Marketing & GTM tab | New tab in Analytics & BI showing integration status, event tracking overview, SEO checklist, and channel/platform status |

Items like GA4 account setup, Search Console, Bing Webmaster, CRM platform selection, ESP, offsite SEO, social media management, and BI platform are **operational tasks** (not code) -- they'll appear as a checklist in the admin panel for your team to track progress.

**Note:** `robots.txt`, `sitemap.xml`, and `llms.txt` are already updated from the previous edit.

## Changes

### 1. `index.html` -- GTM + Structured Data + Meta Improvements
- Add GTM `<script>` placeholder in `<head>` with comment `<!-- Replace GTM-XXXXXXX with your container ID -->`
- Add GTM `<noscript>` iframe after `<body>` tag
- Add `<link rel="canonical">` tag
- Add JSON-LD structured data for the platform (WebSite + Organization schema)
- Keep existing meta tags, improve description

### 2. New file: `src/lib/analytics.ts` -- Event Tracking Utility
- `trackEvent(eventName, params)` function that pushes to `window.dataLayer`
- Pre-defined event constants: `REG_STARTED`, `REG_COMPLETE`, `DEPOSIT_STARTED`, `DEPOSIT_COMPLETE`, `BET_COMPLETE`, `PAGE_VIEW`
- Each event follows GA4 structure: eventCategory, eventAction, eventLabel, eventValue
- Ready to sync with GTM once container ID is configured

### 3. `src/components/admin/AdminAnalytics.tsx` -- Add "Marketing" Tab
Add a new **Marketing** tab to the existing Analytics & BI section with:

**Integrations Status Panel:**
- GTM: status badge (configured/not configured), container ID display, link to tagmanager.google.com
- GA4: status badge, measurement ID field, link to analytics.google.com
- Search Console: status badge, link to search.google.com/search-console
- Bing Webmaster: status badge, link to bing.com/webmasters
- Matomo/Metrica: optional status

**Event Tracking Overview:**
- Table of all tracked events (regstarted, regcomplete, depositstarted, depositcomplete, betcomplete)
- Columns: Event Name, Category, Last Fired, Count (24h)
- Mock data showing event activity

**SEO Checklist:**
- Checkboxes for: robots.txt (done), sitemap.xml (done), llms.txt (done), meta tags (done), canonical URLs, hreflang tags, structured data (done), alt tags, internal linking, SEO blocks
- Each item shows status (complete/pending/not started)

**Channel & Platform Tracker:**
- Cards for each platform/tool from CMO sheet: CRM, ESP, RAF, Affiliate Program, CDP, MMP, BI Platform, Social Media channels
- Status: Not Started / In Progress / Connected
- Quick links to recommended platforms (Zoho, Hubspot, Looker Studio, etc.)

**Social Media Presence:**
- Grid of social platforms: X, Discord, Twitch, Meta, TikTok, Reddit, Snap
- Per-GEO profiles needed: Balkan, English, Greek
- Status indicators for each

### 4. `src/components/admin/AdminSidebar.tsx` -- No changes needed
The "Analytics & BI" sidebar item already covers this since we're adding the Marketing tab within AdminAnalytics.

## Technical Details

### GTM Implementation (`index.html`)
The GTM snippets will use a placeholder `GTM-XXXXXXX` that needs to be replaced with the actual container ID once created. Two code blocks:
1. Head script (as high as possible)
2. Body noscript iframe (immediately after opening body tag)

### Event Tracking Utility (`src/lib/analytics.ts`)
```typescript
// Pushes to window.dataLayer for GTM pickup
export const trackEvent = (event: string, params?: Record<string, any>) => {
  window.dataLayer?.push({ event, ...params });
};
```
Pre-defined events follow the CMO's requested naming: `regstarted`, `regcomplete`, `depositstarted`, `depositcomplete`, `betcomplete`.

### Structured Data (JSON-LD)
WebSite + Organization schema for pollgy.com, enabling rich snippets in search results.

