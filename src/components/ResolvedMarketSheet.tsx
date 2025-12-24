import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Trophy,
  Timer,
  Gavel,
  BadgeCheck,
  Share2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
}

type MarketStatus = "closed" | "resolved";

interface ResolvedMarketSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  market: {
    id: string;
    title: string;
    image: string;
    creator: {
      name: string;
      avatar: string;
      id?: string;
      isCreator?: boolean;
    };
    outcomes: Outcome[];
    volume: string;
    endsIn: string;
  };
  status: MarketStatus;
  resolution: string;
  disputeEndsIn?: string;
  resolvedAt?: string;
}

export function ResolvedMarketSheet({ 
  open, 
  onOpenChange, 
  market,
  status,
  resolution,
  disputeEndsIn,
  resolvedAt
}: ResolvedMarketSheetProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [disputeReason, setDisputeReason] = useState("");
  const [showDisputeForm, setShowDisputeForm] = useState(false);

  const isDispute = status === "closed";

  // Mock resolution description
  const resolutionDescription = "The market was resolved based on official data confirming the outcome. The resolution followed the criteria outlined in the market rules and was verified by multiple trusted sources.";

  // Mock user position data
  const userPosition = {
    shares: 150,
    outcome: "Yes",
    avgPrice: 45,
    currentValue: resolution.toLowerCase() === "yes" ? 150 : 0,
    profit: resolution.toLowerCase() === "yes" ? 82.50 : -67.50,
    isWinner: resolution.toLowerCase() === "yes"
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/market/${market.id}`);
    toast({ title: "Link copied!" });
  };

  const handleSubmitDispute = () => {
    if (!disputeReason.trim()) return;
    toast({ 
      title: "Dispute submitted",
      description: "Your dispute has been submitted for review."
    });
    setDisputeReason("");
    setShowDisputeForm(false);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setShowDisputeForm(false);
      setDisputeReason("");
    }
    onOpenChange(isOpen);
  };

  const getOutcomeColor = (outcomeLabel: string) => {
    const label = outcomeLabel.toLowerCase();
    if (label === "yes") return "text-yes";
    if (label === "no") return "text-no";
    return "text-primary";
  };

  const getOutcomeBgColor = (outcomeLabel: string) => {
    const label = outcomeLabel.toLowerCase();
    if (label === "yes") return "bg-yes/10 border-yes/30";
    if (label === "no") return "bg-no/10 border-no/30";
    return "bg-primary/10 border-primary/30";
  };

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDispute ? (
                <Badge className="bg-orange-500/20 text-orange-600 border border-orange-500/30 text-[10px] font-medium px-2 py-0.5">
                  <Timer className="h-3 w-3 mr-1" />
                  Dispute: {disputeEndsIn}
                </Badge>
              ) : (
                <Badge className="bg-muted text-muted-foreground border border-border text-[10px] font-medium px-2 py-0.5">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Resolved
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <DrawerTitle className="text-left text-base font-semibold mt-2 leading-snug">
            {market.title}
          </DrawerTitle>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4 pb-6">
          <div className="space-y-4">
            {/* Creator */}
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                <AvatarFallback className="text-[8px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{market.creator.name}</span>
              {market.creator.isCreator !== false && (
                <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold text-foreground">{market.volume}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{market.endsIn}</span>
              </div>
            </div>

            {/* Final Resolution Display */}
            <div className={`p-4 rounded-xl border ${getOutcomeBgColor(resolution)}`}>
              <div className="flex items-center gap-2 mb-2">
                {isDispute ? (
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                ) : (
                  <Trophy className="h-4 w-4 text-primary" />
                )}
                <span className="text-xs font-semibold">
                  {isDispute ? "Proposed Resolution" : "Final Outcome"}
                </span>
              </div>
              
              <div className={`text-2xl font-bold uppercase text-center py-2 ${getOutcomeColor(resolution)}`}>
                {resolution}
              </div>
              
              {/* Progress bar showing result */}
              <div className="h-2 rounded-full bg-muted overflow-hidden mt-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    resolution.toLowerCase() === "yes" ? 'bg-yes w-full' : 
                    resolution.toLowerCase() === "no" ? 'bg-no w-0' : 'bg-primary w-1/2'
                  }`}
                />
              </div>
            </div>

            {/* Resolution Summary */}
            <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Gavel className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Resolution Summary</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                {resolutionDescription}
              </p>
            </div>

            {/* Your Position */}
            <div className="p-3 rounded-lg bg-background border border-border/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span>Your Position</span>
                {userPosition.isWinner ? (
                  <Badge className="bg-yes/20 text-yes border-yes/30 text-[10px] px-1.5 py-0">
                    Winner
                  </Badge>
                ) : (
                  <Badge className="bg-no/20 text-no border-no/30 text-[10px] px-1.5 py-0">
                    Loss
                  </Badge>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Shares held</span>
                  <span className="font-semibold">{userPosition.shares} {userPosition.outcome}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Avg. price</span>
                  <span className="font-semibold">{userPosition.avgPrice}¢</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Final value</span>
                  <span className="font-semibold">${userPosition.currentValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Profit/Loss</span>
                  <span className={`font-bold ${userPosition.profit >= 0 ? 'text-yes' : 'text-no'}`}>
                    {userPosition.profit >= 0 ? '+' : ''}${userPosition.profit.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Dispute Form (for closed markets) */}
            {isDispute && (
              <div className="space-y-3">
                {!showDisputeForm ? (
                  <Button
                    variant="outline"
                    className="w-full text-orange-600 border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500/50"
                    onClick={() => setShowDisputeForm(true)}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Dispute This Resolution
                  </Button>
                ) : (
                  <div className="p-3 rounded-lg border border-orange-500/30 bg-orange-500/5 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Submit Dispute</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Time remaining: <span className="font-semibold text-orange-600">{disputeEndsIn}</span>
                    </p>
                    <Textarea
                      placeholder="Explain why this resolution is incorrect..."
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      className="min-h-[80px] text-sm resize-none"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setShowDisputeForm(false);
                          setDisputeReason("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-500 hover:bg-orange-600"
                        disabled={!disputeReason.trim()}
                        onClick={handleSubmitDispute}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Claim Winnings Button (for resolved markets with winning position) */}
            {!isDispute && userPosition.isWinner && (
              <Button
                className="w-full bg-yes hover:bg-yes/90 text-yes-foreground"
                onClick={() => {
                  toast({
                    title: "Winnings claimed!",
                    description: `$${userPosition.currentValue.toFixed(2)} has been added to your wallet.`
                  });
                }}
              >
                <Trophy className="h-4 w-4 mr-2" />
                Claim ${userPosition.currentValue.toFixed(2)}
              </Button>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
