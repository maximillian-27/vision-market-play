import type { SeoSection } from "@/components/SeoContentBlock";

export const feedSeoContent: { title: string; sections: SeoSection[] } = {
  title: "Prediction Markets – How They Work on Pollgy",
  sections: [
    {
      heading: "What Are Prediction Markets?",
      paragraphs: [
        "Prediction markets let you trade on the outcome of real-world events. Whether it's sports, politics, crypto, or technology, Pollgy gives you the tools to put your knowledge to work and earn rewards when you're right.",
        "Unlike traditional betting, Pollgy uses a pari-mutuel model: all tickets go into a shared pot and winners split the rewards proportionally. No bookmakers, no spreads — just pure crowd-driven odds.",
      ],
      links: [
        { text: "Browse all markets", href: "/", title: "Explore all open prediction markets on Pollgy" },
        { text: "How it works", href: "/", title: "Learn how Pollgy prediction markets work" },
        { text: "Community discussions", href: "/community-feed", title: "Join the Pollgy community to discuss markets" },
      ],
    },
    {
      heading: "Why Trade on Pollgy?",
      paragraphs: [
        "Pollgy makes prediction trading accessible to everyone. Buy tickets starting from just $1, track your portfolio performance, and follow top traders to sharpen your strategy.",
        "Every market is created and verified by our community of creators. Markets cover trending topics in crypto, sports, entertainment, politics, and technology — with new ones added daily.",
      ],
      links: [
        { text: "Your portfolio", href: "/portfolio", title: "View your Pollgy prediction market portfolio" },
        { text: "Search markets", href: "/search", title: "Search and filter prediction markets" },
      ],
    },
  ],
};

export const searchSeoContent: { title: string; sections: SeoSection[] } = {
  title: "Find Prediction Markets on Pollgy",
  sections: [
    {
      paragraphs: [
        "Use the search to find prediction markets across all categories including crypto, sports, politics, entertainment, and technology. Filter by status, sort by volume or popularity, and discover the markets that matter to you.",
        "Can't find what you're looking for? Pollgy creators are adding new markets every day. Check back often or join the community to suggest new topics.",
      ],
      links: [
        { text: "Browse trending markets", href: "/", title: "See the most popular prediction markets on Pollgy" },
        { text: "Join the community", href: "/community-feed", title: "Discuss and suggest new prediction markets" },
      ],
    },
  ],
};

export const portfolioSeoContent: { title: string; sections: SeoSection[] } = {
  title: "Track Your Predictions on Pollgy",
  sections: [
    {
      paragraphs: [
        "Your portfolio shows all your active positions, past results, and wallet activity in one place. Track your win rate, total earnings, and ROI over time.",
        "Pollgy's transparent pari-mutuel system means your potential payout is always visible. The earlier you buy tickets on a winning outcome, the bigger your share of the pot.",
      ],
      links: [
        { text: "Explore markets", href: "/", title: "Browse open prediction markets to add to your portfolio" },
        { text: "Search markets", href: "/search", title: "Find specific prediction markets on Pollgy" },
      ],
    },
  ],
};

export const communitySeoContent: { title: string; sections: SeoSection[] } = {
  title: "Pollgy Community – Share & Discuss Predictions",
  sections: [
    {
      paragraphs: [
        "The Pollgy community is where traders share insights, debate market outcomes, and post their positions. Follow top performers, react to hot takes, and build your reputation as a market analyst.",
        "Every post can link to a live market, making it easy to go from reading a take to placing a trade. Share your own analysis and grow your following on the platform.",
      ],
      links: [
        { text: "Browse markets", href: "/", title: "Explore all open prediction markets on Pollgy" },
        { text: "Your profile", href: "/profile", title: "View and customize your Pollgy profile" },
        { text: "Your portfolio", href: "/portfolio", title: "Track your prediction market positions" },
      ],
    },
  ],
};
