import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  UserPlus,
  UserCheck,
  BadgeCheck,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Share2,
  MessageCircle,
  Heart,
  Repeat2,
  Trophy,
  Clock,
} from "lucide-react";
import { MarketGridCard } from "@/components/MarketGridCard";
import { SocialStats } from "@/components/SocialStats";
import { ProfileStats } from "@/components/ProfileStats";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import bitcoinImage from "@/assets/bitcoin-market.jpg";
import iphoneImage from "@/assets/foldable-iphone.jpg";
import fedImage from "@/assets/federal-reserve.jpg";
import nbaImage from "@/assets/nba-championship.jpg";

// Mock creator data
const creatorData: Record<
  string,
  {
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
    isCreator: true;
  }
> = {
  "sarah-chen": {
    name: "Sarah Chen",
    username: "@sarahchen",
    markets: 47,
    volume: "$2.8M",
    followers: 12340,
    following: 234,
    successRate: 89,
    avgVolume: "$59.6K",
    categories: ["Crypto", "Tech", "Finance"],
    description:
      "Professional market analyst specializing in crypto and tech predictions. Creating high-quality markets since 2023. Former analyst at Goldman Sachs.",
    joinedDate: "Jan 2023",
    totalResolved: 35,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    location: "San Francisco, CA",
    website: "sarahchen.io",
    verified: true,
    isCreator: true,
  },
  marketmaven: {
    name: "MarketMaven",
    username: "@marketmaven",
    markets: 47,
    volume: "$2.8M",
    followers: 12340,
    following: 156,
    successRate: 89,
    avgVolume: "$59.6K",
    categories: ["Crypto", "Tech", "Finance"],
    description:
      "Professional market analyst specializing in crypto and tech predictions. Creating high-quality markets since 2023.",
    joinedDate: "Jan 2023",
    totalResolved: 35,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maven",
    verified: true,
    isCreator: true,
  },
  predictpro: {
    name: "PredictPro",
    username: "@predictpro",
    markets: 38,
    volume: "$2.1M",
    followers: 9800,
    following: 89,
    successRate: 85,
    avgVolume: "$55.3K",
    categories: ["Sports", "Politics", "Finance"],
    description:
      "Data-driven predictions across finance, sports, and politics. Building the future of forecasting.",
    joinedDate: "Mar 2023",
    totalResolved: 28,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Predict",
    verified: true,
    isCreator: true,
  },
};

// Mock player data
const playerData: Record<
  string,
  {
    name: string;
    username: string;
    avatar: string;
    joinDate: string;
    followers: number;
    following: number;
    location?: string;
    bio: string;
    totalProfit: string;
    winRate: number;
    totalTrades: number;
    accuracy: number;
    verified: boolean;
    isCreator: false;
  }
> = {
  alexthompson: {
    name: "Alex Thompson",
    username: "@alexthompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT",
    joinDate: "Feb 2024",
    followers: 189,
    following: 89,
    location: "New York, NY",
    bio: "Prediction market enthusiast. Making data-driven decisions since 2023.",
    totalProfit: "+$12,450",
    winRate: 78,
    totalTrades: 142,
    accuracy: 72,
    verified: false,
    isCreator: false,
  },
  mariagarcia: {
    name: "Maria Garcia",
    username: "@mariagarcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    joinDate: "Mar 2024",
    followers: 245,
    following: 112,
    location: "Los Angeles, CA",
    bio: "Tech analyst and crypto enthusiast. Always looking for the next big thing.",
    totalProfit: "+$8,920",
    winRate: 72,
    totalTrades: 98,
    accuracy: 68,
    verified: false,
    isCreator: false,
  },
  davidkim: {
    name: "David Kim",
    username: "@davidkim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    joinDate: "Jan 2024",
    followers: 312,
    following: 78,
    location: "Chicago, IL",
    bio: "Finance professional. Specializing in economic and political predictions.",
    totalProfit: "+$15,780",
    winRate: 81,
    totalTrades: 167,
    accuracy: 76,
    verified: false,
    isCreator: false,
  },
  sophiechen: {
    name: "Sophie Chen",
    username: "@sophiechen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    joinDate: "Dec 2023",
    followers: 421,
    following: 145,
    location: "Seattle, WA",
    bio: "AI researcher turned prediction market trader. Data is everything.",
    totalProfit: "+$22,340",
    winRate: 84,
    totalTrades: 203,
    accuracy: 79,
    verified: false,
    isCreator: false,
  },
  jameswilson: {
    name: "James Wilson",
    username: "@jameswilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    joinDate: "Apr 2024",
    followers: 156,
    following: 67,
    location: "Boston, MA",
    bio: "Sports analytics expert. NBA and NFL are my specialties.",
    totalProfit: "+$5,670",
    winRate: 69,
    totalTrades: 78,
    accuracy: 65,
    verified: false,
    isCreator: false,
  },
};

