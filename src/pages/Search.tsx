import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, BadgeCheck, TrendingUp, Users, BarChart3 } from "lucide-react";
import { MarketGridCard } from "@/components/MarketGridCard";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import aiImage from "@/assets/ai-customer-service.jpg";

// Mock data for search
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

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("all");

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

  const totalResults = filteredMarkets.length + filteredUsers.length;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!query) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <SearchIcon className="h-16 w-16 text-muted-foreground/40 mx-auto" />
          <p className="text-muted-foreground">Enter a search term to find markets and users</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Search Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Search results for "{query}"</h1>
        <p className="text-muted-foreground text-sm">
          {totalResults} {totalResults === 1 ? "result" : "results"} found
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="gap-2">
            All
            <Badge variant="secondary" className="text-xs px-1.5">{totalResults}</Badge>
          </TabsTrigger>
          <TabsTrigger value="markets" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Markets
            <Badge variant="secondary" className="text-xs px-1.5">{filteredMarkets.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
            <Badge variant="secondary" className="text-xs px-1.5">{filteredUsers.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* All Results */}
        <TabsContent value="all" className="space-y-6 mt-6">
          {filteredUsers.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground">Users</h3>
                {filteredUsers.length > 3 && (
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("users")}>
                    See all
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {filteredUsers.slice(0, 3).map((user) => (
                  <UserCard key={user.id} user={user} navigate={navigate} formatNumber={formatNumber} />
                ))}
              </div>
            </div>
          )}

          {filteredMarkets.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground">Markets</h3>
                {filteredMarkets.length > 3 && (
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("markets")}>
                    See all
                  </Button>
                )}
              </div>
              <div className="grid gap-4">
                {filteredMarkets.slice(0, 3).map((market) => (
                  <MarketGridCard key={market.id} {...market} />
                ))}
              </div>
            </div>
          )}

          {totalResults === 0 && <NoResults query={query} />}
        </TabsContent>

        {/* Markets Results */}
        <TabsContent value="markets" className="space-y-4 mt-6">
          {filteredMarkets.length > 0 ? (
            <div className="grid gap-4">
              {filteredMarkets.map((market) => (
                <MarketGridCard key={market.id} {...market} />
              ))}
            </div>
          ) : (
            <NoResults query={query} type="markets" />
          )}
        </TabsContent>

        {/* Users Results */}
        <TabsContent value="users" className="space-y-3 mt-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} navigate={navigate} formatNumber={formatNumber} />
            ))
          ) : (
            <NoResults query={query} type="users" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserCard({ user, navigate, formatNumber }: { user: any; navigate: any; formatNumber: (n: number) => string }) {
  return (
    <Card
      className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
      onClick={() => navigate(user.isCreator ? `/creator/${user.id}` : `/profile/${user.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{user.name}</span>
              {user.verified && <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />}
              {user.isCreator && (
                <Badge variant="secondary" className="text-xs">Creator</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.username}</p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{user.bio}</p>
          </div>
          <div className="text-right text-sm space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground justify-end">
              <Users className="h-3.5 w-3.5" />
              <span>{formatNumber(user.followers)}</span>
            </div>
            {user.isCreator && (
              <div className="flex items-center gap-1 text-muted-foreground justify-end">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>{user.markets} markets</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NoResults({ query, type }: { query: string; type?: "markets" | "users" }) {
  const message = type
    ? `No ${type} found for "${query}"`
    : `No results found for "${query}"`;

  return (
    <div className="text-center py-12 space-y-3">
      <SearchIcon className="h-12 w-12 text-muted-foreground/40 mx-auto" />
      <p className="text-muted-foreground">{message}</p>
      <p className="text-sm text-muted-foreground/70">Try different keywords or check your spelling</p>
    </div>
  );
}
