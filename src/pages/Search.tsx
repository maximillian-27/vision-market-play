import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Search as SearchIcon, 
  BadgeCheck, 
  Users, 
  BarChart3, 
  MessageSquare,
  Newspaper,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Clock
} from "lucide-react";
import { MarketCard } from "@/components/MarketCard";
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
    creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", isCreator: true },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
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
    creator: { name: "Mike Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", isCreator: true },
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
    likes: 89,
    comments: 24,
  },
  {
    id: "3",
    creator: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", isCreator: true },
    title: "Will Apple release a foldable iPhone in 2025?",
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
    creator: { name: "Alex Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", isCreator: true },
    title: "Next US Federal Reserve interest rate decision?",
    image: fedImage,
    outcomes: [
      { label: "Cut", price: 45 },
      { label: "Hold", price: 38 },
      { label: "Raise", price: 17 },
    ],
    volume: "$3.1M",
    endsIn: "1 month",
    likes: 321,
    comments: 95,
  },
  {
    id: "5",
    creator: { name: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan", isCreator: true },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    image: aiImage,
    yesPrice: 71,
    noPrice: 29,
    volume: "$1.8M",
    endsIn: "1 year",
    likes: 176,
    comments: 52,
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
    markets: 47,
    bio: "Professional market analyst specializing in crypto and tech predictions.",
  },
  {
    id: "marketmaven",
    name: "MarketMaven",
    username: "@marketmaven",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven",
    verified: true,
    isCreator: true,
    followers: 8920,
    markets: 32,
    bio: "Data-driven predictions across finance, sports, and politics.",
  },
  {
    id: "predictpro",
    name: "PredictPro",
    username: "@predictpro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Predict",
    verified: true,
    isCreator: true,
    followers: 9800,
    markets: 38,
    bio: "Building the future of forecasting.",
  },
  {
    id: "alex-thompson",
    name: "Alex Thompson",
    username: "@alexthompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT",
    verified: false,
    isCreator: false,
    followers: 234,
    markets: 0,
    bio: "Crypto enthusiast and active trader.",
  },
  {
    id: "maria-garcia",
    name: "Maria Garcia",
    username: "@mariagarcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    verified: false,
    isCreator: false,
    followers: 567,
    markets: 0,
    bio: "Tech industry watcher.",
  },
];

// Mock data for posts (community style)
const allPosts = [
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
    market: allMarkets[0]
  },
  {
    id: "c2",
    user: {
      name: "Maria Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      username: "@mariagarcia"
    },
    thoughts: "Apple typically waits until technology matures before adopting it. Looking at their track record with features like NFC, wireless charging, etc., I think they'll skip 2025.",
    timestamp: "4h ago",
    likes: 67,
    comments: 23,
    market: allMarkets[2]
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
    market: allMarkets[3]
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
    url: "#",
  },
  {
    id: "news-2",
    title: "Federal Reserve Officials Signal Potential Rate Cuts in 2025",
    source: "Financial Times",
    time: "3h ago",
    image: fedImage,
    url: "#",
  },
  {
    id: "news-3",
    title: "Apple's Foldable Device Patents Reveal New Display Technology",
    source: "TechCrunch",
    time: "5h ago",
    image: iphoneImage,
    url: "#",
  },
  {
    id: "news-4",
    title: "NBA Playoffs: Celtics and Lakers Set for Historic Showdown",
    source: "ESPN",
    time: "8h ago",
    image: nbaImage,
    url: "#",
  },
];

type TabType = "all" | "markets" | "users" | "posts" | "news";

