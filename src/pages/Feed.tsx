import { useState, useMemo, useEffect } from "react";
import { FeedFilters, FilterState } from "@/components/FeedFilters";
import { MarketGridCard } from "@/components/MarketGridCard";
import { Button } from "@/components/ui/button";
import { Timer, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
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
  pot: number;
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

/* ── Gradient Banner Divider ── */
function GradientDivider() {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-pollgy-green to-pollgy-blue px-3 sm:px-6 py-2 sm:py-3.5 flex items-center justify-between gap-4 overflow-hidden">
      <p className="text-primary-foreground text-[10px] sm:text-xs lg:text-base font-medium whitespace-nowrap">
        <span className="font-bold">Pollgy.</span>{" "}
        <span className="hidden sm:inline">First creator led, community owned prediction market platform</span>
        <span className="sm:hidden">Community owned prediction markets</span>
      </p>
      <div className="hidden sm:flex items-center gap-3 sm:gap-4 shrink-0">
        <span className="flex items-center gap-2 text-primary-foreground/90 text-[10px] sm:text-xs lg:text-base font-medium whitespace-nowrap">
          <span className="font-bold">Safe</span>
          <span className="text-primary-foreground/50">|</span>
          <span className="font-bold">Relevant</span>
          <span className="text-primary-foreground/50">|</span>
          <span className="font-bold">The best.</span>
        </span>
      </div>
    </div>
  );
}

/* ── Hero Outcome Buttons ── */
function HeroOutcomes({ market, onDark = false }: { market: Market; onDark?: boolean }) {
  const navigate = useNavigate();
  const isBinary = !market.outcomes;
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/market/${market.id}`);
  };

  if (isBinary) {
    return (
      <div className="flex gap-2 mt-2">
        <button onClick={handleClick} className={`flex-1 rounded-lg py-1.5 text-center text-xs font-bold transition-all active:scale-[0.98] ${onDark ? 'bg-yes/25 hover:bg-yes/40 text-green-300 border border-yes/30' : 'bg-yes/15 hover:bg-yes/25 text-yes border border-yes/30'}`}>
          Yes {market.yesPrice}%
        </button>
        <button onClick={handleClick} className={`flex-1 rounded-lg py-1.5 text-center text-xs font-bold transition-all active:scale-[0.98] ${onDark ? 'bg-no/25 hover:bg-no/40 text-red-300 border border-no/30' : 'bg-no/15 hover:bg-no/25 text-no border border-no/30'}`}>
          No {market.noPrice}%
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 mt-2">
      {market.outcomes!.slice(0, 3).map((outcome, i) => (
        <button key={i} onClick={handleClick} className={`flex items-center justify-between rounded-lg px-2.5 py-1 text-xs transition-all active:scale-[0.98] ${onDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-secondary/60 hover:bg-secondary text-foreground'}`}>
          <span className="font-medium truncate">{outcome.label}</span>
          <span className="font-bold text-primary ml-2">{outcome.price}%</span>
        </button>
      ))}
    </div>
  );
}

