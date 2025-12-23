import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Clock,
  CheckCircle,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "markets", label: "All Markets", icon: TrendingUp },
  { id: "disputes", label: "Disputes", icon: AlertTriangle },
  { id: "creators", label: "Creators", icon: UserCheck },
  { id: "pending", label: "Pending Markets", icon: Clock },
  { id: "resolutions", label: "Resolutions", icon: CheckCircle },
  { id: "transactions", label: "Transactions", icon: Receipt },
];

export const AdminSidebar = ({
  activeSection,
  onSectionChange,
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps) => {
  return (
    <div
      className={cn(
        "bg-card border-r border-border/40 h-full flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="p-3 border-b border-border/40 flex items-center justify-between">
        {!collapsed && (
          <span className="font-semibold text-sm text-foreground">Admin Panel</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-auto"
          onClick={onToggleCollapse}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeSection === item.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};
