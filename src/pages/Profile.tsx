import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Wallet, Activity, ArrowLeft, UserPlus, UserCheck, BadgeCheck } from "lucide-react";
import { MarketCard } from "@/components/MarketCard";

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
    image: "/src/assets/bitcoin-market.jpg"
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
    image: "/src/assets/foldable-iphone.jpg"
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
    image: "/src/assets/federal-reserve.jpg"
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
        <CardContent className="pt-4 md:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`} alt={displayName} />
                <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{displayName}</h2>
                  {isCreator && <BadgeCheck className="h-6 w-6 text-primary" />}
                </div>
                <Badge variant="outline">
                  {isOwnProfile ? "Basic User" : isCreator ? "Creator" : "Community Member"}
                </Badge>
                {isCreator && creatorStats && creatorStats.description && (
                  <p className="text-sm text-muted-foreground pt-1">{creatorStats.description}</p>
                )}
                {isOwnProfile && (
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button size="sm" variant="outline">
                      <Wallet className="h-4 w-4 mr-2" />
                      Wallet
                    </Button>
                  </div>
                )}
              </div>
            </div>
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {isCreator && creatorStats ? (
          <>
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
          </>
        ) : (
          <>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-success">+$12,450</div>
                <p className="text-sm text-muted-foreground mt-1">Total Profit</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold">78%</div>
                <p className="text-sm text-muted-foreground mt-1">Accuracy</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold">142</div>
                <p className="text-sm text-muted-foreground mt-1">Markets</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Active Positions or Created Markets */}
      {isCreator ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Created Markets</h2>
          {mockCreatorMarkets.map((market, index) => (
            <MarketCard key={index} {...market} />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