/* ── Compact Featured Card (right side) ── */
function CompactFeaturedCard({ market }: { market: Market }) {
  const navigate = useNavigate();
  const topProb = market.yesPrice || (market.outcomes ? Math.max(...market.outcomes.map(o => o.price)) : 0);

  return (
    <div
      onClick={() => navigate(`/market/${market.id}`)}
      className="flex flex-col p-3 rounded-xl border border-border/60 bg-card hover:bg-accent/30 cursor-pointer transition-colors h-full"
    >
      <div className="flex items-start gap-2.5">
        <img
          src={market.image}
          alt={market.title}
          className="w-12 h-12 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <img src={market.creator.avatar} alt="" className="w-3.5 h-3.5 rounded-full" />
              <span className="text-[10px] text-muted-foreground truncate">{market.creator.name}</span>
            </div>
            {topProb > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-yes/15 text-yes text-[10px] font-bold shrink-0">
                {topProb}%
              </span>
            )}
          </div>
          <h4 className="text-xs font-semibold leading-tight line-clamp-2 text-foreground mt-0.5">
            {market.title}
          </h4>
        </div>
      </div>
      
      <HeroOutcomes market={market} />

      <div className="flex items-center justify-between mt-auto pt-1.5 text-[9px] text-muted-foreground">
        <span className="font-bold text-foreground text-[10px]">Vol. {formatPot(market.pot)}</span>
        <div className="flex items-center gap-1.5">
          <Users className="h-2.5 w-2.5" />
          <span>{market.players.toLocaleString()}</span>
          <span className="ml-0.5">{market.endsIn}</span>
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeSlide, setActiveSlide] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    sortBy: "trending",
    region: "global",
    status: "all",
    timeframe: "all",
  });

  // Auto-cycle mobile hero
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % featuredMarkets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

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

  const mainFeatured = featuredMarkets[0];
  const sideFeatured = featuredMarkets.slice(1, 3);
  const mobileHeroMarket = featuredMarkets[activeSlide];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 pb-24 sm:pb-0">
      <div className="space-y-3">
        {/* 1. Filters */}
        <FeedFilters filters={filters} onFiltersChange={setFilters} />

        {/* 2a. Mobile Hero Slide */}
        <div className="sm:hidden">
          <div
            className="relative rounded-xl overflow-hidden cursor-pointer h-[180px]"
            onClick={() => navigate(`/market/${mobileHeroMarket.id}`)}
          >
            <img
              src={mobileHeroMarket.image}
              alt={mobileHeroMarket.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <img src={mobileHeroMarket.creator.avatar} alt="" className="w-4 h-4 rounded-full" />
                <span className="text-[11px] text-white/70">{mobileHeroMarket.creator.name}</span>
              </div>
              <h3 className="text-white text-sm font-bold leading-snug line-clamp-2 mb-1.5">
                {mobileHeroMarket.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold">
                  {formatPot(mobileHeroMarket.pot)} Pot
                </span>
                <span className="text-white/60 text-[10px] flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {mobileHeroMarket.players.toLocaleString()}
                </span>
              </div>
            </div>
            {/* Dot indicators */}
            <div className="absolute bottom-1.5 right-3 flex gap-1">
              {featuredMarkets.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2b. Desktop Split Hero */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-5 gap-3 lg:max-h-[340px]">
          {/* Left — Large featured card */}
          <div
            className="lg:col-span-3 relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/market/${mainFeatured.id}`)}
          >
            <div className="relative h-[260px] lg:h-[340px]">
              <img
                src={mainFeatured.image}
                alt={mainFeatured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  {mainFeatured.status === "closing" && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                      <Timer className="h-3 w-3" />
                      Closing Soon
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold">
                    {formatPot(mainFeatured.pot)} Pot
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <img src={mainFeatured.creator.avatar} alt="" className="w-4 h-4 rounded-full" />
                  <span className="text-white/70 text-xs">{mainFeatured.creator.name}</span>
                </div>
                <h2 className="text-white text-lg sm:text-xl font-bold leading-snug line-clamp-2 max-w-2xl">
                  {mainFeatured.title}
                </h2>
                
                <HeroOutcomes market={mainFeatured} onDark />

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-4 text-white/70 text-xs">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{mainFeatured.players.toLocaleString()} players</span>
                    <span>Ends {mainFeatured.endsIn}</span>
                  </div>
                  <span className="hidden sm:flex items-center gap-1 text-white/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Enter Now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Two stacked compact cards */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3">
            {sideFeatured.map(market => (
              <div key={market.id} className="flex-1">
                <CompactFeaturedCard market={market} />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Gradient Banner Divider */}
        <GradientDivider />

        {/* 4. Market Grid/List */}
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
          <>
            {/* Mobile: flat list */}
            <div className="sm:hidden flex flex-col divide-y divide-border">
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

            {/* Desktop: grid */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
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
          </>
        )}
      </div>
    </div>
  );
}