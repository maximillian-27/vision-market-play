import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle2, Timer, Bookmark, Share2, Users, Ticket, Trophy } from "lucide-react";
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

function formatWinUpTo(pot: number, outcomes: Outcome[]): string {
  const lowestPrice = Math.min(...outcomes.map(o => o.price).filter(p => p > 0));
  if (lowestPrice <= 0) return "";
  const payout = 10 / (lowestPrice / 100);
  if (payout >= 1000000) return `$${(payout / 1000000).toFixed(0)}M`;
  if (payout >= 1000) return `$${(payout / 1000).toFixed(0)}K`;
  return `$${payout.toFixed(0)}`;
}

export function MarketGridCard({ 
  id, creator, title, image, outcomes, yesPrice, noPrice, 
  volume, pot = 0, players = 0, endsIn, status = "open",
  resolution, disputeEndsIn, resolvedAt, resolutionDate,
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
  const winUpTo = pot > 0 && !isBettingDisabled ? formatWinUpTo(pot, displayOutcomes) : "";

  const yesPercent = isBinary ? displayOutcomes[0].price : 50;
  const noPercent = isBinary ? displayOutcomes[1].price : 50;

  const handleCardClick = () => {
    if (isClosedOrResolved) { setShowResolvedDialog(true); return; }
    if (isMobile) navigate(`/market/${id}`);
    else setShowMarketDialog(true);
  };

  const handleOutcomeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBettingDisabled) return;
    if (isMobile) setShowQuickTrade(true);
    else setShowMarketDialog(true);
  };

  const marketDialogData = {
    id, title, image, creator, outcomes: displayOutcomes,
    volume, pot, players, endsIn, status, resolutionDate,
  };

  const StatusBadge = () => {
    switch (status) {
      case "closing":
        return (
          <span className="flex items-center gap-1 text-amber-500 text-[10px] font-semibold whitespace-nowrap">
            <Timer className="h-2.5 w-2.5 animate-pulse" />
            {endsIn}
          </span>
        );
      case "awaiting_resolution":
        return (
          <span className="flex items-center gap-1 text-pollgy-blue text-[10px] font-medium whitespace-nowrap">
            <Clock className="h-2.5 w-2.5" />
            Awaiting
          </span>
        );
      case "closed":
        return (
          <span className="flex items-center gap-1 text-amber-600 text-[10px] font-medium">
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
      default: return null;
    }
  };

  /* ── Outcome Buttons (shared logic) ── */
  const OutcomeButtons = ({ compact = false }: { compact?: boolean }) => {
    if (isClosedOrResolved) {
      return (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
            <span className="text-xs text-muted-foreground">Winner</span>
            <span className={`text-sm font-bold ${
              resolution?.toLowerCase() === "yes" ? 'text-yes' : 
              resolution?.toLowerCase() === "no" ? 'text-no' : 'text-primary'
            }`}>
              {resolution}
            </span>
          </div>
          {status === "closed" && (
            <Button
              variant="outline" size="sm"
              className="w-full text-amber-600 border-amber-500/30 hover:bg-amber-500/10 text-xs h-7"
              onClick={(e) => { e.stopPropagation(); setShowResolvedDialog(true); }}
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Dispute
            </Button>
          )}
        </div>
      );
    }

    if (isAwaitingResolution) {
      return (
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg py-2 text-center bg-yes/10 text-yes/60 border border-yes/20">
            <span className="text-xs font-bold">Yes {yesPercent}%</span>
          </div>
          <div className="flex-1 rounded-lg py-2 text-center bg-no/10 text-no/60 border border-no/20">
            <span className="text-xs font-bold">No {noPercent}%</span>
          </div>
        </div>
      );
    }

    if (isBinary) {
      return (
        <div className="flex gap-2">
          <button 
            className={`flex-1 rounded-lg ${compact ? 'py-2' : 'py-2.5'} text-center bg-yes/15 dark:bg-yes/25 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 dark:border-yes/40 hover:border-yes transition-all active:scale-[0.98]`}
            onClick={handleOutcomeClick}
          >
            <span className={`${compact ? 'text-xs' : 'text-[13px]'} font-bold`}>Yes {yesPercent}%</span>
          </button>
          <button 
            className={`flex-1 rounded-lg ${compact ? 'py-2' : 'py-2.5'} text-center bg-no/15 dark:bg-no/25 hover:bg-no text-no hover:text-no-foreground border border-no/30 dark:border-no/40 hover:border-no transition-all active:scale-[0.98]`}
            onClick={handleOutcomeClick}
          >
            <span className={`${compact ? 'text-xs' : 'text-[13px]'} font-bold`}>No {noPercent}%</span>
          </button>
        </div>
      );
    }

    // Multi-outcome: every outcome is a clickable button
    return (
      <div className={`grid ${compact ? 'grid-cols-2 gap-1.5' : 'grid-cols-2 gap-2'}`}>
        {displayOutcomes.map((outcome, index) => (
          <button
            key={index}
            className={`flex items-center justify-between gap-1.5 rounded-lg ${compact ? 'px-2.5 py-1.5' : 'px-3 py-2'} bg-secondary/60 hover:bg-primary/10 border border-border/60 hover:border-primary/30 transition-all active:scale-[0.98] group/btn`}
            onClick={handleOutcomeClick}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              {outcome.logo ? (
                <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain rounded-sm flex-shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary flex-shrink-0">
                  {outcome.label.charAt(0)}
                </div>
              )}
              <span className={`${compact ? 'text-[11px]' : 'text-xs'} font-medium truncate`}>{outcome.label}</span>
            </div>
            <span className={`${compact ? 'text-[11px]' : 'text-xs'} font-bold text-primary flex-shrink-0`}>{outcome.price}%</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <MarketDialog open={showMarketDialog} onOpenChange={setShowMarketDialog} market={marketDialogData} />
      <QuickTradeSheet open={showQuickTrade} onOpenChange={setShowQuickTrade} market={{ id, title, outcomes: displayOutcomes, pot }} />
      {isClosedOrResolved && (
        <ResolvedMarketDialog
          open={showResolvedDialog} onOpenChange={setShowResolvedDialog}
          market={marketDialogData} status={status as "closed" | "resolved"}
          resolution={resolution || "Yes"} disputeEndsIn={disputeEndsIn} resolvedAt={resolvedAt}
        />
      )}
      
      <Card 
        className={`group overflow-hidden cursor-pointer border-border bg-card card-hover h-full sm:border sm:rounded-lg border-0 rounded-none shadow-none sm:shadow-sm ${
          isClosingSoon ? 'sm:ring-1 sm:ring-amber-500/30' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* ── Desktop Layout ── */}
        <div className="sm:flex hidden flex-col p-3 h-full">
          {/* Header: image + title */}
          <div className="flex items-start gap-3 mb-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img src={image} alt={title} className="h-full w-full object-cover" />
              {isClosingSoon && (
                <div className="absolute inset-0 bg-amber-500/20 animate-pulse" />
              )}
            </div>
            <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors flex-1">
              {title}
            </h3>
          </div>

          {/* Pot + Players row — the hero element */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold">
              <Trophy className="h-3 w-3" />
              {potDisplay}
            </span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Users className="h-2.5 w-2.5" />
              {players > 0 ? players.toLocaleString() : '0'}
            </span>
          </div>

          {/* Outcomes — all tradable buttons */}
          <div className="flex-1 flex flex-col justify-center">
            <OutcomeButtons compact />
          </div>

          {/* Win up to hook */}
          {winUpTo && (
            <p className="text-[10px] text-primary font-semibold mt-2 flex items-center gap-1">
              <Ticket className="h-3 w-3" />
              Win up to {winUpTo} from $10
            </p>
          )}
          
          {/* Footer */}
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-2 pt-2 border-t border-border">
            <StatusBadge />
            {!StatusBadge() && (
              <span className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {endsIn}
              </span>
            )}
            {!isClosedOrResolved && (
              <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  onClick={(e) => { e.stopPropagation(); toast({ title: "Saved to watchlist" }); }}
                >
                  <Bookmark className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile Layout — flat list item ── */}
        <div className="sm:hidden py-3 px-4">
          {/* Row 1: Thumbnail + Title + Pot */}
          <div className="flex gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img src={image} alt={title} className="h-full w-full object-cover" />
              {isClosingSoon && (
                <div className="absolute inset-0 bg-amber-500/20 animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold leading-snug line-clamp-2">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold">
                  <Trophy className="h-2.5 w-2.5" />
                  {potDisplay}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Users className="h-2.5 w-2.5" />
                  {players > 0 ? players.toLocaleString() : '0'}
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Outcomes */}
          <div className="mt-2.5">
            <OutcomeButtons />
          </div>

          {/* Row 3: Win up to + footer */}
          <div className="flex items-center justify-between mt-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              {winUpTo && (
                <span className="text-primary font-semibold flex items-center gap-1">
                  <Ticket className="h-3 w-3" />
                  Win up to {winUpTo}
                </span>
              )}
              {!winUpTo && <StatusBadge />}
              {!winUpTo && !StatusBadge() && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {endsIn}
                </span>
              )}
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
                  onClick={(e) => { e.stopPropagation(); toast({ title: "Saved to watchlist" }); }}
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