// Mock markets for creators
const getCreatorMarkets = (creatorName: string) => [
  {
    id: "1",
    creator: {
      name: creatorName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${creatorName}`,
      isCreator: true,
    },
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
    creator: {
      name: creatorName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${creatorName}`,
      isCreator: true,
    },
    title: "Will Apple release a foldable iPhone in 2025?",
    image: iphoneImage,
    yesPrice: 45,
    noPrice: 55,
    volume: "$890K",
    endsIn: "8 months",
    status: "open" as const,
  },
];

// Mock activity data
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

const getActivity = (name: string): ActivityItem[] => [
  {
    id: "a1",
    type: "post",
    timestamp: "2h",
    content:
      "Strong institutional adoption signals make Bitcoin hitting $100K very likely. The ETF momentum is real.",
    market: {
      id: "1",
      title: "Will Bitcoin reach $100K by end of 2025?",
      image: bitcoinImage,
    },
    likes: 142,
    comments: 24,
    reposts: 12,
  },
  {
    id: "a2",
    type: "post",
    timestamp: "1d",
    content:
      "Just created a new market on the Fed's next rate decision. What's your take?",
    market: {
      id: "3",
      title: "Federal Reserve cuts rates by 0.5% in next meeting?",
      image: fedImage,
    },
    likes: 89,
    comments: 31,
    reposts: 8,
  },
  {
    id: "a3",
    type: "repost",
    timestamp: "3d",
    content: "Great analysis on the current market conditions.",
    market: {
      id: "1",
      title: "Will Bitcoin reach $100K by end of 2025?",
      image: bitcoinImage,
    },
    likes: 45,
    comments: 8,
    reposts: 2,
  },
];

// Mock achievements
const getAchievements = () => [
  {
    id: "1",
    icon: "🏆",
    title: "Top Creator",
    description: "Ranked in top 10 creators by volume",
    date: "Dec 2024",
  },
  {
    id: "2",
    icon: "🎯",
    title: "Prediction Master",
    description: "85%+ accuracy on resolved markets",
    date: "Nov 2024",
  },
  {
    id: "3",
    icon: "🔥",
    title: "Trending Creator",
    description: "3 markets trending in one week",
    date: "Oct 2024",
  },
];

