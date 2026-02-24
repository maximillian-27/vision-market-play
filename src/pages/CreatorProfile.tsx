import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserPlus, UserCheck, BadgeCheck, MapPin, Calendar, Link as LinkIcon, Share2, MessageCircle, Heart, Repeat2, Trophy } from "lucide-react";
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
  biggestPot: string;
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
    biggestPot: '$184K',
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
    biggestPot: '$184K',
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
    biggestPot: '$152K',
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

// Mock activity data - now styled like posts/comments (X-style)
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

const getCreatorActivity = (creatorName: string): ActivityItem[] => [
  {
    id: "a1",
    type: "post",
    timestamp: "2h",
    content: "Strong institutional adoption signals make Bitcoin hitting $100K very likely. MicroStrategy and other corporations continue to accumulate BTC. The ETF momentum is real.",
    market: { id: "1", title: "Will Bitcoin reach $100K by end of 2025?", image: bitcoinImage },
    likes: 142,
    comments: 24,
    reposts: 12,
  },
  {
    id: "a2",
    type: "post",
    timestamp: "1d",
    content: "Just created a new market on the Fed's next rate decision. With inflation cooling but still above target, this will be interesting to watch. What's your take?",
    market: { id: "3", title: "Federal Reserve cuts rates by 0.5% in next meeting?", image: fedImage },
    likes: 89,
    comments: 31,
    reposts: 8,
  },
  {
    id: "a3",
    type: "comment",
    timestamp: "2d",
    content: "Apple's supply chain partners have been rumored to be working on folding display tech. Keep an eye on this one - could be a game changer for the mobile industry.",
    market: { id: "2", title: "Will Apple release a foldable iPhone in 2025?", image: iphoneImage },
    likes: 67,
    comments: 15,
    reposts: 3,
  },
  {
    id: "a4",
    type: "post",
    timestamp: "3d",
    content: "The halving cycle historically leads to significant price appreciation. 2025 could be the year Bitcoin finally breaks six figures. Accumulating on any dips.",
    likes: 234,
    comments: 56,
    reposts: 28,
  },
  {
    id: "a5",
    type: "repost",
    timestamp: "4d",
    content: "Great analysis on the current market conditions. Agree with the thesis here.",
    market: { id: "1", title: "Will Bitcoin reach $100K by end of 2025?", image: bitcoinImage },
    likes: 45,
    comments: 8,
    reposts: 2,
  },
];

// Mock achievements data
const getCreatorAchievements = () => [
  {
    id: "1",
    icon: "🏆",
    title: "Top Creator",
    description: "Ranked in top 10 creators by pot generated",
    date: "Dec 2024",
  },
  {
    id: "2",
    icon: "🎯",
    title: "Prediction Master",
    description: "85%+ resolution accuracy on markets",
    date: "Nov 2024",
  },
  {
    id: "3",
    icon: "🔥",
    title: "Trending Creator",
    description: "3 markets trending in one week",
    date: "Oct 2024",
  },
  {
    id: "4",
    icon: "🕰️",
    title: "Loyal Creator",
    description: "Markets active for 6+ months",
    date: "Sep 2024",
  },
  {
    id: "5",
    icon: "🚀",
    title: "Market Maker",
    description: "Created 25+ successful markets",
    date: "Aug 2024",
  },
  {
    id: "6",
    icon: "👥",
    title: "Community Leader",
    description: "10,000+ followers milestone",
    date: "Jul 2024",
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

  const achievements = getCreatorAchievements();

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
            totalVolume: creator.volume,
            marketsCreated: creator.markets,
            rank: 12,
            avgVolume: creator.avgVolume,
            biggestPot: creator.biggestPot,
          }}
        />

        {/* Content Tabs */}
        <Card className="border-border/40">
          <Tabs defaultValue="markets" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="markets">Markets ({creatorMarkets.length})</TabsTrigger>
                <TabsTrigger value="activity">Posts</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
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
            
            {/* Activity Tab - X-style posts feed */}
            <TabsContent value="activity" className="p-0">
              <div className="divide-y divide-border/40">
                {creatorActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="p-4 hover:bg-muted/30 transition-colors"
                  >
                    {/* Repost indicator */}
                    {activity.type === "repost" && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 ml-12">
                        <Repeat2 className="h-3 w-3" />
                        <span>{creator.name} reposted</span>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={creator.avatar} alt={creator.name} />
                        <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      {/* Post Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Header */}
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{creator.name}</span>
                          {creator.verified && (
                            <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
                          )}
                          <span className="text-muted-foreground text-sm">{creator.username}</span>
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
                          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm ml-auto">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements" className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/40 hover:border-primary/30 transition-colors"
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        <Trophy className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
