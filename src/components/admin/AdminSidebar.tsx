import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  ChevronLeft,
  ChevronRight,
  Users,
  Gift,
  BarChart3,
  Menu,
  Shield,
  Megaphone,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const coreItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics & BI", icon: BarChart3 },
];

const operationsItems = [
  { id: "markets", label: "Markets", icon: TrendingUp },
  { id: "transactions", label: "Transactions", icon: Receipt },
];

const peopleItems = [
  { id: "users", label: "Users", icon: Users },
  { id: "creators", label: "Creators & Affiliates", icon: UserPlus },
];

const engageItems = [
  { id: "bonuses", label: "Loyalty & Bonuses", icon: Gift },
  { id: "marketing", label: "Marketing", icon: Megaphone },
];

const trustItems = [
  { id: "trust", label: "Security & Compliance", icon: Shield },
];

const sections = [
  { label: "Core", items: coreItems },
  { label: "Operations", items: operationsItems },
  { label: "People", items: peopleItems },
  { label: "Engage", items: engageItems },
  { label: "Trust", items: trustItems },
];

const SidebarContent = ({
  activeSection,
  onSectionChange,
  collapsed,
  onItemClick,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onItemClick?: () => void;
}) => {
  const handleClick = (id: string) => {
    onSectionChange(id);
    onItemClick?.();
  };

  return (
    <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
      {sections.map((section, idx) => (
        <div key={section.label}>
          {idx > 0 && <Separator className="my-3" />}
          {!collapsed && (
            <p className="text-xs text-muted-foreground px-3 py-2 font-medium uppercase tracking-wider">
              {section.label}
            </p>
          )}
          {section.items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
};

export const MobileAdminSidebar = ({
  activeSection,
  onSectionChange,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-4 border-b border-border/40">
          <span className="font-semibold text-foreground">Admin Panel</span>
        </div>
        <SidebarContent
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          collapsed={false}
          onItemClick={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export const AdminSidebar = ({
  activeSection,
  onSectionChange,
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps) => {
  return (
    <div
      className={cn(
        "bg-card border-r border-border/40 h-screen flex-col transition-all duration-300 sticky top-0 hidden md:flex",
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

      <SidebarContent
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        collapsed={collapsed}
      />
    </div>
  );
};
