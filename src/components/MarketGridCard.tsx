import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, AlertTriangle, CheckCircle2, Timer, Users, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarketDialog } from "@/components/MarketDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [showDisputeDialog, setShowDisputeDialog] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const isClosedOrResolved = status === "closed" || status === "resolved";
  const isBinary = displayOutcomes.length === 2 && !outcomes;

  const handleCardClick = () => {
    if (isClosedOrResolved) return;
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
      navigate(`/market/${id}`);
    } else {
      setShowMarketDialog(true);
    }
  };

  const handleDispute = () => {
    toast({
      title: "Dispute submitted",
      description: "Your dispute has been submitted for review.",
    });
    setShowDisputeDialog(false);
    setDisputeReason("");
  };

  const getStatusBadge = () => {
    switch (status) {
      case "closing":
        return (
          <Badge className="bg-amber-500 text-white border-0 text-[10px] font-semibold px-2 py-0.5">
            <Timer className="h-3 w-3 mr-1" />
            Closing Soon
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-orange-500 text-white border-0 text-[10px] font-semibold px-2 py-0.5">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Dispute Period
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-success text-white border-0 text-[10px] font-semibold px-2 py-0.5">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
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

  // Calculate percentage for progress bar (binary markets)
  const yesPercent = isBinary ? displayOutcomes[0].price : 50;

  return (
    <>
      <MarketDialog
        open={showMarketDialog}
        onOpenChange={setShowMarketDialog}
        market={marketDialogData}
      />
      
      <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()} className="rounded-xl border-border/60">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Dispute Resolution
            </DialogTitle>
            <DialogDescription>
              You have {disputeEndsIn} to submit a dispute.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Current Resolution</p>
              <p className="font-semibold">{resolution?.toUpperCase()}</p>
            </div>
            <Textarea
              placeholder="Explain why this resolution is incorrect..."
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              className="min-h-[80px] rounded-lg"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDisputeDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleDispute}
              disabled={!disputeReason.trim()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Card 
        className={`group overflow-hidden cursor-pointer border-border/40 bg-card hover:border-border/60 transition-all ${isClosedOrResolved ? 'opacity-70' : ''}`}
        onClick={handleCardClick}
      >
        {/* Mobile: Horizontal compact layout, Desktop: Vertical layout */}
        <div className="sm:block hidden">
          {/* Desktop Layout */}
          <div className={`relative aspect-[16/9] w-full overflow-hidden bg-secondary ${isClosedOrResolved ? 'grayscale-[30%]' : ''}`}>
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {getStatusBadge() && (
              <div className="absolute top-1.5 left-1.5">
                {getStatusBadge()}
              </div>
            )}
            
            <button 
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toast({ title: "Saved to watchlist" });
              }}
            >
              <Bookmark className="h-3 w-3 text-white" />
            </button>
          </div>

          <div className="p-2 space-y-2">
            <h3 className="text-xs font-semibold leading-tight line-clamp-2 min-h-[2rem] group-hover:text-primary transition-colors">
              {title}
            </h3>

            {isClosedOrResolved ? (
              <div className="space-y-1.5">
                <div className={`text-center py-1.5 rounded-md ${
                  resolution?.toLowerCase() === "yes" ? 'bg-success/10' : 
                  resolution?.toLowerCase() === "no" ? 'bg-secondary' : 'bg-primary/10'
                }`}>
                  <span className={`font-bold text-xs ${
                    resolution?.toLowerCase() === "yes" ? 'text-success' : 
                    resolution?.toLowerCase() === "no" ? 'text-muted-foreground' : 'text-primary'
                  }`}>
                    {resolution}
                  </span>
                  <p className="text-[9px] text-muted-foreground">
                    {status === "closed" ? `Dispute: ${disputeEndsIn}` : resolvedAt}
                  </p>
                </div>
                {status === "closed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-orange-600 border-orange-500/30 hover:bg-orange-500/10 text-[10px] h-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDisputeDialog(true);
                    }}
                  >
                    <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                    Dispute
                  </Button>
                )}
              </div>
            ) : isBinary ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold">
                  <span className="text-success">{yesPercent}%</span>
                  <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-success to-success/80"
                      style={{ width: `${yesPercent}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground">{100 - yesPercent}%</span>
                </div>
                
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    className="rounded-md py-1.5 text-center bg-success/10 hover:bg-success/20 text-success border border-success/20 transition-all active:scale-[0.98]"
                    onClick={handleOutcomeClick}
                  >
                    <span className="text-[10px] font-bold uppercase">Yes</span>
                  </button>
                  <button 
                    className="rounded-md py-1.5 text-center bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 transition-all active:scale-[0.98]"
                    onClick={handleOutcomeClick}
                  >
                    <span className="text-[10px] font-bold uppercase">No</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {displayOutcomes.slice(0, 2).map((outcome, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center gap-1.5 rounded-md px-2 py-1.5 bg-secondary/60 hover:bg-secondary border border-border/30 hover:border-border/50 transition-all text-left active:scale-[0.98]"
                    onClick={handleOutcomeClick}
                  >
                    {outcome.logo ? (
                      <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain rounded-sm" />
                    ) : (
                      <div className="h-4 w-4 rounded-sm bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                        {outcome.label.charAt(0)}
                      </div>
                    )}
                    <span className="flex-1 text-[10px] font-medium truncate">{outcome.label}</span>
                    <span className="text-[10px] font-bold text-primary">{outcome.price}%</span>
                  </button>
                ))}
                {displayOutcomes.length > 2 && (
                  <p className="text-[9px] text-muted-foreground text-center">+{displayOutcomes.length - 2} more</p>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-1.5 border-t border-border/40">
              <span className="flex items-center gap-0.5 font-medium">
                <TrendingUp className="h-2.5 w-2.5" />
                {volume}
              </span>
              <span className="flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5" />
                {endsIn}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Compact horizontal */}
        <div className="sm:hidden flex gap-2.5 p-2">
          {/* Thumbnail */}
          <div className={`relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0 ${isClosedOrResolved ? 'grayscale-[30%]' : ''}`}>
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
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <h3 className="text-xs font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {isClosedOrResolved ? (
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md w-fit ${
                resolution?.toLowerCase() === "yes" ? 'bg-success/10' : 
                resolution?.toLowerCase() === "no" ? 'bg-secondary' : 'bg-primary/10'
              }`}>
                <span className={`font-bold text-[10px] ${
                  resolution?.toLowerCase() === "yes" ? 'text-success' : 
                  resolution?.toLowerCase() === "no" ? 'text-muted-foreground' : 'text-primary'
                }`}>
                  {resolution}
                </span>
              </div>
            ) : isBinary ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button 
                    className="rounded-md px-4 py-2 text-center bg-success/15 hover:bg-success/25 text-success border border-success/30 text-xs font-bold uppercase active:scale-95 transition-all"
                    onClick={handleOutcomeClick}
                  >
                    Yes {yesPercent}%
                  </button>
                  <button 
                    className="rounded-md px-4 py-2 text-center bg-destructive/15 hover:bg-destructive/25 text-destructive border border-destructive/30 text-xs font-bold uppercase active:scale-95 transition-all"
                    onClick={handleOutcomeClick}
                  >
                    No {100 - yesPercent}%
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mr-2 pr-2">
                {displayOutcomes.map((outcome, index) => (
                  <button 
                    key={index}
                    className="flex-shrink-0 flex items-center gap-1.5 rounded-md px-3 py-2 bg-secondary/80 hover:bg-secondary border border-border/40 hover:border-border/60 text-xs active:scale-95 transition-all"
                    onClick={handleOutcomeClick}
                  >
                    {outcome.logo ? (
                      <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain rounded-sm" />
                    ) : (
                      <div className="h-4 w-4 rounded-sm bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                        {outcome.label.charAt(0)}
                      </div>
                    )}
                    <span className="font-medium whitespace-nowrap">{outcome.label}</span>
                    <span className="font-bold text-primary">{outcome.price}%</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" />
                {volume}
              </span>
              <span className="flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5" />
                {endsIn}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
