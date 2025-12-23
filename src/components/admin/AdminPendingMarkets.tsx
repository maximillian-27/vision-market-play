import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Clock, Edit } from "lucide-react";

const pendingMarkets = [
  { id: 1, title: "Will Apple release AR glasses in 2024?", creator: "TechOracle", submitted: "2024-01-15", category: "Technology", endDate: "2024-12-31" },
  { id: 2, title: "Grammy Awards 2024 - Album of the Year", creator: "MusicFan", submitted: "2024-01-14", category: "Entertainment", endDate: "2024-02-04" },
  { id: 3, title: "Will the Fed cut rates in Q1 2024?", creator: "EconWatcher", submitted: "2024-01-13", category: "Finance", endDate: "2024-03-31" },
  { id: 4, title: "Olympics 2024 - USA Gold Medal Count", creator: "SportsAnalyst", submitted: "2024-01-12", category: "Sports", endDate: "2024-08-11" },
  { id: 5, title: "Will ChatGPT-5 be released in H1 2024?", creator: "AIPredictor", submitted: "2024-01-11", category: "Technology", endDate: "2024-06-30" },
];

export const AdminPendingMarkets = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Pending Market Approvals</h2>
        <Badge variant="secondary" className="text-sm">
          <Clock className="h-3 w-3 mr-1" />
          {pendingMarkets.length} pending
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Pending</p>
            <p className="text-2xl font-bold">{pendingMarkets.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Submitted Today</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Avg Review Time</p>
            <p className="text-2xl font-bold">4.2h</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Approval Rate</p>
            <p className="text-2xl font-bold">78%</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Markets List */}
      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                <th className="p-4 font-medium">Market</th>
                <th className="p-4 font-medium">Creator</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Submitted</th>
                <th className="p-4 font-medium">End Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingMarkets.map((market) => (
                <tr key={market.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <p className="font-medium line-clamp-1 max-w-xs">{market.title}</p>
                  </td>
                  <td className="p-4 text-sm">{market.creator}</td>
                  <td className="p-4">
                    <Badge variant="secondary" className="text-xs">
                      {market.category}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm">{market.submitted}</td>
                  <td className="p-4 text-sm">{market.endDate}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" className="gap-1 h-8">
                        <CheckCircle className="h-3 w-3" /> Approve
                      </Button>
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
                            <Edit className="h-4 w-4" /> Request Changes
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <XCircle className="h-4 w-4" /> Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
