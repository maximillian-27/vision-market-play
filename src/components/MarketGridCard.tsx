import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle2, Timer, Bookmark, Share2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

export function MarketGridCard({ 
  id, creator, title, image, outcomes, yesPrice, noPrice, volume, 
  pot = 0, players = 0, endsIn, status = "open", resolution,
  disputeEndsIn, resolvedAt, resolutionDate,
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
  const yesPercent = isBinary ? displayOutcomes[0].price : 50;
  const noPercent = isBinary ? displayOutcomes[1].price : 50;

  const handleCardClick = () => {
    if (isClosedOrResolved) { setShowResolvedDialog(true); return; }
    if (isMobile) { navigate(`/market/${id}`); } else { setShowMarketDialog(true); }
  };

  const handleOutcomeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBettingDisabled) return;
    if (isMobile) { setShowQuickTrade(true); } else { setShowMarketDialog(true); }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "closing":
        return <span className="flex items-center gap-1 text-amber-500 text-[9px] font-medium whitespace-nowrap"><Timer className="h-2.5 w-2.5 flex-shrink-0 animate-pulse" />{endsIn}</span>;
      case "awaiting_resolution":
        return <span className="flex items-center gap-1 text-pollgy-blue text-[9px] font-medium whitespace-nowrap"><Clock className="h-2.5 w-2.5 flex-shrink-0" />Awaiting</span>;
      case "closed":
        return <span className="flex items-center gap-1 text-amber-600 text-[9px] font-medium"><AlertTriangle className="h-2.5 w-2.5" />Dispute</span>;
      case "resolved":
        return <span className="flex items-center gap-1 text-muted-foreground text-[9px] font-medium"><CheckCircle2 className="h-2.5 w-2.5" />Resolved</span>;
      default: return null;
    }
  };

  const marketDialogData = {
    id, title, image, creator, outcomes: displayOutcomes, volume, pot, players, endsIn, status, resolutionDate,
  };

  return (
    <>
      <MarketDialog open={showMarketDialog} onOpenChange={setShowMarketDialog} market={marketDialogData} />
      <QuickTradeSheet open={showQuickTrade} onOpenChange={setShowQuickTrade} market={{ id, title, outcomes: displayOutcomes, pot }} />
      {isClosedOrResolved && (
        <ResolvedMarketDialog open={showResolvedDialog} onOpenChange={setShowResolvedDialog} market={marketDialogData}
          status={status as "closed" | "resolved"} resolution={resolution || "Yes"} disputeEndsIn={disputeEndsIn} resolvedAt={resolvedAt}
        />
      )}
      
      <Card 
        className={`group overflow-hidden cursor-pointer border-border bg-card card-hover h-full sm:border sm:rounded-xl border-0 rounded-none shadow-none sm:shadow-sm ${isClosingSoon ? 'sm:ring-1 sm:ring-amber-500/30' : ''}`}
        onClick={handleCardClick}
      >
        {/* ── Desktop Layout ── compact, reference-matching */}
        <div className="sm:flex hidden flex-col p-2.5 h-full">
          {/* Header: thumbnail + title + creator */}
          <div className="flex items-start gap-2.5 mb-2">
            <img src={image} alt={title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
              <span className="text-[10px] text-muted-foreground">by {creator.name}</span>
            </div>
          </div>

          {/* Outcomes area */}
          <div className="flex-1 flex flex-col justify-center">
            {isClosedOrResolved ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-secondary/50">
                  <span className="text-[10px] text-muted-foreground">Outcome</span>
                  <span className={`text-xs font-bold ${resolution?.toLowerCase() === "yes" ? 'text-yes' : resolution?.toLowerCase() === "no" ? 'text-no' : 'text-primary'}`}>{resolution}</span>
                </div>
                {status === "closed" && (
                  <Button variant="outline" size="sm" className="w-full text-amber-600 border-amber-500/30 hover:bg-amber-500/10 text-[10px] h-6"
                    onClick={(e) => { e.stopPropagation(); setShowResolvedDialog(true); }}>
                    <AlertTriangle className="h-2.5 w-2.5 mr-1" />Dispute
                  </Button>
                )}
              </div>
            ) : isAwaitingResolution ? (
              <div className="flex gap-1.5">
                <div className="flex-1 rounded-lg py-1 text-center bg-yes/10 text-yes/60 border border-yes/20"><span className="text-[11px] font-bold">Yes {yesPercent}%</span></div>
                <div className="flex-1 rounded-lg py-1 text-center bg-no/10 text-no/60 border border-no/20"><span className="text-[11px] font-bold">No {noPercent}%</span></div>
              </div>
            ) : isBinary ? (
              /* Binary: outcome rows with percentage + Yes/No buttons — like reference */
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground flex-1">Yes</span>
                  <span className="text-xs font-bold w-10 text-right">{yesPercent} %</span>
                  <button onClick={handleOutcomeClick} className="px-3 py-1 rounded-md text-[10px] font-bold bg-yes/10 text-yes hover:bg-yes hover:text-yes-foreground border border-yes/20 hover:border-yes transition-all">Yes</button>
                  <button onClick={handleOutcomeClick} className="px-3 py-1 rounded-md text-[10px] font-bold bg-no/10 text-no hover:bg-no hover:text-no-foreground border border-no/20 hover:border-no transition-all">No</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground flex-1">No</span>
                  <span className="text-xs font-bold w-10 text-right">{noPercent} %</span>
                  <button onClick={handleOutcomeClick} className="px-3 py-1 rounded-md text-[10px] font-bold bg-yes/10 text-yes hover:bg-yes hover:text-yes-foreground border border-yes/20 hover:border-yes transition-all">Yes</button>
                  <button onClick={handleOutcomeClick} className="px-3 py-1 rounded-md text-[10px] font-bold bg-no/10 text-no hover:bg-no hover:text-no-foreground border border-no/20 hover:border-no transition-all">No</button>
                </div>
              </div>
            ) : (
              /* Multi-outcome: rows with label + % + Yes/No */
              <div className="space-y-1">
                {displayOutcomes.slice(0, 3).map((outcome, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex-1 truncate">{outcome.label}</span>
                    <span className="text-xs font-bold w-10 text-right">{outcome.price} %</span>
                    <button onClick={handleOutcomeClick} className="px-3 py-1 rounded-md text-[10px] font-bold bg-yes/10 text-yes hover:bg-yes hover:text-yes-foreground border border-yes/20 hover:border-yes transition-all">Yes</button>
                    <button onClick={handleOutcomeClick} className="px-3 py-1 rounded-md text-[10px] font-bold bg-no/10 text-no hover:bg-no hover:text-no-foreground border border-no/20 hover:border-no transition-all">No</button>
                  </div>
                ))}
                {displayOutcomes.length > 3 && (
                  <p className="text-[9px] text-muted-foreground">+{displayOutcomes.length - 3} more</p>
                )}
              </div>
            )}
          </div>
          
          {/* Footer: pot + players + time + icons */}
          <div className="flex items-center justify-between text-[9px] text-muted-foreground mt-2 pt-1.5 border-t border-border/50">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Vol. {potDisplay}</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge() || (
                <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{endsIn}</span>
              )}
              {!isClosedOrResolved && (
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-0.5 rounded hover:bg-secondary" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(`${window.location.origin}/market/${id}`); toast({ title: "Link copied!" }); }}>
                    <Share2 className="h-2.5 w-2.5" />
                  </button>
                  <button className="p-0.5 rounded hover:bg-secondary" onClick={(e) => { e.stopPropagation(); toast({ title: "Saved to watchlist" }); }}>
                    <Bookmark className="h-2.5 w-2.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile Layout — flat list item (unchanged) ── */}
        <div className="sm:hidden py-3 px-4">
          <div className="flex gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
              <button className="flex items-center gap-1 mt-0.5 hover:opacity-70 transition-opacity"
                onClick={(e) => { e.stopPropagation(); const profilePath = creator.isCreator !== false ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}` : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`; navigate(profilePath); }}>
                <span className="text-[11px] text-muted-foreground">by {creator.name}</span>
              </button>
            </div>
          </div>

          <div className="mt-2.5">
            {isClosedOrResolved ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Outcome:</span>
                <span className={`font-bold text-xs ${resolution?.toLowerCase() === "yes" ? 'text-yes' : resolution?.toLowerCase() === "no" ? 'text-no' : 'text-primary'}`}>{resolution}</span>
                {status === "closed" && (
                  <button className="ml-auto px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[11px] font-medium"
                    onClick={(e) => { e.stopPropagation(); setShowResolvedDialog(true); }}>Dispute</button>
                )}
              </div>
            ) : isAwaitingResolution ? (
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg py-2 text-center bg-yes/10 text-yes/60 border border-yes/20"><span className="text-[13px] font-bold">Yes {yesPercent}%</span></div>
                <div className="flex-1 rounded-lg py-2 text-center bg-no/10 text-no/60 border border-no/20"><span className="text-[13px] font-bold">No {noPercent}%</span></div>
              </div>
            ) : isBinary ? (
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg py-2.5 text-center bg-yes/10 hover:bg-yes/20 text-yes border border-yes/20 active:scale-[0.98] transition-all" onClick={handleOutcomeClick}>
                  <span className="text-[13px] font-bold">Yes {yesPercent}%</span>
                </button>
                <button className="flex-1 rounded-lg py-2.5 text-center bg-no/10 hover:bg-no/20 text-no border border-no/20 active:scale-[0.98] transition-all" onClick={handleOutcomeClick}>
                  <span className="text-[13px] font-bold">No {noPercent}%</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {displayOutcomes.slice(0, 3).map((outcome, index) => (
                  <button key={index} className="flex items-center gap-1.5 rounded-lg px-3 py-2 bg-secondary/60 border border-border text-[12px] active:scale-[0.98] transition-all flex-shrink-0" onClick={handleOutcomeClick}>
                    {outcome.logo && <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain rounded-sm" />}
                    <span className="font-medium">{outcome.label}</span>
                    <span className="font-bold text-primary">{outcome.price}%</span>
                  </button>
                ))}
                {displayOutcomes.length > 3 && <span className="text-[10px] text-muted-foreground self-center flex-shrink-0">+{displayOutcomes.length - 3}</span>}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground">Pot {potDisplay}</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{players > 0 ? players.toLocaleString() : '0'}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{endsIn}</span>
            </div>
            {!isClosedOrResolved && (
              <div className="flex items-center gap-1">
                <button className="p-1 rounded hover:bg-secondary transition-colors"
                  onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(`${window.location.origin}/market/${id}`); toast({ title: "Link copied!" }); }}>
                  <Share2 className="h-3.5 w-3.5" />
                </button>
                <button className="p-1 rounded hover:bg-secondary transition-colors"
                  onClick={(e) => { e.stopPropagation(); toast({ title: "Saved to watchlist" }); }}>
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
