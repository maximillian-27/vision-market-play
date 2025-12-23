import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, UserPlus, Gift, BarChart3 } from "lucide-react";
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

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("crm");

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
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your platform</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>

          {/* Main Tabs for CRM, Affiliate, Loyalty, Analytics */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-muted/50 p-1 mb-6">
              <TabsTrigger value="crm" className="data-[state=active]:bg-background gap-2">
                <Users className="h-4 w-4" />
                CRM
              </TabsTrigger>
              <TabsTrigger value="affiliate" className="data-[state=active]:bg-background gap-2">
                <UserPlus className="h-4 w-4" />
                Affiliate
              </TabsTrigger>
              <TabsTrigger value="loyalty" className="data-[state=active]:bg-background gap-2">
                <Gift className="h-4 w-4" />
                Loyalty & Bonuses
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-background gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics & BI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crm">
              <AdminCRM />
            </TabsContent>
            <TabsContent value="affiliate">
              <AdminAffiliate />
            </TabsContent>
            <TabsContent value="loyalty">
              <AdminLoyalty />
            </TabsContent>
            <TabsContent value="analytics">
              <AdminAnalytics />
            </TabsContent>
          </Tabs>

          {/* Section Content from Sidebar */}
          <div className="mt-8 pt-6 border-t border-border/40">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
