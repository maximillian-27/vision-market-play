import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle, MessageSquare } from "lucide-react";

const disputes = [
  { id: 1, marketTitle: "Bitcoin Price by EOY", user: "john@example.com", reason: "Incorrect resolution", status: "Open", priority: "High", created: "2024-01-15", amount: 2500 },
  { id: 2, marketTitle: "Super Bowl Winner", user: "jane@example.com", reason: "Market manipulation", status: "In Review", priority: "Critical", created: "2024-01-14", amount: 5000 },
  { id: 3, marketTitle: "Election Results", user: "bob@example.com", reason: "Ambiguous outcome", status: "Open", priority: "Medium", created: "2024-01-13", amount: 1200 },
  { id: 4, marketTitle: "Tesla Stock Price", user: "alice@example.com", reason: "Technical error", status: "Resolved", priority: "Low", created: "2024-01-10", amount: 800 },
  { id: 5, marketTitle: "AI Model Release", user: "charlie@example.com", reason: "Unclear criteria", status: "In Review", priority: "Medium", created: "2024-01-12", amount: 1500 },
];

const priorityColors = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-muted text-muted-foreground",
};

export const AdminDisputes = () => {
  const openDisputes = disputes.filter(d => d.status === "Open").length;
  const inReview = disputes.filter(d => d.status === "In Review").length;
  const resolved = disputes.filter(d => d.status === "Resolved").length;
  const totalAmount = disputes.reduce((acc, d) => acc + d.amount, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dispute Management</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-destructive/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Open Disputes</p>
            <p className="text-2xl font-bold">{openDisputes}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-warning/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">In Review</p>
            <p className="text-2xl font-bold">{inReview}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-success/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Resolved</p>
            <p className="text-2xl font-bold">{resolved}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Amount at Stake</p>
            <p className="text-2xl font-bold">${totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Disputes List */}
      <Card className="border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                <th className="p-4 font-medium">Market</th>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Reason</th>
                <th className="p-4 font-medium">Priority</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((dispute) => (
                <tr key={dispute.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <p className="font-medium line-clamp-1">{dispute.marketTitle}</p>
                    <p className="text-xs text-muted-foreground">{dispute.created}</p>
                  </td>
                  <td className="p-4 text-sm">{dispute.user}</td>
                  <td className="p-4 text-sm">{dispute.reason}</td>
                  <td className="p-4">
                    <Badge className={`text-xs border-0 ${priorityColors[dispute.priority as keyof typeof priorityColors]}`}>
                      {dispute.priority}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={dispute.status === "Open" ? "destructive" : dispute.status === "In Review" ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {dispute.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm font-medium">${dispute.amount.toLocaleString()}</td>
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
                          <MessageSquare className="h-4 w-4" /> Message User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-success">
                          <CheckCircle className="h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <XCircle className="h-4 w-4" /> Reject
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
    </div>
  );
};
