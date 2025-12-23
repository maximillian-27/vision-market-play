import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Pause, CheckCircle, XCircle } from "lucide-react";

const markets = [
  { id: 1, title: "Will Bitcoin reach $100K by end of 2024?", creator: "CryptoGuru", status: "Active", volume: 45000, trades: 1234, endDate: "2024-12-31" },
  { id: 2, title: "Will AI replace most software jobs by 2030?", creator: "TechOracle", status: "Active", volume: 32000, trades: 890, endDate: "2030-01-01" },
  { id: 3, title: "Will SpaceX land on Mars by 2026?", creator: "SpaceWatch", status: "Active", volume: 28000, trades: 756, endDate: "2026-12-31" },
  { id: 4, title: "US Election 2024 Winner", creator: "PoliticalPredict", status: "Resolved", volume: 125000, trades: 5600, endDate: "2024-11-05" },
  { id: 5, title: "Super Bowl 2024 Champion", creator: "SportsAnalyst", status: "Resolved", volume: 89000, trades: 3400, endDate: "2024-02-11" },
  { id: 6, title: "Will Tesla stock hit $300?", creator: "MarketMaven", status: "Paused", volume: 15000, trades: 450, endDate: "2024-06-30" },
];

export const AdminMarkets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || market.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-28 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <Card className="border-border/40 hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                <th className="p-4 font-medium">Market</th>
                <th className="p-4 font-medium">Creator</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Volume</th>
                <th className="p-4 font-medium">Trades</th>
                <th className="p-4 font-medium">End Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarkets.map((market) => (
                <tr key={market.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <p className="font-medium line-clamp-1 max-w-xs">{market.title}</p>
                  </td>
                  <td className="p-4 text-sm">{market.creator}</td>
                  <td className="p-4">
                    <Badge
                      variant={market.status === "Active" ? "default" : market.status === "Resolved" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {market.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm font-medium">${market.volume.toLocaleString()}</td>
                  <td className="p-4 text-sm">{market.trades.toLocaleString()}</td>
                  <td className="p-4 text-sm">{market.endDate}</td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Pause className="h-4 w-4" /> Pause Market
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <CheckCircle className="h-4 w-4" /> Resolve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <XCircle className="h-4 w-4" /> Cancel Market
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredMarkets.map((market) => (
          <Card key={market.id} className="border-border/40 p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="font-medium text-sm pr-2">{market.title}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  <DropdownMenuItem className="gap-2">
                    <Eye className="h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Pause className="h-4 w-4" /> Pause Market
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <CheckCircle className="h-4 w-4" /> Resolve
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive">
                    <XCircle className="h-4 w-4" /> Cancel Market
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-xs text-muted-foreground mb-3">by {market.creator}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>{" "}
                <Badge
                  variant={market.status === "Active" ? "default" : market.status === "Resolved" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {market.status}
                </Badge>
              </div>
              <div><span className="text-muted-foreground">End:</span> {market.endDate}</div>
              <div><span className="text-muted-foreground">Volume:</span> <span className="font-medium">${market.volume.toLocaleString()}</span></div>
              <div><span className="text-muted-foreground">Trades:</span> {market.trades.toLocaleString()}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
