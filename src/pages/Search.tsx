import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Search as SearchIcon, 
  BadgeCheck, 
  Users, 
  MessageSquare,
  Newspaper,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Clock,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { MarketGridCard } from "@/components/MarketGridCard";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

// Mock data for markets
const allMarkets = [
  {
    id: "1",
    creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", id: "sarah-chen", isCreator: true },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    image: bitcoinImage,
    yesPrice: 68,
    noPrice: 32,
    volume: "$2.4M",
    endsIn: "3 months",
    status: "open" as const,
  },
  {
    id: "2",
    creator: { name: "Mike Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", id: "mike-johnson", isCreator: true },
    title: "Who will win the NBA Championship this season?",
    image: nbaImage,
    outcomes: [
      { label: "Lakers", price: 25 },
      { label: "Celtics", price: 32 },
      { label: "Nuggets", price: 21 },
      { label: "Other", price: 22 },
    ],
    volume: "$890K",
    endsIn: "2 months",
    status: "open" as const,
  },
  {
    id: "3",
    creator: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", id: "emma-wilson", isCreator: true },
    title: "Will Apple release a foldable iPhone in 2025?",
    image: iphoneImage,
    yesPrice: 23,
    noPrice: 77,
    volume: "$1.2M",
    endsIn: "11 months",
    status: "open" as const,
  },
  {
    id: "4",
    creator: { name: "Alex Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", id: "alex-rodriguez", isCreator: true },
    title: "Next US Federal Reserve interest rate decision?",
    image: fedImage,
    outcomes: [
      { label: "Cut", price: 45 },
      { label: "Hold", price: 38 },
      { label: "Raise", price: 17 },
    ],
    volume: "$3.1M",
    endsIn: "1 month",
    status: "open" as const,
  },
  {
    id: "5",
    creator: { name: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", id: "jordan-lee", isCreator: true },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    image: aiImage,
    yesPrice: 71,
    noPrice: 29,
    volume: "$1.8M",
    endsIn: "1 year",
    status: "open" as const,
  },
];

// Mock data for users
const allUsers = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    username: "@sarahchen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    verified: true,
    isCreator: true,
    followers: 12340,
  },
  {
    id: "marketmaven",
    name: "MarketMaven",
    username: "@marketmaven",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven",
    verified: true,
    isCreator: true,
    followers: 8920,
  },
  {
    id: "alex-thompson",
    name: "Alex Thompson",
    username: "@alexthompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT",
    verified: false,
    isCreator: false,
    followers: 234,
  },
];

// Mock data for posts
const allPosts = [
  {
    id: "c1",
    user: {
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT",
      username: "@alexthompson"
    },
    thoughts: "This is actually more likely than people think. Institutional adoption is accelerating.",
    timestamp: "2h ago",
    likes: 45,
    comments: 12,
    market: allMarkets[0]
  },
  {
    id: "c2",
    user: {
      name: "Maria Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      username: "@mariagarcia"
    },
    thoughts: "Apple typically waits until technology matures before adopting it.",
    timestamp: "4h ago",
    likes: 67,
    comments: 23,
    market: allMarkets[2]
  },
];

