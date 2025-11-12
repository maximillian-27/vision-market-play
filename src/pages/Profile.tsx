import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Wallet, TrendingUp, Activity } from "lucide-react";

export default function Profile() {
  return (
    <div className="w-full md:container md:max-w-2xl py-4 md:py-6 space-y-4 md:space-y-6 px-4 md:px-4">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-4 md:pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold">Your Name</h2>
              <Badge variant="outline">Basic User</Badge>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
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
      </div>

      {/* Active Positions */}
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
    </div>
  );
}
