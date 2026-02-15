import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, AlertTriangle, CheckCircle2, Timer, Bookmark, Share2, Repeat2, Flame, Zap, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarketDialog } from "@/components/MarketDialog";
import { ResolvedMarketDialog } from "@/components/ResolvedMarketDialog";
import { QuickTradeSheet } from "@/components/QuickTradeSheet";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuoteRepostDialog } from "@/components/QuoteRepostDialog";



type MarketStatus = "open" | "closing" | "awaiting_resolution" | "closed" | "resolved";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
  previousPrice?: number;
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
  endsIn: string;
  status?: MarketStatus;
  resolution?: string;
  disputeEndsIn?: string;
  resolvedAt?: string;
  resolutionDate?: string;
  isHot?: boolean;
  isLive?: boolean;
  volumeChange?: number;
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
  endsIn,
  status = "open",
  resolution,
  disputeEndsIn,
  resolvedAt,
  resolutionDate,
  isHot = false,
  isLive = false,
  volumeChange = 0,
}: MarketGridCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [showMarketDialog, setShowMarketDialog] = useState(false);
  const [showQuickTrade, setShowQuickTrade] = useState(false);
  const [showResolvedDialog, setShowResolvedDialog] = useState(false);
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const isClosedOrResolved = status === "closed" || status === "resolved";
  const isAwaitingResolution = status === "awaiting_resolution";
  const isBettingDisabled = isClosedOrResolved || isAwaitingResolution;
  const isBinary = displayOutcomes.length === 2 && !outcomes;

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

  const handleBetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/market/${id}`);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "closing":
        return (
          <span className="flex items-center gap-1 text-accent text-[10px] font-bold whitespace-nowrap">
            <Timer className="h-2.5 w-2.5 flex-shrink-0" />
            Closing
          </span>
        );
      case "awaiting_resolution":
        return (
          <span className="flex items-center gap-1 text-muted-foreground text-[10px] font-medium whitespace-nowrap">
            <Clock className="h-2.5 w-2.5 flex-shrink-0" />
            Awaiting
          </span>
        );
      case "closed":
        return (
          <span className="flex items-center gap-1 text-destructive text-[10px] font-medium">
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
        className={`group overflow-hidden cursor-pointer border-border bg-card card-hover h-full ${
          isHot ? 'ring-1 ring-accent/30' : ''
        } ${isLive ? 'ring-1 ring-live/40' : ''}`}
        onClick={handleCardClick}
      >
        {/* Desktop Layout - Compact with small image */}
        <div className="sm:flex hidden flex-col p-3 h-full">
          {/* Header with image, title, indicators */}
          <div className="flex items-start gap-3 mb-2.5">
            {/* Small square image */}
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img 
                src={image} 
                alt={title}
                className="h-full w-full object-cover"
              />
              {/* Live/Hot badges */}
              {isLive && (
                <div className="absolute -top-1 -right-1">
                  <span className="badge-live text-[8px] px-1 py-0.5">
                    <span className="h-1 w-1 rounded-full bg-current animate-pulse" />
                    LIVE
                  </span>
                </div>
              )}
            </div>
            
            {/* Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors flex-1">
                  {title}
                </h3>
                {isBinary && !isClosedOrResolved && !isAwaitingResolution && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{yesPercent}%</span>
                    {volumeChange !== 0 && (
                      <span className={`text-[10px] flex items-center ${volumeChange > 0 ? 'text-bet' : 'text-against'}`}>
                        {volumeChange > 0 ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                      </span>
                    )}
                  </div>
                )}
              </div>
              {/* Hot indicator */}
              {isHot && !isLive && (
                <span className="badge-hot text-[8px] px-1 py-0.5 mt-1 inline-flex">
                  <Flame className="h-2 w-2" />
                  HOT
                </span>
              )}
            </div>
          </div>

          {/* Content area - grows to push footer down */}
          <div className="flex-1 flex flex-col justify-center">
            {isClosedOrResolved ? (
              <div className="space-y-2">
                {/* Resolution Result */}
                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-secondary/50">
                  <span className="text-xs text-muted-foreground">Outcome</span>
                  <span className={`text-sm font-bold ${
                    resolution?.toLowerCase() === "yes" ? 'text-bet' : 
                    resolution?.toLowerCase() === "no" ? 'text-against' : 'text-primary'
                  }`}>
                    {resolution}
                  </span>
                </div>
                
                {/* Dispute button for closed markets */}
                {status === "closed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 text-xs h-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowResolvedDialog(true);
                    }}
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Dispute
                  </Button>
                )}
              </div>
            ) : isAwaitingResolution ? (
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-md py-1.5 text-center bg-bet/10 text-bet/70 border border-bet/20 cursor-default">
                  <span className="text-xs font-bold">Yes {yesPercent}%</span>
                </div>
                <div className="flex-1 rounded-md py-1.5 text-center bg-against/10 text-against/70 border border-against/20 cursor-default">
                  <span className="text-xs font-bold">No {noPercent}%</span>
                </div>
              </div>
            ) : isBinary ? (
              <div className="flex items-center gap-2">
                <button 
                  className="flex-1 rounded-lg py-2 text-center transition-all active:scale-[0.97] bg-bet/15 dark:bg-bet/25 hover:bg-bet text-bet hover:text-bet-foreground border border-bet/30 dark:border-bet/40 hover:border-bet"
                  onClick={(e) => handleBetClick(e)}
                >
                  <span className="text-xs font-bold">Bet Yes</span>
                </button>
                <button 
                  className="flex-1 rounded-lg py-2 text-center transition-all active:scale-[0.97] bg-against/15 dark:bg-against/25 hover:bg-against text-against hover:text-against-foreground border border-against/30 dark:border-against/40 hover:border-against"
                  onClick={(e) => handleBetClick(e)}
                >
                  <span className="text-xs font-bold">Bet No</span>
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {displayOutcomes.slice(0, 2).map((outcome, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-all bg-secondary/50 hover:bg-secondary"
                    onClick={(e) => handleBetClick(e)}
                  >
                    <span className="font-medium truncate flex-1 text-left">{outcome.label}</span>
                    <span className="font-bold">{outcome.price}%</span>
                  </button>
                ))}
                {displayOutcomes.length > 2 && (
                  <p className="text-[10px] text-muted-foreground">+{displayOutcomes.length - 2} more</p>
                )}
              </div>
            )}
          </div>
          
          {/* Stats footer */}
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-2 pt-2 border-t border-border">
            <span className="font-semibold">{volume} Vol.</span>
            {getStatusBadge() ? (
              getStatusBadge()
            ) : (
              <span className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {endsIn}
              </span>
            )}
            {/* Action buttons */}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRepostDialog(true);
                  }}
                >
                  <Repeat2 className="h-3 w-3" />
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
            )}
          </div>
        </div>

        {/* Mobile Layout - Compact horizontal */}
        <div className="sm:hidden flex flex-col">
          <div className="flex gap-3 p-3 pb-2">
            {/* Thumbnail */}
            <div className={`relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0`}>
              <img 
                src={image} 
                alt={title}
                className="h-full w-full object-cover"
              />
              {/* Status/Live badges */}
              {isLive ? (
                <div className="absolute top-1 left-1">
                  <span className="badge-live text-[8px] px-1 py-0.5">
                    <span className="h-1 w-1 rounded-full bg-current animate-pulse" />
                    LIVE
                  </span>
                </div>
              ) : isHot ? (
                <div className="absolute top-1 left-1">
                  <span className="badge-hot text-[8px] px-1 py-0.5">
                    <Flame className="h-2 w-2" />
                  </span>
                </div>
              ) : getStatusBadge() && (
                <div className="absolute top-1 left-1 scale-75 origin-top-left">
                  {getStatusBadge()}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              {/* Creator */}
              <button 
                className="flex items-center gap-1.5 hover:opacity-70 transition-opacity w-fit"
                onClick={(e) => {
                  e.stopPropagation();
                  const profilePath = creator.isCreator !== false 
                    ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
                    : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
                  navigate(profilePath);
                }}
              >
                <Avatar className="h-4 w-4">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="text-[6px]">{creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-[11px] text-muted-foreground font-medium truncate max-w-[140px]">{creator.name}</span>
              </button>
              
              <h3 className="text-[13px] font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>

              {isClosedOrResolved ? (
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs text-muted-foreground">Outcome:</span>
                  <span className={`font-bold text-xs ${
                    resolution?.toLowerCase() === "yes" ? 'text-bet' : 
                    resolution?.toLowerCase() === "no" ? 'text-against' : 'text-primary'
                  }`}>
                    {resolution}
                  </span>
                  {status === "closed" && (
                    <button 
                      className="ml-auto px-2 py-1 rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-[10px] font-medium"
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
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs font-bold text-bet/70">{yesPercent}%</span>
                  <div className="flex-1 h-1.5 rounded-full bg-against-muted/50 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-bet/60"
                      style={{ width: `${yesPercent}%` }}
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-bet/10 text-bet/60 border border-bet/20 text-[11px] font-bold">
                      Yes
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-against/10 text-against/60 border border-against/20 text-[11px] font-bold">
                      No
                    </span>
                  </div>
                </div>
              ) : isBinary ? (
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs font-bold text-bet">{yesPercent}%</span>
                  <div className="flex-1 h-1.5 rounded-full bg-against-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-bet"
                      style={{ width: `${yesPercent}%` }}
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <button 
                      className="px-2.5 py-1 rounded-md text-[11px] font-bold active:scale-95 transition-all bg-bet/15 dark:bg-bet/25 text-bet border border-bet/30 dark:border-bet/40"
                      onClick={(e) => handleBetClick(e)}
                    >
                      Yes
                    </button>
                    <button 
                      className="px-2.5 py-1 rounded-md text-[11px] font-bold active:scale-95 transition-all bg-against/15 dark:bg-against/25 text-against border border-against/30 dark:border-against/40"
                      onClick={(e) => handleBetClick(e)}
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-auto -mr-3 pr-3">
                  {displayOutcomes.slice(0, 2).map((outcome, index) => (
                    <button 
                      key={index}
                      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] active:scale-95 transition-all flex-shrink-0 bg-secondary border border-border"
                      style={{ maxWidth: index === 0 ? '55%' : '45%' }}
                      onClick={(e) => handleBetClick(e)}
                    >
                      {outcome.logo && (
                        <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain rounded-sm flex-shrink-0" />
                      )}
                      <span className="font-medium truncate">{outcome.label}</span>
                      <span className="font-bold flex-shrink-0">{outcome.price}%</span>
                    </button>
                  ))}
                  {displayOutcomes.length > 2 && (
                    <span className="text-[10px] text-muted-foreground self-center flex-shrink-0">+{displayOutcomes.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-border text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold">
              <TrendingUp className="h-3 w-3" />
              {volume}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {endsIn}
            </span>
          </div>
        </div>
      </Card>

      <QuoteRepostDialog
        open={showRepostDialog}
        onOpenChange={setShowRepostDialog}
        marketTitle={title}
        marketImage={image}
      />
    </>
  );
}
