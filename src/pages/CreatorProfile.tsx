import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserPlus, UserCheck, BadgeCheck, MapPin, Calendar, Link as LinkIcon, Share2, MessageCircle, Heart, TrendingUp, BarChart3 } from "lucide-react";
import { MarketGridCard } from "@/components/MarketGridCard";
import { SocialStats } from "@/components/SocialStats";
import { ProfileStats } from "@/components/ProfileStats";
import { useToast } from "@/hooks/use-toast";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";

// Mock creator data
const creatorData: Record<string, {
  name: string;
  username: string;
  markets: number;
  volume: string;
  followers: number;
  following: number;
  successRate: number;
  avgVolume: string;
  categories: string[];
  description: string;
  joinedDate: string;
  totalResolved: number;
  avatar: string;
  location?: string;
  website?: string;
  verified: boolean;
}> = {
  'sarah-chen': { 
    name: 'Sarah Chen',
    username: '@sarahchen',
    markets: 47, 
    volume: '$2.8M', 
    followers: 12340,
    following: 234,
    successRate: 89,
    avgVolume: '$59.6K',
    categories: ['Crypto', 'Tech', 'Finance'],
    description: 'Professional market analyst specializing in crypto and tech predictions. Creating high-quality markets since 2023. Former analyst at Goldman Sachs.',
    joinedDate: 'Jan 2023',
    totalResolved: 35,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    location: 'San Francisco, CA',
    website: 'sarahchen.io',
    verified: true,
  },
  'marketmaven': { 
    name: 'MarketMaven',
    username: '@marketmaven',
    markets: 47, 
    volume: '$2.8M', 
    followers: 12340,
    following: 156,
    successRate: 89,
    avgVolume: '$59.6K',
    categories: ['Crypto', 'Tech', 'Finance'],
    description: 'Professional market analyst specializing in crypto and tech predictions. Creating high-quality markets since 2023.',
    joinedDate: 'Jan 2023',
    totalResolved: 35,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maven',
    verified: true,
  },
  'predictpro': { 
    name: 'PredictPro',
    username: '@predictpro',
    markets: 38, 
    volume: '$2.1M', 
    followers: 9800,
    following: 89,
    successRate: 85,
    avgVolume: '$55.3K',
    categories: ['Sports', 'Politics', 'Finance'],
    description: 'Data-driven predictions across finance, sports, and politics. Building the future of forecasting.',
    joinedDate: 'Mar 2023',
    totalResolved: 28,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Predict',
    verified: true,
  },
};

