import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminMarkets } from "@/components/admin/AdminMarkets";
import { AdminDisputes } from "@/components/admin/AdminDisputes";
import { AdminCreators } from "@/components/admin/AdminCreators";
import { AdminPendingMarkets } from "@/components/admin/AdminPendingMarkets";
import { AdminResolutions } from "@/components/admin/AdminResolutions";
import { AdminTransactions } from "@/components/admin/AdminTransactions";
import { AdminCRM } from "@/components/admin/AdminCRM";
import { AdminAffiliate } from "@/components/admin/AdminAffiliate";
import { AdminLoyalty } from "@/components/admin/AdminLoyalty";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";

const sectionTitles: Record<string, { title: string; description: string }> = {
  dashboard: { title: "Dashboard", description: "Platform overview and key metrics" },
  users: { title: "Users", description: "Manage all platform users" },
  markets: { title: "All Markets", description: "View and manage all markets" },
  pending: { title: "Pending Markets", description: "Review and approve new markets" },
  disputes: { title: "Disputes", description: "Handle user disputes and issues" },
  resolutions: { title: "Resolutions", description: "Manage market resolutions" },
  transactions: { title: "Transactions", description: "View all platform transactions" },
  creators: { title: "Creators", description: "Manage market creators" },
  crm: { title: "CRM", description: "Customer relationship management" },
  affiliate: { title: "Affiliate Program", description: "Manage affiliate partners" },
  loyalty: { title: "Loyalty & Bonuses", description: "Rewards and bonus programs" },
  analytics: { title: "Analytics & BI", description: "Business intelligence and insights" },
};

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <AdminUsers />;
      case "markets":
        return <AdminMarkets />;
      case "disputes":
        return <AdminDisputes />;
      case "creators":
        return <AdminCreators />;
      case "pending":
        return <AdminPendingMarkets />;
      case "resolutions":
        return <AdminResolutions />;
      case "transactions":
        return <AdminTransactions />;
      case "crm":
        return <AdminCRM />;
      case "affiliate":
        return <AdminAffiliate />;
      case "loyalty":
        return <AdminLoyalty />;
      case "analytics":
        return <AdminAnalytics />;
      default:
        return <AdminDashboard />;
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
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{currentSection.title}</h1>
              <p className="text-sm text-muted-foreground">{currentSection.description}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>

          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
