import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  BadgeCheck, 
  Check, 
  X,
  Wallet,
  Share2,
  ChevronDown,
  ChevronUp,
  FileText,
  Scale,
  Send,
  Heart,
  MessageCircle,
  ExternalLink,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Outcome {
  label: string;
  price: number;
  color?: string;
  logo?: string;
}

interface Comment {
  id: string;
  author: { name: string; avatar: string; username: string };
  text: string;
  timestamp: string;
  likes: number;
}

interface MarketDialogProps {
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
    traders?: number;
    description?: string;
    resolutionCriteria?: string;
    priceHistory?: { date: string; price: number }[];
    comments?: Comment[];
  };
}

// Mock data for enhanced market info
const getMockMarketDetails = (marketId: string) => ({
  description: "This market tracks the prediction outcome based on official announcements and verified data sources. The resolution will be determined by the primary outcome at the specified end date.",
  resolutionCriteria: "This market resolves to YES if the specified outcome occurs before the end date. Resolution is based on official announcements from primary sources. In case of ambiguity, the market creator will consult with the resolution committee.",
  priceHistory: [
    { date: "W1", price: 45 },
    { date: "W2", price: 52 },
    { date: "W3", price: 48 },
    { date: "W4", price: 58 },
    { date: "W5", price: 62 },
    { date: "Now", price: 68 },
  ],
  comments: [
    {
      id: "1",
      author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", username: "alexchen" },
      text: "Looking bullish on this one. The fundamentals are strong.",
      timestamp: "2h",
      likes: 24,
    },
    {
      id: "2",
      author: { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", username: "jsmith" },
      text: "I'm taking the other side here. Too much uncertainty.",
      timestamp: "4h",
      likes: 12,
    },
  ],
});

const buySchema = z.object({
  amount: z.number()
    .min(1, { message: "Minimum amount is $1" })
    .max(10000, { message: "Maximum amount is $10,000" })
});

export function MarketDialog({ open, onOpenChange, market }: MarketDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResolution, setShowResolution] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const mockDetails = getMockMarketDetails(market.id);
  const description = market.description || mockDetails.description;
  const resolutionCriteria = market.resolutionCriteria || mockDetails.resolutionCriteria;
  const priceHistory = market.priceHistory || mockDetails.priceHistory;
  const comments = market.comments || mockDetails.comments;

  const isBinary = market.outcomes.length === 2 && 
    market.outcomes.some(o => o.label.toLowerCase() === "yes") &&
    market.outcomes.some(o => o.label.toLowerCase() === "no");

  const amountNum = parseFloat(amount) || 0;
  const shares = selectedOutcome && selectedOutcome.price > 0 
    ? Math.floor((amountNum * 100) / selectedOutcome.price) 
    : 0;
  const potentialPayout = shares;
  const potentialProfit = potentialPayout - amountNum;

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({
        title: "Select an outcome",
        description: "Please select an outcome before placing an order",
        variant: "destructive"
      });
      return;
    }

    try {
      buySchema.parse({ amount: amountNum });
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        toast({
          title: "Order placed!",
          description: `You bought ${shares} shares of "${selectedOutcome.label}" for $${amountNum.toFixed(2)}`,
        });
        onOpenChange(false);
        setIsSubmitting(false);
        setAmount("10");
        setSelectedOutcome(null);
      }, 500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid amount",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/market/${market.id}`);
    toast({ title: "Link copied!" });
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    toast({ title: "Comment posted" });
    setCommentText("");
  };

  const quickAmounts = [5, 10, 25, 50];

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedOutcome(null);
      setAmount("10");
      setShowComments(false);
      setShowResolution(false);
    }
    onOpenChange(isOpen);
  };

  const handleViewFullPage = () => {
    onOpenChange(false);
    navigate(`/market/${market.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[680px] p-0 gap-0 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Compact Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
              <AvatarFallback className="text-[10px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{market.creator.name}</span>
            {market.creator.isCreator !== false && (
              <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleViewFullPage}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* LEFT: Market Info */}
          <ScrollArea className="flex-1 sm:border-r border-border/40">
            <div className="p-4 space-y-4">
              {/* Title & Stats */}
              <div className="space-y-2">
                <h2 className="text-base font-bold leading-tight">{market.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    <span className="font-semibold text-foreground">{market.volume}</span>
                    <span>volume</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{market.traders?.toLocaleString() || "1.2K"} traders</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{market.endsIn}</span>
                  </div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="h-24 rounded-lg overflow-hidden bg-muted/20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceHistory} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dialogChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        fontSize: "11px",
                        padding: "4px 8px"
                      }}
                      formatter={(value: any) => [`${value}%`, ""]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      fill="url(#dialogChartGradient)" 
                      strokeWidth={1.5} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Description</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Resolution Criteria */}
              <Collapsible open={showResolution} onOpenChange={setShowResolution}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Scale className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Resolution Criteria</span>
                  </div>
                  {showResolution ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2 px-1">
                    {resolutionCriteria}
                  </p>
                </CollapsibleContent>
              </Collapsible>

              {/* Comments Preview */}
              <Collapsible open={showComments} onOpenChange={setShowComments}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{comments.length} Comments</span>
                  </div>
                  {showComments ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-3 space-y-3">
                    {comments.slice(0, 3).map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <Avatar className="h-6 w-6 flex-shrink-0">
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback className="text-[8px]">{comment.author.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs">
                            <span className="font-semibold">{comment.author.username} </span>
                            <span className="text-foreground/80">{comment.text}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                            <span>{comment.timestamp}</span>
                            <span>{comment.likes} likes</span>
                          </div>
                        </div>
                        <Heart className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                      </div>
                    ))}
                    
                    {/* Add comment */}
                    <div className="flex items-center gap-2 pt-2">
                      <Input
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                        className="h-8 text-xs"
                      />
                      {commentText.trim() && (
                        <Button size="icon" className="h-8 w-8" onClick={handleComment}>
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>

          {/* RIGHT: Quick Trade Panel - Always Visible */}
          <div className="w-full sm:w-[260px] flex-shrink-0 bg-muted/20 flex flex-col">
            <div className="p-4 space-y-4 flex-1">
              {/* Quick Trade Header */}
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Quick Trade</span>
              </div>

              {/* Outcome Selection */}
              {isBinary ? (
                <div className="grid grid-cols-2 gap-2">
                  {market.outcomes.map((outcome, index) => {
                    const isYes = outcome.label.toLowerCase() === "yes";
                    const isSelected = selectedOutcome?.label === outcome.label;
                    // Mock 24h change
                    const priceChange = isYes ? +3 : -3;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedOutcome(outcome)}
                        className={`p-3 rounded-xl transition-all active:scale-[0.98] border-2 ${
                          isSelected
                            ? isYes 
                              ? 'border-success bg-success/15' 
                              : 'border-muted-foreground bg-muted'
                            : isYes
                              ? 'border-success/30 hover:border-success/50 bg-success/5'
                              : 'border-border hover:border-muted-foreground/50 bg-background'
                        }`}
                      >
                        <div className={`mx-auto w-7 h-7 rounded-full flex items-center justify-center mb-1.5 ${
                          isYes ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                          {isYes ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        </div>
                        <p className="font-semibold text-xs">{outcome.label}</p>
                        <p className="text-lg font-bold">{outcome.price}¢</p>
                        <p className={`text-[10px] ${priceChange > 0 ? 'text-success' : 'text-destructive'}`}>
                          {priceChange > 0 ? '↑' : '↓'} {Math.abs(priceChange)}¢ 24h
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                  {market.outcomes.map((outcome, index) => {
                    const isSelected = selectedOutcome?.label === outcome.label;
                    // Mock 24h change
                    const priceChange = index === 0 ? +2 : index === 1 ? -1 : 0;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedOutcome(outcome)}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all border ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-transparent hover:bg-muted/50 bg-background'
                        }`}
                      >
                        {outcome.logo ? (
                          <img src={outcome.logo} alt={outcome.label} className="h-6 w-6 object-contain" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                            {outcome.label.charAt(0)}
                          </div>
                        )}
                        <span className="flex-1 text-left font-medium text-xs truncate">{outcome.label}</span>
                        <span className={`text-[10px] ${priceChange > 0 ? 'text-success' : priceChange < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {priceChange !== 0 ? (priceChange > 0 ? `↑${priceChange}` : `↓${Math.abs(priceChange)}`) : '—'}
                        </span>
                        <span className="text-sm font-bold">{outcome.price}%</span>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Amount Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Amount</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Wallet className="h-3 w-3" />
                    <span>$5,230</span>
                  </div>
                </div>
                
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-6 h-10 text-base font-semibold bg-background"
                    min="1"
                    max="10000"
                    step="1"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-1">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`h-7 text-[10px] px-0 ${amount === quickAmount.toString() ? 'border-primary bg-primary/5' : 'bg-background'}`}
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Order Summary - Always visible with detailed info */}
              <div className="p-2.5 rounded-lg bg-background border border-border/50 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Shares to receive</span>
                  <span className="font-semibold">{selectedOutcome ? shares.toLocaleString() : "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Avg price per share</span>
                  <span className="font-semibold">{selectedOutcome ? `${selectedOutcome.price}¢` : "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Implied probability</span>
                  <span className="font-semibold">{selectedOutcome ? `${selectedOutcome.price}%` : "—"}</span>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Payout if correct</span>
                  <span className="font-semibold">{selectedOutcome ? `$${potentialPayout.toFixed(2)}` : "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Potential profit</span>
                  <span className={`font-bold ${selectedOutcome && potentialProfit > 0 ? 'text-success' : ''}`}>
                    {selectedOutcome ? `+$${potentialProfit.toFixed(2)}` : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Return (ROI)</span>
                  <span className={`font-bold ${selectedOutcome && potentialProfit > 0 ? 'text-success' : ''}`}>
                    {selectedOutcome && amountNum > 0 ? `+${((potentialProfit / amountNum) * 100).toFixed(0)}%` : "—"}
                  </span>
                </div>
                <Separator className="my-1.5" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Max loss</span>
                  <span className="font-semibold text-destructive/80">{amountNum > 0 ? `-$${amountNum.toFixed(2)}` : "—"}</span>
                </div>
              </div>
            </div>

            {/* Sticky Buy Button */}
            <div className="p-4 pt-0">
              <Button
                className="w-full h-11 font-semibold text-sm"
                onClick={handleBuy}
                disabled={!selectedOutcome || isSubmitting || amountNum < 1 || amountNum > 10000}
              >
                {isSubmitting 
                  ? "Placing order..." 
                  : selectedOutcome 
                    ? `Buy ${selectedOutcome.label} • $${amountNum.toFixed(2)}`
                    : "Select outcome to trade"
                }
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}