// Mock created markets (for Markets tab)
const getCreatorMarkets = (creatorName: string) => [
  {
    id: "1",
    creator: { name: creatorName, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${creatorName}`, isCreator: true },
    title: "Will Bitcoin reach $100K by end of 2025?",
    image: bitcoinImage,
    yesPrice: 68,
    noPrice: 32,
    volume: "$1.2M",
    endsIn: "3 months",
    status: "open" as const,
  },
  {
    id: "2",
    creator: { name: creatorName, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${creatorName}`, isCreator: true },
    title: "Will Apple release a foldable iPhone in 2025?",
    image: iphoneImage,
    yesPrice: 45,
    noPrice: 55,
    volume: "$890K",
    endsIn: "8 months",
    status: "open" as const,
  },
  {
    id: "3",
    creator: { name: creatorName, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${creatorName}`, isCreator: true },
    title: "Federal Reserve cuts rates by 0.5% in next meeting?",
    image: fedImage,
    yesPrice: 73,
    noPrice: 27,
    volume: "$2.1M",
    endsIn: "2 weeks",
    status: "open" as const,
  }
];

// Mock activity data
interface ActivityItem {
  id: string;
  type: "comment" | "like" | "trade" | "market_created" | "market_resolved";
  timestamp: string;
  market?: {
    id: string;
    title: string;
    image: string;
  };
  content?: string;
  metadata?: {
    position?: string;
    amount?: string;
    outcome?: string;
  };
}

const getCreatorActivity = (creatorName: string): ActivityItem[] => [
  {
    id: "a1",
    type: "comment",
    timestamp: "2 hours ago",
    market: { id: "1", title: "Will Bitcoin reach $100K by end of 2025?", image: bitcoinImage },
    content: "Strong institutional adoption signals make this very likely. MicroStrategy and other corporations continue to accumulate BTC.",
  },
  {
    id: "a2",
    type: "market_created",
    timestamp: "1 day ago",
    market: { id: "3", title: "Federal Reserve cuts rates by 0.5% in next meeting?", image: fedImage },
  },
  {
    id: "a3",
    type: "trade",
    timestamp: "2 days ago",
    market: { id: "1", title: "Will Bitcoin reach $100K by end of 2025?", image: bitcoinImage },
    metadata: { position: "Yes", amount: "$500" },
  },
  {
    id: "a4",
    type: "comment",
    timestamp: "3 days ago",
    market: { id: "2", title: "Will Apple release a foldable iPhone in 2025?", image: iphoneImage },
    content: "Apple's supply chain partners have been rumored to be working on folding display tech. Keep an eye on this one.",
  },
  {
    id: "a5",
    type: "like",
    timestamp: "4 days ago",
    market: { id: "1", title: "Will Bitcoin reach $100K by end of 2025?", image: bitcoinImage },
  },
  {
    id: "a6",
    type: "market_resolved",
    timestamp: "1 week ago",
    market: { id: "10", title: "Did Ethereum break $4,000 in Q4 2024?", image: bitcoinImage },
    metadata: { outcome: "Yes" },
  },
  {
    id: "a7",
    type: "comment",
    timestamp: "1 week ago",
    market: { id: "1", title: "Will Bitcoin reach $100K by end of 2025?", image: bitcoinImage },
    content: "The halving cycle historically leads to significant price appreciation. 2025 could be the year.",
  },
];

export default function CreatorProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const creator = userId ? creatorData[userId as keyof typeof creatorData] : null;
  const creatorMarkets = creator ? getCreatorMarkets(creator.name) : [];
  const creatorActivity = creator ? getCreatorActivity(creator.name) : [];
  
  if (!creator) {
    return (
      <div className="w-full md:container md:max-w-2xl py-4 md:py-6 px-4 text-center">
        <p className="text-muted-foreground mb-4">Creator not found</p>
        <Button onClick={() => navigate('/')}>
          Back to Feed
        </Button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Profile link has been copied to clipboard.",
    });
  };

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "comment": return <MessageCircle className="h-4 w-4" />;
      case "like": return <Heart className="h-4 w-4 text-destructive" />;
      case "trade": return <TrendingUp className="h-4 w-4 text-success" />;
      case "market_created": return <BarChart3 className="h-4 w-4 text-primary" />;
      case "market_resolved": return <Badge className="h-4 w-4 text-success" />;
    }
  };

  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case "comment": return "commented on";
      case "like": return "liked";
      case "trade": return `bought ${activity.metadata?.position} for ${activity.metadata?.amount} on`;
      case "market_created": return "created market";
      case "market_resolved": return `resolved market as ${activity.metadata?.outcome}:`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="-ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {/* Profile Header Card */}
        <Card className="border-border/40 overflow-hidden">
          {/* Cover gradient */}
          <div className="h-24 md:h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20" />
          
          <CardContent className="pt-0 pb-6">
            {/* Avatar overlapping cover */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background ring-2 ring-border/20">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="text-2xl">{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{creator.name}</h1>
                    {creator.verified && (
                      <BadgeCheck className="h-6 w-6 text-primary fill-primary/20" />
                    )}
                  </div>
                  <p className="text-muted-foreground">{creator.username}</p>
                </div>
                
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
              </div>
            </div>
            
            {/* Bio & Meta Info */}
            <div className="mt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed max-w-2xl">{creator.description}</p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {creator.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {creator.location}
                  </div>
                )}
                {creator.website && (
                  <a 
                    href={`https://${creator.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <LinkIcon className="h-4 w-4" />
                    {creator.website}
                  </a>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Joined {creator.joinedDate}
                </div>
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {creator.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="px-3 py-1">
                    {category}
                  </Badge>
                ))}
              </div>
              
              {/* Social Stats */}
              <SocialStats 
                followers={creator.followers} 
                following={creator.following}
                userId={userId}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <ProfileStats 
          type="creator"
          stats={{
            marketsCreated: creator.markets,
            totalVolume: creator.volume,
            followers: creator.followers,
            successRate: creator.successRate,
          }}
        />

        {/* Content Tabs */}
        <Card className="border-border/40">
          <Tabs defaultValue="markets" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="markets">Markets ({creatorMarkets.length})</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            {/* Markets Tab - Only shows created markets */}
            <TabsContent value="markets" className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {creatorMarkets.map((market) => (
                  <MarketGridCard key={market.id} {...market} />
                ))}
              </div>
            </TabsContent>
            
            {/* Activity Tab - Shows all activity as a feed */}
            <TabsContent value="activity" className="p-0">
              <div className="divide-y divide-border/40">
                {creatorActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => activity.market && navigate(`/market/${activity.market.id}`)}
                  >
                    <div className="flex gap-3">
                      {/* Activity Icon */}
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      
                      {/* Activity Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Activity Header */}
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm">
                            <span className="font-semibold">{creator.name}</span>
                            <span className="text-muted-foreground"> {getActivityText(activity)} </span>
                            {activity.market && (
                              <span className="font-medium text-foreground">{activity.market.title}</span>
                            )}
                          </p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {activity.timestamp}
                          </span>
                        </div>
                        
                        {/* Comment Content */}
                        {activity.type === "comment" && activity.content && (
                          <div className="pl-0">
                            <p className="text-sm text-foreground/80 bg-muted/30 rounded-lg p-3 border-l-2 border-primary/30">
                              "{activity.content}"
                            </p>
                          </div>
                        )}
                        
                        {/* Market Preview for non-comment activities */}
                        {activity.market && activity.type !== "comment" && (
                          <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg">
                            <img 
                              src={activity.market.image} 
                              alt={activity.market.title}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                            <p className="text-sm font-medium line-clamp-2">{activity.market.title}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* About Tab */}
            <TabsContent value="about" className="p-4 space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">About {creator.name}</h4>
                  <p className="text-muted-foreground leading-relaxed">{creator.description}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{creator.markets}</p>
                    <p className="text-sm text-muted-foreground">Markets Created</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{creator.volume}</p>
                    <p className="text-sm text-muted-foreground">Total Volume</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{creator.totalResolved}</p>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{creator.successRate}%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
