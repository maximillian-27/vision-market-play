import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle2, Timer, Bookmark, Share2, Users, Ticket } from "lucide-react";
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

const MAX_VISIBLE_OUTCOMES = 2;

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

  /* ── Resolved / Closed result ── */
  const ResolvedDisplay = () => {
    if (!isClosedOrResolved) return null;
    return (
      <div className="flex items-center justify-between py-1.5 px-2.5 rounded-md bg-secondary/50">
        <span className="text-[10px] text-muted-foreground">Result</span>
        <span className={`text-xs font-bold ${
          resolution?.toLowerCase() === "yes" ? 'text-yes' : 
          resolution?.toLowerCase() === "no" ? 'text-no' : 'text-primary'
        }`}>
          {resolution}
        </span>
      </div>
    );
  };

  /* ── Outcome Buttons ── */
  const OutcomeButtons = () => {
    if (isClosedOrResolved) return <ResolvedDisplay />;

    if (isAwaitingResolution) {
      if (isBinary) {
        return (
          <div className="flex gap-1">
            <div className="flex-1 rounded py-1 text-center bg-yes/10 text-yes/60 border border-yes/20">
              <span className="text-[10px] font-bold">Yes {displayOutcomes[0].price}%</span>
            </div>
            <div className="flex-1 rounded py-1 text-center bg-no/10 text-no/60 border border-no/20">
              <span className="text-[10px] font-bold">No {displayOutcomes[1].price}%</span>
            </div>
          </div>
        );
      }
      return (
        <div className="space-y-0.5">
          {displayOutcomes.slice(0, MAX_VISIBLE_OUTCOMES).map((o, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-0.5 rounded bg-secondary/40 text-muted-foreground">
              <span className="text-[10px] truncate">{o.label}</span>
              <span className="text-[10px] font-semibold">{o.price}%</span>
            </div>
          ))}
        </div>
      );
    }

    if (isBinary) {
      return (
        <div className="flex gap-1">
          <button 
            className="flex-1 rounded py-1 text-center bg-yes/15 dark:bg-yes/25 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 dark:border-yes/40 hover:border-yes transition-all active:scale-[0.98]"
            onClick={handleOutcomeClick}
          >
            <span className="text-[10px] font-bold">Yes {displayOutcomes[0].price}%</span>
          </button>
          <button 
            className="flex-1 rounded py-1 text-center bg-no/15 dark:bg-no/25 hover:bg-no text-no hover:text-no-foreground border border-no/30 dark:border-no/40 hover:border-no transition-all active:scale-[0.98]"
            onClick={handleOutcomeClick}
          >
            <span className="text-[10px] font-bold">No {displayOutcomes[1].price}%</span>
          </button>
        </div>
      );
    }

    // Multi-outcome: compact list with "more" 
    const visible = displayOutcomes.slice(0, MAX_VISIBLE_OUTCOMES);
    const remaining = displayOutcomes.length - MAX_VISIBLE_OUTCOMES;

    return (
      <div className="space-y-0.5">
        {visible.map((outcome, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between px-2 py-1 rounded bg-secondary/50 hover:bg-primary/10 border border-border/40 hover:border-primary/30 transition-all active:scale-[0.98]"
            onClick={handleOutcomeClick}
          >
            <div className="flex items-center gap-1 min-w-0">
              {outcome.logo ? (
                <img src={outcome.logo} alt={outcome.label} className="h-3 w-3 object-contain rounded-sm flex-shrink-0" />
              ) : (
                <span className="h-3 w-3 rounded-full bg-primary/10 flex items-center justify-center text-[7px] font-bold text-primary flex-shrink-0">
                  {outcome.label.charAt(0)}
                </span>
              )}
              <span className="text-[10px] font-medium truncate">{outcome.label}</span>
            </div>
            <span className="text-[10px] font-bold text-primary flex-shrink-0">{outcome.price}%</span>
          </button>
        ))}
        {remaining > 0 && (
          <button
            className="w-full text-center text-[9px] font-medium text-muted-foreground hover:text-primary py-0.5 transition-colors"
            onClick={handleOutcomeClick}
          >
            +{remaining} more
          </button>
        )}
      </div>
    );
  };

  /* ── Status line ── */
  const statusLine = () => {
    switch (status) {
      case "closing":
        return (
          <span className="flex items-center gap-1 text-amber-500 text-[10px] font-semibold animate-pulse">
            <Timer className="h-2.5 w-2.5" />{endsIn}
          </span>
        );
      case "awaiting_resolution":
        return (
          <span className="flex items-center gap-1 text-pollgy-blue text-[10px] font-medium">
            <Clock className="h-2.5 w-2.5" />Awaiting
          </span>
        );
      case "closed":
        return (
          <span className="flex items-center gap-1 text-amber-600 text-[10px] font-medium">
            <AlertTriangle className="h-2.5 w-2.5" />Dispute: {disputeEndsIn}
          </span>
        );
      case "resolved":
        return (
          <span className="flex items-center gap-1 text-muted-foreground text-[10px]">
            <CheckCircle2 className="h-2.5 w-2.5" />Resolved
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-muted-foreground text-[10px]">
            <Clock className="h-2.5 w-2.5" />{endsIn}
          </span>
        );
    }
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
        {/* ── Desktop/Tablet ── */}
        <div className="sm:flex hidden flex-col p-2.5 h-full gap-1.5">
          {/* Title */}
          <h3 className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Pot + Players */}
          <div className="flex items-center justify-between">
            <span className="text-primary text-xs font-extrabold">{potDisplay} <span className="text-[9px] font-medium text-muted-foreground">pot</span></span>
            <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
              <Users className="h-2.5 w-2.5" />{players.toLocaleString()}
            </span>
          </div>

          {/* Outcomes */}
          <div className="flex-1 flex flex-col justify-center">
            <OutcomeButtons />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-[9px]">
            <div className="flex items-center gap-2">
              {winUpTo && (
                <span className="text-pollgy-green font-bold flex items-center gap-0.5">
                  🎯 Win up to {winUpTo}
                </span>
              )}
              {statusLine()}
            </div>
            {!isClosedOrResolved && (
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="p-0.5 rounded hover:bg-secondary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(`${window.location.origin}/market/${id}`);
                    toast({ title: "Link copied!" });
                  }}
                >
                  <Share2 className="h-2.5 w-2.5 text-muted-foreground" />
                </button>
                <button 
                  className="p-0.5 rounded hover:bg-secondary transition-colors"
                  onClick={(e) => { e.stopPropagation(); toast({ title: "Saved to watchlist" }); }}
                >
                  <Bookmark className="h-2.5 w-2.5 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="sm:hidden py-2.5 px-4">
          <div className="flex gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold leading-snug line-clamp-2">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-primary text-xs font-extrabold">{potDisplay}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Users className="h-2.5 w-2.5" />{players.toLocaleString()}
                </span>
                {statusLine()}
              </div>
            </div>
          </div>
          <OutcomeButtons />
          {winUpTo && (
            <p className="text-[10px] text-pollgy-green font-bold mt-1.5">
              🎯 Win up to {winUpTo} per ticket
            </p>
          )}
        </div>
      </Card>
    </>
  );
}
