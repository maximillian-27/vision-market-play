import { useState, useMemo, useEffect } from "react";
import { FeedFilters, FilterState } from "@/components/FeedFilters";
import { MarketGridCard } from "@/components/MarketGridCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

type MarketStatus = "open" | "closing" | "awaiting_resolution" | "closed" | "resolved";

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
  pot: number; // raw pot number for sorting
  endsIn: string;
  likes: number;
  comments: number;
  category: string;
  status: MarketStatus;
  players: number;
  resolution?: "yes" | "no" | string;
  disputeEndsIn?: string;
  resolvedAt?: string;
  resolutionDate?: string;
}

const mockMarkets: Market[] = [
  {
    id: "1",
    creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen", isCreator: true },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    subtitle: "The ultimate crypto milestone - will BTC finally break six figures?",
    image: bitcoinImage,
    yesPrice: 68,
    noPrice: 32,
    volume: "$2.4M",
    pot: 2400000,
    endsIn: "3 months",
    likes: 142,
    comments: 38,
    category: "Crypto",
    status: "open",
    players: 12400,
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
    pot: 890000,
    endsIn: "2 months",
    likes: 89,
    comments: 24,
    category: "Sports",
    status: "open",
    players: 8200,
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
    pot: 1200000,
    endsIn: "11 months",
    likes: 203,
    comments: 67,
    category: "Tech",
    status: "open",
    players: 6800,
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
    pot: 3100000,
    endsIn: "1 month",
    likes: 321,
    comments: 95,
    category: "Finance",
    status: "open",
    players: 15200,
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
    pot: 1800000,
    endsIn: "Ended",
    likes: 176,
    comments: 52,
    category: "Tech",
    status: "awaiting_resolution",
    players: 9800,
    resolutionDate: "Jan 15, 2026",
  },
  {
    id: "6",
    creator: { name: "Taylor Swift", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor", id: "taylor-swift", isCreator: true },
    title: "Will Tesla launch a $25,000 electric car in 2025?",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=800&fit=crop",
    yesPrice: 42,
    noPrice: 58,
    volume: "$987K",
    pot: 987000,
    endsIn: "2 hours",
    likes: 154,
    comments: 41,
    category: "Tech",
    status: "closing",
    players: 5400,
  },
  {
    id: "7",
    creator: { name: "David Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", id: "david-park", isCreator: true },
    title: "Did Ethereum break $4,000 in December 2024?",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=800&fit=crop",
    yesPrice: 100,
    noPrice: 0,
    volume: "$1.7M",
    pot: 1700000,
    endsIn: "Ended",
    likes: 187,
    comments: 56,
    category: "Crypto",
    status: "closed",
    players: 7200,
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
    pot: 2300000,
    endsIn: "Ended",
    likes: 234,
    comments: 89,
    category: "Finance",
    status: "closed",
    players: 11200,
    resolution: "no",
    disputeEndsIn: "6 hours",
  },
  {
    id: "9",
    creator: { name: "Chris Thompson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris", id: "chris-thompson", isCreator: true },
    title: "Did Apple announce iPhone 16 at September event?",
    image: iphoneImage,
    yesPrice: 100,
    noPrice: 0,
    volume: "$3.2M",
    pot: 3200000,
    endsIn: "Resolved",
    likes: 421,
    comments: 156,
    category: "Tech",
    status: "resolved",
    players: 18400,
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
    pot: 5800000,
    endsIn: "Resolved",
    likes: 567,
    comments: 234,
    category: "Politics",
    status: "resolved",
    players: 32000,
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
    pot: 4100000,
    endsIn: "Resolved",
    likes: 389,
    comments: 178,
    category: "Sports",
    status: "resolved",
    players: 22000,
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
    pot: 2900000,
    endsIn: "Resolved",
    likes: 445,
    comments: 167,
    category: "Tech",
    status: "resolved",
    players: 16800,
    resolution: "yes",
    resolvedAt: "Mar 14, 2024",
  },
];

// Featured markets = top 3 by pot size that are open/closing
const featuredMarkets = [...mockMarkets]
  .filter(m => m.status === "open" || m.status === "closing")
  .sort((a, b) => b.pot - a.pot)
  .slice(0, 3);

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

export default function Feed() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    sortBy: "trending",
    region: "global",
    status: "all",
    timeframe: "all",
  });
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Auto-cycle featured market
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredMarkets.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentFeatured = featuredMarkets[featuredIndex];

  const filteredMarkets = useMemo(() => {
    let result = [...mockMarkets];

    if (filters.category !== "All") {
      if (filters.category === "My Markets") {
        result = result.slice(0, 3);
      } else if (filters.category === "Hot") {
        result = result.sort((a, b) => b.pot - a.pot);
      } else if (filters.category === "Closing Soon") {
        result = result.filter(m => m.status === "closing" || m.status === "open");
        result = result.sort((a, b) => {
          if (a.status === "closing" && b.status !== "closing") return -1;
          if (b.status === "closing" && a.status !== "closing") return 1;
          return 0;
        });
      } else {
        result = result.filter(m => m.category === filters.category);
      }
    }

    if (filters.status !== "all") {
      result = result.filter(m => m.status === filters.status);
    }

    switch (filters.sortBy) {
      case "volume":
        result = result.sort((a, b) => b.pot - a.pot);
        break;
      case "newest":
        result = result.reverse();
        break;
      case "ending":
        result = result.filter(m => m.status === "open" || m.status === "closing");
        break;
      case "active":
        result = result.sort((a, b) => b.players - a.players);
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="space-y-4">
        {/* Featured Market Hero Banner */}
        <div 
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => navigate(`/market/${currentFeatured.id}`)}
        >
          <div className="aspect-[21/9] sm:aspect-[3/1] relative">
            <img 
              src={currentFeatured.image} 
              alt={currentFeatured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                {currentFeatured.status === "closing" && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                    <Timer className="h-3 w-3" />
                    Closing Soon
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold">
                  {formatPot(currentFeatured.pot)} Pot
                </span>
              </div>
              <h2 className="text-white text-lg sm:text-xl font-bold leading-snug line-clamp-2 max-w-2xl">
                {currentFeatured.title}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-white/70 text-xs">
                <span>{currentFeatured.players.toLocaleString()} players</span>
                <span>Ends {currentFeatured.endsIn}</span>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); setFeaturedIndex(prev => (prev - 1 + featuredMarkets.length) % featuredMarkets.length); }}
                className="h-7 w-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>
              <div className="flex gap-1.5">
                {featuredMarkets.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setFeaturedIndex(i); }}
                    className={`h-1.5 rounded-full transition-all ${i === featuredIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                  />
                ))}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setFeaturedIndex(prev => (prev + 1) % featuredMarkets.length); }}
                className="h-7 w-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>

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
                pot={market.pot}
                players={market.players}
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
