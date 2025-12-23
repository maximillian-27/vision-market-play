import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Search, MoreHorizontal, Eye, Mail, Ban, Download, UserPlus } from "lucide-react";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", joined: "2024-01-15", status: "Active", portfolio: 12450, trades: 47, verified: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2024-01-14", status: "Active", portfolio: 8900, trades: 32, verified: true },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", joined: "2024-01-14", status: "Pending", portfolio: 500, trades: 3, verified: false },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", joined: "2024-01-13", status: "Suspended", portfolio: 0, trades: 0, verified: true },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", joined: "2024-01-13", status: "Active", portfolio: 34500, trades: 156, verified: true },
  { id: 6, name: "Diana Prince", email: "diana@example.com", joined: "2024-01-12", status: "Active", portfolio: 22300, trades: 89, verified: true },
  { id: 7, name: "Edward Norton", email: "edward@example.com", joined: "2024-01-11", status: "Active", portfolio: 5600, trades: 21, verified: false },
];

export const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 flex-wrap">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button size="sm" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Desktop Table */}
      <Card className="border-border/40 hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Portfolio</th>
                <th className="p-4 font-medium">Trades</th>
                <th className="p-4 font-medium">Verified</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{user.joined}</td>
                  <td className="p-4">
                    <Badge
                      variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm font-medium">${user.portfolio.toLocaleString()}</td>
                  <td className="p-4 text-sm">{user.trades}</td>
                  <td className="p-4">
                    <Badge variant={user.verified ? "default" : "secondary"} className="text-xs">
                      {user.verified ? "Yes" : "No"}
                    </Badge>
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
                        <DropdownMenuItem className="gap-2">
                          <Mail className="h-4 w-4" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Ban className="h-4 w-4" /> Suspend
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
        {filteredUsers.map((user) => (
          <Card key={user.id} className="border-border/40 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
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
                  <DropdownMenuItem className="gap-2">
                    <Mail className="h-4 w-4" /> Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive">
                    <Ban className="h-4 w-4" /> Suspend
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>{" "}
                <Badge
                  variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {user.status}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Verified:</span>{" "}
                <Badge variant={user.verified ? "default" : "secondary"} className="text-xs">
                  {user.verified ? "Yes" : "No"}
                </Badge>
              </div>
              <div><span className="text-muted-foreground">Portfolio:</span> <span className="font-medium">${user.portfolio.toLocaleString()}</span></div>
              <div><span className="text-muted-foreground">Trades:</span> {user.trades}</div>
              <div className="col-span-2"><span className="text-muted-foreground">Joined:</span> {user.joined}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
