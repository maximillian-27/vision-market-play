import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserPlus, UserCheck, BadgeCheck, MapPin, Calendar, Link as LinkIcon, Share2 } from "lucide-react";
import { MarketCard } from "@/components/MarketCard";
import { SocialStats } from "@/components/SocialStats";
import { ProfileStats } from "@/components/ProfileStats";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const creator = userId ? creatorData[userId as keyof typeof creatorData] : null;
  
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

        {/* Markets Tabs */}
        <Card className="border-border/40">
          <Tabs defaultValue="active" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Active ({mockCreatorMarkets.length})</TabsTrigger>
                <TabsTrigger value="resolved">Resolved ({creator.totalResolved})</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <TabsContent value="active" className="p-4 space-y-4">
              {mockCreatorMarkets.map((market) => (
                <MarketCard key={market.id} {...market} />
              ))}
            </TabsContent>
            
            <TabsContent value="resolved" className="p-4">
              <div className="text-center py-12 text-muted-foreground">
                <p>No resolved markets to display</p>
                <p className="text-sm mt-1">Resolved markets will appear here</p>
              </div>
            </TabsContent>
            
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