interface ProfileDialogProps {
  userId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({
  userId,
  open,
  onOpenChange,
}: ProfileDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  if (!userId) return null;

  // Check if creator or player
  const creator = creatorData[userId.toLowerCase()];
  const player = playerData[userId.toLowerCase()];
  const profile = creator || player;

  if (!profile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User not found</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            This user profile could not be found.
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  const isCreator = "isCreator" in profile && profile.isCreator;
  const markets = isCreator ? getCreatorMarkets(profile.name) : [];
  const activity = getActivity(profile.name);
  const achievements = getAchievements();

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/profile/${userId}`
    );
    toast({
      title: "Link copied",
      description: "Profile link has been copied to clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <div className="space-y-4 pb-6">
            {/* Profile Header */}
            <div className="relative">
              {/* Cover gradient */}
              <div className="h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20" />

              <div className="px-6">
                {/* Avatar overlapping cover */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
                  <Avatar className="h-20 w-20 border-4 border-background ring-2 ring-border/20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-xl">
                      {profile.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">{profile.name}</h2>
                        {profile.verified && (
                          <BadgeCheck className="h-5 w-5 text-primary fill-primary/20" />
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {profile.username}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
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
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bio & Meta */}
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {isCreator
                      ? (profile as typeof creator).description
                      : (profile as typeof player).bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {profile.location}
                      </div>
                    )}
                    {isCreator && (profile as typeof creator).website && (
                      <a
                        href={`https://${(profile as typeof creator).website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <LinkIcon className="h-3 w-3" />
                        {(profile as typeof creator).website}
                      </a>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Joined{" "}
                      {isCreator
                        ? (profile as typeof creator).joinedDate
                        : (profile as typeof player).joinDate}
                    </div>
                  </div>

                  {/* Categories for creators */}
                  {isCreator && (
                    <div className="flex flex-wrap gap-1.5">
                      {(profile as typeof creator).categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="px-2 py-0.5 text-xs"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Social Stats */}
                  <SocialStats
                    followers={profile.followers}
                    following={profile.following}
                    userId={userId}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="px-6">
              {isCreator ? (
                <ProfileStats
                  type="creator"
                  stats={{
                    totalVolume: (profile as typeof creator).volume,
                    marketsCreated: (profile as typeof creator).markets,
                    rank: 12,
                    avgVolume: (profile as typeof creator).avgVolume,
                  }}
                />
              ) : (
                <ProfileStats
                  type="trader"
                  stats={{
                    totalProfit: (profile as typeof player).totalProfit,
                    accuracy: (profile as typeof player).accuracy,
                    totalTrades: (profile as typeof player).totalTrades,
                    rank: 45,
                  }}
                />
              )}
            </div>

            {/* Content Tabs */}
            <div className="px-6">
              <Card className="border-border/40">
                <Tabs
                  defaultValue={isCreator ? "markets" : "posts"}
                  className="w-full"
                >
                  <CardHeader className="pb-0 pt-4">
                    <TabsList className="grid w-full grid-cols-3">
                      {isCreator ? (
                        <>
                          <TabsTrigger value="markets">
                            Markets ({markets.length})
                          </TabsTrigger>
                          <TabsTrigger value="posts">Posts</TabsTrigger>
                          <TabsTrigger value="achievements">
                            Achievements
                          </TabsTrigger>
                        </>
                      ) : (
                        <>
                          <TabsTrigger value="positions">Positions</TabsTrigger>
                          <TabsTrigger value="posts">Posts</TabsTrigger>
                          <TabsTrigger value="achievements">
                            Achievements
                          </TabsTrigger>
                        </>
                      )}
                    </TabsList>
                  </CardHeader>

                  {/* Markets Tab - Creators */}
                  {isCreator && (
                    <TabsContent value="markets" className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {markets.map((market) => (
                          <MarketGridCard key={market.id} {...market} />
                        ))}
                      </div>
                    </TabsContent>
                  )}

                  {/* Positions Tab - Players */}
                  {!isCreator && (
                    <TabsContent value="positions" className="p-4 space-y-3">
                      <div className="text-center py-8 text-muted-foreground">
                        <p>This user's positions are private</p>
                      </div>
                    </TabsContent>
                  )}

                  {/* Posts Tab */}
                  <TabsContent value="posts" className="p-0">
                    <div className="divide-y divide-border/40">
                      {activity.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 hover:bg-muted/30 transition-colors"
                        >
                          {item.type === "repost" && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 ml-10">
                              <Repeat2 className="h-3 w-3" />
                              <span>{profile.name} reposted</span>
                            </div>
                          )}

                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage
                                src={profile.avatar}
                                alt={profile.name}
                              />
                              <AvatarFallback>
                                {profile.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs">
                                  {profile.name}
                                </span>
                                {profile.verified && (
                                  <BadgeCheck className="h-3 w-3 text-primary fill-primary/20" />
                                )}
                                <span className="text-muted-foreground text-xs">
                                  {profile.username}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  ·
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  {item.timestamp}
                                </span>
                              </div>

                              <p className="text-xs leading-relaxed">
                                {item.content}
                              </p>

                              {item.market && (
                                <div
                                  className="border border-border/50 rounded-lg overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors"
                                  onClick={() => {
                                    onOpenChange(false);
                                    navigate(`/market/${item.market!.id}`);
                                  }}
                                >
                                  <div className="flex gap-2 p-2">
                                    <img
                                      src={item.market.image}
                                      alt={item.market.title}
                                      className="h-12 w-12 rounded object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium line-clamp-2">
                                        {item.market.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-0.5">
                                        View market →
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-4 pt-1">
                                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs">
                                  <MessageCircle className="h-3 w-3" />
                                  <span>{item.comments}</span>
                                </button>
                                <button className="flex items-center gap-1 text-muted-foreground hover:text-success transition-colors text-xs">
                                  <Repeat2 className="h-3 w-3" />
                                  <span>{item.reposts}</span>
                                </button>
                                <button className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors text-xs">
                                  <Heart className="h-3 w-3" />
                                  <span>{item.likes}</span>
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
                    <div className="grid grid-cols-1 gap-2">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/40"
                        >
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-xs">
                                {achievement.title}
                              </h4>
                              <Trophy className="h-3 w-3 text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-0.5">
                              {achievement.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
