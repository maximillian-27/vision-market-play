import { Card } from "@/components/ui/card";
import { Share2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import federalReserveImage from "@/assets/federal-reserve.jpg";
import foldableIphoneImage from "@/assets/foldable-iphone.jpg";

const featuredMain = {
  id: "1",
  creator: { name: "Pollgy_Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen" },
  title: "Will Bitcoin reach $100,000 by end of 2025?",
  image: bitcoinImage,
  outcomes: [
    { label: "85,000 to 100,000", price: 68 },
    { label: "100,000 to 120,000", price: 23 },
  ],
  volume: "$2.4M",
};

const sideMarkets = [
  {
    id: "2",
    creator: { name: "Pollgy_Mike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
    title: "Will the Fed cut rates before July 2025?",
    image: federalReserveImage,
    chance: 72,
    volume: "$890K",
  },
  {
    id: "3",
    creator: { name: "Pollgy_Alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    title: "Will Apple release a foldable iPhone in 2025?",
    image: foldableIphoneImage,
    chance: 18,
    volume: "$1.2M",
  },
];

export function FeaturedMarketSection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToBetSlip, isInBetSlip, setIsOpen: setBetSlipOpen } = useBetSlipContext();
  const market = featuredMain;

  const handleBet = (e: React.MouseEvent, marketId: string, marketTitle: string, outcome: string, price: number) => {
    e.stopPropagation();
    addToBetSlip(marketId, marketTitle, outcome, price);
    setBetSlipOpen(true);
    toast({
      title: isInBetSlip(marketId, outcome) ? "Removed from bet slip" : "Added to bet slip",
      description: `${outcome} @ ${price}%`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left – Main featured card */}
      <Card
        className="group overflow-hidden cursor-pointer border-border bg-card card-hover md:w-[65%]"
        onClick={() => navigate(`/market/${market.id}`)}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-20 w-20 flex-shrink-0 ring-2 ring-border">
              <AvatarImage src={market.image} />
              <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-display font-bold leading-snug group-hover:text-primary transition-colors">
                {market.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">by {market.creator.name}</p>
            </div>
          </div>

          <div className="space-y-5 flex-1 flex flex-col justify-center">
            {market.outcomes.map((outcome, idx) => {
              return (
                <div key={idx} className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                  <span className="text-lg text-foreground font-medium min-w-[160px]">{outcome.label}</span>
                  <span className="text-lg font-bold text-foreground">{outcome.price}%</span>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-[0.97] ${
                        isInBetSlip(market.id, `${outcome.label}-Yes`)
                          ? "bg-bet text-bet-foreground"
                          : "bg-bet/10 text-bet hover:bg-bet/20 border border-bet/20"
                      }`}
                      onClick={(e) => handleBet(e, market.id, market.title, `${outcome.label}-Yes`, outcome.price)}
                    >
                      Yes
                    </button>
                    <button
                      className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-[0.97] ${
                        isInBetSlip(market.id, `${outcome.label}-No`)
                          ? "bg-against text-against-foreground"
                          : "bg-against/10 text-against hover:bg-against/20 border border-against/20"
                      }`}
                      onClick={(e) => handleBet(e, market.id, market.title, `${outcome.label}-No`, 100 - outcome.price)}
                    >
                      No
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-5 pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium">Vol. {market.volume}</span>
              <div className="flex items-center gap-1.5 ml-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
              </div>
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

      {/* Right – Two stacked compact cards */}
      <div className="flex flex-col gap-4 md:w-[35%]">
        {sideMarkets.map((sm) => (
          <Card
            key={sm.id}
            className="group overflow-hidden cursor-pointer border-border bg-card card-hover flex-1"
            onClick={() => navigate(`/market/${sm.id}`)}
          >
            <div className="p-4 flex flex-col h-full">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-10 w-10 flex-shrink-0 ring-1 ring-border">
                  <AvatarImage src={sm.image} />
                  <AvatarFallback>{sm.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-display font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {sm.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">by {sm.creator.name}</p>
                </div>
                <span className="text-sm font-bold text-primary flex-shrink-0">{sm.chance}%</span>
              </div>

              <div className="flex items-center gap-2 mt-auto">
                <button
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] ${
                    isInBetSlip(sm.id, "Yes")
                      ? "bg-bet text-bet-foreground"
                      : "bg-bet/10 text-bet hover:bg-bet/20 border border-bet/20"
                  }`}
                  onClick={(e) => handleBet(e, sm.id, sm.title, "Yes", sm.chance)}
                >
                  Yes
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] ${
                    isInBetSlip(sm.id, "No")
                      ? "bg-against text-against-foreground"
                      : "bg-against/10 text-against hover:bg-against/20 border border-against/20"
                  }`}
                  onClick={(e) => handleBet(e, sm.id, sm.title, "No", 100 - sm.chance)}
                >
                  No
                </button>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                <span className="text-[11px] text-muted-foreground font-medium">Vol. {sm.volume}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(`${window.location.origin}/market/${sm.id}`);
                      toast({ title: "Link copied!" });
                    }}
                  >
                    <Share2 className="h-3 w-3" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({ title: "Saved to watchlist" });
                    }}
                  >
                    <Bookmark className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
