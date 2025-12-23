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
          <Badge className="bg-amber-500/90 text-white border-0 text-[10px] font-medium">
            <Timer className="h-3 w-3 mr-1" />
            Closing
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-orange-500/90 text-white border-0 text-[10px] font-medium">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Dispute
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-success/90 text-white border-0 text-[10px] font-medium">
            <CheckCircle2 className="h-3 w-3 mr-1" />
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
      <div className={`text-center py-2.5 rounded-lg ${isYes ? 'bg-success/10' : isNo ? 'bg-secondary' : 'bg-success/10'}`}>
        <div className="flex items-center justify-center gap-2">
          {isYes ? (
            <Check className="h-4 w-4 text-success" />
          ) : isNo ? (
            <X className="h-4 w-4 text-muted-foreground" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-success" />
          )}
          <span className={`font-semibold ${isYes ? 'text-success' : isNo ? 'text-foreground' : 'text-success'}`}>
            {resolution}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
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
        <div className="flex gap-3 p-3">
          {/* Thumbnail */}
          <div 
            className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0 ${isClosedOrResolved ? 'grayscale-[30%]' : ''}`}
          >
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {getStatusBadge() && (
              <div className="absolute top-2 left-2">
                {getStatusBadge()}
              </div>
            )}
            {/* Creator badge */}
            <button 
              className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-1.5 py-0.5 hover:bg-black/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`);
              }}
            >
              <Avatar className="h-4 w-4">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="text-[7px]">{creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-white text-[10px] font-medium max-w-[60px] truncate">{creator.name.split(' ')[0]}</span>
              {creator.isCreator !== false && (
                <BadgeCheck className="h-3 w-3 text-white fill-white/30" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Title */}
            <h3 className="text-sm sm:text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
              {title}
            </h3>

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                {volume}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {endsIn}
              </span>
            </div>

            {/* Outcomes */}
            <div className="mt-auto">
              {isClosedOrResolved ? (
                <div className="space-y-2">
                  {getResolutionDisplay()}
                  {status === "closed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-orange-600 border-orange-500/30 hover:bg-orange-500/10 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDisputeDialog(true);
                      }}
                    >
                      <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      Dispute
                    </Button>
                  )}
                </div>
              ) : isBinary ? (
                <div className="flex gap-2">
                  {displayOutcomes.map((outcome, index) => (
                    <button 
                      key={index}
                      className={`flex-1 rounded-lg py-2 text-center transition-all active:scale-[0.98] ${
                        outcome.color === 'success'
                          ? 'bg-success/10 hover:bg-success/15 text-success border border-success/20'
                          : 'bg-secondary hover:bg-secondary/80 text-muted-foreground border border-border/50'
                      }`}
                      onClick={handleOutcomeClick}
                    >
                      <div className="text-lg font-bold">{outcome.price}¢</div>
                      <div className="text-[10px] font-medium">{outcome.label}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {displayOutcomes.slice(0, 3).map((outcome, index) => (
                    <button 
                      key={index}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 bg-secondary/60 hover:bg-secondary transition-colors"
                      onClick={handleOutcomeClick}
                    >
                      {outcome.logo ? (
                        <img src={outcome.logo} alt={outcome.label} className="h-4 w-4 object-contain" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                          {outcome.label.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-medium">{outcome.label}</span>
                      <span className="text-xs font-bold text-primary">{outcome.price}%</span>
                    </button>
                  ))}
                  {displayOutcomes.length > 3 && (
                    <span className="text-[10px] text-muted-foreground self-center">+{displayOutcomes.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
