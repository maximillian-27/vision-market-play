import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserPlus, UserCheck, BadgeCheck, TrendingUp, Target, Award, LineChart, Users, DollarSign } from "lucide-react";
import { MarketCard } from "@/components/MarketCard";

// Mock creator data
const creatorData = {
  'sarah-chen': { 
    name: 'Sarah Chen',
    markets: 47, 
    volume: '$2.8M', 
    followers: '12.3K',
    successRate: 89,
    avgVolume: '$59.6K',
    categories: ['Crypto', 'Tech', 'Finance'],
    description: 'Professional market analyst specializing in crypto and tech predictions. Creating high-quality markets since 2023.',
    joinedDate: 'Jan 2023',
    totalResolved: 35,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  'marketmaven': { 
    name: 'MarketMaven',
    markets: 47, 
    volume: '$2.8M', 
    followers: '12.3K',
    successRate: 89,
    avgVolume: '$59.6K',
    categories: ['Crypto', 'Tech', 'Finance'],
    description: 'Professional market analyst specializing in crypto and tech predictions. Creating high-quality markets since 2023.',
    joinedDate: 'Jan 2023',
    totalResolved: 35,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maven'
  },
  'predictpro': { 
    name: 'PredictPro',
    markets: 38, 
    volume: '$2.1M', 
    followers: '9.8K',
    successRate: 85,
    avgVolume: '$55.3K',
    categories: ['Sports', 'Politics', 'Finance'],
    description: 'Data-driven predictions across finance, sports, and politics. Building the future of forecasting.',
    joinedDate: 'Mar 2023',
    totalResolved: 28,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Predict'
  },
};

const mockCreatorMarkets = [
  {
    id: "1",
    creator: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isCreator: true
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
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isCreator: true
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
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isCreator: true
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

export default function CreatorProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const creator = userId ? creatorData[userId as keyof typeof creatorData] : null;
  
  if (!creator) {
    return (
      <div className="w-full md:container md:max-w-2xl py-4 md:py-6 px-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Creator not found</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Back to Feed
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full md:container md:max-w-4xl py-4 md:py-6 space-y-4 md:space-y-6 px-4 md:px-4">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      {/* Creator Header - Enhanced */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-background" />
        <CardContent className="pt-0 -mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold">{creator.name}</h1>
                    <BadgeCheck className="h-7 w-7 text-primary fill-primary/20" />
                  </div>
                  <Badge variant="default" className="mb-2">Verified Creator</Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Joined {creator.joinedDate}</span>
                    <span>•</span>
                    <span>{creator.followers} followers</span>
                  </div>
                </div>
                
                <Button 
                  variant={isFollowing ? "outline" : "default"}
                  size="lg"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="w-full md:w-auto"
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
              </div>
              
              <p className="text-muted-foreground">{creator.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {creator.categories.map((category) => (
                  <Badge key={category} variant="outline">{category}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Creator Stats - Enhanced Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{creator.markets}</div>
                <p className="text-sm text-muted-foreground">Markets Created</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-success/10">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{creator.volume}</div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{creator.successRate}%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{creator.followers}</div>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Market Volume</p>
              <p className="text-2xl font-bold text-success">{creator.avgVolume}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Markets Resolved</p>
              <p className="text-2xl font-bold">{creator.totalResolved}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Markets</p>
              <p className="text-2xl font-bold">{creator.markets - creator.totalResolved}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Creator Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Creator Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="p-2 bg-primary/20 rounded-full">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Top Creator</div>
                <div className="text-xs text-muted-foreground">Elite Status</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
              <div className="p-2 bg-success/20 rounded-full">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="font-semibold text-sm">Million Dollar Markets</div>
                <div className="text-xs text-muted-foreground">$2.8M Total</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="p-2 bg-primary/20 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Community Leader</div>
                <div className="text-xs text-muted-foreground">10K+ Followers</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Created Markets */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Markets</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          {mockCreatorMarkets.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
        </TabsContent>
        
        <TabsContent value="resolved" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>No resolved markets to display</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="featured" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>No featured markets yet</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
