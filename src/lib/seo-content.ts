/**
 * Centralized SEO content blocks configuration.
 * Each page/category gets an array of sections with rich content.
 * 
 * Content types:
 * - "text": A paragraph of text
 * - "link": An internal link with title attribute
 * - "image": An image with alt and title attributes
 * - "video": A video embed with title attribute
 * - "heading": A sub-heading within the section
 */

export interface SeoLink {
  type: "link";
  href: string;
  text: string;
  title: string;
}

export interface SeoImage {
  type: "image";
  src: string;
  alt: string;
  title: string;
  width?: number;
  height?: number;
}

export interface SeoVideo {
  type: "video";
  src: string;
  title: string;
  poster?: string;
  posterAlt?: string;
}

export interface SeoText {
  type: "text";
  content: string;
}

export interface SeoHeading {
  type: "heading";
  content: string;
  level?: 2 | 3 | 4;
}

export type SeoContentItem = SeoText | SeoLink | SeoImage | SeoVideo | SeoHeading;

export interface SeoSection {
  /** The accordion trigger title */
  title: string;
  /** Array of content items rendered in order */
  items: SeoContentItem[];
}

export interface SeoBlockConfig {
  /** Main heading for the entire SEO block area */
  heading: string;
  /** Sections rendered as accordion items */
  sections: SeoSection[];
}

// ─── Page-specific SEO content ───────────────────────────────────

export const seoContent: Record<string, SeoBlockConfig> = {
  feed: {
    heading: "Prediction Markets — How It Works",
    sections: [
      {
        title: "What are prediction markets?",
        items: [
          {
            type: "text",
            content:
              "Prediction markets are platforms where participants trade on the outcomes of real-world events. By buying and selling shares tied to specific outcomes, the market collectively generates probabilities that are often more accurate than polls or expert forecasts.",
          },
          {
            type: "text",
            content:
              "On Pollgy, each market is created around a clear question with a defined resolution date. Prices reflect the crowd's estimated probability — if a share trades at $0.68, the market believes there's a 68% chance the event will happen.",
          },
          {
            type: "link",
            href: "/community",
            text: "Join the community to discuss markets",
            title: "Pollgy community — discuss prediction markets with other traders",
          },
        ],
      },
      {
        title: "How to start trading",
        items: [
          {
            type: "text",
            content:
              "Getting started is simple: create an account, deposit funds via crypto (card & wire coming soon), and browse the available markets. Each market card shows the current probability, trading volume, and time remaining.",
          },
          {
            type: "text",
            content:
              'Choose "Yes" if you believe an event will happen or "No" if you think it won\'t. Your potential profit depends on how far the current price is from 100%. The closer to resolution, the more the price moves based on new information.',
          },
          {
            type: "link",
            href: "/portfolio",
            text: "View your portfolio and active positions",
            title: "Pollgy portfolio — track your prediction market positions and P&L",
          },
        ],
      },
      {
        title: "Market categories",
        items: [
          {
            type: "text",
            content:
              "Pollgy hosts markets across a wide range of categories: Crypto, Finance, Politics, Sports, Tech, and Entertainment. Each category has dedicated filters so you can quickly find the topics you care about most.",
          },
          {
            type: "text",
            content:
              "Creators can propose new markets on any topic. Once approved, the market goes live and anyone can trade on it. Top creators earn fees from the markets they create, incentivizing high-quality, well-researched questions.",
          },
          {
            type: "link",
            href: "/creator-dashboard",
            text: "Become a market creator",
            title: "Pollgy creator dashboard — create and manage prediction markets",
          },
        ],
      },
      {
        title: "Security & resolution",
        items: [
          {
            type: "text",
            content:
              "Every market has a clearly defined resolution source and criteria. When the event occurs (or the deadline passes), the market resolves based on the stated criteria. There's a dispute window where participants can challenge the outcome if needed.",
          },
          {
            type: "text",
            content:
              "Funds are held securely on-chain. Deposits and withdrawals use standard stablecoins (USDC, USDT) on multiple networks including Polygon, Ethereum, and Solana for fast, low-cost transactions.",
          },
        ],
      },
    ],
  },

  // Add more pages here as needed:
  // portfolio: { ... },
  // community: { ... },
  // search: { ... },
};
