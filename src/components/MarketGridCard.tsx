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

  const isClosedOrResolved = status === "closed" || status === "resolved";
  const isBinary = displayOutcomes.length === 2 && !outcomes;

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
          <Badge className="bg-amber-500/90 text-white border-0 text-[10px] font-medium">
            <Timer className="h-2.5 w-2.5 mr-1" />
            Closing
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-orange-500/90 text-white border-0 text-[10px] font-medium">
            <AlertTriangle className="h-2.5 w-2.5 mr-1" />
            Dispute
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-success/90 text-white border-0 text-[10px] font-medium">
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
    
    return (
      <div className={`text-center py-3 rounded-lg ${isYes ? 'bg-success/10' : isNo ? 'bg-secondary' : 'bg-success/10'}`}>
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
        <p className="text-[10px] text-muted-foreground mt-1">
          {status === "closed" ? `Dispute: ${disputeEndsIn}` : resolvedAt}
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
        className={`group overflow-hidden hover:shadow-card-hover cursor-pointer border-border/50 transition-shadow ${isClosedOrResolved ? 'opacity-80' : ''}`}
      >
        <CardContent className="p-0">
          <div className="flex sm:flex-col">
            {/* Market Image */}
            <div 
              className={`relative aspect-square sm:aspect-[4/3] w-24 sm:w-full overflow-hidden bg-secondary flex-shrink-0 ${isClosedOrResolved ? 'grayscale-[30%]' : ''}`}
              onClick={() => navigate(`/market/${id}`)}
            >
              <img 
                src={image} 
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              
              {/* Status Badge */}
              {getStatusBadge() && (
                <div className="absolute top-2 right-2">
                  {getStatusBadge()}
                </div>
              )}
              
              {/* Creator */}
              <button 
                className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/creator/${creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}`);
                }}
              >
                <Avatar className="h-4 w-4">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="text-[8px]">{creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-white text-[10px] font-medium max-w-[60px] truncate">{creator.name}</span>
                {creator.isCreator !== false && (
                  <BadgeCheck className="h-3 w-3 text-white fill-white/30" />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="p-3 space-y-2.5 flex flex-col flex-1">
              {/* Title */}
              <h3 
                className="text-[13px] font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                onClick={() => navigate(`/market/${id}`)}
              >
                {title}
              </h3>

              {/* Resolution or Outcomes */}
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
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Dispute
                    </Button>
                  )}
                </div>
              ) : isBinary ? (
                /* Binary: Yes/No side by side */
                <div className="grid grid-cols-2 gap-1.5">
                  {displayOutcomes.map((outcome, index) => (
                    <button 
                      key={index}
                      className={`rounded-lg py-2.5 px-2 text-center transition-all active:scale-[0.98] ${
                        outcome.color === 'success'
                          ? 'bg-success/10 hover:bg-success/15 text-success border border-success/20'
                          : 'bg-secondary hover:bg-secondary/80 text-muted-foreground border border-border/50'
                      }`}
                      onClick={(e) => handleOutcomeClick(e, outcome)}
                    >
                      <div className="text-lg font-bold">{outcome.price}¢</div>
                      <div className="text-[10px] font-medium">{outcome.label}</div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Multi-outcome: List */
                <div className="space-y-1.5 max-h-[100px] overflow-y-auto scrollbar-thin">
                  {displayOutcomes.slice(0, 3).map((outcome, index) => (
                    <button 
                      key={index}
                      className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 bg-secondary/50 hover:bg-secondary transition-colors text-left"
                      onClick={(e) => handleOutcomeClick(e, outcome)}
                    >
                      {outcome.logo ? (
                        <img src={outcome.logo} alt={outcome.label} className="h-5 w-5 object-contain" />
                      ) : (
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                          {outcome.label.charAt(0)}
                        </div>
                      )}
                      <span className="flex-1 text-xs font-medium truncate">{outcome.label}</span>
                      <span className="text-sm font-bold">{outcome.price}%</span>
                    </button>
                  ))}
                  {displayOutcomes.length > 3 && (
                    <p className="text-[10px] text-center text-muted-foreground">+{displayOutcomes.length - 3} more</p>
                  )}
                </div>
              )}
              
              {/* Stats */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
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
