import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarketGridCard } from "@/components/MarketGridCard";
import { HottestMarkets } from "@/components/HottestMarkets";
import { FollowingSidebar } from "@/components/FollowingSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Image, ChartBar, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  thoughts: string;
  timestamp: string;
  likes: number;
  comments: number;
  market: any;
}

const mockMarkets = [
  {
    id: "1",
    creator: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    subtitle: "The ultimate crypto milestone - will BTC finally break six figures?",
    image: bitcoinImage,
    yesPrice: 68,
    noPrice: 32,
    volume: "$2.4M",
    endsIn: "3 months",
    likes: 142,
    comments: 38,
  },
  {
    id: "2",
    creator: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    title: "Who will win the NBA Championship this season?",
    subtitle: "The race for the championship is heating up. Which team takes it all?",
    image: nbaImage,
    outcomes: [
      { label: "Lakers", price: 25, logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg" },
      { label: "Celtics", price: 32, logo: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg" },
      { label: "Nuggets", price: 21, logo: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg" },
      { label: "Other", price: 22 },
    ],
    volume: "$890K",
    endsIn: "2 months",
    likes: 89,
    comments: 24,
  },
  {
    id: "3",
    creator: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    title: "Will Apple release a foldable iPhone in 2025?",
    subtitle: "Apple's been quiet on foldables. Will they finally join the trend?",
    image: iphoneImage,
    yesPrice: 23,
    noPrice: 77,
    volume: "$1.2M",
    endsIn: "11 months",
    likes: 203,
    comments: 67,
  },
  {
    id: "4",
    creator: {
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    title: "Next US Federal Reserve interest rate decision?",
    subtitle: "Fed's next move could shake the markets. Cut, hold, or raise?",
    image: fedImage,
    outcomes: [
      { label: "Cut", price: 45, color: "success" },
      { label: "Hold", price: 38 },
      { label: "Raise", price: 17, color: "destructive" },
    ],
    volume: "$3.1M",
    endsIn: "1 month",
    likes: 321,
    comments: 95,
  },
  {
    id: "5",
    creator: {
      name: "Jordan Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    subtitle: "AI chatbots are everywhere. How much of the workforce will they replace?",
    image: aiImage,
    yesPrice: 71,
    noPrice: 29,
    volume: "$1.8M",
    endsIn: "1 year",
    likes: 176,
    comments: 52,
  },
];

const mockCommunityPosts: CommunityPost[] = [
  {
    id: "c1",
    user: {
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT",
      username: "@alexthompson"
    },
    thoughts: "This is actually more likely than people think. Institutional adoption is accelerating and the ETF approvals have brought in serious capital. I'm betting YES on this one.",
    timestamp: "2h ago",
    likes: 45,
    comments: 12,
    market: mockMarkets[0]
  },
  {
    id: "c2",
    user: {
      name: "Maria Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      username: "@mariagarcia"
    },
    thoughts: "Apple typically waits until technology matures before adopting it. Looking at their track record with features like NFC, wireless charging, etc., I think they'll skip 2025 and wait for gen 2 foldable tech.",
    timestamp: "4h ago",
    likes: 67,
    comments: 23,
    market: mockMarkets[2]
  },
  {
    id: "c3",
    user: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      username: "@davidkim"
    },
    thoughts: "The Fed has been pretty clear about their stance. With inflation cooling down but still above target, I think they hold steady. Too risky to cut now.",
    timestamp: "6h ago",
    likes: 89,
    comments: 31,
    market: mockMarkets[3]
  },
  {
    id: "c4",
    user: {
      name: "Sophie Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      username: "@sophiechen"
    },
    thoughts: "We're already seeing this happen. Major companies are replacing tier-1 support with AI chatbots. The question isn't IF but WHEN we hit 25%. My company just laid off 30% of our support team last month.",
    timestamp: "8h ago",
    likes: 134,
    comments: 48,
    market: mockMarkets[4]
  },
  {
    id: "c5",
    user: {
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      username: "@jameswilson"
    },
    thoughts: "Lakers have the star power but their depth is questionable. Celtics are the most well-rounded team this season. I'm putting my money on Boston.",
    timestamp: "10h ago",
    likes: 56,
    comments: 19,
    market: mockMarkets[1]
  }
];

const categories = ["Hot", "Following", "Politics", "Sports", "Crypto", "Tech", "Entertainment", "Finance"];

export default function CommunityFeed() {
  const navigate = useNavigate();
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({});
  const [selectedFilter, setSelectedFilter] = useState("Hot");
  
  // Creator post composer state
  const [postContent, setPostContent] = useState("");
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  
  // Mock creator status - in real app this would come from auth context
  const isCreator = true;
  const currentUser = {
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    username: "@sarahchen"
  };

  const handlePost = () => {
    if (!postContent.trim()) return;
    setIsPosting(true);
    // Simulate posting
    setTimeout(() => {
      setPostContent("");
      setSelectedMarket(null);
      setIsPosting(false);
    }, 500);
  };

  const selectedMarketData = selectedMarket ? mockMarkets.find(m => m.id === selectedMarket) : null;

  return (
    <div className="w-full max-w-7xl mx-auto py-4 lg:py-6">
      <div className="flex gap-6 justify-center">
        <FollowingSidebar />
        
        <div className="w-full max-w-2xl space-y-4 px-4 lg:px-0">
          <PageHeader 
            title="Community"
            subtitle="See what others are saying about markets"
          />
          
          {/* Creator Post Composer */}
          {isCreator && (
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="What's happening in the markets?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="min-h-[80px] text-sm bg-transparent border-0 resize-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground/60"
                      maxLength={280}
                    />
                    
                    {/* Selected Market Preview */}
                    {selectedMarketData && (
                      <div className="relative border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setSelectedMarket(null)}
                          className="absolute top-2 right-2 z-10 p-1 bg-background/80 rounded-full hover:bg-background transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="pointer-events-none opacity-90 scale-[0.98]">
                          <MarketGridCard {...selectedMarketData} />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Select value={selectedMarket || "none"} onValueChange={(v) => setSelectedMarket(v === "none" ? null : v)}>
                          <SelectTrigger className="h-8 w-8 p-0 border-0 bg-transparent hover:bg-muted/60 [&>svg]:hidden">
                            <ChartBar className={`h-4 w-4 ${selectedMarket ? 'text-primary' : 'text-muted-foreground'}`} />
                          </SelectTrigger>
                          <SelectContent align="start" className="bg-popover">
                            <SelectItem value="none">No market</SelectItem>
                            {mockMarkets.map((market) => (
                              <SelectItem key={market.id} value={market.id}>
                                <span className="truncate max-w-[200px] block">{market.title}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs ${postContent.length > 250 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {postContent.length}/280
                        </span>
                        <Button 
                          size="sm" 
                          onClick={handlePost}
                          disabled={!postContent.trim() || isPosting}
                          className="rounded-full px-4"
                        >
                          {isPosting ? "Posting..." : "Post"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Category Filters */}
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`whitespace-nowrap font-medium px-4 py-2 text-sm transition-colors border-b-2 ${
                  category === selectedFilter 
                    ? "border-foreground text-foreground" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            {mockCommunityPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-border/50">
                <CardContent className="p-0">
                  {/* User Post Header */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar 
                        className="h-9 w-9 cursor-pointer"
                        onClick={() => navigate(`/profile/${post.user.username.slice(1)}`)}
                      >
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-medium text-sm cursor-pointer hover:underline"
                            onClick={() => navigate(`/profile/${post.user.username.slice(1)}`)}
                          >
                            {post.user.username}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                        </div>
                        <p className="text-sm mt-1.5 leading-relaxed">{post.thoughts}</p>
                      </div>
                    </div>
                  </div>

                  {/* Embedded Market */}
                  <div className="px-4 pb-4">
                    <MarketGridCard {...post.market} />
                  </div>

                  {/* Engagement Actions */}
                  <div className="flex items-center gap-1 px-4 pb-3 border-t pt-3">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-xs">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-xs"
                      onClick={() => setExpandedComments({ ...expandedComments, [post.id]: !expandedComments[post.id] })}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all ml-auto">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Comments Section */}
                  {expandedComments[post.id] && (
                    <div className="border-t bg-muted/20">
                      <div className="p-4 space-y-4">
                        {/* Comment Input */}
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <Textarea
                              placeholder="Add a comment..."
                              value={commentInputs[post.id] || ""}
                              onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                              className="min-h-[60px] text-sm bg-background"
                              maxLength={500}
                            />
                            <div className="flex justify-end">
                              <Button size="sm" disabled={!commentInputs[post.id]?.trim()}>
                                Comment
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Sample Comments */}
                        <div className="space-y-3 pt-2">
                          <div className="flex gap-3">
                            <Avatar className="h-7 w-7 flex-shrink-0">
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Comment1" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-xs">@johndoe</span>
                                <span className="text-xs text-muted-foreground">1h ago</span>
                              </div>
                              <p className="text-xs mt-0.5 text-muted-foreground">Great analysis! I agree with your take on this.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <HottestMarkets />
      </div>
    </div>
  );
}
