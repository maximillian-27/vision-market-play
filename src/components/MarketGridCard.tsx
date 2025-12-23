import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, BadgeCheck, Check, X, AlertTriangle, CheckCircle2, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BuyDialog } from "@/components/BuyDialog";
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
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [showDisputeDialog, setShowDisputeDialog] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  
  const displayOutcomes = outcomes || [
    { label: "Yes", price: yesPrice || 0, color: "success" },
    { label: "No", price: noPrice || 0, color: "destructive" }
  ];

  const getOutcomeColor = (color?: string) => {
    return "bg-muted/20 border-border/30 hover:bg-muted/30";
  };

  const getOutcomeIcon = (color?: string) => {
    switch (color) {
      case "success": return <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />;
      case "destructive": return <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />;
      default: return <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />;
    }
  };

  const getIconBgColor = (color?: string) => {
    switch (color) {
      case "success": return "bg-pollgy-green text-pollgy-green-foreground";
      case "destructive": return "bg-pollgy-blue text-pollgy-blue-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const hasMultipleOutcomes = displayOutcomes.length > 2;
  const isClosedOrResolved = status === "closed" || status === "resolved";

  const handleOutcomeClick = (e: React.MouseEvent, outcome: Outcome) => {
    e.stopPropagation();
    if (isClosedOrResolved) return;
    setSelectedOutcome(outcome);
    setShowBuyDialog(true);
  };

  const handleDispute = () => {
    toast({
      title: "Dispute submitted",
      description: "Your dispute has been submitted for review. You'll be notified of the outcome.",
    });
    setShowDisputeDialog(false);
    setDisputeReason("");
  };

  const getStatusBadge = () => {
    switch (status) {
      case "closing":
        return (
          <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30 text-[10px]">
            <Timer className="h-2.5 w-2.5 mr-1" />
            Closing Soon
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30 text-[10px]">
            <AlertTriangle className="h-2.5 w-2.5 mr-1" />
            Dispute Period
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-success/20 text-success border-success/30 text-[10px]">
            <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
            Resolved
          </Badge>
        );
      default:
        return null;
    }
  };

  const getResolutionDisplay = () => {
    if (!resolution) return null;
    
    const isYes = resolution.toLowerCase() === "yes";
    const isNo = resolution.toLowerCase() === "no";
    
    if (isYes || isNo) {
      return (
        <div className={`text-center py-3 rounded-lg ${isYes ? 'bg-success/10 border border-success/20' : 'bg-muted border border-border/40'}`}>
          <div className="flex items-center justify-center gap-2">
            {isYes ? (
              <Check className="h-5 w-5 text-success" />
            ) : (
              <X className="h-5 w-5 text-muted-foreground" />
            )}
            <span className={`font-bold text-lg ${isYes ? 'text-success' : 'text-foreground'}`}>
              {resolution.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {status === "closed" ? `Dispute ends in ${disputeEndsIn}` : `Resolved ${resolvedAt}`}
          </p>
        </div>
      );
    }
    
    // Multi-outcome resolution
    return (
      <div className="text-center py-3 rounded-lg bg-success/10 border border-success/20">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <span className="font-bold text-lg text-success">{resolution}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {status === "closed" ? `Dispute ends in ${disputeEndsIn}` : `Resolved ${resolvedAt}`}
        </p>
      </div>
    );
  };

  return (
    <>
      <BuyDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        outcome={selectedOutcome || displayOutcomes[0]}
        marketTitle={title}
        marketId={id}
      />
      
      {/* Dispute Dialog */}
      <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Dispute Resolution
            </DialogTitle>
            <DialogDescription>
              You have {disputeEndsIn} to submit a dispute. Please provide evidence for why this resolution is incorrect.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-1">Current Resolution</p>
              <p className="text-lg font-bold">{resolution?.toUpperCase()}</p>
            </div>
            <Textarea
              placeholder="Explain why you believe this resolution is incorrect. Include links to evidence if possible..."
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisputeDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleDispute}
              disabled={!disputeReason.trim()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Submit Dispute
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Card 
        className={`group overflow-hidden transition-all hover:shadow-md cursor-pointer border-border/50 animate-fade-in bg-card ${isClosedOrResolved ? 'opacity-90' : ''}`}
      >
        <CardContent className="p-0">
          <div className="flex sm:flex-col">
            {/* Market Image */}
            <div 
              className={`relative aspect-square sm:aspect-video w-24 sm:w-full overflow-hidden bg-muted/50 flex-shrink-0 ${isClosedOrResolved ? 'grayscale-[30%]' : ''}`}
              onClick={() => navigate(`/market/${id}`)}
            >
              <img 
                src={image} 
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Status Badge Overlay */}
              {getStatusBadge() && (
                <div className="absolute top-2 right-2">
                  {getStatusBadge()}
                </div>
              )}
              
              {/* Creator info - desktop only */}
              <div 
                className="hidden sm:flex absolute top-2 left-2 items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 hover:bg-black/70 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  const profilePath = creator.isCreator !== false 
                    ? `/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`
                    : `/profile/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`;
                  navigate(profilePath);
                }}
              >
                <Avatar className="h-4 w-4 border border-white/20">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="text-[8px]">{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-white text-[10px] font-medium">{creator.name}</span>
                {creator.isCreator !== false && (
                  <BadgeCheck className="h-2.5 w-2.5 text-white fill-white/30 flex-shrink-0" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-2 sm:p-2 space-y-1.5 sm:space-y-2 flex flex-col">
              {/* Title */}
              <h3 
                className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 min-h-[1.8rem] sm:min-h-[2rem] group-hover:text-primary transition-colors cursor-pointer"
                onClick={() => navigate(`/market/${id}`)}
              >
                {title}
              </h3>

              {/* Resolution Display for Closed/Resolved */}
              {isClosedOrResolved ? (
                <div className="space-y-2">
                  {getResolutionDisplay()}
                  
                  {/* Dispute Button for Closed Markets */}
                  {status === "closed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-orange-600 border-orange-500/30 hover:bg-orange-500/10 gap-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDisputeDialog(true);
                      }}
                    >
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Dispute
                    </Button>
                  )}
                </div>
              ) : (
                /* Active Outcomes */
                <div className={`space-y-1 ${hasMultipleOutcomes ? 'max-h-[120px] sm:max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-border/60 pr-1' : ''}`}>
                  {displayOutcomes.map((outcome, index) => {
                    const payout = outcome.price > 0 ? (10000 / outcome.price).toFixed(0) : 0;
                    return (
                      <button 
                        key={index}
                        className={`w-full text-left rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 border transition-all ${getOutcomeColor(outcome.color)} flex items-center gap-1.5 sm:gap-2`}
                        onClick={(e) => handleOutcomeClick(e, outcome)}
                      >
                        <div className={`rounded-full flex-shrink-0 ${outcome.logo ? 'p-0.5 bg-white border-2 border-white' : `p-1 ${getIconBgColor(outcome.color)}`}`}>
                          {outcome.logo ? (
                            <img src={outcome.logo} alt={outcome.label} className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-contain" />
                          ) : (
                            getOutcomeIcon(outcome.color)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] sm:text-xs font-bold text-foreground">{outcome.label}</div>
                          <div className="text-[8px] sm:text-[9px] text-muted-foreground font-medium">
                            $100 → ${payout}
                          </div>
                        </div>
                        <span className="text-sm sm:text-base font-bold text-foreground ml-auto">{outcome.price}¢</span>
                      </button>
                    );
                  })}
                </div>
              )}
              
              {/* Stats */}
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-muted-foreground pt-1 border-t border-border/40">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <TrendingUp className="h-2 sm:h-2.5 w-2 sm:w-2.5 flex-shrink-0" />
                  <span className="truncate">{volume}</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Clock className="h-2 sm:h-2.5 w-2 sm:w-2.5 flex-shrink-0" />
                  <span className="truncate">{endsIn}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
