import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Heart, MessageCircle, Share2, Check, X, BadgeCheck, ChevronDown, Activity, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { BuyDialog } from "@/components/BuyDialog";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import fedImage from "@/assets/federal-reserve.jpg";

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
    outcomes: [
      { label: "Yes", price: 68, color: "success" },
      { label: "No", price: 32, color: "destructive" }
    ],
    volume: "$2.4M",
    endDate: "Dec 31, 2025",
    traders: 12400,
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
    traders: 8200,
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

// Activity data for sidebar
const marketActivity = [
  { id: "1", user: { name: "Alex Chen", username: "@alexchen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" }, action: "trade" as const, outcome: "Yes", amount: "$250", timestamp: "2m ago", direction: "up" as const },
  { id: "2", user: { name: "Maria Garcia", username: "@mariagarcia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" }, action: "comment" as const, timestamp: "5m ago" },
  { id: "3", user: { name: "David Kim", username: "@davidkim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" }, action: "trade" as const, outcome: "No", amount: "$180", timestamp: "8m ago", direction: "down" as const },
  { id: "4", user: { name: "Sophie Chen", username: "@sophiechen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie" }, action: "trade" as const, outcome: "Yes", amount: "$500", timestamp: "12m ago", direction: "up" as const },
  { id: "5", user: { name: "James Wilson", username: "@jameswilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" }, action: "comment" as const, timestamp: "15m ago" },
  { id: "6", user: { name: "Emma Taylor", username: "@emmataylor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" }, action: "trade" as const, outcome: "Yes", amount: "$320", timestamp: "18m ago", direction: "up" as const },
];

