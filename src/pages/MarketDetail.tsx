import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ArrowLeft, Heart, MessageCircle, Share2, BadgeCheck, ChevronDown, ChevronUp, Send,
  Users, Clock, FileText, Scale, Wallet, Bookmark, Timer, Ticket
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
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
    creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen", verified: true },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    description: "This market resolves to YES if Bitcoin reaches or exceeds $100,000 USD on any major exchange before December 31, 2025. The price must be sustained for at least 5 minutes on Coinbase, Binance, or Kraken.",
    resolutionCriteria: "Resolution is based on official price data from Coinbase, Binance, or Kraken. The price must hit $100,000 USD and remain at or above this level for at least 5 consecutive minutes. In case of exchange discrepancies, Coinbase price will be the primary reference.",
    image: bitcoinImage,
    outcomes: [
      { label: "Yes", price: 68, color: "success" },
      { label: "No", price: 32, color: "destructive" }
    ],
    pot: 2400000, endDate: "Dec 31, 2025", endsIn: "3 months", players: 12400, activity24h: 1240, likesCount: 342,
    priceHistory: [
      { date: "Jan", price: 45 }, { date: "Feb", price: 52 }, { date: "Mar", price: 58 },
      { date: "Apr", price: 62 }, { date: "May", price: 68 },
    ]
  },
  "2": {
    creator: { name: "Mike Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", id: "mike-johnson", verified: true },
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
    pot: 890000, endDate: "Jun 30, 2025", endsIn: "2 months", players: 8200, activity24h: 430, likesCount: 189,
    priceHistory: [
      { date: "Jan", price: 28 }, { date: "Feb", price: 30 }, { date: "Mar", price: 31 }, { date: "Apr", price: 32 },
    ]
  },
  "5": {
    creator: { name: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", id: "jordan-lee", verified: true },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    description: "This market resolves to YES if at least 25% of customer service positions are replaced by AI chatbots or automated systems by December 31, 2026, as measured by major industry reports.",
    resolutionCriteria: "Resolution is based on industry reports from Gartner, McKinsey, or similar authoritative sources. The 25% threshold must be met globally across major markets.",
    image: aiImage,
    outcomes: [
      { label: "Yes", price: 71, color: "success" },
      { label: "No", price: 29, color: "destructive" }
    ],
    pot: 1800000, endDate: "Dec 31, 2025", endsIn: "Ended", players: 9800, activity24h: 0, likesCount: 176,
    status: "awaiting_resolution", resolutionDate: "Jan 15, 2026",
    priceHistory: [
      { date: "Jan", price: 55 }, { date: "Feb", price: 58 }, { date: "Mar", price: 65 },
      { date: "Apr", price: 68 }, { date: "May", price: 71 },
    ]
  },
};

