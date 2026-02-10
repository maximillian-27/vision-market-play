import { Card } from "@/components/ui/card";
import { Share2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import bitcoinImage from "@/assets/bitcoin-market.jpg";

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

export function FeaturedMarketSection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToBetSlip, isInBetSlip, setIsOpen: setBetSlipOpen } = useBetSlipContext();
  const market = featuredMain;

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
      <div className="p-5 flex flex-col">
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

        <div className="space-y-3">
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

        <div className="flex items-center justify-between mt-5 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground font-medium">Vol. {market.volume}</span>
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
