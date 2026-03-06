import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { AdminSidebar, MobileAdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminMarkets } from "@/components/admin/AdminMarkets";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminFeaturedMarkets } from "@/components/admin/AdminFeaturedMarkets";
import { AdminTransactions } from "@/components/admin/AdminTransactions";
import { AdminWallets } from "@/components/admin/AdminWallets";
import { AdminPayouts } from "@/components/admin/AdminPayouts";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminCreatorsAffiliates } from "@/components/admin/AdminCreatorsAffiliates";
import { AdminReferrals } from "@/components/admin/AdminReferrals";
import { AdminBonusManagement } from "@/components/admin/AdminBonusManagement";
import { AdminWeeklyDraw } from "@/components/admin/AdminWeeklyDraw";
import { AdminCampaigns } from "@/components/admin/AdminCampaigns";
import { AdminFraud } from "@/components/admin/AdminFraud";
import { AdminKycAml } from "@/components/admin/AdminKycAml";
import { AdminSystemHealth } from "@/components/admin/AdminSystemHealth";
import { AdminAuditLog } from "@/components/admin/AdminAuditLog";

const sectionTitles: Record<string, { title: string; description: string }> = {
  dashboard: { title: "Performance Dashboard", description: "Platform overview, financials, and key metrics" },
  markets: { title: "Markets", description: "Market lifecycle management" },
  categories: { title: "Market Categories", description: "Manage market categories" },
  featured: { title: "Featured Markets", description: "Homepage hero and highlighted markets" },
  transactions: { title: "Transactions", description: "Deposits, withdrawals, and fee collections" },
  wallets: { title: "Wallets", description: "Platform treasury monitoring" },
  payouts: { title: "Payouts", description: "Creator and affiliate payouts" },
  users: { title: "Users", description: "User management" },
  creators: { title: "Creators & Affiliates", description: "Creator and affiliate profiles" },
  referrals: { title: "Referrals (RAF)", description: "Referral program performance" },
  bonuses: { title: "Loyalty & Bonuses", description: "Bonuses, promotions, and loyalty tiers" },
  draw: { title: "Weekly Draw", description: "Gamified reward system" },
  campaigns: { title: "Campaigns", description: "Marketing campaigns" },
  fraud: { title: "Fraud Monitoring", description: "Fraud detection and risk management" },
  kyc: { title: "KYC / AML", description: "Compliance monitoring" },
  health: { title: "System Health", description: "Infrastructure status" },
  audit: { title: "Admin & Audit Logs", description: "Admin management and audit trail" },
};

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard": return <AdminDashboard onNavigate={setActiveSection} />;
      case "markets": return <AdminMarkets />;
      case "categories": return <AdminCategories />;
      case "featured": return <AdminFeaturedMarkets />;
      case "transactions": return <AdminTransactions />;
      case "wallets": return <AdminWallets />;
      case "payouts": return <AdminPayouts />;
      case "users": return <AdminUsers />;
      case "creators": return <AdminCreatorsAffiliates />;
      case "referrals": return <AdminReferrals />;
      case "bonuses": return <AdminBonusManagement />;
      case "draw": return <AdminWeeklyDraw />;
      case "campaigns": return <AdminCampaigns />;
      case "fraud": return <AdminFraud />;
      case "kyc": return <AdminKycAml />;
      case "health": return <AdminSystemHealth />;
      case "audit": return <AdminAuditLog />;
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
              <MobileAdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
              <div>
                <h1 className="text-lg font-bold">{currentSection.title}</h1>
                <p className="text-xs text-muted-foreground">{currentSection.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toast("Settings")}><Settings className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="hidden md:block p-6 pb-0">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold">{currentSection.title}</h1>
              <p className="text-sm text-muted-foreground">{currentSection.description}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast("Settings")}><Settings className="h-4 w-4" /> Settings</Button>
          </div>
        </div>
        <div className="p-4 md:px-6 md:pt-0">{renderSectionContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
