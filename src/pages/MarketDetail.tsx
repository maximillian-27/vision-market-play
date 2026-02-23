import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  BadgeCheck, 
  ChevronDown, 
  ChevronUp, 
  Send,
  Users,
  Clock,
  FileText,
  Scale,
  Wallet,
  Bookmark,
  Timer,
  Trophy,
  PieChart as PieChartIcon,
  Ticket
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

interface Comment {
  id: string;
  author: { name: string; avatar: string; username: string };
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

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
    image: bitcoinImage,
    outcomes: [
      { label: "Yes", price: 68, color: "success" },
      { label: "No", price: 32, color: "destructive" }
    ],
    pot: 2400000,
    endDate: "Dec 31, 2025",
    endsIn: "3 months",
    players: 12400,
    activity24h: 1240,
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
    image: nbaImage,
    isMultiOutcome: true,
    outcomes: [
      { label: "Celtics", price: 32, logo: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg" },
      { label: "Lakers", price: 25, logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg" },
      { label: "Nuggets", price: 21, logo: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg" },
      { label: "Warriors", price: 12, logo: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg" },
      { label: "Other", price: 10 },
    ],
    pot: 890000,
    endDate: "Jun 30, 2025",
    endsIn: "2 months",
    players: 8200,
    activity24h: 430,
    likesCount: 189,
    priceHistory: [
      { date: "Jan", price: 28 },
      { date: "Feb", price: 30 },
      { date: "Mar", price: 31 },
      { date: "Apr", price: 32 },
    ]
  },
  "5": {
    creator: {
      name: "Jordan Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      id: "jordan-lee",
      verified: true,
    },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    description: "This market resolves to YES if at least 25% of customer service positions are replaced by AI chatbots or automated systems by December 31, 2026, as measured by major industry reports.",
    resolutionCriteria: "Resolution is based on industry reports from Gartner, McKinsey, or similar authoritative sources. The 25% threshold must be met globally across major markets.",
    image: aiImage,
    outcomes: [
      { label: "Yes", price: 71, color: "success" },
      { label: "No", price: 29, color: "destructive" }
    ],
    pot: 1800000,
    endDate: "Dec 31, 2025",
    endsIn: "Ended",
    players: 9800,
    activity24h: 0,
    likesCount: 176,
    status: "awaiting_resolution",
    resolutionDate: "Jan 15, 2026",
    priceHistory: [
      { date: "Jan", price: 55 },
      { date: "Feb", price: 58 },
      { date: "Mar", price: 65 },
      { date: "Apr", price: 68 },
      { date: "May", price: 71 },
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
    .min(1, { message: "Minimum entry is $1" })
    .max(10000, { message: "Maximum entry is $10,000" })
});

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

const revenueData = [
  { name: "Winners", value: 90, color: "hsl(152 68% 42%)" },
  { name: "Weekly Draw", value: 2, color: "hsl(217 85% 55%)" },
  { name: "Competitions", value: 5, color: "hsl(280 60% 55%)" },
  { name: "Platform Fee", value: 3, color: "hsl(220 10% 60%)" },
];

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
  const [isBookmarked, setIsBookmarked] = useState(false);

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
  const isAwaitingResolution = market.status === "awaiting_resolution";
  const amountNum = parseFloat(amount) || 0;
  
  const selectedPrice = selectedOutcome?.price || 0;
  const payout = selectedPrice > 0 ? amountNum / (selectedPrice / 100) : 0;
  const winnings = payout - amountNum;

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
        description: "Please select an outcome before placing an entry",
        variant: "destructive"
      });
      return;
    }

