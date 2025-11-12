import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Wallet, Activity, ArrowLeft, UserPlus, UserCheck, BadgeCheck, TrendingUp, Target, Award, Clock, Repeat2, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { MarketCard } from "@/components/MarketCard";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import nbaImage from "@/assets/nba-championship.jpg";

// Mock data to determine if user is a creator
const creatorNames = ['marketmaven', 'predictpro', 'trendsetter', 'insighthub', 'datadriven'];
const creatorData = {
  'marketmaven': { 
    markets: 47, 
    volume: '$2.8M', 
    followers: '12.3K',
    description: 'Professional market analyst specializing in crypto and tech predictions. Creating high-quality markets since 2023.'
  },
  'predictpro': { 
    markets: 38, 
    volume: '$2.1M', 
    followers: '9.8K',
    description: 'Data-driven predictions across finance, sports, and politics. Building the future of forecasting.'
  },
  'trendsetter': { 
    markets: 31, 
    volume: '$1.7M', 
    followers: '8.2K',
    description: 'Identifying emerging trends before they go mainstream. Tech enthusiast and market creator.'
  },
  'insighthub': { 
    markets: 29, 
    volume: '$1.5M', 
    followers: '7.1K',
    description: 'Providing actionable insights through well-researched prediction markets. Focus on business and economics.'
  },
  'datadriven': { 
    markets: 24, 
    volume: '$1.2M', 
    followers: '6.4K',
    description: 'Quantitative analyst creating markets based on statistical analysis and data science.'
  },
};

const mockCreatorMarkets = [
  {
    id: "1",
    creator: {
      name: "MarketMaven",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven"
    },
    title: "Will Bitcoin reach $100K by end of 2025?",
    subtitle: "Major crypto milestone approaching as institutional adoption accelerates",
    yesPrice: 68,
    noPrice: 32,
    volume: "$1.2M",
    endsIn: "3 months",
    image: "/src/assets/bitcoin-market.jpg",
    likes: 142,
    comments: 38,
  },
  {
    id: "2",
    creator: {
      name: "MarketMaven",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven"
    },
    title: "Will Apple release a foldable iPhone in 2025?",
    subtitle: "Apple's next innovation could reshape the smartphone market",
    yesPrice: 45,
    noPrice: 55,
    volume: "$890K",
    endsIn: "8 months",
    image: "/src/assets/foldable-iphone.jpg",
    likes: 98,
    comments: 29,
  },
  {
    id: "3",
    creator: {
      name: "MarketMaven",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven"
    },
    title: "Federal Reserve cuts rates by 0.5% in next meeting?",
    subtitle: "Economic indicators suggest potential policy shift ahead",
    yesPrice: 73,
    noPrice: 27,
    volume: "$2.1M",
    endsIn: "2 weeks",
    image: "/src/assets/federal-reserve.jpg",
    likes: 215,
    comments: 64,
  }
];

