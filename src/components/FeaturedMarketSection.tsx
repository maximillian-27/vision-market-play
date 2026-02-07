import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Flame, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { useToast } from "@/hooks/use-toast";
import { CreatorTierBadge, CreatorTier } from "@/components/CreatorTierBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";

interface FeaturedMarket {
  id: string;
  creator: {
    name: string;
    avatar: string;
    id: string;
    isCreator: boolean;
    tier?: CreatorTier;
  };
  title: string;
  subtitle?: string;
  image: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
  endsIn: string;
  category: string;
  isHot?: boolean;
  isLive?: boolean;
  volumeChange?: number;
}

const featuredMain: FeaturedMarket = {
  id: "1",
  creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen", isCreator: true, tier: "gold" as const },
  title: "Will Bitcoin reach $100,000 by end of 2025?",
  subtitle: "The ultimate crypto milestone - will BTC finally break six figures?",
  image: bitcoinImage,
  yesPrice: 68,
  noPrice: 32,
  volume: "$2.4M",
  endsIn: "3 months",
  category: "Crypto",
  isHot: true,
  volumeChange: 5.2,
};

const featuredSide: FeaturedMarket[] = [
  {
    id: "4",
    creator: { name: "Alex Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", id: "alex-rodriguez", isCreator: true, tier: "silver" as const },
    title: "Next US Federal Reserve interest rate decision?",
    subtitle: "Fed's next move could shake the markets.",
    image: fedImage,
    yesPrice: 45,
    noPrice: 55,
    volume: "$3.1M",
    endsIn: "1 month",
    category: "Finance",
    volumeChange: -2.1,
  },
  {
    id: "3",
    creator: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", id: "emma-wilson", isCreator: true, tier: "diamond" as const },
    title: "Will Apple release a foldable iPhone in 2025?",
    subtitle: "Apple's been quiet on foldables. Will they finally join the trend?",
    image: iphoneImage,
    yesPrice: 23,
    noPrice: 77,
    volume: "$1.2M",
    endsIn: "11 months",
    category: "Tech",
    isHot: true,
  },
];

