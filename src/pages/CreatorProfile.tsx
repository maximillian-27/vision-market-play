import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserPlus, UserCheck, BadgeCheck } from "lucide-react";
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
      <div className="w-full md:container md:max-w-2xl py-4 md:py-6 px-4 text-center">
        <p className="text-muted-foreground mb-4">Creator not found</p>
        <Button onClick={() => navigate('/')}>
          Back to Feed
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full md:container md:max-w-3xl py-4 md:py-6 space-y-6 px-4 md:px-4">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(-1)}
        className="mb-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      {/* Creator Header - Simplified */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-24 w-24 border-2 border-border">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{creator.name}</h1>
                <BadgeCheck className="h-5 w-5 text-primary fill-primary/20" />
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{creator.followers} followers</span>
                <span>•</span>
                <span>Joined {creator.joinedDate}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">{creator.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {creator.categories.map((category) => (
                <Badge key={category} variant="secondary">{category}</Badge>
              ))}
            </div>
            
            <Button 
              variant={isFollowing ? "outline" : "default"}
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
        </div>

        {/* Creator Stats - Simplified */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold">{creator.markets}</div>
            <p className="text-xs text-muted-foreground">Markets</p>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-success">{creator.volume}</div>
            <p className="text-xs text-muted-foreground">Volume</p>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold">{creator.totalResolved}</div>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold">{creator.avgVolume}</div>
            <p className="text-xs text-muted-foreground">Avg Volume</p>
          </div>
        </div>
      </div>

      {/* Created Markets */}
      <div className="space-y-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4 mt-4">
            {mockCreatorMarkets.map((market) => (
              <MarketCard key={market.id} {...market} />
            ))}
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              <p>No resolved markets yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
