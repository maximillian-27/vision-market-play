import { cn } from "@/lib/utils";
import {
  LayoutDashboard, TrendingUp, Tag, Sparkles, Receipt, Wallet, Banknote,
  Users, UserPlus, Share2, Gift, Ticket, Megaphone, ShieldAlert,
  UserCheck, Server, ClipboardList, ChevronLeft, ChevronRight, Menu,
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

const sections = [
  {
    label: "Core",
    items: [
      { id: "dashboard", label: "Performance Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Markets",
    items: [
      { id: "markets", label: "Markets", icon: TrendingUp },
      { id: "categories", label: "Market Categories", icon: Tag },
      { id: "featured", label: "Featured Markets", icon: Sparkles },
    ],
  },
  {
    label: "Finance",
    items: [
      { id: "transactions", label: "Transactions", icon: Receipt },
      { id: "wallets", label: "Wallets", icon: Wallet },
      { id: "payouts", label: "Payouts", icon: Banknote },
    ],
  },
  {
    label: "Users",
    items: [
      { id: "users", label: "Users", icon: Users },
      { id: "creators", label: "Creators & Affiliates", icon: UserPlus },
      { id: "referrals", label: "Referrals (RAF)", icon: Share2 },
    ],
  },
  {
    label: "Growth",
    items: [
      { id: "bonuses", label: "Loyalty & Bonuses", icon: Gift },
      { id: "draw", label: "Weekly Draw", icon: Ticket },
      { id: "campaigns", label: "Campaigns", icon: Megaphone },
    ],
  },
  {
    label: "Security",
    items: [
      { id: "fraud", label: "Fraud Monitoring", icon: ShieldAlert },
      { id: "kyc", label: "KYC / AML", icon: UserCheck },
      { id: "health", label: "System Health", icon: Server },
      { id: "audit", label: "Admin & Audit Logs", icon: ClipboardList },
    ],
  },
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
    <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
      {sections.map((section, idx) => (
        <div key={section.label}>
          {idx > 0 && <Separator className="my-2" />}
          {!collapsed && (
            <p className="text-[10px] text-muted-foreground px-3 py-1.5 font-semibold uppercase tracking-widest">
              {section.label}
            </p>
          )}
          {section.items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                activeSection === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
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
        collapsed ? "w-14" : "w-56"
      )}
    >
      <div className="p-3 border-b border-border/40 flex items-center justify-between">
        {!collapsed && (
          <span className="font-semibold text-sm text-foreground">Admin</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 ml-auto"
          onClick={onToggleCollapse}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
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
