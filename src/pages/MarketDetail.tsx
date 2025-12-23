import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  Repeat2,
  Check, 
  X, 
  BadgeCheck, 
  ChevronDown, 
  ChevronUp, 
  Send,
  TrendingUp,
  Users,
  Clock,
  FileText,
  Scale,
  Wallet,
  Zap
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface Comment {
  id: string;
  author: { name: string; avatar: string; username: string };
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

// Mock data
const mockMarketData: Record<string, any> = {
  "1": {
    creator: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      id: "sarah-chen",
      verified: true,
    },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    description: "This market resolves to YES if Bitcoin reaches or exceeds $100,000 USD on any major exchange before December 31, 2025. The price must be sustained for at least 5 minutes on Coinbase, Binance, or Kraken.",
    resolutionCriteria: "Resolution is based on official price data from Coinbase, Binance, or Kraken. The price must hit $100,000 USD and remain at or above this level for at least 5 consecutive minutes. In case of exchange discrepancies, Coinbase price will be the primary reference.",
    outcomes: [
      { label: "Yes", price: 68, color: "success" },
      { label: "No", price: 32, color: "destructive" }
    ],
    volume: "$2.4M",
    endDate: "Dec 31, 2025",
    endsIn: "3 months",
    traders: 12400,
    volume24h: "$324K",
    likesCount: 342,
    priceHistory: [
      { date: "Jan", price: 45 },
      { date: "Feb", price: 52 },
      { date: "Mar", price: 58 },
      { date: "Apr", price: 62 },
      { date: "May", price: 68 },
    ]
  },
  "2": {
    creator: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      id: "mike-johnson",
      verified: true,
    },
    title: "Who will win the NBA Championship this season?",
    description: "This market resolves based on the winner of the 2024-2025 NBA Finals, as officially announced by the NBA.",
    resolutionCriteria: "The market resolves to the team that wins the 2024-2025 NBA Finals, as officially announced by the NBA. If the season is cancelled, the market resolves to 'Other'.",
    isMultiOutcome: true,
    outcomes: [
      { label: "Celtics", price: 32, logo: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg" },
      { label: "Lakers", price: 25, logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg" },
      { label: "Nuggets", price: 21, logo: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg" },
      { label: "Warriors", price: 12, logo: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg" },
      { label: "Other", price: 10 },
    ],
    volume: "$890K",
    endDate: "Jun 30, 2025",
    endsIn: "2 months",
    traders: 8200,
    volume24h: "$67K",
    likesCount: 189,
    priceHistory: [
      { date: "Jan", price: 28 },
      { date: "Feb", price: 30 },
      { date: "Mar", price: 31 },
      { date: "Apr", price: 32 },
    ]
  },
};

const mockComments: Comment[] = [
  {
    id: "1",
    author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", username: "alexchen" },
    text: "Strong institutional adoption signals make this very likely. MicroStrategy and others continue to accumulate.",
    timestamp: "2h",
    likes: 24,
    isLiked: false,
  },
  {
    id: "2",
    author: { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", username: "jsmith" },
    text: "Regulatory clarity will be key here. ETF momentum helps.",
    timestamp: "4h",
    likes: 18,
    isLiked: true,
  },
  {
    id: "3",
    author: { name: "Emily Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", username: "emilyd" },
    text: "I'm not so sure about this timeline. Seems aggressive.",
    timestamp: "6h",
    likes: 8,
    isLiked: false,
  },
];

const buySchema = z.object({
  amount: z.number()
    .min(1, { message: "Minimum amount is $1" })
    .max(10000, { message: "Maximum amount is $10,000" })
});

export default function MarketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const market = mockMarketData[id || "1"];
  
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(market?.likesCount || 0);
  const [selectedOutcome, setSelectedOutcome] = useState<any>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllOutcomes, setShowAllOutcomes] = useState(false);
  const [showResolution, setShowResolution] = useState(false);
  const [showComments, setShowComments] = useState(false);

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Market not found</p>
          <Button onClick={() => navigate('/')}>Back to Markets</Button>
        </div>
      </div>
    );
  }

  const isBinary = !market.isMultiOutcome;
  const amountNum = parseFloat(amount) || 0;
  const shares = selectedOutcome && selectedOutcome.price > 0 
    ? Math.floor((amountNum * 100) / selectedOutcome.price) 
    : 0;
  const potentialPayout = shares;
  const potentialProfit = potentialPayout - amountNum;

  const handleComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: { name: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User", username: "you" },
      text: commentText,
      timestamp: "now",
      likes: 0,
      isLiked: false,
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

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

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const sortedOutcomes = market.isMultiOutcome 
    ? [...market.outcomes].sort((a: any, b: any) => b.price - a.price)
    : market.outcomes;
  
  const visibleOutcomes = market.isMultiOutcome && !showAllOutcomes 
    ? sortedOutcomes.slice(0, 3) 
    : sortedOutcomes;

  const quickAmounts = [5, 10, 25, 50];

  return (
    <div className="min-h-screen bg-background pb-48">
      {/* Header */}
      <div className="sticky top-14 z-20 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-12">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-sm">Market</span>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied!" });
              }}
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => {
                toast({ title: "Reposted to your feed!" });
              }}
            >
              <Repeat2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {/* Creator Row */}
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate(`/creator/${market.creator.id}`)}
            className="flex items-center gap-3"
          >
            <Avatar className="h-9 w-9 ring-2 ring-border">
              <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
              <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm">{market.creator.name}</span>
                {market.creator.verified && (
                  <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
                )}
              </div>
            </div>
          </button>
          <Badge variant="secondary" className="text-[10px] px-2">Live</Badge>
        </div>

        {/* Title */}
        <div className="px-4 pb-3">
          <h1 className="text-lg font-bold leading-snug">{market.title}</h1>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-4 px-4 pb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold text-foreground">{market.volume}</span>
            <span>volume</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{formatNumber(market.traders)} traders</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{market.endDate}</span>
          </div>
        </div>

        {/* Chart with timeframe filters */}
        <div className="px-4 pb-4 space-y-2">
          <div className="flex items-center gap-1.5">
            {["1D", "1W", "1M", "All"].map((tf) => (
              <button
                key={tf}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors first:bg-muted first:text-foreground"
              >
                {tf}
              </button>
            ))}
          </div>
          <div className="h-36 rounded-xl overflow-hidden bg-muted/20 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={market.priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  interval="preserveStartEnd"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                    padding: "6px 10px"
                  }}
                  formatter={(value: any) => [`${value}%`, "Price"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#chartGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-3 gap-2 px-4 pb-4">
          <div className="p-2.5 rounded-lg bg-muted/30 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Volume</p>
            <p className="text-sm font-bold">{market.volume}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/30 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Traders</p>
            <p className="text-sm font-bold">{formatNumber(market.traders)}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/30 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">24h Vol</p>
            <p className="text-sm font-bold">{market.volume24h || "$45K"}</p>
          </div>
        </div>

        <Separator className="mx-4" />

        {/* Description */}
        <div className="px-4 py-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            <span>Description</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {market.description}
          </p>
        </div>

        {/* Resolution Criteria */}
        <div className="px-4 pb-4">
          <Collapsible open={showResolution} onOpenChange={setShowResolution}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
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
              <p className="text-sm text-muted-foreground leading-relaxed mt-3 px-1">
                {market.resolutionCriteria}
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Engagement Row */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
              <span className="text-xs font-medium">{formatNumber(likesCount)}</span>
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs font-medium">{comments.length}</span>
            </button>
            <button 
              className="active:scale-95 transition-transform"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied!" });
              }}
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <Collapsible open={showComments} onOpenChange={setShowComments}>
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4">
              <Separator />
              
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
              
              {/* Comments List */}
              <div className="space-y-3">
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
                        <button className="font-medium">Reply</button>
                      </div>
                    </div>
                    <button className="pt-1">
                      <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Sticky Trade Panel at Bottom */}
      <div className="fixed bottom-14 md:bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/40 z-30">
        <div className="max-w-2xl mx-auto p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] space-y-2">
          {/* Quick Trade Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Quick Trade</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Wallet className="h-3.5 w-3.5" />
              <span>$5,230</span>
            </div>
          </div>

          {/* Outcome Selection */}
          {isBinary ? (
            <div className="space-y-2">
              {/* Probability bar */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-success w-10">{market.outcomes[0].price}%</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-success to-success/80"
                    style={{ width: `${market.outcomes[0].price}%` }}
                  />
                </div>
                <span className="text-muted-foreground w-10 text-right">{market.outcomes[1].price}%</span>
              </div>
              
              {/* Outcome buttons */}
              <div className="grid grid-cols-2 gap-2">
                {market.outcomes.map((outcome: any, index: number) => {
                  const isYes = outcome.label.toLowerCase() === "yes";
                  const isSelected = selectedOutcome?.label === outcome.label;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedOutcome(outcome)}
                      className={`rounded-lg py-2.5 text-center transition-all active:scale-[0.98] border ${
                        isSelected
                          ? isYes 
                            ? 'border-success bg-success/20 text-success' 
                            : 'border-destructive bg-destructive/20 text-destructive'
                          : isYes
                            ? 'border-success/30 bg-success/10 text-success hover:bg-success/15'
                            : 'border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15'
                      }`}
                    >
                      <span className="text-sm font-bold uppercase">{outcome.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-1">
              {market.outcomes.map((outcome: any, index: number) => {
                const isSelected = selectedOutcome?.label === outcome.label;
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedOutcome(outcome)}
                    className={`flex-shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all active:scale-[0.98] border ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border/40 bg-secondary/60 hover:bg-secondary'
                    }`}
                  >
                    {outcome.logo ? (
                      <img src={outcome.logo} alt={outcome.label} className="h-5 w-5 object-contain rounded-sm" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {outcome.label.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-semibold whitespace-nowrap">{outcome.label}</span>
                    <span className="text-sm font-bold text-primary">{outcome.price}%</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Amount & Buy */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">$</span>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 pr-3 h-10 text-base font-semibold bg-muted/30 border-border/50 focus:border-primary"
              />
            </div>
            <Button
              className="h-10 px-5 font-semibold text-sm min-w-[110px]"
              onClick={handleBuy}
              disabled={!selectedOutcome || isSubmitting || amountNum < 1}
            >
              {isSubmitting 
                ? "..." 
                : selectedOutcome 
                  ? `Buy $${amountNum}`
                  : "Select"
              }
            </Button>
          </div>

          {/* Order Summary - always visible with key info */}
          <div className="flex items-center justify-between text-xs bg-muted/30 rounded-lg px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Shares</span>
                <span className="font-semibold">{selectedOutcome ? shares : '-'}</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Avg</span>
                <span className="font-semibold">{selectedOutcome ? `${selectedOutcome.price}¢` : '-'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Profit</span>
              <span className={`font-semibold ${selectedOutcome && potentialProfit > 0 ? 'text-success' : ''}`}>
                {selectedOutcome ? `+$${potentialProfit.toFixed(2)}` : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}