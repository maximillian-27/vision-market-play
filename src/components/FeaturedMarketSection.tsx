import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, TrendingUp, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { useToast } from "@/hooks/use-toast";
import { CreatorTierBadge, CreatorTier } from "@/components/CreatorTierBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
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
  image: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
  endsIn: string;
  category: string;
  isHot?: boolean;
  volumeChange?: number;
}

const featuredMain: FeaturedMarket = {
  id: "1",
  creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen", isCreator: true, tier: "gold" as const },
  title: "Will Bitcoin reach $100,000 by end of 2025?",
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
    image: iphoneImage,
    yesPrice: 23,
    noPrice: 77,
    volume: "$1.2M",
    endsIn: "11 months",
    category: "Tech",
    isHot: true,
  },
];

function BetButtons({ market, size = "sm" }: { market: FeaturedMarket; size?: "sm" | "xs" }) {
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

  const py = size === "sm" ? "py-1.5" : "py-1";
  const text = size === "sm" ? "text-[11px]" : "text-[10px]";

  return (
    <div className="flex items-center gap-1.5">
      <button
        className={`flex-1 rounded-md ${py} text-center ${text} font-bold transition-all active:scale-[0.97] ${
          isInBetSlip(market.id, "Yes")
            ? "bg-bet text-bet-foreground border-2 border-bet"
            : "bg-bet/15 hover:bg-bet text-bet hover:text-bet-foreground border border-bet/30 hover:border-bet"
        }`}
        onClick={(e) => handleBetClick(e, "Yes", market.yesPrice)}
      >
        Yes {market.yesPrice}%
      </button>
      <button
        className={`flex-1 rounded-md ${py} text-center ${text} font-bold transition-all active:scale-[0.97] ${
          isInBetSlip(market.id, "No")
            ? "bg-against text-against-foreground border-2 border-against"
            : "bg-against/15 hover:bg-against text-against hover:text-against-foreground border border-against/30 hover:border-against"
        }`}
        onClick={(e) => handleBetClick(e, "No", market.noPrice)}
      >
        No {market.noPrice}%
      </button>
    </div>
  );
}

export function FeaturedMarketSection() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-2">
      {/* Main featured card - compact with horizontal layout */}
      <Card
        className="group overflow-hidden cursor-pointer border-border bg-card card-hover"
        onClick={() => navigate(`/market/${featuredMain.id}`)}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image - constrained height */}
          <div className="relative sm:w-[200px] h-[120px] sm:h-auto overflow-hidden bg-secondary flex-shrink-0">
            <img
              src={featuredMain.image}
              alt={featuredMain.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 flex items-center gap-1">
              {featuredMain.isHot && (
                <span className="badge-hot text-[8px] px-1.5 py-0.5">
                  <Flame className="h-2.5 w-2.5" />
                  HOT
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-3 flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Avatar className="h-4 w-4">
                <AvatarImage src={featuredMain.creator.avatar} />
                <AvatarFallback className="text-[6px]">{featuredMain.creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground font-medium">{featuredMain.creator.name}</span>
              {featuredMain.creator.tier && <CreatorTierBadge tier={featuredMain.creator.tier} size="sm" showLabel={false} />}
            </div>

            <h3 className="text-sm font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
              {featuredMain.title}
            </h3>

            {/* Probability bar */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-bet">{featuredMain.yesPrice}%</span>
              <div className="flex-1 h-1.5 rounded-full bg-against/20 overflow-hidden">
                <div className="h-full rounded-full bg-bet" style={{ width: `${featuredMain.yesPrice}%` }} />
              </div>
              <span className="text-xs font-bold text-against">{featuredMain.noPrice}%</span>
            </div>

            <BetButtons market={featuredMain} size="sm" />

            {/* Stats */}
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-2 pt-2 border-t border-border">
              <span className="font-semibold flex items-center gap-1">
                <TrendingUp className="h-2.5 w-2.5" />
                {featuredMain.volume}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {featuredMain.endsIn}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Side cards - stacked, compact */}
      <div className="flex flex-col gap-2">
        {featuredSide.map((market) => (
          <Card
            key={market.id}
            className="group overflow-hidden cursor-pointer border-border bg-card card-hover"
            onClick={() => navigate(`/market/${market.id}`)}
          >
            <div className="flex gap-2.5 p-2.5">
              {/* Small thumbnail */}
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                <img src={market.image} alt={market.title} className="h-full w-full object-cover" />
                {market.isHot && (
                  <div className="absolute top-0 left-0">
                    <span className="badge-hot text-[6px] px-0.5 py-0.5">
                      <Flame className="h-1.5 w-1.5" />
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col">
                <h4 className="text-[11px] font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
                  {market.title}
                </h4>
                <BetButtons market={market} size="xs" />
              </div>
            </div>

            <div className="flex items-center justify-between px-2.5 py-1.5 border-t border-border text-[9px] text-muted-foreground">
              <span className="font-semibold">{market.volume}</span>
              <span className="flex items-center gap-0.5">
                <Clock className="h-2 w-2" />
                {market.endsIn}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
