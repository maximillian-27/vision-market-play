import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  MessageCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  BarChart3,
  Send,
  Heart
} from "lucide-react";

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
    { date: "Week 1", price: 45 },
    { date: "Week 2", price: 52 },
    { date: "Week 3", price: 48 },
    { date: "Week 4", price: 58 },
    { date: "Week 5", price: 62 },
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
    {
      id: "3",
      author: { name: "Emily Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", username: "emilyd" },
      text: "Great market! Been following this closely.",
      timestamp: "6h",
      likes: 8,
    },
  ],
});

const buySchema = z.object({
  amount: z.number()
    .min(1, { message: "Minimum amount is $1" })
    .max(10000, { message: "Maximum amount is $10,000" })
});

export function MarketDialog({ open, onOpenChange, market }: MarketDialogProps) {
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("trade");
  const [showResolution, setShowResolution] = useState(false);
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
          title: "Order placed",
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
    toast({ title: "Link copied to clipboard" });
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    toast({ title: "Comment posted" });
    setCommentText("");
  };

  const quickAmounts = [10, 25, 50, 100];

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedOutcome(null);
      setAmount("10");
      setActiveTab("trade");
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden max-h-[90vh]">
        {/* Header with image and actions */}
        <div className="relative h-28 bg-muted overflow-hidden flex-shrink-0">
          <img 
            src={market.image} 
            alt={market.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Top bar with creator and actions */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            {/* Creator badge */}
            <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                <AvatarFallback className="text-[8px]">{market.creator.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{market.creator.name}</span>
              {market.creator.isCreator !== false && (
                <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />
              )}
            </div>

            {/* Share button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute bottom-2 left-3 flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="font-semibold">{market.volume}</span>
            </div>
            <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5">
              <Clock className="h-3 w-3" />
              <span>{market.endsIn}</span>
            </div>
            {market.traders && (
              <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5">
                <Users className="h-3 w-3" />
                <span>{market.traders.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 max-h-[calc(90vh-112px)]">
          <div className="p-4 space-y-4">
            {/* Title */}
            <h2 className="text-lg font-bold leading-tight">{market.title}</h2>

            {/* Tabs for different sections */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 h-9">
                <TabsTrigger value="trade" className="text-xs">Trade</TabsTrigger>
                <TabsTrigger value="chart" className="text-xs">Chart</TabsTrigger>
                <TabsTrigger value="discuss" className="text-xs">Comments</TabsTrigger>
              </TabsList>

              {/* TRADE TAB */}
              <TabsContent value="trade" className="mt-4 space-y-4">
                {/* Outcome Selection */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Select outcome</p>
                  
                  {isBinary ? (
                    <div className="grid grid-cols-2 gap-2">
                      {market.outcomes.map((outcome, index) => {
                        const isYes = outcome.label.toLowerCase() === "yes";
                        const isSelected = selectedOutcome?.label === outcome.label;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => setSelectedOutcome(outcome)}
                            className={`p-3 rounded-xl transition-all active:scale-[0.98] border-2 ${
                              isSelected
                                ? isYes 
                                  ? 'border-success bg-success/10' 
                                  : 'border-muted-foreground bg-muted'
                                : isYes
                                  ? 'border-success/30 hover:border-success/50 hover:bg-success/5'
                                  : 'border-border hover:border-muted-foreground/50 hover:bg-muted/50'
                            }`}
                          >
                            <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                              isYes ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                            }`}>
                              {isYes ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </div>
                            <p className="font-semibold text-sm">{outcome.label}</p>
                            <p className="text-lg font-bold">{outcome.price}¢</p>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                      {market.outcomes.map((outcome, index) => {
                        const isSelected = selectedOutcome?.label === outcome.label;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => setSelectedOutcome(outcome)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${
                              isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-transparent hover:bg-muted/50'
                            }`}
                          >
                            {outcome.logo ? (
                              <img src={outcome.logo} alt={outcome.label} className="h-8 w-8 object-contain" />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                                {outcome.label.charAt(0)}
                              </div>
                            )}
                            <span className="flex-1 text-left font-medium text-sm">{outcome.label}</span>
                            <span className="text-base font-bold">{outcome.price}%</span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Amount Input - Only show when outcome is selected */}
                {selectedOutcome && (
                  <>
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Amount</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Wallet className="h-3.5 w-3.5" />
                          <span>$5,230.00</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-7 h-11 text-lg font-semibold"
                          min="1"
                          max="10000"
                          step="1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 gap-1.5">
                        {quickAmounts.map((quickAmount) => (
                          <Button
                            key={quickAmount}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(quickAmount.toString())}
                            className={`h-8 text-xs ${amount === quickAmount.toString() ? 'border-primary bg-primary/5' : ''}`}
                          >
                            ${quickAmount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/30 space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shares</span>
                        <span className="font-semibold">{shares.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Potential profit</span>
                        <span className={`font-semibold ${potentialProfit > 0 ? 'text-success' : ''}`}>
                          +${potentialProfit.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Buy Button */}
                <Button
                  className="w-full h-11 font-semibold"
                  onClick={handleBuy}
                  disabled={!selectedOutcome || isSubmitting || amountNum < 1 || amountNum > 10000}
                >
                  {isSubmitting 
                    ? "Placing order..." 
                    : selectedOutcome 
                      ? `Buy ${selectedOutcome.label} for $${amountNum.toFixed(2)}`
                      : "Select an outcome"
                  }
                </Button>

                <Separator />

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Description</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Resolution Criteria - Collapsible */}
                <Collapsible open={showResolution} onOpenChange={setShowResolution}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-primary transition-colors">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span>Resolution Criteria</span>
                    </div>
                    {showResolution ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-3 rounded-lg bg-muted/30 mt-2">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resolutionCriteria}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </TabsContent>

              {/* CHART TAB */}
              <TabsContent value="chart" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Price History</p>
                    <Badge variant="secondary" className="text-xs">
                      {isBinary ? `${market.outcomes[0].price}¢` : `${market.outcomes[0].price}%`}
                    </Badge>
                  </div>
                  
                  <div className="h-48 rounded-xl overflow-hidden bg-muted/20 p-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="dialogChartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="date" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px"
                          }}
                          formatter={(value: any) => [`${value}%`, "Price"]}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="hsl(var(--primary))" 
                          fill="url(#dialogChartGradient)" 
                          strokeWidth={2} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Market Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="text-lg font-bold">{market.volume}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Traders</p>
                    <p className="text-lg font-bold">{market.traders?.toLocaleString() || "1.2K"}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Ends</p>
                    <p className="text-lg font-bold">{market.endsIn}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Liquidity</p>
                    <p className="text-lg font-bold">$45K</p>
                  </div>
                </div>
              </TabsContent>

              {/* COMMENTS TAB */}
              <TabsContent value="discuss" className="mt-4 space-y-4">
                {/* Comment Input */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                      className="pr-10 h-9 text-sm"
                    />
                    {commentText.trim() && (
                      <button 
                        onClick={handleComment}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-semibold">{comment.author.username} </span>
                          <span className="text-foreground/90">{comment.text}</span>
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{comment.timestamp}</span>
                          <span>{comment.likes} likes</span>
                          <button className="font-medium hover:text-foreground">Reply</button>
                        </div>
                      </div>
                      <button className="pt-1 hover:text-primary transition-colors">
                        <Heart className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {comments.length > 3 && (
                  <Button variant="ghost" className="w-full text-sm text-muted-foreground">
                    View all {comments.length} comments
                  </Button>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}