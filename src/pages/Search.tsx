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
  TrendingUp, 
  Users, 
  BarChart3, 
  MessageSquare,
  Newspaper,
  Heart,
  Repeat2,
  ExternalLink,
  Clock
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
    creator: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    title: "Will Bitcoin reach $100,000 by end of 2025?",
    image: bitcoinImage,
    yesPrice: 68,
    noPrice: 32,
    volume: "$2.4M",
    endsIn: "3 months",
  },
  {
    id: "2",
    creator: { name: "Mike Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
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
  },
  {
    id: "3",
    creator: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
    title: "Will Apple release a foldable iPhone in 2025?",
    image: iphoneImage,
    yesPrice: 23,
    noPrice: 77,
    volume: "$1.2M",
    endsIn: "11 months",
  },
  {
    id: "4",
    creator: { name: "Alex Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    title: "Next US Federal Reserve interest rate decision?",
    image: fedImage,
    outcomes: [
      { label: "Cut", price: 45 },
      { label: "Hold", price: 38 },
      { label: "Raise", price: 17 },
    ],
    volume: "$3.1M",
    endsIn: "1 month",
  },
  {
    id: "5",
    creator: { name: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
    title: "Will AI replace 25% of customer service jobs by 2026?",
    image: aiImage,
    yesPrice: 71,
    noPrice: 29,
    volume: "$1.8M",
    endsIn: "1 year",
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

// Mock data for posts
const allPosts = [
  {
    id: "post-1",
    author: { name: "Sarah Chen", username: "@sarahchen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", verified: true },
    content: "Bitcoin just broke through $95K! My prediction market is looking strong 📈",
    likes: 234,
    reposts: 45,
    comments: 28,
    time: "2h ago",
    marketRef: { id: "1", title: "Will Bitcoin reach $100,000?" },
  },
  {
    id: "post-2",
    author: { name: "MarketMaven", username: "@marketmaven", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven", verified: true },
    content: "The Fed is definitely going to cut rates. All signals pointing that way. Check my market for the latest odds!",
    likes: 156,
    reposts: 32,
    comments: 19,
    time: "4h ago",
    marketRef: { id: "4", title: "Next US Federal Reserve interest rate decision?" },
  },
  {
    id: "post-3",
    author: { name: "Alex Thompson", username: "@alexthompson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT", verified: false },
    content: "Just went all in on YES for the foldable iPhone market. Apple patents don't lie! 🔥",
    likes: 89,
    reposts: 12,
    comments: 34,
    time: "6h ago",
    marketRef: { id: "3", title: "Will Apple release a foldable iPhone?" },
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
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author.name.toLowerCase().includes(query.toLowerCase()) ||
      post.marketRef?.title.toLowerCase().includes(query.toLowerCase())
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
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
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
                    <MarketGridCard key={market.id} {...market} />
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
                <div className="space-y-2">
                  {filteredPosts.slice(0, 2).map((post) => (
                    <PostCard key={post.id} post={post} navigate={navigate} formatNumber={formatNumber} />
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
                <MarketGridCard key={market.id} {...market} />
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
            <div className="space-y-2">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} navigate={navigate} formatNumber={formatNumber} />
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

function PostCard({ post, navigate, formatNumber }: { post: any; navigate: any; formatNumber: (n: number) => string }) {
  return (
    <Card className="border-border/50 hover:border-border transition-colors cursor-pointer">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm">{post.author.name}</span>
              {post.author.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary/20" />}
              <span className="text-xs text-muted-foreground">· {post.time}</span>
            </div>
          </div>
        </div>
        <p className="text-sm">{post.content}</p>
        {post.marketRef && (
          <div 
            className="flex items-center gap-2 text-xs text-primary bg-primary/5 rounded-md px-2 py-1.5 hover:bg-primary/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/market/${post.marketRef.id}`);
            }}
          >
            <BarChart3 className="h-3 w-3" />
            <span className="truncate">{post.marketRef.title}</span>
          </div>
        )}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {formatNumber(post.likes)}
          </span>
          <span className="flex items-center gap-1">
            <Repeat2 className="h-3.5 w-3.5" />
            {formatNumber(post.reposts)}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            {formatNumber(post.comments)}
          </span>
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
