import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, AlertTriangle, CheckCircle2, Timer, Bookmark, Share2, Repeat2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarketDialog } from "@/components/MarketDialog";
import { ResolvedMarketDialog } from "@/components/ResolvedMarketDialog";
import { QuickTradeSheet } from "@/components/QuickTradeSheet";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuoteRepostDialog } from "@/components/QuoteRepostDialog";

type MarketStatus = "open" | "closing" | "closed" | "resolved";

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
  endsIn: string;
  status?: MarketStatus;
  resolution?: string;
  disputeEndsIn?: string;
  resolvedAt?: string;
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

  const handleOutcomeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClosedOrResolved) return;
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
          <span className="flex items-center gap-1 text-amber-500 text-[10px] font-medium">
            <Timer className="h-2.5 w-2.5" />
            Closing Soon
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
    endsIn,
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
        className={`group overflow-hidden cursor-pointer border-border bg-card card-hover h-full`}
        onClick={handleCardClick}
      >
        {/* Desktop Layout - Compact with small image */}
        <div className="sm:flex hidden flex-col p-3 h-full">
          {/* Header with image, title */}
          <div className="flex items-start gap-3 mb-2.5">
            {/* Small square image */}
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img 
                src={image} 
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors flex-1">
                  {title}
                </h3>
                {isBinary && !isClosedOrResolved && (
                  <span className="text-sm font-bold text-primary flex-shrink-0">{yesPercent}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Content area - grows to push footer down */}
          <div className="flex-1">
            {isClosedOrResolved ? (
              <div className="space-y-2">
                {/* Resolution Result */}
                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-secondary/50">
                  <span className="text-xs text-muted-foreground">Outcome</span>
                  <span className={`text-sm font-bold ${
                    resolution?.toLowerCase() === "yes" ? 'text-yes' : 
                    resolution?.toLowerCase() === "no" ? 'text-no' : 'text-primary'
                  }`}>
                    {resolution}
                  </span>
                </div>
                
                {/* Dispute button for closed markets */}
                {status === "closed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-orange-600 border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500/50 text-xs h-7"
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
            ) : isBinary ? (
              <div className="flex items-center gap-2">
                <button 
                  className="flex-1 rounded-md py-1.5 text-center bg-yes-muted hover:bg-yes text-yes hover:text-yes-foreground border border-yes/20 hover:border-yes transition-all active:scale-[0.98]"
                  onClick={handleOutcomeClick}
                >
                  <span className="text-xs font-bold">Yes</span>
                </button>
                <button 
                  className="flex-1 rounded-md py-1.5 text-center bg-no-muted hover:bg-no text-no hover:text-no-foreground border border-no/20 hover:border-no transition-all active:scale-[0.98]"
                  onClick={handleOutcomeClick}
                >
                  <span className="text-xs font-bold">No</span>
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {displayOutcomes.slice(0, 2).map((outcome, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all"
                    onClick={handleOutcomeClick}
                  >
                    <span className="font-medium truncate flex-1 text-left">{outcome.label}</span>
                    <span className="font-bold text-primary">{outcome.price}%</span>
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
            <span className="font-medium">{volume} Vol.</span>
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
              {getStatusBadge() && (
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
              
              <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>

              {isClosedOrResolved ? (
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs text-muted-foreground">Outcome:</span>
                  <span className={`font-bold text-xs ${
                    resolution?.toLowerCase() === "yes" ? 'text-yes' : 
                    resolution?.toLowerCase() === "no" ? 'text-no' : 'text-primary'
                  }`}>
                    {resolution}
                  </span>
                  {status === "closed" && (
                    <button 
                      className="ml-auto px-2 py-1 rounded-md bg-orange-500/10 text-orange-600 border border-orange-500/20 text-[10px] font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowResolvedDialog(true);
                      }}
                    >
                      Dispute
                    </button>
                  )}
                </div>
              ) : isBinary ? (
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs font-bold text-yes">{yesPercent}%</span>
                  <div className="flex-1 h-1.5 rounded-full bg-no-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-yes"
                      style={{ width: `${yesPercent}%` }}
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <button 
                      className="px-2.5 py-1 rounded-md bg-yes-muted text-yes border border-yes/20 text-[11px] font-bold active:scale-95 transition-transform"
                      onClick={handleOutcomeClick}
                    >
                      Yes
                    </button>
                    <button 
                      className="px-2.5 py-1 rounded-md bg-no-muted text-no border border-no/20 text-[11px] font-bold active:scale-95 transition-transform"
                      onClick={handleOutcomeClick}
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
                      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 bg-secondary border border-border text-[11px] active:scale-95 transition-transform flex-shrink-0"
                      style={{ maxWidth: index === 0 ? '55%' : '45%' }}
                      onClick={handleOutcomeClick}
                    >
                      {outcome.logo && (
                        <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain rounded-sm flex-shrink-0" />
                      )}
                      <span className="font-medium truncate">{outcome.label}</span>
                      <span className="font-bold text-primary flex-shrink-0">{outcome.price}%</span>
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
            <span className="flex items-center gap-1 font-medium">
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