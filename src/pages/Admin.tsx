import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { AdminSidebar, MobileAdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminMarkets } from "@/components/admin/AdminMarkets";
import { AdminTransactions } from "@/components/admin/AdminTransactions";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminCreatorsAffiliates } from "@/components/admin/AdminCreatorsAffiliates";
import { AdminBonusManagement } from "@/components/admin/AdminBonusManagement";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";

import { AdminSecurityComplianceSupport } from "@/components/admin/AdminSecurityComplianceSupport";

const sectionTitles: Record<string, { title: string; description: string }> = {
  dashboard: { title: "Dashboard", description: "Platform overview, P&L, and key metrics" },
  analytics: { title: "Analytics & BI", description: "Business intelligence, financials and insights" },
  markets: { title: "Markets", description: "Manage markets, disputes, resolutions and categories" },
  transactions: { title: "Transactions", description: "Crypto deposits, withdrawals, treasury and fee collections" },
  users: { title: "Users", description: "User management, segments and campaigns" },
  creators: { title: "Creators & Affiliates", description: "Creators, affiliates, payouts and automations" },
  bonuses: { title: "Loyalty & Bonuses", description: "Bonuses, promotions and loyalty tiers" },
  trust: { title: "Security & Compliance", description: "Security, compliance, KYC/AML and support" },
};

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard": return <AdminDashboard onNavigate={setActiveSection} />;
      case "analytics": return <AdminAnalytics />;
      case "markets": return <AdminMarkets />;
      case "transactions": return <AdminTransactions />;
      case "users": return <AdminUsers />;
      case "creators": return <AdminCreatorsAffiliates />;
      case "bonuses": return <AdminBonusManagement />;
      case "trust": return <AdminSecurityComplianceSupport />;
      default: return <AdminDashboard onNavigate={setActiveSection} />;
    }
  };

  const currentSection = sectionTitles[activeSection] || sectionTitles.dashboard;

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 p-4 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MobileAdminSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
              <div>
                <h1 className="text-lg font-bold">{currentSection.title}</h1>
                <p className="text-xs text-muted-foreground">{currentSection.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toast("Platform settings would open here")}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="hidden md:block p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{currentSection.title}</h1>
              <p className="text-sm text-muted-foreground">{currentSection.description}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast("Platform settings would open here")}>
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <div className="p-4 md:px-6 md:pt-0">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
