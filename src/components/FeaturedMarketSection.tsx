import { Card } from "@/components/ui/card";
import { Share2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const market = featuredMain;
  const handleBet = (e: React.MouseEvent, marketId: string) => {
    e.stopPropagation();
    navigate(`/market/${marketId}`);
  };

    return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-1.5">
      {/* Left – Main featured card */}
      <Card
        className="group overflow-hidden cursor-pointer border-border bg-card card-hover md:w-[65%] shadow-card"
        onClick={() => navigate(`/market/${market.id}`)}
      >
        <div className="p-3 sm:p-2 flex flex-col h-full justify-between">
          {/* Mobile: thumbnail + title row */}
          <div className="flex items-start gap-3 sm:gap-1.5 mb-3 sm:mb-1">
            <Avatar className="h-12 w-12 sm:h-10 sm:w-10 flex-shrink-0 ring-2 ring-border rounded-lg overflow-hidden">
              <AvatarImage src={market.image} />
              <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-sm font-display font-bold leading-snug group-hover:text-primary transition-colors">
                {market.title}
              </h3>
              <p className="text-xs sm:text-[11px] text-muted-foreground mt-0.5">by {market.creator.name}</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-1 flex-1 flex flex-col justify-center">
            {market.outcomes.map((outcome, idx) => {
              return (
                <div key={idx} className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                  <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                    <span className="text-sm sm:text-xs text-foreground font-medium sm:min-w-[140px]">{outcome.label}</span>
                    <span className="text-sm sm:text-xs font-bold text-foreground">{outcome.price}%</span>
                  </div>

                  <div className="flex items-center gap-2 sm:ml-auto">
                    <button
                      className="flex-1 sm:flex-none h-10 sm:h-auto px-6 py-2.5 sm:py-1 rounded-[10px] sm:rounded-md text-sm sm:text-xs font-semibold transition-all active:scale-[0.97] bg-bet/10 text-bet hover:bg-bet/20 border border-bet/20"
                      onClick={(e) => handleBet(e, market.id)}
                    >
                      Yes
                    </button>
                    <button
                      className="flex-1 sm:flex-none h-10 sm:h-auto px-6 py-2.5 sm:py-1 rounded-[10px] sm:rounded-md text-sm sm:text-xs font-semibold transition-all active:scale-[0.97] bg-against/10 text-against hover:bg-against/20 border border-against/20"
                      onClick={(e) => handleBet(e, market.id)}
                    >
                      No
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-3 sm:mt-1 pt-2 sm:pt-0.5 border-t border-border">
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
      <div className="flex flex-col gap-2.5 md:gap-1 md:w-[35%]">
        {sideMarkets.map((sm) => (
          <Card
            key={sm.id}
            className="group overflow-hidden cursor-pointer border-border bg-card card-hover flex-1"
            onClick={() => navigate(`/market/${sm.id}`)}
          >
            {/* Desktop layout */}
            <div className="hidden sm:flex flex-col h-full p-1.5">
              <div className="flex items-start gap-2 mb-1">
                <Avatar className="h-7 w-7 flex-shrink-0 ring-1 ring-border">
                  <AvatarImage src={sm.image} />
                  <AvatarFallback>{sm.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-display font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {sm.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">by {sm.creator.name}</p>
                </div>
                <span className="text-xs font-bold text-primary flex-shrink-0">{sm.chance}%</span>
              </div>

              <div className="flex items-center gap-2 mt-auto">
                <button
                  className="flex-1 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-[0.97] bg-bet/10 text-bet hover:bg-bet/20 border border-bet/20"
                  onClick={(e) => handleBet(e, sm.id)}
                >
                  Yes
                </button>
                <button
                  className="flex-1 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-[0.97] bg-against/10 text-against hover:bg-against/20 border border-against/20"
                  onClick={(e) => handleBet(e, sm.id)}
                >
                  No
                </button>
              </div>

              <div className="flex items-center justify-between mt-1 pt-0.5 border-t border-border">
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

            {/* Mobile layout — matches MarketGridCard binary mobile structure */}
            <div className="sm:hidden flex flex-col">
              <div className="flex gap-3 p-3 pb-2">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img src={sm.image} alt={sm.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={sm.creator.avatar} alt={sm.creator.name} />
                      <AvatarFallback className="text-[6px]">{sm.creator.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-[11px] text-muted-foreground font-medium truncate max-w-[140px]">{sm.creator.name}</span>
                  </div>
                  <h3 className="text-[13px] font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {sm.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-xs font-bold text-bet">{sm.chance}%</span>
                    <div className="flex-1 h-1.5 rounded-full bg-against-muted overflow-hidden">
                      <div className="h-full rounded-full bg-bet" style={{ width: `${sm.chance}%` }} />
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold active:scale-95 transition-all bg-bet/15 dark:bg-bet/25 text-bet border border-bet/30 dark:border-bet/40"
                        onClick={(e) => handleBet(e, sm.id)}
                      >
                        Yes
                      </button>
                      <button
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold active:scale-95 transition-all bg-against/15 dark:bg-against/25 text-against border border-against/30 dark:border-against/40"
                        onClick={(e) => handleBet(e, sm.id)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t border-border text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 font-semibold">Vol. {sm.volume}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-secondary transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(`${window.location.origin}/market/${sm.id}`);
                      toast({ title: "Link copied!" });
                    }}
                  >
                    <Share2 className="h-3 w-3" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-secondary transition-colors"
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
