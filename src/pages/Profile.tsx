import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Wallet, Activity, ArrowLeft, UserPlus, UserCheck } from "lucide-react";

// Mock data to determine if user is a creator
const creatorNames = ['marketmaven', 'predictpro', 'trendsetter', 'insighthub', 'datadriven'];
const creatorData = {
  'marketmaven': { markets: 47, volume: '$2.8M', followers: '12.3K' },
  'predictpro': { markets: 38, volume: '$2.1M', followers: '9.8K' },
  'trendsetter': { markets: 31, volume: '$1.7M', followers: '8.2K' },
  'insighthub': { markets: 29, volume: '$1.5M', followers: '7.1K' },
  'datadriven': { markets: 24, volume: '$1.2M', followers: '6.4K' },
};

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
        <div className="flex items-center justify-between mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
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
        </div>
      )}
      
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-4 md:pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`} alt={displayName} />
              <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold">{displayName}</h2>
              <Badge variant="outline">{isOwnProfile ? "Basic User" : "Community Member"}</Badge>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {isCreator ? "Recently Created Markets" : "Active Positions"}
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
    </div>
  );
}
