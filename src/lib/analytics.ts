// Analytics Event Tracking Utility
// Pushes events to window.dataLayer for GTM pickup
// Syncs with GA4 when configured via GTM

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

// Pre-defined event names (CMO request)
export const EVENTS = {
  REG_STARTED: 'regstarted',
  REG_COMPLETE: 'regcomplete',
  DEPOSIT_STARTED: 'depositstarted',
  DEPOSIT_COMPLETE: 'depositcomplete',
  BET_COMPLETE: 'betcomplete',
  PAGE_VIEW: 'pageview',
  FORM_SUBMISSION: 'formsubmission',
} as const;

/**
 * Push a custom event to the GTM dataLayer.
 * 
 * @param event - Event name (use EVENTS constants)
 * @param params - Optional parameters following GA4 structure:
 *   - eventCategory: Category of the event
 *   - eventAction: Specific action taken
 *   - eventLabel: Label for additional context
 *   - eventValue: Numeric value associated with the event
 *   - Any other custom parameters
 */
export const trackEvent = (
  event: string,
  params?: {
    eventCategory?: string;
    eventAction?: string;
    eventLabel?: string;
    eventValue?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  }
};

// Convenience helpers
export const trackRegStarted = () =>
  trackEvent(EVENTS.REG_STARTED, { eventCategory: 'registration', eventAction: 'started' });

export const trackRegComplete = () =>
  trackEvent(EVENTS.REG_COMPLETE, { eventCategory: 'registration', eventAction: 'complete' });

export const trackDepositStarted = (amount?: number) =>
  trackEvent(EVENTS.DEPOSIT_STARTED, { eventCategory: 'deposit', eventAction: 'started', eventValue: amount });

export const trackDepositComplete = (amount?: number, transactionId?: string) =>
  trackEvent(EVENTS.DEPOSIT_COMPLETE, { eventCategory: 'deposit', eventAction: 'complete', eventValue: amount, transactionId });

export const trackBetComplete = (marketId?: string, outcome?: string, tickets?: number, amount?: number) =>
  trackEvent(EVENTS.BET_COMPLETE, { eventCategory: 'betting', eventAction: 'complete', eventLabel: outcome, eventValue: amount, marketId, tickets });