// Mock user reposts
const mockUserReposts = [
  {
    id: "r1",
    timestamp: "2 days ago",
    thoughts: "This is actually more likely than people think. Institutional adoption is accelerating and the ETF approvals have brought in serious capital.",
    market: {
      id: "1",
      creator: {
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        isCreator: true
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
    }
  },
  {
    id: "r2",
    timestamp: "5 days ago",
    thoughts: "The Lakers have the star power but their depth is questionable. I'm not convinced they can make a deep playoff run this year.",
    market: {
      id: "2",
      creator: {
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        isCreator: true
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
    }
  }
];

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const isOwnProfile = !userId;
  const displayName = userId 
    ? userId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Your Name";
  
  const isCreator = userId && creatorNames.includes(userId.toLowerCase());
  const creatorStats = isCreator && userId ? creatorData[userId.toLowerCase() as keyof typeof creatorData] : null;
  
  // Mock data for community members
  const joinDate = isOwnProfile ? "Mar 2024" : "Feb 2024";
  const followerCount = isOwnProfile ? "247" : "189";
  
  return (
    <div className="w-full md:container md:max-w-2xl py-4 md:py-6 space-y-4 md:space-y-6 px-4 md:px-4">
      {!isOwnProfile && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )}
      
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`} alt={displayName} />
              <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{displayName}</h2>
                {isCreator && <BadgeCheck className="h-5 w-5 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground">Joined {joinDate}</p>
            </div>
            {isOwnProfile && (
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Wallet className="h-4 w-4" />
                </Button>
              </div>
            )}
            {!isOwnProfile && (
              <Button 
                variant={isFollowing ? "outline" : "default"}
                size="sm" 
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview & Key Stats - Only for own profile */}
      {isOwnProfile && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Portfolio Balance</p>
                <p className="text-3xl font-bold">$18,450</p>
                <p className="text-xs text-success mt-1">+$12,450 profit</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Cash Balance</p>
                <p className="text-3xl font-bold">$5,230</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 pb-4 mb-4 border-b">
              <div className="text-center">
                <div className="text-lg font-bold">78%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">142</div>
                <div className="text-xs text-muted-foreground">Markets</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">47/60</div>
                <div className="text-xs text-muted-foreground">Win/Total</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" variant="outline" size="sm">
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
              <Button className="flex-1" size="sm">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Deposit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Creator Stats */}
      {isCreator && creatorStats && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary">{creatorStats.markets}</div>
              <p className="text-sm text-muted-foreground mt-1">Markets Created</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-success">{creatorStats.volume}</div>
              <p className="text-sm text-muted-foreground mt-1">Volume Generated</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold">{creatorStats.followers}</div>
              <p className="text-sm text-muted-foreground mt-1">Followers</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Community member stats */}
      {!isOwnProfile && !isCreator && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-success">+$8,320</div>
              <p className="text-sm text-muted-foreground mt-1">Total Profit</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold">72%</div>
              <p className="text-sm text-muted-foreground mt-1">Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold">89</div>
              <p className="text-sm text-muted-foreground mt-1">Markets</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Positions or Created Markets */}
      {isCreator ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Created Markets</h2>
          {mockCreatorMarkets.map((market, index) => (
            <MarketCard key={index} {...market} />
          ))}
        </div>
      ) : isOwnProfile ? (
        <>
          {/* Active Positions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-3 mt-0">
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">Bitcoin reaches $100K by 2025?</h3>
                          <p className="text-xs text-muted-foreground mt-1">Your position: Yes at 68¢</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">3 months left</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-success">+$124</div>
                          <div className="text-xs text-muted-foreground">+15.2%</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">Lakers make NBA playoffs?</h3>
                          <p className="text-xs text-muted-foreground mt-1">Your position: No at 55¢</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">2 weeks left</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-destructive">-$45</div>
                          <div className="text-xs text-muted-foreground">-8.1%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-3 mt-0">
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">Apple releases new iPhone in Sept?</h3>
                          <p className="text-xs text-muted-foreground mt-1">Position: Yes at 89¢</p>
                          <Badge variant="outline" className="mt-2 text-xs">Resolved: Yes</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-success">+$89</div>
                          <div className="text-xs text-muted-foreground">Won</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">Tesla stock hits $300?</h3>
                          <p className="text-xs text-muted-foreground mt-1">Position: Yes at 72¢</p>
                          <Badge variant="outline" className="mt-2 text-xs">Resolved: No</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-destructive">-$72</div>
                          <div className="text-xs text-muted-foreground">Lost</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Performance Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trading Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Avg Return/Trade</p>
                  <p className="text-lg font-bold text-success">+$208</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Best Single Trade</p>
                  <p className="text-lg font-bold text-success">+$1,240</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Active Position Value</p>
                  <p className="text-lg font-bold">$3,280</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Profit Factor</p>
                  <p className="text-lg font-bold">2.8x</p>
                </div>
              </div>

              {/* Performance Breakdown */}
              <div className="space-y-3 pt-2 border-t">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last 7 Days</span>
                    <span className="font-semibold text-success">+$842 (+4.8%)</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last 30 Days</span>
                    <span className="font-semibold text-success">+$2,450 (+15.3%)</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </div>

              {/* Category Performance */}
              <div className="space-y-3 pt-2 border-t">
                <p className="text-sm font-medium">Performance by Category</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Crypto</span>
                      <span className="font-semibold text-success">+$4,820 (82% win)</span>
                    </div>
                    <Progress value={82} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Sports</span>
                      <span className="font-semibold text-success">+$3,240 (76% win)</span>
                    </div>
                    <Progress value={76} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Finance</span>
                      <span className="font-semibold text-success">+$2,890 (71% win)</span>
                    </div>
                    <Progress value={71} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Politics</span>
                      <span className="font-semibold text-destructive">-$520 (58% win)</span>
                    </div>
                    <Progress value={58} className="h-1.5" />
                  </div>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Avg Hold Time</p>
                  <p className="text-sm font-semibold">12 days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current Streak</p>
                  <p className="text-sm font-semibold text-success">5 wins</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Best Streak</p>
                  <p className="text-sm font-semibold">8 wins</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-sm font-semibold">1.82</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">First Win</div>
                    <div className="text-xs text-muted-foreground">Unlocked</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                  <div className="p-2 bg-success/20 rounded-full">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Hot Streak</div>
                    <div className="text-xs text-muted-foreground">5 wins</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Achievements for other community members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">First Win</div>
                    <div className="text-xs text-muted-foreground">Unlocked</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                  <div className="p-2 bg-success/20 rounded-full">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Hot Streak</div>
                    <div className="text-xs text-muted-foreground">5 wins</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Positions for other users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Active Positions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">Bitcoin reaches $100K by 2025?</h3>
                    <p className="text-xs text-muted-foreground mt-1">Your position: Yes at 68¢</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-success">+$124</div>
                    <div className="text-xs text-muted-foreground">+15.2%</div>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">Lakers make NBA playoffs?</h3>
                    <p className="text-xs text-muted-foreground mt-1">Your position: No at 55¢</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-destructive">-$45</div>
                    <div className="text-xs text-muted-foreground">-8.1%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Activity - Reposts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Repeat2 className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockUserReposts.map((repost) => (
                <div key={repost.id} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Repeat2 className="h-4 w-4" />
                    <span>Reposted {repost.timestamp}</span>
                  </div>
                  {repost.thoughts && (
                    <p className="text-sm leading-relaxed pl-6">{repost.thoughts}</p>
                  )}
                  <div className="pl-6 border-l-2 border-border">
                    <MarketCard {...repost.market} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
