import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle2, Timer, Bookmark, Share2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarketDialog } from "@/components/MarketDialog";
import { ResolvedMarketDialog } from "@/components/ResolvedMarketDialog";
import { QuickTradeSheet } from "@/components/QuickTradeSheet";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type MarketStatus = "open" | "closing" | "awaiting_resolution" | "closed" | "resolved";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
}

interface MarketGridCardProps {
  id: string;
  creator: {
    name: string;
    avatar: string;
    id?: string;
    isCreator?: boolean;
  };
  title: string;
  image: string;
  outcomes?: Outcome[];
  yesPrice?: number;
  noPrice?: number;
  volume: string;
  pot?: number;
  players?: number;
  endsIn: string;
  status?: MarketStatus;
  resolution?: string;
  disputeEndsIn?: string;
  resolvedAt?: string;
  resolutionDate?: string;
}

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

function getWinUpTo(pot: number, outcomes: Outcome[]): string {
  // Estimate: if you bet $10 on lowest-probability outcome
  const lowestPrice = Math.min(...outcomes.map(o => o.price).filter(p => p > 0));
  if (lowestPrice <= 0) return "";
  const payout = (10 / (lowestPrice / 100)) * (pot > 0 ? 1 : 0);
  if (payout >= 1000000) return `$${(payout / 1000000).toFixed(0)}M`;
  if (payout >= 1000) return `$${(payout / 1000).toFixed(0)}K`;
  return `$${payout.toFixed(0)}`;
}