function FeaturedCard({ market, isMain = false }: { market: FeaturedMarket; isMain?: boolean }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToBetSlip, isInBetSlip, setIsOpen: setBetSlipOpen } = useBetSlipContext();

  const handleBetClick = (e: React.MouseEvent, outcome: string, price: number) => {
    e.stopPropagation();
    addToBetSlip(market.id, market.title, outcome, price);
    setBetSlipOpen(true);
    toast({
      title: isInBetSlip(market.id, outcome) ? "Removed from bet slip" : "Added to bet slip",
      description: `${outcome} @ ${price}%`,
    });
  };

  if (isMain) {
    return (
      <Card
        className="group overflow-hidden cursor-pointer border-border bg-card card-hover flex flex-col"
        onClick={() => navigate(`/market/${market.id}`)}
      >
        {/* Large image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-secondary">
          <img
            src={market.image}
            alt={market.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {market.isLive && (
              <span className="badge-live text-[10px] px-2 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                LIVE
              </span>
            )}
            {market.isHot && !market.isLive && (
              <span className="badge-hot text-[10px] px-2 py-0.5">
                <Flame className="h-3 w-3" />
                HOT
              </span>
            )}
            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-background/80 backdrop-blur-sm">
              {market.category}
            </Badge>
          </div>
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Avatar className="h-5 w-5 border border-white/30">
                <AvatarImage src={market.creator.avatar} />
                <AvatarFallback className="text-[8px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-white/80 text-xs font-medium">{market.creator.name}</span>
              {market.creator.tier && <CreatorTierBadge tier={market.creator.tier} size="sm" showLabel={false} />}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-display font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
            {market.title}
          </h3>
          {market.subtitle && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{market.subtitle}</p>
          )}

          {/* Probability bar */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-bet">{market.yesPrice}%</span>
            <div className="flex-1 h-2 rounded-full bg-against/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-bet"
                style={{ width: `${market.yesPrice}%` }}
              />
            </div>
            <span className="text-sm font-bold text-against">{market.noPrice}%</span>
          </div>

          {/* Bet buttons */}
          <div className="flex items-center gap-2 mt-auto">
            <button
              className={`flex-1 rounded-lg py-2.5 text-center transition-all active:scale-[0.97] text-sm font-bold ${
                isInBetSlip(market.id, "Yes")
                  ? "bg-bet text-bet-foreground border-2 border-bet"
                  : "bg-bet/15 hover:bg-bet text-bet hover:text-bet-foreground border border-bet/30 hover:border-bet"
              }`}
              onClick={(e) => handleBetClick(e, "Yes", market.yesPrice)}
            >
              Bet Yes
            </button>
            <button
              className={`flex-1 rounded-lg py-2.5 text-center transition-all active:scale-[0.97] text-sm font-bold ${
                isInBetSlip(market.id, "No")
                  ? "bg-against text-against-foreground border-2 border-against"
                  : "bg-against/15 hover:bg-against text-against hover:text-against-foreground border border-against/30 hover:border-against"
              }`}
              onClick={(e) => handleBetClick(e, "No", market.noPrice)}
            >
              Bet No
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border">
            <span className="flex items-center gap-1 font-semibold">
              <TrendingUp className="h-3 w-3" />
              {market.volume} Vol.
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {market.endsIn}
            </span>
            {market.volumeChange !== undefined && market.volumeChange !== 0 && (
              <span className={`ml-auto text-[10px] font-bold ${market.volumeChange > 0 ? 'text-bet' : 'text-against'}`}>
                {market.volumeChange > 0 ? '+' : ''}{market.volumeChange}%
              </span>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Side card (smaller, stacked)
  return (
    <Card
      className="group overflow-hidden cursor-pointer border-border bg-card card-hover"
      onClick={() => navigate(`/market/${market.id}`)}
    >
      <div className="flex gap-3 p-3">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
          <img
            src={market.image}
            alt={market.title}
            className="h-full w-full object-cover"
          />
          {market.isHot && (
            <div className="absolute top-0.5 left-0.5">
              <span className="badge-hot text-[7px] px-1 py-0.5">
                <Flame className="h-2 w-2" />
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <Avatar className="h-4 w-4">
              <AvatarImage src={market.creator.avatar} />
              <AvatarFallback className="text-[6px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-muted-foreground font-medium truncate">{market.creator.name}</span>
            {market.creator.tier && <CreatorTierBadge tier={market.creator.tier} size="sm" showLabel={false} />}
          </div>
          <h4 className="text-xs font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {market.title}
          </h4>

          {/* Bet buttons inline */}
          <div className="flex items-center gap-1.5 mt-auto">
            <button
              className={`flex-1 rounded-md py-1.5 text-center text-[10px] font-bold transition-all active:scale-[0.97] ${
                isInBetSlip(market.id, "Yes")
                  ? "bg-bet text-bet-foreground border-2 border-bet"
                  : "bg-bet/15 hover:bg-bet text-bet hover:text-bet-foreground border border-bet/30 hover:border-bet"
              }`}
              onClick={(e) => handleBetClick(e, "Yes", market.yesPrice)}
            >
              Yes {market.yesPrice}%
            </button>
            <button
              className={`flex-1 rounded-md py-1.5 text-center text-[10px] font-bold transition-all active:scale-[0.97] ${
                isInBetSlip(market.id, "No")
                  ? "bg-against text-against-foreground border-2 border-against"
                  : "bg-against/15 hover:bg-against text-against hover:text-against-foreground border border-against/30 hover:border-against"
              }`}
              onClick={(e) => handleBetClick(e, "No", market.noPrice)}
            >
              No {market.noPrice}%
            </button>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border text-[10px] text-muted-foreground">
        <span className="font-semibold">{market.volume} Vol.</span>
        <span className="flex items-center gap-1">
          <Clock className="h-2.5 w-2.5" />
          {market.endsIn}
        </span>
      </div>
    </Card>
  );
}

export function FeaturedMarketSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3">
      {/* Main featured card - large */}
      <FeaturedCard market={featuredMain} isMain />

      {/* Side cards - stacked */}
      <div className="flex flex-col gap-3">
        {featuredSide.map((market) => (
          <FeaturedCard key={market.id} market={market} />
        ))}
      </div>
    </div>
  );
}