const mockComments: Comment[] = [
  { id: "1", author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", username: "alexchen" }, text: "Strong institutional adoption signals make this very likely. MicroStrategy and others continue to accumulate.", timestamp: "2h", likes: 24, isLiked: false },
  { id: "2", author: { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", username: "jsmith" }, text: "Regulatory clarity will be key here. ETF momentum helps.", timestamp: "4h", likes: 18, isLiked: true },
  { id: "3", author: { name: "Emily Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", username: "emilyd" }, text: "I'm not so sure about this timeline. Seems aggressive.", timestamp: "6h", likes: 8, isLiked: false },
];

const buySchema = z.object({
  amount: z.number().min(1, { message: "Minimum entry is $1" }).max(10000, { message: "Maximum entry is $10,000" })
});

function formatPot(pot: number): string {
  if (pot >= 1000000) return `$${(pot / 1000000).toFixed(1)}M`;
  if (pot >= 1000) return `$${(pot / 1000).toFixed(0)}K`;
  return `$${pot}`;
}

function formatNumber(num: number) {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

// ─── Trade Panel Component ───────────────────────────────────
function TradePanel({ market, isBinary, isAwaitingResolution, className = "" }: {
  market: any; isBinary: boolean; isAwaitingResolution: boolean; className?: string;
}) {
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<any>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amountNum = parseFloat(amount) || 0;
  const selectedPrice = selectedOutcome?.price || 0;
  const payout = selectedPrice > 0 ? amountNum / (selectedPrice / 100) : 0;
  const winnings = payout - amountNum;
  const quickAmounts = [5, 10, 25, 50, 100];

  // Calculate win potential for teaser
  const lowestPrice = Math.min(...market.outcomes.map((o: any) => o.price));
  const winPotential = lowestPrice > 0 ? (10 / (lowestPrice / 100)).toFixed(0) : "0";

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({ title: "Select an outcome", description: "Please select an outcome before placing an entry", variant: "destructive" });
      return;
    }
    try {
      buySchema.parse({ amount: amountNum });
      setIsSubmitting(true);
      setTimeout(() => {
        toast({ title: "Entry placed!", description: `You entered $${amountNum.toFixed(2)} on "${selectedOutcome.label}"` });
        setIsSubmitting(false);
        setAmount("10");
        setSelectedOutcome(null);
      }, 500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Invalid amount", description: error.errors[0].message, variant: "destructive" });
      }
    }
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold">Place Entry</span>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Wallet className="h-3.5 w-3.5" />
          <span>$5,230</span>
        </div>
      </div>

      {isAwaitingResolution ? (
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
          <Clock className="h-5 w-5 text-blue-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Entries Closed</p>
          <p className="text-xs text-muted-foreground mt-1">Awaiting resolution</p>
          {market.resolutionDate && <p className="text-xs text-blue-500 mt-1">{market.resolutionDate}</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Outcome Selection */}
          {isBinary ? (
            <div className="space-y-3">
              {/* Probability bar */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-success w-10">{market.outcomes[0].price}%</span>
                <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
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
                      className={`rounded-xl py-3.5 text-center transition-all active:scale-[0.98] border-2 ${
                        isSelected
                          ? isYes ? 'border-success bg-success/15 text-success shadow-sm' : 'border-destructive bg-destructive/15 text-destructive shadow-sm'
                          : isYes ? 'border-success/30 bg-success/5 text-success hover:bg-success/10' : 'border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10'
                      }`}
                    >
                      <span className="text-base font-bold uppercase">{outcome.label}</span>
                      <span className="block text-xs font-semibold mt-0.5 opacity-70">{outcome.price}¢</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {market.outcomes.map((outcome: any, index: number) => {
                const isSelected = selectedOutcome?.label === outcome.label;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedOutcome(outcome)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all active:scale-[0.98] border ${
                      isSelected ? 'border-primary bg-primary/10 shadow-sm' : 'border-border/50 bg-secondary/40 hover:bg-secondary/70'
                    }`}
                  >
                    {outcome.logo ? (
                      <img src={outcome.logo} alt={outcome.label} className="h-6 w-6 object-contain rounded-sm" />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {outcome.label.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-semibold flex-1 text-left">{outcome.label}</span>
                    <span className="text-sm font-bold text-primary">{outcome.price}%</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 h-12 text-lg font-semibold bg-muted/30 border-border/50 focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {quickAmounts.map((qa) => (
                <button
                  key={qa}
                  onClick={() => setAmount(qa.toString())}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    amount === qa.toString()
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted'
                  }`}
                >
                  ${qa}
                </button>
              ))}
            </div>
          </div>

          {/* Payout Summary */}
          <div className="rounded-xl bg-muted/30 border border-border/50 p-4 space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your Entry</span>
              <span className="font-semibold">${amountNum.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ticket Price</span>
              <span className="font-semibold">{selectedOutcome ? `${selectedOutcome.price}¢` : '—'}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">If you win</span>
              <span className="font-bold text-base">{selectedOutcome ? `$${payout.toFixed(2)}` : '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Potential Winnings</span>
              <span className={`font-bold ${selectedOutcome && winnings > 0 ? 'text-success' : ''}`}>
                {selectedOutcome ? `+$${winnings.toFixed(2)}` : '—'}
              </span>
            </div>
          </div>

          {/* Win Teaser */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-success font-bold">
            <Ticket className="h-3.5 w-3.5" />
            <span>Win up to ${winPotential} per $10 ticket</span>
          </div>

          {/* Buy Button */}
          <Button
            className="w-full h-12 text-base font-semibold"
            onClick={handleBuy}
            disabled={!selectedOutcome || isSubmitting || amountNum < 1}
          >
            {isSubmitting ? "Placing entry..." : selectedOutcome ? `Enter ${selectedOutcome.label} • $${amountNum.toFixed(2)}` : "Select an outcome"}
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function MarketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const market = mockMarketData[id || "1"];
  
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(market?.likesCount || 0);
  const [showResolution, setShowResolution] = useState(false);
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

  const handleComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: { name: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User", username: "you" },
      text: commentText, timestamp: "now", likes: 0, isLiked: false,
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Top Bar */}
      <div className="sticky top-14 z-20 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-12">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-sm">Market</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { navigator.clipboard.writeText(window.location.href); toast({ title: "Link copied!" }); }}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className={`h-8 w-8 ${isBookmarked ? 'text-primary' : ''}`} onClick={() => { setIsBookmarked(!isBookmarked); toast({ title: isBookmarked ? "Removed from watchlist" : "Added to watchlist" }); }}>
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop: Two-column layout | Mobile: Single column */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-8 pt-0 md:pt-0">
          {/* ─── Left Column: Content ─── */}
          <div className={`flex-1 min-w-0 ${isMobile ? 'pb-64' : 'pb-12'}`}>
            {/* Hero Image */}
            {market.image && (
              <div className="relative w-full aspect-[2/1] md:aspect-[5/2] overflow-hidden md:rounded-2xl md:mt-6">
                <img src={market.image} alt={market.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                {/* Pot badge overlay */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-primary text-sm font-extrabold shadow-lg">
                    {formatPot(market.pot)} Pot
                  </span>
                </div>
              </div>
            )}

            {/* Creator Row */}
            <div className="flex items-center justify-between py-4">
              <button onClick={() => navigate(`/creator/${market.creator.id}`)} className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-border">
                  <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                  <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">{market.creator.name}</span>
                    {market.creator.verified && <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />}
                  </div>
                  <span className="text-[11px] text-muted-foreground">Creator</span>
                </div>
              </button>
              <Badge variant="secondary" className={`text-[10px] px-2.5 py-1 ${isAwaitingResolution ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : ''}`}>
                {isAwaitingResolution ? 'Awaiting Resolution' : 'Live'}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold leading-snug mb-3">{market.title}</h1>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-5">
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span className="font-semibold text-foreground">{formatNumber(market.players)}</span>
                <span>players</span>
              </div>
              <div className="flex items-center gap-1">
                <Timer className="h-3.5 w-3.5" />
                <span>{market.activity24h > 0 ? formatNumber(market.activity24h) : '0'} entries today</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{market.endsIn !== "Ended" ? `Ends ${market.endDate}` : "Ended"}</span>
              </div>
            </div>

            {/* Chart */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-1.5">
                {["1D", "1W", "1M", "All"].map((tf, i) => (
                  <button key={tf} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${i === 3 ? 'bg-muted text-foreground' : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground'}`}>
                    {tf}
                  </button>
                ))}
              </div>
              <div className="h-40 md:h-48 rounded-xl overflow-hidden bg-muted/20 p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={market.priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} interval="preserveStartEnd" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px", padding: "6px 10px" }}
                      formatter={(value: any) => [`${value}% chance`, "Probability"]}
                    />
                    <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#chartGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Description */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <FileText className="h-3.5 w-3.5" />
                <span>Description</span>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">{market.description}</p>
            </div>

            {/* Resolution Criteria */}
            <div className="mb-6">
              <Collapsible open={showResolution} onOpenChange={setShowResolution}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/40">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Scale className="h-3.5 w-3.5" />
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
            <div className="flex items-center gap-5 py-3 border-t border-b border-border/40 mb-6">
              <button onClick={handleLike} className="flex items-center gap-1.5 active:scale-95 transition-transform">
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
                <span className="text-xs font-medium">{formatNumber(likesCount)}</span>
              </button>
              <button className="flex items-center gap-1.5 active:scale-95 transition-transform">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs font-medium">{comments.length}</span>
              </button>
              <button className="active:scale-95 transition-transform" onClick={() => { navigator.clipboard.writeText(window.location.href); toast({ title: "Link copied!" }); }}>
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Comments Section - Always visible */}
            <div className="space-y-5">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                Comments ({comments.length})
              </h2>

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
                    className="pr-10 h-10 text-sm"
                  />
                  {commentText.trim() && (
                    <button onClick={handleComment} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors">
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Comment List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3 group">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="bg-muted/30 rounded-xl px-3.5 py-2.5 border border-border/30">
                        <span className="font-semibold text-sm">{comment.author.username}</span>
                        <p className="text-sm text-foreground/90 mt-0.5">{comment.text}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 px-1 text-xs text-muted-foreground">
                        <span>{comment.timestamp}</span>
                        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-destructive text-destructive' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="font-medium hover:text-foreground transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right Column: Trade Panel (Desktop only) ─── */}
          {!isMobile && (
            <div className="hidden md:block w-[340px] flex-shrink-0">
              <div className="sticky top-[7.5rem] mt-6">
                <TradePanel
                  market={market}
                  isBinary={isBinary}
                  isAwaitingResolution={isAwaitingResolution}
                  className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Mobile: Sticky Bottom Trade Panel ─── */}
      {isMobile && (
        <div className="fixed bottom-14 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/40 z-30">
          <div className="p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
            <MobileTradeBar market={market} isBinary={isBinary} isAwaitingResolution={isAwaitingResolution} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Trade Bar (compact) ──────────────────────────────
function MobileTradeBar({ market, isBinary, isAwaitingResolution }: { market: any; isBinary: boolean; isAwaitingResolution: boolean }) {
  const { toast } = useToast();
  const [selectedOutcome, setSelectedOutcome] = useState<any>(null);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const amountNum = parseFloat(amount) || 0;
  const selectedPrice = selectedOutcome?.price || 0;
  const payout = selectedPrice > 0 ? amountNum / (selectedPrice / 100) : 0;
  const winnings = payout - amountNum;
  const quickAmounts = [5, 10, 25, 50, 100];

  const handleBuy = () => {
    if (!selectedOutcome) {
      toast({ title: "Select an outcome", description: "Please select an outcome before placing an entry", variant: "destructive" });
      return;
    }
    try {
      buySchema.parse({ amount: amountNum });
      setIsSubmitting(true);
      setTimeout(() => {
        toast({ title: "Entry placed!", description: `You entered $${amountNum.toFixed(2)} on "${selectedOutcome.label}"` });
        setIsSubmitting(false);
        setAmount("10");
        setSelectedOutcome(null);
        setExpanded(false);
      }, 500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Invalid amount", description: error.errors[0].message, variant: "destructive" });
      }
    }
  };

  if (isAwaitingResolution) {
    return (
      <div className="flex items-center justify-center gap-2 py-1 text-sm">
        <Clock className="h-4 w-4 text-blue-500" />
        <span className="font-semibold text-blue-600">Entries Closed — Awaiting Resolution</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Outcome Selection Row */}
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
                <button key={index} onClick={() => { setSelectedOutcome(outcome); setExpanded(true); }}
                  className={`rounded-xl py-3 text-center transition-all active:scale-[0.98] border ${
                    isSelected
                      ? isYes ? 'border-success bg-success/20 text-success' : 'border-destructive bg-destructive/20 text-destructive'
                      : isYes ? 'border-success/30 bg-success/10 text-success hover:bg-success/15' : 'border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15'
                  }`}>
                  <span className="text-base font-bold uppercase">{outcome.label}</span>
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
              <button key={index} onClick={() => { setSelectedOutcome(outcome); setExpanded(true); }}
                className={`flex-shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all active:scale-[0.98] border ${
                  isSelected ? 'border-primary bg-primary/10' : 'border-border/40 bg-secondary/60 hover:bg-secondary'
                }`}>
                {outcome.logo ? (
                  <img src={outcome.logo} alt={outcome.label} className="h-5 w-5 object-contain rounded-sm" />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{outcome.label.charAt(0)}</div>
                )}
                <span className="text-sm font-semibold whitespace-nowrap">{outcome.label}</span>
                <span className="text-sm font-bold text-primary">{outcome.price}%</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Expanded: Amount + Enter */}
      {(expanded || selectedOutcome) && (
        <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">$</span>
              <Input type="number" inputMode="decimal" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)}
                className="pl-7 pr-3 h-11 text-lg font-semibold bg-muted/30 border-border/50 focus:border-primary" />
            </div>
            <Button className="h-11 px-5 font-semibold text-sm min-w-[100px]" onClick={handleBuy} disabled={!selectedOutcome || isSubmitting || amountNum < 1}>
              {isSubmitting ? "..." : `Enter`}
            </Button>
          </div>

          <div className="flex gap-1.5">
            {quickAmounts.map((qa) => (
              <button key={qa} onClick={() => setAmount(qa.toString())}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  amount === qa.toString() ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted'
                }`}>
                ${qa}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs bg-muted/30 rounded-lg px-3 py-2">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">Entry <span className="font-semibold text-foreground">${amountNum.toFixed(2)}</span></span>
              <div className="w-px h-3 bg-border" />
              <span className="text-muted-foreground">Win <span className="font-bold text-foreground">{selectedOutcome ? `$${payout.toFixed(2)}` : '—'}</span></span>
            </div>
            <span className={`font-bold ${selectedOutcome && winnings > 0 ? 'text-success' : ''}`}>
              {selectedOutcome ? `+$${winnings.toFixed(2)}` : '—'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
