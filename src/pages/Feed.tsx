import { useState, useMemo } from "react";
import { FeedFilters, FilterState } from "@/components/FeedFilters";
import { MarketGridCard } from "@/components/MarketGridCard";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

type MarketStatus = "open" | "closing" | "closed" | "resolved";

interface Market {
  id: string;
  creator: {
    name: string;
    avatar: string;
    id: string;
    isCreator: boolean;
  };
  title: string;
  subtitle?: string;
  image: string;
  outcomes?: { label: string; price: number; color?: string; logo?: string }[];
  yesPrice?: number;
  noPrice?: number;
  volume: string;
  endsIn: string;
  likes: number;
  comments: number;
  category: string;
  status: MarketStatus;
  // For closed/resolved markets
  resolution?: "yes" | "no" | string;
  disputeEndsIn?: string;
  resolvedAt?: string;
}

const mockMarkets: Market[] = [
  // Open Markets
  {
    id: "1",
    creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen", isCreator: true },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    subtitle: "The ultimate crypto milestone - will BTC finally break six figures?",
    image: bitcoinImage,
    yesPrice: 68,
    noPrice: 32,
    volume: "$2.4M",
    endsIn: "3 months",
    likes: 142,
    comments: 38,
    category: "Crypto",
    status: "open",
  },
  {
    id: "2",
    creator: { name: "Mike Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", id: "mike-johnson", isCreator: true },
    title: "Who will win the NBA Championship this season?",
    subtitle: "The race for the championship is heating up.",
    image: nbaImage,
    outcomes: [
      { label: "Lakers", price: 25, logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg" },
      { label: "Celtics", price: 32, logo: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg" },
      { label: "Nuggets", price: 21, logo: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg" },
      { label: "Other", price: 22 },
    ],
    volume: "$890K",
    endsIn: "2 months",
    likes: 89,
    comments: 24,
    category: "Sports",
    status: "open",
  },
  {
    id: "3",
    creator: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", id: "emma-wilson", isCreator: true },
    title: "Will Apple release a foldable iPhone in 2025?",
    subtitle: "Apple's been quiet on foldables. Will they finally join the trend?",
    image: iphoneImage,
    yesPrice: 23,
    noPrice: 77,
    volume: "$1.2M",
    endsIn: "11 months",
    likes: 203,
    comments: 67,
    category: "Tech",
    status: "open",
  },
  {
    id: "4",
    creator: { name: "Alex Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", id: "alex-rodriguez", isCreator: true },
    title: "Next US Federal Reserve interest rate decision?",
    subtitle: "Fed's next move could shake the markets.",
    image: fedImage,
    outcomes: [
      { label: "Cut", price: 45, color: "success" },
      { label: "Hold", price: 38 },
      { label: "Raise", price: 17, color: "destructive" },
    ],
    volume: "$3.1M",
    endsIn: "1 month",
    likes: 321,
    comments: 95,
    category: "Finance",
    status: "open",
  },
  {
    id: "5",
    creator: { name: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", id: "jordan-lee", isCreator: true },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    subtitle: "AI chatbots are everywhere. How much will they replace?",
    image: aiImage,
    yesPrice: 71,
    noPrice: 29,
    volume: "$1.8M",
    endsIn: "1 year",
    likes: 176,
    comments: 52,
    category: "Tech",
    status: "open",
  },
  // Closing Soon
  {
    id: "6",
    creator: { name: "Taylor Swift", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor", id: "taylor-swift", isCreator: true },
    title: "Will Tesla launch a $25,000 electric car in 2025?",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=800&fit=crop",
    yesPrice: 42,
    noPrice: 58,
    volume: "$987K",
    endsIn: "2 hours",
    likes: 154,
    comments: 41,
    category: "Tech",
    status: "closing",
  },
  // Closed Markets (Dispute Period)
  {
    id: "7",
    creator: { name: "David Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", id: "david-park", isCreator: true },
    title: "Did Ethereum break $4,000 in December 2024?",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=800&fit=crop",
    yesPrice: 100,
    noPrice: 0,
    volume: "$1.7M",
    endsIn: "Ended",
    likes: 187,
    comments: 56,
    category: "Crypto",
    status: "closed",
    resolution: "yes",
    disputeEndsIn: "18 hours",
  },
  {
    id: "8",
    creator: { name: "Lisa Martinez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", id: "lisa-martinez", isCreator: true },
    title: "Did the Fed raise rates in November 2024?",
    image: fedImage,
    yesPrice: 0,
    noPrice: 100,
    volume: "$2.3M",
    endsIn: "Ended",
    likes: 234,
    comments: 89,
    category: "Finance",
    status: "closed",
    resolution: "no",
    disputeEndsIn: "6 hours",
  },
  // Resolved Markets
  {
    id: "9",
    creator: { name: "Chris Thompson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris", id: "chris-thompson", isCreator: true },
    title: "Did Apple announce iPhone 16 at September event?",
    image: iphoneImage,
    yesPrice: 100,
    noPrice: 0,
    volume: "$3.2M",
    endsIn: "Resolved",
    likes: 421,
    comments: 156,
    category: "Tech",
    status: "resolved",
    resolution: "yes",
    resolvedAt: "Sep 15, 2024",
  },
  {
    id: "10",
    creator: { name: "Nina Patel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina", id: "nina-patel", isCreator: true },
    title: "Did Biden run for re-election in 2024?",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=800&fit=crop",
    yesPrice: 0,
    noPrice: 100,
    volume: "$5.8M",
    endsIn: "Resolved",
    likes: 567,
    comments: 234,
    category: "Politics",
    status: "resolved",
    resolution: "no",
    resolvedAt: "Jul 21, 2024",
  },
  {
    id: "11",
    creator: { name: "Robert Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert", id: "robert-kim", isCreator: true },
    title: "Did Lakers win 2024 NBA Championship?",
    image: nbaImage,
    outcomes: [
      { label: "Lakers", price: 0 },
      { label: "Celtics", price: 100 },
      { label: "Nuggets", price: 0 },
      { label: "Other", price: 0 },
    ],
    volume: "$4.1M",
    endsIn: "Resolved",
    likes: 389,
    comments: 178,
    category: "Sports",
    status: "resolved",
    resolution: "Celtics",
    resolvedAt: "Jun 18, 2024",
  },
  {
    id: "12",
    creator: { name: "Sophie Anderson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie", id: "sophie-anderson", isCreator: true },
    title: "Did SpaceX complete Starship orbital flight in 2024?",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=800&fit=crop",
    yesPrice: 100,
    noPrice: 0,
    volume: "$2.9M",
    endsIn: "Resolved",
    likes: 445,
    comments: 167,
    category: "Tech",
    status: "resolved",
    resolution: "yes",
    resolvedAt: "Mar 14, 2024",
  },
];

export default function Feed() {
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    sortBy: "trending",
    region: "global",
    status: "all",
    timeframe: "all",
  });

  const filteredMarkets = useMemo(() => {
    let result = [...mockMarkets];

    // Filter by category
    if (filters.category !== "All") {
      if (filters.category === "Following") {
        // Mock: just show first 3 for "Following"
        result = result.slice(0, 3);
      } else if (filters.category === "Hot") {
        // Mock: sort by volume/likes
        result = result.sort((a, b) => b.likes - a.likes);
      } else {
        result = result.filter(m => m.category === filters.category);
      }
    }

    // Filter by status
    if (filters.status !== "all") {
      result = result.filter(m => m.status === filters.status);
    }

    // Sort
    switch (filters.sortBy) {
      case "volume":
        result = result.sort((a, b) => {
          const volA = parseFloat(a.volume.replace(/[$,KM]/g, ''));
          const volB = parseFloat(b.volume.replace(/[$,KM]/g, ''));
          return volB - volA;
        });
        break;
      case "newest":
        result = result.reverse();
        break;
      case "ending":
        result = result.filter(m => m.status === "open" || m.status === "closing");
        break;
      case "active":
        result = result.sort((a, b) => b.comments - a.comments);
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="space-y-4">
        <FeedFilters filters={filters} onFiltersChange={setFilters} />
        
        {filteredMarkets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No markets found matching your filters</p>
            <Button 
              variant="link" 
              onClick={() => setFilters({ ...filters, status: "all", category: "All" })}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
            {filteredMarkets.map((market) => (
              <MarketGridCard 
                key={market.id} 
                id={market.id}
                creator={market.creator}
                title={market.title}
                image={market.image}
                outcomes={market.outcomes}
                yesPrice={market.yesPrice}
                noPrice={market.noPrice}
                volume={market.volume}
                endsIn={market.endsIn}
                status={market.status}
                resolution={market.resolution}
                disputeEndsIn={market.disputeEndsIn}
                resolvedAt={market.resolvedAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
