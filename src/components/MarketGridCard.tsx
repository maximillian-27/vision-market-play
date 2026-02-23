import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, AlertTriangle, CheckCircle2, Timer, Users } from "lucide-react";
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
          <div className="flex gap-1.5">
            <div className="flex-1 rounded-lg py-2 text-center bg-yes/10 text-yes/60 border border-yes/20">
              <span className="text-xs font-bold">Yes {displayOutcomes[0].price}%</span>
            </div>
            <div className="flex-1 rounded-lg py-2 text-center bg-no/10 text-no/60 border border-no/20">
              <span className="text-xs font-bold">No {displayOutcomes[1].price}%</span>
            </div>
          </div>
        );
      }
      return (
        <div className="space-y-1">
          {displayOutcomes.slice(0, MAX_VISIBLE_OUTCOMES).map((o, i) => (
            <div key={i} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-secondary/40 text-muted-foreground">
              <span className="text-[11px] truncate">{o.label}</span>
              <span className="text-[11px] font-semibold">{o.price}%</span>
            </div>
          ))}
        </div>
      );
    }

    if (isBinary) {
      return (
        <div className="flex gap-1.5">
          <button 
            className="flex-1 rounded-lg py-2 text-center bg-yes/15 dark:bg-yes/25 hover:bg-yes text-yes hover:text-yes-foreground border border-yes/30 dark:border-yes/40 hover:border-yes transition-all active:scale-[0.97]"
            onClick={handleOutcomeClick}
          >
            <span className="text-xs font-bold">Yes {displayOutcomes[0].price}%</span>
          </button>
          <button 
            className="flex-1 rounded-lg py-2 text-center bg-no/15 dark:bg-no/25 hover:bg-no text-no hover:text-no-foreground border border-no/30 dark:border-no/40 hover:border-no transition-all active:scale-[0.97]"
            onClick={handleOutcomeClick}
          >
            <span className="text-xs font-bold">No {displayOutcomes[1].price}%</span>
          </button>
        </div>
      );
    }

    const visible = displayOutcomes.slice(0, MAX_VISIBLE_OUTCOMES);
    const remaining = displayOutcomes.length - MAX_VISIBLE_OUTCOMES;

    return (
      <div className="space-y-1">
        {visible.map((outcome, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-secondary/50 hover:bg-primary/10 border border-border/40 hover:border-primary/30 transition-all active:scale-[0.97]"
            onClick={handleOutcomeClick}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              {outcome.logo ? (
                <img src={outcome.logo} alt={outcome.label} className="h-3.5 w-3.5 object-contain rounded-sm flex-shrink-0" />
              ) : (
                <span className="h-3.5 w-3.5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary flex-shrink-0">
                  {outcome.label.charAt(0)}
                </span>
              )}
              <span className="text-[11px] font-medium truncate">{outcome.label}</span>
            </div>
            <span className="text-[11px] font-bold text-primary flex-shrink-0">{outcome.price}%</span>
          </button>
        ))}
        {remaining > 0 && (
          <button
            className="w-full text-center text-[10px] font-medium text-muted-foreground hover:text-primary py-0.5 transition-colors"
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
            <Timer className="h-3 w-3" />{endsIn}
          </span>
        );
      case "awaiting_resolution":
        return (
          <span className="flex items-center gap-1 text-pollgy-blue text-[10px] font-medium">
            <Clock className="h-3 w-3" />Awaiting
          </span>
        );
      case "closed":
        return (
          <span className="flex items-center gap-1 text-amber-600 text-[10px] font-medium">
            <AlertTriangle className="h-3 w-3" />Dispute: {disputeEndsIn}
          </span>
        );
      case "resolved":
        return (
          <span className="flex items-center gap-1 text-muted-foreground text-[10px]">
            <CheckCircle2 className="h-3 w-3" />Resolved
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-muted-foreground text-[10px]">
            <Clock className="h-3 w-3" />{endsIn}
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
        className={`group overflow-hidden cursor-pointer border-border bg-card card-hover sm:border sm:rounded-lg border-0 rounded-none shadow-none sm:shadow-sm sm:mb-2 break-inside-avoid ${
          isClosingSoon ? 'sm:ring-1 sm:ring-amber-500/30' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* ── Desktop/Tablet ── */}
        <div className="sm:flex hidden flex-col p-3 h-full gap-2">
          {/* Title */}
          <h3 className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Pot + Players */}
          <div className="flex items-center gap-2">
            <span className="text-primary text-xs font-extrabold">{potDisplay}</span>
            <span className="text-[9px] text-muted-foreground">·</span>
            <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
              <Users className="h-2.5 w-2.5" />{players.toLocaleString()}
            </span>
          </div>

          {/* Outcomes */}
          <div className="flex-1 flex flex-col justify-center">
            <OutcomeButtons />
          </div>

          {/* Timer */}
          <div>{statusLine()}</div>
        </div>

        {/* ── Mobile ── */}
        <div className="sm:hidden py-3 px-4">
          <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 mb-1.5">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary text-xs font-extrabold">{potDisplay}</span>
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
              <Users className="h-2.5 w-2.5" />{players.toLocaleString()}
            </span>
            {statusLine()}
          </div>
          <OutcomeButtons />
        </div>
      </Card>
    </>
  );
}
