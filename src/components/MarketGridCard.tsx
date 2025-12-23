import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, BadgeCheck, Check, X, AlertTriangle, CheckCircle2, Timer } from "lucide-react";
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
          <Badge className="bg-amber-500/90 text-white border-0 text-[9px] font-medium px-1.5 py-0.5">
            <Timer className="h-2.5 w-2.5 mr-0.5" />
            Closing
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-orange-500/90 text-white border-0 text-[9px] font-medium px-1.5 py-0.5">
            <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
            Dispute
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-success/90 text-white border-0 text-[9px] font-medium px-1.5 py-0.5">
            <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
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
    
    return (
      <div className={`text-center py-2 rounded-md ${isYes ? 'bg-success/10' : isNo ? 'bg-secondary' : 'bg-success/10'}`}>
        <div className="flex items-center justify-center gap-1.5">
          {isYes ? (
            <Check className="h-3.5 w-3.5 text-success" />
          ) : isNo ? (
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
          )}
          <span className={`font-semibold text-sm ${isYes ? 'text-success' : isNo ? 'text-foreground' : 'text-success'}`}>
            {resolution}
          </span>
        </div>
        <p className="text-[9px] text-muted-foreground mt-0.5">
          {status === "closed" ? `Dispute: ${disputeEndsIn}` : resolvedAt}
        </p>
      </div>
    );
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

  return (
    <>
      <MarketDialog
        open={showMarketDialog}
        onOpenChange={setShowMarketDialog}
        market={marketDialogData}
      />
      
      <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()} className="rounded-lg border-border/60">
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
        className={`group overflow-hidden hover:shadow-md cursor-pointer border-border/40 transition-all ${isClosedOrResolved ? 'opacity-75' : ''}`}
        onClick={handleCardClick}
      >
        {/* Compact horizontal layout */}
        <div className="flex gap-2.5 p-2.5">
          {/* Thumbnail */}
          <div 
            className={`relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0 ${isClosedOrResolved ? 'grayscale-[30%]' : ''}`}
          >
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover"
            />
            {getStatusBadge() && (
              <div className="absolute top-1 left-1">
                {getStatusBadge()}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            {/* Creator + Title */}
            <div>
              <button 
                className="flex items-center gap-1 mb-1 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`);
                }}
              >
                <Avatar className="h-4 w-4">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="text-[7px]">{creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">{creator.name}</span>
                {creator.isCreator !== false && (
                  <BadgeCheck className="h-2.5 w-2.5 text-primary fill-primary/20" />
                )}
              </button>
              <h3 className="text-xs font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>

            {/* Stats */}
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

          {/* Outcomes - Right side */}
          <div className="flex flex-col gap-1 shrink-0">
            {isClosedOrResolved ? (
              <div className="w-16">
                {getResolutionDisplay()}
                {status === "closed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-1 text-orange-600 border-orange-500/30 hover:bg-orange-500/10 text-[9px] h-6 px-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDisputeDialog(true);
                    }}
                  >
                    Dispute
                  </Button>
                )}
              </div>
            ) : isBinary ? (
              displayOutcomes.map((outcome, index) => (
                <button 
                  key={index}
                  className={`w-14 rounded-md py-1.5 text-center transition-all active:scale-95 ${
                    outcome.color === 'success'
                      ? 'bg-success/10 hover:bg-success/20 text-success border border-success/20'
                      : 'bg-secondary hover:bg-secondary/80 text-muted-foreground border border-border/40'
                  }`}
                  onClick={handleOutcomeClick}
                >
                  <div className="text-sm font-bold leading-none">{outcome.price}¢</div>
                  <div className="text-[8px] font-medium mt-0.5">{outcome.label}</div>
                </button>
              ))
            ) : (
              <div className="space-y-0.5 w-20">
                {displayOutcomes.slice(0, 2).map((outcome, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center gap-1 rounded-md px-1.5 py-1 bg-secondary/50 hover:bg-secondary transition-colors text-left"
                    onClick={handleOutcomeClick}
                  >
                    {outcome.logo ? (
                      <img src={outcome.logo} alt={outcome.label} className="h-3.5 w-3.5 object-contain" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full bg-primary/10 flex items-center justify-center text-[7px] font-bold text-primary">
                        {outcome.label.charAt(0)}
                      </div>
                    )}
                    <span className="flex-1 text-[9px] font-medium truncate">{outcome.label}</span>
                    <span className="text-[10px] font-bold">{outcome.price}%</span>
                  </button>
                ))}
                {displayOutcomes.length > 2 && (
                  <p className="text-[8px] text-center text-muted-foreground">+{displayOutcomes.length - 2} more</p>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
