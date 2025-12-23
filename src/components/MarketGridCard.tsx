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

  const getOutcomeIcon = (color?: string) => {
    switch (color) {
      case "success": return <Check className="h-3.5 w-3.5" />;
      case "destructive": return <X className="h-3.5 w-3.5" />;
      default: return <Check className="h-3.5 w-3.5" />;
    }
  };

  const getIconStyle = (color?: string) => {
    switch (color) {
      case "success": return "bg-success text-success-foreground";
      case "destructive": return "bg-muted-foreground/80 text-background";
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
      description: "Your dispute has been submitted for review.",
    });
    setShowDisputeDialog(false);
    setDisputeReason("");
  };

  const getStatusBadge = () => {
    switch (status) {
      case "closing":
        return (
          <Badge className="bg-amber-500/90 text-white border-0 text-[10px] font-semibold shadow-sm">
            <Timer className="h-2.5 w-2.5 mr-1" />
            Closing Soon
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-orange-500/90 text-white border-0 text-[10px] font-semibold shadow-sm">
            <AlertTriangle className="h-2.5 w-2.5 mr-1" />
            Dispute Period
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-success/90 text-white border-0 text-[10px] font-semibold shadow-sm">
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
        <div className={`text-center py-4 rounded-xl ${isYes ? 'bg-success/10 border border-success/20' : 'bg-muted border border-border/40'}`}>
          <div className="flex items-center justify-center gap-2">
            {isYes ? (
              <div className="p-1.5 rounded-full bg-success/20">
                <Check className="h-5 w-5 text-success" />
              </div>
            ) : (
              <div className="p-1.5 rounded-full bg-muted-foreground/20">
                <X className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            <span className={`font-bold text-lg ${isYes ? 'text-success' : 'text-foreground'}`}>
              {resolution.toUpperCase()}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5">
            {status === "closed" ? `Dispute ends in ${disputeEndsIn}` : `Resolved ${resolvedAt}`}
          </p>
        </div>
      );
    }
    
    return (
      <div className="text-center py-4 rounded-xl bg-success/10 border border-success/20">
        <div className="flex items-center justify-center gap-2">
          <div className="p-1.5 rounded-full bg-success/20">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
          <span className="font-bold text-lg text-success">{resolution}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5">
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
        <DialogContent onClick={(e) => e.stopPropagation()} className="rounded-2xl border-border/60">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-500/10">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              Dispute Resolution
            </DialogTitle>
            <DialogDescription>
              You have {disputeEndsIn} to submit a dispute.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Current Resolution</p>
              <p className="text-lg font-bold">{resolution?.toUpperCase()}</p>
            </div>
            <Textarea
              placeholder="Explain why this resolution is incorrect..."
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              className="min-h-[100px] rounded-xl"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDisputeDialog(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button 
              onClick={handleDispute}
              disabled={!disputeReason.trim()}
              className="bg-orange-500 hover:bg-orange-600 rounded-xl"
            >
              Submit Dispute
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Card 
        className={`group overflow-hidden hover:shadow-card-hover cursor-pointer border-border/40 hover:border-border/60 ${isClosedOrResolved ? 'opacity-85' : ''}`}
      >
        <CardContent className="p-0">
          <div className="flex sm:flex-col">
            {/* Market Image */}
            <div 
              className={`relative aspect-square sm:aspect-[16/10] w-28 sm:w-full overflow-hidden bg-muted flex-shrink-0 ${isClosedOrResolved ? 'grayscale-[20%]' : ''}`}
              onClick={() => navigate(`/market/${id}`)}
            >
              <img 
                src={image} 
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Status Badge */}
              {getStatusBadge() && (
                <div className="absolute top-2.5 right-2.5">
                  {getStatusBadge()}
                </div>
              )}
              
              {/* Creator info */}
              <div 
                className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/50 backdrop-blur-md rounded-full px-2 py-1 hover:bg-black/60 transition-colors z-10"
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
                  <AvatarFallback className="text-[8px] bg-white/20">{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-white text-[10px] font-medium max-w-[80px] truncate">{creator.name}</span>
                {creator.isCreator !== false && (
                  <BadgeCheck className="h-3 w-3 text-white fill-white/30 flex-shrink-0" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-3.5 space-y-2.5 flex flex-col flex-1">
              {/* Title */}
              <h3 
                className="text-xs sm:text-[13px] font-semibold leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.4rem] group-hover:text-primary transition-colors cursor-pointer"
                onClick={() => navigate(`/market/${id}`)}
              >
                {title}
              </h3>

              {/* Resolution Display for Closed/Resolved */}
              {isClosedOrResolved ? (
                <div className="space-y-2.5">
                  {getResolutionDisplay()}
                  
                  {status === "closed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-orange-600 border-orange-500/30 hover:bg-orange-500/10 gap-1.5 rounded-xl text-xs font-semibold"
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
                <div className={`space-y-1.5 ${hasMultipleOutcomes ? 'max-h-[130px] overflow-y-auto scrollbar-thin pr-1' : ''}`}>
                  {displayOutcomes.map((outcome, index) => {
                    const payout = outcome.price > 0 ? (10000 / outcome.price).toFixed(0) : 0;
                    return (
                      <button 
                        key={index}
                        className="w-full text-left rounded-xl px-3 py-2.5 border border-border/50 bg-muted/30 hover:bg-muted/60 hover:border-border transition-all flex items-center gap-2.5 group/btn"
                        onClick={(e) => handleOutcomeClick(e, outcome)}
                      >
                        <div className={`rounded-lg flex-shrink-0 ${outcome.logo ? 'p-0.5 bg-white border border-border/50' : `p-1.5 ${getIconStyle(outcome.color)}`}`}>
                          {outcome.logo ? (
                            <img src={outcome.logo} alt={outcome.label} className="h-5 w-5 sm:h-6 sm:w-6 rounded-md object-contain" />
                          ) : (
                            getOutcomeIcon(outcome.color)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-foreground">{outcome.label}</div>
                          <div className="text-[10px] text-muted-foreground">
                            $100 → <span className="text-success font-medium">${payout}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold text-foreground">{outcome.price}¢</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              
              {/* Stats */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/40">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className="font-medium">{volume}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{endsIn}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}