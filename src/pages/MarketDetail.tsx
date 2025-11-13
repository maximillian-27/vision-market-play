import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, TrendingUp, Clock, Users, DollarSign, Heart, MessageCircle, Share2, Check, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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

// Mock data - in a real app this would come from an API
const mockMarketData: Record<string, any> = {
  "1": {
    creator: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    subtitle: "The ultimate crypto milestone - will BTC finally break six figures?",
    description: "This market resolves to YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, or Kraken) before 11:59 PM ET on December 31, 2025. The price must be sustained for at least 5 minutes.",
    resolutionCriteria: "The market will resolve based on data from CoinGecko's Bitcoin price index. A screenshot of the price exceeding $100,000 for at least 5 consecutive minutes will be required. If there are disputes, the median price across the three exchanges (Coinbase, Binance, Kraken) will be used.",
    outcomes: [
      { label: "Yes", price: 68, color: "success" },
      { label: "No", price: 32, color: "destructive" }
    ],
    volume: "$2.4M",
    endsIn: "3 months",
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
  // Add more markets as needed
};

const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      username: "@alexchen"
    },
    text: "Strong institutional adoption signals make this very likely. MicroStrategy and other corporations continue to accumulate.",
    timestamp: "2h ago",
    likes: 24,
    isLiked: false,
    replies: 3
  },
  {
    id: "2",
    author: {
      name: "Jordan Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      username: "@jsmith"
    },
    text: "Regulatory clarity will be key. If we get ETF approval momentum continues, this could easily happen.",
    timestamp: "4h ago",
    likes: 18,
    isLiked: true,
    replies: 1
  },
  {
    id: "3",
    author: {
      name: "Taylor Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      username: "@tbrown"
    },
    text: "The halvening in 2024 historically leads to major price action. Could be a catalyst.",
    timestamp: "5h ago",
    likes: 12,
    isLiked: false,
    replies: 0
  }
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
    return <div className="p-4">Market not found</div>;
  }

  const handleCommentSubmit = () => {
    try {
      // Validate comment
      commentSchema.parse({ text: commentText });
      
      setIsSubmitting(true);
      
      // Create new comment
      const newComment: Comment = {
        id: Date.now().toString(),
        author: {
          name: "You",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
          username: "@you"
        },
        text: commentText,
        timestamp: "Just now",
        likes: 0,
        isLiked: false,
        replies: 0
      };
      
      setComments([newComment, ...comments]);
      setCommentText("");
      
      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid comment",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const handleLikeMarket = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleShareMarket = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Market link has been copied to clipboard.",
    });
  };

  const getOutcomeColor = (color?: string) => {
    switch (color) {
      case "success": return "bg-success/10 border-success/20 hover:bg-success/15";
      case "destructive": return "bg-muted/30 border-border/30 hover:bg-muted/40";
      default: return "bg-primary/10 border-primary/20 hover:bg-primary/15";
    }
  };

  const getOutcomeIcon = (color?: string) => {
    switch (color) {
      case "success": return <Check className="h-4 w-4" />;
      case "destructive": return <X className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
    }
  };

  const getIconBgColor = (color?: string) => {
    switch (color) {
      case "success": return "bg-success text-success-foreground";
      case "destructive": return "bg-destructive text-destructive-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const handleOutcomeClick = (e: React.MouseEvent, outcome: any) => {
    e.stopPropagation();
    setSelectedOutcome(outcome);
    setShowBuyDialog(true);
  };

  return (
    <div className="w-full md:container md:max-w-4xl md:py-6 pb-4">
      <BuyDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        outcome={selectedOutcome || market.outcomes[0]}
        marketTitle={market.title}
        marketId={id || "1"}
      />
      {/* Back Button */}
      <div className="sticky top-0 md:top-0 z-20 bg-background/95 backdrop-blur-sm border-b md:border-0 px-4 py-2 md:py-4 md:px-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </Button>
      </div>

      <div className="space-y-3 md:space-y-4 px-4 md:px-0 pt-2 md:pt-0">
        {/* Market Header */}
        <Card className="border-0 md:border shadow-none md:shadow-sm">
          <CardHeader className="space-y-3 md:space-y-4 p-4 md:p-6 relative">
            {/* Engagement Actions - Top Right */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-0.5 md:gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 md:h-9 md:w-9 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeMarket();
                }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-destructive text-destructive' : 'text-muted-foreground hover:text-destructive'}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 md:h-9 md:w-9 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MessageCircle className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 md:h-9 md:w-9 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareMarket();
                }}
              >
                <Share2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Button>
            </div>

            <div className="flex items-center gap-3 pr-24 md:pr-32">
              <Avatar className="h-9 w-9 md:h-10 md:w-10">
                <AvatarImage src={market.creator.avatar} alt={market.creator.name} />
                <AvatarFallback>{market.creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{market.creator.name}</p>
                <p className="text-xs text-muted-foreground">Market Creator</p>
              </div>
            </div>

            <h1 className="text-lg md:text-2xl font-bold leading-tight">{market.title}</h1>
            
            {market.subtitle && (
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{market.subtitle}</p>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
              <div className="space-y-1 bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="text-xs">Volume</span>
                </div>
                <p className="font-semibold text-sm md:text-base">{market.volume}</p>
              </div>
              <div className="space-y-1 bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="text-xs">Traders</span>
                </div>
                <p className="font-semibold text-sm md:text-base">{market.traders}</p>
              </div>
              <div className="space-y-1 bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <DollarSign className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="text-xs">Liquidity</span>
                </div>
                <p className="font-semibold text-sm md:text-base">{market.liquidity}</p>
              </div>
              <div className="space-y-1 bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="text-xs">Ends In</span>
                </div>
                <p className="font-semibold text-sm md:text-base">{market.endsIn}</p>
              </div>
            </div>

            {/* Outcome Buttons */}
            <div className="space-y-3 pt-2">
              {market.outcomes.map((outcome: any, index: number) => {
                const payout = outcome.price > 0 ? (100 / (outcome.price / 100)).toFixed(2) : 0;
                const percentage = outcome.price;
                const priceChange = index === 0 ? "+5.2%" : "-5.2%";
                const volume = index === 0 ? "$1.6M" : "$780K";
                
                return (
                  <button
                    key={index}
                    className={`w-full text-left rounded-xl px-4 py-4 md:py-5 border-2 transition-all hover:scale-[1.01] active:scale-[0.99] ${getOutcomeColor(outcome.color)} relative overflow-hidden group`}
                    onClick={(e) => handleOutcomeClick(e, outcome)}
                  >
                    {/* Background gradient bar */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
                      style={{
                        background: outcome.color === 'success' 
                          ? 'linear-gradient(90deg, hsl(var(--success)) 0%, transparent 100%)'
                          : 'linear-gradient(90deg, hsl(var(--destructive)) 0%, transparent 100%)',
                        width: `${percentage}%`
                      }}
                    />
                    
                    <div className="relative flex items-start gap-4">
                      {/* Icon */}
                      <div className={`rounded-full p-2 flex-shrink-0 ${getIconBgColor(outcome.color)}`}>
                        {getOutcomeIcon(outcome.color)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="text-base md:text-lg font-bold text-foreground mb-1">{outcome.label}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <span>{outcome.price}¢ per share</span>
                              <span className={priceChange.startsWith('+') ? 'text-success font-medium' : 'text-destructive font-medium'}>
                                {priceChange}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl md:text-3xl font-bold text-foreground">
                              {percentage}%
                            </div>
                            <div className="text-xs text-muted-foreground">probability</div>
                          </div>
                        </div>
                        
                        {/* Stats row */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/30">
                          <div>
                            <div className="text-xs text-muted-foreground mb-0.5">Potential return</div>
                            <div className="text-sm font-semibold text-foreground">
                              ${payout} <span className="text-xs text-muted-foreground font-normal">per $100</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground mb-0.5">Volume</div>
                            <div className="text-sm font-semibold text-foreground">{volume}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </CardHeader>
        </Card>

        {/* Price Chart */}
        <Card className="border-0 md:border shadow-none md:shadow-sm">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Price History</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={market.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yes" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Yes"
                  dot={{ fill: "hsl(var(--success))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="no" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="No"
                  dot={{ fill: "hsl(var(--destructive))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Details Tabs */}
        <Card className="border-0 md:border shadow-none md:shadow-sm">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mx-4 md:mx-6 mt-4 md:mt-6 md:w-auto md:inline-grid">
              <TabsTrigger value="description" className="text-sm">Description</TabsTrigger>
              <TabsTrigger value="resolution" className="text-sm">Resolution</TabsTrigger>
            </TabsList>
            
            <Separator className="my-3 md:my-4" />
            
            <TabsContent value="description" className="px-4 md:px-6 pb-4 md:pb-6 space-y-2 mt-0">
              <h3 className="font-semibold text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Market Description</h3>
              <p className="text-sm md:text-base leading-relaxed text-foreground/90">{market.description}</p>
            </TabsContent>
            
            <TabsContent value="resolution" className="px-4 md:px-6 pb-4 md:pb-6 space-y-2 mt-0">
              <h3 className="font-semibold text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Resolution Criteria</h3>
              <p className="text-sm md:text-base leading-relaxed text-foreground/90">{market.resolutionCriteria}</p>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Comments Section */}
        <Card className="border-0 md:border shadow-none md:shadow-sm">
          <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg">Comments ({comments.length})</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            {/* Comment Input */}
            <div className="px-4 md:px-6 pb-4 border-b">
              <div className="flex gap-2 md:gap-3">
                <Avatar className="h-8 w-8 md:h-10 md:w-10 mt-1 flex-shrink-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2 md:space-y-3">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[70px] md:min-h-[80px] resize-none border-0 focus-visible:ring-0 p-0 text-sm md:text-base"
                    maxLength={500}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {commentText.length}/500
                    </span>
                    <Button
                      onClick={handleCommentSubmit}
                      disabled={!commentText.trim() || isSubmitting}
                      size="sm"
                      className="h-8 md:h-9"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="divide-y">
              {comments.map((comment) => (
                <div key={comment.id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-muted/30 transition-colors">
                  <div className="flex gap-2 md:gap-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1.5 md:space-y-2 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-xs md:text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground truncate">{comment.author.username}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm md:text-base leading-relaxed break-words">{comment.text}</p>
                      <div className="flex items-center gap-3 md:gap-4 pt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent group -ml-1"
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-destructive transition-colors">
                            <Heart className={`h-3.5 w-3.5 md:h-4 md:w-4 ${comment.isLiked ? 'fill-destructive text-destructive' : ''}`} />
                            <span className="text-xs">{comment.likes > 0 ? comment.likes : ''}</span>
                          </div>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent group"
                        >
                          <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors">
                            <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            <span className="text-xs">{comment.replies > 0 ? comment.replies : ''}</span>
                          </div>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent group"
                        >
                          <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors">
                            <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
