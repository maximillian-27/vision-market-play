import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserPlus, UserCheck, BadgeCheck, TrendingUp, Clock, Calendar, MapPin, Share2, ArrowUpRight, ArrowDownLeft, MessageCircle, Heart, Repeat2 } from "lucide-react";
import { MarketCard } from "@/components/MarketCard";
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
}> = {
  'marketmaven': { 
    markets: 47, 
    volume: '$2.8M', 
    followers: 12340,
    following: 234,
    successRate: 89,
    description: 'Professional market analyst specializing in crypto and tech predictions.'
  },
  'predictpro': { 
    markets: 38, 
    volume: '$2.1M', 
    followers: 9800,
    following: 156,
    successRate: 85,
    description: 'Data-driven predictions across finance, sports, and politics.'
  },
  'trendsetter': { 
    markets: 31, 
    volume: '$1.7M', 
    followers: 8200,
    following: 89,
    successRate: 82,
    description: 'Identifying emerging trends before they go mainstream.'
  },
  'insighthub': { 
    markets: 29, 
    volume: '$1.5M', 
    followers: 7100,
    following: 67,
    successRate: 79,
    description: 'Providing actionable insights through well-researched prediction markets.'
  },
  'datadriven': { 
    markets: 24, 
    volume: '$1.2M', 
    followers: 6400,
    following: 45,
    successRate: 76,
    description: 'Quantitative analyst creating markets based on statistical analysis.'
  },
};

const mockCreatorMarkets = [
  {
    id: "1",
    creator: { name: "MarketMaven", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven" },
    title: "Will Bitcoin reach $100K by end of 2025?",
    subtitle: "Major crypto milestone approaching",
    yesPrice: 68,
    noPrice: 32,
    volume: "$1.2M",
    endsIn: "3 months",
    image: "/src/assets/bitcoin-market.jpg",
    likes: 142,
    comments: 38,
  },
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
    content: "Just got into prediction markets last month and already seeing great returns. The key is doing your research!",
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
    totalTickets: 142,
    accuracy: 72,
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
          <div className="h-24 md:h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20" />
          
          <CardContent className="pt-0 pb-6">
            {/* Avatar overlapping cover */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background ring-2 ring-border/20">
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
                  <p className="text-sm text-muted-foreground mb-1">Portfolio Value</p>
                  <p className="text-3xl font-bold">${userData.portfolioValue.toLocaleString()}</p>
                  <p className="text-sm text-success mt-1">{userData.totalProfit} profit</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cash Balance</p>
                  <p className="text-3xl font-bold">${userData.cashBalance.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">Available to trade</p>
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
              followers: creatorStats.followers,
              successRate: creatorStats.successRate,
            }}
          />
        ) : (
          <ProfileStats 
            type="trader"
            stats={{
            totalProfit: userData.totalProfit,
              winRate: userData.winRate,
              totalTrades: userData.totalTickets,
              accuracy: userData.accuracy,
            }}
          />
        )}

        {/* Content Tabs */}
        <Card className="border-border/40">
          <Tabs defaultValue={isCreator ? "markets" : "positions"} className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-3">
                {isCreator ? (
                  <>
                    <TabsTrigger value="markets">Markets</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger value="positions">My Tickets</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </>
                )}
              </TabsList>
            </CardHeader>
            
            {/* Creator Markets Tab */}
            {isCreator && (
              <TabsContent value="markets" className="p-4 space-y-4">
                {mockCreatorMarkets.map((market, index) => (
                  <MarketCard key={index} {...market} />
                ))}
              </TabsContent>
            )}
            
            {/* Positions Tab - Traders */}
            {!isCreator && (
              <TabsContent value="positions" className="p-0">
                <div className="divide-y divide-border/40">
                  {isOwnProfile ? (
                    <>
                      <div 
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-colors"
                        onClick={() => navigate('/market/1')}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="font-medium text-sm leading-snug">Bitcoin reaches $100K by 2025?</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">Yes at 68¢ · 3mo left</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-semibold text-success">+$124</div>
                          <div className="text-[11px] text-muted-foreground">+15.2%</div>
                        </div>
                      </div>
                      <div 
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-colors"
                        onClick={() => navigate('/market/2')}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="font-medium text-sm leading-snug">Lakers make NBA playoffs?</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">No at 55¢ · 2w left</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-semibold text-destructive">-$45</div>
                          <div className="text-[11px] text-muted-foreground">-8.1%</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div 
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-colors"
                        onClick={() => navigate('/market/3')}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="font-medium text-sm leading-snug">Will AI replace 50% of jobs by 2030?</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">Yes at 42¢ · 5y left</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-semibold text-success">+$89</div>
                          <div className="text-[11px] text-muted-foreground">+21.2%</div>
                        </div>
                      </div>
                      <div 
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-colors"
                        onClick={() => navigate('/market/4')}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="font-medium text-sm leading-snug">Tesla stock above $300 by Q2 2025?</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">No at 61¢ · 6mo left</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-semibold text-success">+$156</div>
                          <div className="text-[11px] text-muted-foreground">+25.6%</div>
                        </div>
                      </div>
                      <div 
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 active:bg-muted/50 transition-colors"
                        onClick={() => navigate('/market/5')}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="font-medium text-sm leading-snug">Fed cuts rates before March 2025?</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">Yes at 73¢ · 3mo left</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-semibold text-destructive">-$32</div>
                          <div className="text-[11px] text-muted-foreground">-4.4%</div>
                        </div>
                      </div>
                    </>
                  )}
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
                      {/* Avatar */}
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={userData.avatar} alt={displayName} />
                        <AvatarFallback>{displayName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      {/* Post Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Header */}
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{displayName}</span>
                          <span className="text-muted-foreground text-sm">{userData.username}</span>
                          <span className="text-muted-foreground text-sm">·</span>
                          <span className="text-muted-foreground text-sm">{activity.timestamp}</span>
                        </div>
                        
                        {/* Post text */}
                        <p className="text-sm leading-relaxed">{activity.content}</p>
                        
                        {/* Attached Market */}
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
                        
                        {/* Engagement actions */}
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
            
            {/* About Tab - Creators */}
            {isCreator && creatorStats && (
              <TabsContent value="about" className="p-4 space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-muted-foreground leading-relaxed">{creatorStats.description}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{creatorStats.markets}</p>
                    <p className="text-sm text-muted-foreground">Markets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{creatorStats.volume}</p>
                    <p className="text-sm text-muted-foreground">Volume</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{creatorStats.followers.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{creatorStats.successRate}%</p>
                    <p className="text-sm text-muted-foreground">Success</p>
                  </div>
                </div>
              </TabsContent>
            )}
            
            {/* Achievements Tab - Traders */}
            {!isCreator && (
              <TabsContent value="achievements" className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Card className="border-border/40 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">🏆</div>
                      <p className="font-semibold text-sm">First Trade</p>
                      <p className="text-xs text-muted-foreground">Completed your first trade</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/40 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <p className="font-semibold text-sm">Sharp Shooter</p>
                      <p className="text-xs text-muted-foreground">70%+ accuracy</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/40 bg-gradient-to-br from-green-500/10 to-green-500/5">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">💰</div>
                      <p className="font-semibold text-sm">Big Winner</p>
                      <p className="text-xs text-muted-foreground">$1000+ profit</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