// Mock data for news
const allNews = [
  {
    id: "news-1",
    title: "Bitcoin Surges Past $95,000 as Institutional Interest Grows",
    source: "CryptoNews",
    time: "1h ago",
    image: bitcoinImage,
  },
  {
    id: "news-2",
    title: "Federal Reserve Officials Signal Potential Rate Cuts in 2025",
    source: "Financial Times",
    time: "3h ago",
    image: fedImage,
  },
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  
  const [usersOpen, setUsersOpen] = useState(false);
  const [postsOpen, setPostsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  // Filter results based on query
  const filteredMarkets = allMarkets.filter(
    (market) =>
      market.title.toLowerCase().includes(query.toLowerCase()) ||
      market.creator.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = allPosts.filter(
    (post) =>
      post.thoughts.toLowerCase().includes(query.toLowerCase()) ||
      post.user.name.toLowerCase().includes(query.toLowerCase()) ||
      post.market?.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNews = allNews.filter(
    (news) =>
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.source.toLowerCase().includes(query.toLowerCase())
  );

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!query) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <SearchIcon className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">Search for markets, users, posts, and news</p>
        </div>
      </div>
    );
  }

  const totalResults = filteredMarkets.length + filteredUsers.length + filteredPosts.length + filteredNews.length;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-4 lg:py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold">"{query}"</h1>
        <p className="text-xs text-muted-foreground">{totalResults} results</p>
      </div>

      {/* Markets - Primary Results (Grid like Feed) */}
      {filteredMarkets.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            Markets ({filteredMarkets.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
            {filteredMarkets.map((market) => (
              <MarketGridCard 
                key={market.id} 
                id={market.id}
                creator={market.creator}
                title={market.title}
                image={market.image}
                outcomes={market.outcomes}
                yesPrice={market.yesPrice}
                noPrice={market.noPrice}
                volume={market.volume}
                endsIn={market.endsIn}
                status={market.status}
              />
            ))}
          </div>
        </div>
      )}

      {/* Secondary Results - Collapsible Sections */}
      <div className="space-y-2 border-t pt-4">
        {/* Users */}
        {filteredUsers.length > 0 && (
          <Collapsible open={usersOpen} onOpenChange={setUsersOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Users</span>
                  <Badge variant="secondary" className="text-xs">{filteredUsers.length}</Badge>
                </div>
                {usersOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {filteredUsers.map((user) => (
                <Card
                  key={user.id}
                  className="border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => navigate(user.isCreator ? `/creator/${user.id}` : `/profile/${user.id}`)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-sm">{user.name}</span>
                          {user.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />}
                          {user.isCreator && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Creator</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{user.username}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{formatNumber(user.followers)} followers</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Posts */}
        {filteredPosts.length > 0 && (
          <Collapsible open={postsOpen} onOpenChange={setPostsOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Posts</span>
                  <Badge variant="secondary" className="text-xs">{filteredPosts.length}</Badge>
                </div>
                {postsOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden border-border/50">
                  <CardContent className="p-0">
                    <div className="p-3 space-y-2">
                      <div className="flex items-start gap-3">
                        <Avatar 
                          className="h-8 w-8 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${post.user.username.slice(1)}`);
                          }}
                        >
                          <AvatarImage src={post.user.avatar} alt={post.user.name} />
                          <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{post.user.username}</span>
                            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                          </div>
                          <p className="text-sm mt-1">{post.thoughts}</p>
                        </div>
                      </div>
                    </div>
                    {post.market && (
                      <div className="px-3 pb-3">
                        <div 
                          className="border rounded-lg overflow-hidden cursor-pointer hover:border-border transition-colors"
                          onClick={() => navigate(`/market/${post.market.id}`)}
                        >
                          <div className="flex gap-2 p-2">
                            <img src={post.market.image} alt="" className="w-12 h-12 rounded object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium line-clamp-2">{post.market.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{post.market.volume} volume</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4 px-3 pb-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{post.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" />{post.comments}</span>
                      <Share2 className="h-3.5 w-3.5 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* News */}
        {filteredNews.length > 0 && (
          <Collapsible open={newsOpen} onOpenChange={setNewsOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">News</span>
                  <Badge variant="secondary" className="text-xs">{filteredNews.length}</Badge>
                </div>
                {newsOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {filteredNews.map((news) => (
                <Card key={news.id} className="border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-16 h-16 shrink-0">
                        <img src={news.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-3 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 leading-tight">{news.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{news.source}</span>
                          <span>·</span>
                          <Clock className="h-3 w-3" />
                          <span>{news.time}</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>

      {/* No Results */}
      {totalResults === 0 && (
        <div className="text-center py-16 space-y-2">
          <SearchIcon className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">No results found for "{query}"</p>
          <p className="text-xs text-muted-foreground/70">Try different keywords</p>
        </div>
      )}
    </div>
  );
}