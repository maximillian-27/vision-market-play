import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Users, Timer } from "lucide-react";
import { FeedFilters, FilterState } from "@/components/FeedFilters";
import { MarketGridCard } from "@/components/MarketGridCard";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { WeeklyDrawCard } from "@/components/WeeklyDrawCard";
import { SeoContentBlock } from "@/components/SeoContentBlock";
import { searchSeoContent } from "@/lib/seo-content";
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

// Same mock data as Feed
const mockMarkets: Market[] = [
  {
    id: "1",
    creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen", isCreator: true },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    subtitle: "The ultimate crypto milestone - will BTC finally break six figures?",
    image: bitcoinImage,
    yesPrice: 68, noPrice: 32, volume: "$2.4M", pot: 2400000, endsIn: "3 months",
    likes: 142, comments: 38, category: "Crypto", status: "open", players: 12400,
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
    volume: "$890K", pot: 890000, endsIn: "2 months",
    likes: 89, comments: 24, category: "Sports", status: "open", players: 8200,
  },
  {
    id: "3",
    creator: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", id: "emma-wilson", isCreator: true },
    title: "Will Apple release a foldable iPhone in 2025?",
    subtitle: "Apple's been quiet on foldables. Will they finally join the trend?",
    image: iphoneImage,
    yesPrice: 23, noPrice: 77, volume: "$1.2M", pot: 1200000, endsIn: "11 months",
    likes: 203, comments: 67, category: "Tech", status: "open", players: 6800,
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
    volume: "$3.1M", pot: 3100000, endsIn: "1 month",
    likes: 321, comments: 95, category: "Finance", status: "open", players: 15200,
  },
  {
    id: "5",
    creator: { name: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", id: "jordan-lee", isCreator: true },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    subtitle: "AI chatbots are everywhere. How much will they replace?",
    image: aiImage,
    yesPrice: 71, noPrice: 29, volume: "$1.8M", pot: 1800000, endsIn: "Ended",
    likes: 176, comments: 52, category: "Tech", status: "awaiting_resolution", players: 9800,
    resolutionDate: "Jan 15, 2026",
  },
  {
    id: "6",
    creator: { name: "Taylor Swift", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor", id: "taylor-swift", isCreator: true },
    title: "Will Tesla launch a $25,000 electric car in 2025?",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=800&fit=crop",
    yesPrice: 42, noPrice: 58, volume: "$987K", pot: 987000, endsIn: "2 hours",
    likes: 154, comments: 41, category: "Tech", status: "closing", players: 5400,
  },
  {
    id: "13",
    creator: { name: "Amy Zhang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amy", id: "amy-zhang", isCreator: true },
    title: "Will Nvidia stock hit $200 before July 2025?",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=800&fit=crop",
    yesPrice: 55, noPrice: 45, volume: "$1.5M", pot: 1500000, endsIn: "4 months",
    likes: 198, comments: 73, category: "Finance", status: "open", players: 9400,
  },
  {
    id: "14",
    creator: { name: "Marcus Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus", id: "marcus-brown", isCreator: true },
    title: "Will the US ban TikTok in 2025?",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=800&fit=crop",
    yesPrice: 34, noPrice: 66, volume: "$2.1M", pot: 2100000, endsIn: "6 months",
    likes: 412, comments: 187, category: "Politics", status: "open", players: 19200,
  },
  {
    id: "15",
    creator: { name: "Olivia Scott", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia", id: "olivia-scott", isCreator: true },
    title: "Who will win the 2025 Super Bowl?",
    image: "https://images.unsplash.com/photo-1504016798967-59a258e9386d?w=800&h=800&fit=crop",
    outcomes: [
      { label: "Chiefs", price: 28 },
      { label: "49ers", price: 22 },
      { label: "Eagles", price: 19 },
      { label: "Lions", price: 18 },
      { label: "Other", price: 13 },
    ],
    volume: "$4.5M", pot: 4500000, endsIn: "1 month",
    likes: 523, comments: 241, category: "Sports", status: "open", players: 28000,
  },
  {
    id: "16",
    creator: { name: "James Wright", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James", id: "james-wright", isCreator: true },
    title: "Will Ethereum flip Bitcoin in market cap by 2026?",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=800&fit=crop",
    yesPrice: 12, noPrice: 88, volume: "$780K", pot: 780000, endsIn: "9 months",
    likes: 145, comments: 62, category: "Crypto", status: "open", players: 4300,
  },
  {
    id: "17",
    creator: { name: "Rachel Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel", id: "rachel-kim", isCreator: true },
    title: "Will OpenAI release GPT-5 before mid-2025?",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop",
    yesPrice: 62, noPrice: 38, volume: "$1.9M", pot: 1900000, endsIn: "3 months",
    likes: 287, comments: 94, category: "Tech", status: "open", players: 11600,
  },
  {
    id: "24",
    creator: { name: "Ben Taylor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ben", id: "ben-taylor", isCreator: true },
    title: "Will Dogecoin reach $1 in 2025?",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=800&fit=crop",
    yesPrice: 8, noPrice: 92, volume: "$1.4M", pot: 1400000, endsIn: "10 months",
    likes: 378, comments: 203, category: "Crypto", status: "open", players: 21000,
  },
];

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

/* ── Gradient Banner Divider ── */
function GradientDivider({ markets }: { markets: Market[] }) {
  const totalPot = markets
    .filter(m => m.status === "open" || m.status === "closing")
    .reduce((sum, m) => sum + m.pot, 0);
  const totalPlayers = markets.reduce((sum, m) => sum + m.players, 0);

  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-pollgy-green to-pollgy-blue px-3 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between gap-3 overflow-hidden">
      <p className="text-primary-foreground text-[10px] sm:text-xs font-medium tracking-wide">
        <span className="font-bold">Pollgy</span> — First creator led, community owned prediction market
      </p>
      <div className="hidden md:flex items-center gap-4 text-primary-foreground text-[10px] sm:text-xs shrink-0">
        <span className="font-bold">{formatPot(totalPot)}+ <span className="font-normal opacity-80">Live</span></span>
        <span className="flex items-center gap-1 font-bold"><Users className="h-3 w-3 opacity-80" />{totalPlayers.toLocaleString()}</span>
      </div>
    </div>
  );
}

/* ── Compact Sponsored Card ── */
function CompactFeaturedCard({ market }: { market: Market }) {
  const navigate = useNavigate();
  const displayOutcomes = market.outcomes || [
    { label: "Yes", price: market.yesPrice || 0, color: "success" },
    { label: "No", price: market.noPrice || 0, color: "destructive" }
  ];
  const isBinary = !market.outcomes;

  return (
    <div
      onClick={() => navigate(`/market/${market.id}`)}
      className="flex flex-col p-3 rounded-xl border border-border/60 bg-card hover:bg-accent/30 cursor-pointer transition-colors h-full"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] uppercase tracking-wider font-bold text-pollgy-blue">Top Result</span>
        <div className="flex items-center gap-1">
          <img src={market.creator.avatar} alt="" className="w-3.5 h-3.5 rounded-full" />
          <span className="text-[9px] text-muted-foreground">{market.creator.name}</span>
        </div>
      </div>
      <div className="flex gap-2.5 mb-2">
        <img src={market.image} alt={market.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <h4 className="text-xs font-semibold leading-tight line-clamp-2 text-foreground">{market.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-primary text-[11px] font-extrabold">{formatPot(market.pot)} <span className="text-[9px] font-medium text-muted-foreground">pot</span></span>
            <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
              <Users className="h-2.5 w-2.5" />{market.players.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {isBinary ? (
        <div className="flex gap-1">
          <button className="flex-1 rounded py-1.5 text-center bg-yes/15 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 hover:border-yes transition-all active:scale-[0.98] text-[10px] font-bold" onClick={(e) => { e.stopPropagation(); navigate(`/market/${market.id}`); }}>
            Yes {displayOutcomes[0].price}%
          </button>
          <button className="flex-1 rounded py-1.5 text-center bg-no/15 hover:bg-no text-no hover:text-no-foreground border border-no/30 hover:border-no transition-all active:scale-[0.98] text-[10px] font-bold" onClick={(e) => { e.stopPropagation(); navigate(`/market/${market.id}`); }}>
            No {displayOutcomes[1].price}%
          </button>
        </div>
      ) : (
        <div className="space-y-0.5">
          {displayOutcomes.slice(0, 2).map((o, i) => (
            <button key={i} className="w-full flex items-center justify-between px-2 py-1 rounded bg-secondary/50 hover:bg-primary/10 border border-border/40 hover:border-primary/30 transition-all active:scale-[0.98]" onClick={(e) => { e.stopPropagation(); navigate(`/market/${market.id}`); }}>
              <span className="text-[10px] font-medium truncate">{o.label}</span>
              <span className="text-[10px] font-bold text-primary">{o.price}%</span>
            </button>
          ))}
          {displayOutcomes.length > 2 && (
            <span className="block text-center text-[9px] text-muted-foreground">+{displayOutcomes.length - 2} more</span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mt-1.5 text-[9px]">
        <span className="text-muted-foreground flex items-center gap-0.5">
          <Timer className="h-2.5 w-2.5" />{market.endsIn}
        </span>
      </div>
    </div>
  );
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const query = searchParams.get("q") || "";
  const [activeSlide, setActiveSlide] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    sortBy: "trending",
    region: "global",
    status: "all",
    timeframe: "all",
  });

  // Filter markets by search query first
  const searchedMarkets = useMemo(() => {
    if (!query) return mockMarkets;
    return mockMarkets.filter(
      (m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.creator.name.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Then apply feed filters on top
  const filteredMarkets = useMemo(() => {
    let result = [...searchedMarkets];

    if (filters.category !== "All") {
      if (filters.category === "Hot") {
        result = result.sort((a, b) => b.pot - a.pot);
      } else if (filters.category === "Closing Soon") {
        result = result.filter(m => m.status === "closing" || m.status === "open");
        result.sort((a, b) => {
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
        result.sort((a, b) => b.pot - a.pot);
        break;
      case "newest":
        result.reverse();
        break;
      case "ending":
        result = result.filter(m => m.status === "open" || m.status === "closing");
        break;
      case "active":
        result.sort((a, b) => b.players - a.players);
        break;
    }

    return result;
  }, [searchedMarkets, filters]);

  // Hero = top result by pot from searched markets (open/closing only)
  const heroMarkets = useMemo(() => {
    return [...searchedMarkets]
      .filter(m => m.status === "open" || m.status === "closing")
      .sort((a, b) => b.pot - a.pot)
      .slice(0, 5);
  }, [searchedMarkets]);

  // Second best result for the sidebar card
  const sidebarMarket = heroMarkets[1] || heroMarkets[0];

  // Auto-cycle hero
  useEffect(() => {
    if (heroMarkets.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroMarkets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroMarkets.length]);

  // Reset slide when query changes
  useEffect(() => {
    setActiveSlide(0);
  }, [query]);

  if (!query) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <SearchIcon className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">Search for markets</p>
        </div>
      </div>
    );
  }

  if (searchedMarkets.length === 0) {
    return (
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-4 lg:py-6">
        <div className="text-center py-16 space-y-2">
          <SearchIcon className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">No markets found for "{query}"</p>
          <p className="text-xs text-muted-foreground/70">Try different keywords</p>
        </div>
      </div>
    );
  }

  const heroMarket = heroMarkets[activeSlide % Math.max(heroMarkets.length, 1)];
  const heroDisplayOutcomes = heroMarket
    ? heroMarket.outcomes || [
        { label: "Yes", price: heroMarket.yesPrice || 0, color: "success" },
        { label: "No", price: heroMarket.noPrice || 0, color: "destructive" }
      ]
    : [];
  const heroIsBinary = heroMarket ? !heroMarket.outcomes : true;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 pb-24 sm:pb-0">
      <div className="space-y-1.5">
        {/* Search header */}
        <div className="flex items-center justify-between pt-2 pb-1">
          <div>
            <h1 className="text-base font-semibold">Results for "{query}"</h1>
            <p className="text-[11px] text-muted-foreground">{searchedMarkets.length} market{searchedMarkets.length !== 1 ? "s" : ""} found</p>
          </div>
        </div>

        {/* Filters */}
        <FeedFilters filters={filters} onFiltersChange={setFilters} />

        {/* Hero section — same as Feed */}
        {heroMarket && (
          <>
            {/* Mobile Hero */}
            <div className="sm:hidden">
              <div
                className="relative rounded-xl overflow-hidden cursor-pointer h-[220px]"
                onClick={() => navigate(`/market/${heroMarket.id}`)}
              >
                <img src={heroMarket.image} alt={heroMarket.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white text-sm font-bold leading-snug line-clamp-2 mb-1.5">{heroMarket.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary text-[11px] font-extrabold">{formatPot(heroMarket.pot)} pot</span>
                    <span className="text-white/60 text-[10px] flex items-center gap-1">
                      <Users className="h-2.5 w-2.5" />{heroMarket.players.toLocaleString()}
                    </span>
                  </div>
                  {heroIsBinary ? (
                    <div className="flex gap-1.5">
                      <button className="flex-1 rounded py-1.5 text-center bg-yes/20 border border-yes/40 text-yes text-[11px] font-bold" onClick={(e) => { e.stopPropagation(); navigate(`/market/${heroMarket.id}`); }}>
                        Yes {heroDisplayOutcomes[0].price}%
                      </button>
                      <button className="flex-1 rounded py-1.5 text-center bg-no/20 border border-no/40 text-no text-[11px] font-bold" onClick={(e) => { e.stopPropagation(); navigate(`/market/${heroMarket.id}`); }}>
                        No {heroDisplayOutcomes[1].price}%
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-1.5 overflow-x-auto">
                      {heroDisplayOutcomes.slice(0, 3).map((o, i) => (
                        <button key={i} className="shrink-0 px-3 py-1 rounded bg-white/10 border border-white/20 text-white text-[10px] font-bold" onClick={(e) => { e.stopPropagation(); navigate(`/market/${heroMarket.id}`); }}>
                          {o.label} {o.price}%
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {heroMarkets.length > 1 && (
                  <div className="absolute bottom-1.5 right-3 flex gap-1">
                    {heroMarkets.map((_, i) => (
                      <button key={i} onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }} className={`h-1.5 rounded-full transition-all ${i === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Hero */}
            <div className="hidden sm:grid grid-cols-1 lg:grid-cols-5 gap-3 lg:max-h-[340px]">
              <div
                className="lg:col-span-3 relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/market/${heroMarket.id}`)}
              >
                <div className="relative h-[260px] lg:h-[340px]">
                  <img src={heroMarket.image} alt={heroMarket.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary text-sm font-extrabold">{formatPot(heroMarket.pot)} pot</span>
                      <span className="text-white/60 text-xs flex items-center gap-1"><Users className="h-3 w-3" />{heroMarket.players.toLocaleString()}</span>
                      <span className="text-white/50 text-xs">· {heroMarket.endsIn}</span>
                    </div>
                    <h2 className="text-white text-lg sm:text-xl font-bold leading-snug line-clamp-2 max-w-2xl mb-3">{heroMarket.title}</h2>
                    {heroIsBinary ? (
                      <div className="flex gap-2 max-w-sm">
                        <button className="flex-1 rounded-lg py-2 text-center bg-yes/20 border border-yes/40 hover:bg-yes text-yes hover:text-yes-foreground text-sm font-bold transition-all active:scale-[0.98]" onClick={(e) => { e.stopPropagation(); navigate(`/market/${heroMarket.id}`); }}>
                          Yes {heroDisplayOutcomes[0].price}%
                        </button>
                        <button className="flex-1 rounded-lg py-2 text-center bg-no/20 border border-no/40 hover:bg-no text-no hover:text-no-foreground text-sm font-bold transition-all active:scale-[0.98]" onClick={(e) => { e.stopPropagation(); navigate(`/market/${heroMarket.id}`); }}>
                          No {heroDisplayOutcomes[1].price}%
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 flex-wrap">
                        {heroDisplayOutcomes.slice(0, 4).map((o, i) => (
                          <button key={i} className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white text-xs font-bold transition-all active:scale-[0.98]" onClick={(e) => { e.stopPropagation(); navigate(`/market/${heroMarket.id}`); }}>
                            {o.label} <span className="text-primary ml-1">{o.price}%</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {heroMarkets.length > 1 && (
                    <div className="absolute top-3 right-3 flex gap-1">
                      {heroMarkets.map((_, i) => (
                        <button key={i} onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }} className={`h-1.5 rounded-full transition-all ${i === activeSlide ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right sidebar */}
              <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3">
                <div className="flex-1">
                  <WeeklyDrawCard />
                </div>
                {sidebarMarket && (
                  <div className="flex-1">
                    <CompactFeaturedCard market={sidebarMarket} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Gradient Divider */}
        <GradientDivider markets={searchedMarkets} />

        {/* Market Grid */}
        {filteredMarkets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No markets found matching your filters</p>
            <Button variant="link" onClick={() => setFilters({ ...filters, status: "all", category: "All" })}>
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

            {/* Desktop: masonry */}
            <div className="hidden sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-3 sm:block">
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

      <SeoContentBlock title={searchSeoContent.title} sections={searchSeoContent.sections} />
    </div>
  );
}
