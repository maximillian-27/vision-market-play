import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

const resolutions = [
  { id: 1, title: "Bitcoin Price by End of 2024", outcome: "Yes", proposedBy: "System", status: "Pending", deadline: "2025-01-05", volume: 45000, voters: 1234 },
  { id: 2, title: "Super Bowl 2024 Champion", outcome: "Kansas City Chiefs", proposedBy: "CryptoGuru", status: "Disputed", deadline: "2024-02-15", volume: 89000, voters: 3400 },
  { id: 3, title: "US Election 2024 Winner", outcome: "Pending votes", proposedBy: "-", status: "Voting", deadline: "2024-11-10", volume: 125000, voters: 5600 },
  { id: 4, title: "Tesla Q4 Earnings Beat", outcome: "No", proposedBy: "MarketMaven", status: "Approved", deadline: "2024-01-28", volume: 32000, voters: 890 },
  { id: 5, title: "Fed Rate Decision January", outcome: "Hold", proposedBy: "System", status: "Pending", deadline: "2024-02-01", volume: 28000, voters: 756 },
];

const statusConfig = {
  Pending: { variant: "secondary" as const, icon: Clock },
  Disputed: { variant: "destructive" as const, icon: AlertTriangle },
  Voting: { variant: "default" as const, icon: CheckCircle },
  Approved: { variant: "default" as const, icon: CheckCircle },
};

export const AdminResolutions = () => {
  const pending = resolutions.filter(r => r.status === "Pending").length;
  const disputed = resolutions.filter(r => r.status === "Disputed").length;
  const voting = resolutions.filter(r => r.status === "Voting").length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Market Resolutions</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-warning text-sm mb-1">
              <Clock className="h-4 w-4" />
              Pending Resolution
            </div>
            <p className="text-2xl font-bold">{pending}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive text-sm mb-1">
              <AlertTriangle className="h-4 w-4" />
              Disputed
            </div>
            <p className="text-2xl font-bold">{disputed}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary text-sm mb-1">
              <CheckCircle className="h-4 w-4" />
              In Voting
            </div>
            <p className="text-2xl font-bold">{voting}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Volume at Stake</p>
            <p className="text-2xl font-bold">${(resolutions.reduce((acc, r) => acc + r.volume, 0) / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
      </div>

      {/* Resolutions List */}
      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                <th className="p-4 font-medium">Market</th>
                <th className="p-4 font-medium">Proposed Outcome</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Volume</th>
                <th className="p-4 font-medium">Deadline</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resolutions.map((resolution) => {
                const config = statusConfig[resolution.status as keyof typeof statusConfig];
                return (
                  <tr key={resolution.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium line-clamp-1 max-w-xs">{resolution.title}</p>
                      <p className="text-xs text-muted-foreground">Proposed by: {resolution.proposedBy}</p>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {resolution.outcome}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={config.variant} className="text-xs gap-1">
                        <config.icon className="h-3 w-3" />
                        {resolution.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm font-medium">${resolution.volume.toLocaleString()}</td>
                    <td className="p-4 text-sm">{resolution.deadline}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {resolution.status === "Pending" && (
                          <Button size="sm" className="gap-1 h-8">
                            <CheckCircle className="h-3 w-3" /> Confirm
                          </Button>
                        )}
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
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <XCircle className="h-4 w-4" /> Override
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
