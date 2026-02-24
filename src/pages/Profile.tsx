import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserPlus, UserCheck, BadgeCheck, TrendingUp, Clock, Calendar, MapPin, Share2, ArrowUpRight, ArrowDownLeft, MessageCircle, Heart, Repeat2, Link2, ExternalLink, ChevronRight } from "lucide-react";
import { MarketCard } from "@/components/MarketCard";
import { MarketDialog } from "@/components/MarketDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { SocialStats } from "@/components/SocialStats";
import { ProfileStats } from "@/components/ProfileStats";
import { useToast } from "@/hooks/use-toast";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";

// Mock data to determine if user is a creator
const creatorNames = ['marketmaven', 'predictpro', 'trendsetter', 'insighthub', 'datadriven'];

const creatorData: Record<string, {
  markets: number;
  volume: string;
  followers: number;
  following: number;
  description: string;
  successRate: number;
  avgPot: string;
  biggestPot: string;
  link?: string;
}> = {
  'marketmaven': { 
    markets: 47, 
    volume: '$2.8M', 
    followers: 12340,
    following: 234,
    successRate: 89,
    avgPot: '$59.6K',
    biggestPot: '$184K',
    link: 'marketmaven.com',
    description: 'Professional market analyst specializing in crypto and tech predictions.'
  },
  'predictpro': { 
    markets: 38, 
    volume: '$2.1M', 
    followers: 9800,
    following: 156,
    successRate: 85,
    avgPot: '$55.3K',
    biggestPot: '$152K',
    link: 'predictpro.io',
    description: 'Data-driven predictions across finance, sports, and politics.'
  },
  'trendsetter': { 
    markets: 31, 
    volume: '$1.7M', 
    followers: 8200,
    following: 89,
    successRate: 82,
    avgPot: '$54.8K',
    biggestPot: '$128K',
    description: 'Identifying emerging trends before they go mainstream.'
  },
  'insighthub': { 
    markets: 29, 
    volume: '$1.5M', 
    followers: 7100,
    following: 67,
    successRate: 79,
    avgPot: '$51.7K',
    biggestPot: '$115K',
    link: 'insighthub.co',
    description: 'Providing actionable insights through well-researched prediction markets.'
  },
  'datadriven': { 
    markets: 24, 
    volume: '$1.2M', 
    followers: 6400,
    following: 45,
    successRate: 76,
    avgPot: '$50.0K',
    biggestPot: '$98K',
    description: 'Quantitative analyst creating markets based on statistical analysis.'
  },
};

const mockCreatorMarkets = [
  { id: "1", title: "Will Bitcoin reach $100K by end of 2025?", pot: "$1.2M", players: 8420, yesPercent: 68, endsIn: "3mo", image: bitcoinImage },
  { id: "2", title: "Fed cuts interest rates before April?", pot: "$890K", players: 5130, yesPercent: 42, endsIn: "5w", image: "" },
  { id: "3", title: "Apple announces foldable iPhone in 2025?", pot: "$340K", players: 3200, yesPercent: 23, endsIn: "8mo", image: "" },
  { id: "4", title: "SpaceX Starship orbital flight success?", pot: "$210K", players: 2100, yesPercent: 81, endsIn: "2w", image: "" },
  { id: "5", title: "Will Ethereum flip Bitcoin market cap?", pot: "$156K", players: 1840, yesPercent: 12, endsIn: "1y", image: "" },
];

// Mock activity data - X-style posts
interface ActivityItem {
  id: string;
  type: "post" | "comment" | "repost";
  timestamp: string;
  content: string;
  market?: {
    id: string;
    title: string;
    image: string;
  };
  likes: number;
  comments: number;
  reposts: number;
}

