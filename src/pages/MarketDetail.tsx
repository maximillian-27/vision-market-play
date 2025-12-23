import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Clock, Users, DollarSign, Heart, MessageCircle, Share2, Check, X, BadgeCheck, Info, BarChart3, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { BuyDialog } from "@/components/BuyDialog";

const commentSchema = z.object({
  text: z.string()
    .trim()
    .min(1, { message: "Comment cannot be empty" })
    .max(500, { message: "Comment must be less than 500 characters" })
});

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies: number;
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
    subtitle: "The ultimate crypto milestone - will BTC finally break six figures?",
    description: "This market resolves to YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, or Kraken) before 11:59 PM ET on December 31, 2025. The price must be sustained for at least 5 minutes.",
    resolutionCriteria: "The market will resolve based on data from CoinGecko's Bitcoin price index. A screenshot of the price exceeding $100,000 for at least 5 consecutive minutes will be required.",
    outcomes: [
      { label: "Yes", price: 68, color: "success" },
      { label: "No", price: 32, color: "destructive" }
    ],
    volume: "$2.4M",
    endsIn: "3 months",
    endDate: "Dec 31, 2025",
    traders: "12.4K",
    liquidity: "$450K",
    priceHistory: [
      { date: "Jan", yes: 45, no: 55 },
      { date: "Feb", yes: 52, no: 48 },
      { date: "Mar", yes: 58, no: 42 },
      { date: "Apr", yes: 62, no: 38 },
      { date: "May", yes: 68, no: 32 },
    ]
  },
};

const mockComments: Comment[] = [
  {
    id: "1",
    author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", username: "@alexchen" },
    text: "Strong institutional adoption signals make this very likely. MicroStrategy and other corporations continue to accumulate.",
    timestamp: "2h ago",
    likes: 24,
    isLiked: false,
    replies: 3
  },
  {
    id: "2",
    author: { name: "Jordan Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", username: "@jsmith" },
    text: "Regulatory clarity will be key. If we get ETF approval momentum continues, this could easily happen.",
    timestamp: "4h ago",
    likes: 18,
    isLiked: true,
    replies: 1
  },
];

export default function MarketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const market = mockMarketData[id || "1"];
  
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(142);
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

  const handleCommentSubmit = () => {
    try {
      commentSchema.parse({ text: commentText });
      setIsSubmitting(true);
      const newComment: Comment = {
        id: Date.now().toString(),
        author: { name: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User", username: "@you" },
        text: commentText,
        timestamp: "Just now",
        likes: 0,
        isLiked: false,
        replies: 0
      };
      setComments([newComment, ...comments]);
      setCommentText("");
      toast({ title: "Comment posted", description: "Your comment has been added." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Invalid comment", description: error.errors[0].message, variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  const handleLikeMarket = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleShareMarket = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied", description: "Market link has been copied to clipboard." });
  };

  const handleOutcomeClick = (e: React.MouseEvent, outcome: any) => {
    e.stopPropagation();
    setSelectedOutcome(outcome);
    setShowBuyDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <BuyDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        outcome={selectedOutcome || market.outcomes[0]}
        marketTitle={market.title}
        marketId={id || "1"}
      />
      
      {/* Sticky Header */}
      <div className="sticky top-14 z-20 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleLikeMarket} className="gap-1.5">
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShareMarket}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <div className="space-y-4">
              {/* Creator */}
              <button 
                onClick={() => navigate(`/creator/${market.creator.id}`)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                  <AvatarFallback>{market.creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">{market.creator.name}</span>
                    {market.creator.verified && (
                      <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">Market Creator</span>
                </div>
              </button>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{market.title}</h1>
              
              {/* Subtitle */}
              <p className="text-muted-foreground">{market.subtitle}</p>

              {/* Key Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium text-foreground">{market.volume}</span>
                  <span>volume</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="font-medium text-foreground">{market.traders}</span>
                  <span>traders</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Ends {market.endDate}</span>
                </div>
              </div>
            </div>

            {/* Outcomes - Main Trading Section */}
            <Card className="border-border/40 overflow-hidden">
              <CardHeader className="bg-muted/30 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Trade this market</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Click an outcome to place your trade</p>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {market.outcomes.map((outcome: any, index: number) => {
                  const payout = outcome.price > 0 ? (100 / (outcome.price / 100)).toFixed(0) : 0;
                  return (
                    <button
                      key={index}
                      onClick={(e) => handleOutcomeClick(e, outcome)}
                      className="w-full p-4 rounded-xl border-2 border-border/50 hover:border-primary/50 bg-background hover:bg-muted/30 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${outcome.color === 'success' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                            {outcome.color === 'success' ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-lg">{outcome.label}</p>
                            <p className="text-sm text-muted-foreground">{outcome.price}¢ per share · ${payout} payout</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold">{outcome.price}%</p>
                          <p className="text-xs text-muted-foreground">probability</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Price Chart */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Price History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={market.priceHistory}>
                    <defs>
                      <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Area type="monotone" dataKey="yes" stroke="hsl(var(--success))" fill="url(#yesGradient)" strokeWidth={2} name="Yes %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Description & Resolution */}
            <Card className="border-border/40">
              <Tabs defaultValue="description">
                <CardHeader className="pb-0">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="resolution">Resolution Criteria</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-4">
                  <TabsContent value="description" className="mt-0">
                    <p className="text-foreground/90 leading-relaxed">{market.description}</p>
                  </TabsContent>
                  <TabsContent value="resolution" className="mt-0">
                    <div className="flex gap-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-foreground/90 leading-relaxed">{market.resolutionCriteria}</p>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            {/* Comments */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Comments ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Comment Input */}
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Share your thoughts on this market..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[80px] resize-none"
                      maxLength={500}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{commentText.length}/500</span>
                      <Button onClick={handleCommentSubmit} disabled={!commentText.trim() || isSubmitting} size="sm">
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">{comment.author.username}</span>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-foreground/90">{comment.text}</p>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id)} className="h-8 px-2 gap-1.5">
                            <Heart className={`h-4 w-4 ${comment.isLiked ? 'fill-destructive text-destructive' : ''}`} />
                            {comment.likes > 0 && <span className="text-xs">{comment.likes}</span>}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1.5">
                            <MessageCircle className="h-4 w-4" />
                            {comment.replies > 0 && <span className="text-xs">{comment.replies}</span>}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Stats */}
            <Card className="border-border/40 sticky top-32">
              <CardHeader>
                <CardTitle className="text-base">Market Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="font-semibold">{market.volume}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Liquidity</span>
                  <span className="font-semibold">{market.liquidity}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Traders</span>
                  <span className="font-semibold">{market.traders}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">End Date</span>
                  <span className="font-semibold">{market.endDate}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Time Left</span>
                  <Badge variant="outline">{market.endsIn}</Badge>
                </div>

                <Separator />

                {/* Quick Trade Buttons */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Quick Trade</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      className="bg-success hover:bg-success/90" 
                      onClick={(e) => handleOutcomeClick(e, market.outcomes[0])}
                    >
                      Buy Yes {market.outcomes[0].price}¢
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={(e) => handleOutcomeClick(e, market.outcomes[1])}
                    >
                      Buy No {market.outcomes[1].price}¢
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