    try {
      buySchema.parse({ amount: amountNum });
      setIsSubmitting(true);
      setTimeout(() => {
        toast({
          title: "Entry placed!",
          description: `You entered $${amountNum.toFixed(2)} on "${selectedOutcome.label}"`,
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

  const quickAmounts = [5, 10, 25, 50, 100];

  // Calculate potential win for display
  const bestOdds = Math.min(...market.outcomes.map((o: any) => o.price));
  const potentialWin = bestOdds > 0 ? (10 / (bestOdds / 100)).toFixed(0) : "0";

  return (
    <div className="min-h-screen bg-background pb-56">
      {/* Sticky Header */}
      <div className="sticky top-14 z-20 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-12">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-sm">Market</span>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" size="icon" className="h-8 w-8"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied!" });
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" size="icon" 
              className={`h-8 w-8 ${isBookmarked ? 'text-primary' : ''}`}
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                toast({ title: isBookmarked ? "Removed from watchlist" : "Added to watchlist" });
              }}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Hero Image */}
        {market.image && (
          <div className="relative w-full aspect-[16/7] overflow-hidden">
            <img src={market.image} alt={market.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            {/* Status badge on image */}
            <div className="absolute top-3 right-3">
              <Badge className={`text-[10px] px-2.5 py-0.5 font-bold ${
                isAwaitingResolution 
                  ? 'bg-blue-500/90 text-white border-0' 
                  : 'bg-success/90 text-white border-0'
              }`}>
                {isAwaitingResolution ? 'Awaiting Resolution' : '● Live'}
              </Badge>
            </div>
          </div>
        )}

        {/* Creator + Title Block */}
        <div className="px-4 pt-3 pb-2">
          <button 
            onClick={() => navigate(`/creator/${market.creator.id}`)}
            className="flex items-center gap-2 mb-2.5"
          >
            <Avatar className="h-7 w-7 ring-1 ring-border">
              <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
              <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-muted-foreground">{market.creator.name}</span>
            {market.creator.verified && (
              <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />
            )}
          </button>
          <h1 className="text-xl font-bold leading-snug tracking-tight">{market.title}</h1>
        </div>

        {/* Key Metrics Strip */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-base font-extrabold">
              {formatPot(market.pot)} Pot
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span className="font-semibold text-foreground">{formatNumber(market.players)}</span>
              <span>players</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{market.endDate}</span>
            </div>
            {market.activity24h > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Timer className="h-3.5 w-3.5" />
                <span>{formatNumber(market.activity24h)} today</span>
              </div>
            )}
          </div>
          {/* Win teaser */}
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <Trophy className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">Win up to</span>
            <span className="font-bold text-primary">${potentialWin}</span>
            <span className="text-muted-foreground">from a $10 ticket</span>
          </div>
        </div>

        <Separator className="mx-4" />

        {/* Probability Chart */}
        <div className="px-4 py-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Probability History</span>
            <div className="flex items-center gap-1">
              {["1D", "1W", "1M", "All"].map((tf, i) => (
                <button
                  key={tf}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                    i === 3 ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="h-32 rounded-xl overflow-hidden bg-muted/20 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={market.priceHistory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} tickLine={false}
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
                  formatter={(value: any) => [`${value}%`, "Probability"]}
                />
                <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#chartGradient)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Separator className="mx-4" />

        {/* Revenue Distribution */}
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <PieChartIcon className="h-3 w-3" />
            <span>Transparency: Where your entry goes</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex rounded-full overflow-hidden h-2">
              {revenueData.map((item, i) => (
                <div 
                  key={i} 
                  style={{ width: `${item.value}%`, backgroundColor: item.color }} 
                  className="h-full first:rounded-l-full last:rounded-r-full"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {revenueData.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-bold">{item.value}%</span>
                  </div>
                  <span className="text-[9px] text-muted-foreground whitespace-nowrap">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mx-4" />

        {/* Description */}
        <div className="px-4 py-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            <span>About This Market</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{market.description}</p>
        </div>

        {/* Resolution Criteria */}
        <div className="px-4 pb-4">
          <Collapsible open={showResolution} onOpenChange={setShowResolution}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Scale className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Resolution Criteria</span>
              </div>
              {showResolution ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3 px-1">{market.resolutionCriteria}</p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Engagement Row */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
          <div className="flex items-center gap-5">
            <button onClick={handleLike} className="flex items-center gap-1.5 active:scale-95 transition-transform">
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
              <span className="text-xs font-medium">{formatNumber(likesCount)}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5 active:scale-95 transition-transform">
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
                    <button onClick={handleComment} className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
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

      {/* ── Sticky Entry Panel ── */}
      <div className="fixed bottom-14 md:bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/40 z-30">
        <div className="max-w-2xl mx-auto p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Place Entry</span>
            {!isAwaitingResolution && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Wallet className="h-3.5 w-3.5" />
                <span>$5,230</span>
              </div>
            )}
          </div>

          {isAwaitingResolution ? (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1.5" />
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Entries Closed</p>
                <p className="text-xs text-muted-foreground mt-0.5">Awaiting resolution</p>
                {market.resolutionDate && <p className="text-xs text-blue-500 mt-1">{market.resolutionDate}</p>}
              </div>
              {isBinary && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold opacity-75">
                    <span className="text-success w-10">{market.outcomes[0].price}%</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-success to-success/80" style={{ width: `${market.outcomes[0].price}%` }} />
                    </div>
                    <span className="text-muted-foreground w-10 text-right">{market.outcomes[1].price}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 opacity-60">
                    {market.outcomes.map((outcome: any, index: number) => {
                      const isYes = outcome.label.toLowerCase() === "yes";
                      return (
                        <div key={index} className={`rounded-lg py-2 text-center border ${isYes ? 'border-success/30 bg-success/10 text-success' : 'border-destructive/30 bg-destructive/10 text-destructive'}`}>
                          <span className="text-sm font-bold uppercase">{outcome.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Outcome Selection */}
              {isBinary ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="text-success w-10">{market.outcomes[0].price}%</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-success to-success/80" style={{ width: `${market.outcomes[0].price}%` }} />
                    </div>
                    <span className="text-muted-foreground w-10 text-right">{market.outcomes[1].price}%</span>
                  </div>
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
                              ? isYes ? 'border-success bg-success/20 text-success' : 'border-destructive bg-destructive/20 text-destructive'
                              : isYes ? 'border-success/30 bg-success/10 text-success hover:bg-success/15' : 'border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15'
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
                          isSelected ? 'border-primary bg-primary/10' : 'border-border/40 bg-secondary/60 hover:bg-secondary'
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

              {/* Amount & Enter */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">$</span>
                  <Input
                    type="number" inputMode="decimal" placeholder="0.00"
                    value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="pl-7 pr-3 h-10 text-base font-semibold bg-muted/30 border-border/50 focus:border-primary"
                  />
                </div>
                <Button
                  className="h-10 px-5 font-semibold text-sm min-w-[110px]"
                  onClick={handleBuy}
                  disabled={!selectedOutcome || isSubmitting || amountNum < 1}
                >
                  {isSubmitting ? "..." : selectedOutcome ? `Enter $${amountNum}` : "Select"}
                </Button>
              </div>

              {/* Quick amounts */}
              <div className="flex gap-1">
                {quickAmounts.map((qa) => (
                  <button
                    key={qa}
                    onClick={() => setAmount(qa.toString())}
                    className={`flex-1 py-1 rounded-md text-[10px] font-semibold transition-all ${
                      amount === qa.toString() ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted'
                    }`}
                  >
                    ${qa}
                  </button>
                ))}
              </div>

              {/* If You Win Summary */}
              <div className="flex items-center justify-between text-xs bg-muted/30 rounded-lg px-3 py-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Entry</span>
                    <span className="font-semibold">${amountNum.toFixed(2)}</span>
                  </div>
                  <div className="w-px h-3 bg-border" />
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Potential winning</span>
                    <span className="font-bold">{selectedOutcome ? `$${payout.toFixed(2)}` : '-'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Winnings</span>
                  <span className={`font-bold ${selectedOutcome && winnings > 0 ? 'text-success' : ''}`}>
                    {selectedOutcome ? `+$${winnings.toFixed(2)}` : '-'}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
