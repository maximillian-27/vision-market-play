import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Share2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { useToast } from "@/hooks/use-toast";
import { CreatorTier } from "@/components/CreatorTierBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";

interface FeaturedOutcome {
  label: string;
  price: number;
}

interface FeaturedMarket {
  id: string;
  creator: {
    name: string;
    avatar: string;
    id: string;
    tier?: CreatorTier;
  };
  title: string;
  image: string;
  outcomes: FeaturedOutcome[];
  volume: string;
  chance?: number;
}

const featuredMain: FeaturedMarket = {
  id: "1",
  creator: { name: "Pollgy_Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen", tier: "gold" },
  title: "Will Bitcoin reach $100,000 by end of 2025?",
  image: bitcoinImage,
  outcomes: [
    { label: "85,000 to 100,000", price: 68 },
    { label: "100,000 to 120,000", price: 23 },
  ],
  volume: "$2.4M",
};

const featuredSide: FeaturedMarket[] = [
  {
    id: "4",
    creator: { name: "Pollgy_Alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", id: "alex-rodriguez", tier: "silver" },
    title: "Next US Federal Reserve interest rate decision?",
    image: fedImage,
    outcomes: [
      { label: "Yes", price: 45 },
      { label: "No", price: 55 },
    ],
    volume: "$3.1M",
    chance: 91,
  },
  {
    id: "3",
    creator: { name: "Pollgy_Emma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", id: "emma-wilson", tier: "diamond" },
    title: "Will Apple release a foldable iPhone in 2025?",
    image: iphoneImage,
    outcomes: [
      { label: "Yes", price: 23 },
      { label: "No", price: 77 },
    ],
    volume: "$1.2M",
    chance: 91,
  },
];

/* ── Side card (right column) ────────────────────────────── */
function SideCard({ market }: { market: FeaturedMarket }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToBetSlip, isInBetSlip, setIsOpen: setBetSlipOpen } = useBetSlipContext();

  const handleBet = (e: React.MouseEvent, outcome: string, price: number) => {
    e.stopPropagation();
    addToBetSlip(market.id, market.title, outcome, price);
    setBetSlipOpen(true);
    toast({
      title: isInBetSlip(market.id, outcome) ? "Removed from bet slip" : "Added to bet slip",
      description: `${outcome} @ ${price}%`,
    });
  };

  return (
    <Card
      className="group overflow-hidden cursor-pointer border-border bg-card card-hover"
      onClick={() => navigate(`/market/${market.id}`)}
    >
      <div className="p-4">
        {/* Header: avatar + title + chance */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={market.image} />
            <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {market.title}
            </h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">by {market.creator.name}</p>
          </div>
          {market.chance && (
            <div className="flex-shrink-0 text-right">
              <span className="text-lg font-bold text-bet">{market.chance}%</span>
              <p className="text-[10px] text-bet">chance</p>
            </div>
          )}
        </div>

        {/* Yes / No buttons */}
        <div className="flex items-center gap-2 mb-3">
          <button
            className={`flex-1 rounded-lg py-2.5 text-center text-sm font-semibold transition-all active:scale-[0.97] ${
              isInBetSlip(market.id, "Yes")
                ? "bg-bet text-bet-foreground"
                : "bg-bet/10 text-bet hover:bg-bet/20 border border-bet/20"
            }`}
            onClick={(e) => handleBet(e, "Yes", market.outcomes[0].price)}
          >
            Yes
          </button>
          <button
            className={`flex-1 rounded-lg py-2.5 text-center text-sm font-semibold transition-all active:scale-[0.97] ${
              isInBetSlip(market.id, "No")
                ? "bg-against text-against-foreground"
                : "bg-against/10 text-against hover:bg-against/20 border border-against/20"
            }`}
            onClick={(e) => handleBet(e, "No", market.outcomes[1].price)}
          >
            No
          </button>
        </div>

        {/* Footer: Vol + actions */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">Vol. {market.volume}</span>
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded hover:bg-secondary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(`${window.location.origin}/market/${market.id}`);
                toast({ title: "Link copied!" });
              }}
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button
              className="p-1 rounded hover:bg-secondary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toast({ title: "Saved to watchlist" });
              }}
            >
              <Bookmark className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ── Main featured card (left column) ────────────────────── */
function MainCard({ market }: { market: FeaturedMarket }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToBetSlip, isInBetSlip, setIsOpen: setBetSlipOpen } = useBetSlipContext();
  const [activeSlide] = useState(0);
  const totalSlides = 4;

  const handleBet = (e: React.MouseEvent, outcome: string, price: number) => {
    e.stopPropagation();
    addToBetSlip(market.id, market.title, outcome, price);
    setBetSlipOpen(true);
    toast({
      title: isInBetSlip(market.id, outcome) ? "Removed from bet slip" : "Added to bet slip",
      description: `${outcome} @ ${price}%`,
    });
  };

  return (
    <Card
      className="group overflow-hidden cursor-pointer border-border bg-card card-hover h-full"
      onClick={() => navigate(`/market/${market.id}`)}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Header: avatar + title */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-14 w-14 flex-shrink-0 ring-2 ring-border">
            <AvatarImage src={market.image} />
            <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-display font-bold leading-snug group-hover:text-primary transition-colors">
              {market.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">by {market.creator.name}</p>
          </div>
        </div>

        {/* Outcome rows */}
        <div className="space-y-3 flex-1">
          {market.outcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-sm text-foreground font-medium min-w-[140px]">{outcome.label}</span>
              <span className="text-sm font-bold text-foreground w-12 text-right">{outcome.price} %</span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] ${
                    isInBetSlip(market.id, `${outcome.label}-Yes`)
                      ? "bg-bet text-bet-foreground"
                      : "bg-bet/10 text-bet hover:bg-bet/20 border border-bet/20"
                  }`}
                  onClick={(e) => handleBet(e, `${outcome.label}-Yes`, outcome.price)}
                >
                  Yes
                </button>
                <button
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] ${
                    isInBetSlip(market.id, `${outcome.label}-No`)
                      ? "bg-against text-against-foreground"
                      : "bg-against/10 text-against hover:bg-against/20 border border-against/20"
                  }`}
                  onClick={(e) => handleBet(e, `${outcome.label}-No`, 100 - outcome.price)}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: Vol + actions + dots */}
        <div className="flex items-center justify-between mt-5 pt-3">
          <span className="text-xs text-muted-foreground font-medium">Vol. {market.volume}</span>

          {/* Carousel dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === activeSlide ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(`${window.location.origin}/market/${market.id}`);
                toast({ title: "Link copied!" });
              }}
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button
              className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground"
              onClick={(e) => {
                e.stopPropagation();
                toast({ title: "Saved to watchlist" });
              }}
            >
              <Bookmark className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ── Export ───────────────────────────────────────────────── */
export function FeaturedMarketSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3">
      {/* Main featured card */}
      <MainCard market={featuredMain} />

      {/* Stacked side cards */}
      <div className="flex flex-col gap-3">
        {featuredSide.map((m) => (
          <SideCard key={m.id} market={m} />
        ))}
      </div>
    </div>
  );
}