const mockUserActivity: ActivityItem[] = [
  {
    id: "a1",
    type: "post",
    timestamp: "2h",
    content: "Really bullish on this Bitcoin prediction. The institutional adoption signals are too strong to ignore.",
    market: { id: "1", title: "Will Bitcoin reach $100,000 by end of 2025?", image: bitcoinImage },
    likes: 42,
    comments: 8,
    reposts: 3,
  },
  {
    id: "a2",
    type: "repost",
    timestamp: "1d",
    content: "This is actually more likely than people think.",
    market: { id: "2", title: "Lakers make NBA playoffs?", image: nbaImage },
    likes: 18,
    comments: 4,
    reposts: 1,
  },
  {
    id: "a3",
    type: "post",
    timestamp: "3d",
    content: "Just got into prediction games last month and already seeing great picks. The key is doing your research!",
    likes: 67,
    comments: 12,
    reposts: 5,
  },
];

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<typeof mockCreatorMarkets[0] | null>(null);
  const isMobile = useIsMobile();
  const isOwnProfile = !userId;
  
  const displayName = userId 
    ? userId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Your Name";
  
  const isCreator = userId && creatorNames.includes(userId.toLowerCase());
  const creatorStats = isCreator && userId ? creatorData[userId.toLowerCase() as keyof typeof creatorData] : null;
  
  // Mock user data
  const userData = {
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`,
    username: `@${displayName.toLowerCase().replace(/\s+/g, '')}`,
    joinDate: isOwnProfile ? "Mar 2024" : "Feb 2024",
    followers: isOwnProfile ? 247 : 189,
    following: isOwnProfile ? 156 : 89,
    location: "New York, NY",
    bio: isCreator && creatorStats 
      ? creatorStats.description 
      : "Prediction market enthusiast. Making data-driven decisions since 2023.",
    // Trader stats
    totalProfit: "+$12,450",
    winRate: 78,
    totalTrades: 142,
    accuracy: 72,
    biggestWin: "$1,240",
    portfolioValue: 18450,
    cashBalance: 5230,
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Profile link has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Back Button - only for other profiles */}
        {!isOwnProfile && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="-ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        
        {/* Profile Header Card */}
        <Card className="border-border/40 overflow-hidden">
          {/* Cover gradient */}
          <div className="h-16 sm:h-24 md:h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20" />
          
          <CardContent className="pt-0 pb-6">
            {/* Avatar overlapping cover */}
            <div className="flex flex-col md:flex-row md:items-end gap-3 sm:gap-4 -mt-10 sm:-mt-12 md:-mt-16">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 border-4 border-background ring-2 ring-border/20">
                <AvatarImage src={userData.avatar} alt={displayName} />
                <AvatarFallback className="text-2xl">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{displayName}</h1>
                    {isCreator && (
                      <BadgeCheck className="h-6 w-6 text-primary fill-primary/20" />
                    )}
                  </div>
                  <p className="text-muted-foreground">{userData.username}</p>
                </div>
                
                {/* Actions */}
                {isOwnProfile ? (
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="gap-1.5">
                      <ArrowUpRight className="h-4 w-4" />
                      Deposit
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <ArrowDownLeft className="h-4 w-4" />
                      Withdraw
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => navigate('/settings')}>
                      Settings
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={isFollowing ? "outline" : "default"}
                      onClick={() => setIsFollowing(!isFollowing)}
                      className="gap-1.5"
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="h-4 w-4" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4" />
                          Follow
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Bio & Meta Info */}
            <div className="mt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed max-w-2xl">{userData.bio}</p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {isCreator && creatorStats?.link && (
                  <a 
                    href={`https://${creatorStats.link}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <Link2 className="h-4 w-4" />
                    {creatorStats.link}
                  </a>
                )}
                {userData.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {userData.location}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Joined {userData.joinDate}
                </div>
              </div>
              
              {/* Social Stats */}
              <SocialStats 
                followers={userData.followers} 
                following={userData.following}
                userId={userId}
              />
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Overview - Own Profile Only */}
        {isOwnProfile && (
          <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Balance</p>
                  <p className="text-2xl sm:text-3xl font-bold">${userData.portfolioValue.toLocaleString()}</p>
                  <p className="text-sm text-success mt-1">{userData.totalProfit} total winnings</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available</p>
                  <p className="text-2xl sm:text-3xl font-bold">${userData.cashBalance.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">Available to play</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        {isCreator && creatorStats ? (
          <ProfileStats 
            type="creator"
            stats={{
              marketsCreated: creatorStats.markets,
              totalVolume: creatorStats.volume,
              avgVolume: creatorStats.avgPot,
              biggestPot: creatorStats.biggestPot,
              successRate: creatorStats.successRate,
            }}
          />
        ) : (
          <ProfileStats 
            type="trader"
            stats={{
              totalProfit: userData.totalProfit,
              winRate: userData.winRate,
              totalTrades: userData.totalTrades,
              accuracy: userData.accuracy,
              biggestWin: userData.biggestWin,
            }}
          />
        )}

        {/* Content Tabs */}
        <Card className="border-border/40">
          <Tabs defaultValue={isCreator ? "markets" : "posts"} className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-2">
                {isCreator ? (
                  <>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="markets">
                      Markets
                      <span className="ml-1.5 bg-primary/10 text-primary text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                        {creatorStats?.markets || 0}
                      </span>
                    </TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="active">
                      Active
                      <span className="ml-1.5 bg-primary/10 text-primary text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                        {isOwnProfile ? 2 : 3}
                      </span>
                    </TabsTrigger>
                  </>
                )}
              </TabsList>
            </CardHeader>
            
            {/* Creator Markets Tab */}
            {isCreator && (
              <TabsContent value="markets" className="p-0">
                <div className="divide-y divide-border/40">
                  {mockCreatorMarkets.map((market) => (
                    <div
                      key={market.id}
                      onClick={() => {
                        if (isMobile) navigate(`/market/${market.id}`);
                        else setSelectedMarket(market);
                      }}
                      className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-snug line-clamp-1">{market.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                          <span className="font-semibold text-primary">{market.pot}</span>
                          <span className="text-muted-foreground/30">·</span>
                          <span>{market.players.toLocaleString()} players</span>
                          <span className="text-muted-foreground/30">·</span>
                          <span>{market.endsIn}</span>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5">
                        <div className="text-right">
                          <span className="text-xs font-semibold text-success">{market.yesPercent}%</span>
                          <div className="w-12 h-1.5 rounded-full bg-muted mt-0.5 overflow-hidden">
                            <div className="h-full rounded-full bg-success" style={{ width: `${market.yesPercent}%` }} />
                          </div>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
            
            {/* Posts Tab - X-style feed */}
            <TabsContent value="posts" className="p-0">
              <div className="divide-y divide-border/40">
                {mockUserActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="p-4 hover:bg-muted/30 transition-colors"
                  >
                    {/* Repost indicator */}
                    {activity.type === "repost" && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 ml-12">
                        <Repeat2 className="h-3 w-3" />
                        <span>{displayName} reposted</span>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={userData.avatar} alt={displayName} />
                        <AvatarFallback>{displayName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{displayName}</span>
                          <span className="text-muted-foreground text-sm">{userData.username}</span>
                          <span className="text-muted-foreground text-sm">·</span>
                          <span className="text-muted-foreground text-sm">{activity.timestamp}</span>
                        </div>
                        
                        <p className="text-sm leading-relaxed">{activity.content}</p>
                        
                        {activity.market && (
                          <div 
                            className="border border-border/50 rounded-xl overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors"
                            onClick={() => navigate(`/market/${activity.market!.id}`)}
                          >
                            <div className="flex gap-3 p-3">
                              <img 
                                src={activity.market.image} 
                                alt={activity.market.title}
                                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium line-clamp-2">{activity.market.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">View market →</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-6 pt-2">
                          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
                            <MessageCircle className="h-4 w-4" />
                            <span>{activity.comments}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-success transition-colors text-sm">
                            <Repeat2 className="h-4 w-4" />
                            <span>{activity.reposts}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors text-sm">
                            <Heart className="h-4 w-4" />
                            <span>{activity.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Active Tickets Tab - Players */}
            {!isCreator && (
              <TabsContent value="active" className="p-0">
                <div className="divide-y divide-border/40">
                  {isOwnProfile ? (
                    <>
                      <TicketEntry
                        title="Bitcoin reaches $100K by 2025?"
                        outcome="YES"
                        tickets={25}
                        timeLeft="3mo left"
                        potential="$312"
                        onClick={() => navigate('/market/1')}
                      />
                      <TicketEntry
                        title="Lakers make NBA playoffs?"
                        outcome="NO"
                        tickets={10}
                        timeLeft="2w left"
                        potential="$185"
                        onClick={() => navigate('/market/2')}
                      />
                    </>
                  ) : (
                    <>
                      <TicketEntry
                        title="Will AI replace 50% of jobs by 2030?"
                        outcome="YES"
                        tickets={40}
                        timeLeft="5y left"
                        potential="$520"
                        onClick={() => navigate('/market/3')}
                      />
                      <TicketEntry
                        title="Tesla stock above $300 by Q2 2025?"
                        outcome="NO"
                        tickets={15}
                        timeLeft="6mo left"
                        potential="$245"
                        onClick={() => navigate('/market/4')}
                      />
                      <TicketEntry
                        title="Fed cuts rates before March 2025?"
                        outcome="YES"
                        tickets={30}
                        timeLeft="3mo left"
                        potential="$410"
                        onClick={() => navigate('/market/5')}
                      />
                    </>
                  )}
                </div>
              </TabsContent>
            )}
            


          </Tabs>
        </Card>
      </div>

      {/* Market Dialog for creator markets on desktop */}
      {selectedMarket && (
        <MarketDialog
          open={!!selectedMarket}
          onOpenChange={(open) => { if (!open) setSelectedMarket(null); }}
          market={{
            id: selectedMarket.id,
            title: selectedMarket.title,
            image: selectedMarket.image,
            creator: {
              name: displayName,
              avatar: userData.avatar,
              isCreator: true,
            },
            outcomes: [
              { label: "Yes", price: selectedMarket.yesPercent },
              { label: "No", price: 100 - selectedMarket.yesPercent },
            ],
            volume: selectedMarket.pot,
            players: selectedMarket.players,
            endsIn: selectedMarket.endsIn,
          }}
        />
      )}
    </div>
  );
}

function TicketEntry({ title, outcome, tickets, timeLeft, potential, onClick }: {
  title: string;
  outcome: "YES" | "NO";
  tickets: number;
  timeLeft: string;
  potential: string;
  onClick: () => void;
}) {
  return (
    <div
      className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="font-medium text-sm leading-snug">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          <Badge variant={outcome === "YES" ? "success" : "destructive"} className="text-[10px] px-1.5 py-0 mr-1.5">{outcome}</Badge>
          {tickets} tickets · {timeLeft}
        </p>
      </div>
      <div className="text-right shrink-0">
        <div className="text-sm font-semibold text-success">Potential winning: {potential}</div>
      </div>
    </div>
  );
}
