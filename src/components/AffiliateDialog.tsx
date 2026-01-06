import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Users, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { toast } from "sonner";

interface AffiliateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AffiliateDialog({ open, onOpenChange }: AffiliateDialogProps) {
  const [copied, setCopied] = useState(false);
  
  // Mock affiliate data
  const affiliateCode = "POLLGY-X7K9M2";
  const referralLink = `https://pollgy.com/ref/${affiliateCode}`;
  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 1847.50,
    pendingEarnings: 234.20,
    thisMonth: 412.30,
    commissionRate: 10,
    durationMonths: 12,
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md max-h-[85vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Affiliate Program</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5">
          {/* Commission Info */}
          <div className="text-center py-3 px-4 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-sm text-muted-foreground">Earn</p>
            <p className="text-2xl font-bold text-primary">{stats.commissionRate}% Commission</p>
            <p className="text-xs text-muted-foreground mt-1">
              for {stats.durationMonths} months per referral
            </p>
          </div>

          {/* Referral Code */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Your Referral Code
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2.5 rounded-lg bg-secondary font-mono text-sm font-semibold tracking-wide">
                {affiliateCode}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={() => copyToClipboard(affiliateCode, "Code")}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Referral Link
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2.5 rounded-lg bg-secondary text-xs text-muted-foreground truncate">
                {referralLink}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={() => copyToClipboard(referralLink, "Link")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span className="text-[11px] font-medium">Referrals</span>
              </div>
              <p className="text-xl font-bold">{stats.totalReferrals}</p>
              <p className="text-[10px] text-muted-foreground">{stats.activeReferrals} active</p>
            </div>
            
            <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <DollarSign className="h-3.5 w-3.5" />
                <span className="text-[11px] font-medium">Total Earned</span>
              </div>
              <p className="text-xl font-bold text-primary">${stats.totalEarnings.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">${stats.pendingEarnings} pending</p>
            </div>
            
            <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-[11px] font-medium">This Month</span>
              </div>
              <p className="text-xl font-bold">${stats.thisMonth.toLocaleString()}</p>
            </div>
            
            <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-[11px] font-medium">Duration</span>
              </div>
              <p className="text-xl font-bold">{stats.durationMonths}mo</p>
              <p className="text-[10px] text-muted-foreground">per referral</p>
            </div>
          </div>

          {/* How it works */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Share your code with friends. When they sign up and trade, you earn {stats.commissionRate}% of platform fees from their activity for {stats.durationMonths} months.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
