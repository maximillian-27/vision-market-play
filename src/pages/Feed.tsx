import { useState, useMemo, useEffect } from "react";
import { FeedFilters, FilterState } from "@/components/FeedFilters";
import { MarketGridCard } from "@/components/MarketGridCard";
import { Button } from "@/components/ui/button";
import { Timer, Users, ArrowRight, Trophy, Ticket, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { WeeklyDrawCard } from "@/components/WeeklyDrawCard";
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
  {
    id: "13",
    creator: { name: "Amy Zhang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amy", id: "amy-zhang", isCreator: true },
    title: "Will Nvidia stock hit $200 before July 2025?",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=800&fit=crop",
    yesPrice: 55,
    noPrice: 45,
    volume: "$1.5M",
    pot: 1500000,
    endsIn: "4 months",
    likes: 198,
    comments: 73,
    category: "Finance",
    status: "open",
    players: 9400,
  },
  {
    id: "14",
    creator: { name: "Marcus Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus", id: "marcus-brown", isCreator: true },
    title: "Will the US ban TikTok in 2025?",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=800&fit=crop",
    yesPrice: 34,
    noPrice: 66,
    volume: "$2.1M",
    pot: 2100000,
    endsIn: "6 months",
    likes: 412,
    comments: 187,
    category: "Politics",
    status: "open",
    players: 19200,
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
    volume: "$4.5M",
    pot: 4500000,
    endsIn: "1 month",
    likes: 523,
    comments: 241,
    category: "Sports",
    status: "open",
    players: 28000,
  },
  {
    id: "16",
    creator: { name: "James Wright", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James", id: "james-wright", isCreator: true },
    title: "Will Ethereum flip Bitcoin in market cap by 2026?",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=800&fit=crop",
    yesPrice: 12,
    noPrice: 88,
    volume: "$780K",
    pot: 780000,
    endsIn: "9 months",
    likes: 145,
    comments: 62,
    category: "Crypto",
    status: "open",
    players: 4300,
  },
  {
    id: "17",
    creator: { name: "Rachel Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel", id: "rachel-kim", isCreator: true },
    title: "Will OpenAI release GPT-5 before mid-2025?",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop",
    yesPrice: 62,
    noPrice: 38,
    volume: "$1.9M",
    pot: 1900000,
    endsIn: "3 months",
    likes: 287,
    comments: 94,
    category: "Tech",
    status: "open",
    players: 11600,
  },
  {
    id: "18",
    creator: { name: "Tom Harris", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom", id: "tom-harris", isCreator: true },
    title: "Next country to legalize Bitcoin as legal tender?",
    image: bitcoinImage,
    outcomes: [
      { label: "Argentina", price: 35 },
      { label: "Paraguay", price: 25 },
      { label: "Nigeria", price: 22 },
      { label: "Other", price: 18 },
    ],
    volume: "$620K",
    pot: 620000,
    endsIn: "8 months",
    likes: 93,
    comments: 41,
    category: "Crypto",
    status: "open",
    players: 3200,
  },
  {
    id: "19",
    creator: { name: "Diana Ross", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana", id: "diana-ross", isCreator: true },
    title: "Will gas prices drop below $3/gallon by summer 2025?",
    image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&h=800&fit=crop",
    yesPrice: 29,
    noPrice: 71,
    volume: "$430K",
    pot: 430000,
    endsIn: "5 months",
    likes: 67,
    comments: 28,
    category: "Finance",
    status: "open",
    players: 2800,
  },
  {
    id: "20",
    creator: { name: "Kevin Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin", id: "kevin-park", isCreator: true },
    title: "Will there be a new COVID variant of concern in 2025?",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=800&fit=crop",
    yesPrice: 38,
    noPrice: 62,
    volume: "$1.1M",
    pot: 1100000,
    endsIn: "7 months",
    likes: 201,
    comments: 112,
    category: "Politics",
    status: "open",
    players: 7600,
  },
  {
    id: "21",
    creator: { name: "Mia Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia", id: "mia-chen", isCreator: true },
    title: "Will the S&P 500 close above 6,000 in Q1 2025?",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=800&fit=crop",
    yesPrice: 74,
    noPrice: 26,
    volume: "$2.8M",
    pot: 2800000,
    endsIn: "1 month",
    likes: 156,
    comments: 63,
    category: "Finance",
    status: "closing",
    players: 13500,
  },
  {
    id: "22",
    creator: { name: "Leo Adams", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo", id: "leo-adams", isCreator: true },
    title: "Will Spotify reach 700M users by end of 2025?",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=800&fit=crop",
    yesPrice: 47,
    noPrice: 53,
    volume: "$340K",
    pot: 340000,
    endsIn: "10 months",
    likes: 54,
    comments: 19,
    category: "Tech",
    status: "open",
    players: 1900,
  },
  {
    id: "23",
    creator: { name: "Grace Liu", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace", id: "grace-liu", isCreator: true },
    title: "Which studio will win Best Picture at Oscars 2026?",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=800&fit=crop",
    outcomes: [
      { label: "A24", price: 30 },
      { label: "Disney", price: 22 },
      { label: "Universal", price: 28 },
      { label: "Other", price: 20 },
    ],
    volume: "$560K",
    pot: 560000,
    endsIn: "11 months",
    likes: 132,
    comments: 47,
    category: "Entertainment",
    status: "open",
    players: 4100,
  },
  {
    id: "24",
    creator: { name: "Ben Taylor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ben", id: "ben-taylor", isCreator: true },
    title: "Will Dogecoin reach $1 in 2025?",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=800&fit=crop",
    yesPrice: 8,
    noPrice: 92,
    volume: "$1.4M",
    pot: 1400000,
    endsIn: "10 months",
    likes: 378,
    comments: 203,
    category: "Crypto",
    status: "open",
    players: 21000,
  },
  {
    id: "25",
    creator: { name: "Zoe Martinez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", id: "zoe-martinez", isCreator: true },
    title: "Will autonomous taxis launch in 5+ US cities by 2025?",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=800&h=800&fit=crop",
    yesPrice: 56,
    noPrice: 44,
    volume: "$720K",
    pot: 720000,
    endsIn: "8 months",
    likes: 89,
    comments: 34,
    category: "Tech",
    status: "open",
    players: 3700,
  },
];

// Hero slideshow = top 5 by pot size that are open/closing
const heroMarkets = [...mockMarkets]
  .filter(m => m.status === "open" || m.status === "closing")
  .sort((a, b) => b.pot - a.pot)
  .slice(0, 5);

// Sponsored markets — pick a mix including a multi-outcome
const sponsoredMarkets = (() => {
  const sorted = [...mockMarkets]
    .filter(m => m.status === "open" || m.status === "closing")
    .sort((a, b) => b.pot - a.pot)
    .slice(5);
  const multi = sorted.find(m => m.outcomes);
  const binary = sorted.filter(m => !m.outcomes);
  return [binary[0], multi || binary[1], binary[1] || binary[2]].filter(Boolean);
})();

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

/* ── Gradient Banner Divider ── */
function GradientDivider() {
  const totalPot = mockMarkets
    .filter(m => m.status === "open" || m.status === "closing")
    .reduce((sum, m) => sum + m.pot, 0);
  const totalPlayers = mockMarkets.reduce((sum, m) => sum + m.players, 0);

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

/* ── Compact Sponsored Card (matches MarketGridCard desktop style) ── */
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
      className="flex flex-col p-3 rounded-xl border border-border/60 bg-card hover:bg-accent/30 cursor-pointer transition-colors h-full gap-2"
    >
      {/* Image + Title */}
      <div className="flex items-start gap-2">
        <img src={market.image} alt={market.title} className="w-9 h-9 rounded-lg object-cover shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[8px] uppercase tracking-wider font-bold text-pollgy-blue">Sponsored</span>
          </div>
          <h4 className="text-xs font-semibold leading-snug line-clamp-2 text-foreground">
            {market.title}
          </h4>
        </div>
      </div>

      {/* Pot + Players */}
      <div className="flex items-center gap-2">
        <span className="text-primary text-xs font-extrabold">{formatPot(market.pot)}</span>
        <span className="text-[9px] text-muted-foreground">·</span>
        <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
          <Users className="h-2.5 w-2.5" />{market.players.toLocaleString()}
        </span>
      </div>

      {/* Outcome buttons */}
      {isBinary ? (
        <div className="flex gap-1.5">
          <button
            className="flex-1 rounded-lg py-1.5 text-center bg-yes/15 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 hover:border-yes transition-all active:scale-[0.97] text-[10px] font-bold"
            onClick={(e) => { e.stopPropagation(); navigate(`/market/${market.id}`); }}
          >
            Yes {displayOutcomes[0].price}%
          </button>
          <button
            className="flex-1 rounded-lg py-1.5 text-center bg-no/15 hover:bg-no text-no hover:text-no-foreground border border-no/30 hover:border-no transition-all active:scale-[0.97] text-[10px] font-bold"
            onClick={(e) => { e.stopPropagation(); navigate(`/market/${market.id}`); }}
          >
            No {displayOutcomes[1].price}%
          </button>
        </div>
      ) : (
        <div className="space-y-1">
          {displayOutcomes.slice(0, 2).map((o, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-secondary/50 hover:bg-primary/10 border border-border/40 hover:border-primary/30 transition-all active:scale-[0.97]"
              onClick={(e) => { e.stopPropagation(); navigate(`/market/${market.id}`); }}
            >
              <span className="text-[11px] font-medium truncate">{o.label}</span>
              <span className="text-[11px] font-bold text-primary">{o.price}%</span>
            </button>
          ))}
          {displayOutcomes.length > 2 && (
            <span className="block text-center text-[10px] text-muted-foreground">+{displayOutcomes.length - 2} more</span>
          )}
        </div>
      )}

      {/* Timer */}
      <span className="text-muted-foreground flex items-center gap-0.5 text-[10px]">
        <Timer className="h-2.5 w-2.5" />{market.endsIn}
      </span>
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

  // Auto-cycle hero slideshow (both mobile & desktop)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroMarkets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const heroMarket = heroMarkets[activeSlide];
  const heroDisplayOutcomes = heroMarket.outcomes || [
    { label: "Yes", price: heroMarket.yesPrice || 0, color: "success" },
    { label: "No", price: heroMarket.noPrice || 0, color: "destructive" }
  ];
  const heroIsBinary = !heroMarket.outcomes;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 pb-24 sm:pb-0">
      <div className="space-y-1.5">
        {/* 1. Filters */}
        <FeedFilters filters={filters} onFiltersChange={setFilters} />

        {/* 2a. Mobile: Weekly Draw + Hero + Banner + Sponsored */}
        <div className="sm:hidden space-y-1.5 mt-3">
          {/* Weekly Draw compact strip */}
          <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-card px-3 py-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">$48,600</span>
              <span className="text-[10px] text-muted-foreground">prize pool</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <Ticket className="h-3 w-3" />3
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <Timer className="h-3 w-3" />3d 14h
              </span>
            </div>
          </div>

          {/* Hero Slideshow */}
          <div
            className="relative rounded-xl overflow-hidden cursor-pointer h-[220px]"
            onClick={() => navigate(`/market/${heroMarket.id}`)}
          >
            <img src={heroMarket.image} alt={heroMarket.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white text-sm font-bold leading-snug line-clamp-2 mb-1.5">
                {heroMarket.title}
              </h3>
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
                  {heroDisplayOutcomes.length > 3 && (
                    <span className="shrink-0 px-2 py-1 text-white/50 text-[10px]">+{heroDisplayOutcomes.length - 3}</span>
                  )}
                </div>
              )}
            </div>
            <div className="absolute bottom-1.5 right-3 flex gap-1">
              {heroMarkets.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Gradient Banner */}
          <GradientDivider />

          {/* Sponsored Market */}
          <CompactFeaturedCard market={sponsoredMarkets[0]} />
        </div>

        {/* 2b. Desktop Split Hero */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left — Slideshow Carousel */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group h-full"
            onClick={() => navigate(`/market/${heroMarket.id}`)}
          >
            <img src={heroMarket.image} alt={heroMarket.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary text-sm font-extrabold">{formatPot(heroMarket.pot)} pot</span>
                <span className="text-white/60 text-xs flex items-center gap-1"><Users className="h-3 w-3" />{heroMarket.players.toLocaleString()}</span>
                <span className="text-white/50 text-xs">· {heroMarket.endsIn}</span>
              </div>
              <h2 className="text-white text-lg sm:text-xl font-bold leading-snug line-clamp-2 max-w-2xl mb-3">
                {heroMarket.title}
              </h2>
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
                  {heroDisplayOutcomes.length > 4 && (
                    <span className="px-3 py-1.5 text-white/40 text-xs">+{heroDisplayOutcomes.length - 4} more</span>
                  )}
                </div>
              )}
            </div>
            {/* Dot indicators */}
            <div className="absolute top-3 right-3 flex gap-1">
              {heroMarkets.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === activeSlide ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Right — 2×2 Grid: 3 Sponsored + Weekly Draw */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
            <div className="min-h-0">
              <CompactFeaturedCard market={sponsoredMarkets[0]} />
            </div>
            <div className="min-h-0">
              <WeeklyDrawCard />
            </div>
            <div className="min-h-0">
              <CompactFeaturedCard market={sponsoredMarkets[1]} />
            </div>
            <div className="min-h-0">
              <CompactFeaturedCard market={sponsoredMarkets[2]} />
            </div>
          </div>
        </div>

        {/* 3. Gradient Banner Divider (desktop only — mobile has it above) */}
        <div className="hidden sm:block">
          <GradientDivider />
        </div>

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
    </div>
  );
}