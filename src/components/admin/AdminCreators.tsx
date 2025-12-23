import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Star, TrendingUp, Users } from "lucide-react";

const creators = [
  { id: 1, name: "CryptoGuru", email: "crypto@guru.com", status: "Active", markets: 45, volume: 234000, followers: 12500, rating: 4.8 },
  { id: 2, name: "TechOracle", email: "tech@oracle.com", status: "Active", markets: 32, volume: 189000, followers: 8900, rating: 4.6 },
  { id: 3, name: "PoliticalPredict", email: "political@predict.com", status: "Active", markets: 28, volume: 156000, followers: 6700, rating: 4.5 },
  { id: 4, name: "SportsAnalyst", email: "sports@analyst.com", status: "Pending", markets: 0, volume: 0, followers: 0, rating: 0 },
  { id: 5, name: "MarketMaven", email: "market@maven.com", status: "Suspended", markets: 12, volume: 45000, followers: 2300, rating: 3.2 },
  { id: 6, name: "AIPredictor", email: "ai@predictor.com", status: "Pending", markets: 0, volume: 0, followers: 0, rating: 0 },
];

export const AdminCreators = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCreators = creators.filter((creator) => {
    return creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const activeCreators = creators.filter(c => c.status === "Active").length;
  const pendingApplications = creators.filter(c => c.status === "Pending").length;
  const totalVolume = creators.reduce((acc, c) => acc + c.volume, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Users className="h-4 w-4" />
              Active Creators
            </div>
            <p className="text-2xl font-bold">{activeCreators}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-warning/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending Applications</p>
            <p className="text-2xl font-bold">{pendingApplications}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              Total Volume
            </div>
            <p className="text-2xl font-bold">${(totalVolume / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Star className="h-4 w-4" />
              Avg Rating
            </div>
            <p className="text-2xl font-bold">4.5</p>
          </CardContent>
        </Card>
      </div>

      {/* Creators List */}
      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                <th className="p-4 font-medium">Creator</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Markets</th>
                <th className="p-4 font-medium">Volume</th>
                <th className="p-4 font-medium">Followers</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCreators.map((creator) => (
                <tr key={creator.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{creator.name}</p>
                      <p className="text-sm text-muted-foreground">{creator.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={creator.status === "Active" ? "default" : creator.status === "Pending" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {creator.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm">{creator.markets}</td>
                  <td className="p-4 text-sm font-medium">${creator.volume.toLocaleString()}</td>
                  <td className="p-4 text-sm">{creator.followers.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="text-sm">{creator.rating || "-"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        {creator.status === "Pending" && (
                          <>
                            <DropdownMenuItem className="gap-2 text-success">
                              <CheckCircle className="h-4 w-4" /> Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <XCircle className="h-4 w-4" /> Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