export function MarketGridCard({ 
  id, 
  creator,
  title, 
  image, 
  outcomes, 
  yesPrice, 
  noPrice, 
  volume, 
  pot = 0,
  players = 0,
  endsIn,
  status = "open",
  resolution,
  disputeEndsIn,
  resolvedAt,
  resolutionDate,
}: MarketGridCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showMarketDialog, setShowMarketDialog] = useState(false);
  const [showQuickTrade, setShowQuickTrade] = useState(false);
  const [showResolvedDialog, setShowResolvedDialog] = useState(false);
  
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const isClosedOrResolved = status === "closed" || status === "resolved";
  const isAwaitingResolution = status === "awaiting_resolution";
  const isBettingDisabled = isClosedOrResolved || isAwaitingResolution;
  const isBinary = displayOutcomes.length === 2 && !outcomes;
  const isClosingSoon = status === "closing";

  const potDisplay = pot > 0 ? formatPot(pot) : volume;
  const winUpTo = pot > 0 && !isBettingDisabled ? getWinUpTo(pot, displayOutcomes) : "";

  const handleCardClick = () => {
    if (isClosedOrResolved) {
      setShowResolvedDialog(true);
      return;
    }
    if (isMobile) {
      navigate(`/market/${id}`);
    } else {
      setShowMarketDialog(true);
    }
  };

  const handleOutcomeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBettingDisabled) return;
    if (isMobile) {
      setShowQuickTrade(true);
    } else {
      setShowMarketDialog(true);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "closing":
        return (
          <span className="flex items-center gap-1 text-amber-500 text-[10px] font-medium whitespace-nowrap">
            <Timer className="h-2.5 w-2.5 flex-shrink-0 animate-pulse" />
            {endsIn}
          </span>
        );
      case "awaiting_resolution":
        return (
          <span className="flex items-center gap-1 text-blue-500 text-[10px] font-medium whitespace-nowrap">
            <Clock className="h-2.5 w-2.5 flex-shrink-0" />
            Awaiting Resolution
          </span>
        );
      case "closed":
        return (
          <span className="flex items-center gap-1 text-orange-500 text-[10px] font-medium">
            <AlertTriangle className="h-2.5 w-2.5" />
            Dispute: {disputeEndsIn}
          </span>
        );
      case "resolved":
        return (
          <span className="flex items-center gap-1 text-muted-foreground text-[10px] font-medium">
            <CheckCircle2 className="h-2.5 w-2.5" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const marketDialogData = {
    id,
    title,
    image,
    creator,
    outcomes: displayOutcomes,
    volume,
    pot,
    players,
    endsIn,
    status,
    resolutionDate,
  };

  const yesPercent = isBinary ? displayOutcomes[0].price : 50;
  const noPercent = isBinary ? displayOutcomes[1].price : 50;

  return (
    <>
      <MarketDialog
        open={showMarketDialog}
        onOpenChange={setShowMarketDialog}
        market={marketDialogData}
      />

      <QuickTradeSheet
        open={showQuickTrade}
        onOpenChange={setShowQuickTrade}
        market={{
          id,
          title,
          outcomes: displayOutcomes,
          pot,
        }}
      />
      
      {isClosedOrResolved && (
        <ResolvedMarketDialog
          open={showResolvedDialog}
          onOpenChange={setShowResolvedDialog}
          market={marketDialogData}
          status={status as "closed" | "resolved"}
          resolution={resolution || "Yes"}
          disputeEndsIn={disputeEndsIn}
          resolvedAt={resolvedAt}
        />
      )}
      
      <Card 
        className={`group overflow-hidden cursor-pointer border-border bg-card card-hover h-full sm:border sm:rounded-lg border-0 rounded-none shadow-none sm:shadow-sm ${
          isClosingSoon ? 'sm:ring-1 sm:ring-amber-500/30' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Desktop Layout — Compact with inline outcome rows */}
        <div className="sm:flex hidden flex-col p-2.5 h-full">
          {/* Header: thumb + title + creator */}
          <div className="flex items-start gap-2.5 mb-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <span className="text-[10px] text-muted-foreground">by {creator.name}</span>
            </div>
          </div>

          {/* Outcome rows */}
          <div className="flex-1 flex flex-col justify-center space-y-1">
            {isClosedOrResolved ? (
              <div className="flex items-center justify-between py-1 px-2 rounded-md bg-secondary/50">
                <span className="text-[11px] text-muted-foreground">Outcome</span>
                <span className={`text-xs font-bold ${
                  resolution?.toLowerCase() === "yes" ? 'text-yes' : 
                  resolution?.toLowerCase() === "no" ? 'text-no' : 'text-primary'
                }`}>
                  {resolution}
                </span>
              </div>
            ) : isAwaitingResolution ? (
              <>
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md bg-secondary/40">
                  <span className="text-[11px] font-medium">Yes</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold">{yesPercent}%</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">Locked</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md bg-secondary/40">
                  <span className="text-[11px] font-medium">No</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold">{noPercent}%</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">Locked</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {displayOutcomes.slice(0, isBinary ? 2 : 4).map((outcome, index) => (
                  <div key={index} className="flex items-center justify-between py-1 px-1.5 rounded-md bg-secondary/40 hover:bg-secondary/60 transition-colors">
                    <span className="text-[11px] font-medium truncate flex-1">{outcome.label}</span>
                    <div className="flex items-center gap-1.5 ml-2">
                      <span className="text-[11px] font-bold">{outcome.price}%</span>
                      <button
                        className="px-2 py-0.5 rounded-full bg-yes/15 text-yes text-[10px] font-bold hover:bg-yes/30 transition-colors active:scale-95"
                        onClick={handleOutcomeClick}
                      >
                        Yes
                      </button>
                      {isBinary && (
                        <button
                          className="px-2 py-0.5 rounded-full bg-no/15 text-no text-[10px] font-bold hover:bg-no/30 transition-colors active:scale-95"
                          onClick={handleOutcomeClick}
                        >
                          No
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {!isBinary && displayOutcomes.length > 4 && (
                  <p className="text-[9px] text-muted-foreground pl-1.5">+{displayOutcomes.length - 4} more</p>
                )}
              </>
            )}
          </div>

          {/* Footer: Vol + players + timer + icons */}
          <div className="flex items-center justify-between text-[9px] text-muted-foreground mt-1.5 pt-1.5 border-t border-border/60">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-foreground text-[10px]">Vol. {potDisplay}</span>
              <span className="flex items-center gap-0.5">
                <Users className="h-2.5 w-2.5" />
                {players > 0 ? players.toLocaleString() : '0'}
              </span>
              {getStatusBadge() || (
                <span className="flex items-center gap-0.5">
                  <Clock className="h-2.5 w-2.5" />
                  {endsIn}
                </span>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              <button 
                className="p-1 rounded hover:bg-secondary transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(`${window.location.origin}/market/${id}`);
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

        {/* Mobile Layout — flat list item */}
        <div className="sm:hidden py-3 px-4">
          {/* Row 1: Thumbnail + Title */}
          <div className="flex gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <button 
                className="flex items-center gap-1 mt-0.5 hover:opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  const profilePath = creator.isCreator !== false 
                    ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
                    : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
                  navigate(profilePath);
                }}
              >
                <span className="text-[11px] text-muted-foreground">by {creator.name}</span>
              </button>
            </div>
          </div>

          {/* Row 2: Outcomes */}
          <div className="mt-2.5">
            {isClosedOrResolved ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Outcome:</span>
                <span className={`font-bold text-xs ${
                  resolution?.toLowerCase() === "yes" ? 'text-yes' : 
                  resolution?.toLowerCase() === "no" ? 'text-no' : 'text-primary'
                }`}>
                  {resolution}
                </span>
                {status === "closed" && (
                  <button 
                    className="ml-auto px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-600 border border-orange-500/20 text-[11px] font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowResolvedDialog(true);
                    }}
                  >
                    Dispute
                  </button>
                )}
              </div>
            ) : isAwaitingResolution ? (
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg py-2 text-center bg-yes/10 text-yes/60 border border-yes/20">
                  <span className="text-[13px] font-bold">Yes {yesPercent}%</span>
                </div>
                <div className="flex-1 rounded-lg py-2 text-center bg-no/10 text-no/60 border border-no/20">
                  <span className="text-[13px] font-bold">No {noPercent}%</span>
                </div>
              </div>
            ) : isBinary ? (
              <div className="flex gap-2">
                <button 
                  className="flex-1 rounded-lg py-2.5 text-center bg-yes/10 hover:bg-yes/20 text-yes border border-yes/20 active:scale-[0.98] transition-all"
                  onClick={handleOutcomeClick}
                >
                  <span className="text-[13px] font-bold">Yes {yesPercent}%</span>
                </button>
                <button 
                  className="flex-1 rounded-lg py-2.5 text-center bg-no/10 hover:bg-no/20 text-no border border-no/20 active:scale-[0.98] transition-all"
                  onClick={handleOutcomeClick}
                >
                  <span className="text-[13px] font-bold">No {noPercent}%</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {displayOutcomes.slice(0, 3).map((outcome, index) => (
                  <button 
                    key={index}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 bg-secondary/60 border border-border text-[12px] active:scale-[0.98] transition-all flex-shrink-0"
                    onClick={handleOutcomeClick}
                  >
                    {outcome.logo && (
                      <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain rounded-sm" />
                    )}
                    <span className="font-medium">{outcome.label}</span>
                    <span className="font-bold text-primary">{outcome.price}%</span>
                  </button>
                ))}
                {displayOutcomes.length > 3 && (
                  <span className="text-[10px] text-muted-foreground self-center flex-shrink-0">+{displayOutcomes.length - 3}</span>
                )}
              </div>
            )}
          </div>

          {/* Row 3: Footer — Pot + icons */}
          <div className="flex items-center justify-between mt-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground">Pot {potDisplay}</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {players > 0 ? players.toLocaleString() : '0'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {endsIn}
              </span>
            </div>
            {!isClosedOrResolved && (
              <div className="flex items-center gap-1">
                <button 
                  className="p-1 rounded hover:bg-secondary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(`${window.location.origin}/market/${id}`);
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
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
