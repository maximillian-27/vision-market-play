import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Clock, Users, Heart, MessageCircle, Share2, Check, X, BadgeCheck, Info, Bookmark, MoreHorizontal } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { BuyDialog } from "@/components/BuyDialog";

const commentSchema = z.object({
  text: z.string().trim().min(1).max(500)
});

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
    description: "This market resolves to YES if Bitcoin reaches or exceeds $100,000 USD on any major exchange before December 31, 2025.",
    outcomes: [
      { label: "Yes", price: 68, color: "success" },
      { label: "No", price: 32, color: "destructive" }
    ],
    volume: "$2.4M",
    endDate: "Dec 31, 2025",
    traders: "12.4K",
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
    description: "This market resolves based on the winner of the 2024-2025 NBA Finals.",
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
    traders: "8.2K",
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
    author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", username: "@alexchen" },
    text: "Strong institutional adoption signals make this very likely. MicroStrategy and others continue to accumulate.",
    timestamp: "2h",
    likes: 24,
    isLiked: false,
  },
  {
    id: "2",
    author: { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", username: "@jsmith" },
    text: "Regulatory clarity will be key here.",
    timestamp: "4h",
    likes: 18,
    isLiked: true,
  },
];

export default function MarketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const market = mockMarketData[id || "1"];
  
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<any>(null);

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
    try {
      commentSchema.parse({ text: commentText });
      const newComment: Comment = {
        id: Date.now().toString(),
        author: { name: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User", username: "@you" },
        text: commentText,
        timestamp: "now",
        likes: 0,
        isLiked: false,
      };
      setComments([newComment, ...comments]);
      setCommentText("");
      toast({ title: "Comment posted" });
    } catch {
      toast({ title: "Comment required", variant: "destructive" });
    }
  };

  const handleOutcomeClick = (outcome: any) => {
    setSelectedOutcome(outcome);
    setShowBuyDialog(true);
  };

  const topOutcome = market.isMultiOutcome 
    ? market.outcomes.reduce((a: any, b: any) => a.price > b.price ? a : b)
    : market.outcomes[0];

  return (
    <div className="min-h-screen bg-background">
      <BuyDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        outcome={selectedOutcome || market.outcomes[0]}
        marketTitle={market.title}
        marketId={id || "1"}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-7 border-r-0 lg:border-r border-border/40">
            {/* Mobile Back Button */}
            <div className="lg:hidden sticky top-14 z-20 bg-background border-b border-border/40">
              <div className="flex items-center justify-between px-4 py-3">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="-ml-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="font-semibold text-sm">Market</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chart Section - Instagram Story-like */}
            <div className="relative bg-gradient-to-b from-muted/30 to-background">
              <div className="hidden lg:flex items-center gap-2 px-6 pt-6">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="-ml-2 gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
              
              <div className="px-4 lg:px-6 py-4">
                <div className="h-48 lg:h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={market.priceHistory}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "12px",
                          fontSize: "12px"
                        }}
                        formatter={(value: any) => [`${value}%`, "Price"]}
                      />
                      <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#priceGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 lg:px-6">
              {/* Creator Header */}
              <div className="flex items-center justify-between py-3">
                <button 
                  onClick={() => navigate(`/creator/${market.creator.id}`)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                    <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm">{market.creator.name}</span>
                      {market.creator.verified && (
                        <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">Creator</span>
                  </div>
                </button>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  Follow
                </Button>
              </div>

              {/* Title */}
              <h1 className="text-xl lg:text-2xl font-bold leading-tight mb-3">{market.title}</h1>

              {/* Stats Row */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span className="font-medium text-foreground">{market.volume}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{market.traders}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{market.endDate}</span>
                </div>
              </div>

              {/* Engagement Actions - Instagram Style */}
              <div className="flex items-center justify-between py-3 border-y border-border/40">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast({ title: "Link copied" });
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className="hover:scale-110 transition-transform"
                >
                  <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-foreground' : ''}`} />
                </button>
              </div>

              {/* Description */}
              <div className="py-4">
                <div className="flex items-start gap-2 text-sm">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{market.description}</p>
                </div>
              </div>

              <Separator />

              {/* Comments Section */}
              <div className="py-4 space-y-4">
                <p className="text-sm text-muted-foreground">{comments.length} comments</p>
                
                {/* Comment Input */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[40px] h-10 resize-none text-sm py-2"
                      maxLength={500}
                    />
                    <Button 
                      size="sm" 
                      onClick={handleComment}
                      disabled={!commentText.trim()}
                      className="h-10"
                    >
                      Post
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-semibold">{comment.author.username} </span>
                          <span className="text-foreground/90">{comment.text}</span>
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{comment.timestamp}</span>
                          <span>{comment.likes} likes</span>
                          <button className="font-medium hover:text-foreground">Reply</button>
                        </div>
                      </div>
                      <button className="self-start">
                        <Heart className={`h-3.5 w-3.5 ${comment.isLiked ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side (Trade Panel) */}
          <div className="lg:col-span-5 lg:py-6">
            <div className="sticky top-20 space-y-4 px-4 lg:px-0 pb-6 lg:pb-0">
              {/* Trade Card */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-0">
                  {/* Current Price Header */}
                  <div className="p-4 bg-muted/30 border-b border-border/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {market.isMultiOutcome ? "Leading" : "Yes probability"}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">{topOutcome.price}%</span>
                          {market.isMultiOutcome && (
                            <span className="text-sm font-medium text-muted-foreground">{topOutcome.label}</span>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs font-medium">
                        Live
                      </Badge>
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="p-4 space-y-2">
                    {market.isMultiOutcome ? (
                      /* Multi-outcome: Sorted by probability */
                      [...market.outcomes]
                        .sort((a: any, b: any) => b.price - a.price)
                        .map((outcome: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleOutcomeClick(outcome)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all group"
                          >
                            {outcome.logo ? (
                              <img src={outcome.logo} alt={outcome.label} className="h-8 w-8 object-contain" />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                                {outcome.label.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 text-left">
                              <p className="font-medium text-sm">{outcome.label}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold">{outcome.price}%</span>
                              <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Buy →
                              </span>
                            </div>
                          </button>
                        ))
                    ) : (
                      /* Binary outcome: Yes/No buttons */
                      <div className="grid grid-cols-2 gap-3">
                        {market.outcomes.map((outcome: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleOutcomeClick(outcome)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              outcome.color === 'success'
                                ? 'border-success/30 bg-success/5 hover:border-success hover:bg-success/10'
                                : 'border-muted hover:border-foreground/30 hover:bg-muted/50'
                            }`}
                          >
                            <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                              outcome.color === 'success' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                            }`}>
                              {outcome.color === 'success' ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                            </div>
                            <p className="font-semibold text-lg">{outcome.label}</p>
                            <p className="text-2xl font-bold mt-1">{outcome.price}¢</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Info Footer */}
                  <div className="px-4 pb-4">
                    <p className="text-xs text-center text-muted-foreground">
                      Tap an outcome to place your trade
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <p className="text-lg font-bold">{market.volume}</p>
                  <p className="text-xs text-muted-foreground">Volume</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <p className="text-lg font-bold">{market.traders}</p>
                  <p className="text-xs text-muted-foreground">Traders</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <p className="text-lg font-bold">{market.endDate.split(' ')[0]}</p>
                  <p className="text-xs text-muted-foreground">Ends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