const tabs: { value: TabType; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "All", icon: SearchIcon },
  { value: "markets", label: "Markets", icon: BarChart3 },
  { value: "users", label: "Users", icon: Users },
  { value: "posts", label: "Posts", icon: MessageSquare },
  { value: "news", label: "News", icon: Newspaper },
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Filter results based on query
  const filteredMarkets = allMarkets.filter(
    (market) =>
      market.title.toLowerCase().includes(query.toLowerCase()) ||
      market.creator.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.bio.toLowerCase().includes(query.toLowerCase())
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

  const counts = {
    all: filteredMarkets.length + filteredUsers.length + filteredPosts.length + filteredNews.length,
    markets: filteredMarkets.length,
    users: filteredUsers.length,
    posts: filteredPosts.length,
    news: filteredNews.length,
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!query) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <SearchIcon className="h-12 w-12 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">Enter a search term to find markets, users, posts, and news</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
      {/* Search Header */}
      <div>
        <h1 className="text-lg font-semibold">Results for "{query}"</h1>
        <p className="text-muted-foreground text-xs">{counts.all} results</p>
      </div>

      {/* Tab Navigation */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            return (
              <Button
                key={tab.value}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={`shrink-0 gap-1.5 ${isActive ? "" : "text-muted-foreground"}`}
                onClick={() => setActiveTab(tab.value)}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
                <span className={`text-xs ${isActive ? "opacity-80" : "opacity-60"}`}>
                  {counts[tab.value]}
                </span>
              </Button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Results */}
      <div className="space-y-6">
        {/* All Results */}
        {activeTab === "all" && (
          <>
            {filteredMarkets.length > 0 && (
              <ResultSection
                title="Markets"
                count={filteredMarkets.length}
                onSeeAll={() => setActiveTab("markets")}
              >
                <div className="space-y-3">
                  {filteredMarkets.slice(0, 2).map((market) => (
                    <MarketCard key={market.id} {...market} />
                  ))}
                </div>
              </ResultSection>
            )}

            {filteredUsers.length > 0 && (
              <ResultSection
                title="Users & Creators"
                count={filteredUsers.length}
                onSeeAll={() => setActiveTab("users")}
              >
                <div className="space-y-2">
                  {filteredUsers.slice(0, 3).map((user) => (
                    <UserCard key={user.id} user={user} navigate={navigate} formatNumber={formatNumber} />
                  ))}
                </div>
              </ResultSection>
            )}

            {filteredPosts.length > 0 && (
              <ResultSection
                title="Posts"
                count={filteredPosts.length}
                onSeeAll={() => setActiveTab("posts")}
              >
                <div className="space-y-3">
                  {filteredPosts.slice(0, 2).map((post) => (
                    <CommunityPostCard key={post.id} post={post} navigate={navigate} />
                  ))}
                </div>
              </ResultSection>
            )}

            {filteredNews.length > 0 && (
              <ResultSection
                title="News"
                count={filteredNews.length}
                onSeeAll={() => setActiveTab("news")}
              >
                <div className="space-y-2">
                  {filteredNews.slice(0, 2).map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </ResultSection>
            )}

            {counts.all === 0 && <NoResults query={query} />}
          </>
        )}

        {/* Markets Tab */}
        {activeTab === "markets" && (
          filteredMarkets.length > 0 ? (
            <div className="space-y-3">
              {filteredMarkets.map((market) => (
                <MarketCard key={market.id} {...market} />
              ))}
            </div>
          ) : (
            <NoResults query={query} type="markets" />
          )
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          filteredUsers.length > 0 ? (
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} navigate={navigate} formatNumber={formatNumber} />
              ))}
            </div>
          ) : (
            <NoResults query={query} type="users" />
          )
        )}

        {/* Posts Tab */}
        {activeTab === "posts" && (
          filteredPosts.length > 0 ? (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <CommunityPostCard key={post.id} post={post} navigate={navigate} />
              ))}
            </div>
          ) : (
            <NoResults query={query} type="posts" />
          )
        )}

        {/* News Tab */}
        {activeTab === "news" && (
          filteredNews.length > 0 ? (
            <div className="space-y-2">
              {filteredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <NoResults query={query} type="news" />
          )
        )}
      </div>
    </div>
  );
}

function ResultSection({ 
  title, 
  count, 
  onSeeAll, 
  children 
}: { 
  title: string; 
  count: number; 
  onSeeAll: () => void; 
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {count > 2 && (
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={onSeeAll}>
            See all {count}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

function UserCard({ user, navigate, formatNumber }: { user: any; navigate: any; formatNumber: (n: number) => string }) {
  return (
    <Card
      className="border-border/50 hover:border-border transition-colors cursor-pointer"
      onClick={() => navigate(user.isCreator ? `/creator/${user.id}` : `/profile/${user.id}`)}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm">{user.name}</span>
              {user.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />}
              {user.isCreator && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Creator</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{user.username}</p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <span>{formatNumber(user.followers)} followers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CommunityPostCard({ post, navigate }: { post: any; navigate: any }) {
  return (
    <Card className="overflow-hidden border-border/50">
      <CardContent className="p-0">
        {/* User Post Header */}
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Avatar 
              className="h-9 w-9 cursor-pointer"
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
                <span 
                  className="font-medium text-sm cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${post.user.username.slice(1)}`);
                  }}
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
        {post.market && (
          <div className="px-4 pb-4">
            <MarketGridCard {...post.market} />
          </div>
        )}

        {/* Engagement Actions */}
        <div className="flex items-center gap-1 px-4 pb-3 border-t pt-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-xs">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all text-xs">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all ml-auto">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function NewsCard({ news }: { news: any }) {
  return (
    <Card className="border-border/50 hover:border-border transition-colors cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-20 h-20 shrink-0">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-3 min-w-0">
            <h4 className="text-sm font-medium line-clamp-2 leading-tight">{news.title}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
              <span>{news.source}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {news.time}
              </span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NoResults({ query, type }: { query: string; type?: "markets" | "users" | "posts" | "news" }) {
  const message = type
    ? `No ${type} found for "${query}"`
    : `No results found for "${query}"`;

  return (
    <div className="text-center py-12 space-y-2">
      <SearchIcon className="h-10 w-10 text-muted-foreground/30 mx-auto" />
      <p className="text-muted-foreground text-sm">{message}</p>
      <p className="text-xs text-muted-foreground/70">Try different keywords</p>
    </div>
  );
}
