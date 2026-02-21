import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { AdminSidebar, MobileAdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminMarkets } from "@/components/admin/AdminMarkets";
import { AdminDisputesResolutions } from "@/components/admin/AdminDisputesResolutions";
import { AdminTransactions } from "@/components/admin/AdminTransactions";
import { AdminCRM } from "@/components/admin/AdminCRM";
import { AdminCommissions } from "@/components/admin/AdminCommissions";
import { AdminCreators } from "@/components/admin/AdminCreators";
import { AdminPartners } from "@/components/admin/AdminPartners";
import { AdminBonusManagement } from "@/components/admin/AdminBonusManagement";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { AdminUAT } from "@/components/admin/AdminUAT";

const sectionTitles: Record<string, { title: string; description: string }> = {
  dashboard: { title: "Dashboard", description: "Platform overview and key metrics" },
  users: { title: "Users", description: "Manage all platform users" },
  markets: { title: "Prediction Markets", description: "Manage markets, categories and settings" },
  disputes: { title: "Disputes & Resolutions", description: "Handle disputes and market resolutions" },
  transactions: { title: "Transactions & PSPs", description: "Transactions, PSP config and risk management" },
  crm: { title: "CRM", description: "Customer relationship management and channels" },
  commissions: { title: "Commissions", description: "Commission rates for creators, partners and RAF" },
  creators: { title: "Creators Platform", description: "Creator management, reporting and tracking" },
  partners: { title: "Partners Platform", description: "Partner management, reporting and tracking" },
  bonuses: { title: "Bonus Management", description: "Bonuses, promotions and loyalty tiers" },
  analytics: { title: "Analytics & BI", description: "Business intelligence and insights" },
  uat: { title: "UAT Console", description: "Device and browser compatibility testing" },
};

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard": return <AdminDashboard onNavigate={setActiveSection} />;
      case "users": return <AdminUsers />;
      case "markets": return <AdminMarkets />;
      case "disputes": return <AdminDisputesResolutions />;
      case "transactions": return <AdminTransactions />;
      case "crm": return <AdminCRM />;
      case "commissions": return <AdminCommissions />;
      case "creators": return <AdminCreators />;
      case "partners": return <AdminPartners />;
      case "bonuses": return <AdminBonusManagement />;
      case "analytics": return <AdminAnalytics />;
      case "uat": return <AdminUAT />;
      default: return <AdminDashboard />;
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
        {/* Mobile Header */}
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

        {/* Desktop Header */}
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

        {/* Content */}
        <div className="p-4 md:px-6 md:pt-0">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