// Hottest markets for sidebar
const hottestMarkets = [
  { id: "1", title: "Will Bitcoin reach $100K by 2025?", image: bitcoinImage, volume: "$2.4M", yesPrice: 68 },
  { id: "4", title: "Next Fed interest rate decision?", image: fedImage, volume: "$3.1M", yesPrice: 45 },
  { id: "2", title: "Who will win NBA Championship?", image: nbaImage, volume: "$890K", yesPrice: 32 },
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
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<any>(null);
  const [showAllOutcomes, setShowAllOutcomes] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

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

  const handleOutcomeClick = (outcome: any) => {
    setSelectedOutcome(outcome);
    setShowBuyDialog(true);
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

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-6">
      <BuyDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        outcome={selectedOutcome || market.outcomes[0]}
        marketTitle={market.title}
        marketId={id || "1"}
      />

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-14 z-20 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="flex items-center justify-between px-4 h-12">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-sm">Market</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast({ title: "Link copied" });
            }}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex gap-6 justify-center">
          
          {/* Left Sidebar - Activity */}
          <div className="hidden lg:block w-64 flex-shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)]">
            <Card className="border-border/40">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-14rem)]">
                  <div className="space-y-0.5 px-3 pb-3">
                    {marketActivity.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <Avatar className="h-7 w-7 flex-shrink-0">
                          <AvatarImage src={item.user.avatar} alt={item.user.name} />
                          <AvatarFallback>{item.user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium truncate">{item.user.username}</span>
                            {item.action === "trade" && item.direction && (
                              item.direction === "up" ? (
                                <TrendingUp className="h-3 w-3 text-success" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-destructive" />
                              )
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-tight">
                            {item.action === "trade" ? (
                              <>bought <span className="font-medium text-foreground">{item.outcome}</span> for {item.amount}</>
                            ) : (
                              <>commented</>
                            )}
                          </p>
                          <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Center */}
          <div className="w-full max-w-xl flex-1">
            {/* Desktop Back Button */}
            <div className="hidden lg:flex items-center gap-2 py-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="-ml-2 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>

            {/* Creator Row */}
            <div className="flex items-center justify-between py-3">
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
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{market.endDate}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Live</Badge>
              </div>
            </div>

            {/* Title */}
            <div className="pb-4">
              <h1 className="text-lg lg:text-xl font-bold leading-snug">{market.title}</h1>
            </div>

            {/* Trade Section */}
            <div className="pb-4">
              {market.isMultiOutcome ? (
                <div className="space-y-2">
                  {visibleOutcomes.map((outcome: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleOutcomeClick(outcome)}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/40 hover:bg-muted/70 active:scale-[0.98] transition-all"
                    >
                      {outcome.logo ? (
                        <img src={outcome.logo} alt={outcome.label} className="h-10 w-10 object-contain" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-base font-bold">
                          {outcome.label.charAt(0)}
                        </div>
                      )}
                      <span className="flex-1 text-left font-medium">{outcome.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{outcome.price}%</span>
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <ChevronDown className="h-4 w-4 text-primary rotate-[-90deg]" />
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {market.outcomes.length > 3 && (
                    <button
                      onClick={() => setShowAllOutcomes(!showAllOutcomes)}
                      className="w-full py-2 text-sm text-primary font-medium"
                    >
                      {showAllOutcomes ? "Show less" : `Show ${market.outcomes.length - 3} more`}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {market.outcomes.map((outcome: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleOutcomeClick(outcome)}
                      className={`p-4 rounded-2xl active:scale-[0.98] transition-all ${
                        outcome.color === 'success'
                          ? 'bg-success/10 hover:bg-success/20 border-2 border-success/30'
                          : 'bg-muted/50 hover:bg-muted/80 border-2 border-border/50'
                      }`}
                    >
                      <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                        outcome.color === 'success' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {outcome.color === 'success' ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                      </div>
                      <p className="font-bold text-lg">{outcome.label}</p>
                      <p className="text-2xl font-bold mt-1">{outcome.price}¢</p>
                      <p className="text-xs text-muted-foreground mt-1">Buy to win $1</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 py-3 text-sm">
              <div>
                <span className="font-bold">{market.volume}</span>
                <span className="text-muted-foreground ml-1">volume</span>
              </div>
              <div>
                <span className="font-bold">{formatNumber(market.traders)}</span>
                <span className="text-muted-foreground ml-1">traders</span>
              </div>
            </div>

            {/* Chart */}
            <div className="py-2">
              <div className="h-32 rounded-xl overflow-hidden bg-muted/20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={market.priceHistory} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" hide />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px"
                      }}
                      formatter={(value: any) => [`${value}%`, ""]}
                    />
                    <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#chartGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Row */}
            <div className="flex items-center py-3">
              <div className="flex items-center gap-4">
                <button onClick={handleLike} className="active:scale-95 transition-transform">
                  <Heart className={`h-6 w-6 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
                </button>
                <button className="active:scale-95 transition-transform">
                  <MessageCircle className="h-6 w-6" />
                </button>
                <button 
                  className="active:scale-95 transition-transform"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({ title: "Link copied" });
                  }}
                >
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Likes Count */}
            <div>
              <p className="text-sm font-semibold">{formatNumber(likesCount)} likes</p>
            </div>

            {/* Description */}
            <div className="py-2">
              <Collapsible open={showDescription} onOpenChange={setShowDescription}>
                <p className="text-sm">
                  <span className="font-semibold">{market.creator.name.toLowerCase().replace(' ', '')} </span>
                  <span className="text-foreground/90">
                    {showDescription ? market.description : `${market.description.slice(0, 100)}...`}
                  </span>
                </p>
                <CollapsibleTrigger asChild>
                  <button className="text-sm text-muted-foreground mt-1">
                    {showDescription ? "less" : "more"}
                  </button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>

            {/* Comments */}
            <div className="border-t border-border/40 mt-3 pt-3">
              <button className="text-sm text-muted-foreground mb-3">
                View all {comments.length} comments
              </button>
              
              <div className="space-y-3">
                {comments.slice(0, 3).map((comment) => (
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
                        <button className="font-medium">Reply</button>
                      </div>
                    </div>
                    <button className="pt-1">
                      <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="flex items-center gap-3 py-4 mt-2">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                    className="w-full bg-transparent text-sm placeholder:text-muted-foreground outline-none pr-10"
                    maxLength={500}
                  />
                  {commentText.trim() && (
                    <button 
                      onClick={handleComment}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-primary font-semibold text-sm"
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Hottest Markets */}
          <div className="hidden lg:block w-64 flex-shrink-0 sticky top-20 self-start">
            <Card className="border-border/40">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Hottest Markets
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                {hottestMarkets.filter(m => m.id !== id).map((market) => (
                  <div
                    key={market.id}
                    onClick={() => navigate(`/market/${market.id}`)}
                    className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <img
                      src={market.image}
                      alt={market.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-medium leading-tight line-clamp-2">
                        {market.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{market.volume}</span>
                        <span>·</span>
                        <span className="font-medium text-success">{market.yesPrice}%</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-xs text-muted-foreground"
                  onClick={() => navigate("/")}
                >
                  View all markets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
