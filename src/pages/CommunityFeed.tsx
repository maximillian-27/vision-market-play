import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarketCard } from "@/components/MarketCard";
import { NewsSidebar } from "@/components/NewsSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2 } from "lucide-react";
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
      { label: "Lakers", price: 25 },
      { label: "Celtics", price: 32 },
      { label: "Nuggets", price: 21 },
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

  return (
    <div className="w-full lg:container lg:max-w-7xl py-4 lg:py-6">
      <div className="flex gap-6">
        <div className="flex-1 space-y-4 md:space-y-6 px-4 lg:px-0 min-w-0">
          <h1 className="text-2xl font-bold">Community Feed</h1>
          
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === selectedFilter ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap transition-all hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-4">
            {mockCommunityPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* User Post Header */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar 
                        className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate(`/profile/${post.user.username.slice(1)}`)}
                      >
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-semibold text-sm cursor-pointer hover:underline"
                            onClick={() => navigate(`/profile/${post.user.username.slice(1)}`)}
                          >
                            {post.user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.user.username}</span>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                        </div>
                        <p className="text-sm mt-2 leading-relaxed">{post.thoughts}</p>
                      </div>
                    </div>
                  </div>

                  {/* Embedded Market */}
                  <div className="px-4 pb-4">
                    <div className="border rounded-lg overflow-hidden">
                      <MarketCard {...post.market} hideEngagement={true} />
                    </div>
                  </div>

                  {/* Engagement Actions */}
                  <div className="flex items-center gap-1 px-4 pb-3 border-t pt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 group"
                    >
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-destructive transition-colors">
                        <Heart className="h-5 w-5" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 group"
                      onClick={() => setExpandedComments({ ...expandedComments, [post.id]: !expandedComments[post.id] })}
                    >
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 group"
                    >
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                        <Share2 className="h-5 w-5" />
                      </div>
                    </Button>
                  </div>

                  {/* Comments Section */}
                  {expandedComments[post.id] && (
                    <div className="border-t">
                      <div className="p-4 space-y-4">
                        {/* Comment Input */}
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <Textarea
                              placeholder="Add a comment..."
                              value={commentInputs[post.id] || ""}
                              onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                              className="min-h-[60px] text-sm"
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
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Comment1" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs">John Doe</span>
                                <span className="text-xs text-muted-foreground">@johndoe</span>
                                <span className="text-xs text-muted-foreground">·</span>
                                <span className="text-xs text-muted-foreground">1h ago</span>
                              </div>
                              <p className="text-xs mt-1 text-muted-foreground">Great analysis! I agree with your take on this.</p>
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
        <NewsSidebar />
      </div>
    </div>
  );
}
